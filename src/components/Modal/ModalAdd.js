import React, { Component } from 'react';
import { Button, Table, message, Input, Modal } from 'antd';

// import Link from 'umi/link';
// import { connect } from 'dva';
import styles from './Common.less';

const { Search } = Input;

// @connect(({ CourseManager, loading }) => ({
//   addtrainmanagers: CourseManager.addtrainmanagers, // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 新增可使用本课件的培训管理员
//   addtrainmanagersLoading: loading.effects['CourseManager/GetOthertrainmanagers'],
// }))
class ModalAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addConfirmLoading: false, // 增加培训管理员的模态框————>确定按钮 loading
      selectedKeys: [], // 增加培训管理员的模态框————>选中的数据组成的数组（只包含key值）
      addPagination: {
        current: 1, // 当前页数
        pageSize: 10, // 每页条数
        pageSizeOptions: ['10', '20', '30', '40'], // 指定每页可以显示多少条数据
        showQuickJumper: true, // 是否可以快速跳转至某页
        showSizeChanger: true, // 是否可以改变 pageSize
      },
    };
  }

  // 页面加载完成后
  componentDidMount() {}

  componentDidUpdate(prevProps) {
    const { visible } = this.props;
    if (prevProps.visible !== visible && visible === true) {
      const {
        addPagination: { current, pageSize },
      } = this.state;
      this.getAddTableData(current, pageSize);
    }
  }

  // ---------------增加培训管理员模态框---------------
  // “增加培训管理员”模态框，获取table表格数据(指定页码，指定每页条数)
  getAddTableData = (page, size) => {
    const {
      dispatch,
      match: {
        params: { ID },
      },
      listActiontype,
    } = this.props;
    dispatch({
      type: listActiontype,
      payload: {
        page, // 页码
        size, // 每页条数
        id: ID, // 课程id
      },
    });
  };

  // “增加培训管理员”模态框。分页、排序、筛选变化时触发。这边只有分页功能，没有排序和筛选
  handleAddTableChange = _pagination_ => {
    const { addPagination } = this.state;
    const { current, pageSize } = _pagination_;
    this.setState({
      addPagination: {
        ...addPagination,
        current,
        pageSize,
      },
    });
    this.getAddTableData(current, pageSize);
  };

  // 增加培训管理员模态框————>确定按钮
  addHandleOk = () => {
    const { selectedKeys } = this.state;
    const {
      dispatch,
      match: {
        params: { ID },
      },
      addActiontype,
      visiblecallback,
    } = this.props;
    if (selectedKeys.length < 1) {
      message.info('请选择您需要添加的培训管理员！');
      return;
    }
    this.setState({
      addConfirmLoading: true,
    });

    dispatch({
      type: addActiontype,
      payload: {
        id: ID, // 课件id

        selectedKeys,
      },
      callback: res => {
        if (res.status === 'ok') {
          message.success('培训管理员增加成功');
          this.setState({
            selectedKeys: [], // 选中的数据组成的数组（只包含key值）
            addPagination: {
              current: 1,
              pageSize: 10,
            },
          });
        } else {
          message.warning('培训管理员增加失败');
        }
        this.setState({
          addConfirmLoading: false,
        });
        visiblecallback(false, true);
      },
    });
  };

  // 增加培训管理员模态框————>取消按钮
  addHandleCancel = () => {
    console.log('取消按钮');
    const { visiblecallback } = this.props;
    this.setState({
      addConfirmLoading: false,
      selectedKeys: [], // 选中的数据组成的数组（只包含key值）
      addPagination: {
        current: 1,
        pageSize: 10,
      },
    });
    visiblecallback(false);
  };
  // ---------------增加培训管理员模态框---------------

  render() {
    const { addConfirmLoading, selectedKeys, addPagination } = this.state;

    const { addDataSource, addDataSourceLoading, visible } = this.props;

    // ---------------增加培训管理员模态框---------------
    // 表格分页配置(准备添加的培训管理员)
    const addPageConifg = {
      ...addPagination,
      total: addDataSource.count,
      showTotal: total => `共 ${total} 条记录`,
    };
    // 选中的表格行(准备添加的培训管理员)
    const addRowSelection = {
      selectedRowKeys: selectedKeys,
      // 选中项发生变化时的回调
      onChange: selectedRowKeys => {
        // console.log(selectedRowKeys, selectedRows);
        this.setState({
          selectedKeys: selectedRowKeys,
        });
      },
    };
    // 循环Table数据，添加key(准备添加的培训管理员)
    const dataSource = addDataSource.results.map(value =>
      Object.assign({}, value, { key: value.id })
    );
    // ---------------增加培训管理员模态框---------------
    // console.log('addVisible', visible);
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

    return (
      <Modal
        visible={visible}
        title="增加培训管理员"
        style={{ top: 150, minWidth: 800 }}
        bodyStyle={{ paddingTop: 0, paddingBottom: 0 }}
        onOk={this.addHandleOk}
        onCancel={this.addHandleCancel}
        confirmLoading={addConfirmLoading}
        footer={
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" loading={addConfirmLoading} onClick={this.addHandleOk}>
              确定
            </Button>
            <Button onClick={this.addHandleCancel}>取消</Button>
          </div>
        }
      >
        <div className={styles.listManagerContent}>
          <div style={{ paddingTop: 20 }}>
            <div className={styles.searchContent}>
              <div>
                <span>选择可以使用本课件的培训管理员：</span>
                <Search placeholder="输入培训管理员姓名或编号过滤" style={{ width: 300 }} />
              </div>
            </div>
            <Table
              bordered
              dataSource={dataSource}
              columns={commonColumns}
              loading={addDataSourceLoading}
              pagination={addPageConifg}
              onChange={this.handleAddTableChange}
              rowSelection={addRowSelection}
            />
          </div>
        </div>
      </Modal>
    );
  }
}

export default ModalAdd;
