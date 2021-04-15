import React from 'react';
import { ViewList } from '@/components/ViewPage';
import { Button, List } from 'antd';
import { Link } from 'umi';
import SelfItemCard from '@/components/Workbench/selfItemCard';
import SelfItemCardImg from '@/components/Workbench/selfItemCardImg';
import SelfItemCardDetail from '@/components/Workbench/selfItemCardDetail';
import { paperService } from '@/services';

export default function viewPapers() {
  const renderItem = item => (
    <List.Item>
      <SelfItemCard>
        <SelfItemCardImg
          imgSrc={item.cover}
          showExamTip
          studyTime={`考试时长：${item.duration}分钟`}
          btns={
            <Button type="primary">
              <Link to={`/examPlan/examPlanManager/create/${item.id}`}>发布考试</Link>
            </Button>
          }
        />
        <SelfItemCardDetail
          // item={item}
          title={item.name}
          trAdminConfig={{
            suitablePerson: item.applicable_user,
          }}
        />
      </SelfItemCard>
    </List.Item>
  );

  const props = {
    service: paperService,
    name: '试卷',
    renderItem,
  };
  return ViewList(props);
}
