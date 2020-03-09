// import {
//   createQuizPlanSubmit, // 考试管理——>发布考试计划——>点击提交按钮
//   getQuizPlanes, // 考试计划管理——>编辑考试计划——>获取课程信息、讲师信息，获取计划名称、计划时间
//   editQuizPlan, // 考试计划管理——>编辑考试计划——>点击提交按钮
//   getQuizPlanDetail, // 考试计划管理——>查看考试计划——>获取课程信息、讲师信息，获取计划名称、计划时间
//   getQuizPlanGroups, // 考试计划管理——>查看考试计划——>查看培训群组考试详情（获取table表格数据）\
//   getPaperDetail
// } from '@/services/questionnaire/index';
// import {  } from '@/services/questionnaire/index';
// import { getTrainGroups, getTrainGroupMembers } from '@/services/trainGroupManager/index';

// export default {
//   namespace: 'QuestionnairePlan',

//   state: {
//     createGroups: { results: [], count: 0 }, // 考试管理——>发布考试计划——>查看培训群组（获取table表格数据）
//     createMembers: { results: [], count: 0 }, // 考试管理——>发布考试计划——>查看培训群组成员（获取table表格数据）
//     QuizPlans: { results: [], count: 0 }, // 考试计划管理——>主页，获取所有的考试计划
//     viewGroups: { results: [], count: 0 }, // 考试管理——>发布考试计划——>查看培训群组（获取table表格数据）
//     viewGroupMembers: { results: [], count: 0 }, // 考试管理——>发布考试计划——>查看培训群组成员（获取table表格数据）
//   },

//   effects: {
//     *GetPlanes({ payload }, { call, put }) {
//       const response = yield call(getQuizPlanes, payload);

//       if (response && response.status === 'ok') {
//         yield put({
//           type: 'saveAllQuizPlanes',
//           payload: response.data,
//         });
//       }
//     },

//     // 考试管理——>发布考试计划——>点击提交按钮
//     *CreatePlanSubmit({ payload, callback }, { call }) {
//       const response = yield call(createQuizPlanSubmit, payload);
//       callback(response); // 返回结果
//     },

//     //------------------------------------------------------------------
//     // 考试计划管理——>编辑考试计划——>获取课程信息、讲师信息，获取计划名称、计划时间
//     *GetPlan({ payload, callback }, { call }) {
//       const response = yield call(getQuizPlanDetail, payload);
//       callback(response); // 返回结果
//     },
//     // 考试计划管理——>编辑考试计划——>获取课程信息、讲师信息，获取计划名称、计划时间
//     *GetPaper({ payload, callback }, { call }) {
//       const response = yield call(getPaperDetail, payload);
//       callback(response); // 返回结果
//     },
//     *GetGroups({ payload }, { call, put }) {
//       // console.log('GetTrainGroups成功');
//       const response = yield call(getTrainGroups, payload);
//       if (response && response.status === 'ok') {
//         yield put({
//           type: 'saveCreateExamGetTrainGroup',
//           payload: response.data,
//         });
//       }
//     },
//     //
//     // 考试计划管理——>编辑考试计划——>点击提交按钮
//     *SubmitEditPlan({ payload, callback }, { call }) {
//       const response = yield call(editQuizPlan, payload);
//       callback(response); // 返回结果
//     },

//     // 考试计划管理——>查看考试计划——>查看培训群组考试详情（获取table表格数据）
//     *GetPlanGroups({ payload }, { call, put }) {
//       const response = yield call(getQuizPlanGroups, payload);
//       if (response && response.status === 'ok') {
//         console.log('成功');
//         yield put({
//           type: 'saveviewGroups',
//           payload: response.data,
//         });
//       }
//     },
//     *getQuizGroupMembers({ payload }, { call, put }) {
//       const response = yield call(getTrainGroupMembers, payload);
//       if (response && response.status === 'ok') {
//         console.log('成功');
//         yield put({
//           type: 'saveviewGroupMembers',
//           payload: response.data,
//         });
//       }
//     },
//     // ------------------------------------------------------------------
//     // 考试计划管理——>主页，归档考试计划
//     *ChangeStatus({ payload, callback }, { call }) {
//       const response = yield call(editQuizPlan, payload);
//       callback(response); // 返回结果
//     },
//     // ------------------------------------------------------------------
//   },

//   reducers: {
//     saveAllQuizPlanes(state, action) {
//       return {
//         ...state,
//         QuizPlans: action.payload,
//       };
//     },
//     // ------------------------------------------------------------------
//     // 考试管理——>发布考试计划——>查看培训群组（获取table表格数据）
//     saveCreateExamGetTrainGroup(state, action) {
//       return {
//         ...state,
//         createGroups: action.payload,
//       };
//     },
//     // 考试管理——>发布考试计划——>查看培训群组成员（获取table表格数据）
//     saveCreateExamGetTrainMembers(state, action) {
//       return {
//         ...state,
//         createMembers: action.payload,
//       };
//     },
//     // ------------------------------------------------------------------

//     saveviewGroups(state, action) {
//       return {
//         ...state,
//         viewGroups: action.payload,
//       };
//     },
//     // 考试计划管理——>查看考试计划——>查看培训群组考试详情（获取table表格数据）
//     saveviewGroupMembers(state, action) {
//       return {
//         ...state,
//         viewGroupMembers: action.payload,
//       };
//     },
//     // ------------------------------------------------------------------
//   },
// };
