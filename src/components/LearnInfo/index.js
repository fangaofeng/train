import React, { PureComponent } from 'react';
import { Progress, Descriptions } from 'antd';
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
            <Descriptions column={2}>
              <Descriptions.Item label="课程名称">{detail.plan.course.name}</Descriptions.Item>
              <Descriptions.Item label="计划名称">{detail.plan.name}</Descriptions.Item>
              <Descriptions.Item label="课时">{detail.plan.course.class_hour}时</Descriptions.Item>
              <Descriptions.Item label="学习完成时间">
                {' '}
                {moment(detail.end_time).format('YYYY-MM-DD HH:mm')}
              </Descriptions.Item>
              <Descriptions.Item label="学习进度">
                {' '}
                <Progress percent={detail.rate_progress} style={{ width: 180 }} />
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>
      </div>
    );
  }
}

export default LearnInfo;
