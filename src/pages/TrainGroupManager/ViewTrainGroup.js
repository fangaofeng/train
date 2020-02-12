import React from 'react';
import { Descriptions } from 'antd';

import { ViewTable } from '@/components/ViewPage';

export default props => {
  const datalist = state => state.trainGroupManager.trainGroupMembers;

  const columns = [
    {
      title: '员工编号',
      dataIndex: 'user_number',
      key: 'user_number',
      render: (text, record) => <span>{record.user_no}</span>,
    },
    {
      title: '姓名',
      dataIndex: 'user_name',
      key: 'user_name',
      render: (text, record) => <span>{record.name}</span>,
    },
    {
      title: '归属部门',
      dataIndex: 'user_department',
      key: 'user_department',
      render: (text, record) => <span>{record.department_name}</span>,
    },
  ];

  const {
    match: {
      params: { id },
    },
    location: {
      query: { num, name },
    },
  } = props;

  const info = (
    <Descriptions>
      <Descriptions.Item label="名称">{name}</Descriptions.Item>
      <Descriptions.Item label="编号">{num}</Descriptions.Item>
    </Descriptions>
  );

  const params = {
    action: 'trainGroupManager/GetTrainGroupMembers',
    id,
    name: '培训群组',
    datalist,
    columns,
    info,
    returnUrl: '/trainGroupManager/index',
  };
  return ViewTable(params);
};
