import React from 'react';
import { Button, Divider, Avatar, Popconfirm } from 'antd';
import { history, Link, useHistory } from 'umi';
import { coursewareService } from '@/services';
import ManagerTable from '@/components/ManagerTable/index';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ProColumns } from '@ant-design/pro-table';

import { UserOutlined } from '@ant-design/icons';

export default () => {
  const extrabutton = [
    <Button type="primary" onClick={() => history.push('/courseware/uploadZip/uploadZip1')}>
      上传课件
    </Button>,
  ];
  const columns = (destroy, patch) => [
    {
      title: '课件编号',
      dataIndex: 'courseware_no',
      hideInSearch: true,
      // render: (text, record) => <span>{record.courseware_no}</span>,
    },
    {
      title: '课件名称',
      dataIndex: 'name',

      // render: (text, record) => <span>{record.name}</span>,
    },
    {
      title: '课件分类',
      dataIndex: 'category',
      // render: (text, record) => <span>{record.category}</span>,
    },
    {
      title: '课件类型',
      dataIndex: 'course_manager_KJLX',

      render: (text, record) => <span>{record.file_type}</span>,
    },
    {
      title: '课时',
      dataIndex: 'course_manager_KS',

      render: (text, record) => <span>{Number(record.class_hour)}</span>,
    },
    {
      title: '讲师',
      dataIndex: 'teachername',

      // render: (text, record) => <span>{record.teachername}</span>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      // render: (text, record) => <span>{record.status}</span>,
    },
    {
      title: '创建人',
      dataIndex: 'creater',
      hideInSearch: true,
      // render: (text, record) => <span>{record.creater}</span>,
    },
    {
      title: '操作',
      key: 'options',

      render: (text, record) => {
        let dom;
        if (record.status === '拟制中') {
          dom = [
            <Link
              key="1rrr"
              to={`/courseware/coursewareManager/edit/${record.id}?currentType=${record.status}`}
            >
              编辑
            </Link>,
            <Divider type="vertical" key="2rrr" />,
            <Popconfirm
              key="3rrr"
              placement="topRight"
              title="确认删除此课程吗？"
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
            <Link
              to={`/courseware/coursewareManager/edit/${record.id}?currentType=${record.status}`}
            >
              编辑
            </Link>,
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
            <Link
              to={`/courseware/coursewareManager/edit/${record.id}?currentType=${record.status}`}
            >
              编辑
            </Link>,
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
        service={coursewareService}
        rowKey="id"
        // newaction={() => history.push('/announcement/create')}
        dateFormatter="string"
        extrabutton={extrabutton}
      />
    </PageHeaderWrapper>
  );
};
