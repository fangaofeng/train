import React from 'react';
import { List, Button } from 'antd';
import { Link } from 'umi';
import LearnInfo from '@/components/LearnInfo/public';
import ViewList from '@/components/ViewPage/viewList';
import { learnPublicProgressService } from '@/services';

export default () => {
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
        <Link to={`/myStudy/publicprogress/${item.id}`}>
          <Button type="primary">{buttonText(item.rate_progress)}</Button>
        </Link>,
      ]}
    >
      {/* {LearnInfo(item)} */}
      <LearnInfo {...item} />
    </List.Item>
  );

  const props = {
    service: learnPublicProgressService,
    // actionparams: {},
    name: '自学课程',
    renderItem,
    isGride: false,
  };

  return ViewList(props);
};
