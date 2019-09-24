import React, { Component } from 'react';
import { Card, Modal, Table, Divider, Icon, Button, Input, message } from 'antd';
// import router from 'umi/router';
import Link from 'umi/link';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Index.less';

const { Search } = Input;

@connect(({ StudyPlanManager, loading }) => ({
  allSPTableData: StudyPlanManager.allSPTableData, // 学习计划管理——>主页，获取所有的学习计划
  learnplansloading: loading.effects['StudyPlanManager/GetAllSPTableData'],
}))
class StudyPlanManager extends Component {
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
      type: 'StudyPlanManager/GetAllSPTableData',
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
    console.log(_pagination_);
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
      type: 'StudyPlanManager/FileOnArchive',
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
    const { allSPTableData, learnplansloading } = this.props;
    const { pagination, visible, confirmLoading } = this.state;
    const pageConifg = {
      ...pagination,
      total: allSPTableData.count,
      showTotal: total => `共 ${total} 条记录`,
    };
    // 循环Table数据，添加key
    const dataSource = allSPTableData.results.map(value =>
      Object.assign({}, value, { key: value.id })
    );

    const columns = [
      {
        title: '计划名称',
        dataIndex: 'studyPlanManager_planName',
        key: 'studyPlanManager_planName',
        render: (text, record) => <span>{record.name}</span>,
      },
      {
        title: '课件名称',
        dataIndex: 'studyPlanManager_courseName',
        key: 'studyPlanManager_courseName',
        render: (text, record) => <span>{record.course.name}</span>,
      },
      {
        title: '学习开始时间',
        dataIndex: 'studyPlanManager_startTime',
        key: 'studyPlanManager_startTime',
        render: (text, record) => <span>{record.start_time}</span>,
      },
      {
        title: '学习结束时间',
        dataIndex: 'studyPlanManager_endTime',
        key: 'studyPlanManager_endTime',
        render: (text, record) => <span>{record.end_time}</span>,
      },
      {
        title: '计划状态',
        dataIndex: 'studyPlanManager_planStatus',
        key: 'studyPlanManager_planStatus',
        render: (text, record) => <span>{record.status}</span>,
      },
      {
        title: (
          <div>
            <span>完成比</span>
            <br />
            <span>（完成人数/参加人数）</span>
          </div>
        ),
        align: 'center',
        dataIndex: 'studyPlanManager_finishedNum',
        key: 'studyPlanManager_finishedNum',
        render: (text, record) => <span>{record.ratio}</span>,
      },
      {
        title: (
          <div>
            <span>课堂提问</span>
            <br />
            <span>（答复/提问）</span>
          </div>
        ),
        align: 'center',
        dataIndex: 'studyPlanManager_question',
        key: 'studyPlanManager_question',
        render: (text, record) => <span>{record.questionanswer}</span>,
      },

      {
        title: '操作',
        dataIndex: 'studyPlanManager_opt',
        key: 'studyPlanManager_opt',
        render: (text, record) => {
          let dom;
          if (record.status === '已完成') {
            dom = (
              <span>
                <Link to={`/studyPlan/studyPlanManager/view/${record.id}`}>查看</Link>
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
          } else if (record.status === '已指派' || record.status === '学习中') {
            dom = (
              <span>
                <Link to={`/studyPlan/studyPlanManager/edit/${record.id}`}>编辑</Link>
                <Divider type="vertical" />
                <Link to={`/studyPlan/studyPlanManager/view/${record.id}`}>查看</Link>
              </span>
            );
          }
          return dom;
        },
      },
    ];

    return (
      <PageHeaderWrapper title="学习计划管理">
        <Card className={styles.studyPlanManagerContent}>
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
            dataSource={dataSource}
            loading={learnplansloading}
            columns={columns}
            pagination={pageConifg}
            onChange={this.handleTableChange}
          />
        </Card>
        <Modal
          visible={visible}
          title="归档学习计划"
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
              <div>注意：学习计划归档后将不能编辑或查看详情。</div>
              <div>确定要归档学习计划吗？</div>
            </div>
          </div>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default StudyPlanManager;
