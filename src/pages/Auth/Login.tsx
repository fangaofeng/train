import React, { useState } from 'react';
import { useModel, useRequest, history } from 'umi';

import { authService } from '@/services';
import { Checkbox, Alert } from 'antd';
import LoginFrom from './components/Login';
import loginAvatar from '@/assets/images/Login/Login_avatar.png';
import styles from './Login.less';

const { Tab, UserName, Password, Submit } = LoginFrom;
interface LoginParamsType {
  username: string;
  password: string;
  rememberMe: boolean;
}

function LoginPage() {
  const [rememberMe, setRememberMe] = useState(true);
  const { login } = useModel('account');

  const { run, loading, error } = useRequest(data => authService.login(data), {
    manual: true,
    onSuccess: (result, params) => {
      const { username } = params[0];
      login({ ...result, rememberMe, username });
      history.push('/');
    },
  });

  // // 登录页面点击登录按钮
  const handleSubmit = (values: LoginParamsType) => {
    const obj = { ...values };
    run(obj);
  };
  // // Alert 警告提示
  const LoginMessage: React.FC<{
    content: string;
  }> = ({ content }) => (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
  return (
    <div className={styles.main}>
      <img src={loginAvatar} alt="图片" className={styles.loginAvatar} />
      <LoginFrom activeKey={'account'} onSubmit={handleSubmit}>
        <Tab key="account" tab="账户密码登录">
          {error && !error.info!.success && !loading && <LoginMessage content="账户或密码错误" />}

          <UserName
            name="username"
            placeholder="用户名"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="密码"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </Tab>
        {/* <Tab key="mobile" tab="手机号登录">
          {status === 'error' && loginType === 'mobile' && !submitting && (
            <LoginMessage content="验证码错误" />
          )}
          <Mobile
            name="mobile"
            placeholder="手机号"
            rules={[
              {
                required: true,
                message: '请输入手机号！',
              },
              {
                pattern: /^1\d{10}$/,
                message: '手机号格式错误！',
              },
            ]}
          />
          <Captcha
            name="captcha"
            placeholder="验证码"
            countDown={120}
            getCaptchaButtonText=""
            getCaptchaSecondText="秒"
            rules={[
              {
                required: true,
                message: '请输入验证码！',
              },
            ]}
          />
        </Tab> */}
        <div>
          <Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)}>
            记住用户名称
          </Checkbox>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </a>
        </div>
        <Submit loading={loading}>登录</Submit>
        {/* <div className={styles.other}>
          其他登录方式
          <AlipayCircleOutlined className={styles.icon} />
          <TaobaoCircleOutlined className={styles.icon} />
          <WeiboCircleOutlined className={styles.icon} />
          <Link className={styles.register} to="/user/register">
            注册账户
          </Link>
        </div> */}
      </LoginFrom>
    </div>
  );
}

export default LoginPage;
