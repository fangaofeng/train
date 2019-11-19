import {
  getAllTestPapersTableData, // 系统管理员 ——> 试卷管理 ——> 主页，获取所有试卷的表格数据
  delTestPaper, // 系统管理员 ——> 试卷管理 ——> 主页，删除试卷
  offShelfTestPaper, // 系统管理员 ——> 试卷管理 ——> 主页，下架试卷
  testPaperOnArchive, // 系统管理员 ——> 试卷管理 ——> 主页，归档试卷
  getPaperDetail, // 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中、已上架、已下架） ——> 获取试卷信息
  getTrainmanagers, // 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中、已上架、已下架） ——> 获取现有培训管理员的Table表格数据
  delTrainmanagers, // 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中、已上架、已下架） ——> 批量删除
  getOtherTrainmanagers, // 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中、已上架、已下架） ——> 增加培训管理员模态框Table表格数据
  submitAddedData, // 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中、已上架、已下架） ——> 增加培训管理员模态框提交按钮
  changeExamStatus, // 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中、已上架、已下架）——> 上架试卷、重新上架试卷
} from '@/services/exam/examManager';

export default {
  namespace: 'ExamManager',

  state: {
    allTestPapers: { results: [], count: 0 }, // 系统管理员 ——> 试卷管理 ——> 主页，获取所有试卷的表格数据
    currenttrainmanagers: { results: [], count: 0 }, // 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中） ——> 获取现有培训管理员的Table表格数据
    addtrainmanagers: { results: [], count: 0 }, // 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中） ——> 增加培训管理员模态框Table表格数据
  },

  effects: {
    // ------------------------------------------------------------------
    // 系统管理员 ——> 试卷管理 ——> 主页，获取所有试卷的表格数据
    *GetAllTestPapersTableData({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(getAllTestPapersTableData, payload);
      if (response && response.status === 'ok') {
        console.log('成功');
        yield put({
          type: 'saveAllTestPapersTableData',
          payload: response.data,
        });
      }
    },
    // 系统管理员 ——> 试卷管理 ——> 主页，删除试卷
    *DelTestPaper({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(delTestPaper, payload);
      callback(response); // 返回结果
    },
    // 系统管理员 ——> 试卷管理 ——> 主页，下架试卷
    *OffShelfTestPaper({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(offShelfTestPaper, payload);
      callback(response); // 返回结果
    },
    // 系统管理员 ——> 试卷管理 ——> 主页，归档试卷
    *TestPaperOnArchive({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(testPaperOnArchive, payload);
      callback(response); // 返回结果
    },
    *ChangeStatue({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(changeExamStatus, payload);
      callback(response); // 返回结果
    },
    // ------------------------------------------------------------------
    // 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中、已上架、已下架） ——> 获取试卷信息
    *GetPaperDetail({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(getPaperDetail, payload);
      callback(response); // 返回结果
    },
    // 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中、已上架、已下架） ——> 获取现有培训管理员的Table表格数据
    *GetTrainmanagers({ payload }, { call, put }) {
      const response = yield call(getTrainmanagers, payload);
      if (response && response.status === 'ok') {
        console.log('成功');
        yield put({
          type: 'saveTrainersData',
          payload: response.data,
        });
      }
    },

    // 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中、已上架、已下架） ——> 批量删除培训管理员
    *DelTrainmanagers({ payload, callback }, { call }) {
      const data = {};
      data.trainermanagers = payload.data;
      data.id = payload.id;
      const response = yield call(delTrainmanagers, data);
      callback(response); // 返回结果
    },
    // 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中、已上架、已下架） ——> 增加培训管理员模态框Table表格数据
    *GetOtherTrainmanagers({ payload }, { call, put }) {
      const response = yield call(getOtherTrainmanagers, payload);
      if (response && response.status === 'ok') {
        console.log('成功');
        yield put({
          type: 'saveAddTrainersData',
          payload: response.data,
        });
      }
    },
    // 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中、已上架、已下架） ——> 增加培训管理员模态框提交按钮
    *SubmitAddedData({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(submitAddedData, payload);
      callback(response); // 返回结果
    },
    // 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中、已上架、已下架）——> 上架试卷、重新上架试卷
    *ChangeExamStatus({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(changeExamStatus, payload);
      callback(response); // 返回结果
    },
    // ------------------------------------------------------------------
  },

  reducers: {
    // ------------------------------------------------------------------
    // 系统管理员 ——> 试卷管理 ——> 主页，获取所有试卷的表格数据
    saveAllTestPapersTableData(state, action) {
      return {
        ...state,
        allTestPapers: action.payload,
      };
    },
    // 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中） ——> 获取现有培训管理员的Table表格数据
    saveTrainersData(state, action) {
      return {
        ...state,
        currenttrainmanagers: action.payload,
      };
    },
    // 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中） ——> 增加培训管理员模态框Table表格数据
    saveAddTrainersData(state, action) {
      return {
        ...state,
        addtrainmanagers: action.payload,
      };
    },
    // ------------------------------------------------------------------
  },
};
