import { stringify } from 'qs';
import request from '@/utils/request';

export async function getOrgsDeparments() {
  return request(`/orgs/departments`);
}

export async function getOrgsDeparment(params) {
  return request(`/orgs/departments/${params.id}?${stringify(params.data)}`);
}
export async function delOrgsDeparments(params) {
  return request(`/orgs/departments/${params.id}`, {
    method: 'DELETE',
    data: params,
  });
}

export async function createOrgsDeparments(params) {
  return request('/orgs/departments', {
    method: 'POST',
    data: params,
  });
}

export async function changeOrgsDeparmentsName(params) {
  return request(`/orgs/departments/${params.id}`, {
    method: 'PATCH',
    data: params.data,
  });
}
export async function changerTrainManager(params) {
  return request(`/orgs/departments/${params.id}`, {
    method: 'PATCH',
    data: params.data,
  });
}
