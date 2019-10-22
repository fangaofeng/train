import React, { PureComponent } from 'react';
import { Divider, Progress } from 'antd';
import moment from 'moment';
import styles from './LearnInfo.less';
import ImgWord from '@/components/ImageWord';

class LearnInfo extends PureComponent {
  render() {
    const { detail } = this.props;
    return (
      <div className={styles.detailContent}>
        <div className={styles.leftContent}>
          <div className={styles.imgLeft}>
            <ImgWord
              imgSrc={detail.plan.course.cover}
              bottomRight
              bottomRightMsg={detail.plan.course.file_type}
            />
          </div>
          <div className={styles.imgRight}>
            <div className={styles.msgDetail}>
              <span>课程名称：</span>
              <span className={styles.msgDetailOverflow}>{detail.plan.course.name}</span>
            </div>
            <div>
              <span>
                计划名称：
                {detail.plan.name}
              </span>
              <Divider type="vertical" />
              <span>
                学习进度：
                <Progress percent={detail.rate_progress} style={{ width: 280 }} />
              </span>
            </div>
            <div>
              <span>
                课时：
                {detail.plan.course.class_hour}时
              </span>
              <Divider type="vertical" />
              <span>
                学习完成时间：
                {moment(detail.end_time).format('YYYY-MM-DD HH:mm')}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LearnInfo;
