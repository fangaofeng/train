import {
  /**
   * 1、我的学习计划 ——> 课程学习（MP4） ——> 获取视频资源，课程信息等
   * 2、我的学习计划 ——> 课程学习（PDF） ——> 获取PDF资源，课程信息等
   */
  getLearnProgress,
  getRecommendCourse,
  getLearnProgressDetail,
  sendProgress, // 我的学习计划 ——> 课程学习(pdf) ——> 发送pdf的当前页码和学习状态
} from '@/services/MyStudy/MyLearnPlan/index';

export default {
  namespace: 'MyLearnPlan',

  state: {
    todoes: { results: [], count: 0 }, // 待完成
    completedes: { results: [], count: 0 }, // 已完成
    overdues: { results: [], count: 0 }, // 已逾期
    progressInfo: {},
  },

  effects: {
    // 学员获取待完成、已完成、已逾期
    *getLearnProgress({ payload }, { call, put }) {
      const response = yield call(getLearnProgress, payload);
      if (response && response.status === 'ok') {
        if (payload.status === 'notcompleted') {
          yield put({
            type: 'saveTodoes',
            payload: response.data,
          });
        }
        if (payload.status === 'completed') {
          yield put({
            type: 'saveCompletedes',
            payload: response.data,
          });
        }
        if (payload.status === 'overdue') {
          yield put({
            type: 'saveOverdues',
            payload: response.data,
          });
        }
      }
    },
    // 学员获取推荐课程
    *getRecommendCourse({ payload }, { call, put }) {
      const response = yield call(getRecommendCourse, payload);
      yield put({
        type: 'saveRecommendCourse',
        payload: response,
      });
    },
    // ------------------------------------------------------------------
    /**
     * 1、我的学习计划 ——> 课程学习（MP4） ——> 获取视频资源，课程信息等
     *
     * 2、我的学习计划 ——> 课程学习（PDF） ——> 获取PDF资源，课程信息等
     */
    *GetLearnProgressDetail({ payload }, { call, put }) {
      // console.log(payload);
      const response = yield call(getLearnProgressDetail, payload);
      yield put({
        type: 'saveProgress',
        payload: response.data,
      }); // 返回结果 // 返回结果
    },

    // 我的学习计划 ——> 课程学习(pdf) ——> 发送pdf的当前页码和学习状态
    *SendProgress({ payload }, { call }) {
      // console.log(payload);
      yield call(sendProgress, payload);
    },
    // ------------------------------------------------------------------
  },

  reducers: {
    // 学员获取待完成、已完成、已逾期
    saveTodoes(state, action) {
      return {
        ...state,
        todoes: action.payload,
      };
    },
    saveCompletedes(state, action) {
      return {
        ...state,
        completedes: action.payload,
      };
    },
    saveOverdues(state, action) {
      return {
        ...state,
        overdues: action.payload,
      };
    },
    // 学员获取推荐课程
    saveRecommendCourse(state, action) {
      return {
        ...state,
        recommendCourse: action.payload,
      };
    },
    saveProgress(state, action) {
      const {
        payload: {
          // eslint-disable-next-line camelcase
          plan: { course, start_time, end_time, name },
          progress,
          status,
        },
      } = action;
      return {
        ...state,
        progressInfo: { course, start_time, end_time, name, progress, status },
      };
    },
  },
};
