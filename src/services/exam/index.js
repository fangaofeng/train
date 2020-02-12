import { stringify } from 'qs';
import request from '@/utils/request';

// ------------------------------------------------------------------
// 系统管理员 ——> 试卷管理 ——> 主页，获取所有试卷的表格数据
export async function getAllTestPapersTableData(params) {
  return request(`/paper?${stringify(params)}`);
}
// 系统管理员 ——> 试卷管理 ——> 主页，删除试卷
export async function delTestPaper(params) {
  return request(`/paper/${params.id}`, {
    method: 'DELETE',
    data: {},
  });
}
// 系统管理员 ——> 试卷管理 ——> 主页，下架试卷
export async function offShelfTestPaper(params) {
  return request(`/paper/${params.id}`, {
    method: 'PATCH',
    data: params.data,
  });
}
// 系统管理员 ——> 试卷管理 ——> 主页，归档试卷
export async function testPaperOnArchive(params) {
  return request(`/paper/${params.id}`, {
    method: 'PATCH',
    data: params.data,
  });
}
// 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中、已上架、已下架）——> 上架试卷、重新上架试卷
export async function changepaperStatus(params) {
  return request(`/paper/${params.id}`, {
    method: 'PATCH',
    data: params.data,
  });
}
// ------------------------------------------------------------------
// 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中、已上架、已下架） ——> 获取试卷信息
export async function getPaperDetail(params) {
  return request(`/paper/${params.id}`);
}
// 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中、已上架、已下架） ——> 获取现有培训管理员的Table表格数据
export async function getTrainmanagers(params) {
  return request(`/paper/${params.id}/trainmanagers?page=${params.page}&size=${params.size}`);
}
// 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中、已上架、已下架） ——> 单个删除
export async function delTrainmanager(params) {
  return request(`/paper/${params.id}/trainmanagers`, {
    method: 'PATCH',
    data: params.data,
  });
}
// 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中、已上架、已下架） ——> 批量删除
export async function delTrainmanagers(params) {
  return request(`/paper/${params.id}/trainmanagers`, {
    method: 'PATCH',
    data: params.data,
  });
}
// 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中、已上架、已下架） ——> 增加培训管理员模态框Table表格数据
export async function getOtherTrainmanagers(params) {
  return request(
    `/paper/${params.id}/trainmanagers?page=${params.page}&size=${params.size}&exclude=true`
  );
}
// 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中、已上架、已下架） ——> 增加培训管理员模态框提交按钮
export async function submitAddedData(params) {
  return request(`/paper/${params.id}/trainmanagers`, {
    method: 'PUT',
    data: params.data,
  });
}

export async function createPaper(params) {
  return request(`/paper`, {
    method: 'POST',
    data: params.data,
  });
}
export async function saveExam(params) {
  return request('/paper', {
    method: 'POST',
    data: params,
  });
}
// ------------------------------------------------------------------
