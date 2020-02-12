// import { stringify } from 'qs'
import request from '@/utils/request';

// eslint-disable-next-line import/prefer-default-export
export async function getUploadurl(params) {
  return request('/config/uploadpath', {
    method: 'GET',
    data: params,
  });
}
