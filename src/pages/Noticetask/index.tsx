import React from 'react';
import { Button } from 'antd';
import { history, Link } from 'umi';
import ManagerTable from '@/components/ManagerTable';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { noticetaskService } from '@/services';

export default () => {
  const extrabutton = [
    <Button type="primary" onClick={() => history.push('/noticetask/createoredit')}>
      创建通知
    </Button>,
  ];

  const columns = () => [
    {
      title: '序号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '原因',
      dataIndex: 'reason',
    },

    {
      title: '状态',
      dataIndex: 'status',
    },
    // {
    //   title: '发送者',
    //   dataIndex: 'actor',
    //   render: (text, record) => <span>{record.actor.name}</span>,
    // },
    {
      title: '标题',
      dataIndex: 'verb',
    },
    {
      title: 'description',
      dataIndex: 'description',
    },
    {
      title: 'level',
      dataIndex: 'level',
    },
    {
      title: '创建时间',
      dataIndex: 'created',
      hideInSearch: true,
      valueType: 'dateTime',
    },
    {
      title: '操作',
      key: 'opteration',
      render: (text, record) => {
        let dom;
        if (record.status === '草稿') {
          dom = [<Link to={`/noticetask/edit/${record.id}`}>编辑</Link>];
        } else {
          dom = [<Link to={`/noticetask/view/${record.id}`}>查看</Link>];
        }
        return dom;
      },
    },
  ];

  const props = {
    service: noticetaskService,
    columns,
    extrabutton,
  };

  return (
    <PageHeaderWrapper title="通知任务查看">
      <ManagerTable {...props} />
    </PageHeaderWrapper>
  );
};
