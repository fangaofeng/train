// import { stringify } from 'qs';

import { Courseware } from './courseware';

const path = '/paper';
// class courseware extends service {
//   bulkdel() {
//     return this.path + '/dels';
//   }
// gettrainmanagers(id: string, params: {} = null): string {
//   if (params) return `${this.path}/${id}/trainmanagers?${stringify(params)}`;
//   return `${this.path}/${id}/trainmanagers`;
// }
// delTrainmanagers(id: string, data: {} = null): { url: string; method: string; data: any } {
//   return { url: `${this.path}/${id}/trainmanagers`, method: 'PATCH', data };
// }
// addTrainmanagers(id: string, data: {} = null): { url: string; method: string; data: any } {
//   return { url: `${this.path}/${id}/trainmanagers`, method: 'PATCH', data };
// }
// }
export default new Courseware(path);
// ------------------------------------------------------------------
