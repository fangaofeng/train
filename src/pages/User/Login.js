import React, { Component } from 'react';
import { connect } from 'dva';
import { FormattedMessage } from 'umi/locale';
// import Link from 'umi/link';
import { Checkbox, Alert } from 'antd';
import Login from '@/components/Login';
import loginAvatar from '@/assets/images/Login/Login_avatar.png';
import styles from './Login.less';

const { UserName, Password, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  state = {
    rememberUsername: true, // 是否记住用户名,默认记住用户名
  };

  // 登录页面点击登录按钮
  handleSubmit = (err, values) => {
    if (!err) {
      const { dispatch } = this.props;
      const { rememberUsername } = this.state;
      const obj = Object.assign({}, values, { rememberUsername });
      // console.log(obj);
      dispatch({
        type: 'login/login',
        payload: {
          ...obj,
        },
      });
    }
  };

  // 改变 （Checkbox） 记住用户名
  changeRememberUsername = e => {
    this.setState({
      rememberUsername: e.target.checked,
    });
  };

  // Alert 警告提示
  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { login, submitting } = this.props;
    const { rememberUsername } = this.state;
    return (
      <div className={styles.main}>
        <img src={loginAvatar} alt="图片" className={styles.loginAvatar} />
        <Login
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          {login.status === 'error' && !submitting && this.renderMessage('用户名或者密码错误！')}
          <UserName name="userName" placeholder="用户名" />
          <Password
            name="password"
            placeholder="密码"
            onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
          />
          {/* ---------------自动登录和忘记密码--------------- */}
          <div>
            <Checkbox checked={rememberUsername} onChange={this.changeRememberUsername}>
              记住用户名
            </Checkbox>
            <a style={{ float: 'right' }} href="/user/register">
              <FormattedMessage id="app.login.forgot-password" />
            </a>
          </div>
          {/* ---------------自动登录和忘记密码--------------- */}
          {/* ---------------提交按钮--------------- */}
          <Submit loading={submitting}>
            <FormattedMessage id="app.login.login" />
          </Submit>
          {/* ---------------提交按钮--------------- */}
        </Login>
      </div>
    );
  }
}

export default LoginPage;
