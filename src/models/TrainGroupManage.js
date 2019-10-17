import {
  getTrainGroups, // 培训群组管理（获取table表格数据）
  // delTGManager, // 培训群组管理（删除）
  batchDelTGManager, // 培训群组管理（批量删除）
  addTGManagerSubmit, // 增加培训群组(点击提交按钮)
  getTrainGroupMembers, // 查看培训群组（获取table表格数据）
  delEditTGManager, // 编辑培训群组（删除）
  batchDelEditTGManager, // 编辑培训群组（批量删除）
  changeEditTGName, // 编辑培训群组（修改群组名称）
  getEditTGAddData, // 编辑培训群组（增加群组成员的Table表格数据）
  submitEditTGAddMember, // 编辑培训群组（增加群组成员提交按钮）
} from '@/services/trainGroupManager/index';

import { getUsers } from '@/services/user';

export default {
  namespace: 'trainGroupManager',

  state: {
    trainGroups: { results: [], count: 0 }, // 培训群组管理（获取table表格数据）
    addUsers: { results: [] }, // 增加培训群组（获取table表格数据）
    trainGroupMembers: { results: [], count: 0 }, // 查看培训群组（获取table表格数据）
    EditAddMemberTableData: { results: [] }, // 编辑培训群组（增加群组成员的Table表格数据）
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
    // 培训群组管理（删除）
    // *DelTGManager({ payload, callback }, { call }) {
    //   console.log(payload);
    //   const response = yield call(delTGManager, payload);
    //   callback(response); // 返回结果
    // },
    // 培训群组管理（批量删除）
    *BatchDelTraingroups({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(batchDelTGManager, payload);
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
    *AddTGManagerSubmit({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(addTGManagerSubmit, payload);
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
    *DelEditTGManager({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(delEditTGManager, payload);
      callback(response); // 返回结果
    },
    // 编辑培训群组（批量删除）
    *BatchDelEditTGManager({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(batchDelEditTGManager, payload);
      callback(response); // 返回结果
    },
    // 编辑培训群组（修改群组名称）
    *ChangeEditTGName({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(changeEditTGName, payload);
      callback(response); // 返回结果
    },
    // 编辑培训群组（增加群组成员的Table表格数据）
    *GetEditTGAddData({ payload }, { call, put }) {
      const response = yield call(getEditTGAddData, payload);
      yield put({
        type: 'saveEditTGAddData',
        payload: response.data,
      });
    },
    // 编辑培训群组（增加群组成员提交按钮）
    *SubmitEditTGAddMember({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(submitEditTGAddMember, payload);
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
        EditAddMemberTableData: action.payload,
      };
    },
  },
};
