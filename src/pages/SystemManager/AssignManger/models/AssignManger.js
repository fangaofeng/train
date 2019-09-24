import {
  getOrgsDeparments, // 判断是否有部门、是否有用户
} from '@/services/systemManager/departmentManager/departmentManager';

export default {
  namespace: 'DepartmentManager',

  state: {},

  effects: {
    // 判断是否有部门、是否有用户
    *GetOrgsDeparments({ callback }, { call }) {
      const response = yield call(getOrgsDeparments);
      callback(response);
    },
  },
  reducers: {},
};
