import { stringify } from 'qs';
import request from '@/utils/request';
// 平台公告
export async function getAnnouncement() {
  return request('/api/blog/article?page=1&size=5');
}
// 系统管理员中获取课件管理
export async function getCourseManager(params) {
  return request(`/api/course/ware?${stringify(params)}`);
}
export async function getExamManager(params) {
  return request(`/api/paper?${stringify(params)}`);
}
// 培训管理员获取最新课程
export async function getLatestCourse(params) {
  return request(`/api/course/ware?${stringify(params)}`);
}
// export async function getLatestCourse(params) {
//   return request('/api/workbench/latestCourse', {
//     method: 'POST',
//     body: params,
//   });
// }
// 培训管理员获取最新试卷
export async function getLatestExam(params) {
  return request(`/api/paper?${stringify(params)}`);
}

// 学员待完成、已完成、已逾期
export async function getStuAllCourseAndExam() {
  return request('/api/learn/aggregation');
}
// 学员获取推荐课程
export async function getStuRecommendCourse(params) {
  return request(`/api/course/ware?${stringify(params)}`);
}

export async function getStats(params) {
  return request(`/api/stats`);
}
