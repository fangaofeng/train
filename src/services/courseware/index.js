import { stringify } from 'qs';
import request from '@/utils/request';

// ------------------------------------------------------------------
// 系统管理员 ——> 课件管理 ——> 主页，获取所有课件的表格数据
export async function getCourses(params) {
  return request(`/course/ware?${stringify(params)}`);
}
// 系统管理员 ——> 课件管理 ——> 主页，删除课件
export async function delCourse(params) {
  return request(`/course/ware/${params.id}`, {
    method: 'DELETE',
    data: {},
  });
  // return request('/course/ware/del', {
  //   method: 'POST',
  //   data: params,
  // });
}
// 系统管理员 ——> 课件管理 ——> 主页，下架课件
export async function offShelfCourse(params) {
  return request(`/course/ware/${params.id}`, {
    method: 'PATCH',
    data: params.data,
  });
}
// 系统管理员 ——> 课件管理 ——> 主页，归档课件
export async function courseOnArchive(params) {
  return request(`/course/ware/${params.id}`, {
    method: 'PATCH',
    data: params.data,
  });
}

export async function courseChangeData(params) {
  return request(`/course/ware/${params.id}`, {
    method: 'PATCH',
    data: params.data,
  });
}
// ------------------------------------------------------------------
// 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 获取课件信息，老师信息
export async function getCourseTeacherInfo(params) {
  return request(`/course/ware/${params.id}`);
}
// 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中、已上架、已下架）——> 上架课件、重新上架课件
export async function changeCourseStatus(params) {
  return request(`/course/ware/${params.id}`, {
    method: 'PATCH',
    data: params.data,
  });
}
// 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 获取现有培训管理员的Table表格数据
export async function getTrainersData(params) {
  return request(`/course/ware/${params.id}/trainmanagers?page=${params.page}&size=${params.size}`);
}
// 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 单个删除
export async function delOneData(params) {
  return request(`/course/ware/${params.id}/trainmanagers`, {
    method: 'PATCH',
    data: params.data,
  });
}
// 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 批量删除
export async function delTrainmanagers(params) {
  return request(`/course/ware/${params.id}/trainmanagers`, {
    method: 'PATCH',
    data: params.data,
  });
}
// 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 增加培训管理员模态框Table表格数据
export async function getOtherTrainers(params) {
  return request(
    `/course/ware/${params.id}/trainmanagers?page=${params.page}&size=${params.size}&exclude=true`
  );
}
// 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 增加培训管理员模态框提交按钮
export async function submitAddedData(params) {
  return request(`/course/ware/${params.id}/trainmanagers`, {
    method: 'PATCH',
    data: params.data,
  });
}

export async function saveCourseWare(params) {
  return request('/course/ware', {
    method: 'POST',
    data: params,
  });
}

// ------------------------------------------------------------------
