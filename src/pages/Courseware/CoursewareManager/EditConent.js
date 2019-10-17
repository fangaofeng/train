import React, { Component } from 'react';
import { Card, Button, message, Spin, Popconfirm } from 'antd';
import router from 'umi/router';
// import Link from 'umi/link';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import CourseBasicInfo from '@/components/CourseBasicInfo';
import PageTable from '@/components/PageTable';
import styles from '@/components/Modal/Common.less';
import ModalAdd from '@/components/Modal/ModalAdd';
import ModalDel from '@/components/Modal/ModalDel';

// const { Search } = Input;

@connect(({ CourseManager, loading }) => ({
  currenttrainmanagers: CourseManager.currenttrainmanagers, // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 所有可使用本课件的培训管理员
  currenttrainmanagersLoading: loading.effects['CourseManager/GetCourseTeacherInfo'],
  addtrainmanagers: CourseManager.addtrainmanagers, // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 新增可使用本课件的培训管理员
  addtrainmanagersLoading: loading.effects['CourseManager/GetOthertrainmanagers'],
  detailLoading: loading.effects['CourseManager/GetCourseTeacherInfo'],
}))
class CommonConent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAllKeys: [], // 选中的数据组成的数组（只包含key值）

      delVisible: false, // 批量删除的模态框————>显示隐藏
      addVisible: false, // 增加培训管理员的模态框————>显示隐藏
    };
  }

  // 页面加载完成后
  componentDidMount() {}

  handleSelectRows = rows => {
    this.setState({
      selectedAllKeys: rows,
    });
  };

  // 点击“上架”按钮或者点击“重新上架”按钮
  changeCourseStatus = msg => {
    const {
      dispatch,
      match: {
        params: { ID },
      },
    } = this.props;
    dispatch({
      type: 'CourseManager/ChangeCourseStatus',
      payload: {
        id: ID, // id
        data: {
          status: '已上架', // 0：拟制中；1：已上架；2：已下架；3：已归档
        },
      },
      callback: res => {
        if (res.status === 'ok') {
          message.success(`${msg}成功`);
          // router.push('/courseware/coursewareManager/index');
          this.forceUpdate();
        } else {
          message.warning(`${msg}失败`);
        }
      },
    });
  };

  // ---------------批量删除---------------
  // 批量删除,如果选择了数据，则显示删除模态框
  batchDelete = () => {
    const { selectedAllKeys } = this.state;
    if (selectedAllKeys.length < 1) {
      message.info('请选择您需要删除的数据！');
      return;
    }
    this.setState({
      delVisible: true,
      // delConfirmLoading: false,
    });
  };

  // ---------------单个删除---------------
  // 单个删除
  deleteConfirm = delID => {
    const IDArr = [];
    IDArr.push(delID);
    const {
      dispatch,
      match: {
        params: { ID },
      },
    } = this.props;
    const { selectedAllKeys } = this.state;
    // const count = currenttrainmanagers.get('count');
    // 用于判断该数据是否已经选中存放到selectedAllKeys数组中
    // const len = currenttrainmanagers.results.length; // 获取该页数据条数
    dispatch({
      type: 'CourseManager/DelBatch',
      payload: {
        id: ID, // 课件id
        data: {
          trainmanagers: IDArr, // 字符串转换成数组
        },
      },
      callback: res => {
        if (res.status === 'ok') {
          message.success('删除成功');
          const flag = selectedAllKeys.indexOf(delID);
          if (flag > -1) {
            selectedAllKeys.splice(flag, 1);
            this.setState({
              selectedAllKeys,
            });
          }
        } else {
          message.warning('删除失败');
        }
      },
    });
  };

  // 点击“增加培训管理员”，显示模态框
  addMember = () => {
    // 默认是获取第一页数据
    this.setState({
      addVisible: true, // 增加培训管理员的模态框————>显示隐藏
      // addConfirmLoading: false, // 增加培训管理员的模态框————>确定按钮 loading
    });
    // this.getAddTableData(current, pageSize);
  };

  // ---------------增加培训管理员模态框---------------
  modaladdcallback = (visible, refresh = false) => {
    console.log('visiblecallback', refresh);
    this.setState({
      addVisible: visible,
      selectedAllKeys: [],
    });
  };

  modaldelcallback = (visible, refresh = false) => {
    console.log('modaldelcallback', refresh);
    this.setState({
      delVisible: visible,
      selectedAllKeys: [],
    });
  };

  render() {
    const { selectedAllKeys, delVisible, addVisible } = this.state;
    const {
      location: {
        query: { currentType },
      },
      currenttrainmanagers,
      currenttrainmanagersLoading,
      detailLoading,
    } = this.props;

    const commonColumns = [
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
    const columns = () => {
      let arr = [];
      if (currentType === '拟制中') {
        arr = [
          ...commonColumns,
          {
            title: '操作',
            dataIndex: 'option',
            key: 'option',
            render: (text, record) => (
              <span>
                <Popconfirm
                  placement="topRight"
                  title="确认删除该条数据？"
                  onConfirm={() => this.deleteConfirm(record.key)}
                  okText="确定"
                  cancelText="取消"
                >
                  <a>删除</a>
                </Popconfirm>
              </span>
            ),
          },
        ];
      } else {
        arr = [
          ...commonColumns,
          {
            title: '已创建培训计划',
            dataIndex: 'createdPlan',
            key: 'createdPlan',
            render: (text, record) => <span>{record.createdPlan}</span>,
          },
          {
            title: '操作',
            dataIndex: 'option',
            key: 'option',
            render: (text, record) => (
              <span>
                <Popconfirm
                  placement="topRight"
                  title="确认删除该条数据？"
                  onConfirm={() => this.deleteConfirm(record.key)}
                  okText="确定"
                  cancelText="取消"
                >
                  <a disabled={record.createdPlan === '是'}>删除</a>
                </Popconfirm>
              </span>
            ),
          },
        ];
      }
      return arr;
    };

    return (
      <PageHeaderWrapper title={`课件编辑（${currentType}）`}>
        <Spin spinning={detailLoading}>
          <CourseBasicInfo {...this.props} isShow={false} />
        </Spin>
        <Card className={styles.listManagerContent}>
          <div className={styles.tableContent}>
            <div className={styles.searchContent}>
              <div>
                <span>可以使用本课件的培训管理员：</span>
              </div>
              <div>
                <Button type="primary" onClick={this.addMember}>
                  增加培训管理员
                </Button>
                <Button className="ant-btn-del" onClick={this.batchDelete}>
                  批量删除
                </Button>
              </div>
            </div>
            <PageTable
              {...this.props}
              data={currenttrainmanagers}
              columns={columns()}
              loading={currenttrainmanagersLoading}
              onSelectRow={this.handleSelectRows}
              action="CourseManager/GetTrainmanagers"
              selectedRows={selectedAllKeys}
            />
          </div>
          <div className={styles.foonter_btns}>
            {currentType === '拟制中' ? (
              <Button type="primary" onClick={() => this.changeCourseStatus('上架')}>
                上架
              </Button>
            ) : null}
            {currentType === '已下架' ? (
              <Button type="primary" onClick={() => this.changeCourseStatus('重新上架')}>
                重新上架
              </Button>
            ) : null}
            <Button onClick={() => router.push('/courseware/coursewareManager/index')}>返回</Button>
          </div>
        </Card>
        <ModalAdd
          {...this.props}
          visible={addVisible}
          visiblecallback={this.modaladdcallback}
          listActiontype="CourseManager/GetOtherTrainmanagers"
          addActiontype="CourseManager/SubmitAddedData"
        />
        <ModalDel
          {...this.props}
          selectedAllKeys={selectedAllKeys}
          visible={delVisible}
          visiblecallback={this.modaldelcallback}
          delAtiontype="CourseManager/DelBatch"
        />
      </PageHeaderWrapper>
    );
  }
}

export default CommonConent;
