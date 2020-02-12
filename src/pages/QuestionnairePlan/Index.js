import React from 'react';
import { Divider } from 'antd';

import Link from 'umi/link';
import ManagerTable from '@/components/ManagerTable/index';

export default () => {
  const datalist = state => state.ExamPlanManager.examPlans;
  const columns = statedispatch => [
    {
      title: '调查问卷名称',
      dataIndex: 'name',

      render: (text, record) => <span>{record.name}</span>,
    },
    {
      title: '试卷名称',
      dataIndex: 'quiz_name',

      render: (text, record) => <span>{record.exam_name}</span>,
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',

      render: (text, record) => <span>{record.start_time}</span>,
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',

      render: (text, record) => <span>{record.end_time}</span>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text, record) => <span>{record.status}</span>,
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
      render: (text, record) => <span>{record.ratio}</span>,
    },
    {
      title: '操作',
      dataIndex: 'opt',
      render: (text, record) => {
        let dom;
        if (record.status === '已完成') {
          dom = (
            <span>
              <Link to={`/questionnaire/plan/view/${record.id}`}>查看</Link>
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
        } else {
          dom = (
            <span>
              <Link to={`/questionnaire/plan/edit/${record.id}`}>编辑</Link>
              <Divider type="vertical" />
              <Link to={`/questionnaire/plan/view/${record.id}`}>查看</Link>
            </span>
          );
        }
        return dom;
      },
    },
  ];
  const props = {
    listAction: 'QuestionnairePlan/GetPlanes',
    name: '调查计划',
    datalist,
    columns,
    changestatusAction: 'QuestionnairePlan/ChangeStatus',
    // delAction: 'StudyPlanManager/DelCourse',
  };

  return ManagerTable(props);
};
