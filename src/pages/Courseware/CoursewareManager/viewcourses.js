import React from 'react';
import { ViewList } from '@/components/ViewPage';
import { Button, List } from 'antd';
import { Link } from 'umi';
import SelfItemCard from '@/components/Workbench/selfItemCard';
import SelfItemCardImg from '@/components/Workbench/selfItemCardImg';
import SelfItemCardDetail from '@/components/Workbench/selfItemCardDetail';

export default function viewPapers() {
  const datalist = state => state.CourseManager.allCourseManager;
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
    action: 'CourseManager/GetCourses',
    name: '课程',
    datalist,
    renderItem,
  };

  return ViewList(props);
}
