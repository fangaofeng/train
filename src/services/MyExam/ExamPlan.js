import { stringify } from 'qs';
import request from '@/utils/request';

// 学员待完成、已完成、已逾期
// eslint-disable-next-line import/prefer-default-export
export async function getExamProgress(params) {
  return request(`/exam/progress?${stringify(params)}`);
}
