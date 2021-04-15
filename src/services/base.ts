import { stringify } from 'qs';
import { useRequest } from 'umi';
import { formatResultPage } from './request';

export class ServiceBase {
  path: string;

  constructor(path: string, prefix: string = '') {
    this.path = prefix + path;
  }
}
export class service extends ServiceBase {
  retrive(id: string, params: {} = null): string {
    if (params) return `${this.path}/${id}?${stringify(params)}`;
    return `${this.path}/${id}`;
  }

  list(params: {} = null): string {
    if (params) return `${this.path}?${stringify(params)}`;
    return this.path;
  }

  patch(id: string, data: {}): { url: string; method: string; data: {} } {
    return { url: `${this.path}/${id}`, method: 'PATCH', data };
  }

  create(data: {}): { url: string; method: string; data: any } {
    return { url: `${this.path}`, method: 'POST', data };
  }

  destroy(id: string): { url: string; method: string } {
    return { url: `${this.path}/${id}`, method: 'DELETE' };
  }

  bulkdel(data: []): { url: string; method: string; data: [] } {
    return { url: `${this.path}/bulkdel`, method: 'PATCH', data };
  }
}

export class ServiceRequest extends service {
  // listRequest(params = {}, options = {}) {
  //   return useRequest(
  //     tparams =>
  //       params
  //         ? this.list({
  //             ...params,
  //           })
  //         : this.list({
  //             ...tparams,
  //           }),
  //     { formatResult: formatResultPage, ...options },
  //   );
  // }
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
      { formatResult: formatResultPage, paginated: true, ...options },
    );
  }

  retriveRequest(id: string = null, params: {} = null, options = {}) {
    return useRequest(
      (tid, tparams) => (id ? this.retrive(id, params) : this.retrive(tid, tparams)),
      { ...options },
    );
  }

  patchRequest(id: string = null, data: {}, options = {}) {
    return useRequest((tid, tdata) => (id ? this.patch(id, data) : this.patch(tid, tdata)), {
      ...options,
    });
  }

  createRequest(data: {} = null, options = {}) {
    return useRequest(
      tdata => {
        return data ? this.create(data) : this.create(tdata);
      },
      { ...options },
    );
  }

  destoryRequest(id: string = null, options = {}) {
    return useRequest(tid => (id ? this.destroy(id) : this.destroy(tid)), { ...options });
  }

  bulkdelRequest(data: [] = null, options = {}) {
    return useRequest(tdata => (data ? this.bulkdel(data) : this.bulkdel(tdata)), { ...options });
  }
}
