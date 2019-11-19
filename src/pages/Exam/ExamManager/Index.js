import React from 'react';
import { Divider, Button } from 'antd';
import router from 'umi/router';
import Link from 'umi/link';
import ManagerTable from '@/components/ManagerTable/index';

export default () => {
  const datalist = state => state.ExamManager.allTestPapers;
  const extrabutton = (
    <div className="">
      <Button type="primary" onClick={() => router.push('/exam/uploadZip/uploadZip1')}>
        上传试卷
      </Button>
    </div>
  );
  const columns = statedispatch => [
    {
      title: '试卷编号',
      dataIndex: 'test_manager_KJBH',
      key: 'test_manager_KJBH',
      render: (text, record) => <span>{record.exame_no}</span>,
    },
    {
      title: '试卷名称',
      dataIndex: 'test_manager_KJMC',
      key: 'test_manager_KJMC',
      render: (text, record) => <span>{record.name}</span>,
    },
    {
      title: '适用对象',
      dataIndex: 'test_manager_SYDX',
      key: 'test_manager_SYDX',
      render: (text, record) => <span>{record.applicable_user}</span>,
    },
    {
      title: '考试时长',
      dataIndex: 'test_manager_KSSC',
      key: 'test_manager_KSSC',
      render: (text, record) => (
        <span>
          {record.duration}
          分钟
        </span>
      ),
    },
    {
      title: '状态',
      dataIndex: 'test_manager_status',
      key: 'test_manager_status',
      render: (text, record) => <span>{record.status}</span>,
    },
    {
      title: '创建人',
      dataIndex: 'test_manager_creater',
      key: 'test_manager_creater',
      render: (text, record) => <span>{record.creater}</span>,
    },
    {
      title: '操作',
      dataIndex: 'test_manager_opt',
      key: 'test_manager_opt',
      render: (text, record) => {
        let dom;
        if (record.status === '拟制中') {
          dom = (
            <span>
              <Link to={`/exam/examManager/edit/${record.id}?currentType=${record.status}`}>
                编辑
              </Link>
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
              <Link to={`/exam/examManager/edit/${record.id}?currentType=${record.status}`}>
                编辑
              </Link>
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
              <Link to={`/exam/examManager/edit/${record.id}?currentType=${record.status}`}>
                编辑
              </Link>
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
        } else if (record.status === '已归档') {
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
    listAction: 'ExamManager/GetAllTestPapersTableData',
    name: '试卷',
    datalist,
    columns,
    extrabutton,
    changestatusAction: 'ExamManager/ChangeStatue',
    delAction: 'ExamManager/DelTestPaper',
  };

  return ManagerTable(props);
};
