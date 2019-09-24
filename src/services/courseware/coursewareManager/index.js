import { stringify } from 'qs';
import request from '@/utils/request';

// ------------------------------------------------------------------
// 系统管理员 ——> 课件管理 ——> 主页，获取所有课件的表格数据
export async function getAllCourseManagerListData(params) {
  return request(`/api/course/ware?${stringify(params)}`);
}
// 系统管理员 ——> 课件管理 ——> 主页，删除课件
export async function delCourse(params) {
  return request(`/api/course/ware/${params.id}`, {
    method: 'DELETE',
    body: {},
  });
  // return request('/api/course/ware/del', {
  //   method: 'POST',
  //   body: params,
  // });
}
// 系统管理员 ——> 课件管理 ——> 主页，下架课件
export async function offShelfCourse(params) {
  return request(`/api/course/ware/${params.id}`, {
    method: 'PATCH',
    body: params.data,
  });
}
// 系统管理员 ——> 课件管理 ——> 主页，归档课件
export async function courseOnArchive(params) {
  return request(`/api/course/ware/${params.id}`, {
    method: 'PATCH',
    body: params.data,
  });
}
// ------------------------------------------------------------------
// 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 获取课件信息，老师信息
export async function getCourseTeacherInfo(params) {
  return request(`/api/course/ware/${params.id}`);
}
// 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中、已上架、已下架）——> 上架课件、重新上架课件
export async function changeCourseStatus(params) {
  return request(`/api/course/ware/${params.id}`, {
    method: 'PATCH',
    body: params.data,
  });
}
// 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 获取现有培训管理员的Table表格数据
export async function getTrainersData(params) {
  return request(
    `/api/course/ware/${params.id}/trainmanagers?page=${params.page}&size=${params.size}`
  );
}
// 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 单个删除
export async function delOneData(params) {
  return request(`/api/course/ware/${params.id}/trainmanagers`, {
    method: 'PATCH',
    body: params.data,
  });
}
// 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 批量删除
export async function delBatch(params) {
  return request(`/api/course/ware/${params.id}/trainmanagers`, {
    method: 'PATCH',
    body: params.data,
  });
}
// 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 增加培训管理员模态框Table表格数据
export async function getOtherTrainers(params) {
  return request(
    `/api/course/ware/${params.id}/trainmanagers?page=${params.page}&size=${
      params.size
    }&exclude=true`
  );
}
// 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 增加培训管理员模态框提交按钮
export async function submitAddedData(params) {
  return request(`/api/course/ware/${params.id}/trainmanagers`, {
    method: 'PUT',
    body: params.data,
  });
}

// ------------------------------------------------------------------
