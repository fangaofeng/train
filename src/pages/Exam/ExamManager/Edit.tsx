import React from 'react';

import EditContent from '@/components/EditContent/indexTree';
import ExamBasicInfo from '@/components/ExamBasicInfo';
import { paperService, departmentService } from '@/services';

export default props => {
  const {
    location: {
      query: { currentType },
    },
    match: {
      params: { id },
    },
  } = props;

  const info = datainfo => <ExamBasicInfo ExamInfo={datainfo} isShow={false} />;

  const params = {
    service: paperService,
    treeService: departmentService,
    subname: '使用部门',
    id,
    currentType,
    Info: info,
    returnUrl: '/courseware/coursewareManager/index',
  };
  return EditContent(params);
};
