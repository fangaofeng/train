import {
  /**
   * 1、我的学习计划 ——> 课程学习（MP4） ——> 获取视频资源，课程信息等
   * 2、我的学习计划 ——> 课程学习（PDF） ——> 获取PDF资源，课程信息等
   */
  getExamProgress,
} from '@/services/MyExam/ExamPlan';

export default {
  namespace: 'MyExam',

  state: {
    todoes: { results: [], count: 0 }, // 待完成
    completedes: { results: [], count: 0 }, // 已完成
    overdues: { results: [], count: 0 }, // 已逾期
  },

  effects: {
    // 学员获取待完成、已完成、已逾期
    *getExamProgress({ payload }, { call, put }) {
      const response = yield call(getExamProgress, payload);
      if (response.status === 'ok') {
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
  },
};
