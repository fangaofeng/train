import { stringify } from 'qs';
import request from '@/utils/request';
// 系统管理员 ————> 试卷管理 ————> 上传试卷 ————> 获取培训管理员数据
export async function getTrainerTableData(params) {
  return request(`/api//user/list/trainmanager?${stringify(params)}`);
}

// 系统管理员 ————> 试卷管理 ————> 上传试卷 ————> 保存或者上架接口
export async function saveExam(params) {
  return request('/api/paper', {
    method: 'POST',
    body: params,
  });
}
