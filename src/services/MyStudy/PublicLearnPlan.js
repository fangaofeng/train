import { stringify } from 'qs';
import request from '@/utils/request';

// 学员待完成、已完成、已逾期
export async function getPublicrogresses(params) {
  return request(`/api/learn/publicprogress?${stringify(params)}`);
}

// ------------------------------------------------------------------
// 我的学习计划 ——> 课程学习 ——> 获取视频资源，课程信息等
export async function getPublicrogressDetail(params) {
  return request(`/api/learn/publicprogress/${params.id}`);
}

// 我的学习计划 ——> 课程学习(mp4) ——> 每隔10秒调用一次接口，发送视频的当前时间和播放状态
export async function editPublicrogress(params) {
  return request(`/api/learn/publicprogress/${params.id}`, {
    method: 'PATCH',
    body: params,
  });
}
export async function createPublicProgress(params) {
  return request(`/api/learn/publicprogress`, {
    method: 'POST',
    body: params,
  });
}
export async function sendProgress(params) {
  return request(`/api/learn/progress/${params.id}`, {
    method: 'PATCH',
    body: params.data,
  });
}
// ------------------------------------------------------------------
