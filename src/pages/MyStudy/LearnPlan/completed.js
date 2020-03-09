import React from 'react';
import { List, Button } from 'antd';
// import { history } from 'umi'
import { Link } from 'umi';

import LearnInfo from '@/components/LearnInfo';

// import noDataTips1 from '@/assets/images/Workbench/001.png';
// import noDataTips4 from '@/assets/images/Workbench/004.png';

import ViewList from '@/components/ViewPage/viewList2';

export default () => {
  const datalist = state => state.MyLearnPlan.completedes;

  const renderItem = item => (
    <List.Item
      actions={[
        <Link to={`/myStudy/LearnPlan/progress/${item.id}`}>
          <Button type="primary">再次学习</Button>
        </Link>,
      ]}
    >
      <LearnInfo detail={item} />
    </List.Item>
  );

  const props = {
    action: 'MyLearnPlan/getLearnProgress',
    actionparams: { status: 'completed' },
    name: '完成的课程',
    datalist,
    renderItem,
  };

  return ViewList(props);
};
