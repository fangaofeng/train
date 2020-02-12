import React from 'react';
import { useSelector, useDispatch } from 'dva';
import PageTable from '@/components/PageTable';

export default props => {
  const { onSelectKeys } = props;
  const listdata = useSelector(state => state.trainGroupManager.trainGroups);
  const loading = useSelector(state => state.loading.effects['trainGroupManager/GetTrainGroups']);
  const storedispatch = useDispatch();
  const columns = [
    {
      title: '培训群组编号',
      dataIndex: 'train_group_number',
      key: 'train_group_number',
      render: (text, record) => <span>{record.group_no}</span>,
    },
    {
      title: '培训群组名称',
      dataIndex: 'train_group_name',
      key: 'train_group_name',
      render: (text, record) => <span>{record.name}</span>,
    },
    {
      title: '群组成员',
      dataIndex: 'train_group_member',
      key: 'train_group_member',
      render: (text, record) => <span>{record.count}</span>,
    },
  ];

  return (
    <PageTable
      dispatch={storedispatch}
      onSelectRow={onSelectKeys}
      data={listdata}
      columns={columns}
      loading={loading}
      action="trainGroupManager/GetTrainGroups"
    />
  );
};
