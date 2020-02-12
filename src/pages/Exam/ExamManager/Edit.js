import React from 'react';

import EditContent from '@/components/EditContent/indexTree';
import ExamBasicInfo from '@/components/ExamBasicInfo';

export default props => {
  const {
    location: {
      query: { currentType },
    },
    match: {
      params: { id },
    },
  } = props;

  const data = state => state.ExamManager.paper;
  const selectkeys = state =>
    state.ExamManager.paper ? state.ExamManager.paper.departments : null;
  const info = datainfo => {
    return <ExamBasicInfo ExamInfo={datainfo} isShow={false} />;
  };

  const params = {
    action: 'ExamManager/GetPaper',
    name: '试卷',
    subname: '使用部门',
    selectkeys,

    data,
    id,
    currentType,
    Info: info,
    changestatusAction: 'ExamManager/ChangeExamStatus',
    changeDataAction: 'ExamManager/ChangeExam',
    subaction: 'DepartmentManager/GetOrgsDeparments',
    returnUrl: '/exam/index',
  };

  return EditContent(params);
};
