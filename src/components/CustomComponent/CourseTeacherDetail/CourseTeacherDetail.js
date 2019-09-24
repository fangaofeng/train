import React, { Component } from 'react';
import { Row, Col, Avatar } from 'antd';
import SelfCard from '@/components/Workbench/selfCard';
import classNames from 'classnames';
import styles from './CourseTeacherDetail.less';

class CourseTeacherDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      isShow, // true——隐藏，false——显示
      detailConfig,
    } = this.props;
    console.log(isShow);
    // console.log(detailConfig);
    return (
      <Row
        gutter={24}
        className={classNames(styles.rowInfo, isShow ? styles.rowInfoSuccess : '')}
        // style={{display:currentStatus==='success'?'none':'block'}}
      >
        <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
          <SelfCard title="课程信息">
            <div className={styles.courseInfo}>
              <div className={styles.courseInfoImgContent}>
                <div className={styles.imgLeft}>
                  <img src={detailConfig.cover} alt="" />
                </div>
                <div className={styles.imgRight}>
                  <div className={styles.msgDetail}>
                    <span>课件名称：</span>
                    <span className={styles.msgDetailOverflow} title={detailConfig.name}>
                      {detailConfig.name}
                    </span>
                  </div>
                  <div className={styles.msgDetail}>
                    <span>适用对象：</span>
                    <span className={styles.msgDetailOverflow} title={detailConfig.applicable_user}>
                      {detailConfig.applicable_user}
                    </span>
                  </div>
                  <div className={styles.msgDetail}>
                    <span>课&emsp;&emsp;时：</span>
                    <span>{detailConfig.class_hour}</span>
                  </div>
                </div>
              </div>
              <div className={styles.courseInfoColumnContent}>
                <div className={styles.columnContentL}>
                  <div className={styles.msgDetail}>
                    <span>课件分类：</span>
                    <span>{detailConfig.category}</span>
                  </div>
                </div>
                <div className={styles.columnContentR}>
                  <div className={styles.msgDetail}>
                    <span>课件类型：</span>
                    <span>{detailConfig.courseware_type}</span>
                  </div>
                </div>
              </div>
              <div className={styles.courseInfoKJJS}>
                <span>课件介绍：</span>
                <span className={styles.courseInfoKJJSMsg}>{detailConfig.intruduce}</span>
              </div>
            </div>
          </SelfCard>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
          <SelfCard title="讲师信息">
            <div className={styles.teacherInfo}>
              <div className={styles.teacherInfoLeft}>
                <Avatar size={100} src={detailConfig.teacherimg} alt="老师头像" icon="user" />
              </div>
              <div className={styles.teacherInfoRight}>
                <div className={styles.msgDetail}>
                  <span>讲师姓名：</span>
                  <span>{detailConfig.teachername}</span>
                </div>
                <div className={styles.teacherInfoJSJS}>
                  <span>讲师介绍：</span>
                  <span className={styles.teacherInfoJSJSMsg}>{detailConfig.teacherdesc}</span>
                </div>
              </div>
            </div>
          </SelfCard>
        </Col>
      </Row>
    );
  }
}

export default CourseTeacherDetail;
