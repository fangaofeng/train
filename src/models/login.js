import { routerRedux } from 'dva';
import { login } from '@/services/auth';
import { setAuthority } from '@/utils/authority';
import tokenmanager from '../utils/token';
import { getPageQuery } from '@/utils/utils';
import { history } from 'umi';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    // 登录
    *login({ payload }, { call, put }) {
      const { userName, password, rememberUsername } = payload;
      const param = {
        username: userName,
        password,
      };
      const response = yield call(login, param);

      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });

      // Login successfully
      const { status } = response;
      // 登录成功
      if (status === 'ok') {
        // 表示登录成功
        const {
          data: { token },
        } = response;

        if (rememberUsername) {
          // 记住用户名
          localStorage.setItem('WHLQYHGPXPT_USERNAME', userName);
        } else {
          // 不记住用户名
          localStorage.removeItem('WHLQYHGPXPT_USERNAME');
        }
        tokenmanager.save(token); // 保存token
        const urlParams = new URL(window.location.href);
        const params = getPageQuery(history.location.search);
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        history.replace(redirect || '/');
      }
    },
    // 发送验证码
    // *getCaptcha({ payload }, { call }) {
    //   yield call(getFakeCaptcha, payload);
    // },

    // 退出登录
    *logout(_, { put }) {
      // remove token
      tokenmanager.remove();
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: 'ok',
          data: { token: null, roles: ['guest'] },
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/auth/login',
        }),
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      console.log(payload);
      const { status } = payload;

      // 登录成功
      if (status === 'ok') {
        const {
          data: { roles },
        } = payload;
        setAuthority(roles);
      }
      // 登录失败  或者  退出登录
      else {
        setAuthority(['guest']);
      }

      return {
        ...state,
        status,
      };
    },
  },
};
