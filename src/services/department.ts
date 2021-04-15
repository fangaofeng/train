import { ServiceRequest } from './base';
import { useRequest } from 'umi';
const path = '/orgs/departments';

class Department extends ServiceRequest {
  listRequest(params: {} = null, options = {}) {
    return useRequest(
      tparams =>
        params
          ? this.list({
              ...params,
            })
          : this.list({
              ...tparams,
            }),
      { ...options },
    );
  }
}
export default new Department(path);
