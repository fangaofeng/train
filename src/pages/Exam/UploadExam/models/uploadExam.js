import { getTrainerTableData, saveExam } from '@/services/exam/uploadExam';

export default {
  namespace: 'uploadExam',

  state: {
    zipFileName: '', // zip文件名
    testInfo: {}, // 试卷信息
    testDetails: {}, // 试题信息
    zipfileid: '', // zip文件的id

    tableData: {
      results: [],
    }, // 存放获取到的数据
    selectedTableData: {}, // 存放已经选择的表格数据
  },

  effects: {
    // 系统管理员 ————> 试卷管理 ————> 上传试卷 ————> 获取培训管理员数据
    *GetTrainmanagers({ payload }, { call, put }) {
      const response = yield call(getTrainerTableData, payload);
      yield put({
        type: 'saveTrainerTableData',
        payload: response,
      });
    },
    // 系统管理员 ————> 试卷管理 ————> 上传试卷 ————> 保存或者上架接口
    *SaveExam({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(saveExam, payload);
      callback(response); // 返回结果
    },
  },

  reducers: {
    // 保存到读取到试卷压缩包的预览信息到zipInfo中
    saveZipInfo(state, action) {
      return {
        ...state,
        zipFileName: action.param.zipFileName, // zip文件名
        testInfo: action.param.testInfo, // 试卷信息
        testDetails: action.param.testDetails, // 试题信息
        zipfileid: action.param.zipfileid, // zip文件的id
      };
    },
    // 系统管理员 ————> 试卷管理 ————> 上传试卷 ————> 获取培训管理员数据
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
  },
};
