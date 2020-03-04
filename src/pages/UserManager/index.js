import React, { Component } from 'react';
import { Card, Button, Form, Col, Row, Divider, Popconfirm, message, Input } from 'antd';
import router from 'umi/router';
import Link from 'umi/link';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from '@/components/styles.less';
import PageTable from '@/components/PageTable';
import ModalDel from '@/components/Modal/ModalDel';
import DepartmentSelect from '../DepartmentManager/ViewSelect';

const FormItem = Form.Item;
@connect(({ UserManager }) => ({
  Users: UserManager.Users, // 获取指定页码的表格数据
  // usersLoading: loading.effects['UserManager/GetUsers'],
}))
class UserManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false, // 是否显示批量删除的模态框
      selectedAllKeys: [], // 选中的数据组成的数组（只包含key值）
      params: {},
    };
  }

  // 页面加载完成后
  componentDidMount() {}

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
      visible: true,
    });
  };

  selectedRows = rows => {
    this.setState({ selectedAllKeys: rows });
  };

  // 单个删除
  deleteConfirm = id => {
    const { dispatch } = this.props;
    const { selectedAllKeys } = this.state;
    const flag = selectedAllKeys.indexOf(id); // 用于判断该数据是否已经选中存放到selectedAllKeys数组中
    dispatch({
      type: 'UserManager/DelUsers',
      payload: {
        data: [id],
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

  handleSearch = e => {
    e.preventDefault();

    const { form } = this.props;

    form.validateFields((err, values) => {
      if (err) return;
      console.log(this);
      this.setState({
        params: values,
      });
    });
  };

  renderSimpleForm = () => {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem label="部门">
              {getFieldDecorator('department')(<DepartmentSelect />)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem label="名称">
              {getFieldDecorator('name')(<Input placeholder="名称" style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
          </div>
        </div>
      </Form>
    );
  };

  render() {
    const { Users, dispatch } = this.props;
    const { selectedAllKeys, visible, params } = this.state;
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
            {this.renderSimpleForm()}
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
            // dispatch={dispatch}
            data={Users}
            params={params}
            columns={commonColumns}
            // loading={usersLoading}
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
          delAtiontype="UserManager/DelUsers"
        />
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(UserManager);
