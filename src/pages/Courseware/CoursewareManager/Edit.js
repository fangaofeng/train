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
  const getCheckedKeys = state =>
    state.CourseManager.courseware ? state.CourseManager.courseware.departments : null;

  const info = datainfo => {
    return <CourseBasicInfo CousreInfo={datainfo} isShow={false} />;
  };

  const params = {
    action: 'CourseManager/GetCourse',
    name: '课件',
    subname: '使用部门',
    getCheckedKeys,
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
