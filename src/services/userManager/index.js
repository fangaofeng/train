import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 接口复用
 * 系统管理员 ————> 系统管理 ————> 用户管理 ————> 获取批量导入的table表格用户数据
 * 系统管理员 ————> 系统管理 ————> 用户管理 ————> 获取所有的用户数据
 * 培训管理员 ————> 培训群组管理 ————>增加培训群组（获取table表格数据）
 */

export async function getUser(params) {
  return request(`/user/${params.id}`);
}
export async function getUsers(params) {
  console.log(params);
  const qs = stringify(params);
  if (qs) {
    return request(`/user?${qs}`);
  }
  return request('/user');
}
export async function delUsers(params) {
  return request('/user/bulkdelete', {
    method: 'PATCH',
    data: params,
  });
}
export async function updateUser(params) {
  return request('/user', {
    method: 'PATCH',
    data: params,
  });
}
export async function createUser(params) {
  return request('/user', {
    method: 'POST',
    data: params,
  });
}
