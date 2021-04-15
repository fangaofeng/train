import React from 'react';
import { ViewList } from '@/components/ViewPage';
import { Button, message, List } from 'antd';
import { history } from 'umi';
import SelfItemCard from '@/components/Workbench/selfItemCard';
import SelfItemCardImg from '@/components/Workbench/selfItemCardImg';
import SelfItemCardDetail from '@/components/Workbench/selfItemCardDetail';
import { coursewareService, learnProgressService } from '@/services';

export default function viewPapers() {
  const { run, loading } = learnProgressService.createRequest(null, {
    manual: true,
    onSuccess: result => {
      if (result) history.push(`/myStudy/publicprogress/${result.id}`);
    },
  });

  const renderItem = item => (
    <List.Item>
      <SelfItemCard>
        <SelfItemCardImg
          imgSrc={item.cover}
          studyTime={`${Number(item.class_hour)}学时`}
          btns={
            <Button type="primary" loading={loading} onClick={() => run({ course: item.id })}>
              去学习
            </Button>
          }
        />
        <SelfItemCardDetail
          // item={item}
          title={item.title}
          stuRecommendedCourse={{
            teacher: item.teachername,
            suitablePerson: item.applicable_user,
          }}
        />
      </SelfItemCard>
    </List.Item>
  );

  const props = {
    servcie: coursewareService,
    params: { type: '公共' },
    name: '课程',
    renderItem,
  };

  return ViewList(props);
}
