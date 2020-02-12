import React from 'react';

import EditContent from '@/components/EditContent/indexTree';
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

  const data = state => state.CourseManager.courseware;
  const selectkeys = state =>
    state.CourseManager.courseware ? state.CourseManager.courseware.departments : null;
  const info = datainfo => {
    return <CourseBasicInfo CousreInfo={datainfo} isShow={false} />;
  };
  const columns = [
    {
      title: '部门名称',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <span>{record.title}</span>,
    },
    {
      title: '管理员名称',
      dataIndex: 'manager_name',
      key: 'manager_name',
      render: (text, record) => <span>{record.manager_name}</span>,
    },
    {
      title: '是否使用',
      dataIndex: 'isUse',
      key: 'isUse',
      render: (text, record) => <span>{record.isUse}</span>,
    },
  ];

  const params = {
    action: 'CourseManager/GetCourse',
    name: '课件',
    subname: '使用部门',
    selectkeys,
    columns,
    data,
    id,
    currentType,
    Info: info,
    changestatusAction: 'CourseManager/CourseChangeStatus',
    changeDataAction: 'CourseManager/CourseChangeData',
    subaction: 'DepartmentManager/GetOrgsDeparments',
    returnUrl: '/courseware/coursewareManager/index',
  };

  return EditContent(params);
};
