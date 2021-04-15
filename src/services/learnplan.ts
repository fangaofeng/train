import { ServiceRequest } from './base';
import { stringify } from 'qs';
import { useRequest } from 'umi';

const path = '/learn/plan';
class Learnplan extends ServiceRequest {
  getGroups(id: string, params: {} = null): string {
    if (params) return `${this.path}/${id}/groups?${stringify(params)}`;
    return `${this.path}/${id}/groups`;
  }

  getGroupMembers(id: string, groupid: string, params: {} = null): string {
    if (params) return `${this.path}/${id}/group/${groupid}?${stringify(params)}`;
    return `${this.path}/${id}/group/${groupid}`;
  }

  getGroupsRequest(id: string, params: {} = null, options = {}) {
    return useRequest(this.getGroups(id, params), { ...options });
  }

  getGroupMembersRequest(id: string, groupid: string, params: {} = null, options = {}) {
    return useRequest(this.getGroupMembers(id, groupid, params), { ...options });
  }
}
export { Learnplan };
export default new Learnplan(path);
