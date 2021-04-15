import React, { useEffect } from 'react';
import { useModel } from 'umi';
import { Input, Button, Descriptions, Card, message, Spin, Form } from 'antd';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import PhoneView from '@/components/PhoneView';

import AvatarView from '@/components/AvatarView';
import { accountService } from '@/services';

import styles from './Edit.less';

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

function Edit(props) {
  const {
    initialState: {
      uploadurl: { avatar: avataruploadurl },
    },
  } = useModel('@@initialState');

  const [form] = Form.useForm();

  const { data: userInfo, loading: getInfoloading } = accountService.getInfoRequest(null, {
    onError: (error, params) => {
      message.error(`删除失败： ${params[0]} ,${error.message}`);
    },
    onSuccess: result => {
      if (result) {
        const obj = {};
        Object.keys(form.getFieldsValue()).forEach(key => {
          obj[key] = userInfo[key] || null;
        });
        // form.setFieldsValue(result);
        form.setFieldsValue(result);
      }
    },
  });

  const patch = accountService.patchRequest(null, {
    manual: true,
    onError: (error, params) => {
      message.error(`修改失败： ${params[0]} ,${error.message}`);
    },
  });

  const getAvatarURL = () => {
    if (userInfo?.avatar) {
      return userInfo.avatar;
    }
    return '';
  };

  const onFinish = values => {
    patch.run(values);
  };

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
      <Spin spinning={getInfoloading}>
        <Card title="基本信息" style={{ marginBottom: 24 }} bordered={false}>
          <Descriptions
            col={1}
            size="small"
            layout="horizontal"
            gutter={5}
            style={{ marginBottom: 16 }}
            // title="基本信息"
          >
            <Descriptions.Item label="email">{userInfo?.email}</Descriptions.Item>
            <Descriptions.Item label="培训中职位">{userInfo?.role_display}</Descriptions.Item>

            <Descriptions.Item label="员工编号">{userInfo?.user_no}</Descriptions.Item>
            <Descriptions.Item label="所属部门">{userInfo?.department_name}</Descriptions.Item>
            <Descriptions.Item label="部门职位">{userInfo?.employee_position}</Descriptions.Item>
          </Descriptions>
        </Card>
        <Card title="用户信息" style={{ marginBottom: 24 }} bordered={false}>
          <div className={styles.baseView}>
            <div className={styles.left}>
              <Form {...formItemLayout} form={form} onFinish={onFinish} hideRequiredMark>
                <FormItem
                  label="电子邮箱"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: '请输入电子邮箱',
                    },
                  ]}
                >
                  <Input size="large" placeholder="电子邮箱" />
                </FormItem>
                <FormItem
                  label="名字"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: '请输入名字',
                    },
                  ]}
                >
                  <Input size="large" placeholder="名字" />
                </FormItem>
                <FormItem
                  label="公司职位"
                  name="employee_position"
                  rules={[
                    {
                      required: true,
                      message: '请输入公司职位',
                    },
                  ]}
                >
                  <Input size="large" placeholder="公司职位" />
                </FormItem>
                <FormItem
                  label="个人介绍"
                  name="info"
                  rules={[
                    {
                      required: true,
                      message: '个人介绍',
                    },
                  ]}
                >
                  <Input.TextArea placeholder="个人介绍" rows={3} />
                </FormItem>

                <FormItem
                  label="手机"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: '手机号码',
                    },
                    { validator: validatorPhone },
                  ]}
                >
                  <PhoneView />
                </FormItem>
                <Form.Item
                  wrapperCol={{
                    xs: { span: 24, offset: 0 },
                    sm: { span: 16, offset: 8 },
                  }}
                >
                  <Button loading={patch?.loading} type="primary" htmlType="submit">
                    更新用户信息
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <div className={styles.right}>
              <AvatarView avatar={getAvatarURL()} uploadurl={avataruploadurl} />
            </div>
          </div>
        </Card>
      </Spin>
    </PageHeaderWrapper>
  );
}

export default Edit;
