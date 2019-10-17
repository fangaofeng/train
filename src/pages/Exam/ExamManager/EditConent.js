import React, { Component } from 'react';
import { Card, Button, message, Popconfirm, Spin } from 'antd';
import router from 'umi/router';
// import Link from 'umi/link';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ExamBasicInfo from '@/components/ExamBasicInfo';
// import styles from './Common.less';
import styles from '@/components/Modal//Common.less';
import ModalAdd from '@/components/Modal/ModalAdd';
import ModalDel from '@/components/Modal/ModalDel';
import PageTable from '@/components/PageTable';

@connect(({ ExamManager, loading }) => ({
  currenttrainmanagers: ExamManager.currenttrainmanagers, // 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中） ——> 所有可使用本试卷的培训管理员
  addtrainmanagers: ExamManager.addtrainmanagers,
  currenttrainmanagersLoading: loading.effects['ExamManager/GetTrainmanagers'],
  addtrainmanagersLoading: loading.effects['ExamManager/GetOtherTrainmanagers'],
  detailLoading: loading.effects['ExamManager/GetPaperDetail'], // 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中） ——> 新增可使用本试卷的培训管理员
}))
class CommonConent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAllKeys: [], // 选中的数据组成的数组（只包含key值）
      pagination: {
        // 表格分页信息
        // total:20,// 数据总数
        current: 1, // 当前页数
        pageSize: 10, // 每页条数
        pageSizeOptions: ['10', '20', '30', '40'], // 指定每页可以显示多少条数据
        showQuickJumper: true, // 是否可以快速跳转至某页
        showSizeChanger: true, // 是否可以改变 pageSize
      },

      delVisible: false, // 批量删除的模态框————>显示隐藏
      addVisible: false, // 增加培训管理员的模态框————>显示隐藏
    };
  }

  // 页面加载完成后
  componentDidMount() {
    // 默认是获取第一页数据
    // const { pagination:{current , pageSize}} = this.state;
    // this.getTableData(current,pageSize);
  }

  handleSelectRows = rows => {
    this.setState({
      selectedAllKeys: rows,
    });
  };

  // 点击“上架”按钮或者点击“重新上架”按钮
  changeExamStatus = msg => {
    const {
      dispatch,
      match: {
        params: { ID },
      },
    } = this.props;
    dispatch({
      type: 'ExamManager/ChangeExamStatus',
      payload: {
        id: ID, // id
        data: {
          status: '已上架', // 0：拟制中；1：已上架；2：已下架；3：已归档
        },
      },
      callback: res => {
        if (res.status === 'ok') {
          message.success(`${msg}成功`);
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
    });
  };

  // ---------------单个删除---------------
  // 单个删除
  deleteConfirm = delID => {
    const IDArr = [];
    IDArr.push(delID);
    const {
      dispatch,
      currenttrainmanagers,
      match: {
        params: { ID },
      },
    } = this.props;
    const {
      pagination: { current, pageSize },
      selectedAllKeys,
    } = this.state;
    const flag = selectedAllKeys.indexOf(delID); // 用于判断该数据是否已经选中存放到selectedAllKeys数组中
    const len = currenttrainmanagers.count; // 获取该页数据条数
    dispatch({
      type: 'ExamManager/DelOneData',
      payload: {
        id: ID, // 试卷id
        data: {
          trainmanagers: IDArr, // 字符串转换成数组
        },
      },
      callback: res => {
        if (res.status === 'ok') {
          message.success('删除成功');
          console.log(selectedAllKeys);
          if (flag > -1) {
            selectedAllKeys.splice(flag, 1);
            this.setState({
              selectedAllKeys,
            });
          }
          if (current > 1 && len === 1) {
            const prePage = current - 1;
            this.setState({
              pagination: {
                current: prePage,
                pageSize,
              },
            });
            this.getTableData(prePage, pageSize);
          } else {
            this.getTableData(current, pageSize);
          }
        } else {
          message.warning('删除失败');
        }
      },
    });
  };
  // ---------------单个删除---------------

  // 点击“增加培训管理员”，显示模态框
  addMember = () => {
    // 默认是获取第一页数据
    this.setState({
      addVisible: true, // 增加培训管理员的模态框————>显示隐藏
    });
  };

  // ---------------增加培训管理员模态框---------------
  modaladdcallback = (visible, refresh = false) => {
    console.log('visiblecallback', visible);
    this.setState({
      addVisible: visible,
    });
    if (refresh) {
      // const {
      //   pagination: { current, pageSize },
      // } = this.state;
      // this.getTableData(current, pageSize);
    }
  };

  modaldelcallback = (visible, refresh = false) => {
    console.log('modaldelcallback', visible);
    this.setState({
      delVisible: visible,
      selectedAllKeys: [],
    });
    if (refresh) {
      // const {
      //   pagination: { current, pageSize },
      // } = this.state;
      // this.getTableData(current, pageSize);
    }
  };

  render() {
    const {
      selectedAllKeys,
      // pagination ,
      delVisible,
      addVisible,
    } = this.state;

    const {
      currenttrainmanagers,
      location: {
        query: { currentType },
      },
      currenttrainmanagersLoading,
      detailLoading,
    } = this.props;

    // ---------------增加培训管理员模态框---------------
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
            title: '已创建考试计划',
            dataIndex: 'createdPlan',
            key: 'createdPlan',
            render: (text, record) => <span>{record.created}</span>,
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
                  <a disabled={record.created === '是'}>删除</a>
                </Popconfirm>
              </span>
            ),
          },
        ];
      }
      return arr;
    };

    return (
      <PageHeaderWrapper title={`试卷编辑（${currentType}）`}>
        <Spin spinning={detailLoading}>
          <ExamBasicInfo loading={detailLoading} isShow={false} {...this.props} />
        </Spin>
        <Card className={styles.listManagerContent}>
          <div className={styles.tableContent}>
            <div className={styles.searchContent}>
              <div>
                <span>可以使用本试卷的培训管理员：</span>
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
              columns={columns()}
              data={currenttrainmanagers}
              loading={currenttrainmanagersLoading}
              onSelectRow={this.handleSelectRows}
              action="ExamManager/GetTrainmanagers"
              selectedRows={selectedAllKeys}
            />
          </div>
          <div className={styles.foonter_btns}>
            {currentType === '拟制中' ? (
              <Button type="primary" onClick={() => this.changeExamStatus('上架')}>
                上架
              </Button>
            ) : null}
            {currentType === '已下架' ? (
              <Button type="primary" onClick={() => this.changeExamStatus('重新上架')}>
                重新上架
              </Button>
            ) : null}
            <Button onClick={() => router.push('/exam/examManager/index')}>返回</Button>
          </div>
        </Card>
        <ModalAdd
          {...this.props}
          visible={addVisible}
          visiblecallback={this.modaladdcallback}
          listActiontype="ExamManager/GetOtherTrainmanagers"
          addActiontype="ExamManager/SubmitAddedData"
        />
        <ModalDel
          {...this.props}
          selectedAllKeys={selectedAllKeys}
          visible={delVisible}
          visiblecallback={this.modaldelcallback}
          delAtiontype="ExamManager/DelBatch"
        />
      </PageHeaderWrapper>
    );
  }
}

export default CommonConent;
