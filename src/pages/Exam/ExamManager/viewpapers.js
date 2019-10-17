import React from 'react';
import ViewList from '@/components/ViewList/index';
import Link from 'umi/link';
import SelfItemCard from '@/components/Workbench/selfItemCard';
import SelfItemCardImg from '@/components/Workbench/selfItemCardImg';
import SelfItemCardDetail from '@/components/Workbench/selfItemCardDetail';

export default function viewPapers() {
  const datalist = state => state.ExamManager.allTestPapers;
  const renderItem = item => (
    <SelfItemCard>
      <SelfItemCardImg
        imgSrc={item.cover}
        showExamTip
        studyTime={`考试时长：${item.duration}分钟`}
        btns={<Link to={`/examPlan/examPlanManager/create/${item.id}`}>发布考试</Link>}
      />
      <SelfItemCardDetail
        // item={item}
        title={item.name}
        trAdminConfig={{
          suitablePerson: item.applicable_user,
        }}
      />
    </SelfItemCard>
  );

  const props = {
    action: 'ExamManager/GetAllTestPapersTableData',
    name: '试卷',
    datalist,
    renderItem,
  };

  return ViewList(props);
}
