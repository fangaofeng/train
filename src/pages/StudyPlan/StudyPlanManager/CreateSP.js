/* eslint-disable no-restricted-syntax */
import React, { Component, Fragment } from 'react';
import { DatePicker, Card, Button, Table, Spin, message, Input, Form } from 'antd';
import router from 'umi/router';
// import Link from 'umi/link';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import SubmitSuccessCard from '@/components/SubmitSuccessCard';

import CourseBasicInfo from '@/components/CourseBasicInfo';
import PageTable from '@/components/PageTable';
import TraingroupsModal from '@/pages/TrainGroupManager/ViewTrainGroupModal';
import styles from './Common.less';

const { Search } = Input;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

@connect(({ StudyPlanManager, loading }) => ({
  createSPData: StudyPlanManager.createSPData, // 学习计划管理——>创建学习计划（获取table表格数据）
  viewTGMembersData: StudyPlanManager.viewTGMembersData, // 学习计划管理——>创建学习计划——>查看培训群组成员（获取table表格数据）
  courseTeacherInfoLoading: loading.effects['StudyPlanManager/GetCourseTeacherInfo'],
  membersLoading: loading.effects['StudyPlanManager/GetTrainGroups'],
}))
@Form.create()
class CreateSP extends Component {
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
      maxNameLength: 50, // 计划名称最多50字
      nameLengthLeft: 50, // 计划名称剩余字数
      courseName: '', // 课件名称
      studyPlanName: '', // 学习计划名称
      studyPlanStartTime: '', // 学习计划开始时间
      studyPlanEndTime: '', // 学习计划结束时间

      selectedAllKeys: [], // 选中的数据组成的数组（只包含key值）
      selectedData: {}, // 保存选中的数据

      showModalTable: false, // 是否显示查看群组成员模态框
      modalTableTGID: null, // 要显示群组成员的培训群组的ID
      modalTableTGNumber: '', // 要显示群组成员的模态框的群组编号
      modalTableTGName: '', // 要显示群组成员的模态框的群组名称
    };
  }

  // 页面加载完成后
  componentDidMount() {}

  handleSelectRows = rows => {
    this.setState({
      selectedAllKeys: rows,
    });
  };

  handleOnSelect = selectData => {
    this.setState({
      selectedData: selectData,
    });
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
        const studyTimeRange = values.studyPlan_time;
        this.setState({
          studyPlanName: values.studyPlan_name, // 学习计划名称
          studyPlanStartTime: studyTimeRange[0].format('YYYY-MM-DD'), // 学习计划开始时间
          studyPlanEndTime: studyTimeRange[1].format('YYYY-MM-DD'), // 学习计划结束时间
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
    router.push('/studyPlan/studyPlanManager/index');
  };

  // 点击提交按钮
  btnSubmit = () => {
    const { dispatch } = this.props;
    const {
      match: {
        params: { courseid },
      },
    } = this.props;
    const { studyPlanName, studyPlanStartTime, studyPlanEndTime, selectedAllKeys } = this.state;
    dispatch({
      type: 'StudyPlanManager/SubmitCreateSP',
      payload: {
        name: studyPlanName,
        start_time: studyPlanStartTime,
        end_time: studyPlanEndTime,
        traingroups: selectedAllKeys,
        course: courseid,
      },
      callback: res => {
        if (res && res.status === 'ok') {
          message.success('提交成功');
          this.setState({
            courseName: res.data.course_name, // 课件名称
            studyPlanName: res.data.name, // 学习计划名称
            studyPlanStartTime: res.data.start_time, // 学习计划开始时间
            studyPlanEndTime: res.data.end_time, // 学习计划结束时间
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
    this.setState({
      showModalTable: true,
      modalTableTGID: record.id,
      modalTableTGNumber: record.group_no, // 要显示群组成员的模态框的群组编号
      modalTableTGName: record.name, // 要显示群组成员的模态框的群组名称
    });
  };

  // 查看培训群组成员。分页、排序、筛选变化时触发。这边只有分页功能，没有排序和筛选
  // ------------查看群组成员弹框------------
  modalcallback = (visible, refresh = false) => {
    console.log('modalcallback', refresh);
    this.setState({
      showModalTable: visible,
    });
  };

  filterData = value => {
    const arr = [];
    for (const i in value) {
      if (Object.prototype.hasOwnProperty.call(value, i)) {
        arr.push(value[i]);
      }
    }
    return arr;
  };
  // ------------查看群组成员弹框------------

  render() {
    const {
      form: { getFieldDecorator },
      createSPData,
      courseTeacherInfoLoading,
      membersLoading,
      match: {
        params: { courseid },
      },
      dispatch,
    } = this.props;

    const { currentStatus, selectedAllKeys, selectedData } = this.state;
    const {
      maxNameLength,
      nameLengthLeft,
      courseName,
      studyPlanName,
      studyPlanStartTime,
      studyPlanEndTime,
    } = this.state;
    const pageHeaderWrapperTitle = () => {
      let title = '';
      if (currentStatus === 'before') {
        title = '创建学习计划';
      } else if (currentStatus === 'submit') {
        title = '提交学习计划';
      } else {
        title = '提交学习计划成功';
      }
      return title;
    };

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

    // 预览数据的Table分页参数
    const previewPageConifg = {
      pageSize: 10, // 每页条数
      pageSizeOptions: ['10', '20', '30', '40'], // 指定每页可以显示多少条数据
      showQuickJumper: true, // 是否可以快速跳转至某页
      showSizeChanger: true, // 是否可以改变 pageSize
      total: this.filterData(selectedData).length,
      showTotal: total => `共 ${total} 条记录`,
    };

    // ------------查看群组成员弹框------------

    const { showModalTable, modalTableTGID, modalTableTGNumber, modalTableTGName } = this.state;

    // ------------查看群组成员弹框------------
    return (
      <PageHeaderWrapper title={pageHeaderWrapperTitle()}>
        <Spin spinning={courseTeacherInfoLoading}>
          <CourseBasicInfo
            dispatch={dispatch}
            courseid={courseid}
            action="StudyPlanManager/GetCourseTeacherInfo"
            isShow={currentStatus === 'success'}
          />
        </Spin>

        <Card
          className={styles.detailSP}
          style={{ display: currentStatus === 'before' ? 'block' : 'none' }}
        >
          <Form hideRequiredMark layout="inline" className={styles.formContent}>
            <FormItem label="计划名称">
              {getFieldDecorator('studyPlan_name', {
                rules: [
                  {
                    required: true,
                    message: '计划名称必填',
                  },
                ],
              })(
                <Input
                  style={{ width: 300 }}
                  placeholder="计划名称"
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

            <FormItem label="学习开放时间">
              {getFieldDecorator('studyPlan_time', {
                rules: [{ type: 'array', required: true, message: '学习开放时间必填' }],
              })(<RangePicker dropdownClassName={styles.customerRangePicker} showToday />)}
            </FormItem>
          </Form>
          <div className={styles.tableContent}>
            <div className={styles.searchContent}>
              <div>
                <span>选择参加学习群组：</span>
                <Search placeholder="输入群组编号或名称过滤" style={{ width: 300 }} />
              </div>
            </div>

            <PageTable
              {...this.props}
              data={createSPData}
              columns={columns}
              loading={membersLoading}
              onSelectRow={this.handleSelectRows}
              action="StudyPlanManager/GetTrainGroups"
              selectedRows={selectedAllKeys}
              onSelectData={this.handleOnSelect}
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
          className={styles.detailSP}
          style={{ display: currentStatus === 'submit' ? 'block' : 'none' }}
        >
          <Form hideRequiredMark layout="inline" className={styles.formContent}>
            <FormItem label="计划名称">
              <span>{studyPlanName}</span>
            </FormItem>

            <FormItem label="学习开放时间">
              <span>
                {studyPlanStartTime} 至 {studyPlanEndTime}
              </span>
            </FormItem>
          </Form>
          <div className={styles.tableContent}>
            <div className={styles.searchContent}>
              <div>
                <span>参加学习群组</span>
              </div>
            </div>
            <Table
              bordered
              dataSource={this.filterData(selectedData)}
              columns={columns}
              pagination={previewPageConifg}
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
          title="提交学习计划成功"
          infoMsgConfig={{
            '课件名称：': courseName,
            '计划名称：': studyPlanName,
            '学习开放时间：': `${studyPlanStartTime}  至  ${studyPlanEndTime}`,
          }}
          btns={
            <Fragment>
              <Button
                type="primary"
                onClick={() => router.push('/studyPlan/studyPlanManager/index')}
              >
                完成
              </Button>
            </Fragment>
          }
        />
        <TraingroupsModal
          visible={showModalTable}
          id={modalTableTGID}
          visiblecallback={this.modalcallback}
          num={modalTableTGNumber}
          name={modalTableTGName}
        />
      </PageHeaderWrapper>
    );
  }
}

export default CreateSP;
