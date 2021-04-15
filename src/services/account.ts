import { stringify } from 'qs';
import { useRequest } from 'umi';
import { ServiceRequest, ServiceBase } from './base';

const path = '/account/info';
const noticesPath = '/notices';

class Account extends ServiceBase {
  getInfo(params: {} = null): string {
    if (params) return `${this.path}?${stringify(params)}`;
    return `${this.path}`;
  }

  patch(data: {}): { url: string; method: string; data: {} } {
    return { url: `${this.path}`, method: 'PATCH', data };
  }

  patchRequest(data: {}, options = {}) {
    return useRequest(() => this.patch(data), { ...options });
  }

  // eslint-disable-next-line class-methods-use-this
  changeavatar(data: any): { url: string; method: string; data: any } {
    return { url: '/api/user/avatar', method: 'POST', data };
  }

  changeavatarRequest(data: {}, options: {} = {}) {
    return useRequest(() => this.changeavatar(data), { ...options });
  }

  getInfoRequest(params: {} = null, options = {}) {
    return useRequest(() => this.getInfo(params), { ...options });
  }
}
class Notices extends ServiceRequest {
  clear(data: []): { url: string; method: string; data: [] } {
    return { url: `${this.path}/clear`, method: 'PATCH', data };
  }

  clearRequest(data: [] = [], options = {}) {
    return useRequest(() => this.clear(data), { ...options });
  }
}

export const accountService = new Account(path);
export const noticesService = new Notices(noticesPath);
