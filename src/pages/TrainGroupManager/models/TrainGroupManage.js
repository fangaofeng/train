import {
  getTrainGroups, // 培训群组管理（获取table表格数据）
  delTGManager, // 培训群组管理（删除）
  batchDelTGManager, // 培训群组管理（批量删除）
  getAddTrainGroupData, // 增加培训群组（获取table表格数据）
  addTGManagerSubmit, // 增加培训群组(点击提交按钮)
  getViewTrainGroupData, // 查看培训群组（获取table表格数据）
  delEditTGManager, // 编辑培训群组（删除）
  batchDelEditTGManager, // 编辑培训群组（批量删除）
  changeEditTGName, // 编辑培训群组（修改群组名称）
  getEditTGAddData, // 编辑培训群组（增加群组成员的Table表格数据）
  submitEditTGAddMember, // 编辑培训群组（增加群组成员提交按钮）
  getTrainGroupMembers,
} from '@/services/trainGroupManager/index';

export default {
  namespace: 'trainGroupManager',

  state: {
    allTrainGroupTableData: { results: [] }, // 培训群组管理（获取table表格数据）
    addTrainGroupTableData: { results: [] }, // 增加培训群组（获取table表格数据）
    viewTrainGroupTableData: { results: [] }, // 查看培训群组（获取table表格数据）
    EditTrainGroupTableData: { results: [] }, // 编辑培训群组（获取现有群组成员的Table表格数据）
    EditAddMemberTableData: { results: [] }, // 编辑培训群组（增加群组成员的Table表格数据）
  },

  effects: {
    // ------------------------------------------------------------------
    // 培训群组管理（获取table表格数据）
    *GetAllTrainGroupData({ payload }, { call, put }) {
      const response = yield call(getTrainGroups, payload);
      yield put({
        type: 'saveAllTrainGroupData',
        payload: response.data,
      });
    },
    // 培训群组管理（删除）
    *DelTGManager({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(delTGManager, payload);
      callback(response); // 返回结果
    },
    // 培训群组管理（批量删除）
    *BatchDelTGManager({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(batchDelTGManager, payload);
      callback(response); // 返回结果
    },
    // ------------------------------------------------------------------
    // 增加培训群组（获取table表格数据）
    *GetAddTrainGroupData({ payload }, { call, put }) {
      const response = yield call(getAddTrainGroupData, payload);
      yield put({
        type: 'saveAddTrainGroupData',
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
    *GetViewTrainGroupData({ payload }, { call, put }) {
      const response = yield call(getViewTrainGroupData, payload);
      yield put({
        type: 'saveViewTrainGroupData',
        payload: response.data,
      });
    },
    // ------------------------------------------------------------------
    // 编辑培训群组（获取现有群组成员的Table表格数据）
    *GetEditTrainGroupData({ payload }, { call, put }) {
      const response = yield call(getTrainGroupMembers, payload);
      yield put({
        type: 'saveEditTrainGroupData',
        payload: response,
      });
    },
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
        payload: response,
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
    saveAllTrainGroupData(state, action) {
      return {
        ...state,
        allTrainGroupTableData: action.payload,
      };
    },
    // 增加培训群组（获取table表格数据）
    saveAddTrainGroupData(state, action) {
      return {
        ...state,
        addTrainGroupTableData: action.payload,
      };
    },

    // 查看培训群组（获取table表格数据）
    saveViewTrainGroupData(state, action) {
      return {
        ...state,
        viewTrainGroupTableData: action.payload,
      };
    },
    // 编辑培训群组（获取现有群组成员的Table表格数据）
    saveEditTrainGroupData(state, action) {
      return {
        ...state,
        EditTrainGroupTableData: action.payload,
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
