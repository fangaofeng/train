// import { getQuizes, getQuiz, createQuiz, changeQuiz, delQuiz } from '@/services/questionnaire';

// export default {
//   namespace: 'Questionnaire',

//   state: {
//     quizes: { results: [], count: 0 },
//   },

//   effects: {
//     *GetQuizes({ payload }, { call, put }) {
//       const response = yield call(getQuizes, payload);
//       yield put({
//         type: 'saveQuiz',
//         payload: response.data,
//       });
//     },
//     *GetQuiz({ payload, callback }, { call }) {
//       console.log(payload);
//       const response = yield call(getQuiz, payload);
//       callback(response);
//     },
//     *CreateQuiz({ payload, callback }, { call }) {
//       const response = yield call(createQuiz, payload);
//       callback(response);
//     },
//     *ChangeQuiz({ payload, callback }, { call }) {
//       const response = yield call(changeQuiz, payload);
//       callback(response);
//     },
//     *DelQuiz({ payload, callback }, { call }) {
//       const response = yield call(delQuiz, payload);
//       callback(response);
//     },
//   },

//   reducers: {
//     saveQuiz(state, action) {
//       return {
//         ...state,
//         quizes: action.payload,
//       };
//     },
//   },
// };
