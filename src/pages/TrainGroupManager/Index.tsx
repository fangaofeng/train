import React from 'react';
import { Link, history } from 'umi';
import { Divider, Popconfirm, Button } from 'antd';
import ManagerTable from '@/components/ManagerTable/index';
import { groupsService } from '@/services';

export default () => {
  const columns = (patch, destroy) => [
    {
      title: '培训群组编号',
      dataIndex: 'group_no',
      hideInSearch: true,
    },
    {
      title: '培训群组名称',
      dataIndex: 'name',
    },
    {
      title: '群组成员',
      dataIndex: 'count',
      hideInSearch: true,
      render: (text, record) => <span>{record.count}</span>,
    },
    {
      title: '操作',
      key: 'operations',
      render: (text, record) => [
        <Link to={`/group/view/${record.id}?name=${record.name}&num=${record.group_no}`}>
          查看
        </Link>,
        <Divider key="1" type="vertical" />,
        <Link to={`/group/editTrainGroup/${record.id}?name=${record.name}&num=${record.group_no}`}>
          编辑
        </Link>,
        <Divider key="2" type="vertical" />,
        <Popconfirm
          key="确认删除此群组吗？"
          placement="topRight"
          title="确认删除此群组吗？"
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
    <ManagerTable
      columns={columns}
      service={groupsService}
      rowKey="id"
      newaction={() => history.push('/group/addTrainGroup')}
    />
  );
};
