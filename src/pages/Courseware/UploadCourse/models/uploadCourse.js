import { saveCourseWare } from '@/services/courseware/index';

export default {
  namespace: 'uploadCourse',

  state: {
    zipInfo: {}, // 上传的zip包内容
    zipFileName: '', // zip文件名
    zipfileResponse: '', // 上传成功后服务器返回的值
    selectedTableData: {}, // 存放已经选择的表格数据
  },

  effects: {
    // 系统管理员 ————> 课件管理 ————> 上传课件 ————> 保存或者上架接口
    *SaveCourseWare({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(saveCourseWare, payload);
      callback(response); // 返回结果
    },
    *SaveSelectedTableData({ payload }, { put }) {
      yield put({
        type: 'saveSelectedTableData',
        payload,
      }); // 返回结果
    },
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

    // 保存选中的培训管理员到selectedTableData中
    saveSelectedTableData(state, action) {
      return {
        ...state,
        selectedTableData: action.payload.selectedData,
      };
    },
  },
};
