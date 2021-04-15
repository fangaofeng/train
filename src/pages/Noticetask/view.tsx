import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history } from 'umi';
import Authorized from '@/utils/Authorized';
import { noticetaskService } from '@/services';
import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  FormEffectHooks,
  Submit,
  Reset,
} from '@formily/antd';
import { setup, FormItemGrid, FormCard, FormBlock, FormLayout } from '@formily/antd-components';
import { Card, Button } from 'antd';
import DeparmentSelect from '../DepartmentManager/ViewSelect';
import GroupSelect from '../TrainGroupManager/ViewSelect';
import UserSelect from '../UserManager/ViewSelect';

export default props => {
  const msg = '获取通知任务';
  const returnUrl = '/noticetask/index';
  const {
    match: {
      params: { id },
    },
  } = props;
  const { data: taskdetail, loading } = noticetaskService.retriveRequest(id);

  const actions = createFormActions();
  return (
    <PageHeaderWrapper title={id ? `通知任务编辑` : `创建通知任务`}>
      <SchemaForm
        layout="horizontal"
        actions={actions}
        labelCol={4}
        wrapperCol={20}
        initialValues={taskdetail}
      >
        <FormCard title="通知" name="noticetask">
          <Field
            type="string"
            title="通知标题"
            name="verb"
            required
            x-component-props={{
              placeholder: '通知标题填写这里',
            }}
          />{' '}
          <Field
            type="string"
            title="详细描述"
            required
            name="description"
            x-component-props={{
              placeholder: '通知详细描述',
            }}
          />{' '}
          <Field
            type="string"
            title="原因"
            name="reason"
            required
            x-component-props={{
              placeholder: '通知的原因',
            }}
          />{' '}
          <Field
            type="string"
            title="通知类型"
            required
            name="level"
            enum={['success', 'info', 'warning', 'error']}
            x-component-props={{
              placeholder: '通知类型',
            }}
          />
        </FormCard>{' '}
        <Card title="选择接收对象">
          <Card title="部门">
            <DeparmentSelect />
          </Card>
          {/* <Authorized authority="trainmanager" noMatch=""> */}
          <Card title="培训群组">
            <GroupSelect />
          </Card>
          {/* </Authorized> */}
          {/* <Card title="用户">
            <UserSelect />
          </Card> */}
        </Card>
        <FormButtonGroup offset={8} sticky>
          <Button onClick={() => history.push(returnUrl)}>返回</Button>
        </FormButtonGroup>
      </SchemaForm>
    </PageHeaderWrapper>
  );
};
