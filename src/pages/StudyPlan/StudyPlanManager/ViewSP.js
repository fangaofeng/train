import React, { Component } from 'react';
import { Card, Badge, Form, Spin } from 'antd';
// import router from 'umi/router';
// import Link from 'umi/link';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import CourseBasicInfo from '@/components/CourseBasicInfo';
import PageTable from '@/components/PageTable';
import ModalTable from '@/components/Modal/ModalTable';
import styles from './Common.less';

const FormItem = Form.Item;

@connect(({ StudyPlanManager, loading }) => ({
  viewSPData: StudyPlanManager.viewSPData, // 学习计划管理——>查看学习计划（获取table表格数据）
  viewSPDataDetails: StudyPlanManager.viewSPDataDetails, // 学习计划管理——>查看学习计划——>查看培训群组学习详情（获取table表格数据）
  learnplanloading: loading['StudyPlanManager/GetViewSPData'],
  detailLoading: loading.effects['StudyPlanManager/ViewGetCourseAndPlanInfo'],
}))
@Form.create()
class ViewSP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courserTeacherInfo: {}, // 课程信息、讲师信息
      studyPlanName: '', // 学习计划名称
      studyPlanStartTime: '', // 学习计划开始时间
      studyPlanEndTime: '', // 学习计划结束时间

      showModalTable: false, // 是否显示查看群组成员模态框
      modalTableTGID: null, // 要显示群组成员的培训群组的ID
      modalTableTGNumber: '', // 要显示群组成员的模态框的群组编号
      modalTableTGName: '', // 要显示群组成员的模态框的群组名称
    };
  }

  // 页面加载完成后
  componentDidMount() {
    this.getInfo();
  }

  // 根据学习计划id获取课程信息、讲师信息、学习计划名称、学习计划开始时间、学习计划结束时间
  getInfo = () => {
    const {
      dispatch,
      match: {
        params: { studyPlanID },
      },
    } = this.props;
    dispatch({
      type: 'StudyPlanManager/ViewGetCourseAndPlanInfo',
      payload: {
        id: studyPlanID, // id
      },
      callback: res => {
        if (res && res.status === 'ok') {
          console.log('请求成功', res);
          this.setState({
            courserTeacherInfo: res.data.course, // 课件名称
            studyPlanName: res.data.name, // 学习计划名称
            studyPlanStartTime: res.data.start_time, // 学习计划开始时间
            studyPlanEndTime: res.data.end_time, // 学习计划结束时间
          });
        } else {
          console.log('请求失败');
        }
      },
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

  // 表格行的类名
  modalTableRowClassName = record => {
    let str;
    if (record.status === '超期未完成' || record.status === '超期已完成') {
      str = 'tableRowClassNameErr';
    } else {
      str = '';
    }
    return str;
  };

  // ------------查看群组成员弹框------------
  modalcallback = (visible, refresh = false) => {
    console.log('modalcallback', refresh);
    this.setState({
      showModalTable: visible,
    });
  };

  render() {
    const {
      courserTeacherInfo,
      studyPlanName,
      studyPlanStartTime,
      studyPlanEndTime,
      modalTableTGID,
    } = this.state;
    const {
      viewSPData,
      learnplanloading,
      dispatch,
      detailLoading,
      match: {
        params: { studyPlanID },
      },
    } = this.props;

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
        render: (text, record) => <span>{record.count}</span>,
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
    const { viewSPDataDetails } = this.props;
    const { showModalTable, modalTableTGNumber, modalTableTGName } = this.state;

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
        title: '学习状态',
        align: 'center',
        dataIndex: 'user_status',
        key: 'user_status',
        render: (text, record) => {
          let dom;
          if (record.status === '超期未完成' || record.status === '超期已完成') {
            dom = <Badge status="error" text={record.status} />;
          } else {
            dom = <span>{record.status}</span>;
          }
          return dom;
        },
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
        dataIndex: 'user_question',
        key: 'user_question',
        render: (text, record) => <span>{record.questionanswer}</span>,
      },
    ];

    // ------------查看群组成员弹框------------
    return (
      <PageHeaderWrapper title="查看学习计划">
        <Spin spinning={detailLoading}>
          <CourseBasicInfo dispatch={dispatch} CousreInfo={courserTeacherInfo} isShow={false} />
        </Spin>
        <Card className={styles.detailSP}>
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
          <div className={styles.tableContent} style={{ border: 'none' }}>
            <div className={styles.searchContent}>
              <div>
                <span>参加学习群组：</span>
              </div>
            </div>

            <PageTable
              id={studyPlanID}
              {...this.props}
              data={viewSPData}
              columns={columns}
              loading={learnplanloading}
              action="StudyPlanManager/GetViewSPData"
            />
          </div>
        </Card>
        <ModalTable
          id={studyPlanID}
          sid={modalTableTGID}
          visible={showModalTable}
          modalTitle="查看培训群组学习详情"
          Headerinfo={
            <Form layout="inline" style={{ marginRight: 20 }}>
              <FormItem label="群组编号">
                <span>{modalTableTGNumber}</span>
              </FormItem>
              <FormItem label="群组名称">
                <span>{modalTableTGName}</span>
              </FormItem>
            </Form>
          }
          data={viewSPDataDetails}
          columns={modalTableColumns}
          visiblecallback={this.modalcallback}
          rowClassName={this.modalTableRowClassName}
          action="StudyPlanManager/GetViewSPDataDetails"
          dispatch={dispatch}
        />
      </PageHeaderWrapper>
    );
  }
}

export default ViewSP;
