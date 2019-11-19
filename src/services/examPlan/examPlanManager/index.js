import { stringify } from 'qs';
import request from '@/utils/request';

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// 考试管理——>主页，获取所有的考试计划
export async function getExamPlanList(params) {
  return request(`/api/exam/plan?${stringify(params)}`);
}
// 培训管理员 ——>考试管理 ——> 主页，删除考试计划
export async function delExamplan(params) {
  return request(`/api/exam/plan/${params.id}`, {
    method: 'DELETE',
    body: {},
  });
}
// 培训管理员 ——> 考试管理 ——> 主页，修改考试计划
export async function editExamplan(params) {
  return request(`/api/exam/plan/${params.id}`, {
    method: 'PATCH',
    body: params.data,
  });
}

// 培训管理员 ——> 考试管理 ——> 主页，修改考试计划
export async function editPutExamplan(params) {
  return request(`/api/exam/plan/${params.id}`, {
    method: 'PUT',
    body: params.data,
  });
}
// 考试管理——>发布考试计划——>点击提交按钮
export async function createExampalnSubmit(params) {
  return request('/api/exam/plan', {
    method: 'POST',
    body: params,
  });
}

// ------------------------------------------------------------------
// 考试管理——>编辑考试计划——>获取考试计划详细信息
export async function getExamplanDetail(params) {
  return request(`/api/exam/plan/${params.id}`);
}

// ------------------------------------------------------------------

// 考试管理——>查看考试计划——>查看培训群组（获取table表格数据）
export async function getExamplanGroups(params) {
  return request(`/api/exam/plan/${params.id}/groups?page=${params.page}&size=${params.size}`);
}

// 考试管理——>查看考试计划——>查看单个培训群组考试详情（获取table表格数据）
export async function getExamplanGroupMembers(params) {
  return request(
    `/api/exam/plan/${params.id}/group/${params.trainGroupID}?page=${params.page}&size=${params.size}`
  );
}
// ------------------------------------------------------------------
