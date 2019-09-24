import { getTrainerTableData, saveCourseWare } from '@/services/courseware/uploadCourse';
// import { notification } from 'antd';

export default {
  namespace: 'uploadCourse',

  state: {
    zipInfo: {}, // 上传的zip包内容
    zipFileName: '', // zip文件名
    zipfileResponse: '', // 上传成功后服务器返回的值
    tableData: {
      results: [],
    }, // 存放获取到的数据
    selectedTableData: {}, // 存放已经选择的表格数据
    // saveStatus:undefined// 保存或者上架成功失败状态
  },

  effects: {
    // 系统管理员 ————> 课件管理 ————> 上传课件 ————> 获取培训管理员数据
    *GetTrainerTableData({ payload }, { call, put }) {
      const response = yield call(getTrainerTableData, payload);
      yield put({
        type: 'saveTrainerTableData',
        payload: response,
      });
    },

    // 系统管理员 ————> 课件管理 ————> 上传课件 ————> 保存或者上架接口
    *SaveCourseWare({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(saveCourseWare, payload);
      callback(response); // 返回结果
      // console.log(response)
      // if (response.status === 'ok') {
      //   if (callback && typeof callback === 'function') {
      //     callback(response); // 返回结果
      //   }
      // } else {
      //   notification.error({
      //     message: '失败'
      //   });
      // }
      // yield put({
      //     type: 'updateSaveStatus',
      //     payload: response,
      // });
    },

    // // 获取平台公告
    // *getAnnouncement(_, { call, put }) {
    //   const response = yield call(getAnnouncement);
    //   yield put({
    //     type: 'saveAnnouncement',
    //     payload: response,
    //   });
    // },
    // // 系统管理员获取课件管理
    // *getCourseManager({payload}, { call, put }) {
    //   const response = yield call(getCourseManager,payload);
    //   yield put({
    //     type: 'saveCourseManager',
    //     payload: response,
    //   });
    // },
  },

  reducers: {
    // 保存到读取到课件压缩包的预览信息到zipInfo中
    saveZipInfo(state, action) {
      return {
        ...state,
        zipInfo: action.param.formData,
        zipFileName: action.param.zipFileName,
        zipfileResponse: action.param.zipfileResponse,
      };
    },
    // 系统管理员 ————> 课件管理 ————> 上传课件 ————> 获取培训管理员数据
    saveTrainerTableData(state, action) {
      return {
        ...state,
        tableData: action.payload,
      };
    },
    // 保存选中的培训管理员到selectedTableData中
    saveSelectedTableData(state, action) {
      return {
        ...state,
        selectedTableData: action.param.saveSelectedData,
      };
    },
    // // 保存或者上架返回的状态
    // updateSaveStatus(state,action){
    //   console.log(action)
    //   return {
    //       ...state,
    //       saveStatus:action.payload
    //   }
    // },
  },
};
