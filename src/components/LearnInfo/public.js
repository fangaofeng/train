import React from 'react';
import { Divider, Progress } from 'antd';
import moment from 'moment';
import styles from './LearnInfo.less';
import ImgWord from '@/components/ImageWord';

function LearnInfo(props) {
  const { course, end_time: endTime, rate_progress: rate } = props;
  return (
    <div className={styles.detailContent}>
      <div className={styles.leftContent}>
        <div className={styles.imgLeft}>
          <ImgWord imgSrc={course.cover} bottomRight bottomRightMsg={course.file_type} />
        </div>
        <div className={styles.imgRight}>
          <div className={styles.msgDetail}>
            <span>课程名称：</span>
            <span className={styles.msgDetailOverflow}>{course.name}</span>
          </div>
          <div>
            <Divider type="vertical" />
            <span>
              学习进度：
              <Progress percent={rate} style={{ width: 280 }} />
            </span>
          </div>
          <div>
            <span>
              课时：
              {course.class_hour}时
            </span>
            <Divider type="vertical" />
            <span>
              学习完成时间：
              {moment(endTime).format('YYYY-MM-DD HH:mm')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearnInfo;