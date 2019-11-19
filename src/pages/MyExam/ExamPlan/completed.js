import React from 'react';
import { List, Button } from 'antd';
// import router from 'umi/router';
import Link from 'umi/link';

import ExamBasicInfo from '@/components/ExamBasicInfo';

// import noDataTips1 from '@/assets/images/Workbench/001.png'
// import noDataTips4 from '@/assets/images/Workbench/004.png'

import ViewList from '@/components/ViewPage/viewList2';

export default () => {
  const datalist = state => state.MyExam.completedes;

  const buttonText = daysremaining => {
    if (daysremaining > 0) {
      return <Button type="primary">再考一次</Button>;
    }
    return (
      <Button type="primary" disabled>
        再考一次
      </Button>
    );
  };
  const renderItem = item => (
    <List.Item
      actions={[
        <Link to={`/myExam/onlineExam/${item.id}`}>{buttonText(item.days_remaining)}</Link>,
      ]}
    >
      <ExamBasicInfo ExamInfo={item.plan.exampaper} noCard />
    </List.Item>
  );

  const props = {
    action: 'MyExam/getExamProgress',
    actionparams: { status: 'completed' },
    name: '完成的考试',
    datalist,
    renderItem,
  };

  return ViewList(props);
};
