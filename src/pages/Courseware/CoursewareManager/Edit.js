import React from 'react';
import { Button, Popconfirm, Spin } from 'antd';

import { useSelector } from 'dva';
import EditContent from '@/components/EditContent';
import CourseBasicInfo from '@/components/CourseBasicInfo';

export default props => {
  const {
    location: {
      query: { currentType },
    },
    match: {
      params: { id },
    },
  } = props;
  const data = state => ({
    listdata: state.CourseManager.currenttrainmanagers,
    addlistdata: state.CourseManager.addtrainmanagers,
  });

  const detailloading = useSelector(
    store => store.loading.effects['CourseManager/GetCourseTeacherInfo']
  );

  const info = storedispatch => (
    <Spin spinning={detailloading}>
      <CourseBasicInfo
        dispatch={storedispatch}
        courseid={id}
        action="CourseManager/GetCourseTeacherInfo"
        isShow={false}
      />
    </Spin>
  );
  const commonColumns = [
    {
      title: '员工编号',
      dataIndex: 'user_number',
      key: 'user_number',
      render: (text, record) => <span>{record.user_no}</span>,
    },
    {
      title: '姓名',
      dataIndex: 'user_name',
      key: 'user_name',
      render: (text, record) => <span>{record.name}</span>,
    },
    {
      title: '归属部门',
      dataIndex: 'user_department',
      key: 'user_department',
      render: (text, record) => <span>{record.department_name}</span>,
    },
  ];
  const columns = (deleteConfirm, delloading) => {
    let arr = [];
    if (currentType === '拟制中') {
      arr = [
        ...commonColumns,
        {
          title: '操作',
          dataIndex: 'option',
          key: 'option',
          render: (text, record) => (
            <span>
              <Popconfirm
                placement="topRight"
                title="确认删除该条数据？"
                onConfirm={() => deleteConfirm(record.id)}
                okText="确定"
                cancelText="取消"
              >
                <Button type="link">删除</Button>
              </Popconfirm>
            </span>
          ),
        },
      ];
    } else {
      arr = [
        ...commonColumns,
        {
          title: '已创建培训计划',
          dataIndex: 'createdPlan',
          key: 'createdPlan',
          render: (text, record) => <span>{record.createdPlan}</span>,
        },
        {
          title: '操作',
          dataIndex: 'option',
          key: 'option',
          render: (text, record) => (
            <span>
              <Popconfirm
                placement="topRight"
                title="确认删除该条数据？"
                onConfirm={() => deleteConfirm(record.id)}
                okText="确定"
                cancelText="取消"
              >
                <Button disabled={record.createdPlan === '是'} loading={delloading} type="link">
                  删除
                </Button>
              </Popconfirm>
            </span>
          ),
        },
      ];
    }
    return arr;
  };

  const params = {
    listAction: 'CourseManager/GetTrainmanagers',
    name: '课件',
    data,
    columns,
    changestatusAction: 'CourseManager/CourseChangeStatus',
    delAction: 'CourseManager/DelTrainmanagers',
    addAction: 'CourseManager/SubmitAddedData',
    sublistAction: 'CourseManager/GetOtherTrainmanagers',
    id,
    currentType,
    info,
    returnUrl: '/courseware/coursewareManager/index',
  };

  return EditContent(params);
};
