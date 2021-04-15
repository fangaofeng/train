import React, { useReducer } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Card, Button, message, Popconfirm, Row, Col, Descriptions, Avatar } from 'antd';
import { useRequest } from 'umi';
import SelfCard from '@/components/Workbench/selfCard';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import TreeOtherOpration from '@/components/TreeOtherOpration';
// eslint-disable-next-line import/no-unresolved
import UserModalAdd from '../UserManager/ModalAdd';
import { useUpdateEffect } from '@umijs/hooks';
import { departmentService } from '@/services';

import defaultavatar from '@/assets/images/Header/avatar_default_small.png';

const initialState = {
  selectId: null,
  changeVisible: false,
  trainmanager: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'selectId':
      return { ...state, selectId: action.id };
    case 'trainmanager':
      return { ...state, trainmanager: action.trainmanager };
    case 'changeVisible':
      return { ...state, changeVisible: action.visible };
    default:
      throw new Error();
  }
}
export default function AssignManger() {
  const { data: departments, loading } = departmentService.listRequest();
  const [state, statedispatch] = useReducer(reducer, initialState);

  // 点击“修改培训管理员”，显示模态框
  const changetrainmanager = () => {
    if (state.selectId) {
      statedispatch({ type: 'changeVisible', visible: true });
    } else {
      message.warning('请选择一个部门');
    }
  };

  const {
    loading: managerLoading,
    mutate,
    run: retriveTrainmanager,
  } = departmentService.retriveRequest(null, null, {
    manual: true,
    onError: (error, params) => {
      message.error(`获取部门管理员失败: ${params[0]}`);
    },
    onSuccess: result => {
      if (result) {
        statedispatch({ type: 'trainmanager', trainmanager: result });
      }
    },
  });
  useUpdateEffect(() => {
    if (state.selectId) retriveTrainmanager(state.selectId, { trainmanager: 'true' });
  }, [state.selectId]);

  const addService = useRequest(
    (tid, selectedKeys) => {
      const tdata = { trainmanager: selectedKeys[0] };
      return patch(tid, tdata);
    },
    {
      manual: true,
      onSuccess: (result, params) => {
        if (result) {
          statedispatch({ type: 'trainmanager', trainmanager: result });
          mutate(params[0]);
        }
      },
    },
  );
  // const setDepartmentid=(selectid)=>statedispatch({ type: 'selectId', id:selectid });
  // ---------------增加培训管理员模态框---------------
  const modaladdcallback = (visible, refresh = false) => {
    statedispatch({ type: 'changeVisible', visible });
  };

  return (
    <PageHeaderWrapper>
      <Card>
        <Row type="flex" justify="space-between" gutter={16}>
          <Col xs={24} sm={24} md={11}>
            <SelfCard bordered={false} title="部门名称" nopadding="true">
              <TreeOtherOpration
                loading={loading}
                onSelect={selectid => statedispatch({ type: 'selectId', id: selectid })}
                treeList={departments || []}
              />
            </SelfCard>
          </Col>
          <Col md={1} />
          <Col xs={24} sm={24} md={12}>
            <SelfCard
              loading={managerLoading}
              bordered={false}
              title={
                state.trainmanager ? (
                  '对应部门管理员信息'
                ) : (
                  // "没有对应部门管理员信息"
                  <div style={{ color: '#ff0000' }}>没有对应部门管理员信息</div>
                )
              }
              actions={[
                <Button onClick={changetrainmanager}>修改 </Button>,
                <Popconfirm title="删除不可以恢复，你确定删除？" okText="确定" cancelText="取消">
                  <Button>删除</Button>
                </Popconfirm>,
              ]}
              nopadding="true"
            >
              {state.trainmanager ? (
                <Row type="flex" justify="center" align="middle" gutter={16}>
                  <Col xs={24} sm={24} md={12}>
                    <div style={{ textAlign: 'center' }}>
                      <Avatar
                        size={128}
                        src={
                          state.trainmanager.thumbnail
                            ? state.trainmanager.thumbnail
                            : defaultavatar
                        }
                        icon={<UserOutlined />}
                      />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Descriptions column={1}>
                      <Descriptions.Item label="员工编号">
                        {state.trainmanager.user_no}
                      </Descriptions.Item>
                      <Descriptions.Item label="员工姓名">
                        {state.trainmanager.name}
                      </Descriptions.Item>
                      <Descriptions.Item label="所属部门">
                        {state.trainmanager.department}
                      </Descriptions.Item>
                      <Descriptions.Item label="员工职务">
                        {state.trainmanager.employee_position}
                      </Descriptions.Item>
                      <Descriptions.Item label="个人介绍">
                        {state.trainmanager.info}
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                </Row>
              ) : (
                <Row type="flex" justify="center" align="middle" gutter={16}>
                  <Col xs={24} sm={24} md={12}>
                    <div style={{ textAlign: 'center' }}>
                      <Avatar size={128} icon={<UserOutlined />} />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Descriptions column={1}>
                      <Descriptions.Item label="员工编号" />
                      <Descriptions.Item label="员工姓名" />
                      <Descriptions.Item label="所属部门" />
                      <Descriptions.Item label="员工职务" />
                      <Descriptions.Item label="个人介绍" />
                    </Descriptions>
                  </Col>
                </Row>
              )}
            </SelfCard>
          </Col>
        </Row>
      </Card>
      <UserModalAdd
        type="radio"
        addService={addService}
        visible={state.changeVisible}
        name="部门"
        id={state?.selectId}
        subname="培训管理员"
        visiblecallback={modaladdcallback}
        operationname="修改"
      />
    </PageHeaderWrapper>
  );
}
