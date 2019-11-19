import request from '@/utils/request';
// import { stringify } from 'qs';

// 获取用户信息
export async function queryCurrent() {
  return request('/api/account/info');
}
export async function patchuserinfo(params) {
  return request('/api/account/info', {
    method: 'PATCH',
    body: params,
  });
}
export async function changeuseravatar(params) {
  return request('/api/user/avatar', {
    method: 'POST',
    body: params,
  });
}
// ------------------------------------------------------------------
