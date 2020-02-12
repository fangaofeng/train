import {
  getCourses, // 系统管理员 ——> 课件管理 ——> 主页，获取所有课件的表格数据
  // getCourseTeacherInfo,
  // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 获取课件信息，老师信息
} from '@/services/courseware/index';

import {
  /**
   * 1、我的学习计划 ——> 课程学习（MP4） ——> 获取视频资源，课程信息等
   * 2、我的学习计划 ——> 课程学习（PDF） ——> 获取PDF资源，课程信息等
   */
  getPublicrogresses,
  getPublicrogressDetail,
  createPublicProgress,
  sendProgress, // 我的学习计划 ——> 课程学习(pdf) ——> 发送pdf的当前页码和学习状态
} from '@/services/MyStudy/PublicLearnPlan';

export default {
  namespace: 'PublicCourse',

  state: {
    publicCourse: { results: [], count: 0 },
    Progresses: { results: [], count: 0 }, // 系统管理员 ——> 课件管理 ——> 主页，获取所有课件的表格数据
    progressInfo: {},
  },

  effects: {
    // ------------------------------------------------------------------
    // 系统管理员 ——> 课件管理 ——> 主页，获取所有课件的表格数据
    *getPublicCourses({ payload }, { call, put }) {
      const response = yield call(getCourses, payload);
      if (response && response.status === 'ok') {
        yield put({
          type: 'savePublicCourse',
          payload: response.data,
        });
      }
    },
    *GetPubliceProgresses({ payload }, { call, put }) {
      const response = yield call(getPublicrogresses, payload);
      yield put({
        type: 'saveProgresses',
        payload: response.data,
      }); // 返回结果
    },

    *GetPubliceProgressDetail({ payload }, { call, put }) {
      const response = yield call(getPublicrogressDetail, payload);
      yield put({
        type: 'saveProgress',
        payload: response.data,
      }); // 返回结果
    },
    // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 获取课件信息，老师信息
    *CreatePublicProgress({ payload, callback }, { call }) {
      const response = yield call(createPublicProgress, payload);
      callback(response); // 返回结果
    },
    *SendProgress({ payload }, { call }) {
      // console.log(payload);
      yield call(sendProgress, payload);
    },
    // ------------------------------------------------------------------
  },

  reducers: {
    // ------------------------------------------------------------------
    savePublicCourse(state, action) {
      return {
        ...state,
        publicCourse: action.payload,
      };
    },
    saveProgresses(state, action) {
      return {
        ...state,
        Progresses: action.payload,
      };
    },
    saveProgress(state, action) {
      // const {
      //   payload: { course, progress, status, start_time, end_time },
      // } = action;
      // const baseInfo = {
      //   courseName: course.name, // 课件名称
      //   intruduce: course.intruduce, // 课件简介
      //   class_hour: course.class_hour, // 课时
      //   cover: course.cover, // 课件封面
      //   teachername: course.teachername, // 讲师姓名
      //   teacherdesc: course.teacherdesc, // 讲师介绍
      //   teacherimg: course.teacherimg, // 老师封面
      //   // canDrag : course.drag_flag,// 是否允许视频拖动
      //   courseSrc: course.courseware_file, // 课件资源路径
      // };
      return {
        ...state,
        progressInfo: action.payload,
      };
    },
    // ------------------------------------------------------------------
  },
};
