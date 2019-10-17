import request from '@/utils/request';
import { stringify } from 'qs';

// 获取用户信息
export async function queryCurrent() {
  return request('/api/user/info');
}
export async function patchuserinfo(params) {
  return request('/api/user/info', {
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
// 增加培训群组（获取table表格数据）
/**
 * 接口复用
 * 系统管理员 ————> 系统管理 ————> 用户管理 ————> 获取批量导入的table表格用户数据
 * 系统管理员 ————> 系统管理 ————> 用户管理 ————> 获取所有的用户数据
 * 培训管理员 ————> 培训群组管理 ————>增加培训群组（获取table表格数据）
 */
export async function getUsers(params) {
  // return request(`/api//user/list/addTtrainGroupManager?${stringify(params)}`);
  return request(`/api/user/list?${stringify(params)}`);
}
