import {
  queryCurrent,
  patchuserinfo,
  changeuseravatar,
  queryNotices,
  changeNoticeStatus,
  clearNotice,
} from '@/services/account';

export default {
  namespace: 'account',

  state: {
    currentUser: { avatar: '', name: '' },
    notices: { results: [], count: 0 },
    unreadnoticescount: 0,
  },

  effects: {
    *FetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response.data,
      });
    },
    *patchuserinfo({ payload }, { call, put }) {
      const response = yield call(patchuserinfo, payload);
      yield put({
        type: 'saveCurrentUser',
        payload: response.data,
      });
    },

    *changeuseravatar({ payload }, { call, put }) {
      const response = yield call(changeuseravatar, payload);
      yield put({
        type: 'saveUserAvatar',
        payload: response.data,
      });
    },
    *fetchNotices({ payload }, { call, put }) {
      const res = yield call(queryNotices, payload);
      yield put({
        type: 'saveNotices',
        payload: res.data,
      });
    },
    *changeNoticeReadState({ payload }, { call, put }) {
      const response = yield call(changeNoticeStatus, payload);
      yield put({
        type: 'saveNotices',
        payload: response.data,
      });
    },
    *clearNotices({ payload }, { call, put }) {
      const response = yield call(clearNotice, payload);
      yield put({
        type: 'saveClearedNotices',
        payload: response.data,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      // console.log(action.payload);
      return {
        ...state,
        currentUser: action.payload || {},
        unreadnoticescount: action.payload.unreadnoticescount || 0,
      };
    },
    saveUserAvatar(state, action) {
      const { currentUser } = state;
      return {
        ...state,
        currentUser: { ...currentUser, ...(action.payload || {}) },
      };
    },
    saveNotices(state, { payload }) {
      return {
        ...state,
        notices: payload,
        unreadnoticescount: payload.unreadnoticescount,
      };
    },
    saveClearedNotices(state, { payload }) {
      return {
        ...state,
        notices: payload.results || [],
        unreadnoticescount: payload.unreadnoticescount || 0,
      };
    },
  },
};
