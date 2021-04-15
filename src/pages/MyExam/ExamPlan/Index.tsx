import React from 'react';
import { List, Button } from 'antd';
import { Link } from 'umi';
import ExamBasicInfo from '@/components/ExamBasicInfo';
import ViewList from '@/components/ViewPage/viewList';
import { examprogressService } from '@/services';

export default () => {
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
    service: examprogressService,
    params: { status: 'notcompleted' },
    name: '待完成的考试',
    renderItem,
    isGride: false,
  };

  return ViewList(props);
};
