import React from 'react';
import { List, Button } from 'antd';
// import router from 'umi/router';
// import Link from 'umi/link';

import LearnInfo from '@/components/LearnInfo';

// import noDataTips1 from '@/assets/images/Workbench/001.png';
// import noDataTips4 from '@/assets/images/Workbench/004.png';

import ViewList from '@/components/ViewPage/viewList2';

export default () => {
  const datalist = state => state.MyLearnPlan.overdues;

  const renderItem = item => (
    <List.Item
      actions={[
        <Button type="primary" disabled>
          无法参加
        </Button>,
      ]}
    >
      <LearnInfo detail={item} />
    </List.Item>
  );

  const props = {
    action: 'MyLearnPlan/getLearnProgress',
    actionparams: { status: 'overdue' },
    name: '逾期的课程',
    datalist,
    renderItem,
  };

  return ViewList(props);
};
