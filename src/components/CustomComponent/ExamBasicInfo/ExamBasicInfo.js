import React, { Component } from 'react';
import { Row, Col, Divider, Spin } from 'antd';
import SelfCard from '@/components/Workbench/selfCard';
import classNames from 'classnames';
import styles from './ExamBasicInfo.less';

class ExamBasicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      isShow, // true——隐藏，false——显示
      detailConfig,
      loading,
    } = this.props;
    // console.log(isShow);
    // console.log(detailConfig);
    return (
      <div
        className={classNames(styles.examInfoContent, isShow ? styles.hiddenExamInfoContent : '')}
      >
        <SelfCard title="试卷信息">
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={14}>
              <div className={styles.leftContent}>
                <div className={styles.imgLeft}>
                  <img src={detailConfig.cover} alt="" />
                </div>
                <div className={styles.imgRight}>
                  <div className={styles.msgDetail}>
                    <span>试卷名称：</span>
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
                  <div>
                    <span>
                      试卷总分：
                      {detailConfig.total_score}分
                    </span>
                    <Divider type="vertical" />
                    <span>
                      合格分数：
                      {detailConfig.passing_score}分
                    </span>
                    <Divider type="vertical" />
                    <span>
                      考试时长：
                      {detailConfig.duration}
                      分钟
                    </span>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10}>
              <div className={styles.rightContent}>
                <div className={styles.introduceName}>试卷介绍：</div>
                <div className={styles.introduceInfo}>{detailConfig.introduce}</div>
              </div>
            </Col>
          </Row>
        </SelfCard>
      </div>
    );
  }
}

export default ExamBasicInfo;
