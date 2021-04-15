import React from 'react';
import { Popconfirm, Button } from 'antd';

import EditContent from '@/components/EditContent';

export default props => {
  const {
    location: {
      query: { currentType },
    },
    match: {
      params: { id },
    },
  } = props;
  const data = state => ({
    listdata: state.trainGroupManager.trainGroupMembers,
    addlistdata: state.trainGroupManager.AddMember,
  });

  const columns = (deleteConfirm, delloading) => [
    {
      title: '员工编号',
      dataIndex: 'user_no',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '归属部门',
      dataIndex: 'user_department',
      key: 'user_department',
      render: (text, record) => <span>{record.department_name}</span>,
    },
    {
      title: '操作',
      dataIndex: 'train_group_opt',
      key: 'train_group_opt',
      render: (text, record) => (
        <span>
          <Popconfirm
            placement="topRight"
            title="确认删除该条数据？"
            onConfirm={() => deleteConfirm(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <a>
              <Button loading={delloading}>删除</Button>
            </a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const params = {
    listAction: 'trainGroupManager/GetTrainGroupMembers',
    name: '培训群组',
    subname: '成员',
    columns,
    delAction: 'trainGroupManager/delTgMembers',
    addAction: 'trainGroupManager/addTgMember',
    sublistAction: 'trainGroupManager/getTgOutUsers',
    id,
    currentType,
    data,
    returnUrl: '/group/index',
  };

  return EditContent(params);
};
