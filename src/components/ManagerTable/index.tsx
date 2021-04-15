import React, { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { request, useRequest } from 'umi';

export default props => {
  const { service, columns, newaction, extrabutton = [] } = props;
  const actionRef = useRef<ActionType>();
  const destroy = useRequest(id => service.destroy(id), {
    manual: true,
    fetchKey: id => id,
    onError: (error, params) => {
      message.error(`删除失败： ${params[0]}`);
    },
    onSuccess: (result, params) => {
      if (result) {
        message.success(`删除成功： ${params[0]}`);
        if (actionRef.current) {
          actionRef.current.reload();
        }
      }
    },
  });

  const patch = useRequest((id, data) => service.patch(id, data), {
    manual: true,
    fetchKey: id => id,
    onError: (error, params) => {
      message.error(`修改失败： ${params[0]}`);
    },
    onSuccess: (result, params) => {
      if (result) {
        message.success(`修改成功 ${params[0]}`);
        if (actionRef.current) {
          actionRef.current.reload();
        }
      }
    },
  });

  const bulkdel = useRequest(data => service.bulkdel(data), {
    manual: true,
    onError: (error, params) => {
      message.error(`修改失败： ${params[0]}`);
    },
    onSuccess: (result, params) => {
      if (result) {
        message.success(`批量删除成功 ${params[0]}`);
        if (actionRef.current) {
          actionRef.current.reload();
        }
      }
    },
  });

  return (
    <ProTable
      columns={columns(destroy, patch)}
      request={async (params = {}) => {
        const { data } = await request(service.list(), {
          params,
        });
        return {
          data: data.results,
          current: params.current,
          success: true,
          total: data.count,
        };
      }}
      actionRef={actionRef}
      rowKey="id"
      rowSelection={{}}
      dateFormatter="string"
      toolBarRender={(action, { selectedRows }) => [
        <Button icon={<PlusOutlined />} type="primary" onClick={() => newaction(true)}>
          新建
        </Button>,
        selectedRows && selectedRows.length > 0 && (
          <Button type="danger" onClick={() => bulkdel.run(selectedRows)}>
            批量删除
          </Button>
        ),
        ...extrabutton,
      ]}
      tableAlertRender={(selectedRowKeys, selectedRows) =>
        selectedRows &&
        selectedRows.length > 0 && (
          <div>
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
          </div>
        )
      }
    />
  );
};
