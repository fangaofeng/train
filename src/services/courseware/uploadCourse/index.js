// import { stringify } from 'qs';
import request from '@/utils/request';

// 系统管理员 ————> 课件管理 ————> 上传课件 ————> 保存或者上架接口
export default async function saveCourseWare(params) {
  console.log('上传课件', params);
  return request('/api/course/ware', {
    method: 'POST',
    body: params,
  });
}
