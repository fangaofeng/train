import { stringify } from 'qs';
import request from '@/utils/request';

// ------------------------------------------------------------------
// 学员——>我的考试——>我的考试计划——>在线考试——>获取试卷信息
export async function getOnlineExamBasicInfo(params) {
  return request(`/api/exam/progress/${params.id}`);
}

export async function getExamQuestions(params) {
  if (params.page) {
    const queryparams = { page: params.page, size: params.size };

    return request(`/api/exam/progress/${params.id}/questions?${stringify(queryparams)}`);
  }
  return request(`/api/exam/progress/${params.id}/questions`);
}

// 学员——>我的考试——>我的考试计划——>在线考试——>获取试卷信息
export async function submitExam(params) {
  return request(`/api/exam/progress/${params.id}`, {
    method: 'PATCH',
    body: params.data,
  });
}

// ------------------------------------------------------------------
