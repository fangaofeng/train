import { useRequest } from 'umi';
// 学员待完成、已完成、已逾期
class workbenkService {
  stuCourses() {
    return '/learn/aggregation';
  }
  stuExams() {
    return '/paper/aggregation';
  }

  stats() {
    return `/stats`;
  }
  stuCoursesRequest(options = {}) {
    return useRequest(() => this.stuCourses(), { ...options });
  }
  stuExamsRequest(options = {}) {
    return useRequest(() => this.stuExams(), { ...options });
  }

  statsRequest(options = {}) {
    return useRequest(() => this.stats(), { ...options });
  }
}

export default new workbenkService();
