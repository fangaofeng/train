import React, { PureComponent } from 'react';
import { Descriptions } from 'antd';
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
      <div className={styles.leftContent}>
        <div className={styles.imgLeft}>
          <img src={currentTestInfo.cover} alt="" />
        </div>
        <div className={styles.imgRight}>
          <Descriptions>
            <Descriptions.Item label="试卷名称">{currentTestInfo.name}</Descriptions.Item>
            <Descriptions.Item label="适用对象">
              {currentTestInfo.applicable_user}
            </Descriptions.Item>

            <Descriptions.Item label="考试时长">
              {currentTestInfo.duration}
              分钟
            </Descriptions.Item>
            <Descriptions.Item label="试卷总分">{currentTestInfo.total_score}分</Descriptions.Item>
            <Descriptions.Item label="合格分数">
              {currentTestInfo.passing_score}分
            </Descriptions.Item>
            <Descriptions.Item label="合格分数">
              {currentTestInfo.passing_score}分
            </Descriptions.Item>
          </Descriptions>
          <Descriptions>
            <Descriptions.Item label="试卷介绍">{currentTestInfo.introduce}</Descriptions.Item>
          </Descriptions>
        </div>
      </div>
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
