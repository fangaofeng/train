import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
// import { fakeAccountLogin, getFakeCaptcha } from '@/services/api';
import { accountLogin } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import token from '../utils/token';
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
      const {userName,password,rememberUsername} = payload;
      const param = {
        username : userName,
        password
      }
      const response = yield call(accountLogin, param);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });

      // Login successfully
      if(response.hasOwnProperty('token') && response.hasOwnProperty('role')){ // 表示登录成功
        if(rememberUsername){// 记住用户名
          localStorage.setItem('WHLQYHGPXPT_USERNAME', userName);
        }else{// 不记住用户名
          localStorage.removeItem('WHLQYHGPXPT_USERNAME');
        }
        token.save(response.token);// 保存token
      // if (response.status === 'ok') {
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
      token.remove()
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      message.success('退出成功');
      // 退出后不使用重定向
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          // search: stringify({
          //   redirect: window.location.href,
          // }),
        })
      );
      // yield put(
      //   routerRedux.push({
      //     pathname: '/user/login',
      //     search: stringify({
      //       redirect: window.location.href,
      //     }),
      //   })
      // );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      console.log('changeLoginStatus',payload)
      let status = '';// ok 还是 error
      // 登录成功
      if(payload.hasOwnProperty('token') && payload.hasOwnProperty('role')){
        switch(payload.role){
          case 0:
            setAuthority('admin');
            break;
          case 1:
            setAuthority('user');
            break;
          case 2:
            setAuthority('stu');
            break;
          default:
            break;
        }
        status = 'ok';
      }
      // 登录失败  或者  退出登录
      if(payload.hasOwnProperty('status')){
        status = payload.status;
        setAuthority('guest');
      }
      // setAuthority(payload.currentAuthority);
      return {
        ...state,
        status,
        // status: payload.status,
        // type: payload.type,
      };
    },
  },
};