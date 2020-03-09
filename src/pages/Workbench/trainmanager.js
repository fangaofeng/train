import React, { useEffect, Fragment } from 'react';
import { List, Button } from 'antd';
import { useDispatch, useSelector } from 'dva';
// import classNames from 'classnames';
import { Link } from 'umi';

// import moment from 'moment';
import SelfCard from '@/components/Workbench/selfCard';
import SelfItemCard from '@/components/Workbench/selfItemCard';
import SelfItemCardImg from '@/components/Workbench/selfItemCardImg';
import SelfItemCardDetail from '@/components/Workbench/selfItemCardDetail';

import noDataTips from './utils';
import styles from './Workbench.less';

function TrainmanagerWorkbench() {
  const latestCourseListAaction = 'workbench/getLatestCourse';
  const latestExamListAction = 'workbench/getLatestExam';
  const latestCourseList = useSelector(store => store.workbench.latestCourse);
  const latestCourseListLoading = useSelector(
    store => store.loading.effects[latestCourseListAaction]
  );
  const latestExamList = useSelector(store => store.workbench.latestExam);
  const latestExamListLoading = useSelector(store => store.loading.effects[latestExamListAction]);
  const storedispatch = useDispatch();

  useEffect(() => {
    storedispatch({
      type: latestCourseListAaction,
      payload: {
        page: 1,
        size: 4,
      },
    });
    storedispatch({
      type: latestExamListAction,
      payload: {
        page: 1,
        size: 4,
      },
    });
  }, []);

  return (
    <Fragment>
      <SelfCard title="最新课程" extra={<Link to="#">查看更多&gt;&gt;</Link>}>
        <List
          grid={{ gutter: 4, xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4 }}
          dataSource={latestCourseList}
          loading={latestCourseListLoading}
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
          dataSource={latestExamList}
          loading={latestExamListLoading}
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
    </Fragment>
  );
}

export default TrainmanagerWorkbench;
