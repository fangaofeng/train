import React from 'react';
import { List, Button } from 'antd';
import { Link } from 'umi';
import ViewList from '@/components/ViewPage/viewList';
import ExamBasicInfo from '@/components/ExamBasicInfo';
import { learnplanService } from '@/services';

export default () => {
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
    params: { status: 'completed' },
    name: '完成的考试',
    service: learnplanService,
    renderItem,
    isGride: false,
  };

  return ViewList(props);
};
