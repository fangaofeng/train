import { stringify } from 'qs';
import request from '@/utils/request';

export async function getOrgsDeparments() {
  return request(`/api/orgs/departments`);
}
