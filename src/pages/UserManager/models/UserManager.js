import {
  // getbatchImportData,// 系统管理员 ————> 系统管理 ————> 用户管理 ————> 获取批量导入的table表格用户数据
  getUser,
  getUsers,
} from '@/services/userManager';

export default {
  namespace: 'UserManager',

  state: {
    batchImportData: { results: [], count: 0 }, // 系统管理员 ————> 系统管理 ————> 用户管理 ————> 获取批量导入的table表格用户数据
    Users: { results: [], count: 0 }, // 系统管理员 ————> 系统管理 ————> 用户管理 ————> 获取所有的用户数据
    userInfo: null,
  },

  effects: {
    // 系统管理员 ————> 系统管理 ————> 用户管理 ————> 获取批量导入的table表格用户数据
    *GetbatchImportData({ payload }, { call, put }) {
      // const response = yield call(getbatchImportData,payload);
      const response = yield call(getUsers, payload);
      yield put({
        type: 'savebatchImportData',
        payload: response,
      });
    },
    // 系统管理员 ————> 系统管理 ————> 用户管理 ————> 获取所有的用户数据
    *GetUsers({ payload }, { call, put }) {
      // const response = yield call(getAllUserManagerTableData,payload);
      const response = yield call(getUsers, payload);
      yield put({
        type: 'saveAllUserManagerTableData',
        payload: response.data,
      });
    },
    *GetUser({ payload, callback }, { call, put }) {
      // const response = yield call(getAllUserManagerTableData,payload);
      const response = yield call(getUser, payload);
      yield put({
        type: 'saveUserInfo',
        payload: response.data,
      });
      callback(response);
    },
  },

  reducers: {
    // 系统管理员 ————> 系统管理 ————> 用户管理 ————> 获取批量导入的table表格用户数据
    savebatchImportData(state, action) {
      return {
        ...state,
        batchImportData: action.payload,
      };
    },
    // 系统管理员 ————> 系统管理 ————> 用户管理 ————> 获取所有的用户数据
    saveAllUserManagerTableData(state, action) {
      return {
        ...state,
        Users: action.payload,
      };
    },
    saveUserInfo(state, action) {
      return {
        ...state,
        userInfo: action.payload,
      };
    },
  },
};
