import { stringify } from 'qs';
import request from '@/utils/request';
// 平台公告
export async function getAnnouncement() {
  return request('/blog/article?page=1&size=5');
}
// 系统管理员中获取课件管理
export async function getCourseManager(params) {
  return request(`/course/ware?${stringify(params)}`);
}
export async function getExamManager(params) {
  return request(`/paper?${stringify(params)}`);
}
// 培训管理员获取最新课程
export async function getLatestCourse(params) {
  return request(`/course/ware?${stringify(params)}`);
}
// export async function getLatestCourse(params) {
//   return request('/workbench/latestCourse', {
//     method: 'POST',
//     data: params,
//   });
// }
// 培训管理员获取最新试卷
export async function getLatestExam(params) {
  return request(`/paper?${stringify(params)}`);
}

// 学员待完成、已完成、已逾期
export async function getStuAllCourseAndExam() {
  return request('/learn/aggregation');
}
// 学员获取推荐课程
export async function getStuRecommendCourse(params) {
  return request(`/course/ware?${stringify(params)}`);
}

export async function getStats() {
  return request(`/stats`);
}
