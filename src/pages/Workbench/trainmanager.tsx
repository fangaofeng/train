import React from 'react';
import { List, Button } from 'antd';

// import classNames from 'classnames';
import { paperService, coursewareService } from '@/services';
import { Link, useRequest } from 'umi';

// import moment from 'moment';
import SelfCard from '@/components/Workbench/selfCard';
import SelfItemCard from '@/components/Workbench/selfItemCard';
import SelfItemCardImg from '@/components/Workbench/selfItemCardImg';
import SelfItemCardDetail from '@/components/Workbench/selfItemCardDetail';

import noDataTips from './utils';
import styles from './Workbench.less';

function TrainmanagerWorkbench() {
  const latestPaper = paperService.listRequest({ current: 1, pageSize: 4 });
  const latestCourse = coursewareService.listRequest({ current: 1, pageSize: 4 });

  return (
    <>
      <SelfCard title="最新课程" extra={<Link to="#">查看更多&gt;&gt;</Link>}>
        <List
          grid={{ gutter: 4, xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4 }}
          dataSource={latestCourse!.list}
          loading={latestCourse!.loading}
          locale={{
            emptyText: (
              <div className={styles.noDataTips}>
                <img src={noDataTips.newestCourse.imgSrc} alt="最新课程" />
                <span>{noDataTips.newestCourse.title}</span>
              </div>
            ),
          }}
          renderItem={item => (
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
                  // item={item}
                  title={item.name}
                  trAdminConfig={{
                    teacher: item.teachername,
                    suitablePerson: item.applicable_user,
                  }}
                />
              </SelfItemCard>
            </List.Item>
          )}
        />
      </SelfCard>
      <SelfCard title="最新试卷" extra={<Link to="#">查看更多&gt;&gt;</Link>}>
        <List
          grid={{ gutter: 4, xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4 }}
          dataSource={latestPaper!.list}
          loading={latestPaper!.loading}
          locale={{
            emptyText: (
              <div className={styles.noDataTips}>
                <img src={noDataTips.newestExam.imgSrc} alt="最新试卷" />
                <span>{noDataTips.newestExam.title}</span>
              </div>
            ),
          }}
          renderItem={item => (
            <List.Item>
              <SelfItemCard>
                <SelfItemCardImg
                  // item={item}
                  imgSrc={item.cover}
                  // showCourseTip
                  // showExamTip
                  studyTime={`考试时长：${item.class_hour}分钟`}
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
                    // teacher:item.teacher,
                    suitablePerson: item.applicable_user,
                  }}
                />
              </SelfItemCard>
            </List.Item>
          )}
        />
      </SelfCard>
    </>
  );
}

export default TrainmanagerWorkbench;
