import {
  getAnnouncement,
  getCourseManager,
  getExamManager,
  getLatestCourse,
  getLatestExam,
  getStuRecommendCourse,
  getStuCourses, // 学员待完成、已完成、已逾期
  getStuExams,
  getStats,
} from '@/services/workbench/workbench';

export default {
  namespace: 'workbench',

  state: {
    announcement: [], // 平台公告
    courseManager: [], // 课件管理
    examManager: [], // 试卷管理
    latestCourse: [], // 最新课程
    latestExam: [], // 最新试卷

    stuCourses: {
      todo: [], // 待完成
      completed: [], // 已完成
      overdue: [], // 已逾期
    }, // 待完成、已完成、已逾期
    stuExams: {
      todo: [], // 待完成
      completed: [], // 已完成
      overdue: [], // 已逾期
    }, // 待完成、已完成、已逾期
    recommendCourse: [], // 推荐课程
    stats: {},
  },

  effects: {
    // 获取平台公告
    *getAnnouncement(_, { call, put }) {
      const response = yield call(getAnnouncement);
      if (response && response.status === 'ok') {
        yield put({
          type: 'saveAnnouncement',
          payload: response.data.results,
        });
      }
    },
    // 系统管理员获取课件管理
    *getCourseManager({ payload }, { call, put }) {
      const response = yield call(getCourseManager, payload);
      if (response && response.status === 'ok') {
        yield put({
          type: 'saveCourseManager',
          payload: response.data.results,
        });
      }
    },
    // 系统管理员获取试卷管理
    *getExamManager({ payload }, { call, put }) {
      const response = yield call(getExamManager, payload);
      yield put({
        type: 'saveExamManager',
        payload: response.data.results,
      });
    },

    // 培训管理员获取最新课程
    *getLatestCourse({ payload }, { call, put }) {
      const response = yield call(getLatestCourse, payload);
      if (response && response.status === 'ok') {
        yield put({
          type: 'saveLatestCourse',
          payload: response.data.results,
        });
      }
    },
    // 培训管理员获取最新试卷
    *getLatestExam({ payload }, { call, put }) {
      const response = yield call(getLatestExam, payload);
      yield put({
        type: 'saveLatestExam',
        payload: response.data.results,
      });
    },
    // 学员获取待完成、已完成、已逾期
    *GetStuCourses(_, { call, put }) {
      const response = yield call(getStuCourses);
      if (response && response.status === 'ok') {
        yield put({
          type: 'saveStuCourse',
          payload: response.data,
        });
      }
    },
    *GetStuExams(_, { call, put }) {
      const response = yield call(getStuExams);
      if (response && response.status === 'ok') {
        yield put({
          type: 'saveStuExam',
          payload: response.data,
        });
      }
    },
    // 学员获取推荐课程
    *getStuRecommendCourse({ payload }, { call, put }) {
      const response = yield call(getStuRecommendCourse, payload);
      yield put({
        type: 'saveStuRecommendCourse',
        payload: response.data.results,
      });
    },
    // 获取统计数据
    *getStats({ payload }, { call, put }) {
      const response = yield call(getStats, payload);
      yield put({
        type: 'saveStats',
        payload: response.data,
      });
    },
  },

  reducers: {
    // 保存平台公告
    saveAnnouncement(state, action) {
      return {
        ...state,
        announcement: action.payload,
      };
    },
    // 保存课件管理
    saveCourseManager(state, action) {
      return {
        ...state,
        courseManager: action.payload,
      };
    },
    // 保存试卷管理
    saveExamManager(state, action) {
      return {
        ...state,
        examManager: action.payload,
      };
    },
    // 保存最新课程
    saveLatestCourse(state, action) {
      return {
        ...state,
        latestCourse: action.payload,
      };
    },
    // 保存最新试卷
    saveLatestExam(state, action) {
      return {
        ...state,
        latestExam: action.payload,
      };
    },

    // 学员获取待完成、已完成、已逾期
    saveStuCourse(state, action) {
      return {
        ...state,
        stuCourses: action.payload,
      };
    },
    saveStuExam(state, action) {
      return {
        ...state,
        stuExams: action.payload,
      };
    },
    // 学员获取推荐课程
    saveStuRecommendCourse(state, action) {
      return {
        ...state,
        recommendCourse: action.payload,
      };
    },
    saveStats(state, action) {
      return {
        ...state,
        stats: action.payload,
      };
    },
  },
};
