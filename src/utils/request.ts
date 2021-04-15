/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { history, getDvaApp } from 'umi';

import { notification } from 'antd';
import token from './token';

// declare global {
//   interface Window {
//     g_app: any;
//   }
// }

// window.g_app = getDvaApp() || {};

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { data: object; response: Response }): object => {
  const { data, response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    if (status === 200) {
      return data;
    }
    if (status > 200 && status < 300) {
      return { status: 'ok', message: `${status}` };
    }
    if (status === 401) {
      // @HACK
      /* eslint-disable no-underscore-dangle */
      window.g_app._store.dispatch({
        type: 'login/logout',
      });
    }
    // environment should not be used
    else if (status === 403) {
      history.push('/exception/403');
      return { status: 'error', detail: `你没有权限或者需要重新登陆` };
    } else if (status <= 504 && status >= 500) {
      history.push('/exception/500');
    } else if (status >= 404 && status < 422) {
      history.push('/exception/404');
    } else {
      notification.error({
        message: `请求错误 ${status}: ${url}`,
        description: errorText,
      });
    }
    return { status: 'error', detail: `server return ${codeMessage[status]}` };
  }
  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
    return { status: 'error', detail: `connect time out` };
  }

  return { status: 'error', detail: `unkonw error` };
};

/**
 * 配置request请求时的默认参数
 */

const request = extend({
  prefix: '/api',
  timeout: 60000,
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

request.interceptors.request.use(async (url, options) => {
  const ttoken = token.get();
  const defaultOptions = { ...options };
  if (ttoken) {
    defaultOptions.headers = {
      Authorization: `Token ${ttoken}`,
    };
  }
  return {
    url,
    options: { ...defaultOptions },
  };
});
export default request;
// export default (path, paload) => useRequest(request(path, paload));
