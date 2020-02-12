import React from 'react';
import { Divider, Button } from 'antd';
import router from 'umi/router';
import Link from 'umi/link';
import ManagerTable from '@/components/ManagerTable/index';

export default () => {
  const datalist = state => state.Questionnaire.quizes;
  const extrabutton = (
    <div className="">
      <Button type="primary" onClick={() => router.push('/questionnaire/create')}>
        创建问卷
      </Button>
    </div>
  );
  const columns = statedispatch => [
    {
      title: '问卷编号',
      dataIndex: 'id',
      render: (text, record) => <span>{record.id}</span>,
    },
    {
      title: '问卷名称',
      dataIndex: 'name',

      render: (text, record) => <span>{record.name}</span>,
    },

    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => <span>{record.status}</span>,
    },
    {
      title: '创建人',
      dataIndex: 'creater',
      render: (text, record) => <span>{record.creater}</span>,
    },
    {
      title: '操作',
      dataIndex: 'opt',
      render: (text, record) => {
        let dom;
        if (record.status === '拟制中') {
          dom = (
            <span>
              <Link to={`/questionnaire/edit/${record.id}?currentType=${record.status}`}>编辑</Link>
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
        } else if (record.status === '已上架') {
          dom = (
            <span>
              <Link to={`/questionnaire/edit/${record.id}?currentType=${record.status}`}>编辑</Link>
              <Divider type="vertical" />
              <a
                onClick={() =>
                  statedispatch({ type: 'offShelfVisible', visible: true, id: record.id })
                }
              >
                下架
              </a>
            </span>
          );
        } else if (record.status === '已下架') {
          dom = (
            <span>
              <Link to={`/questionnaire/edit/${record.id}?currentType=${record.status}`}>编辑</Link>
              <Divider type="vertical" />
              <a
                onClick={() =>
                  statedispatch({ type: 'fileOnArchivevisible', visible: true, id: record.id })
                }
              >
                归档
              </a>
            </span>
          );
        } else {
          dom = (
            <span>
              <a disabled>归档后禁止操作</a>
            </span>
          );
        }
        return dom;
      },
    },
  ];

  const props = {
    listAction: 'Questionnaire/GetQuizes',
    name: '问卷',
    datalist,
    columns,
    extrabutton,
    changestatusAction: 'Questionnaire/ChangeQuiz',
    delAction: 'Questionnaire/DelQuiz',
  };

  return ManagerTable(props);
};
