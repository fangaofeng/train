import React, { PureComponent } from 'react';
import { Row, Col, message, Descriptions } from 'antd';
import SelfCard from '@/components/Workbench/selfCard';
import SelfItemCardImg from '@/components/Workbench/selfItemCardImg';
// import classNames from 'classnames';
// import styles from './index.less';

class CourseBasicInfo extends PureComponent {
  constructor(props) {
    super(props);
    const { CousreInfo } = this.props;
    this.state = {
      courserTeacherInfo: CousreInfo,
    };
  }

  // 页面加载完成后
  componentDidMount() {
    const { CousreInfo } = this.props;

    if (CousreInfo) {
      // console.log('sdasd', CousreInfo);
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
          this.setState({
            courserTeacherInfo: res.data,
          });
        } else {
          message.warning('获取课程信息失败');
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
      <Row gutter={24} type="flex" style={{ display: isShow ? 'none' : '' }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12} style={{ display: 'flex' }}>
          <SelfCard title="课程信息">
            <Row gutter={24}>
              <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                <SelfItemCardImg imgSrc={courserTeacherInfo.cover} />
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={16}>
                {' '}
                <Descriptions column={1}>
                  <Descriptions.Item label="课件编号">
                    {' '}
                    {courserTeacherInfo.courseware_no}
                  </Descriptions.Item>
                  <Descriptions.Item label="课件名称">{courserTeacherInfo.name}</Descriptions.Item>
                  <Descriptions.Item label="课&emsp;&emsp;时">{`${Number(
                    courserTeacherInfo.class_hour
                  )}小时`}</Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </SelfCard>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12} style={{ display: 'flex' }}>
          <SelfCard title="讲师信息">
            <Row gutter={24}>
              <Col xs={24} sm={24} md={12} lg={4}>
                <SelfItemCardImg imgSrc={courserTeacherInfo.teacherimg} />
              </Col>
              <Col xs={24} sm={24} md={12} lg={20}>
                {' '}
                <Descriptions column={1}>
                  <Descriptions.Item label="讲师姓名">
                    {' '}
                    {courserTeacherInfo.teachername}
                  </Descriptions.Item>
                  <Descriptions.Item label="讲师介绍">
                    {courserTeacherInfo.teacherdesc}
                  </Descriptions.Item>
                  <Descriptions.Item label=""></Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </SelfCard>
        </Col>
      </Row>
    );
  }
}

export default CourseBasicInfo;
