import React from 'react';
import { Progress, Descriptions } from 'antd';
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
          <Descriptions column={2}>
            <Descriptions.Item label="课程名称">{course.name}</Descriptions.Item>
            <Descriptions.Item label="课时">{course.class_hour}时</Descriptions.Item>
            <Descriptions.Item label="学习完成时间">
              {' '}
              {moment(endTime).format('YYYY-MM-DD HH:mm')}
            </Descriptions.Item>
            <Descriptions.Item label="学习进度">
              {' '}
              <Progress percent={rate} style={{ width: 280 }} />
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    </div>
  );
}

export default LearnInfo;
