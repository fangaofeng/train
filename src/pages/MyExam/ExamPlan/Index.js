import React from 'react';
import { List, Button } from 'antd';
// import router from 'umi/router';
import Link from 'umi/link';

import ExamBasicInfo from '@/components/ExamBasicInfo';

// import noDataTips1 from '@/assets/images/Workbench/001.png';
// import noDataTips4 from '@/assets/images/Workbench/004.png';

import ViewList from '@/components/ViewPage/viewList2';

export default () => {
  const datalist = state => state.MyExam.todoes;

  const renderItem = item => (
    <List.Item
      actions={[
        <Link to={`/myExam/onlineExam/${item.id}`}>
          <Button type="primary ">开始考试</Button>
        </Link>,
      ]}
    >
      <ExamBasicInfo ExamInfo={item.plan.exampaper} noCard />
    </List.Item>
  );

  const props = {
    action: 'MyExam/getExamProgress',
    actionparams: { status: 'notcompleted' },
    name: '待完成的考试',
    datalist,
    renderItem,
  };

  return ViewList(props);
};
