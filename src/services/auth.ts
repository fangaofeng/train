// import { stringify } from 'qs'
import { ServiceBase } from './base';
import { useRequest } from 'umi';
import { stringify } from 'qs';

class auth extends ServiceBase {
  login(data: {}): { url: string; method: string; data: any } {
    return { url: `${this.path}/login`, method: 'POST', data };
  }
  register(data) {
    return { url: `${this.path}/register`, method: 'POST', data };
  }

  getCaptcha(params: {} = null): string {
    if (params) return `${this.path}/captcha?${stringify(params)}`;
    return `${this.path}/captcha`;
  }

  resetPw(data): { url: string; method: string; data: any } {
    return { url: `${this.path}/password/reset`, method: 'PATCH', data };
  }

  getCaptchaRequest(params: {} = null, options = {}) {
    return useRequest(tparmas => (params ? this.getCaptcha(params) : this.getCaptcha(tparmas)), {
      ...options,
    });
  }
  loginRequest(data: {} = null, options = {}) {
    return useRequest(tdata => (data ? this.login(data) : this.login(tdata)), { ...options });
  }
  registerRequest(data: {}, options = {}) {
    return useRequest(
      this.register({
        data,
      }),
      { ...options },
    );
  }
  resetPwRequest(data: {}, options = {}) {
    return useRequest(
      this.resetPw({
        data,
      }),
      { ...options },
    );
  }
}

export default new auth('/auth');
