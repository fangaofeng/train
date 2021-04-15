import { useRequest } from 'umi';
import { stringify } from 'qs';
import { ServiceRequest } from './base';

const path = '/paper/progress';
class ExamProgress extends ServiceRequest {
  getPaperQuestions(id: string, params: {} = null): string {
    if (params) return `${this.path}/${id}/questions?${stringify(params)}`;
    return `${this.path}/${id}/questions`;
  }

  getPaperQuestionsRequest(id: string, params: {} = null, options = {}) {
    return useRequest(this.getPaperQuestions(id, params), { ...options });
  }
}
export default new ExamProgress(path);
