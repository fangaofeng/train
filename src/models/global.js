import {
  getUploadurl, // 考试计划管理——>查看考试计划——>查看培训群组考试详情（获取table表格数据）\
} from '@/services/config';

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    uploadurl: {
      course: '',
      paper: '',
      avatar: '',
      org: '',
      user: '',
    },
  },

  effects: {
    *GetUploadurl({ payload }, { call, put }) {
      const response = yield call(getUploadurl, payload);

      if (response && response.status === 'ok') {
        yield put({
          type: 'saveuploadurl',
          payload: response.data,
        });
      }
    },
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveuploadurl(state, { payload }) {
      return {
        ...state,
        uploadurl: payload,
      };
    },
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
