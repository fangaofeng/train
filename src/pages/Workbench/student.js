import React, { useEffect, Fragment } from 'react';
import { List, Button, Card, Tabs } from 'antd';

import Link from 'umi/link';

import SelfCard from '@/components/Workbench/selfCard';
import SelfItemCard from '@/components/Workbench/selfItemCard';
import SelfItemCardImg from '@/components/Workbench/selfItemCardImg';
import SelfItemCardDetail from '@/components/Workbench/selfItemCardDetail';
import { useSelector, useDispatch } from 'dva';
import noDataTips from './utils';

import styles from './Workbench.less';

const { TabPane } = Tabs;

function StuWorkbench() {
  const stuCoursesAction = 'workbench/GetStuCourses';
  const stuExamsAction = 'workbench/GetStuExams';
  const recommendCourseListAction = 'workbench/getStuRecommendCourse';
  const stuCourses = useSelector(store => store.workbench.stuCourses);
  const stuCoursesLoading = useSelector(store => store.loading.effects[stuCoursesAction]);
  const stuExams = useSelector(store => store.workbench.stuExams);
  const stuExamsLoading = useSelector(store => store.loading.effects[stuExamsAction]);
  const recommendCourseList = useSelector(store => store.workbench.recommendCourse);
  const recommendCourseListLoading = useSelector(
    store => store.loading.effects[recommendCourseListAction]
  );
  // const [learnKey, setLearnKey] = useState('todo');
  // const [examKey, setExamKey] = useState('todo');

  const storedispatch = useDispatch();

  useEffect(() => {
    storedispatch({
      type: stuCoursesAction,
    });
    storedispatch({
      type: stuExamsAction,
    });
    storedispatch({
      type: recommendCourseListAction,
      payload: {
        recommend: true,
      },
    });
  }, []);

  const rendercourse = (item, flag) => {
    const stuUnfinishedtodo = {
      status: item.status,
      progress: item.rate_progress,
      endTime: item.plan.end_time,
      days: item.days_remaining,
      planStartTime: (
        <span title={`学习开放时间：${item.plan.start_time}`}>
          学习开放时间：
          {item.plan.start_time}
        </span>
      ),

      btns: <Link to={`/myStudy/learnPlan/${item.id}`}>去学习</Link>,
    };
    const stuUnfinishedcomplete = {
      availableTime: item.plan.end_time,
      btns: <Link to={`/myStudy/learnPlan//${item.id}`}>去学习</Link>,
    };

    return (
      <List.Item>
        <SelfItemCard>
          <SelfItemCardImg
            imgSrc={item.plan.course.cover}
            showCourseTip
            studyTime={`${Number(item.plan.course.class_hour)}学时`}
          />
          <SelfItemCardDetail
            title={item.plan.name}
            stuUnfinishedConfig={flag === 'completed' ? stuUnfinishedcomplete : stuUnfinishedtodo}
          />
        </SelfItemCard>
      </List.Item>
    );
  };

  const renderexam = (item, flag) => {
    const stuUnfinishedtodo = {
      status: item.status,
      endTime: item.plan.end_time,
      days: item.days_remaining,
      planStartTime: (
        <span title={`考试开放时间：${item.plan.start_time}`}>
          考试开放时间：
          {item.plan.start_time}
        </span>
      ),
      btns: <Link to={`/myExam/onlineExam/login/${item.id}`}>去考试</Link>,
    };
    const stuUnfinishedcomplete = {
      endTime: item.end_time,
      btns: <Link to={`/studyPlan/studyPlanManager/create/${item.id}`}>查看试卷</Link>,
    };

    return (
      <List.Item>
        <SelfItemCard>
          <SelfItemCardImg
            imgSrc={item.plan.exampaper.cover}
            showExamTip
            studyTime={`${Number(item.plan.exampaper.duration)}学时`}
          />
          <SelfItemCardDetail
            title={item.plan.name}
            stuUnfinishedConfig={flag === 'completed' ? stuUnfinishedcomplete : stuUnfinishedtodo}
          />
        </SelfItemCard>
      </List.Item>
    );
  };

  return (
    <Fragment>
      <Card className={styles.stuFinishCard} title="课程">
        <Tabs
          animated={false}
          tabBarExtraContent={<Link to="/myStudy/LearnPlan/notcompleted">查看更多&gt;&gt;</Link>}
          defaultActiveKey="todo"
          // onChange={key => setLearnKey(key)}
        >
          <TabPane tab="待完成" key="todo">
            <List
              grid={{ gutter: 4, xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4 }}
              dataSource={stuCourses.todo}
              loading={stuCoursesLoading}
              locale={{
                emptyText: (
                  <div className={styles.noDataTips}>
                    <img src={noDataTips.stuToDo.imgSrc} alt="待完成" />
                    <span>{noDataTips.stuToDo.title}</span>
                  </div>
                ),
              }}
              renderItem={item => rendercourse(item, 'todo')}
            />
          </TabPane>
          <TabPane tab="已完成" key="completed">
            <List
              grid={{ gutter: 4, xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4 }}
              dataSource={stuCourses.completed}
              loading={stuCoursesLoading}
              locale={{
                emptyText: (
                  <div className={styles.noDataTips}>
                    <img src={noDataTips.stuDone.imgSrc} alt="已完成" />
                    <span>{noDataTips.stuDone.title}</span>
                  </div>
                ),
              }}
              renderItem={item => rendercourse(item, 'completed')}
            />
          </TabPane>
          <TabPane tab="已逾期" key="overdue">
            <List
              grid={{ gutter: 4, xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4 }}
              dataSource={stuCourses.overdue}
              loading={stuCoursesLoading}
              locale={{
                emptyText: (
                  <div className={styles.noDataTips}>
                    <img src={noDataTips.stuOverdue.imgSrc} alt="已逾期" />
                    <span>{noDataTips.stuOverdue.title}</span>
                  </div>
                ),
              }}
              renderItem={item => rendercourse(item, 'overdue')}
            />
          </TabPane>
        </Tabs>
      </Card>
      <Card className={styles.stuFinishCard} title="考试">
        <Tabs
          animated={false}
          tabBarExtraContent={<Link to="/myExam/examPlan">查看更多&gt;&gt;</Link>}
          // onChange={key => setExamKey(key)}
          defaultActiveKey="todo"
        >
          <TabPane tab="待完成" key="todo">
            <List
              grid={{ gutter: 4, xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4 }}
              dataSource={stuExams.todo}
              loading={stuExamsLoading}
              locale={{
                emptyText: (
                  <div className={styles.noDataTips}>
                    <img src={noDataTips.stuToDo.imgSrc} alt="待完成" />
                    <span>{noDataTips.stuToDo.title}</span>
                  </div>
                ),
              }}
              renderItem={item => renderexam(item, 'todo')}
            />
          </TabPane>
          <TabPane tab="已完成" key="completed">
            <List
              grid={{ gutter: 4, xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4 }}
              dataSource={stuExams.completed}
              loading={stuExamsLoading}
              locale={{
                emptyText: (
                  <div className={styles.noDataTips}>
                    <img src={noDataTips.stuDone.imgSrc} alt="已完成" />
                    <span>{noDataTips.stuDone.title}</span>
                  </div>
                ),
              }}
              renderItem={item => renderexam(item, 'completed')}
            />
          </TabPane>
          <TabPane tab="已逾期" key="overdue">
            <List
              grid={{ gutter: 4, xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4 }}
              dataSource={stuExams.overdue}
              loading={stuExamsLoading}
              locale={{
                emptyText: (
                  <div className={styles.noDataTips}>
                    <img src={noDataTips.stuOverdue.imgSrc} alt="已逾期" />
                    <span>{noDataTips.stuOverdue.title}</span>
                  </div>
                ),
              }}
              renderItem={item => renderexam(item, 'overdue')}
            />
          </TabPane>
        </Tabs>
      </Card>
      <SelfCard title="推荐课程" extra={<Link to="#">查看更多&gt;&gt;</Link>}>
        <List
          grid={{ gutter: 4, xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4 }}
          dataSource={recommendCourseList}
          loading={recommendCourseListLoading}
          locale={{
            emptyText: (
              <div className={styles.noDataTips}>
                <img src={noDataTips.stuRecommend.imgSrc} alt="推荐课程" />
                <span>{noDataTips.stuRecommend.title}</span>
              </div>
            ),
          }}
          renderItem={item => (
            <List.Item>
              <SelfItemCard>
                <SelfItemCardImg
                  imgSrc={item.cover}
                  // showCourseTip
                  // showExamTip
                  studyTime={`${item.class_hour}学时`}
                  btns={
                    <Button type="primary">
                      <Link to={`/myStudy/publicprogress/${item.id}`}>去学习</Link>
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
          )}
        />
      </SelfCard>
    </Fragment>
  );
}

export default StuWorkbench;
