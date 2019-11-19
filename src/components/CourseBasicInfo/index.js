import React, { PureComponent } from 'react';
import { Row, Col, Avatar } from 'antd';
import SelfCard from '@/components/Workbench/selfCard';
import classNames from 'classnames';
import styles from './index.less';

class CourseBasicInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      courserTeacherInfo: {},
    };
  }

  // 页面加载完成后
  componentDidMount() {
    const { CousreInfo } = this.props;
    if (CousreInfo) {
      this.setState({
        courserTeacherInfo: CousreInfo,
      });
    } else {
      this.getCourseTeacherInfo();
    }
  }

  static getDerivedStateFromProps(nextProps) {
    // clean state
    if (nextProps.CousreInfo) {
      return {
        courserTeacherInfo: nextProps.CousreInfo,
      };
    }
    return null;
  }

  // 获取课程信息、讲师信息
  getCourseTeacherInfo = () => {
    const { dispatch, courseid, action } = this.props;
    dispatch({
      type: action,
      payload: {
        id: courseid, // id
      },
      callback: res => {
        if (res && res.status === 'ok') {
          console.log('请求成功');
          this.setState({
            courserTeacherInfo: res.data,
          });
        } else {
          console.log('请求失败');
        }
      },
    });
  };

  render() {
    const {
      isShow, // true——隐藏，false——显示
    } = this.props;
    const { courserTeacherInfo } = this.state;
    // console.log(courserTeacherInfo);
    return (
      <Row
        gutter={24}
        className={classNames(styles.rowInfo, isShow ? styles.rowInfoSuccess : '')}
        style={{ display: isShow ? 'none' : 'block' }}
      >
        <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
          <SelfCard title="课程信息">
            <div className={styles.courseInfo}>
              <div className={styles.courseInfoImgContent}>
                <div className={styles.imgLeft}>
                  <img src={courserTeacherInfo.cover} alt="" />
                </div>
                <div className={styles.imgRight}>
                  <div className={styles.msgDetail}>
                    <span>课件编号：</span>
                    <span
                      className={styles.msgDetailOverflow}
                      title={courserTeacherInfo.courseware_no}
                    >
                      {courserTeacherInfo.courseware_no}
                    </span>
                  </div>
                  <div className={styles.msgDetail}>
                    <span>课件名称：</span>
                    <span className={styles.msgDetailOverflow} title={courserTeacherInfo.name}>
                      {courserTeacherInfo.name}
                    </span>
                  </div>
                  <div className={styles.msgDetail}>
                    <span>课&emsp;&emsp;时：</span>
                    <span>{`${Number(courserTeacherInfo.class_hour)}小时`}</span>
                  </div>
                </div>
              </div>
            </div>
          </SelfCard>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
          <SelfCard title="讲师信息">
            <div className={styles.teacherInfo}>
              <div className={styles.teacherInfoLeft}>
                <Avatar size={100} src={courserTeacherInfo.teacherimg} alt="老师头像" icon="user" />
              </div>
              <div className={styles.teacherInfoRight}>
                <div className={styles.msgDetail}>
                  <span>讲师姓名：</span>
                  <span>{courserTeacherInfo.teachername}</span>
                </div>
                <div className={styles.teacherInfoJSJS}>
                  <span>讲师介绍：</span>
                  <span className={styles.teacherInfoJSJSMsg}>
                    {courserTeacherInfo.teacherdesc}
                  </span>
                </div>
              </div>
            </div>
          </SelfCard>
        </Col>
      </Row>
    );
  }
}

export default CourseBasicInfo;
