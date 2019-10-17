import { stringify } from 'qs';
import request from '@/utils/request';

// ------------------------------------------------------------------
// 培训群组管理（获取table表格数据）
export async function getTrainGroups(params) {
  return request(`/api/train/group?${stringify(params)}`);
}
// 培训群组管理（删除）
export async function delTGManager(params) {
  return request('/api/train/group/bulkdelete', {
    // return request('/api//user/list/tGManagerDel', {
    method: 'PATCH',
    body: params,
  });
}
// 培训群组管理（批量删除）
export async function batchDelTGManager(params) {
  return request('/api/train/group/bulkdelete', {
    // return request('/api//user/list/tGManagerBatchDel', {
    method: 'PATCH',
    body: params,
  });
}

// 增加培训群组(点击提交按钮)
export async function addTGManagerSubmit(params) {
  // return request('/api//user/list/addTGSubmit', {
  return request('/api/train/group', {
    method: 'POST',
    body: params,
  });
}
// 查看培训群组成员（获取table表格数据）
export async function getTrainGroupMembers(params) {
  return request(`/api/train/group/${params.id}/members?${stringify(params)}`);
  // return request(`/api//user/list/editTGManager?${stringify(params)}`);
}

// ------------------------------------------------------------------
// 编辑培训群组（获取现有群组成员的Table表格数据）
export async function getEditTrainGroupData(params) {
  return request(`/api/train/group/${params.id}/members?page=${params.page}&size=${params.size}`);
  // return request(`/api//user/list/editTGManager?${stringify(params)}`);
}
// 编辑培训群组（删除成员）
export async function delEditTGManager(params) {
  return request(`/api/train/group/${params.id}/members`, {
    // return request('/api//user/list/editTGManagerDel', {
    method: 'PATCH',
    body: params.data,
  });
}
// 编辑培训群组（批量删除成员）
export async function batchDelEditTGManager(params) {
  return request(`/api/train/group/${params.id}/members`, {
    // return request('/api//user/list/editTGManagerBatchDel', {
    method: 'PATCH',
    body: params.data,
  });
}
// 编辑培训群组（修改群组名称）
export async function changeEditTGName(params) {
  return request(`/api/train/group/${params.id}`, {
    // return request('/api/train/group/editTGManagerName', {
    method: 'PUT',
    body: params.data,
  });
}
// 编辑培训群组（增加群组成员的Table表格数据）
export async function getEditTGAddData(params) {
  return request(
    `/api/train/group/${params.id}/members?page=${params.page}&size=${params.size}&exclude=true`
  );
}
// 编辑培训群组（增加群组成员提交按钮）
export async function submitEditTGAddMember(params) {
  return request(`/api/train/group/${params.id}/members`, {
    method: 'PATCH',
    body: params.data,
  });
}
// ------------------------------------------------------------------
