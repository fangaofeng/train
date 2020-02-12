import {
  // createExamGetTestInfo, // 培训管理员 ——> 考试管理 ——> 发布考试计划 ——> 获取试卷信息
  // createExamGetTrainGroup, // 考试管理——>发布考试计划——>查看培训群组（获取table表格数据）
  // createExamGetTrainMembers, // 考试管理——>发布考试计划——>查看培训群组成员（获取table表格数据）
  createExampalnSubmit, // 考试管理——>发布考试计划——>点击提交按钮
  getExamPlanList, // 考试计划管理——>编辑考试计划——>获取课程信息、讲师信息，获取计划名称、计划时间
  editExamplan, // 考试计划管理——>编辑考试计划——>点击提交按钮
  getExamplanDetail, // 考试计划管理——>查看考试计划——>获取课程信息、讲师信息，获取计划名称、计划时间
  // getSPGroups,// 考试计划管理——>查看考试计划（获取table表格数据）
  getExamplanGroups, // 考试计划管理——>查看考试计划——>查看培训群组考试详情（获取table表格数据）\
} from '@/services/examPlan/examPlanManager/index';
import { getPaperDetail } from '@/services/exam/index';
import { getTrainGroups, getTrainGroupMembers } from '@/services/trainGroupManager/index';

export default {
  namespace: 'ExamPlanManager',

  state: {
    createGroups: { results: [], count: 0 }, // 考试管理——>发布考试计划——>查看培训群组（获取table表格数据）
    createMembers: { results: [], count: 0 }, // 考试管理——>发布考试计划——>查看培训群组成员（获取table表格数据）
    examPlans: { results: [], count: 0 }, // 考试计划管理——>主页，获取所有的考试计划
    viewGroups: { results: [], count: 0 }, // 考试管理——>发布考试计划——>查看培训群组（获取table表格数据）
    viewGroupMembers: { results: [], count: 0 }, // 考试管理——>发布考试计划——>查看培训群组成员（获取table表格数据）
  },

  effects: {
    *GetExamPlanList({ payload }, { call, put }) {
      const response = yield call(getExamPlanList, payload);

      if (response && response.status === 'ok') {
        yield put({
          type: 'saveAllExamPlanData',
          payload: response.data,
        });
      }
    },

    // 考试管理——>发布考试计划——>点击提交按钮
    *CreateExamplanSubmit({ payload, callback }, { call }) {
      const response = yield call(createExampalnSubmit, payload);
      callback(response); // 返回结果
    },

    //------------------------------------------------------------------
    // 考试计划管理——>编辑考试计划——>获取课程信息、讲师信息，获取计划名称、计划时间
    *GetExamplanDetail({ payload, callback }, { call }) {
      const response = yield call(getExamplanDetail, payload);
      callback(response); // 返回结果
    },
    // 考试计划管理——>编辑考试计划——>获取课程信息、讲师信息，获取计划名称、计划时间
    *GetPaper({ payload, callback }, { call }) {
      const response = yield call(getPaperDetail, payload);
      callback(response); // 返回结果
    },
    *GetTrainGroups({ payload }, { call, put }) {
      // console.log('GetTrainGroups成功');
      const response = yield call(getTrainGroups, payload);
      if (response && response.status === 'ok') {
        yield put({
          type: 'saveCreateExamGetTrainGroup',
          payload: response.data,
        });
      }
    },
    //
    // 考试计划管理——>编辑考试计划——>点击提交按钮
    *SubmitEditExamplan({ payload, callback }, { call }) {
      const response = yield call(editExamplan, payload);
      callback(response); // 返回结果
    },

    // 考试计划管理——>查看考试计划——>查看培训群组考试详情（获取table表格数据）
    *GetExamplanGroups({ payload }, { call, put }) {
      const response = yield call(getExamplanGroups, payload);
      if (response && response.status === 'ok') {
        console.log('成功');
        yield put({
          type: 'saveviewGroups',
          payload: response.data,
        });
      }
    },
    *getExamplanGroupMembers({ payload }, { call, put }) {
      const response = yield call(getTrainGroupMembers, payload);
      if (response && response.status === 'ok') {
        console.log('成功');
        yield put({
          type: 'saveviewGroupMembers',
          payload: response.data,
        });
      }
    },
    // ------------------------------------------------------------------
    // 考试计划管理——>主页，归档考试计划
    *ChangeStatus({ payload, callback }, { call }) {
      const response = yield call(editExamplan, payload);
      callback(response); // 返回结果
    },
    // ------------------------------------------------------------------
  },

  reducers: {
    // saveAllTestPapersTableData(state, action) {
    //   return {
    //     ...state,
    //     examPapers: action.payload,
    //   };
    // },
    saveAllExamPlanData(state, action) {
      return {
        ...state,
        examPlans: action.payload,
      };
    },
    // ------------------------------------------------------------------
    // 考试管理——>发布考试计划——>查看培训群组（获取table表格数据）
    saveCreateExamGetTrainGroup(state, action) {
      return {
        ...state,
        createGroups: action.payload,
      };
    },
    // 考试管理——>发布考试计划——>查看培训群组成员（获取table表格数据）
    saveCreateExamGetTrainMembers(state, action) {
      return {
        ...state,
        createMembers: action.payload,
      };
    },
    // ------------------------------------------------------------------
    // 考试计划管理——>主页，获取所有的考试计划
    // saveAllSPTableData(state,action){
    //   return {
    //     ...state,
    //     studyPlans: action.payload,
    //   }
    // },
    // ------------------------------------------------------------------
    // 考试计划管理——>查看考试计划（获取table表格数据）
    saveviewGroups(state, action) {
      return {
        ...state,
        viewGroups: action.payload,
      };
    },
    // 考试计划管理——>查看考试计划——>查看培训群组考试详情（获取table表格数据）
    saveviewGroupMembers(state, action) {
      return {
        ...state,
        viewGroupMembers: action.payload,
      };
    },
    // ------------------------------------------------------------------
  },
};
