import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Form, Input, Upload, Button, Card, message } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PhoneView from '@/components/PhoneView';
import styles from './Edit.less';
import storetoken from '@/utils/token';
import { getUploadAvatarurl } from '@/services/uploadUrl/uploadUrl';
import defaultavatar from '@/assets/images/Header/avatar_default_small.png';

const FormItem = Form.Item;

const token = storetoken.get();
const uploadProps = {
  headers: {
    Authorization: `Token ${token}`,
  },
};
const uploadurl = getUploadAvatarurl();

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }) => (
  <Fragment>
    <div className={styles.avatar_title}>个人图像</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload action={uploadurl} {...uploadProps}>
      <div className={styles.button_view}>
        <Button icon="upload">
          <FormattedMessage id="app.settings.basic.change-avatar" defaultMessage="Change avatar" />
        </Button>
      </div>
    </Upload>
  </Fragment>
);

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

@connect(({ loading }) => ({
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
      <PageHeaderWrapper title="修改用户信息">
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
                  {getFieldDecorator('role_display', {
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
              <AvatarView avatar={this.getAvatarURL()} />
            </div>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BaseView;
