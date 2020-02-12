import { stringify } from 'qs';
import request from '@/utils/request';

// ------------------------------------------------------------------
// 培训群组管理（获取table表格数据）
export async function getTrainGroups(params) {
  return request(`/train/group?${stringify(params)}`);
}
// 培训群组管理（删除）
export async function delTrainGroups(params) {
  return request('/train/group/bulkdelete', {
    method: 'PATCH',
    data: params,
  });
}

// 增加培训群组(点击提交按钮)
export async function addTrainGroup(params) {
  return request('/train/group', {
    method: 'POST',
    data: params,
  });
}
// 查看培训群组成员（获取table表格数据）
export async function getTrainGroupMembers(params) {
  return request(`/train/group/${params.id}/members?${stringify(params)}`);
}

// 编辑培训群组（批量删除成员）
export async function delTgMembers(params) {
  return request(`/train/group/${params.id}/members`, {
    method: 'PATCH',
    data: params.data,
  });
}

// 编辑培训群组（修改群组名称）
export async function changeTgName(params) {
  return request(`/train/group/${params.id}`, {
    method: 'PUT',
    data: params.data,
  });
}
// 编辑培训群组（增加群组成员的Table表格数据）
export async function getTgOutUsers(params) {
  return request(
    `/train/group/${params.id}/members?page=${params.page}&size=${params.size}&exclude=true`
  );
}
// 编辑培训群组（增加群组成员提交按钮）
export async function addTgMember(params) {
  return request(`/train/group/${params.id}/members`, {
    method: 'PATCH',
    data: params.data,
  });
}
// ------------------------------------------------------------------
