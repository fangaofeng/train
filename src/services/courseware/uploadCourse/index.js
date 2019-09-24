import { stringify } from 'qs';
import request from '@/utils/request';
// 系统管理员 ————> 课件管理 ————> 上传课件 ————> 获取培训管理员数据
export async function getTrainerTableData(params) {
  return request(`/api//user/list/trainmanager?${stringify(params)}`);
}

// 系统管理员 ————> 课件管理 ————> 上传课件 ————> 保存或者上架接口
export async function saveCourseWare(params) {
  console.log('上传课件', params);
  return request('/api/course/ware', {
    method: 'POST',
    body: params,
  });
}
