import React from 'react';

import ProTable, { ProColumns, TableDropdown } from '@ant-design/pro-table';
import { groupsService } from '@/services';
import { request } from 'umi';

export default props => {
  const { onSelectKeys } = props;

  const columns = [
    {
      title: '培训群组编号',
      dataIndex: 'group_no',
      hideInSearch: true,
    },
    {
      title: '培训群组名称',
      dataIndex: 'name',
    },
    {
      title: '群组成员',
      dataIndex: 'count',
    },
  ];

  return (
    <ProTable
      columns={columns}
      request={async (params = {}) => {
        const { data } = await request(groupsService.list(), {
          params,
        });
        return {
          data: data.results,
          current: params.current,
          success: true,
          total: data.count,
        };
      }}
      rowSelection={onSelectKeys}
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
  );
};
