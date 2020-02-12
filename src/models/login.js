import { message } from 'antd';
import { routerRedux } from 'dva';

import { login } from '@/services/auth';
import { setAuthority } from '@/utils/authority';
import tokenmanager from '../utils/token';
import { getPageQuery } from '@/utils/utils';
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
      const {
        status,
        data: { token, roles },
      } = response;
      // 登录成功
      if (status === 'ok' && token && roles) {
        // 表示登录成功
        if (rememberUsername) {
          // 记住用户名
          localStorage.setItem('WHLQYHGPXPT_USERNAME', userName);
        } else {
          // 不记住用户名
          localStorage.removeItem('WHLQYHGPXPT_USERNAME');
        }
        tokenmanager.save(token); // 保存token
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.startsWith('/#')) {
              redirect = redirect.substr(2);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        reloadAuthorized();
        yield put(routerRedux.replace(redirect || '/'));
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
      message.success('退出成功');
      // 退出后不使用重定向
      yield put(
        routerRedux.push({
          pathname: '/auth/login',
          // search: stringify({
          //   redirect: window.location.href,
          // }),
        })
      );
      // yield put(
      //   routerRedux.push({
      //     pathname: '/auth/login',
      //     search: stringify({
      //       redirect: window.location.href,
      //     }),
      //   })
      // );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      console.log(payload);
      const {
        status,
        data: { token, roles },
      } = payload;

      // 登录成功
      if (
        status === 'ok' &&
        token &&
        roles
        // Object.prototype.hasOwnProperty.call(payload, 'token') &&
        // Object.prototype.hasOwnProperty.call(payload, 'roles')
      ) {
        setAuthority(roles);
        // switch (payload.roles) {
        //   case '系统管理员':
        //     setAuthority('admin');
        //     break;
        //   case '培训管理员':
        //     setAuthority('user');
        //     break;
        //   case '员工':
        //     setAuthority('stu');
        //     break;
        //   default:
        //     break;

        // }
      }
      // 登录失败  或者  退出登录
      else {
        setAuthority(roles);
      }

      return {
        ...state,
        status,
        // status: payload.status,
        // type: payload.type,
      };
    },
  },
};
