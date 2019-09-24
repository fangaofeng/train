import {
  query as queryUsers,
  queryCurrent,
  patchuserinfo,
  changeuseravatar,
} from '@/services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
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
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    saveUserAvatar(state, action) {
      const { currentUser } = state;
      return {
        ...state,
        currentUser: { ...currentUser, ...(action.payload || {}) },
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
