import React from 'react';
import { ViewList } from '@/components/ViewPage';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, List } from 'antd';
import { Link } from 'umi';
import SelfItemCard from '@/components/Workbench/selfItemCard';
import SelfItemCardImg from '@/components/Workbench/selfItemCardImg';
import SelfItemCardDetail from '@/components/Workbench/selfItemCardDetail';
import { coursewareService } from '@/services';

export default function viewPapers() {
  const renderItem = item => (
    <List.Item>
      <SelfItemCard>
        <SelfItemCardImg
          imgSrc={item.cover}
          studyTime={`${Number(item.class_hour)}学时`}
          btns={
            <Button type="primary">
              <Link to={`/studyPlan/studyPlanManager/create/${item.id}`}>创建学习计划</Link>
            </Button>
          }
        />
        <SelfItemCardDetail
          title={<Link to={`/courseware/view/${item.id}`}>{item.name}</Link>}
          trAdminConfig={{
            teacher: item.teachername,
            suitablePerson: item.applicable_user,
          }}
        />
      </SelfItemCard>
    </List.Item>
  );

  const props = {
    service: coursewareService,
    name: '课程',
    renderItem,
  };

  return (
    <PageHeaderWrapper>
      <ViewList {...props} />
    </PageHeaderWrapper>
  );
}
