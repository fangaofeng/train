import { stringify } from 'qs';
import request from '@/utils/request';

// 学员待完成、已完成、已逾期
export async function getExamProgress(params) {
  return request(`/api/exam/progress?${stringify(params)}`);
}
