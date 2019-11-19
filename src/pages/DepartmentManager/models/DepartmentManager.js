import {
  changeOrgsDeparmentsName,
  delOrgsDeparments,
  createOrgsDeparments,
  getOrgsDeparments,
  changerTrainManager,
  getOrgsDeparment, // 判断是否有部门、是否有用户
} from '@/services/departmentManager/index';

export default {
  namespace: 'DepartmentManager',

  state: { departments: [], ui: null },

  effects: {
    // 判断是否有部门、是否有用户
    *GetOrgsDeparments(_, { call, put }) {
      const response = yield call(getOrgsDeparments);
      yield put({
        type: 'saveDepartments',
        payload: response,
      });
    },
    *DelOrgsDeparments({ payload }, { call, put }) {
      const response = yield call(delOrgsDeparments, payload);
      yield put({
        type: 'saveDepartmentsnoui',
        payload: response,
      });
    },
    *PatchOrgsDeparments({ payload }, { call, put }) {
      const response = yield call(changeOrgsDeparmentsName, payload);
      yield put({
        type: 'saveDepartments',
        payload: response,
      });
    },
    *CreateOrgsDeparments({ payload }, { call, put }) {
      const response = yield call(createOrgsDeparments, payload);
      yield put({
        type: 'saveDepartmentsnoui',
        payload: response,
      });
    },
    *ChangerDeparmenTrainManager({ payload, callback }, { call, put }) {
      const params = { data: { trainmanager: payload.data[0] }, id: payload.id };
      const response = yield call(changerTrainManager, params);
      yield put({
        type: 'saveDepartmentsnoui',
        payload: response,
      });
      callback(response);
    },
    *GetDeparmentTrainManager({ payload, callback }, { call }) {
      const response = yield call(getOrgsDeparment, payload);
      callback(response);
    },
  },
  reducers: {
    saveDepartments(state, action) {
      return {
        ui: action.payload.ui,
        departments: action.payload.data,
      };
    },
    saveDepartmentsnoui(state, action) {
      return {
        departments: action.payload.data,
      };
    },
  },
};
