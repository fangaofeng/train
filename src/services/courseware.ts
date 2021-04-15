import { ServiceRequest } from './base';
import { stringify } from 'qs';
import { useRequest } from 'umi';

const path = '/course/ware';
class Courseware extends ServiceRequest {
  getTrainmanagers(id: string, params: {} = null): string {
    if (params) return `${this.path}/${id}/trainmanagers?${stringify(params)}`;
    return `${this.path}/${id}/trainmanagers`;
  }

  delTrainmanagers(id: string, data: {} = null): { url: string; method: string; data: any } {
    return { url: `${this.path}/${id}/trainmanagers`, method: 'PATCH', data };
  }

  addTrainmanagers(id: string, data: {} = null): { url: string; method: string; data: any } {
    return { url: `${this.path}/${id}/trainmanagers`, method: 'PUT', data };
  }

  getTrainmanagersRequest(id: string, params: {} = null, options = {}) {
    return useRequest(this.getTrainmanagers(id, params), { ...options });
  }

  delTrainmanagersRequest(id: string, data: [], options = {}) {
    return useRequest(() => this.delTrainmanagers(id, data), { ...options });
  }

  addTrainmanagersRequest(id: string, data: [], options = {}) {
    return useRequest(() => this.addTrainmanagers(id, data), { ...options });
  }
}
export { Courseware };
export default new Courseware(path);
