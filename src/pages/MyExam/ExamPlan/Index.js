import React, { Component } from 'react';
import { Card, List, Tabs, Button } from 'antd';
// import router from 'umi/router';
import Link from 'umi/link';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ExamBasicInfo from '@/components/ExamBasicInfo';
import styles from './index.less';

import noDataTips4 from '@/assets/images/Workbench/004.png';

const { TabPane } = Tabs;

@connect(({ MyExam, loading }) => ({
  todoes: MyExam.todoes,
  completedes: MyExam.completedes,
  overdues: MyExam.overdues,
  loading: loading.effects['MyExam/getExamProgress'], // 学习计划管理——>主页，获取所有的学习计划
}))
class MyExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'notcompleted',
      noDataTips: {
        stuToDo: {
          imgSrc: noDataTips4,
          title: '没有待完成考试',
        },
        stuDone: {
          imgSrc: noDataTips4,
          title: '没有已完成考试',
        },
        stuOverdue: {
          imgSrc: noDataTips4,
          title: '没有已逾期考试',
        },
      },
      paginationCompleted: {
        // 表格分页信息
        // total:20,// 数据总数
        current: 1, // 当前页数
        pageSize: 10, // 每页条数
        pageSizeOptions: ['10', '20', '30', '40'], // 指定每页可以显示多少条数据
        showQuickJumper: true, // 是否可以快速跳转至某页
        showSizeChanger: true, // 是否可以改变 pageSize
      },
      paginationOverdu: {
        // 表格分页信息
        // total:20,// 数据总数
        current: 1, // 当前页数
        pageSize: 10, // 每页条数
        pageSizeOptions: ['10', '20', '30', '40'], // 指定每页可以显示多少条数据
        showQuickJumper: true, // 是否可以快速跳转至某页
        showSizeChanger: true, // 是否可以改变 pageSize
      },
      paginationNotCompleted: {
        // 表格分页信息
        // total:20,// 数据总数
        current: 1, // 当前页数
        pageSize: 10, // 每页条数
        pageSizeOptions: ['10', '20', '30', '40'], // 指定每页可以显示多少条数据
        showQuickJumper: true, // 是否可以快速跳转至某页
        showSizeChanger: true, // 是否可以改变 pageSize
      },
    };
  }

  // 页面加载完成后
  componentDidMount() {
    // 默认是获取第一页数据
    const { paginationNotCompleted, paginationCompleted, paginationOverdu } = this.state;
    this.getListData(
      paginationNotCompleted.current,
      paginationNotCompleted.pageSize,
      'notcompleted'
    );
    this.getListData(paginationCompleted.current, paginationCompleted.pageSize, 'completed');
    this.getListData(paginationOverdu.current, paginationOverdu.pageSize, 'overdue');
  }

  // 获取table表格数据(指定页码，指定每页条数)
  getListData = (page, size, status) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'MyExam/getExamProgress',
      payload: {
        page, // 页码
        size, // 每页条数
        status,
      },
    });
  };

  // 分页、排序、筛选变化时触发。这边只有分页功能，没有排序和筛选
  handlePageChange = (_current, _pageSize) => {
    const { paginationNotCompleted, paginationCompleted, paginationOverdu, status } = this.state;

    if (status === 'notcompleted') {
      this.setState({
        paginationNotCompleted: {
          ...paginationNotCompleted,
          current: _current,
          pageSize: _pageSize,
        },
      });
    }
    if (status === 'completed') {
      this.setState({
        paginationCompleted: {
          ...paginationCompleted,
          current: _current,
          pageSize: _pageSize,
        },
      });
    }
    if (status === 'overdue') {
      this.setState({
        paginationOverdu: {
          ...paginationOverdu,
          current: _current,
          pageSize: _pageSize,
        },
      });
    }
    this.getListData(_current, _pageSize, status);
  };

  handChangeTab = activeKey => {
    this.setState({ status: activeKey });
  };

  buttonText = status => {
    if (status === 'notcompleted') {
      return '开始考试';
    }
    if (status === 'completed') {
      return '再考一次';
    }
    return '无法参加';
  };

  render() {
    const { todoes, completedes, overdues, loading } = this.props;
    const {
      paginationNotCompleted,
      paginationCompleted,
      paginationOverdu,
      noDataTips,
    } = this.state;
    const tpaginationNotCompleted = {
      ...paginationNotCompleted,
      total: todoes.count,
      showTotal: total => `共 ${total} 条记录`,
      onChange: this.handlePageChange,
    };
    const tpaginationCompleted = {
      ...paginationCompleted,
      total: completedes.count,
      showTotal: total => `共 ${total} 条记录`,
      onChange: this.handlePageChange,
    };
    const tpaginationOverdu = {
      ...paginationOverdu,
      total: overdues.count,
      showTotal: total => `共 ${total} 条记录`,
      onChange: this.handlePageChange,
    };
    // 循环Table数据，添加key
    const dataSourcetodo = todoes.results.map(value => Object.assign({}, value, { key: value.id }));
    const dataSourcecompletedes = completedes.results.map(value =>
      Object.assign({}, value, { key: value.id })
    );
    const dataSourceoverdues = overdues.results.map(value =>
      Object.assign({}, value, { key: value.id })
    );
    return (
      <PageHeaderWrapper title="我参加的考试">
        <Card className={styles.stuFinishCard}>
          <Tabs animated={false} defaultActiveKey="notcompleted" onChange={this.handChangeTab}>
            <TabPane tab="待参加" key="notcompleted">
              <List
                loading={loading}
                dataSource={dataSourcetodo}
                pagination={tpaginationNotCompleted}
                locale={{
                  emptyText: (
                    <div className={styles.noDataTips}>
                      <img src={noDataTips.stuToDo.imgSrc} alt="待参加" />
                      <span>{noDataTips.stuToDo.title}</span>
                    </div>
                  ),
                }}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <Link to={`/myExam/onlineExam/${item.id}`}>
                        <Button type="danger">开始考试</Button>
                      </Link>,
                    ]}
                  >
                    <ExamBasicInfo ExamInfo={item.plan.exampaper} noCard />
                  </List.Item>
                )}
              />
            </TabPane>
            <TabPane tab="已完成" key="completed">
              <List
                loading={loading}
                dataSource={dataSourcecompletedes}
                pagination={tpaginationCompleted}
                locale={{
                  emptyText: (
                    <div className={styles.noDataTips}>
                      <img src={noDataTips.stuDone.imgSrc} alt="已完成" />
                      <span>{noDataTips.stuDone.title}</span>
                    </div>
                  ),
                }}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <Link to={`/myExam/onlineExam/${item.id}`}>
                        <Button type="primary">再考一次</Button>
                      </Link>,
                    ]}
                  >
                    <ExamBasicInfo ExamInfo={item.plan.exampaper} noCard />
                  </List.Item>
                )}
              />
            </TabPane>
            <TabPane tab="已逾期" key="overdue">
              <List
                loading={loading}
                dataSource={dataSourceoverdues}
                pagination={tpaginationOverdu}
                locale={{
                  emptyText: (
                    <div className={styles.noDataTips}>
                      <img src={noDataTips.stuOverdue.imgSrc} alt="已逾期" />
                      <span>{noDataTips.stuOverdue.title}</span>
                    </div>
                  ),
                }}
                renderItem={item => (
                  <List.Item
                    actions={[
                      // <Link>
                      <Button type="danger " disabled>
                        无法参加
                      </Button>,
                      // </Link>,
                    ]}
                  >
                    <ExamBasicInfo ExamInfo={item.plan.exampaper} noCard />
                  </List.Item>
                )}
              />
            </TabPane>
          </Tabs>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default MyExam;
