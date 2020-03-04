import React, { useReducer, useEffect } from 'react';
import { Card, Button, message, Popconfirm, Row, Col, Descriptions, Avatar } from 'antd';

import SelfCard from '@/components/Workbench/selfCard';
import { useSelector, useDispatch } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import TreeOtherOpration from '@/components/TreeOtherOpration';
import defaultavatar from '@/assets/images/Header/avatar_default_small.png';
// eslint-disable-next-line import/no-unresolved
import UserModalAdd from '../UserManager/ModalAdd';

// const { Search } = Input;
const initialState = {
  // selectedAllKeys: [], // 选中的数据组成的数组（只包含key值）
  // delVisible: false, // 批量删除的模态框————>显示隐藏
  selectId: null,
  refresh: 0,
  changeVisible: false,
  trainmanager: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'selectId':
      return { ...state, selectId: action.id };
    case 'trainmanager':
      return { ...state, trainmanager: action.trainmanager };
    case 'refresh':
      return { ...state, refresh: state.refresh + 1 };
    case 'changeVisible':
      return { ...state, changeVisible: action.visible };
    default:
      throw new Error();
  }
}
export default function AssignManger() {
  const storedispatch = useDispatch();
  const users = useSelector(store => store.UserManager.Users);
  const departments = useSelector(store => store.DepartmentManager.departments);

  const [state, statedispatch] = useReducer(reducer, initialState);

  // 点击“修改培训管理员”，显示模态框
  const changetrainmanager = () => {
    if (state.selectId) {
      statedispatch({ type: 'changeVisible', visible: true });
    } else {
      message.warning('请选择一个部门');
    }
  };

  useEffect(() => {
    storedispatch({
      type: 'DepartmentManager/GetOrgsDeparments',
    });
  }, []);

  useEffect(() => {
    if (state.selectId) {
      storedispatch({
        type: 'DepartmentManager/GetDeparmentTrainManager',
        payload: { id: state.selectId, data: { trainmanager: 'true' } },
        callback: res => {
          if (res && res.status === 'ok') {
            statedispatch({ type: 'trainmanager', trainmanager: res.data.trainmanager });
          } else {
            message.warning('获取部门管理员信息失败');
          }
        },
      });
    }
  }, [state.selectId, state.refresh]);
  // const setDepartmentid=(selectid)=>statedispatch({ type: 'selectId', id:selectid });
  // ---------------增加培训管理员模态框---------------
  const modaladdcallback = (visible, refresh = false) => {
    if (refresh) {
      statedispatch({ type: 'refresh' });
    }
    statedispatch({ type: 'changeVisible', visible });
  };

  return (
    <PageHeaderWrapper title="部门管理员管理">
      <Card>
        <Row type="flex" justify="space-between" gutter={16}>
          <Col xs={24} sm={24} md={11}>
            <SelfCard bordered={false} title="部门名称" nopadding="true">
              <TreeOtherOpration
                onSelect={selectid => statedispatch({ type: 'selectId', id: selectid })}
                treeList={departments}
              />
            </SelfCard>
          </Col>
          <Col md={1} />
          <Col xs={24} sm={24} md={12}>
            <SelfCard
              bordered={false}
              title={
                state.trainmanager ? (
                  '对应部门管理员信息'
                ) : (
                  // "没有对应部门管理员信息"
                  <div style={{ color: '#ff0000' }}>没有对应部门管理员信息</div>
                  // <Alert showIcon={false} message="没有对应部门管理员信息" banner />
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
                        icon="user"
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
                      <Avatar size={128} icon="user" />
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
        addDataSource={users}
        visible={state.changeVisible}
        name="部门"
        id={state.selectId}
        subname="培训管理员"
        visiblecallback={modaladdcallback}
        listAction="UserManager/GetUsers" // "CourseManager/GetOthertrainmanagers"
        addAction="DepartmentManager/ChangerDeparmenTrainManager" // "CourseManager/SubmitAddedData"
        operationname="修改"
      />
    </PageHeaderWrapper>
  );
}
