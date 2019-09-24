import React, { Component, Fragment } from 'react';
import { Card, Button, Row, Col, Spin } from 'antd';
import router from 'umi/router';
// import Link from 'umi/link';
import { connect } from 'dva';
import styles from './Login.less';

@connect(({ loading }) => ({ loading: loading.effects['onlineExam/GetOnlineExamBasicInfo'] }))
class OnlineExamLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseInfo: {
        // 存放考试相关信息
        examName: '',
        cover: '',
        introduce: '',
        applicablePerson: '',
        duration: '',
        score: '',
        passScore: '',
      },
    };
  }

  componentDidMount() {
    const {
      match: { params },
      dispatch,
    } = this.props;
    const { id } = params;
    dispatch({
      type: 'onlineExam/GetOnlineExamBasicInfo',
      payload: {
        id,
      },
      callback: res => {
        if (res.status === 'ok') {
          console.log('请求成功', res.data);
          const {
            status,
            start_time,
            end_time,
            score,
            days_remaining,
            plan,
            plan: { exampaper },
          } = res.data;
          this.setState({
            // baseInfo:res.data,
            baseInfo: {
              examName: plan.exam_name,
              cover: exampaper.cover,
              introduce: exampaper.introduce,
              duration: exampaper.duration,
              score: exampaper.total_score,
              passScore: exampaper.passing_score,
            },
          });
        } else {
          console.log('请求失败');
        }
      },
    });
  }

  // 进入考试
  startExam = () => {
    const {
      match: { params },
    } = this.props;
    const { id } = params;
    router.push(`/myExam/onlineExam/answer/${id}`);
  };

  render() {
    const { baseInfo } = this.state;
    const { loading } = this.props;
    return (
      <Spin spinning={loading}>
        <Fragment>
          <Row>
            <Col
              xs={24}
              sm={{ span: 20, offset: 2 }}
              md={{ span: 18, offset: 3 }}
              lg={{ span: 16, offset: 4 }}
              xl={{ span: 16, offset: 4 }}
              xxl={{ span: 12, offset: 6 }}
            >
              <Card bordered={false} className={styles.loginContent}>
                <Row>
                  <Col
                    xs={24}
                    sm={24}
                    md={{ span: 22, offset: 1 }}
                    lg={{ span: 20, offset: 2 }}
                    xl={{ span: 16, offset: 4 }}
                    xxl={{ span: 18, offset: 3 }}
                  >
                    <div className={styles.baseInfoContent}>
                      <h2>{baseInfo.examName}</h2>
                      <div>
                        <img src={baseInfo.cover} alt="" />
                      </div>
                      <h3>考试说明</h3>
                      <ul>
                        <li>
                          <span>试卷介绍：</span>
                          <span>{baseInfo.introduce}</span>
                        </li>
                        {/* <li>
                        <span>适用对象：</span>
                        <span>{baseInfo.applicablePerson}</span>
                      </li> */}
                        <li>
                          <span>考试时长：</span>
                          <span>
                            {baseInfo.duration}
                            分钟
                          </span>
                        </li>
                        <li>
                          <span>试卷总分：</span>
                          <span>{baseInfo.score}分</span>
                        </li>
                        <li>
                          <span>合格分数：</span>
                          <span>{baseInfo.passScore}分</span>
                        </li>
                      </ul>
                      <p>如果考试异常中断，请联系培训管理员处理</p>
                      <Button type="primary" block onClick={this.startExam}>
                        进入考试
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Fragment>
      </Spin>
    );
  }
}

export default OnlineExamLogin;
