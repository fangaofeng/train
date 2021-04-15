import { useRequest } from 'umi';
import { ServiceBase } from './base';

class Config extends ServiceBase {
  getuploadurl() {
    return this.path;
  }

  getuploadurlRequest(options = {}) {
    return useRequest(() => this.getuploadurl(), { ...options });
  }
}

export default new Config('/config/uploadpath');
