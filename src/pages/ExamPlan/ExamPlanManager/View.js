import React, { Component } from 'react';
import { Card, Badge, Table, Form } from 'antd';
// import router from 'umi/router';
// import Link from 'umi/link';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ExamBasicInfo from '@/components/ExamBasicInfo';
import ModalTable from '@/components/CustomComponent/ModalTable/ModalTable';
import styles from './Common.less';

const FormItem = Form.Item;

@connect(({ ExamPlanManager }) => ({
  viewGroups: ExamPlanManager.viewGroups, // 学习计划管理——>查看学习计划（获取table表格数据）
  viewGroupMembers: ExamPlanManager.viewGroupMembers, // 学习计划管理——>查看学习计划——>查看培训群组学习详情（获取table表格数据）
}))
@Form.create()
class ViewExamPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTestInfo: {},
      /**
       * 默认是'fail',用于判断编辑是否成功还是失败。
       * 编辑完成提交后失败————'fail' ;
       * 编辑完成提交后成功————'success' ;
       */
      currentStatus: 'fail',

      examPlanName: '', // 考试计划名称
      examPlanStartTime: '', // 考试计划开始时间
      examPlanEndTime: '', // 考试计划结束时间

      pagination: {
        // 表格分页信息
        // total:20,// 数据总数
        current: 1, // 当前页数
        pageSize: 10, // 每页条数
        pageSizeOptions: ['10', '20', '30', '40'], // 指定每页可以显示多少条数据
        showQuickJumper: true, // 是否可以快速跳转至某页
        showSizeChanger: true, // 是否可以改变 pageSize
      },

      showModalTable: false, // 是否显示查看群组成员模态框
      modalTableTGID: null, // 要显示群组成员的培训群组的ID
      modalTableTGNumber: '', // 要显示群组成员的模态框的群组编号
      modalTableTGName: '', // 要显示群组成员的模态框的群组名称
      modalTablePagination: {
        // 模态框表格分页信息
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
    this.getExamInfo();
    // 默认是获取第一页数据
    const {
      pagination: { current, pageSize },
    } = this.state;
    this.getTableData(current, pageSize);
  }

  // 根据学习计划id获取课程信息、讲师信息、学习计划名称、学习计划开始时间、学习计划结束时间
  getExamInfo = () => {
    const {
      dispatch,
      match: {
        params: { examPlanID },
      },
    } = this.props;
    dispatch({
      type: 'ExamPlanManager/GetExamplanDetail',
      payload: {
        id: examPlanID, // id
      },
      callback: res => {
        if (res.status === 'ok') {
          console.log('请求成功');
          this.setState({
            currentTestInfo: res.data.exampaper,
            examPlanName: res.data.name, // 考试计划名称
            examPlanStartTime: res.data.start_time, // 考试计划开始时间
            examPlanEndTime: res.data.end_time, // 考试计划结束时间
          });
        } else {
          console.log('请求失败');
        }
      },
    });
  };

  // 获取table表格数据(指定页码，指定每页条数)
  getTableData = (page, size) => {
    const {
      dispatch,
      match: {
        params: { examPlanID },
      },
    } = this.props;
    dispatch({
      type: 'ExamPlanManager/getExamplanGroups',
      payload: {
        examPlanID, // 学习计划id
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

  // ------------查看群组成员弹框------------
  // 点击“查看”按钮
  viewModalTable = record => {
    const {
      modalTablePagination: { current, pageSize },
    } = this.state;
    this.setState({
      showModalTable: true,
      modalTableTGID: record.id,
      modalTableTGNumber: record.group_no, // 要显示群组成员的模态框的群组编号
      modalTableTGName: record.name, // 要显示群组成员的模态框的群组名称
    });
    this.getModalTableTGMembers(current, pageSize, record.id);
  };

  // 查看培训群组成员。获取table表格数据(指定页码，指定每页条数)
  getModalTableTGMembers = (page, size, id) => {
    const {
      dispatch,
      match: {
        params: { examPlanID },
      },
    } = this.props;
    const { modalTableTGID } = this.state;
    const ID = id || modalTableTGID;
    dispatch({
      type: 'ExamPlanManager/getExamplanGroupMembers',
      payload: {
        examPlanID, // 学习计划id
        trainGroupID: ID, // 培训群组id
        page, // 页码
        size, // 每页条数
      },
    });
  };

  // 查看培训群组成员。分页、排序、筛选变化时触发。这边只有分页功能，没有排序和筛选
  modalTablePageChange = _pagination_ => {
    const { modalTablePagination } = this.state;
    const { current, pageSize } = _pagination_;
    this.setState({
      modalTablePagination: {
        ...modalTablePagination,
        current,
        pageSize,
      },
    });
    this.getModalTableTGMembers(current, pageSize);
  };

  // 点击“返回”按钮
  cancelViewModalTable = () => {
    this.setState({
      showModalTable: false,
      modalTableTGID: null,
      modalTableTGNumber: '', // 要显示群组成员的模态框的群组编号
      modalTableTGName: '', // 要显示群组成员的模态框的群组名称
      modalTablePagination: {
        current: 1,
        pageSize: 10,
      },
    });
  };

  // 表格行的类名
  modalTableRowClassName = record => {
    let str;
    if (record.status === '未完成') {
      str = 'tableRowClassNameErr';
    } else {
      str = '';
    }
    return str;
  };
  // ------------查看群组成员弹框------------

  render() {
    const { viewGroups } = this.props;
    const {
      currentTestInfo,
      currentStatus,
      examPlanName,
      examPlanStartTime,
      examPlanEndTime,
      pagination,
    } = this.state;

    const pageConifg = {
      ...pagination,
      total: viewGroups.count,
      showTotal: total => `共 ${total} 条记录`,
    };

    // 循环Table数据，添加key
    const dataSource = viewGroups.results.map(value => Object.assign({}, value, { key: value.id }));

    const columns = [
      {
        title: '培训群组编号',
        dataIndex: 'train_group_number',
        key: 'train_group_number',
        render: (text, record) => <span>{record.group_no}</span>,
      },
      {
        title: '培训群组名称',
        dataIndex: 'train_group_name',
        key: 'train_group_name',
        render: (text, record) => <span>{record.name}</span>,
      },
      {
        title: '群组成员',
        dataIndex: 'train_group_member',
        key: 'train_group_member',
        render: (text, record) => <span>{record.trainers.length}</span>,
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
        dataIndex: 'ExamplanPlanManager_finishedNum',
        key: 'ExamplanPlanManager_finishedNum',
        render: (text, record) => <span>{record.ratio}</span>,
      },

      {
        title: '操作',
        dataIndex: 'train_group_opt',
        key: 'train_group_opt',
        render: (text, record) => (
          <span>
            <a onClick={() => this.viewModalTable(record)}>查看详情</a>
          </span>
        ),
      },
    ];

    // ------------查看群组成员弹框------------
    const { viewGroupMembers } = this.props;
    const {
      showModalTable,
      modalTablePagination,
      modalTableTGNumber,
      modalTableTGName,
    } = this.state;
    const modalTablePageConifg = {
      ...modalTablePagination,
      total: viewGroupMembers.count,
      showTotal: total => `共 ${total} 条记录`,
    };
    // 循环Table数据，添加key
    const modalTableDataSource = viewGroupMembers.results.map(value =>
      Object.assign({}, value, { key: value.id })
    );
    const modalTableColumns = [
      {
        title: '员工编号',
        align: 'center',
        dataIndex: 'user_number',
        key: 'user_number',
        render: (text, record) => <span>{record.user_no}</span>,
      },
      {
        title: '姓名',
        align: 'center',
        dataIndex: 'user_name',
        key: 'user_name',
        render: (text, record) => <span>{record.name}</span>,
      },
      {
        title: '归属部门',
        align: 'center',
        dataIndex: 'user_department',
        key: 'user_department',
        render: (text, record) => <span>{record.department_name}</span>,
      },
      {
        title: '考试状态',
        align: 'center',
        dataIndex: 'user_status',
        key: 'user_status',
        render: (text, record) => {
          let dom;
          if (record.status === '未完成') {
            dom = <Badge status="error" text={record.status} />;
          } else {
            dom = <span>{record.status}</span>;
          }
          return dom;
        },
      },
    ];
    // ------------查看群组成员弹框------------
    return (
      <PageHeaderWrapper title="考试学习计划">
        <ExamBasicInfo
          isShow={currentStatus === 'success'}
          detailConfig={{
            ...currentTestInfo,
          }}
        />
        <Card className={styles.detailSP}>
          <Form hideRequiredMark layout="inline" className={styles.formContent}>
            <FormItem label="计划名称">
              <span>{examPlanName}</span>
            </FormItem>
            <FormItem label="学习开放时间">
              <span>
                {examPlanStartTime} 至 {examPlanEndTime}
              </span>
            </FormItem>
          </Form>
          <div className={styles.tableContent} style={{ border: 'none' }}>
            <div className={styles.searchContent}>
              <div>
                <span>考试参加学习群组：</span>
              </div>
            </div>
            <Table
              bordered
              dataSource={dataSource}
              columns={columns}
              pagination={pageConifg}
              onChange={this.handleTableChange}
            />
          </div>
        </Card>
        <ModalTable
          modalTableVisible={showModalTable}
          modalTitle="查看培训群组学习详情"
          trainGroupNumber={modalTableTGNumber}
          trainGroupName={modalTableTGName}
          dataSource={modalTableDataSource}
          columns={modalTableColumns}
          pagination={modalTablePageConifg}
          onChange={this.modalTablePageChange}
          handleTableCancel={this.cancelViewModalTable}
          rowClassName={this.modalTableRowClassName}
        />
      </PageHeaderWrapper>
    );
  }
}

export default ViewExamPlan;
