import request from '@/utils/request';

export async function queryProvince() {
  return request('/api/geo/province');
}

export async function queryCity(province) {
  return request(`/api/geo/city/${province}`);
}
