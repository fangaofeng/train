import React from 'react';
import { Divider, Button } from 'antd';
import { Link } from 'umi';
import ManagerTable from '@/components/ManagerTable/index';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { examplanService } from '@/services';

export default () => {
  const columns = patch => [
    {
      title: '考试名称',
      dataIndex: 'name',
    },
    {
      title: '试卷名称',
      dataIndex: 'exam_name',
    },
    {
      title: '考试开始时间',
      dataIndex: 'start_time',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '考试结束时间',
      dataIndex: 'end_time',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        imitation: { status: 'imitation', text: '拟制中' },
        assigned: { status: 'assigned', text: '已指派' },
        learning: { status: 'learning', text: '考试中' },
        completed: { status: 'completed', text: '已完成' },
        archiving: { status: 'archiving', text: '已归档' },
      },
      // assigned: {status:'assigned',text: '已指派'},
      // examing:{status:'examing', text:'考试中'},
      // completed:{status:'completed',text: '已完成'},
      // overdue:{status:'overdue', text:'超期未完成'}}
    },
    {
      title: (
        <div>
          <span>完成比例</span>
          <br />
          <span>（完成人数/参加人数）</span>
        </div>
      ),
      align: 'center',
      dataIndex: 'ratio',
      hideInSearch: true,
    },
    {
      title: (
        <div>
          <span>合格比例</span>
          <br />
          <span>（合格人数/参加人数）</span>
        </div>
      ),
      align: 'center',
      dataIndex: 'pass_ration',
      hideInSearch: true,
      // render: (text, record) => <span>{record.pass_ration}</span>,
    },

    {
      title: '操作',
      valueType: 'option',
      key: 'options',
      hideInSearch: true,
      render: (text, record) => {
        let dom;
        if (record.status === '已完成') {
          dom = [
            <Link to={`/ExamPlan/ExamPlanManager/view/${record.id}`}>查看</Link>,
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
        } else if (record.status === '已指派' || record.status === '考试中') {
          dom = [
            <Link to={`/ExamPlan/ExamPlanManager/edit/${record.id}`}>编辑</Link>,
            <Divider type="vertical" />,
            <Link to={`/ExamPlan/ExamPlanManager/view/${record.id}`}>查看</Link>,
          ];
        }
        return dom;
      },
    },
  ];
  const props = {
    service: examplanService,
    columns,
  };

  return (
    <PageHeaderWrapper title="考试计划">
      <ManagerTable {...props} />
    </PageHeaderWrapper>
  );
};
