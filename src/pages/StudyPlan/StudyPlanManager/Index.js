import React from 'react';
import { Divider } from 'antd';

import { Link } from 'umi';
import ManagerTable from '@/components/ManagerTable/index';

export default () => {
  const datalist = state => state.StudyPlanManager.studyPlans;
  const columns = statedispatch => [
    {
      title: '计划名称',
      dataIndex: 'studyPlanManager_planName',
      key: 'studyPlanManager_planName',
      render: (text, record) => <span>{record.name}</span>,
    },
    {
      title: '课件名称',
      dataIndex: 'studyPlanManager_courseName',
      key: 'studyPlanManager_courseName',
      render: (text, record) => <span>{record.course.name}</span>,
    },
    {
      title: '学习开始时间',
      dataIndex: 'studyPlanManager_startTime',
      key: 'studyPlanManager_startTime',
      render: (text, record) => <span>{record.start_time}</span>,
    },
    {
      title: '学习结束时间',
      dataIndex: 'studyPlanManager_endTime',
      key: 'studyPlanManager_endTime',
      render: (text, record) => <span>{record.end_time}</span>,
    },
    {
      title: '计划状态',
      dataIndex: 'studyPlanManager_planStatus',
      key: 'studyPlanManager_planStatus',
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
      dataIndex: 'studyPlanManager_finishedNum',
      key: 'studyPlanManager_finishedNum',
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
      dataIndex: 'studyPlanManager_question',
      key: 'studyPlanManager_question',
      render: (text, record) => <span>{record.questionanswer}</span>,
    },

    {
      title: '操作',
      dataIndex: 'studyPlanManager_opt',
      key: 'studyPlanManager_opt',
      render: (text, record) => {
        let dom;
        if (record.status === '已完成') {
          dom = (
            <span>
              <Link to={`/studyPlan/studyPlanManager/view/${record.id}`}>查看</Link>
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
        } else if (record.status === '已指派' || record.status === '学习中') {
          dom = (
            <span>
              <Link to={`/studyPlan/studyPlanManager/edit/${record.id}`}>编辑</Link>
              <Divider type="vertical" />
              <Link to={`/studyPlan/studyPlanManager/view/${record.id}`}>查看</Link>
            </span>
          );
        }
        return dom;
      },
    },
  ];
  const props = {
    listAction: 'StudyPlanManager/GetLearnPlans',
    name: '学习计划',
    datalist,
    columns,
    changestatusAction: 'StudyPlanManager/ChangeStatus',
    // delAction: 'StudyPlanManager/DelCourse',
  };

  return ManagerTable(props);
};
