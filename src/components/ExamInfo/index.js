import React, { Component } from 'react';
import { Divider, Progress } from 'antd';
import moment from 'moment';
import styles from './index.less';
import ImgWord from '@/components/ImageWord';

class ExamInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { detail } = this.props;
    // console.log(isShow);
    // console.log(detailConfig);
    return (
      <div className={styles.detailContent}>
        <div className={styles.leftContent}>
          <div className={styles.imgLeft}>
            <ImgWord
              imgSrc={detail.plan.exampaper.cover}
              bottomRight
              bottomRightMsg={`剩余天数：${detail.days_remaining}`}
            />
          </div>
          <div className={styles.imgRight}>
            <div className={styles.msgDetail}>
              <span>考试名称：</span>
              <span className={styles.msgDetailOverflow}>{detail.plan.exampaper.name}</span>
            </div>
            <div>
              <span>
                计划名称：
                {detail.plan.name}
              </span>
              <Divider type="vertical" />
              <span>
                可以考试开始时间：
                {moment(detail.plan.start_time).format('YYYY-MM-DD HH:mm')}
              </span>
              <Divider type="vertical" />
              <span>
                考试截止时间：
                {moment(detail.plan.end_time).format('YYYY-MM-DD HH:mm')}
              </span>
            </div>
            <div>
              <span>
                考试时长：
                {detail.plan.exampaper.duration}
                分钟
              </span>
              <Divider type="vertical" />
              <span>
                考试完成时间：
                {moment(detail.end_time).format('YYYY-MM-DD HH:mm')}
              </span>
              <Divider type="vertical" />
              <span>
                考试成绩：
                {detail.score}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ExamInfo;
