import React from 'react';
import { Divider, Avatar } from 'antd';
import ManagerTable from '@/components/ManagerTable';
import { Link } from 'umi';

export default () => {
  const datalist = state => state.Announcement.articleList;

  const columns = statedispatch => [
    {
      title: '文章编号',
      dataIndex: 'Article_KJBH',
      key: 'Article_KJBH',
      render: (text, record) => <span>{record.id}</span>,
    },
    {
      title: '封面',
      dataIndex: 'Article_Cover',
      key: 'Article_Cover',
      width: 50,
      render: (text, record) => (
        <Avatar shape="square" src={record.thumbnail} size={40} icon="user" />
      ),
    },

    {
      title: '文章名称',
      dataIndex: 'Article_KJMC',
      key: 'Article_KJMC',
      render: (text, record) => <span>{record.title}</span>,
    },
    {
      title: '状态',
      dataIndex: 'Article_status',
      key: 'Article_status',
      render: (text, record) => <span>{record.status}</span>,
    },
    {
      title: '发布时间',
      dataIndex: 'Article_pubtime',
      key: 'Article_creater',
      render: (text, record) => <span>{record.pub_time}</span>,
    },
    {
      title: '操作',
      dataIndex: 'Article_opt',
      key: 'Article_opt',
      render: (text, record) => {
        let dom;
        if (record.status === '草稿') {
          dom = (
            <span>
              <Link to={`/announcement/edit/${record.id}`}>编辑</Link>
              <Divider type="vertical" />
              <a
                type="link"
                onClick={() =>
                  statedispatch({ type: 'deldataVisible', visible: true, id: record.id })
                }
              >
                删除
              </a>
              <Divider type="vertical" />
              <Link to={`/announcement/detail/${record.id}`}>预览</Link>
            </span>
          );
        } else if (record.status === '发表') {
          dom = (
            <span>
              <Link to={`/announcement/edit/${record.id}`}>编辑</Link>
              <Divider type="vertical" />
              <a
                onClick={() =>
                  statedispatch({ type: 'fileOnArchivevisible', visible: true, id: record.id })
                }
              >
                归档
              </a>
              <Divider type="vertical" />
              <Link to={`/announcement/detail/${record.id}`}>预览</Link>
            </span>
          );
        } else if (record.status === '归档') {
          dom = (
            <span>
              <a
                onClick={() =>
                  statedispatch({ type: 'deldataVisible', visible: true, id: record.id })
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
    listAction: 'Announcement/GetArticleLists',
    name: '公告',
    datalist,
    columns,
    changestatusAction: 'Announcement/ChangeArticleStatus',
    delAction: 'Announcement/DelArticle',
  };

  return ManagerTable(props);
};
