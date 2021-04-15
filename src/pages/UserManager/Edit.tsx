import React, { useEffect } from 'react';
import { useModel } from 'umi';
import { Input, Button, Card, message, Spin, Form } from 'antd';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import PhoneView from '@/components/PhoneView';

import AvatarView from '@/components/AvatarView';
import { userService } from '@/services';

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
    match: {
      params: { id },
    },
  } = props;
  const { initialState } = useModel('@@initialState');
  const {
    uploadurl: { avatar: avataruploadurl },
  } = initialState;

  const [form] = Form.useForm();

  const { data: userInfo, loading: retriveloading, run: retrive } = userService.retriveRequest(
    id,
    null,
    {
      manual: true,
      onError: (error, params) => {
        message.error(`删除失败： ${params[0]} ,${error.message}`);
      },
      onSuccess: (result, params) => {
        if (result) {
          const obj = {};
          Object.keys(form.getFieldsValue()).forEach(key => {
            obj[key] = userInfo[key] || null;
          });
          // form.setFieldsValue(result);
          form.setFieldsValue(result);
        }
      },
    },
  );

  const patch = userService.patchRequest(null, null, {
    manual: true,
    onError: (error, params) => {
      message.error(`修改失败： ${params[0]} ,${error.message}`);
    },
  });

  const create = userService.createRequest(null, {
    manual: true,
    onError: (error, params) => {
      message.error(`新增失败： ${params[0]} ,${error.message}`);
    },
  });

  useEffect(() => {
    if (id) {
      retrive(id, null);
    }
  }, []);

  const getAvatarURL = () => {
    if (userInfo?.avatar) {
      return userInfo.avatar;
    }
    return '';
  };

  const onFinish = values => {
    if (id) {
      patch.run(id, values);
    } else {
      create.run(values);
    }
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
      <Spin spinning={retriveloading}>
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
                  {id ? (
                    <Button loading={patch?.loading} type="primary" htmlType="submit">
                      更新用户信息
                    </Button>
                  ) : (
                    <Button loading={create?.loading} type="primary" htmlType="submit">
                      更新用户信息
                    </Button>
                  )}
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
