import React, { Component } from 'react';
import { Card, Modal, Table, Divider, Icon, Button, Input, message } from 'antd';
// import router from 'umi/router';
import Link from 'umi/link';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Index.less';

const { Search } = Input;

@connect(({ ExamPlanManager, loading }) => ({
  allExamPlanData: ExamPlanManager.allExamPlanData, // 考试计划管理——>主页，获取所有的考试计划
  examplansLoading: loading.effects['ExamPlanManager/GetExamPlanList'],
}))
class ExamPlanManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false, // 是否显示归档操作的模态框
      confirmLoading: false, // 确定按钮 loading
      fileOnArchiveID: null, // 需要归档的文件id
      pagination: {
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
    const {
      pagination: { current, pageSize },
    } = this.state;
    this.getTableData(current, pageSize);
  }

  // 获取table表格数据(指定页码，指定每页条数)
  getTableData = (page, size) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'ExamPlanManager/GetExamPlanList',
      payload: {
        page, // 页码
        size, // 每页条数
      },
    });
  };

  // 分页、排序、筛选变化时触发。这边只有分页功能，没有排序和筛选
  handleTableChange = _pagination_ => {
    // console.log('-------------------');
    // console.log(_pagination_);
    // console.log('-------------------');
    const { pagination } = this.state;
    const { current, pageSize } = _pagination_;
    this.setState({
      pagination: {
        ...pagination,
        current,
        pageSize,
      },
    });
    this.getTableData(current, pageSize);
  };

  // 归档操作
  fileOnArchive = record => {
    console.log(record.id);
    this.setState({
      visible: true,
      confirmLoading: false,
      fileOnArchiveID: record.id,
    });
  };

  // 取消归档（关闭模态框）
  handleCancel = () => {
    console.log('取消按钮');
    this.setState({
      visible: false,
      confirmLoading: false,
      fileOnArchiveID: null,
    });
  };

  // 确定归档（归档成功后关闭模态框）
  handleOk = () => {
    const {
      pagination: { current, pageSize },
    } = this.state;
    const { fileOnArchiveID } = this.state;
    console.log('id', fileOnArchiveID);
    this.setState({
      confirmLoading: true,
    });

    const { dispatch } = this.props;
    dispatch({
      type: 'ExamPlanManager/FileOnArchive',
      payload: {
        id: fileOnArchiveID,
      },
      callback: res => {
        if (res.status === 'ok') {
          message.success('归档成功');
          this.setState({
            visible: false,
            confirmLoading: false,
            fileOnArchiveID: null,
          });
          this.getTableData(current, pageSize);
        } else {
          message.warning('归档失败');
          this.setState({
            confirmLoading: false,
          });
        }
      },
    });
  };

  render() {
    const { allExamPlanData, examplansLoading } = this.props;
    const { pagination, visible, confirmLoading } = this.state;
    const pageConifg = {
      ...pagination,
      total: allExamPlanData.count,
      showTotal: total => `共 ${total} 条记录`,
    };
    // 循环Table数据，添加key
    const dataSource = allExamPlanData.results.map(value => Object.assign({}, value, { key: value.id }));

    const columns = [
      {
        title: '考试名称',
        dataIndex: 'ExamPlanManager_planName',
        key: 'ExamPlanManager_planName',
        render: (text, record) => <span>{record.name}</span>,
      },
      {
        title: '试卷名称',
        dataIndex: 'ExamPlanManager_examName',
        key: 'ExamPlanManager_examName',
        render: (text, record) => <span>{record.exam_name}</span>,
      },
      {
        title: '考试开始时间',
        dataIndex: 'ExamPlanManager_startTime',
        key: 'ExamPlanManager_startTime',
        render: (text, record) => <span>{record.start_time}</span>,
      },
      {
        title: '考试结束时间',
        dataIndex: 'ExamPlanManager_endTime',
        key: 'ExamPlanManager_endTime',
        render: (text, record) => <span>{record.end_time}</span>,
      },
      {
        title: '状态',
        dataIndex: 'ExamPlanManager_planStatus',
        key: 'ExamPlanManager_planStatus',
        render: (text, record) => <span>{record.status}</span>,
      },
      {
        title: (
          <div>
            <span>完成比例</span>
            <br />
            <span>（完成人数/参加人数）</span>
          </div>
        ),
        align: 'center',
        dataIndex: 'ExamPlanManager_finishedNum',
        key: 'ExamPlanManager_finishedNum',
        render: (text, record) => <span>{record.ratio}</span>,
      },
      {
        title: (
          <div>
            <span>合格比例</span>
            <br />
            <span>（合格人数/参加人数）</span>
          </div>
        ),
        align: 'center',
        dataIndex: 'ExamPlanManager_passratio',
        key: 'ExamPlanManager_passratio',
        render: (text, record) => <span>{record.pass_ration}</span>,
      },

      {
        title: '操作',
        dataIndex: 'ExamPlanManager_opt',
        key: 'ExamPlanManager_opt',
        render: (text, record) => {
          let dom;
          if (record.status === '已完成') {
            dom = (
              <span>
                <Link to={`/ExamPlan/ExamPlanManager/view/${record.id}`}>查看</Link>
                <Divider type="vertical" />
                <a onClick={() => this.fileOnArchive(record)}>归档</a>
              </span>
            );
          } else if (record.status === '已归档') {
            dom = (
              <span>
                <a disabled>归档后禁止操作</a>
              </span>
            );
          } else if (record.status === '已指派' || record.status === '考试中') {
            dom = (
              <span>
                <Link to={`/ExamPlan/ExamPlanManager/edit/${record.id}`}>编辑</Link>
                <Divider type="vertical" />
                <Link to={`/ExamPlan/ExamPlanManager/view/${record.id}`}>查看</Link>
              </span>
            );
          }
          return dom;
        },
      },
    ];

    return (
      <PageHeaderWrapper title="考试计划管理">
        <Card className={styles.ExamPlanManagerContent}>
          <div className={styles.searchContent}>
            <div className="">
              <Search
                placeholder="输入计划名称过滤"
                onSearch={value => console.log(value)}
                style={{ width: 300 }}
              />
            </div>
          </div>
          <Table
            loading={examplansLoading}
            dataSource={dataSource}
            columns={columns}
            pagination={pageConifg}
            onChange={this.handleTableChange}
          />
        </Card>
        <Modal
          visible={visible}
          title="归档考试计划"
          style={{ top: 150 }}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          // confirmLoading={confirmLoading}
          footer={
            <div style={{ textAlign: 'center' }}>
              <Button type="primary" loading={confirmLoading} onClick={this.handleOk}>
                确定
              </Button>
              <Button onClick={this.handleCancel}>取消</Button>
            </div>
          }
        >
          <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
            <Icon
              type="exclamation-circle"
              theme="filled"
              style={{ color: '#faad14', fontSize: '24px', marginRight: '15px' }}
            />
            <div>
              <div>注意：考试计划归档后将不能编辑或查看详情。</div>
              <div>确定要归档考试计划吗？</div>
            </div>
          </div>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default ExamPlanManager;
