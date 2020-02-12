import React from 'react';
import { Divider, Button } from 'antd';
import router from 'umi/router';
import Link from 'umi/link';
import ManagerTable from '@/components/ManagerTable/index';

export default () => {
  const datalist = state => state.Noticetask.noticetask;
  const extrabutton = (
    <div className="">
      <Button type="primary" onClick={() => router.push('/notification/createoredit')}>
        创建通知
      </Button>
    </div>
  );
  const columns = statedispatch => [
    {
      title: '序号',
      dataIndex: 'id',
      render: (text, record) => <span>{record.id}</span>,
    },
    {
      title: '原因',
      dataIndex: 'reason',

      render: (text, record) => <span>{record.reason}</span>,
    },

    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => <span>{record.status}</span>,
    },
    {
      title: '发送者',
      dataIndex: 'actor',
      render: (text, record) => <span>{record.actor.name}</span>,
    },
    {
      title: '标题',
      dataIndex: 'verb',
      render: (text, record) => <span>{record.verb}</span>,
    },
    {
      title: 'description',
      dataIndex: 'description',
      render: (text, record) => <span>{record.description}</span>,
    },
    {
      title: 'level',
      dataIndex: 'level',
      render: (text, record) => <span>{record.level}</span>,
    },
    {
      title: '创建时间',
      dataIndex: 'created',
      render: (text, record) => <span>{record.created}</span>,
    },
    {
      title: '操作',
      dataIndex: 'opt',
      render: (text, record) => {
        let dom;
        if (record.status === '拟制中') {
          dom = (
            <span>
              <Link to={`/notification/edit/${record.id}?currentType=${record.status}`}>编辑</Link>
              <Divider type="vertical" />
              <a
                onClick={() =>
                  statedispatch({ type: 'deldataVisible', visible: true, id: record.id })
                }
              >
                删除
              </a>
            </span>
          );
        } else {
          dom = (
            <span>
              <Link to={`/notification/view/${record.id}?currentType=${record.status}`}>查看</Link>
              <Divider type="vertical" />
              <a
                onClick={() =>
                  statedispatch({ type: 'offShelfVisible', visible: true, id: record.id })
                }
              >
                删除
              </a>
            </span>
          );
        }
        return dom;
      },
    },
  ];

  const props = {
    listAction: 'Noticetask/GetNoticetaskes',
    name: '通知任务',
    datalist,
    columns,
    extrabutton,
    changestatusAction: 'Noticetask/ChangeNoticetask',
    delAction: 'Noticetask/DelNoticetask',
  };

  return ManagerTable(props);
};
