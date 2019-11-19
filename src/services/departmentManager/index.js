import { stringify } from 'qs';
import request from '@/utils/request';

export async function getOrgsDeparments() {
  return request(`/api/orgs/departments`);
}

export async function getOrgsDeparment(params) {
  return request(`/api/orgs/departments/${params.id}?${stringify(params.data)}`);
}
export async function delOrgsDeparments(params) {
  return request(`/api/orgs/departments/${params.id}`, {
    method: 'DELETE',
    body: params,
  });
}

export async function createOrgsDeparments(params) {
  return request('/api/orgs/departments', {
    method: 'POST',
    body: params,
  });
}

export async function changeOrgsDeparmentsName(params) {
  return request(`/api/orgs/departments/${params.id}`, {
    method: 'PATCH',
    body: params.data,
  });
}
export async function changerTrainManager(params) {
  return request(`/api/orgs/departments/${params.id}`, {
    method: 'PATCH',
    body: params.data,
  });
}
