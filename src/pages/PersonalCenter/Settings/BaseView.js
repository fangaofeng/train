import React, { Component } from 'react';
import { formatMessage } from 'umi';
import { Form, Input, Button, Card, Descriptions } from 'antd';
import { connect } from 'dva';
// import storetoken from '@/utils/token'

import styles from './BaseView.less';

// import { getTimeDistance } from '@/utils/utils';
// import { getUploadAvatarurl } from '@/services/uploadUrl/uploadUrl'
import AvatarView from '@/components/AvatarView';

const FormItem = Form.Item;

// const token = storetoken.get()

// 头像组件 方便以后独立，增加裁剪之类的功能
// const AvatarView = ({ avatar }) => (
//   <Fragment>
//     <div className={styles.avatar_title}>个人图像</div>
//     <div className={styles.avatar}>
//       <img src={avatar} alt="avatar" />
//     </div>
//     <Upload name="avatar" action={uploadurl} {...uploadProps}>
//       <div className={styles.button_view}>
//         <Button icon="upload">
//           <FormattedMessage id="app.settings.basic.change-avatar" defaultMessage="Change avatar" />
//         </Button>
//       </div>
//     </Upload>
//   </Fragment>
// );

// const validatorGeographic = (rule, value, callback) => {
//   const { province, city } = value;
//   if (!province.key) {
//     callback('Please input your province!');
//   }
//   if (!city.key) {
//     callback('Please input your city!');
//   }
//   callback();
// };

// const validatorPhone = (rule, value, callback) => {
//   const values = value.split('-');
//   if (!values[0]) {
//     callback('Please input your area code!');
//   }
//   if (!values[1]) {
//     callback('Please input your phone number!');
//   }
//   callback();
// };

@connect(({ account, loading, settings }) => ({
  avataruploadurl: settings.uploadurl.avatar,
  currentUser: account.currentUser,
  currentUserLoading: loading.effects['account/FetchCurrent'],
  patchuserinfoLoading: loading.effects['account/patchuserinfo'],
}))
@Form.create()
class BaseView extends Component {
  componentDidMount() {
    this.setBaseInfo();
  }

  setBaseInfo = () => {
    const { currentUser, form } = this.props;
    Object.keys(form.getFieldsValue()).forEach(key => {
      const obj = {};
      obj[key] = currentUser[key] || null;
      form.setFieldsValue(obj);
    });
  };

  getAvatarURL() {
    const { currentUser } = this.props;
    if (currentUser.avatar) {
      return currentUser.avatar;
    }
    const url = '';
    return url;
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
          type: 'account/patchuserinfo',
          payload: values,
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      currentUser,
      patchuserinfoLoading,
      avataruploadurl,
    } = this.props;

    return (
      <div>
        <Card title="基本信息" style={{ marginBottom: 24 }} bordered={false}>
          <Descriptions
            col={1}
            size="small"
            layout="horizontal"
            gutter={5}
            style={{ marginBottom: 16 }}
            // title="基本信息"
          >
            <Descriptions.Item label="email">{currentUser.email}</Descriptions.Item>
            <Descriptions.Item label="培训中职位">{currentUser.role_display}</Descriptions.Item>

            <Descriptions.Item label="员工编号">{currentUser.user_no}</Descriptions.Item>
            <Descriptions.Item label="所属部门">{currentUser.department_name}</Descriptions.Item>
            <Descriptions.Item label="部门职位">{currentUser.employee_position}</Descriptions.Item>
          </Descriptions>
        </Card>
        {/* <Divider style={{ margin: '16px 0' }} /> */}
        <Card title="修改信息" style={{ marginBottom: 24 }} bordered={false}>
          <div className={styles.baseView} ref={this.getViewDom}>
            <div className={styles.left}>
              <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
                {/* <FormItem label={formatMessage({ id: 'app.settings.basic.email' })}>
                {getFieldDecorator('email', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'app.settings.basic.email-message' }, {}),
                    },
                  ],
                })(<Input />)}
              </FormItem> */}
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
                {/* <FormItem label="公司职位">
                {getFieldDecorator('employee_position', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'app.settings.basic.profile-message' }, {}),
                    },
                  ],
                })(<Input />)}
              </FormItem> */}
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
                {/* <FormItem label={formatMessage({ id: 'app.settings.basic.country' })}>
              {getFieldDecorator('country', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.country-message' }, {}),
                  },
                ],
              })(
                <Select style={{ maxWidth: 220 }}>
                  <Option value="China">中国</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label={formatMessage({ id: 'app.settings.basic.geographic' })}>
              {getFieldDecorator('geographic', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.geographic-message' }, {}),
                  },
                  {
                    validator: validatorGeographic,
                  },
                ],
              })(<GeographicView />)}
            </FormItem> */}
                <FormItem label={formatMessage({ id: 'app.settings.basic.address' })}>
                  {getFieldDecorator('address', {
                    rules: [
                      {
                        required: true,
                        message: formatMessage({ id: 'app.settings.basic.address-message' }, {}),
                      },
                    ],
                  })(<Input />)}
                </FormItem>
                {/* <FormItem label="员工编号">
                {getFieldDecorator('user_no', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'app.settings.basic.address-message' }, {}),
                    },
                  ],
                })(<Input />)}
              </FormItem> */}
                {/* <FormItem label={formatMessage({ id: 'app.settings.basic.phone' })}>
              {getFieldDecorator('userNo', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.phone-message' }, {}),
                  },
                  { validator: validatorPhone },
                ],
              })(<PhoneView />)}
            </FormItem> */}
                <Button loading={patchuserinfoLoading} type="primary" htmlType="submit">
                  更新个人信息
                </Button>
              </Form>
            </div>
            <div className={styles.right}>
              <AvatarView avatar={currentUser.avatar} uploadurl={avataruploadurl} />
            </div>
          </div>
        </Card>
        {/* </Spin> */}
      </div>
    );
  }
}

export default BaseView;
