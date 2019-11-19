import { stringify } from 'qs';
import request from '@/utils/request';

// 学员待完成、已完成、已逾期
export async function getLearnProgress(params) {
  return request(`/api/learn/progress?${stringify(params)}`);
}
// 学员获取推荐课程
export async function getRecommendCourse(params) {
  return request(`/api/learn/recommendcourse?${stringify(params)}`);
}
// ------------------------------------------------------------------
// 我的学习计划 ——> 课程学习 ——> 获取视频资源，课程信息等
export async function getLearnProgressDetail(params) {
  return request(`/api/learn/progress/${params.id}`);
  // return request(`/api/learn/progress/`);
}

// 我的学习计划 ——> 课程学习(pdf) ——> 发送pdf的当前页码和学习状态
export async function sendProgress(params) {
  return request(`/api/learn/progress/${params.id}`, {
    method: 'PATCH',
    body: params.data,
  });
}
// ------------------------------------------------------------------
