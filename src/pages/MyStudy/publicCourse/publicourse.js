import React from 'react';
import { ViewList } from '@/components/ViewPage';
import { Button, message, List } from 'antd';
import { useDispatch } from 'dva';
import { history } from 'umi';
import SelfItemCard from '@/components/Workbench/selfItemCard';
import SelfItemCardImg from '@/components/Workbench/selfItemCardImg';
import SelfItemCardDetail from '@/components/Workbench/selfItemCardDetail';

export default function viewPapers() {
  const datalist = state => state.PublicCourse.publicCourse;
  const storedispatch = useDispatch();
  const createprogrest = item => {
    storedispatch({
      type: 'PublicCourse/CreatePublicProgress',
      payload: { course: item.id },
      callback: res => {
        if (res && res.status === 'ok') {
          const { id } = res.data;
          history.push(`/myStudy/publicprogress/${id}`);
        } else {
          message.warning('课程无法学习');
        }
      },
    });
  };
  const renderItem = item => (
    <List.Item>
      <SelfItemCard>
        <SelfItemCardImg
          imgSrc={item.cover}
          studyTime={`${Number(item.class_hour)}学时`}
          btns={
            <Button type="primary" onClick={() => createprogrest(item)}>
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
    action: 'PublicCourse/getPublicCourses',
    name: '课程',
    datalist,
    renderItem,
  };

  return ViewList(props);
}
