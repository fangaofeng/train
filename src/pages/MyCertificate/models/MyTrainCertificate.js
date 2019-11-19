import {
  getTrainCertificateListData, // 系统管理员 ——> 课件管理 ——> 主页，获取所有课件的表格数据
  delTrainCertificate, // 系统管理员 ——> 课件管理 ——> 主页，删除课件
  submitTrainCertificate, // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 增加培训管理员模态框提交按钮
  changeTrainCertificateStatus, // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中、已上架、已下架）——> 上架课件、重新上架课件
} from '@/services/TrainCertificate/index';

export default {
  namespace: 'MyTrainCertificate',

  state: {
    TrainCertificates: { results: [], count: 0 }, // 系统管理员 ——> 课件管理 ——> 主页，获取所有课件的表格数据
  },

  effects: {
    // ------------------------------------------------------------------
    // 系统管理员 ——> 课件管理 ——> 主页，获取所有课件的表格数据
    *getTrainCertificateListData({ payload }, { call, put }) {
      const response = yield call(getTrainCertificateListData, payload);

      if (response && response.status === 'ok') {
        console.log('成功');
        yield put({
          type: 'saveTrainCertificates',
          payload: response.data,
        });
      }
    },
    // 系统管理员 ——> 课件管理 ——> 主页，删除课件
    *delTrainCertificate({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(delTrainCertificate, payload);
      callback(response); // 返回结果
    },

    // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 增加培训管理员模态框提交按钮
    *submitTrainCertificate({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(submitTrainCertificate, payload);
      callback(response); // 返回结果
    },
    // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中、已上架、已下架）——> 上架课件、重新上架课件
    *changeTrainCertificateStatus({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(changeTrainCertificateStatus, payload);
      callback(response); // 返回结果
    },
    // ------------------------------------------------------------------
  },

  reducers: {
    // ------------------------------------------------------------------
    // 系统管理员 ——> 课件管理 ——> 主页，获取所有课件的表格数据
    saveTrainCertificates(state, action) {
      return {
        ...state,
        TrainCertificates: action.payload,
      };
    },

    // ------------------------------------------------------------------
  },
};
