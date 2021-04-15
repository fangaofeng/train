import { useState } from 'react';
import { message } from 'antd';
import tokenmanager from '../utils/token';
import { getPageQuery } from '@/utils/utils';
import { history, useModel } from 'umi';
import { reloadAuthorized } from '@/utils/Authorized';

export default () => {
  const { refresh } = useModel('@@initialState');

  // const [currentrole, setCurrentrole] = useState(null);
  // const [roles, setRoles] = useState([]);
  const login = data => {
    // 表示登录成功
    const { token, currentrole, rememberMe, username } = data;

    if (!token || !username) {
      message.error('登录时发生了错误');
      return;
    }
    // setInitialState({ ...initialState, currentrole });
    // setCurrentrole(currentrole);
    // setRoles(troles);
    if (rememberMe) {
      localStorage.setItem('BNDQYHGPXPT_USERNAME', username);
    } else {
      localStorage.removeItem('BNDQYHGPXPT_USERNAME');
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
    // refresh();
  };

  // 发送验证码
  // *getCaptcha({ payload }, { call }) {
  //   yield call(getFakeCaptcha, payload);
  // },

  // 退出登录
  const isLogin = () => (tokenmanager.get() ? true : false);

  const logout = () => {
    tokenmanager.remove();
    // refresh();
  };
  return {
    isLogin,
    login,
    logout,
  };
};
