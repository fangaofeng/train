import {
  getAllCourseManagerListData, // 系统管理员 ——> 课件管理 ——> 主页，获取所有课件的表格数据
  delCourse, // 系统管理员 ——> 课件管理 ——> 主页，删除课件
  offShelfCourse, // 系统管理员 ——> 课件管理 ——> 主页，下架课件
  courseOnArchive, // 系统管理员 ——> 课件管理 ——> 主页，归档课件
  getCourseTeacherInfo, // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 获取课件信息，老师信息
  getTrainersData, // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 获取现有培训管理员的Table表格数据
  delOneData, // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 单个删除
  delBatch, // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 批量删除
  getOtherTrainers, // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 增加培训管理员模态框Table表格数据
  submitAddedData, // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 增加培训管理员模态框提交按钮
  changeCourseStatus, // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中、已上架、已下架）——> 上架课件、重新上架课件
} from '@/services/courseware/coursewareManager/index';
// import Immutable from 'immutable';

export default {
  namespace: 'CourseManager',

  state: {
    allCourseManager: { results: [], count: 0 }, // 系统管理员 ——> 课件管理 ——> 主页，获取所有课件的表格数据
    currenttrainmanagers: { results: [], count: 0 }, // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 获取现有培训管理员的Table表格数据
    addtrainmanagers: { results: [], count: 0 }, // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 增加培训管理员模态框Table表格数据
  },

  effects: {
    // ------------------------------------------------------------------
    // 系统管理员 ——> 课件管理 ——> 主页，获取所有课件的表格数据
    *getAllCourseManagerListData({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(getAllCourseManagerListData, payload);
      if (response.status === 'ok') {
        console.log('成功');
        yield put({
          type: 'saveAllCourseManagerTableData',
          payload: response.data,
        });
      }
    },
    // 系统管理员 ——> 课件管理 ——> 主页，删除课件
    *DelCourse({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(delCourse, payload);
      callback(response); // 返回结果
    },
    // 系统管理员 ——> 课件管理 ——> 主页，下架课件
    *OffShelfCourse({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(offShelfCourse, payload);
      callback(response); // 返回结果
    },
    // 系统管理员 ——> 课件管理 ——> 主页，归档课件
    *CourseOnArchive({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(courseOnArchive, payload);
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
      if (response.status === 'ok') {
        console.log('成功');
        yield put({
          type: 'saveTrainersData',
          payload: response.data,
        });
      }
    },
    // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 单个删除
    *DelOneData({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(delOneData, payload);
      callback(response); // 返回结果
    },
    // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 批量删除
    *DelBatch({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(delBatch, payload);
      callback(response); // 返回结果
    },
    // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 增加培训管理员模态框Table表格数据
    *GetOtherTrainmanagers({ payload }, { call, put }) {
      console.log('GetOtherTrainmanagers');
      const response = yield call(getOtherTrainers, payload);
      if (response.status === 'ok') {
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
