import React, { useState, useEffect } from 'react';
import { Link, history, formatMessage, FormattedMessage, useRequest } from 'umi';
import { Input, Button, Select, Row, Col, Popover, Form, Progress, message } from 'antd';
import { useUnmount } from '@umijs/hooks';
import loginAvatar from '@/assets/images/Login/Login_avatar.png';
import { authService } from '@/services';
import styles from './Register.less';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="validation.password.strength.strong" />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="validation.password.strength.medium" />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="validation.password.strength.short" />
    </div>
  ),
};

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

function Register() {
  const [step, setStep] = useState('doing');
  const [count, setcount]: [number, any] = useState(0);
  const [visible, setvisible]: [boolean, any] = useState(false);
  const [prefix, setprefix]: [string, any] = useState('86');
  const [popover, setpopover]: [boolean, any] = useState(false);
  const confirmDirty = false;
  let interval: number | undefined;

  const [form] = Form.useForm();

  useEffect(() => {
    if (step === 'finished') {
      const username = form.getFieldValue('username');
      history.push({
        pathname: '/auth/register-result',
        state: {
          username,
        },
      });
    }
  }, [step]);

  useEffect(() => {
    return () => {
      clearInterval(interval);
    };
  }, []);

  useUnmount(() => {
    clearInterval(interval);
  });

  const getCaptcha = authService.getCaptcha(null, {
    manual: true,
    formatResult,
    onSuccess: (result, params) => {
      if (result.success) {
        // message.success(`验证码已发送到 ${params[0]}`);
        let counts = 59;
        setcount(counts);
        interval = window.setInterval(() => {
          counts -= 1;
          setcount(counts);
          if (counts === 0) {
            clearInterval(interval);
          }
        }, 1000);
      }
    },
  });

  const onGetCaptcha = () => {
    const username = form.getFieldValue('username');
    if (username) {
      getCaptcha.run({ username });
    } else {
    }
  };

  const resetPw = authService.resetPw(null, {
    manual: true,
    formatResult,
    onSuccess: (result, params) => {
      if (result.success) {
        message.success(`密码已经更改 ${params[0]}`);
      }
    },
  });
  const getPasswordStatus = () => {
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  const onFinish = (values: { [key: string]: any }) => {
    resetPw.run(values);
  };

  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;
    if (value && value !== form.getFieldValue('password')) {
      return promise.reject('两次密码输入不一致');
    }
    return promise.resolve();
  };
  const checkPassword = (_: any, value: string) => {
    const promise = Promise;
    // 没有值的情况
    if (!value) {
      setvisible(!!value);
      return promise.reject('必须输入密码');
    }
    // 有值的情况
    if (!visible) {
      setvisible(!!value);
    }
    setpopover(!popover);
    if (value.length < 6) {
      return promise.reject('');
    }
    if (value && confirmDirty) {
      form.validateFields(['confirm']);
    }
    return promise.resolve();
  };

  const changePrefix = (value: string) => {
    setprefix(value);
  };
  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  return (
    <div className={styles.main}>
      <h3>
        <FormattedMessage id="BLOCK_NAME.register.register" />
      </h3>
      <Form form={form} name="UserRegister" onFinish={onFinish}>
        <FormItem
          name="username"
          rules={[
            {
              required: true,
              message: '必须输入注册时的email',
            },
            {
              type: 'email',
              message: '不是正确的email',
            },
          ]}
        >
          <Input size="large" placeholder={'输入注册时的email'} />
        </FormItem>
        <Row gutter={8}>
          <Col span={16}>
            <FormItem
              name="captcha"
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'BLOCK_NAME.verification-code.required' }),
                },
              ]}
            >
              <Input
                size="large"
                placeholder={formatMessage({ id: 'BLOCK_NAME.verification-code.placeholder' })}
              />
            </FormItem>
          </Col>
          <Col span={8}>
            <Button
              size="large"
              disabled={!!count}
              className={styles.getCaptcha}
              onClick={onGetCaptcha}
            >
              {count
                ? `${count} s`
                : formatMessage({ id: 'BLOCK_NAME.register.get-verification-code' })}
            </Button>
          </Col>
        </Row>
        <Popover
          getPopupContainer={node => {
            if (node && node.parentNode) {
              return node.parentNode as HTMLElement;
            }
            return node;
          }}
          content={
            visible && (
              <div style={{ padding: '4px 0' }}>
                {passwordStatusMap[getPasswordStatus()]}
                {renderPasswordProgress()}
                <div style={{ marginTop: 10 }}>
                  <FormattedMessage id="BLOCK_NAME.strength.msg" />
                </div>
              </div>
            )
          }
          overlayStyle={{ width: 240 }}
          placement="right"
          visible={visible}
        >
          <FormItem
            name="password"
            className={
              form.getFieldValue('password') &&
              form.getFieldValue('password').length > 0 &&
              styles.password
            }
            rules={[
              {
                validator: checkPassword,
              },
            ]}
          >
            <Input
              size="large"
              type="password"
              placeholder={formatMessage({ id: 'BLOCK_NAME.password.placeholder' })}
            />
          </FormItem>
        </Popover>
        <FormItem
          name="confirm"
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'BLOCK_NAME.confirm-password.required' }),
            },
            {
              validator: checkConfirm,
            },
          ]}
        >
          <Input
            size="large"
            type="password"
            placeholder={formatMessage({ id: 'BLOCK_NAME.confirm-password.placeholder' })}
          />
        </FormItem>
        {/* <InputGroup compact>
          <Select size="large" value={prefix} onChange={changePrefix} style={{ width: '20%' }}>
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
          </Select>
          <FormItem
            style={{ width: '80%' }}
            name="mobile"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'BLOCK_NAME.phone-number.required' }),
              },
              {
                pattern: /^\d{11}$/,
                message: formatMessage({ id: 'BLOCK_NAME.phone-number.wrong-format' }),
              },
            ]}
          >
            <Input
              size="large"
              placeholder={formatMessage({ id: 'BLOCK_NAME.phone-number.placeholder' })}
            />
          </FormItem>
        </InputGroup> */}

        <FormItem>
          <Button
            size="large"
            loading={submitting}
            className={styles.submit}
            type="primary"
            htmlType="submit"
          >
            修改
          </Button>
          <Link className={styles.login} to="/user/login">
            现有账号登录
          </Link>
        </FormItem>
      </Form>
    </div>
  );
}

export default Register;
