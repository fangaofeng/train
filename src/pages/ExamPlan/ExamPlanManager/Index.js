import React from 'react';
import { Divider } from 'antd';

import { Link } from 'umi';
import ManagerTable from '@/components/ManagerTable/index';

export default () => {
  const datalist = state => state.ExamPlanManager.examPlans;
  const columns = statedispatch => [
    {
      title: '考试名称',
      dataIndex: 'ExamPlanManager_planName',
      key: 'ExamPlanManager_planName',
      render: (text, record) => <span>{record.name}</span>,
    },
    {
      title: '试卷名称',
      dataIndex: 'ExamPlanManager_examName',
      key: 'ExamPlanManager_examName',
      render: (text, record) => <span>{record.exam_name}</span>,
    },
    {
      title: '考试开始时间',
      dataIndex: 'ExamPlanManager_startTime',
      key: 'ExamPlanManager_startTime',
      render: (text, record) => <span>{record.start_time}</span>,
    },
    {
      title: '考试结束时间',
      dataIndex: 'ExamPlanManager_endTime',
      key: 'ExamPlanManager_endTime',
      render: (text, record) => <span>{record.end_time}</span>,
    },
    {
      title: '状态',
      dataIndex: 'ExamPlanManager_planStatus',
      key: 'ExamPlanManager_planStatus',
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
      dataIndex: 'ExamPlanManager_finishedNum',
      key: 'ExamPlanManager_finishedNum',
      render: (text, record) => <span>{record.ratio}</span>,
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
      dataIndex: 'ExamPlanManager_passratio',
      key: 'ExamPlanManager_passratio',
      render: (text, record) => <span>{record.pass_ration}</span>,
    },

    {
      title: '操作',
      dataIndex: 'ExamPlanManager_opt',
      key: 'ExamPlanManager_opt',
      render: (text, record) => {
        let dom;
        if (record.status === '已完成') {
          dom = (
            <span>
              <Link to={`/ExamPlan/ExamPlanManager/view/${record.id}`}>查看</Link>
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
        } else if (record.status === '已指派' || record.status === '考试中') {
          dom = (
            <span>
              <Link to={`/ExamPlan/ExamPlanManager/edit/${record.id}`}>编辑</Link>
              <Divider type="vertical" />
              <Link to={`/ExamPlan/ExamPlanManager/view/${record.id}`}>查看</Link>
            </span>
          );
        }
        return dom;
      },
    },
  ];
  const props = {
    listAction: 'ExamPlanManager/GetExamPlanList',
    name: '考试计划',
    datalist,
    columns,
    changestatusAction: 'ExamPlanManager/ChangeStatus',
    // delAction: 'StudyPlanManager/DelCourse',
  };

  return ManagerTable(props);
};
