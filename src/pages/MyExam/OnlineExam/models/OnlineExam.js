import {
  getOnlineExamBasicInfo,
  getExamQuestions, // 学员——>我的考试——>我的考试计划——>在线考试——>获取试卷信息
  submitExam,
} from '@/services/MyExam/OnlineExam';

export default {
  namespace: 'onlineExam',

  state: { questions: [], count: 0 }, // 待完成},

  effects: {
    // 学员——>我的考试——>我的考试计划——>在线考试——>获取试卷信息
    *GetOnlineExamBasicInfo({ payload, callback }, { call }) {
      const response = yield call(getOnlineExamBasicInfo, payload);
      callback(response); // 返回结果
    },
    *GetExamQuestions({ payload }, { call, put }) {
      // console.log(payload);
      const response = yield call(getExamQuestions, payload);
      yield put({
        type: 'saveQuestions',
        payload: response.data,
      }); // 返回结果
    },
    *SubmitExam({ payload, callback }, { call }) {
      const response = yield call(submitExam, payload);
      callback(response); // 返回结果
    },
  },

  reducers: {
    saveQuestions(state, action) {
      return {
        ...state,
        questions: action.payload.results,
        count: action.payload.count,
      };
    },
  },
};
