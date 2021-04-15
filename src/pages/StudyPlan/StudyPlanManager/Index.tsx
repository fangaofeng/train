import React from 'react';
import { Divider, Button } from 'antd';
import { Link } from 'umi';
import ManagerTable from '@/components/ManagerTable/index';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { learnplanService } from '@/services';

export default () => {
  const columns = patch => [
    {
      title: '计划名称',
      dataIndex: 'name',
      // render: (text, record) => <span>{record.name}</span>,
    },
    {
      title: '课件名称',
      dataIndex: ['course', 'name'],
      // render: (text, record) => <span>{record.course.name}</span>,
    },
    {
      title: '学习开始时间',
      dataIndex: 'start_time',
      hideInSearch: true,
      // render: (text, record) => <span>{record.start_time}</span>,
    },
    {
      title: '学习结束时间',
      dataIndex: 'end_time',
      hideInSearch: true,
      valueType: 'DataTime',
      // render: (text, record) => <span>{record.end_time}</span>,
    },
    {
      title: '计划状态',
      dataIndex: 'status',

      render: (text, record) => <span>{record.status}</span>,
    },
    {
      title: (
        <div>
          <span>完成比</span>
          <br />
          <span>（完成人数/参加人数）</span>
        </div>
      ),
      align: 'center',
      dataIndex: 'ratio',
      render: (text, record) => <span>{record.ratio}</span>,
    },
    {
      title: (
        <div>
          <span>课堂提问</span>
          <br />
          <span>（答复/提问）</span>
        </div>
      ),
      align: 'center',
      dataIndex: 'questionanswer',
      render: (text, record) => <span>{record.questionanswer}</span>,
    },

    {
      title: '操作',
      key: 'operations',
      render: (text, record) => {
        let dom;
        if (record.status === '已完成') {
          dom = [
            <Link to={`/studyPlan/studyPlanManager/view/${record.id}`}>查看</Link>,
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
            <Button className="ant-btn-link" type="link" disabled>
              归档后禁止操作
            </Button>,
          ];
        } else if (record.status === '已指派' || record.status === '学习中') {
          dom = [
            <Link to={`/studyPlan/studyPlanManager/edit/${record.id}`}>编辑</Link>,
            <Divider type="vertical" />,
            <Link to={`/studyPlan/studyPlanManager/view/${record.id}`}>查看</Link>,
          ];
        }
        return dom;
      },
    },
  ];
  const props = {
    sercie: learnplanService,
    columns,
  };

  return (
    <PageHeaderWrapper title="学习计划">
      <ManagerTable {...props} />
    </PageHeaderWrapper>
  );
};
