import request from '@/utils/request';
import { stringify } from 'qs';

// 获取用户信息
export async function queryCurrent() {
  return request('/account/info');
}
export async function patchuserinfo(params) {
  return request('/account/info', {
    method: 'PATCH',
    data: params,
  });
}
export async function changeuseravatar(params) {
  return request('/account/avatar', {
    method: 'POST',
    data: params,
  });
}
export async function queryNotices(params) {
  return request(`/notices?${stringify(params)}`);
}

export async function changeNoticeStatus(params) {
  return request('/notices', {
    method: 'PATCH',
    data: params,
  });
}

export async function clearNotice(params) {
  return request('/notices/clear', {
    method: 'PATCH',
    data: params,
  });
}
// ------------------------------------------------------------------
