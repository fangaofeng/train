import { stringify } from 'qs';
import { ServiceRequest } from './base';

const path = '/user';
// class user extends ServiceRequest {
//   getPaperQuestions(id: string, params: {} = null): string {
//     if (params) return `${this.path}/${id}/questions?${stringify(params)}`;
//     return `${this.path}/${id}/questions`;
//   }
// }
export default new ServiceRequest(path);
