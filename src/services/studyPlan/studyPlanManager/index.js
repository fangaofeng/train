import { stringify } from 'qs';
import request from '@/utils/request';

// ------------------------------------------------------------------

// 学习计划管理——>创建学习计划——>点击提交按钮
export async function submitCreateSP(params) {
  return request('/api/learn/plan', {
    method: 'POST',
    body: params,
  });
}
// ------------------------------------------------------------------
// 学习计划管理——>主页，获取所有的学习计划
export async function getAllSPTableData(params) {
  return request(`/api/learn/plan?${stringify(params)}`);
}
// ------------------------------------------------------------------
// 学习计划管理——>编辑学习计划——>获取课程信息、讲师信息，获取计划名称、计划时间
export async function getCourseAndPlanInfo(params) {
  return request(`/api/learn/plan/${params.id}`);
}
// 学习计划管理——>编辑学习计划——>点击提交按钮
export async function submitEditSP(params) {
  return request(`/api/learn/plan/${params.id}`, {
    method: 'PATCH',
    body: params.data,
  });
}

// 学习计划管理——>查看学习计划（获取table表格数据）
export async function getViewSPGroup(params) {
  return request(`/api/learn/plan/${params.studyPlanID}/group?${stringify(params)}`);
}
// 学习计划管理——>查看学习计划——>查看培训群组学习详情（获取table表格数据）
export async function getViewSPGroupDetails(params) {
  return request(
    `/api/learn/plan/${params.studyPlanID}/${params.trainGroupID}/members?page=${
      params.page
    }&size=${params.size}`
  );
}
// ------------------------------------------------------------------
// 学习计划管理——>主页，归档学习计划
export async function fileOnArchive(params) {
  return request(`/api/learn/plan/fileOnArchive`, {
    method: 'POST',
    body: params,
  });
}
// ------------------------------------------------------------------
