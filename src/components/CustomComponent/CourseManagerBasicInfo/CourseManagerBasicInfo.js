import React, { Component } from 'react'
import { Row , Col , Avatar } from 'antd';
import SelfCard from '@/components/Workbench/selfCard';
import classNames from 'classnames';
import styles from './CourseManagerBasicInfo.less';

class CourseManagerBasicInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
          isShow,// true——隐藏，false——显示
          detailConfig
        } = this.props;
        console.log(isShow);
        console.log(detailConfig);
        return (
          <Row
            gutter={24}
            className={classNames(styles.rowInfo,isShow?styles.rowInfoSuccess:'')}
            // style={{display:currentStatus==='success'?'none':'block'}}
          >
            <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
              <SelfCard title='课程信息'>
                <div className={styles.courseInfo}>
                  <div className={styles.courseInfoImgContent}>
                    <div className={styles.imgLeft}>
                      <img src={detailConfig.cover} alt="" />
                    </div>
                    <div className={styles.imgRight}>
                      <div className={styles.msgDetail}><span>课件编号：</span><span className={styles.msgDetailOverflow} title={detailConfig.courseware_no}>{detailConfig.courseware_no}</span></div>
                      <div className={styles.msgDetail}><span>课件名称：</span><span className={styles.msgDetailOverflow} title={detailConfig.name}>{detailConfig.name}</span></div>
                      <div className={styles.msgDetail}><span>课&emsp;&emsp;时：</span><span>{detailConfig.class_hour}</span></div>  
                    </div>
                  </div>
                </div>
              </SelfCard>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
              <SelfCard title='讲师信息'>
                <div className={styles.teacherInfo}>
                  <div className={styles.teacherInfoLeft}>
                    <Avatar size={100} src={detailConfig.teacherimg} alt="老师头像" icon='user' />
                  </div>
                  <div className={styles.teacherInfoRight}>
                    <div className={styles.msgDetail}><span>讲师姓名：</span><span>{detailConfig.teachername}</span></div>
                    <div className={styles.teacherInfoJSJS}><span>讲师介绍：</span><span className={styles.teacherInfoJSJSMsg}>{detailConfig.teacherdesc}</span></div>
                  </div>
                </div>
              </SelfCard>
            </Col>
          </Row>
        );
    }
}

export default CourseManagerBasicInfo;