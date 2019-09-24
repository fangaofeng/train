import { stringify } from 'qs';
import request from '@/utils/request';

// ------------------------------------------------------------------
// 系统管理员 ——> 试卷管理 ——> 主页，获取所有试卷的表格数据
export async function getAllTestPapersTableData(params) {
  return request(`/api/paper?${stringify(params)}`);
}
// 系统管理员 ——> 试卷管理 ——> 主页，删除试卷
export async function delTestPaper(params) {
  return request(`/api/paper/${params.id}`, {
    method: 'DELETE',
    body: {},
  });
}
// 系统管理员 ——> 试卷管理 ——> 主页，下架试卷
export async function offShelfTestPaper(params) {
  return request(`/api/paper/${params.id}`, {
    method: 'PATCH',
    body: params.data,
  });
}
// 系统管理员 ——> 试卷管理 ——> 主页，归档试卷
export async function testPaperOnArchive(params) {
  return request(`/api/paper/${params.id}`, {
    method: 'PATCH',
    body: params.data,
  });
}
// 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中、已上架、已下架）——> 上架试卷、重新上架试卷
export async function changeExamStatus(params) {
  return request(`/api/paper/${params.id}`, {
    method: 'PATCH',
    body: params.data,
  });
}
// ------------------------------------------------------------------
// 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中、已上架、已下架） ——> 获取试卷信息
export async function getTestPapersInfo(params) {
  return request(`/api/paper/${params.id}`);
}
// 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中、已上架、已下架） ——> 获取现有培训管理员的Table表格数据
export async function getTrainersData(params) {
  return request(`/api/paper/${params.id}/trainmanagers?page=${params.page}&size=${params.size}`);
}
// 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中、已上架、已下架） ——> 单个删除
export async function delOneData(params) {
  return request(`/api/paper/${params.id}/trainmanagers`, {
    method: 'PATCH',
    body: params.data,
  });
}
// 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中、已上架、已下架） ——> 批量删除
export async function delBatch(params) {
  return request(`/api/paper/${params.id}/trainmanagers`, {
    method: 'PATCH',
    body: params.data,
  });
}
// 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中、已上架、已下架） ——> 增加培训管理员模态框Table表格数据
export async function getOtherTrainers(params) {
  return request(
    `/api/paper/${params.id}/trainmanagers?page=${params.page}&size=${params.size}&exclude=true`
  );
}
// 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中、已上架、已下架） ——> 增加培训管理员模态框提交按钮
export async function submitAddedData(params) {
  return request(`/api/paper/${params.id}/trainmanagers`, {
    method: 'PUT',
    body: params.data,
  });
}

// ------------------------------------------------------------------
