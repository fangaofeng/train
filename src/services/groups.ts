import { ServiceRequest } from './base';
import { stringify } from 'qs';
import { useRequest } from 'umi';

const path = '/group';
class group extends ServiceRequest {
  getMembers(id: string, params: {} = null): string {
    if (params) return `${this.path}/${id}/members?${stringify(params)}`;
    return `${this.path}/${id}/members`;
  }
  delMembers(id: string, data: [] = []): { url: string; method: string; data: [] } {
    return { url: `${this.path}/members`, method: 'PATCH', data };
  }
  addMembers(id: string, data: [] = []): { url: string; method: string; data: [] } {
    return { url: `${this.path}/members`, method: 'PUT', data };
  }
  getMembersRequest(id: string, params: {} = null, options = {}) {
    return useRequest(this.getMembers(id, params), { ...options });
  }
  delMembersRequest(id: string, data: [], options = {}) {
    return useRequest(() => this.delMembers(id, data), { ...options });
  }
  addMembersRequest(id: string, data: [], options = {}) {
    return useRequest(() => this.addMembers(id, data), { ...options });
  }
}

export default new group(path);
