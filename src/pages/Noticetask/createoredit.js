import React, { useReducer } from 'react';
import { useDispatch } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history } from 'umi';
import Authorized from '@/utils/Authorized';

import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormButtonGroup,
  Submit,
  Reset,
  FormCard,
  createFormActions,
} from '@uform/antd';

import { message, Card, Button } from 'antd';
import DepartmentSelect from '../DepartmentManager/ViewSelect';
import GroupSelect from '../TrainGroupManager/ViewSelect';
import UserSelect from '../UserManager/ViewSelect';
// const { onFormInit$, onFieldValueChange$ } = FormEffectHooks;
// const onChangeOption$ = createEffectHook('onChangeOption');
const initialState = {
  departments: [], // 选中的数据组成的数组（只包含key值）
  groups: [],
  users: [],
};

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
  const msg = '通知任务创建';
  // const subname = '选择部门';
  const changeAction = 'noticetask/ChangeNotification';
  const returnUrl = '';
  const [state, statedispatch] = useReducer(reducer, initialState);
  // const [initialFormvalues, setInitialFormvalues] = useState({});
  // const changeloading = useSelector(store => store.loading.effects[changeAction]);
  const storedispatch = useDispatch();
  const {
    match: {
      params: { id },
    },
  } = props;

  const submit = value => {
    storedispatch({
      type: id ? changeAction : 'Noticetask/CreateNoticetask',
      payload: {
        data: { ...value, departments: state.departments, groups: state.groups, user: state.users },
      },
      callback: res => {
        if (res && res.status === 'ok') {
          message.success(`${msg}成功`);
        } else {
          message.warning(`${msg}失败`);
        }
      },
    });
  };

  const actions = createFormActions();
  return (
    <PageHeaderWrapper title={id ? `通知任务编辑` : `创建通知任务`}>
      <SchemaForm
        layout="horizontal"
        actions={actions}
        labelCol={4}
        wrapperCol={20}
        initialValues={{}}
        onSubmit={v => submit(v)}
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
            <DepartmentSelect
              onSelectKeys={checkedallKeys =>
                statedispatch({ type: 'departments', departments: checkedallKeys })
              }
            />
          </Card>
          <Authorized authority="trainmanager">
            <Card title="培训群组">
              <GroupSelect
                onSelectKeys={checkedallKeys =>
                  statedispatch({ type: 'groups', groups: checkedallKeys })
                }
              />
            </Card>
          </Authorized>
          <Card title="用户">
            <UserSelect
              onSelectKeys={checkedallKeys =>
                statedispatch({ type: 'users', users: checkedallKeys })
              }
            />
          </Card>
        </Card>
        <FormButtonGroup offset={8} sticky>
          <Submit>发送</Submit>
          <Button onClick={() => history.push(returnUrl)}>保存</Button>
          <Reset>重置</Reset>
          <Button onClick={() => history.push(returnUrl)}>返回</Button>
        </FormButtonGroup>
      </SchemaForm>
    </PageHeaderWrapper>
  );
};
