import {
    // getBatchImportTableData,// 系统管理员 ————> 系统管理 ————> 用户管理 ————> 获取批量导入的table表格用户数据
    // getAllUserManagerTableData // 系统管理员 ————> 系统管理 ————> 用户管理 ————> 获取所有的用户数据
    getUserManagerTableData
} from '@/services/systemManager/userManager/userManager';

export default {
  namespace: 'userManager',

  state: {
    batchImportTableData:{results:[]},// 系统管理员 ————> 系统管理 ————> 用户管理 ————> 获取批量导入的table表格用户数据
    allUsersTableData:{results:[]},// 系统管理员 ————> 系统管理 ————> 用户管理 ————> 获取所有的用户数据
  },

  effects: {
    // 系统管理员 ————> 系统管理 ————> 用户管理 ————> 获取批量导入的table表格用户数据
    *GetBatchImportTableData({ payload }, { call, put }) {
      // const response = yield call(getBatchImportTableData,payload);
      const response = yield call(getUserManagerTableData,payload);
      yield put({
        type: 'saveBatchImportTableData',
        payload: response,
      });
    },
    // 系统管理员 ————> 系统管理 ————> 用户管理 ————> 获取所有的用户数据
    *GetAllUserManagerTableData({ payload }, { call, put }) {
      // const response = yield call(getAllUserManagerTableData,payload);
      const response = yield call(getUserManagerTableData,payload);
      yield put({
        type: 'saveAllUserManagerTableData',
        payload: response,
      });
    },
  },

  reducers: {
    // 系统管理员 ————> 系统管理 ————> 用户管理 ————> 获取批量导入的table表格用户数据
    saveBatchImportTableData(state,action){
      return {
        ...state,
        batchImportTableData: action.payload,
      }
    },
    // 系统管理员 ————> 系统管理 ————> 用户管理 ————> 获取所有的用户数据
    saveAllUserManagerTableData(state,action){
      return {
        ...state,
        allUsersTableData: action.payload,
      }
    },
  }
};
