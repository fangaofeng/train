import React, { PureComponent } from 'react';
import { Row, Col, Divider } from 'antd';
import SelfCard from '@/components/Workbench/selfCard';
import classNames from 'classnames';
import styles from './index.less';

class ExamBasicInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { currentTestInfo: {} };
  }

  // 页面加载完成后
  componentDidMount() {
    const { ExamInfo } = this.props;
    if (ExamInfo) {
      this.setState({
        currentTestInfo: ExamInfo,
      });
    } else {
      this.getTestPapersInfo();
    }
  }

  static getDerivedStateFromProps(nextProps) {
    // clean state
    if (nextProps.ExamInfo) {
      return {
        currentTestInfo: nextProps.ExamInfo,
      };
    }
    return null;
  }

  // 获取试卷信息
  getTestPapersInfo = () => {
    console.log(this.props);
    const { dispatch, id, action } = this.props;
    dispatch({
      type: action,
      payload: {
        id,
      },
      callback: res => {
        if (res && res.status === 'ok') {
          console.log('请求成功');
          this.setState({
            currentTestInfo: res.data,
          });
        } else {
          console.log('请求失败');
        }
      },
    });
  };

  render() {
    const {
      isShow,
      noCard, // true——隐藏，false——显示
    } = this.props;
    const { currentTestInfo } = this.state;
    const info = (
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={16}>
          <div className={styles.leftContent}>
            <div className={styles.imgLeft}>
              <img src={currentTestInfo.cover} alt="" />
            </div>
            <div className={styles.imgRight}>
              <div className={styles.msgDetail}>
                <span>试卷名称：</span>
                <span className={styles.msgDetailOverflow} title={currentTestInfo.name}>
                  {currentTestInfo.name}
                </span>
              </div>
              <div className={styles.msgDetail}>
                <span>适用对象：</span>
                <span className={styles.msgDetailOverflow} title={currentTestInfo.applicable_user}>
                  {currentTestInfo.applicable_user}
                </span>
              </div>
              <div>
                <span>
                  试卷总分：
                  {currentTestInfo.total_score}分
                </span>
                <Divider type="vertical" />
                <span>
                  合格分数：
                  {currentTestInfo.passing_score}分
                </span>
                <div className={styles.msgDetail}>
                  <span>
                    考试时长：
                    {currentTestInfo.duration}
                    分钟
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={8}>
          <div className={styles.rightContent}>
            <div className={styles.introduceName}>试卷介绍：</div>
            <div className={styles.introduceInfo}>{currentTestInfo.introduce}</div>
          </div>
        </Col>
      </Row>
    );
    if (noCard) {
      return (
        <div
          className={classNames(styles.examInfoContent, isShow ? styles.hiddenExamInfoContent : '')}
        >
          {info}
        </div>
      );
    }

    return (
      <div
        className={classNames(styles.examInfoContent, isShow ? styles.hiddenExamInfoContent : '')}
      >
        <SelfCard title="试卷信息">{info}</SelfCard>
      </div>
    );
  }
}

export default ExamBasicInfo;
