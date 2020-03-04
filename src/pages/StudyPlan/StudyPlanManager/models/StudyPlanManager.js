import {
  // getViewTGMembers, // 学习计划管理——>创建学习计划——>查看培训群组成员（获取table表格数据）
  submitCreateSP, // 学习计划管理——>创建学习计划——>点击提交按钮
  getLearnPlan, // 学习计划管理——>主页，获取所有的学习计划
  getCourseAndPlanInfo, // 学习计划管理——>编辑学习计划——>获取课程信息、讲师信息，获取计划名称、计划时间
  submitEditSP, // 学习计划管理——>编辑学习计划——>点击提交按钮
  getSPGroups, // 学习计划管理——>查看学习计划（获取table表格数据）
  getViewSPGroupDetails, // 学习计划管理——>查看学习计划——>查看培训群组学习详情（获取table表格数据）\
  changeStatus, // 学习计划管理——>主页，归档学习计划
} from '@/services/studyPlan/studyPlanManager/index';

import { getCourseTeacherInfo } from '@/services/courseware/index';
import { getTrainGroups, getTrainGroupMembers } from '@/services/trainGroupManager/index';

export default {
  namespace: 'StudyPlanManager',

  state: {
    createSPData: { results: [], count: 0 }, // 学习计划管理——>创建学习计划（获取table表格数据）
    viewTGMembersData: { results: [], count: 0 }, // 学习计划管理——>创建学习计划——>查看培训群组成员（获取table表格数据）

    studyPlans: { results: [], count: 0 }, // 学习计划管理——>主页，获取所有的学习计划

    viewSPData: { results: [], count: 0 }, // 学习计划管理——>查看学习计划（获取table表格数据）
    viewSPDataDetails: { results: [], count: 0 }, // 学习计划管理——>查看学习计划——>查看培训群组学习详情（获取table表格数据）
  },

  effects: {
    // ------------------------------------------------------------------
    // 学习计划管理——>创建学习计划——>获取课程信息，讲师信息
    *GetCourseTeacherInfo({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(getCourseTeacherInfo, payload);
      callback(response); // 返回结果
    },
    // 学习计划管理——>创建学习计划（获取table表格数据）
    *GetTrainGroups({ payload }, { call, put }) {
      const response = yield call(getTrainGroups, payload);
      yield put({
        type: 'saveCreateSPData',
        payload: response.data,
      });
    },
    // 学习计划管理——>创建学习计划——>查看培训群组成员（获取table表格数据）
    *GetViewTGMembers({ payload }, { call, put }) {
      const response = yield call(getTrainGroupMembers, payload);
      yield put({
        type: 'saveViewTGMembers',
        payload: response.data,
      });
    },
    // 学习计划管理——>创建学习计划——>点击提交按钮
    *SubmitCreateSP({ payload, callback }, { call }) {
      // console.log(payload);
      const response = yield call(submitCreateSP, payload);
      callback(response); // 返回结果
    },
    // ------------------------------------------------------------------
    // 学习计划管理——>主页，获取所有的学习计划
    *GetLearnPlans({ payload }, { call, put }) {
      const response = yield call(getLearnPlan, payload);
      console.log(response);
      if (response && response.status === 'ok') {
        yield put({
          type: 'saveAllSPTableData',
          payload: response.data,
        });
      }
    },
    // ------------------------------------------------------------------

    // 学习计划管理——>编辑学习计划——>点击提交按钮
    *SubmitEditSP({ payload, callback }, { call }) {
      const response = yield call(submitEditSP, payload);
      callback(response); // 返回结果
    },
    // ------------------------------------------------------------------
    // 学习计划管理——>查看学习计划——>获取课程信息、讲师信息，获取计划名称、计划时间
    *ViewGetCourseAndPlanInfo({ payload, callback }, { call }) {
      const response = yield call(getCourseAndPlanInfo, payload);
      callback(response); // 返回结果
    },
    // 学习计划管理——>查看学习计划（获取table表格数据）
    *GetViewSPData({ payload }, { call, put }) {
      const response = yield call(getSPGroups, payload);
      if (response && response.status === 'ok') {
        // console.log('成功');
        yield put({
          type: 'saveViewSPData',
          payload: response.data,
        });
      }
    },
    // 学习计划管理——>查看学习计划——>查看培训群组学习详情（获取table表格数据）
    *GetViewSPDataDetails({ payload }, { call, put }) {
      const response = yield call(getViewSPGroupDetails, payload);
      if (response && response.status === 'ok') {
        // console.log('成功');
        yield put({
          type: 'saveViewSPDataDetails',
          payload: response.data,
        });
      }
    },
    // ------------------------------------------------------------------
    // 学习计划管理——>主页，归档学习计划
    *ChangeStatus({ payload, callback }, { call }) {
      const response = yield call(changeStatus, payload);
      callback(response); // 返回结果
    },
    // ------------------------------------------------------------------
  },

  reducers: {
    // ------------------------------------------------------------------
    // 学习计划管理——>创建学习计划（获取table表格数据）
    saveCreateSPData(state, action) {
      return {
        ...state,
        createSPData: action.payload,
      };
    },
    // 学习计划管理——>创建学习计划——>查看培训群组成员（获取table表格数据）
    saveViewTGMembers(state, action) {
      return {
        ...state,
        viewTGMembersData: action.payload,
      };
    },
    // ------------------------------------------------------------------
    // 学习计划管理——>主页，获取所有的学习计划
    saveAllSPTableData(state, action) {
      return {
        ...state,
        studyPlans: action.payload,
      };
    },
    // ------------------------------------------------------------------
    // 学习计划管理——>查看学习计划（获取table表格数据）
    saveViewSPData(state, action) {
      return {
        ...state,
        viewSPData: action.payload,
      };
    },
    // 学习计划管理——>查看学习计划——>查看培训群组学习详情（获取table表格数据）
    saveViewSPDataDetails(state, action) {
      return {
        ...state,
        viewSPDataDetails: action.payload,
      };
    },
    // ------------------------------------------------------------------
  },
};
