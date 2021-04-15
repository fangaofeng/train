import React from 'react';
import { List, Button } from 'antd';
// import { history } from 'umi'
import { Link } from 'umi';
import ViewList from '@/components/ViewPage/viewList';
import ExamBasicInfo from '@/components/ExamBasicInfo';
import { examplanService } from '@/services';

export default () => {
  const renderItem = item => (
    <List.Item
      actions={[
        <Link to={`/myExam/onlineExam/${item.id}`}>
          <Button type="danger " disabled>
            无法参加
          </Button>
        </Link>,
      ]}
    >
      <ExamBasicInfo ExamInfo={item.plan.exampaper} noCard />
    </List.Item>
  );

  const props = {
    service: examplanService,
    params: { status: 'overdue' },
    name: '逾期的考试',
    renderItem,
    isGride: false,
  };

  return ViewList(props);
};
