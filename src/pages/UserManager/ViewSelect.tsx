import React, { useState, useEffect } from 'react';
import { request } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import { Card, Button, Col, Row, Input } from 'antd';
import DepartmentSelect from '../DepartmentManager/ViewSelect';
import ProTable, { ProColumns, TableDropdown } from '@ant-design/pro-table';
import { userService } from '@/services';
import styles from './ViewSelectstyle.less';

function UserSelecView(props) {
  const { onSelectKeys, preparams, servicepath = null, params = {}, type = null } = props;
  const columns = [
    {
      title: '编号',
      dataIndex: 'user_no',
      hideInSearch: true,
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '部门',
      hideInSearch: true,
      dataIndex: 'department_name',
    },
    {
      title: '部门',
      dataIndex: 'department',
      hideInTable: true,
      renderFormItem: (item, config) => {
        return <DepartmentSelect style={{ width: '100%' }} />;
      },

      defaultValue: preparams?.department || null,
    },
    {
      title: '职务',
      dataIndex: 'employee_position',
    },
    {
      title: '角色',
      dataIndex: 'role_display',
    },
  ];
  const path = servicepath || userService.list(params);
  return (
    <Card bordered={false}>
      <div className={styles.tableList}>
        <ProTable
          type={type}
          columns={columns}
          request={async (tparams = {}) => {
            console.log(tparams);
            const { data } = await request(path, { params: { ...tparams } });
            return {
              data: data.results,
              current: tparams.current,
              success: true,
              total: data.count,
            };
          }}
          rowSelection={{}}
          rowKey="id"
          dateFormatter="string"
          tableAlertRender={(selectedRowKeys, selectedRows) =>
            selectedRows &&
            selectedRows.length > 0 && (
              <div>
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
              </div>
            )
          }
        />
      </div>
    </Card>
  );
}
export default UserSelecView;
