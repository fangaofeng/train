import { stringify } from 'qs';
import request from '@/utils/request';

// ------------------------------------------------------------------
// 系统管理员 ——> 试卷管理 ——> 主页，获取所有试卷的表格数据
export async function getNoticetaskes(params) {
  return request(`/noticetask?${stringify(params)}`);
}
// 系统管理员 ——> 试卷管理 ——> 主页，删除试卷
export async function delNoticetask(params) {
  return request(`/noticetask/${params.id}`, {
    method: 'DELETE',
    data: {},
  });
}

export async function createNoticetask(params) {
  console.log(params);
  return request(`/noticetask`, {
    method: 'POST',
    data: params.data,
  });
}

// 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中、已上架、已下架）——> 上架试卷、重新上架试卷
export async function changeNoticetask(params) {
  return request(`/noticetask/${params.id}`, {
    method: 'PATCH',
    data: params.data,
  });
}
// ------------------------------------------------------------------
// 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中、已上架、已下架） ——> 获取试卷信息
export async function getNoticetask(params) {
  return request(`/noticetask/${params.id}`);
}

// ------------------------------------------------------------------
