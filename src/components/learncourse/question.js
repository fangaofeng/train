import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button, Input, Avatar } from 'antd';
import classNames from 'classnames';
import styles from './Common.less';

const { TextArea } = Input;

export default props => {
  const { course, start_time: startTime, end_time: endTime, ended } = props;

  return (
    <div className={styles.questionContent}>
      <div className={styles.questionBox}>
        <div className={styles.fixedInfo}>
          <div className={styles.studyTime}>
            <span> 学习时间：</span>{' '}
            <span>
              {' '}
              {startTime}至 {endTime}
            </span>
          </div>{' '}
          <div className={styles.classHour}>
            <span> 课 &emsp; 时：</span>{' '}
            <span>
              {' '}
              {Number(course.class_hour)}
              小时
            </span>
          </div>{' '}
          <div className={styles.courseDesc}>
            <span> 课程介绍：</span> <span title={course.intruduce}> {course.intruduce}</span>
          </div>{' '}
          <div className={styles.teacherInfo}>
            <div className={styles.teacherInfoLeft}>
              <Avatar size={60} src={course.teacherimg} alt="老师头像" icon={<UserOutlined />} />
            </div>{' '}
            <div className={styles.teacherInfoRight}>
              <div className={styles.teacherJSXM}>
                <span> 姓名：</span> <span> {course.teachername}</span>
              </div>{' '}
              <div className={styles.teacherInfoJSJS}>
                <span title={course.teacherdesc}> {course.teacherdesc}</span>
              </div>{' '}
            </div>{' '}
          </div>{' '}
          <div className={classNames(styles.studyProgress, ended ? styles.studyEnded : '')}>
            {' '}
            {ended ? '本次学习完成' : '正在学习中'}
          </div>{' '}
          <div className={styles.textAreaBox}>
            <TextArea
              rows={3}
              placeholder="输入你的提问内容，培训管理员答复提问后你将收到答复通知。"
            />
          </div>{' '}
          <div className={styles.buttonBox}>
            <Button type="primary"> 提交</Button>
          </div>
        </div>{' '}
        <div className={styles.listInfo} />
      </div>{' '}
    </div>
  );
};
