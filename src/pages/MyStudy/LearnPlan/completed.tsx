import React from 'react';
import { List, Button } from 'antd';
// import { history } from 'umi'
import { Link } from 'umi';

import LearnInfo from '@/components/LearnInfo';
import ViewList from '@/components/ViewPage/viewList';
// import noDataTips1 from '@/assets/images/Workbench/001.png';
// import noDataTips4 from '@/assets/images/Workbench/004.png';
import { learnplanService } from '@/services';

export default () => {
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
    service: learnplanService,
    params: { status: 'completed' },
    name: '完成的课程',
    renderItem,
    isGride: false,
  };

  return ViewList(props);
};
