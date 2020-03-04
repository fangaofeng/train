import React, { Component } from 'react';
import { Prompt } from 'react-router-dom';
import { connect } from 'dva';
import { Card, Button, List, Modal, Icon, Statistic } from 'antd';
import classNames from 'classnames';

import Question from '@/components/Question';
import router from 'umi/router';

import styles from './Answer.less';

const { Countdown } = Statistic;

@connect(({ onlineExam, loading }) => ({
  questions: onlineExam.questions,
  count: onlineExam.count,
  loading: loading.effects['onlineExam/GetExamQuestions'], // 学习计划管理——>主页，获取所有的学习计划
}))
class OnlineExamAnswer extends Component {
  constructor(props) {
    super(props);
    const { questions, count } = props;
    this.state = {
      deadline: Date.now() + 60 * 1000 * 60,
      visible: false,
      submitSuccess: false,
      score: 0,
      // 所有问题list
      allSortQuestionAnswers: questions.map(v => {
        const x = v;
        x.answer = '';
        return x;
      }),
      pagination: {
        // 表格分页信息
        total: count, // 数据总数
        current: 1, // 当前页数
        pageSize: 1, // 每页条数
        pageSizeOptions: ['1', '2', '3', '4'], // 指定每页可以显示多少条数据
        showQuickJumper: false, // 是否可以快速跳转至某页
        showSizeChanger: false, // 是否可以改变 pageSize
      },
    };
  }

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    const { id } = params;
    this.getQuestions(-1, -1, id);
  }

  componentDidUpdate(perProps) {
    const { count, questions } = this.props;
    if (count !== perProps.count) {
      this.initAnswers(count, questions);
    }
  }

  initAnswers = (count, questions) => {
    this.setState({
      allSortQuestionAnswers: questions.map(v => {
        const x = v;
        x.answer = '';
        return x;
      }),
      pagination: {
        // 表格分页信息
        total: count, // 数据总数
        current: 1, // 当前页数
        pageSize: 1, // 每页条数
        pageSizeOptions: ['1', '2', '3', '4'], // 指定每页可以显示多少条数据
        showQuickJumper: false, // 是否可以快速跳转至某页
        showSizeChanger: false, // 是否可以改变 pageSize
      },
    });
  };

  getQuestions = (page, size, examid) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'onlineExam/GetExamQuestions',
      payload: {
        id: examid,
        // page,
        // size,
      },
    });
  };

  getCurrentQuestions = (page, size) => {
    const {
      allSortQuestionAnswers,
      pagination: { total },
    } = this.state;

    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size > total ? total - 1 : startIndex + size;
    // console.log(page, startIndex, endIndex, total);
    return allSortQuestionAnswers.slice(startIndex, endIndex);
  };

  setCurrentAnswer = (index, content) => {
    const { allSortQuestionAnswers } = this.state;
    allSortQuestionAnswers[index - 1].answer = content;
    this.setState(allSortQuestionAnswers);
  };

  // 发送当前试题答题情况，获取目标试题（可以是上一题、下一题、或者任意一题）
  onChangeQuestion = (_current, _pageSize) => {
    // const {
    //   match: { params },
    // } = this.props;
    // const { id } = params;
    const { pagination } = this.state;
    this.setState({
      pagination: {
        ...pagination,
        current: _current,
        pageSize: _pageSize,
      },
    });
    this.getCurrentQuestions(_current, _pageSize);
  };

  itemRender = (current, type, originalElement) => {
    // console.log(originalElement);
    if (type === 'prev') {
      return <a>上一题</a>;
    }
    if (type === 'next') {
      return <a>下一题</a>;
    }
    return originalElement;
  };

  submitExam = () => {
    const { allSortQuestionAnswers } = this.state;
    const answers = allSortQuestionAnswers.map((v, index) => {
      const x = { answer: v.answer, index, id: v.id };
      return x;
    });

    const {
      dispatch,
      match: { params },
    } = this.props;
    const { id } = params;
    dispatch({
      type: 'onlineExam/SubmitExam',
      payload: {
        id,
        data: { answers, status: 'completed' },
      },
      callback: res => {
        this.setState({
          visible: true,
          score: res.data.score,
        });
        if (res && res.status === 'ok') {
          // console.log('请求成功');
          this.setState({ submitSuccess: true });
        } else {
          // console.log('请求失败');
          this.setState({ submitSuccess: false });
        }
      },
    });
  };

  // 取消提交（关闭模态框）
  handleCancel = () => {
    // console.log('取消按钮');
    this.setState({
      visible: false,
    });
  };

  // 确定归档（归档成功后关闭模态框）
  handleOk = () => {
    router.push('/myExam/examPlan');
  };

  render() {
    const { count, loading } = this.props;

    const {
      // 下一题id
      allSortQuestionAnswers,
      visible,
      score,
      submitSuccess,
      pagination,
      pagination: { current, pageSize },
      deadline, // 所有问题list
    } = this.state;
    const tpagination = {
      ...pagination,
      simple: true,
      total: count,
      itemRender: this.itemRender,
      showTotal: total => `共 ${total} 条题目`,
      onChange: this.onChangeQuestion,
    };

    const questions = this.getCurrentQuestions(current, pageSize);
    // console.log('questions', questions);
    return (
      <div className={styles.onlineAnswerContent}>
        {submitSuccess ? '' : <Prompt when message="你确定要离开当前页面吗？" />}
        <Card className={classNames(styles.leftContent, styles.commonCardContent)}>
          <List
            loading={loading}
            dataSource={questions}
            pagination={tpagination}
            locale={{
              emptyText: (
                <div className={styles.noDataTips}>
                  {/* <img src={noDataTips.stuToDo.imgSrc} alt="待参加" />
                  <span>{noDataTips.stuToDo.title}</span> */}
                </div>
              ),
            }}
            renderItem={item => (
              <List.Item>
                <Question
                  question={item}
                  index={current}
                  setCurrentAnswer={this.setCurrentAnswer}
                />
              </List.Item>
            )}
          />
        </Card>
        <Card className={classNames(styles.rightContent, styles.commonCardContent)}>
          <div className={styles.rightContentTop}>
            <div className={styles.leftTime}>
              剩余时间：
              <Countdown title="Countdown" value={deadline} onFinish={this.submitExam} />
            </div>
            <div className={styles.questionOrderContent}>
              <div className={styles.questionOrderContentTop}>答题卡</div>
              <ul>
                {allSortQuestionAnswers.map(v => (
                  <li
                    className={v.answer !== '' ? styles.seleted : ''}
                    key={v.order}
                    onClick={() => {
                      this.onChangeQuestion(v.order, pageSize);
                    }}
                  >
                    {v.order}
                  </li>
                ))}
              </ul>
              <div className={styles.questionOrderContentBottom}>
                <span className={styles.hasSeletedSimple}>
                  <span />
                  已做
                </span>
                <span className={styles.notSeletedSimple}>
                  <span />
                  未做
                </span>
              </div>
            </div>
          </div>
          <div className={styles.rightContentBottom}>
            <Button
              type="primary"
              block
              onClick={() => {
                this.submitExam();
              }}
            >
              交卷
            </Button>
            <p>注意：考试过程如有疑问，请联系培训管理员。</p>
            <div>
              <div>培训管理员：石娜</div>
              <div>工号：201801000526，联系电话：122323232 </div>
            </div>
          </div>
        </Card>
        <Modal
          visible={visible}
          title="归档考试计划"
          style={{ top: 150 }}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={
            submitSuccess ? (
              <div style={{ textAlign: 'center' }}>
                <Button type="primary" onClick={this.handleOk}>
                  {' '}
                  离开
                </Button>

                <Button onClick={this.handleCancel}>返回</Button>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <Button onClick={this.handleCancel}>返回</Button>
              </div>
            )
          }
        >
          <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
            <Icon
              type="exclamation-circle"
              theme="filled"
              style={{ color: '#faad14', fontSize: '24px', marginRight: '15px' }}
            />
            <div>
              {submitSuccess ? (
                <div>
                  提交成功，你本次考试成绩是
                  {score}分
                </div>
              ) : (
                <div>提交失败，请返回重新提交</div>
              )}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default OnlineExamAnswer;
