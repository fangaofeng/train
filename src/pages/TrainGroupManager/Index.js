import React from 'react';
import listEditContent from '@/components/EditContent/list';
import Link from 'umi/link';
import { Divider, Popconfirm, Button } from 'antd';

export default () => {
  const listdata = state => state.trainGroupManager.trainGroups;
  const columns = (deleteConfirm, delloading) => [
    {
      title: '培训群组编号',
      dataIndex: 'train_group_number',
      key: 'train_group_number',
      render: (text, record) => <span>{record.group_no}</span>,
    },
    {
      title: '培训群组名称',
      dataIndex: 'train_group_name',
      key: 'train_group_name',
      render: (text, record) => <span>{record.name}</span>,
    },
    {
      title: '群组成员',
      dataIndex: 'train_group_member',
      key: 'train_group_member',
      render: (text, record) => (
        <span>
          {/* {record.trainers.length} */}
          {record.count}
        </span>
      ),
    },
    {
      title: '操作',
      dataIndex: 'train_group_opt',
      key: 'train_group_opt',
      render: (text, record) => (
        <span>
          <Link
            to={`/trainGroupManager/viewTrainGroup/${record.id}?name=${record.name}&num=${record.group_no}`}
          >
            查看
          </Link>
          <Divider type="vertical" />
          <Link
            to={`/trainGroupManager/editTrainGroup/${record.id}?name=${record.name}&num=${record.group_no}`}
          >
            编辑
          </Link>
          <Divider type="vertical" />
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
    listAction: 'trainGroupManager/GetTrainGroups',
    name: '培训群组',
    listdata,
    columns,
    delAction: 'trainGroupManager/DelTraingroups',
    addUrl: '/trainGroupManager/addTrainGroup',
  };

  return listEditContent(params);
};
