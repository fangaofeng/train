import {
  getNoticetaskes,
  getNoticetask,
  createNoticetask,
  changeNoticetask,
  delNoticetask,
} from '@/services/noticetask';

export default {
  namespace: 'Noticetask',

  state: {
    noticetask: { results: [], count: 0 },
  },

  effects: {
    *GetNoticetaskes({ payload }, { call, put }) {
      const response = yield call(getNoticetaskes, payload);
      yield put({
        type: 'saveNoticetask',
        payload: response.data,
      });
    },
    *GetNoticetask({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(getNoticetask, payload);
      callback(response);
    },
    *CreateNoticetask({ payload, callback }, { call }) {
      const response = yield call(createNoticetask, payload);
      callback(response);
    },
    *ChangeNoticetask({ payload, callback }, { call }) {
      const response = yield call(changeNoticetask, payload);
      callback(response);
    },
    *DelNoticetask({ payload, callback }, { call }) {
      const response = yield call(delNoticetask, payload);
      callback(response);
    },
  },

  reducers: {
    saveNoticetask(state, action) {
      return {
        ...state,
        noticetask: action.payload,
      };
    },
  },
};
