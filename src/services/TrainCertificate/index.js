import { stringify } from 'qs';
import request from '@/utils/request';

// ------------------------------------------------------------------
// 系统管理员 ——> 课件管理 ——> 主页，获取所有课件的表格数据
export async function getTrainCertificateListData(params) {
  return request(`/trainCertificate?${stringify(params)}`);
}
// 系统管理员 ——> 课件管理 ——> 主页，删除课件
export async function delTrainCertificate(params) {
  return request(`/trainCertificate/${params.id}`, {
    method: 'DELETE',
    data: {},
  });
}

// 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 增加培训管理员模态框提交按钮
export async function submitTrainCertificate(params) {
  return request(`/trainCertificate/${params.id}`, {
    method: 'PUT',
    data: params.data,
  });
}
// 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中、已上架、已下架）——> 上架课件、重新上架课件
export async function changeTrainCertificateStatus(params) {
  return request(`/trainCertificate/${params.id}`, {
    method: 'PATCH',
    data: params.data,
  });
}
// ------------------------------------------------------------------
