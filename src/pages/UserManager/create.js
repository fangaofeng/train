import React, { Component } from 'react';
import { formatMessage } from 'umi';
import { Form, Input, Button, Card, message } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import PhoneView from '@/components/PhoneView';
import styles from './Edit.less';
import AvatarView from '@/components/AvatarView';
// import storetoken from '@/utils/token';
// import { getUploadAvatarurl } from '@/services/uploadUrl/uploadUrl';
import defaultavatar from '@/assets/images/Header/avatar_default_small.png';

const FormItem = Form.Item;

const validatorPhone = (rule, value, callback) => {
  const values = value.split('-');
  if (!values[0]) {
    callback('Please input your area code!');
  }
  if (!values[1]) {
    callback('Please input your phone number!');
  }
  callback();
};

@connect(({ loading, settings }) => ({
  avataruploadurl: settings.uploadurl.avatar,
  createuserinfoLoading: loading.effects['UserManager/createuserinfo'],
}))
@Form.create()
class BaseView extends Component {
  componentDidMount() {
    // this.setBaseInfo()
  }

  setBaseInfo = () => {
    const {
      dispatch,
      form,

      match: {
        params: { id },
      },
    } = this.props;
    dispatch({
      type: 'UserManager/GetUser',
      payload: { id },
      callback: res => {
        if (res && res.status === 'ok') {
          const userInfo = res.data;
          Object.keys(form.getFieldsValue()).forEach(key => {
            const obj = {};
            obj[key] = userInfo[key] || null;
            form.setFieldsValue(obj);
          });
        } else {
          message.warning('获取用户信息失败');
        }
      },
    });
  };

  getAvatarURL() {
    const { userInfo } = this.props;
    if (userInfo && userInfo.avatar) {
      return userInfo.avatar;
    }
    return defaultavatar;
  }

  getViewDom = ref => {
    this.view = ref;
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFieldsAndScroll((error, values) => {
      if (!error) {
        // submit the values
        dispatch({
          type: 'UserManager/patchuserinfo',
          payload: values,
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      createuserinfoLoading,
      avataruploadurl,
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <PageHeaderWrapper title="用户信息">
        <Card title="用户信息" style={{ marginBottom: 24 }} bordered={false}>
          <div className={styles.baseView} ref={this.getViewDom}>
            <div className={styles.left}>
              <Form {...formItemLayout} onSubmit={this.handleSubmit} hideRequiredMark>
                <FormItem label={formatMessage({ id: 'app.settings.basic.email' })}>
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        required: true,
                        message: formatMessage({ id: 'app.settings.basic.email-message' }, {}),
                      },
                    ],
                  })(<Input />)}
                </FormItem>
                <FormItem label="名字">
                  {getFieldDecorator('name', {
                    rules: [
                      {
                        required: true,
                        message: formatMessage({ id: 'app.settings.basic.nickname-message' }, {}),
                      },
                    ],
                  })(<Input />)}
                </FormItem>
                <FormItem label="公司职位">
                  {getFieldDecorator('employee_position', {
                    rules: [
                      {
                        required: true,
                        message: formatMessage({ id: 'app.settings.basic.profile-message' }, {}),
                      },
                    ],
                  })(<Input />)}
                </FormItem>
                <FormItem label="个人介绍">
                  {getFieldDecorator('info', {
                    rules: [
                      {
                        required: true,
                        message: formatMessage({ id: 'app.settings.basic.profile-message' }, {}),
                      },
                    ],
                  })(
                    <Input.TextArea
                      placeholder={formatMessage({
                        id: 'app.settings.basic.profile-placeholder',
                      })}
                      rows={3}
                    />
                  )}
                </FormItem>

                <FormItem label="培训系统角色">
                  {getFieldDecorator('roles', {
                    rules: [
                      {
                        required: true,
                        message: formatMessage({ id: 'app.settings.basic.address-message' }, {}),
                      },
                    ],
                  })(<Input />)}
                </FormItem>
                <FormItem label="员工编号">
                  {getFieldDecorator('user_no', {
                    rules: [
                      {
                        required: true,
                        message: formatMessage({ id: 'app.settings.basic.address-message' }, {}),
                      },
                    ],
                  })(<Input />)}
                </FormItem>
                <FormItem label={formatMessage({ id: 'app.settings.basic.phone' })}>
                  {getFieldDecorator('phone', {
                    rules: [
                      {
                        required: true,
                        message: formatMessage({ id: 'app.settings.basic.phone-message' }, {}),
                      },
                      { validator: validatorPhone },
                    ],
                  })(<PhoneView />)}
                </FormItem>

                <Form.Item
                  wrapperCol={{
                    xs: { span: 24, offset: 0 },
                    sm: { span: 16, offset: 8 },
                  }}
                >
                  <Button loading={createuserinfoLoading} type="primary" htmlType="submit">
                    提交用户信息
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <div className={styles.right}>
              <AvatarView avatar={(this.getAvatarURL(), avataruploadurl)} />
            </div>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BaseView;
