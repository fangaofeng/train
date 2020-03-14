import request from '@/utils/request';
import { stringify } from 'qs';

export async function asyncrequest(params) {
  return request(path, {
    method: 'POST',
    data: params,
  });
}
