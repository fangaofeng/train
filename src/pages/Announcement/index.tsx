import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button, Divider, Avatar, Popconfirm } from 'antd';
import { ProColumns } from '@ant-design/pro-table';
import service from '@/services/announcement';
import { Link, history } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ManagerTable from '@/components/ManagerTable';

interface ArticleItem {
  id: string;
  status: string;
  arttype: string;
  comment_status: string;
  thumbnail: string;
  created: string;
  modified: string;
  title: string;
  body: string;
  description: string;
  pub_time: string;
  views: number;
  article_order: number;
  cover: string;
  category: string;
}

export default () => {
  const columns = (destroy, patch): ProColumns<ArticleItem>[] => [
    {
      title: '封面',
      dataIndex: 'thumbnail',
      hideInSearch: true,
      width: 80,
      render: (text, record) => (
        <Avatar shape="square" src={record.thumbnail} size={40} icon={<UserOutlined />} />
      ),
    },
    {
      title: '编号',
      dataIndex: 'id',
      valueType: 'index',
      width: 80,
    },

    {
      title: '名称',
      dataIndex: 'title',
      copyable: true,
      ellipsis: true,
    },

    {
      title: '状态',
      dataIndex: 'status',
      initialValue: 'all',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        d: {
          text: '草稿',
          status: 'Default',
        },
        p: {
          text: '发布',
          status: 'Default',
        },
      },
    },
    {
      title: '发布时间',
      dataIndex: 'pub_time',
      valueType: 'dateTime',
    },

    {
      title: '操作',
      key: 'options',
      hideInSearch: true,
      render: (text, record) => {
        let dom;
        if (record.status === '草稿') {
          dom = [
            <Link key="编辑" to={`/announcement/edit/${record.id}`}>
              编辑
            </Link>,
            <Divider key="1" type="vertical" />,
            <Popconfirm
              key="确认删除此文章吗？"
              placement="topRight"
              title="确认删除此文章吗？"
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
            <Divider key="2" type="vertical" />,
            <Button
              className="ant-btn-link"
              type="link"
              loading={patch.fetches[record.id]?.loading}
              onClick={() => {
                patch.run(record.id, { status: '发布' });
              }}
            >
              发布
            </Button>,
            <Link key="预览" to={`/announcement/detail/${record.id}`}>
              预览
            </Link>,
          ];
        } else if (record.status === '发布') {
          dom = [
            <Link to={`/announcement/edit/${record.id}`}>编辑</Link>,
            <Divider type="vertical" />,
            <Button
              className="ant-btn-link"
              type="link"
              loading={patch.fetches[record.id]?.loading}
              onClick={() => {
                patch.run(record.id, { status: '归档' });
              }}
            >
              归档
            </Button>,

            <Divider type="vertical" />,
            <Link to={`/announcement/detail/${record.id}`}>预览</Link>,
          ];
        } else if (record.status === '归档') {
          dom = [
            <Popconfirm
              placement="topRight"
              title="确认删除此文章吗？"
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
                删除
              </Button>
            </Popconfirm>,
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
        service={service}
        rowKey="id"
        newaction={() => history.push('/announcement/create')}
        dateFormatter="string"
      />
    </PageHeaderWrapper>
  );
};
