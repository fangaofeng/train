/* eslint-disable no-restricted-syntax */
import React, { Component, Fragment } from 'react';
import { DatePicker, Card, Button, Table, message, Input, Spin, Form } from 'antd';
import router from 'umi/router';
// import Link from 'umi/link';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ExamBasicInfo from '@/components/ExamBasicInfo';
import SubmitSuccessCard from '@/components/CustomComponent/SubmitSuccessCard/SubmitSuccessCard';
import ModalTable from '@/components/CustomComponent/ModalTable/ModalTable';
import styles from './Common.less';
// import TrainGroupMember from '@/pages/TrainGroupManager/ViewTrainGroup';

const { Search } = Input;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

@connect(({ ExamPlanManager, loading }) => ({
  createGroups: ExamPlanManager.createGroups, // 考试管理——>发布考试计划——>查看培训群组（获取table表格数据）
  createMembers: ExamPlanManager.createMembers, // 考试管理——>发布考试计划——>查看培训群组成员（获取table表格数据）
  paperLoading: loading.effects['ExamPlanManager/GetPaperDetail'],
  groupsLoading: loading.effects['ExamPlanManager/GetTrainGroups'],
}))
@Form.create()
class CreateExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /**
       * 默认是'before',用于判断当前进度。
       * 创建前————'before' ;
       * 提交前————'submit' ;
       * 提交后————'success' ;
       */
      currentStatus: 'before',
      maxNameLength: 50, // 考试名称最多50字
      nameLengthLeft: 50, // 考试名称剩余字数
      testName: '', // 时间名称
      examPlanName: '', // 考试计划名称
      examPlanStartTime: '', // 考试计划开始时间
      examPlanEndTime: '', // 考试计划结束时间

      selectedAllKeys: [], // 选中的数据组成的数组（只包含key值）
      saveSelectedData: {}, // 保存选中的数据
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
    // this.getTestInfo();
    // 默认是获取第一页数据
    const {
      pagination: { current, pageSize },
    } = this.state;
    this.getTrainGroups(current, pageSize);
  }

  // 获取试卷信息
  // getTestInfo = () => {
  //   const {
  //     dispatch,
  //     match: {
  //       params: { examID },
  //     },
  //   } = this.props;
  //   dispatch({
  //     type: 'ExamPlanManager/GetPaperDetail',
  //     payload: {
  //       id: examID, // id
  //     },
  //     callback: res => {
  //       if (res.status === 'ok') {
  //         // console.log('请求成功');
  //         this.setState({
  //           currentTestInfo: res.data,
  //         });
  //       } else {
  //         // console.log('请求失败');
  //       }
  //     },
  //   });
  // };

  // 获取table表格数据(指定页码，指定每页条数)
  getTrainGroups = (page, size) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'ExamPlanManager/GetTrainGroups',
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
    this.getTrainGroups(current, pageSize);
  };

  // 点击下一步
  nextStep = () => {
    const {
      form: { validateFieldsAndScroll },
    } = this.props;
    const { selectedAllKeys } = this.state;
    const len = selectedAllKeys.length;
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('表单值', values);
        if (len < 1) {
          message.info('请选择您需要添加的数据');
          return;
        }
        const studyTimeRange = values.examPlan_time;
        this.setState({
          examPlanName: values.examPlan_name, // 考试计划名称
          examPlanStartTime: studyTimeRange[0].format('YYYY-MM-DD HH:mm:00'), // 考试计划开始时间
          examPlanEndTime: studyTimeRange[1].format('YYYY-MM-DD HH:mm:00'), // 考试计划结束时间
        });
        console.log('下一步');
        this.setState({
          currentStatus: 'submit',
        });
      }
    });
  };

  // 点击取消
  btnCancel = () => {
    router.push('/examPlan/examPlanManager/index');
  };

  // 点击提交按钮
  btnSubmit = () => {
    const {
      match: {
        params: { examID },
      },
      dispatch,
    } = this.props;

    const { examPlanName, examPlanStartTime, examPlanEndTime, selectedAllKeys } = this.state;
    dispatch({
      type: 'ExamPlanManager/CreateExamplanSubmit',
      payload: {
        name: examPlanName,
        start_time: examPlanStartTime,
        end_time: examPlanEndTime,
        traingroups: selectedAllKeys,
        exampaper: examID,
      },
      callback: res => {
        if (res.status === 'ok') {
          message.success('提交成功');
          this.setState({
            testName: res.data.name, // 课件名称
            examPlanName: res.data.exam_name, // 考试计划名称
            examPlanStartTime: res.data.start_time, // 考试计划开始时间
            examPlanEndTime: res.data.end_time, // 考试计划结束时间
          });
          this.setState({
            currentStatus: 'success',
          });
        } else {
          message.warning('提交失败');
        }
      },
    });
  };

  // 点击返回按钮
  btnBack = () => {
    this.setState({
      currentStatus: 'before',
    });
  };

  // 判断剩余多少字
  inputLengthFun = (e, params, total) => {
    const len = total - e.target.value.length;
    this.setState({
      [params]: len <= 0 ? 0 : len,
    });
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
    const { dispatch } = this.props;
    const { modalTableTGID } = this.state;
    const ID = id || modalTableTGID;
    dispatch({
      type: 'ExamPlanManager/getExamplanGroupMembers',
      payload: {
        page, // 页码
        size, // 每页条数
        id: ID, // 培训群组id
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
  // ------------查看群组成员弹框------------

  render() {
    const {
      form: { getFieldDecorator },
      paperLoading,
      createGroups,
      groupsLoading,
      match: {
        params: { examID },
      },
      dispatch,
    } = this.props;

    const {
      currentStatus,
      selectedAllKeys,
      pagination,
      saveSelectedData,
      previewPagination,
    } = this.state;
    const {
      maxNameLength,
      nameLengthLeft,
      testName,
      examPlanName,
      examPlanStartTime,
      examPlanEndTime,
    } = this.state;
    const pageHeaderWrapperTitle = () => {
      let title = '';
      if (currentStatus === 'before') {
        title = '发布考试';
      } else if (currentStatus === 'submit') {
        title = '提交考试';
      } else {
        title = '提交考试成功';
      }
      return title;
    };
    const pageConifg = {
      ...pagination,
      total: createGroups.count,
      showTotal: total => `共 ${total} 条记录`,
    };
    // 选中的表格行
    const rowSelection = {
      selectedRowKeys: selectedAllKeys,
      // 选中项发生变化时的回调
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys, selectedRows);
        this.setState({
          selectedAllKeys: selectedRowKeys,
        });
      },
      // 用户手动选择/取消选择某行的回调
      onSelect: (record, selected) => {
        // console.log(record, selected, selectedRows);

        if (selected) {
          // 选中该条数据
          saveSelectedData[record.key] = record;
        } else {
          // 取消选中该条数据
          delete saveSelectedData[record.key];
        }
        this.setState({
          saveSelectedData,
        });
      },
      // 用户手动选择/取消选择所有行的回调
      onSelectAll: (selected, selectedRows, changeRows) => {
        // console.log(selected, selectedRows, changeRows);

        if (selected) {
          // 全选
          changeRows.forEach(v => {
            saveSelectedData[v.key] = v;
          });
        } else {
          // 取消全选
          changeRows.forEach(v => {
            delete saveSelectedData[v.key];
          });
        }
        this.setState({
          saveSelectedData,
        });
      },
    };

    // 循环Table数据，添加key
    const dataSource = createGroups.results.map(value =>
      Object.assign({}, value, { key: value.id })
    );

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
        render: (text, record) => (
          <span>
            {/* {record.trainers.length} */}
            {record.count}
          </span>
        ),
      },
      {
        title: '操作',
        dataIndex: 'train_group_opt',
        key: 'train_group_opt',
        render: (text, record) => (
          <span>
            <a onClick={() => this.viewModalTable(record)}>查看</a>
          </span>
        ),
      },
    ];

    // 将选中的数据转换为数组格式
    const filterData = value => {
      const arr = [];
      for (const i in value) {
        if (Object.prototype.hasOwnProperty.call(value, i)) {
          arr.push(value[i]);
        }
      }
      return arr;
    };

    // 预览数据的Table分页参数
    const previewPageConifg = {
      ...previewPagination,
      total: filterData(saveSelectedData).length,
      showTotal: total => `共 ${total} 条记录`,
    };
    // ------------查看群组成员弹框------------
    const { createMembers } = this.props;
    const {
      showModalTable,
      modalTablePagination,
      modalTableTGNumber,
      modalTableTGName,
    } = this.state;
    const modalTablePageConifg = {
      ...modalTablePagination,
      total: createMembers.count,
      showTotal: total => `共 ${total} 条记录`,
    };
    // 循环Table数据，添加key
    const modalTableDataSource = createMembers.results.map(value =>
      Object.assign({}, value, { key: value.id })
    );
    const modalTableColumns = [
      {
        title: '员工编号',
        dataIndex: 'user_number',
        key: 'user_number',
        render: (text, record) => <span>{record.user_no}</span>,
      },
      {
        title: '姓名',
        dataIndex: 'user_name',
        key: 'user_name',
        render: (text, record) => <span>{record.name}</span>,
      },
      {
        title: '归属部门',
        dataIndex: 'user_department',
        key: 'user_department',
        render: (text, record) => <span>{record.department_name}</span>,
      },
    ];

    // ------------查看群组成员弹框------------
    return (
      <PageHeaderWrapper title={pageHeaderWrapperTitle()}>
        <Spin spinning={paperLoading}>
          <ExamBasicInfo
            dispatch={dispatch}
            id={examID}
            action="ExamPlanManager/GetPaperDetail"
            isShow={currentStatus === 'success'}
          />
        </Spin>
        <Card
          className={styles.testInfoDetail}
          style={{ display: currentStatus === 'before' ? 'block' : 'none' }}
        >
          <Form hideRequiredMark layout="inline" className={styles.formContent}>
            <FormItem label="考试名称">
              {getFieldDecorator('examPlan_name', {
                rules: [
                  {
                    required: true,
                    message: '考试名称必填',
                  },
                ],
              })(
                <Input
                  style={{ width: 300 }}
                  placeholder="考试名称"
                  maxLength={maxNameLength}
                  onChange={e => {
                    this.inputLengthFun(e, 'nameLengthLeft', maxNameLength);
                  }}
                />
              )}
              <span className={styles.spanTips}>
                剩余
                <span>{nameLengthLeft}</span>
                个字
              </span>
            </FormItem>

            <FormItem label="考试开放时间">
              {getFieldDecorator('examPlan_time', {
                rules: [{ type: 'array', required: true, message: '考试开放时间必填' }],
              })(
                <RangePicker
                  dropdownClassName={styles.customerRangePicker}
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm:00"
                  showToday
                />
              )}
            </FormItem>
          </Form>
          <div className={styles.tableContent}>
            <div className={styles.searchContent}>
              <div>
                <span>选择参加考试群组：</span>
                <Search placeholder="输入群组编号或名称过滤" style={{ width: 300 }} />
              </div>
            </div>
            <Table
              bordered
              loading={groupsLoading}
              dataSource={dataSource}
              columns={columns}
              pagination={pageConifg}
              onChange={this.handleTableChange}
              rowSelection={rowSelection}
            />
          </div>
          <div className={styles.foonter_btns}>
            <Button type="primary" onClick={this.nextStep}>
              下一步
            </Button>
            <Button onClick={this.btnCancel}>取消</Button>
          </div>
        </Card>
        <Card
          className={styles.testInfoDetail}
          style={{ display: currentStatus === 'submit' ? 'block' : 'none' }}
        >
          <Form hideRequiredMark layout="inline" className={styles.formContent}>
            <FormItem label="考试名称">
              <span>{examPlanName}</span>
            </FormItem>

            <FormItem label="考试开放时间">
              <span>
                {examPlanStartTime} 至 {examPlanEndTime}
              </span>
            </FormItem>
          </Form>
          <div className={styles.tableContent}>
            <div className={styles.searchContent}>
              <div>
                <span>参加考试群组</span>
              </div>
            </div>
            <Table
              bordered
              dataSource={filterData(saveSelectedData)}
              columns={columns}
              pagination={previewPageConifg}
              // onChange={this.previewTableChange}
            />
          </div>
          <div className={styles.foonter_btns}>
            <Button type="primary" onClick={this.btnSubmit}>
              提交
            </Button>
            <Button onClick={this.btnBack}>返回</Button>
          </div>
        </Card>
        <SubmitSuccessCard
          successFlag={currentStatus}
          title="提交考试计划成功"
          infoMsgConfig={{
            '试卷名称：': testName,
            '考试名称：': examPlanName,
            '考试开放时间：': `${examPlanStartTime}  至  ${examPlanEndTime}`,
          }}
          btns={
            <Fragment>
              {/* <Button disabled>增加考试计划</Button> */}
              <Button type="primary" onClick={() => router.push('/examPlan/examPlanManager/index')}>
                完成
              </Button>
            </Fragment>
          }
        />
        <ModalTable
          modalTableVisible={showModalTable}
          modalTitle="查看培训群组"
          trainGroupNumber={modalTableTGNumber}
          trainGroupName={modalTableTGName}
          dataSource={modalTableDataSource}
          columns={modalTableColumns}
          pagination={modalTablePageConifg}
          onChange={this.modalTablePageChange}
          handleTableCancel={this.cancelViewModalTable}
        />
      </PageHeaderWrapper>
    );
  }
}

export default CreateExam;
