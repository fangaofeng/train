import { stringify } from 'qs';
import request from '@/utils/request';

// 学员待完成、已完成、已逾期
export async function getPublicrogresses(params) {
  return request(`/learn/publicprogress?${stringify(params)}`);
}

// ------------------------------------------------------------------
// 我的学习计划 ——> 课程学习 ——> 获取视频资源，课程信息等
export async function getPublicrogressDetail(params) {
  return request(`/learn/publicprogress/${params.id}`);
}

// 我的学习计划 ——> 课程学习(mp4) ——> 每隔10秒调用一次接口，发送视频的当前时间和播放状态
export async function editPublicrogress(params) {
  return request(`/learn/publicprogress/${params.id}`, {
    method: 'PATCH',
    data: params,
  });
}
export async function createPublicProgress(params) {
  return request(`/learn/publicprogress`, {
    method: 'POST',
    data: params,
  });
}
export async function sendProgress(params) {
  return request(`/learn/progress/${params.id}`, {
    method: 'PATCH',
    data: params.data,
  });
}
// ------------------------------------------------------------------
