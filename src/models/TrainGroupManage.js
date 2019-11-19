import {
  getTrainGroups, // 培训群组管理（获取table表格数据）
  // delTrainGroups, // 培训群组管理（删除）
  delTrainGroups, // 培训群组管理（批量删除）
  addTrainGroup, // 增加培训群组(点击提交按钮)
  getTrainGroupMembers, // 查看培训群组（获取table表格数据）
  delTgMembers, // 编辑培训群组（删除）
  changeTgName, // 编辑培训群组（修改群组名称）
  getTgOutUsers, // 编辑培训群组（增加群组成员的Table表格数据）
  addTgMember, // 编辑培训群组（增加群组成员提交按钮）
} from '@/services/trainGroupManager/index';

import { getUsers } from '@/services/userManager';

export default {
  namespace: 'trainGroupManager',

  state: {
    trainGroups: { results: [], count: 0 }, // 培训群组管理（获取table表格数据）
    addUsers: { results: [] }, // 增加培训群组（获取table表格数据）
    trainGroupMembers: { results: [], count: 0 }, // 查看培训群组（获取table表格数据）
    AddMember: { results: [] }, // 编辑培训群组（增加群组成员的Table表格数据）
  },

  effects: {
    // ------------------------------------------------------------------
    // 培训群组管理（获取table表格数据）
    *GetTrainGroups({ payload }, { call, put }) {
      const response = yield call(getTrainGroups, payload);
      yield put({
        type: 'saveTrainGroups',
        payload: response.data,
      });
    },

    *DelTraingroups({ payload, callback }, { call }) {
      const params = { traingroups: payload.data };
      const response = yield call(delTrainGroups, params);
      callback(response); // 返回结果
    },
    // ------------------------------------------------------------------
    // 增加培训群组（获取table表格数据）
    *GetUsers({ payload }, { call, put }) {
      const response = yield call(getUsers, payload);
      yield put({
        type: 'saveUsers',
        payload: response.data,
      });
    },
    // 增加培训群组(点击提交按钮)
    *addTrainGroup({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(addTrainGroup, payload);
      callback(response); // 返回结果
    },
    // ------------------------------------------------------------------
    // 查看培训群组（获取table表格数据）
    *GetTrainGroupMembers({ payload }, { call, put }) {
      const response = yield call(getTrainGroupMembers, payload);
      yield put({
        type: 'saveTrainGroupMembers',
        payload: response.data,
      });
    },
    // ------------------------------------------------------------------
    // 编辑培训群组（删除）
    *delTgMembers({ payload, callback }, { call }) {
      const params = payload;
      params.data = { traines: payload.data };
      const response = yield call(delTgMembers, params);
      callback(response); // 返回结果
    },

    // 编辑培训群组（修改群组名称）
    *changeTgName({ payload, callback }, { call }) {
      const response = yield call(changeTgName, payload);
      callback(response); // 返回结果
    },
    // 编辑培训群组（增加群组成员的Table表格数据）
    *getTgOutUsers({ payload }, { call, put }) {
      const response = yield call(getTgOutUsers, payload);
      yield put({
        type: 'saveEditTGAddData',
        payload: response.data,
      });
    },
    // 编辑培训群组（增加群组成员提交按钮）
    *addTgMember({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(addTgMember, payload);
      callback(response); // 返回结果
    },
    // ------------------------------------------------------------------
  },

  reducers: {
    // 培训群组管理（获取table表格数据）
    saveTrainGroups(state, action) {
      return {
        ...state,
        trainGroups: action.payload,
      };
    },
    // 增加培训群组（获取table表格数据）
    saveUsers(state, action) {
      return {
        ...state,
        addUsers: action.payload,
      };
    },

    // 查看培训群组（获取table表格数据）
    saveTrainGroupMembers(state, action) {
      return {
        ...state,
        trainGroupMembers: action.payload,
      };
    },
    // 编辑培训群组（获取现有群组成员的Table表格数据）
    saveEditTrainGroupData(state, action) {
      return {
        ...state,
        trainGroupMembers: action.payload,
      };
    },
    // 编辑培训群组（增加群组成员的Table表格数据）
    saveEditTGAddData(state, action) {
      return {
        ...state,
        AddMember: action.payload,
      };
    },
  },
};
