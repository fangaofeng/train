import {
  getAnnouncement,
  getCourseManager,
  getExamManager,
  getLatestCourse,
  getLatestExam,
  getStuRecommendCourse,
  getStuAllCourseAndExam, // 学员待完成、已完成、已逾期
  getStats,
} from '@/services/workbench/workbench';

export default {
  namespace: 'workbench',

  state: {
    getAnnouncement: [], // 平台公告
    courseManager: [], // 课件管理
    examManager: [], // 试卷管理
    latestCourse: [], // 最新课程
    latestExam: [], // 最新试卷

    stuAllCourseAndExamData: {
      learntodoes: [], // 待完成
      learncompletedes: [], // 已完成
      learnoverdue: [], // 已逾期
    }, // 待完成、已完成、已逾期
    recommendCourse: [], // 推荐课程
    stats: {},
  },

  effects: {
    // 获取平台公告
    *getAnnouncement(_, { call, put }) {
      const response = yield call(getAnnouncement);
      if (response.status === 'ok') {
        yield put({
          type: 'saveAnnouncement',
          payload: response.data.results,
        });
      }
    },
    // 系统管理员获取课件管理
    *getCourseManager({ payload }, { call, put }) {
      const response = yield call(getCourseManager, payload);
      if (response.status === 'ok') {
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
      if (response.status === 'ok') {
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
    *GetStuAllCourseAndExam(_, { call, put }) {
      const response = yield call(getStuAllCourseAndExam);
      if (response.status === 'ok') {
        yield put({
          type: 'saveStuAllCourseAndExam',
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
        getAnnouncement: action.payload,
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
    saveStuAllCourseAndExam(state, action) {
      return {
        ...state,
        stuAllCourseAndExamData: action.payload,
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
