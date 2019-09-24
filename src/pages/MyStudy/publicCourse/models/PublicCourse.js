import {
  getAllCourseManagerListData, // 系统管理员 ——> 课件管理 ——> 主页，获取所有课件的表格数据
  getCourseTeacherInfo, // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 获取课件信息，老师信息
} from '@/services/courseware/coursewareManager/index';

export default {
  namespace: 'PublicCourse',

  state: {
    publicCourse: { results: [], count: 0 }, // 系统管理员 ——> 课件管理 ——> 主页，获取所有课件的表格数据
  },

  effects: {
    // ------------------------------------------------------------------
    // 系统管理员 ——> 课件管理 ——> 主页，获取所有课件的表格数据
    *getPublicCourses({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(getAllCourseManagerListData, payload);
      if (response.status === 'ok') {
        console.log('成功');
        yield put({
          type: 'savePublicCourse',
          payload: response.data,
        });
      }
    },
    // 系统管理员 ——> 课件管理 ——> 主页，删除课件
    // ------------------------------------------------------------------
    // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 获取课件信息，老师信息
    *GetCourseTeacherInfo({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(getCourseTeacherInfo, payload);
      callback(response); // 返回结果
    },
    // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 获取现有培训管理员的Table表格数据

    // ------------------------------------------------------------------
  },

  reducers: {
    // ------------------------------------------------------------------
    // 系统管理员 ——> 课件管理 ——> 主页，获取所有课件的表格数据
    savePublicCourse(state, action) {
      return {
        ...state,
        publicCourse: action.payload,
      };
    },

    // ------------------------------------------------------------------
  },
};
