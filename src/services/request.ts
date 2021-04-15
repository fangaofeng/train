/* eslint-disable react-hooks/rules-of-hooks */
import { useRequest } from 'umi';

export function formatResultPage(result): { list: []; total: number } {
  return { list: result?.data.results, total: result?.data.count };
}

export function generalRequest(service, params = {}, options = {}) {
  return useRequest(
    () =>
      service({
        ...params,
      }),
    { ...options },
  );
}

export function listRequest(service, params = {}, options = {}) {
  return useRequest(
    service({
      ...params,
    }),
    { formatResult: formatResultPage, ...options },
  );
}
export function retriveRequest(service, id: string, options = {}) {
  return useRequest(
    () =>
      service({
        id,
      }),
    { ...options },
  );
}
export function patchRequest(service, id: string, data: {}, options = {}) {
  return useRequest(
    () =>
      service({
        id,
        data,
      }),
    { ...options },
  );
}
export function createRequest(service, data: {}, options = {}) {
  return useRequest(
    () =>
      service({
        data,
      }),
    { ...options },
  );
}
export function destoryRequest(service, id: string, options = {}) {
  return useRequest(
    () =>
      service({
        id,
      }),
    { ...options },
  );
}
export function bulkdelRequest(service, data: {}, options = {}) {
  return useRequest(
    () =>
      service.bulkdel({
        data,
      }),
    { ...options },
  );
}
export default {
  generalRequest,
  listRequest,
  retriveRequest,
  patchRequest,
  createRequest,
  destoryRequest,
  bulkdelRequest,
  formatResultPage,
};
