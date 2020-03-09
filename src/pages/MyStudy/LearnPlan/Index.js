import React from 'react';
import { List, Button } from 'antd';
// import { history } from 'umi'
import { Link } from 'umi';

import LearnInfo from '@/components/LearnInfo';

// import noDataTips1 from '@/assets/images/Workbench/001.png';
// import noDataTips4 from '@/assets/images/Workbench/004.png';

import ViewList from '@/components/ViewPage/viewList2';

export default () => {
  const datalist = state => state.MyLearnPlan.todoes;

  const buttonText = percent => {
    if (percent === 0) {
      return '开始学习';
    }
    if (percent === 100) {
      return '重新学习';
    }
    return '继续学习';
  };
  const renderItem = item => (
    <List.Item
      actions={[
        <Link to={`/myStudy/LearnPlan/progress/${item.id}`}>
          <Button type="primary">{buttonText(item.rate_progress)}</Button>
        </Link>,
      ]}
    >
      <LearnInfo detail={item} />
    </List.Item>
  );

  const props = {
    action: 'MyLearnPlan/getLearnProgress',
    actionparams: { status: 'notcompleted' },
    name: '待学习的课程',
    datalist,
    renderItem,
  };

  return ViewList(props);
};
