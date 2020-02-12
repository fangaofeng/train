import request from '@/utils/request';

export async function queryProvince() {
  return request('/geo/province');
}

export async function queryCity(province) {
  return request(`/geo/city/${province}`);
}
