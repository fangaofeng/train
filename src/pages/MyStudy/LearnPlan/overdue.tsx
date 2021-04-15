import React from 'react';
import { List, Button } from 'antd';
import LearnInfo from '@/components/LearnInfo';
import ViewList from '@/components/ViewPage/viewList';
import { learnplanService } from '@/services';

export default () => {
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
    service: learnplanService,
    params: { status: 'overdue' },
    name: '逾期的课程',
    renderItem,
    isGride: false,
  };

  return ViewList(props);
};
