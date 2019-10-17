import React, { Component } from 'react';
import {
  TreeSelect,
  Modal,
  Card,
  Button,
  Table,
  Divider,
  Popconfirm,
  Icon,
  message,
  Input,
} from 'antd';
import router from 'umi/router';
// import Link from 'umi/link';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './index.less';

const { Search } = Input;
@connect(({ userManager, loading }) => ({
  allUsersTableData: userManager.allUsersTableData, // 获取指定页码的表格数据
  usersLoading: loading.effects['userManager/GetAllUserManagerTableData'],
}))
class UserManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeSelectValue: '', // 树形选择器的值

      visible: false, // 是否显示批量删除的模态框
      confirmLoading: false, // 确定按钮 loading
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
    };
  }

  // 页面加载完成后
  componentDidMount() {
    const {
      pagination: { current, pageSize },
    } = this.state;
    this.getAllTableData(current, pageSize);
  }

  // 树形选择器的onChange事件
  treeSelectValueOnChange = value => {
    this.setState({
      treeSelectValue: value,
    });
  };

  // 批量导入用户
  goPage = () => {
    router.push('/systemManager/userManager/upload');
  };

  // 批量删除,如果选择了数据，则显示删除模态框
  batchDelete = () => {
    const { selectedAllKeys } = this.state;
    if (selectedAllKeys.length < 1) {
      message.info('请选择您需要删除的数据！');
      return;
    }
    this.setState({
      visible: true,
      confirmLoading: false,
    });
  };

  // 批量删除确认按钮
  handleOk = () => {
    // this.setState({
    //   confirmLoading:true,
    // })
    // dispatch({
    //   type:'trainGroupManager/BatchDelTraingroups',
    //   payload: {
    //     id:selectedAllKeys
    //   },
    //   callback: (res) => {
    //     if (res.status === 'ok') {
    //       message.success('批量删除成功')
    //       this.setState({
    //         visible: false,
    //         confirmLoading:false,
    //         selectedAllKeys:[],// 选中的数据组成的数组（只包含key值）
    //         pagination: {
    //           current:1,
    //           pageSize:10,
    //         },
    //       });
    //       this.getTableData(1,10);
    //     }else{
    //       message.warning('批量删除失败')
    //       this.setState({
    //         confirmLoading:false,
    //       })
    //     }
    //   }
    // })
  };

  // 批量删除取消按钮
  handleCancel = () => {
    console.log('取消按钮');
    this.setState({
      visible: false,
      confirmLoading: false,
    });
  };

  // 单个删除
  deleteConfirm = id => {
    const { dispatch } = this.props;
    const { selectedAllKeys } = this.state;
    const flag = selectedAllKeys.indexOf(id); // 用于判断该数据是否已经选中存放到selectedAllKeys数组中
    dispatch({
      type: 'trainGroupManager/DelTGManager',
      payload: {
        id: id.split(' '), // 字符串转换成数组
      },
      callback: res => {
        if (res.status === 'ok') {
          message.success('删除成功');
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

  // 获取所有用户数据(指定页码，指定每页条数)
  getAllTableData = (page, size) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userManager/GetAllUserManagerTableData',
      payload: {
        page, // 页码
        size, // 每页条数
      },
    });
  };

  // 分页、排序、筛选变化时触发。这边只有分页功能，没有排序和筛选
  handleTableChange = _pagination_ => {
    const { pagination } = this.state;
    const { current, pageSize } = _pagination_;
    this.setState({
      pagination: {
        ...pagination,
        current,
        pageSize,
      },
    });
    this.getAllTableData(current, pageSize);
  };

  render() {
    const { allUsersTableData, usersLoading } = this.props;
    const { selectedAllKeys, pagination, visible, confirmLoading, treeSelectValue } = this.state;

    // 树形选择器测试数据
    const treeData = [
      {
        title: 'Node1',
        value: '0-0',
        key: '0-0',
        children: [
          {
            title: 'Child Node1',
            value: '0-0-1',
            key: '0-0-1',
          },
          {
            title: 'Child Node2',
            value: '0-0-2',
            key: '0-0-2',
          },
        ],
      },
      {
        title: 'Node2',
        value: '0-1',
        key: '0-1',
      },
    ];

    const pageConifg = {
      ...pagination,
      total: allUsersTableData.count,
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
    };
    // 循环Table数据，添加key
    const dataSource = allUsersTableData.results.map(value =>
      Object.assign({}, value, { key: value.id })
    );
    // Table通用的columns
    const commonColumns = [
      {
        title: '员工编号',
        dataIndex: 'user_manager_number',
        key: 'user_manager_number',
        render: (text, record) => <span>{record.user_no}</span>,
      },
      {
        title: '姓名',
        dataIndex: 'user_manager_name',
        key: 'user_manager_name',
        render: (text, record) => <span>{record.name}</span>,
      },
      {
        title: '登录账号',
        dataIndex: 'user_manager_account',
        key: 'user_manager_account',
        render: (text, record) => <span>{record.username}</span>,
      },
      {
        title: 'EMAIL',
        dataIndex: 'user_manager_email',
        key: 'user_manager_email',
        render: (text, record) => <span>{record.email}</span>,
      },
      {
        title: '归属部门',
        dataIndex: 'user_manager_belong',
        key: 'user_manager_belong',
        render: (text, record) => <span>{record.department_name}</span>,
      },
      {
        title: '职务',
        dataIndex: 'user_manager_job',
        key: 'user_manager_job',
        render: (text, record) => <span>{record.employee_position}</span>,
      },
      {
        title: '用户类别',
        dataIndex: 'user_manager_type',
        key: 'user_manager_type',
        render: (text, record) => <span>{record.role_display}</span>,
      },
      {
        title: '操作',
        dataIndex: 'user_manager_opt',
        key: 'user_manager_opt',
        render: (text, record) => (
          <span>
            <a href="#">修改</a>
            <Divider type="vertical" />
            <Popconfirm
              placement="topRight"
              title="确认删除这个用户吗？"
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

    return (
      <PageHeaderWrapper title="用户管理">
        <Card className={styles.userManagerContent}>
          <div className={styles.searchContent}>
            <div className="">
              <TreeSelect
                style={{ width: 250, marginRight: 20 }}
                value={treeSelectValue}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={treeData}
                placeholder="请选择部门"
                treeDefaultExpandAll
                onChange={this.treeSelectValueOnChange}
              />
              <Search
                placeholder="输入员工编号或名称过滤"
                onSearch={value => console.log(value)}
                style={{ width: 300 }}
              />
            </div>
            <div className="">
              <Button type="primary" onClick={this.goPage}>
                批量导入用户
              </Button>
              <Button type="primary">增加用户</Button>
              <Button className="ant-btn-del" onClick={this.batchDelete}>
                批量删除用户
              </Button>
            </div>
          </div>
          <Table
            dataSource={dataSource}
            loading={usersLoading}
            columns={commonColumns}
            pagination={pageConifg}
            onChange={this.handleTableChange}
            rowSelection={rowSelection}
          />
        </Card>
        <Modal
          visible={visible}
          title="删除提示"
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '40px 0',
            }}
          >
            <Icon
              type="exclamation-circle"
              theme="filled"
              style={{ color: '#faad14', fontSize: '24px', marginRight: '15px' }}
            />
            确认删除这些用户吗？
          </div>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default UserManager;
