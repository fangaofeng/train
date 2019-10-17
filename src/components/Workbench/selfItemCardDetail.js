import React, { Component, Fragment } from 'react';
import { Button, Progress } from 'antd';
// import classNames from 'classnames';
// import Authorized from '@/utils/Authorized';
import styles from './selfItemCardDetail.less';

class SelfItemCardDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // const {item} = this.props;
    const {
      title,
      adminConfig,
      // adminConfig:{
      //   status,// 状态。‘拟制中’、‘已上架’、‘已下架’、‘已归档’
      //   btns,// 按钮
      // }
      trAdminConfig,
      // trAdminConfig:{
      //   teacherr,// 授课老师
      //   suitablePerson// 适用对象
      // }
      stuUnfinishedConfig, // 学员 待完成和已逾期通用配置
      // stuUnfinishedConfig:{
      //   status,// 状态。学习进度：‘未开始’、‘已指派’、‘学习中’。考试进度：‘未开始’、‘已指派’、‘考试中’、
      //   progress,// 进度条 course有值，exam为null
      //   endTime,// 考试截止时间 exam有值，course为null
      //   planStartTime,// 学习开放时间或者考试开放时间
      //   days// 剩余天数
      //   btns// 按钮
      // }
      stuFinishedConfig, // 学员 已完成
      // stuFinishedConfig:{
      //   availableTime,// 课程有效期 course有值，exam为null
      //   examEndTime,// 考试截止时间 exam有值，course为null
      //   btns// 按钮
      // }
      stuRecommendedCourse, // 学员的推荐课程
      // stuRecommendedCourse：{
      //   teacherr,// 授课老师
      //   suitablePerson// 适用对象
      // }
    } = this.props;

    return (
      <Fragment>
        <div className={styles.list_item_card_info_conter}>
          <div className={styles.title} title={title}>
            {title}
          </div>
          {adminConfig &&
            adminConfig.status && (
              <div className={styles.admin_edit}>
                <span>{adminConfig.status}</span>
                <Button type="primary" disabled={adminConfig.status === '已归档'}>
                  {adminConfig.btns}
                </Button>
              </div>
            )}
          {trAdminConfig && (
            <div className={styles.teachAndSuitable}>
              {trAdminConfig.teacher && (
                <span title={`授课：${trAdminConfig.teacher}`}>
                  授课：
                  {trAdminConfig.teacher}
                </span>
              )}
              <span title={`适用对象：${trAdminConfig.suitablePerson}`}>
                适用对象：
                {trAdminConfig.suitablePerson}
              </span>
            </div>
          )}
          {/* --------------------------待完成、已逾期-------------------------- */}
          {stuUnfinishedConfig &&
            stuUnfinishedConfig.progress !== null && (
              <Progress
                percent={Number(stuUnfinishedConfig.progress)}
                status="active"
                style={{ visibility: stuUnfinishedConfig.status === '未开始' ? 'hidden' : 'unset' }}
              />
            )}
          {stuUnfinishedConfig &&
            stuUnfinishedConfig.endTime && (
              <div
                title={`考试截止时间：${stuUnfinishedConfig.endTime}`}
                className={styles.endTime}
                style={{ visibility: stuUnfinishedConfig.status === '未开始' ? 'hidden' : 'unset' }}
              >
                考试截止时间：
                {stuUnfinishedConfig.endTime}
              </div>
            )}
          {stuUnfinishedConfig && stuUnfinishedConfig.status === '未开始'
            ? stuUnfinishedConfig.planStartTime && (
                // eslint-disable-next-line react/jsx-indent
                <div className={styles.planStartTime}>
                  {stuUnfinishedConfig.planStartTime}
                  <Button type="primary" disabled>
                    未开始
                  </Button>
                </div>
              )
            : stuUnfinishedConfig &&
              stuUnfinishedConfig.days && (
                <div className={styles.leftDays}>
                  <span title={`剩余天数：${stuUnfinishedConfig.days}`}>
                    剩余天数：
                    <span style={{ color: 'red' }}>{stuUnfinishedConfig.days}</span>
                  </span>
                  <Button type="primary" disabled={stuUnfinishedConfig.status === '未开始'}>
                    {stuUnfinishedConfig.btns}
                  </Button>
                </div>
              )}
          {/* --------------------------待完成、已逾期-------------------------- */}
          {/* --------------------------已完成-------------------------- */}
          {stuFinishedConfig &&
            stuFinishedConfig.availableTime && (
              <div className={styles.availableTime}>
                <span title={`课程有效期：${stuFinishedConfig.availableTime}`}>
                  课程有效期：
                  {stuFinishedConfig.availableTime}
                </span>
                <Button type="primary">{stuFinishedConfig.btns}</Button>
              </div>
            )}
          {stuFinishedConfig &&
            stuFinishedConfig.examEndTime && (
              <div className={styles.examEndTime}>
                <span title={`考试时间：${stuFinishedConfig.examEndTime}`}>
                  考试时间：
                  {stuFinishedConfig.examEndTime}
                </span>
                <Button type="primary">{stuFinishedConfig.btns}</Button>
              </div>
            )}
          {/* --------------------------已完成-------------------------- */}
          {/* --------------------------推荐课程-------------------------- */}
          {stuRecommendedCourse && (
            <div className={styles.teachAndSuitable}>
              <span title={`授课：${stuRecommendedCourse.teacher}`}>
                授课：
                {stuRecommendedCourse.teacher}
              </span>
              <span title={`适用对象：${stuRecommendedCourse.suitablePerson}`}>
                适用对象：
                {stuRecommendedCourse.suitablePerson}
              </span>
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

export default SelfItemCardDetail;
