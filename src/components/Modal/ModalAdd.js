import React, { useReducer } from 'react';
import { useSelector, useDispatch } from 'dva';
import { Button, message, Input, Modal } from 'antd';
import PageTable from '@/components/PageTable';
// import Link from 'umi/link';
// import { connect } from 'dva';
import styles from './Common.less';

const { Search } = Input;

function reducer(state, action) {
  switch (action.type) {
    case 'selectedKeys':
      return { selectedKeys: action.rows };
    default:
      throw new Error();
  }
}
export default props => {
  const {
    listAction,
    addDataSource,
    name,
    subname,
    id,
    visiblecallback,
    visible,
    addAction,
    operationname,
  } = props;
  const storedispatch = useDispatch();
  const listdataloading = useSelector(store => store.loading.effects[listAction]);
  const addloading = useSelector(store => store.loading.effects[addAction]);
  const [state, statedispatch] = useReducer(reducer, { selectedKeys: [] });

  const toperationname = operationname || '增加';

  // 增加培训管理员模态框————>确定按钮
  const addHandleOk = () => {
    const { selectedKeys } = state;
    if (selectedKeys.length < 1) {
      message.info(`请选择您需要${toperationname}的${subname}！`);
      return;
    }

    storedispatch({
      type: addAction,
      payload: {
        id, // 课件id
        data: state.selectedKeys,
      },
      callback: res => {
        if (res && res.status === 'ok') {
          message.success(`${subname}${toperationname}成功`);
          statedispatch({ type: 'selectedKeys', rows: [] });
        } else {
          message.warning(`${subname}${toperationname}失败`);
        }
        visiblecallback(false, true);
      },
    });
  };

  // 增加培训管理员模态框————>取消按钮
  const addHandleCancel = () => {
    console.log('取消按钮');
    visiblecallback(false);
  };
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

  return (
    <Modal
      visible={visible}
      title={`${toperationname}${subname}`}
      style={{ top: 150, minWidth: 800 }}
      bodyStyle={{ paddingTop: 0, paddingBottom: 0 }}
      onOk={addHandleOk}
      onCancel={addHandleCancel}
      confirmLoading={addloading}
      footer={
        <div style={{ textAlign: 'center' }}>
          <Button type="primary" loading={addloading} onClick={addHandleOk}>
            确定
          </Button>
          <Button onClick={addHandleCancel}>取消</Button>
        </div>
      }
    >
      <div className={styles.listManagerContent}>
        <div style={{ paddingTop: 20 }}>
          <div className={styles.searchContent}>
            <div>
              <span>{`选择${name}的${subname}：`}</span>
              <Search placeholder={`输入${subname}过滤`} style={{ width: 300 }} />
            </div>
          </div>
          <PageTable
            dispatch={storedispatch}
            id={id}
            data={addDataSource}
            columns={commonColumns}
            loading={listdataloading}
            onSelectRow={rows => statedispatch({ type: 'selectedKeys', rows })}
            action={listAction}
            selectedRows={state.selectedKeys}
          />
        </div>
      </div>
    </Modal>
  );
};
