import React, { useState } from 'react';
import { Card, Button, Divider, Popconfirm, message, Input } from 'antd';
import { history, Link } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from '@/components/styles.less';
import ManagerTable from '@/components/ManagerTable';
import DepartmentSelect from '../DepartmentManager/ViewSelect';
import { userService } from '@/services';
function UserManager() {
  const goPage = () => {
    history.push('/UserManager/upload');
  };

  const columns = [
    {
      title: '编号',
      dataIndex: 'user_no',
      hideInSearch: true,
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '部门',
      hideInSearch: true,
      dataIndex: 'department_name',
    },
    {
      title: '部门',
      dataIndex: 'department',
      hideInTable: true,
      renderFormItem: item => <DepartmentSelect style={{ width: '100%' }} />,
      // formItemProps: { value: 21 },
      // defaultValue: preparams?.department.id,
    },
    {
      title: '职务',
      dataIndex: 'employee_position',
    },
    {
      title: '角色',
      dataIndex: 'role_display',
      // render: (text, record) => <span>{record.role_display}</span>,
    },
  ];

  const ColumnsExtent = (pathc, destroy) => [
    ...columns,
    {
      title: '操作',
      dataIndex: 'user_manager_opt',
      hideInSearch: true,
      render: (text, record) => [
        <Link key="编辑" to={`/usermanager/edit/${record.id}`}>
          编辑
        </Link>,
        <Divider key="1" type="vertical" />,
        <Popconfirm
          key="确认删除此用户吗？"
          placement="topRight"
          title="确认删除此用户吗？"
          onConfirm={() => {
            destroy.run(record.id);
          }}
          okText="确定"
          cancelText="取消"
        >
          <Button
            className={'ant-btn-link'}
            type="link"
            loading={destroy.fetches[record.id]?.loading}
          >
            删除{' '}
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageHeaderWrapper title="用户管理">
      <Card className={styles.managerContent}>
        <ManagerTable
          columns={ColumnsExtent}
          service={userService}
          extrabutton={[
            <Button type="primary" onClick={goPage}>
              导入用户
            </Button>,
          ]}
          rowKey="id"
          newaction={() => history.push('/userManager/create')}
          dateFormatter="string"
        />
      </Card>
    </PageHeaderWrapper>
  );
}

export default UserManager;
