// import { stringify } from 'qs';
import request from '@/utils/request';

// 系统管理员 ————> 试卷管理 ————> 上传试卷 ————> 保存或者上架接口
export default async function saveExam(params) {
  return request('/api/paper', {
    method: 'POST',
    body: params,
  });
}
