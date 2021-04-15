import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import EditContent from '@/components/EditContent/indexTree';
import CourseBasicInfo from '@/components/CourseBasicInfo';
import { coursewareService, departmentService } from '@/services';

export default props => {
  const {
    location: {
      query: { currentType },
    },
    match: {
      params: { id },
    },
  } = props;

  const info = datainfo => <CourseBasicInfo CousreInfo={datainfo} isShow={false} />;
  const name = '课程编辑';
  const params = {
    service: coursewareService,
    treeService: departmentService,
    subname: '使用部门',
    id,
    currentType,
    Info: info,
    returnUrl: '/courseware/coursewareManager/index',
  };

  return (
    <PageHeaderWrapper title={currentType ? `${name}（${currentType}）` : `${name}`}>
      <EditContent {...params} />
    </PageHeaderWrapper>
  );
};
