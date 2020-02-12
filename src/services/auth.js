// import { stringify } from 'qs'
import request from '@/utils/request';

export async function login(params) {
  return request('/auth/login', {
    method: 'POST',
    data: params,
  });
}

export async function register(params) {
  return request('/auth/register', {
    method: 'POST',
    data: params,
  });
}
