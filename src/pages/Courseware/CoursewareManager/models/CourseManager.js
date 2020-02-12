import {
  getCourses, // 系统管理员 ——> 课件管理 ——> 主页，获取所有课件的表格数据
  delCourse, // 系统管理员 ——> 课件管理 ——> 主页，删除课件
  getCourseTeacherInfo, // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 获取课件信息，老师信息
  getTrainersData, // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 获取现有培训管理员的Table表格数据
  delTrainmanagers, // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 批量删除
  getOtherTrainers, // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 增加培训管理员模态框Table表格数据
  submitAddedData, // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 增加培训管理员模态框提交按钮
  changeCourseStatus, // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中、已上架、已下架）——> 上架课件、重新上架课件
  courseChangeData,
} from '@/services/courseware/index';
// import Immutable from 'immutable';

export default {
  namespace: 'CourseManager',

  state: {
    allCourseManager: { results: [], count: 0 }, // 系统管理员 ——> 课件管理 ——> 主页，获取所有课件的表格数据
    currenttrainmanagers: { results: [], count: 0 }, // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 获取现有培训管理员的Table表格数据
    addtrainmanagers: { results: [], count: 0 }, // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 增加培训管理员模态框Table表格数据
    courseware: null,
  },

  effects: {
    // ------------------------------------------------------------------
    // 系统管理员 ——> 课件管理 ——> 主页，获取所有课件的表格数据
    *GetCourses({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(getCourses, payload);
      if (response && response.status === 'ok') {
        console.log('成功');
        yield put({
          type: 'saveAllCourseManagerTableData',
          payload: response.data,
        });
      }
    },
    *GetCourse({ payload, callback }, { call, put }) {
      console.log(payload);
      const response = yield call(getCourseTeacherInfo, payload);
      if (response && response.status === 'ok') {
        // console.log('成功');
        yield put({
          type: 'saveCourseInfo',
          payload: response.data,
        });
        callback(response.data);
      }
    },
    // 系统管理员 ——> 课件管理 ——> 主页，删除课件
    *DelCourse({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(delCourse, payload);
      callback(response); // 返回结果
    },
    // 系统管理员 ——> 课件管理 ——> 主页，下架课件
    // 系统管理员 ——> 课件管理 ——> 主页，归档课件
    *CourseChangeStatus({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(changeCourseStatus, payload);
      callback(response); // 返回结果
    },
    *CourseChangeData({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(courseChangeData, payload);
      callback(response); // 返回结果
    },
    // ------------------------------------------------------------------
    // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 获取课件信息，老师信息
    *GetCourseTeacherInfo({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(getCourseTeacherInfo, payload);
      console.log(payload);
      callback(response); // 返回结果
    },
    // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 获取现有培训管理员的Table表格数据
    *GetTrainmanagers({ payload }, { call, put }) {
      const response = yield call(getTrainersData, payload);
      if (response && response.status === 'ok') {
        console.log('成功');
        yield put({
          type: 'saveTrainersData',
          payload: response.data,
        });
      }
    },
    // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 单个删除
    // *DelOneData({ payload, callback }, { call }) {
    //   console.log(payload);
    //   const response = yield call(delOneData, payload);
    //   callback(response); // 返回结果
    // },
    // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 批量删除管理员
    *DelTrainmanagers({ payload, callback }, { call }) {
      const data = {};
      data.trainermanagers = payload.data;
      data.id = payload.id;
      const response = yield call(delTrainmanagers, data);
      callback(response); // 返回结果
    },
    // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 增加培训管理员模态框Table表格数据
    *GetOtherTrainmanagers({ payload }, { call, put }) {
      console.log('GetOtherTrainmanagers');
      const response = yield call(getOtherTrainers, payload);
      if (response && response.status === 'ok') {
        console.log('成功');
        yield put({
          type: 'saveAddTrainersData',
          payload: response.data,
        });
      }
    },
    // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 增加培训管理员模态框提交按钮
    *SubmitAddedData({ payload, callback }, { call }) {
      const param = { id: payload.id, data: { trainermanagers: payload.selectedKeys } };
      // param.data.trainermanagers = payload.selectedKeys;
      // param.id = payload.id;
      console.log(param);
      const response = yield call(submitAddedData, param);
      callback(response); // 返回结果
    },
    // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中、已上架、已下架）——> 上架课件、重新上架课件
    *ChangeCourseStatus({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(changeCourseStatus, payload);
      callback(response); // 返回结果
    },
    // ------------------------------------------------------------------
  },

  reducers: {
    // ------------------------------------------------------------------
    // 系统管理员 ——> 课件管理 ——> 主页，获取所有课件的表格数据
    saveAllCourseManagerTableData(state, action) {
      return {
        ...state,
        allCourseManager: action.payload,
      };
    },
    saveCourseInfo(state, action) {
      return {
        ...state,
        courseware: action.payload,
      };
    },
    // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 获取现有培训管理员的Table表格数据
    saveTrainersData(state, action) {
      return {
        ...state,
        currenttrainmanagers: action.payload,
      };
    },
    // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 增加培训管理员模态框Table表格数据
    saveAddTrainersData(state, action) {
      return {
        ...state,
        addtrainmanagers: action.payload,
      };
    },
    // ------------------------------------------------------------------
  },
};
