import React, { useReducer, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history, useAccess, Link, Access } from 'umi';
import { noticetaskService } from '@/services';
import { message, Card, Button, Form, Input, Select } from 'antd';
import styles from '@/components/styles.less';
import DepartmentSelect from '../DepartmentManager/ViewSelect';
import GroupSelect from '../TrainGroupManager/ViewSelect';
import UserSelect from '../UserManager/ViewSelect';

const { Option } = Select;
const initialState = {
  departments: null, // 选中的数据组成的数组（只包含key值）
  groups: [],
  users: [],
};
const FormItem = Form.Item;
function reducer(state, action) {
  switch (action.type) {
    case 'departments':
      return { ...state, departments: action.departments };
    case 'groups':
      return { ...state, groups: action.groups };
    case 'users':
      return { ...state, users: action.users };
    default:
      throw new Error();
  }
}

export default props => {
  const access = useAccess();
  const [state, statedispatch] = useReducer(reducer, initialState);
  const {
    match: {
      params: { id },
    },
  } = props;

  const { data: taskdetail, loading, run: retrive } = noticetaskService.retriveRequest(null, null, {
    manual: true,
  });
  const create = noticetaskService.createRequest(null, {
    manual: true,
  });
  useEffect(() => {
    if (id) retrive(id, {});
  }, []);
  const [form] = Form.useForm();

  const onSave = async () => {
    try {
      const values = await form.validateFields();
      create.run({
        ...values,
        departments: state.departments,
        groups: state.groups,
        user: state.users,
      });
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  const onFinish = values => {
    create.run({
      ...values,
      departments: state.departments,
      groups: state.groups,
      user: state.users,
    });
  };
  const initialValues = id ? taskdetail : { status: 'd', level: 'info' };

  return (
    <PageHeaderWrapper title={id ? `通知任务编辑` : `创建通知任务`}>
      <Card>
        <Form form={form} initialValues={initialValues} onFinish={onFinish}>
          <FormItem
            name="reason"
            label="发送原因"
            rules={[{ required: true, message: '请输入发送原因' }]}
          >
            <Input placeholder="请输入用户名" />
          </FormItem>
          <FormItem
            label="通知标题"
            name="verb"
            rules={[{ required: true, message: '请输入通知标题' }]}
          >
            <Input placeholder="请输入用户名" />
          </FormItem>
          <FormItem
            label="详细描述"
            name="description"
            rules={[{ required: true, message: '请输入通知详细描述' }]}
          >
            <Input placeholder="通知详细描述" />
          </FormItem>
          <FormItem label="通知类型" name="level" rules={[{ required: true }]}>
            <Select placeholder="请选通知类型">
              <Option value="success">成功</Option>
              <Option value="info">信息</Option>
              <Option value="warning">警告</Option>
              <Option value="error">错误</Option>
            </Select>
          </FormItem>
          <Card title="选择接收对象">
            <Access accessible={access.department} fallback="">
              <Card title="部门">
                <DepartmentSelect
                  onChange={checkedallKeys =>
                    statedispatch({ type: 'departments', departments: checkedallKeys })
                  }
                />
              </Card>
            </Access>
            <Access accessible={access.groupmanager} fallback="">
              <Card title="培训群组">
                <GroupSelect
                  onSelectKeys={checkedallKeys =>
                    statedispatch({ type: 'groups', groups: checkedallKeys })
                  }
                />
              </Card>
            </Access>
            <Card title="用户">
              <UserSelect
                onSelectKeys={checkedallKeys =>
                  statedispatch({ type: 'users', users: checkedallKeys })
                }
              />
            </Card>
          </Card>
          <div className={styles.foonter_btns}>
            <FormItem>
              <Button type="primary" htmlType="submit">
                发布
              </Button>
              <Button type="primary" onClick={onSave}>
                保存
              </Button>
              <Link to="/noticetask/index">
                <Button>取消</Button>
              </Link>
            </FormItem>
          </div>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};
