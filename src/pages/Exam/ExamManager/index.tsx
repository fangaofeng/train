import React from 'react';
import { Button, Divider, Popconfirm } from 'antd';
import { history, Link } from 'umi';
import { paperService } from '@/services';
import ManagerTable from '@/components/ManagerTable/index';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ProColumns } from '@ant-design/pro-table';
import { UserOutlined } from '@ant-design/icons';

export default () => {
  const extrabutton = [
    <Button type="primary" onClick={() => history.push('/paper/uploadZip/uploadZip1')}>
      上传试卷
    </Button>,
    <Button type="primary" onClick={() => history.push('/paper/create')}>
      创建试卷
    </Button>,
  ];

  const columns = (destroy, patch) => [
    {
      title: '试卷编号',
      dataIndex: 'exame_no',
      hideInSearch: true,
      render: (text, record) => <span>{record.exame_no}</span>,
    },
    {
      title: '试卷名称',
      dataIndex: 'name',
      render: (text, record) => <span>{record.name}</span>,
    },
    {
      title: '适用对象',
      dataIndex: 'applicable_user',
      render: (text, record) => <span>{record.applicable_user}</span>,
    },
    {
      title: '考试时长(分钟)',
      dataIndex: 'duration',
      valueType: 'digit',
      // render: (text, record) => (
      //   <span>
      //     {record.duration}
      //     分钟
      //   </span>
      // ),
    },
    {
      title: '状态',
      dataIndex: 'status',

      valueEnum: {
        all: { text: '全部', status: 'Default' },
        close: { text: '拟制中', status: '拟制中' },
        running: { text: '已上架', status: '已上架' },
        online: { text: '已上架', status: '已上架' },
        error: { text: '已归档', status: '已归档' },
      },
    },
    {
      title: '创建人',
      dataIndex: 'creater',
      hideInSearch: true,
    },
    {
      title: '操作',
      hideInSearch: true,
      key: 'options',
      render: (text, record) => {
        let dom;
        if (record.status === '拟制中') {
          dom = [
            <Link to={`/paper/edit/${record.id}?currentType=${record.status}`}>编辑</Link>,
            <Divider type="vertical" />,
            <Popconfirm
              placement="topRight"
              title="确认删除此考卷吗？"
              onConfirm={() => {
                destroy.run(record.id);
              }}
              okText="确定"
              cancelText="取消"
            >
              <Button
                className="ant-btn-link"
                type="link"
                loading={destroy.fetches[record.id]?.loading}
              >
                删除{' '}
              </Button>
            </Popconfirm>,
          ];
        } else if (record.status === '已上架') {
          dom = [
            <Link to={`/paper/edit/${record.id}?currentType=${record.status}`}>编辑</Link>,
            <Divider type="vertical" />,
            <Button
              className="ant-btn-link"
              type="link"
              loading={patch.fetches[record.id]?.loading}
              onClick={() => {
                patch.run(record.id, { status: '已下架' });
              }}
            >
              下架
            </Button>,
          ];
        } else if (record.status === '已下架') {
          dom = [
            <Link to={`/paper/edit/${record.id}?currentType=${record.status}`}>编辑</Link>,
            <Divider type="vertical" />,
            <Button
              className="ant-btn-link"
              type="link"
              loading={patch.fetches[record.id]?.loading}
              onClick={() => {
                patch.run(record.id, { status: '已归档' });
              }}
            >
              归档
            </Button>,
          ];
        } else if (record.status === '已归档') {
          dom = [
            <Button type="link" disabled>
              归档后禁止操作
            </Button>,
          ];
        }
        return dom;
      },
    },
  ];
  return (
    <PageHeaderWrapper>
      <ManagerTable
        columns={columns}
        service={paperService}
        rowKey="id"
        // newaction={() => history.push('/announcement/create')}
        dateFormatter="string"
        extrabutton={extrabutton}
      />
    </PageHeaderWrapper>
  );
};
