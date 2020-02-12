import React, { Component } from 'react';
import { TreeSelect, Card, Button, Divider, Popconfirm, message, Input } from 'antd';
import router from 'umi/router';
import Link from 'umi/link';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from '@/components/styles.less';
import PageTable from '@/components/PageTable';
import ModalDel from '@/components/Modal/ModalDel';

const { Search } = Input;
@connect(({ UserManager, loading }) => ({
  Users: UserManager.Users, // 获取指定页码的表格数据
  usersLoading: loading.effects['UserManager/GetUsers'],
}))
class UserManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeSelectValue: '', // 树形选择器的值

      visible: false, // 是否显示批量删除的模态框
      selectedAllKeys: [], // 选中的数据组成的数组（只包含key值）
    };
  }

  // 页面加载完成后
  componentDidMount() {}

  // 树形选择器的onChange事件
  treeSelectValueOnChange = value => {
    this.setState({
      treeSelectValue: value,
    });
  };

  // 批量导入用户
  goPage = () => {
    router.push('/UserManager/upload');
  };

  // 批量删除,如果选择了数据，则显示删除模态框
  batchDelete = () => {
    const { selectedAllKeys } = this.state;
    if (selectedAllKeys.length < 1) {
      message.info('请选择您需要删除的数据！');
      return;
    }
    this.setState({
      visible: false,
    });
  };

  selectedRows = rows => {
    this.setState({ selectedAllKeys: rows });
  };

  // 批量删除确认按钮
  handleOk = () => {};

  // 批量删除取消按钮
  handleCancel = () => {
    this.setState({
      visible: false,
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
        if (res && res.status === 'ok') {
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

  modaldelcallback = (visible, refresh = false) => {
    console.log(refresh);
    this.setState({ visible });
  };

  render() {
    const { Users, usersLoading, dispatch } = this.props;
    const { selectedAllKeys, visible, treeSelectValue } = this.state;

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
            <Link to={`/usermanager/edit/${record.id}`}>修改</Link>
            <Divider type="vertical" />
            <Popconfirm
              placement="topRight"
              title="确认删除这个用户吗？"
              onConfirm={() => this.deleteConfirm(record.id)}
              okText="确定"
              cancelText="取消"
            >
              <a type="link">删除</a>
            </Popconfirm>
          </span>
        ),
      },
    ];

    return (
      <PageHeaderWrapper title="用户管理">
        <Card className={styles.managerContent}>
          <div className={styles.searchContent}>
            <div className="">
              <TreeSelect
                className={styles.TreeSelect}
                value={treeSelectValue}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={treeData}
                placeholder="请选择部门"
                treeDefaultExpandAll
                onChange={this.treeSelectValueOnChange}
              />
              <Search
                className={styles.Search}
                placeholder="输入员工编号或名称过滤"
                onSearch={value => console.log(value)}
              />
            </div>
            <div className="">
              <Button type="primary" onClick={this.goPage}>
                批量导入用户
              </Button>
              <Button type="primary">
                <Link to="/userManager/create">增加用户</Link>
              </Button>
              <Button className="ant-btn-del" onClick={this.batchDelete}>
                批量删除用户
              </Button>
            </div>
          </div>

          <PageTable
            dispatch={dispatch}
            data={Users}
            columns={commonColumns}
            loading={usersLoading}
            onSelectRow={this.selectedRows}
            action="UserManager/GetUsers"
            selectedRows={selectedAllKeys}
          />
        </Card>
        <ModalDel
          dispatch={dispatch}
          selectedAllKeys={selectedAllKeys}
          visible={visible}
          visiblecallback={this.modaldelcallback}
          delAtiontype="trainGroupManager/DelTGManager"
        />
      </PageHeaderWrapper>
    );
  }
}

export default UserManager;
