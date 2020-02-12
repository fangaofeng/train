import React from 'react';
import PageTable from '@/components/PageTable';
import { useSelector, useDispatch } from 'dva';

export default props => {
  const { onSelectKeys } = props;
  const listdata = useSelector(state => state.UserManager.Users);
  const loading = useSelector(state => state.loading.effects['UserManager/GetUsers']);
  const storedispatch = useDispatch();
  const columns = [
    {
      title: '员工编号',
      dataIndex: 'user_manager_number',
      key: 'user_manager_number',
      render: (text, record) => <span>{record.user_no}</span>,
    },
    {
      title: '姓名',
      dataIndex: 'user_manager_name',
      key: 'user_manager_name',
      render: (text, record) => <span>{record.name}</span>,
    },
    {
      title: '归属部门',
      dataIndex: 'user_manager_belong',
      key: 'user_manager_belong',
      render: (text, record) => <span>{record.department_name}</span>,
    },
    {
      title: '职务',
      dataIndex: 'user_manager_job',
      key: 'user_manager_job',
      render: (text, record) => <span>{record.employee_position}</span>,
    },
    {
      title: '用户类别',
      dataIndex: 'user_manager_type',
      key: 'user_manager_type',
      render: (text, record) => <span>{record.role_display}</span>,
    },
  ];

  return (
    <PageTable
      dispatch={storedispatch}
      onSelectRow={onSelectKeys}
      data={listdata}
      columns={columns}
      loading={loading}
      action="UserManager/GetUsers"
    />
  );
};
