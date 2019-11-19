import React from 'react';
import { List, Button } from 'antd';
// import router from 'umi/router';
import Link from 'umi/link';

import ExamBasicInfo from '@/components/ExamBasicInfo';

import ViewList from '@/components/ViewPage/viewList2';

export default () => {
  const datalist = state => state.MyExam.overdues;

  const renderItem = item => (
    <List.Item
      actions={[
        <Link to={`/myExam/onlineExam/${item.id}`}>
          <Button type="danger " disabled>
            无法参加
          </Button>
          ,
        </Link>,
      ]}
    >
      <ExamBasicInfo ExamInfo={item.plan.exampaper} noCard />
    </List.Item>
  );

  const props = {
    action: 'MyExam/getExamProgress',
    actionparams: { status: 'overdue' },
    name: '逾期的考试',
    datalist,
    renderItem,
  };

  return ViewList(props);
};
