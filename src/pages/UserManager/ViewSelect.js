import React, { useState, useEffect } from 'react';
import hash from 'object-hash';
import { useSelector } from 'dva';
import { Card, Button, Form, Col, Row, Input } from 'antd';
import PageTable from '@/components/PageTable';
import DepartmentSelect from '../DepartmentManager/ViewSelect';

import styles from './ViewSelectstyle.less';

const FormItem = Form.Item;

function UserSelecView(props) {
  const { onSelectKeys, preparams, ColumnsOperation = [] } = props;
  const {
    form: { getFieldDecorator, setFieldsValue },
    form,
  } = props;
  const [params, setParams] = useState(preparams);
  const Users = useSelector(store => store.UserManager.Users);

  useEffect(() => {
    if (preparams) {
      setParams(preparams);
      setFieldsValue({
        department: preparams.department || '',
      });
    }
  }, [hash(preparams || '')]);

  const handleSearch = e => {
    e.preventDefault();

    form.validateFields((err, values) => {
      if (err) return;
      setParams(values);
    });
  };
  const handleFormReset = () => {
    form.resetFields();
    setParams({});
  };
  const columns = [
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
    ...ColumnsOperation,
  ];

  const renderSimpleForm = () => {
    return (
      <Form onSubmit={handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="部门">
              {getFieldDecorator('department')(<DepartmentSelect style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="名称">
              {getFieldDecorator('name')(<Input placeholder="名称" style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  };

  return (
    <Card bordered={false}>
      <div className={styles.tableList}>
        <div className={styles.tableListForm}>{renderSimpleForm()}</div>
        <PageTable
          data={Users}
          params={params}
          columns={columns}
          onSelectRow={onSelectKeys}
          action="UserManager/GetUsers"
        />
      </div>
    </Card>
  );
}
const WrappedUserSelecView = Form.create({ name: 'userSelecView' })(UserSelecView);
export default WrappedUserSelecView;
