import React, { useReducer } from 'react';
import { useSelector, useDispatch } from 'dva';
import { Button, message, Modal } from 'antd';
import UserSelect from './ViewSelect';

function reducer(state, action) {
  switch (action.type) {
    case 'selectedKeys':
      return { selectedKeys: action.rows };
    default:
      throw new Error();
  }
}
export default props => {
  const { subname, id, visiblecallback, visible, addAction, operationname } = props;
  const storedispatch = useDispatch();
  const addloading = useSelector(store => store.loading.effects[addAction]);
  const [state, statedispatch] = useReducer(reducer, { selectedKeys: [] });

  const toperationname = operationname || '增加';

  const addHandleOk = () => {
    const { selectedKeys } = state;
    if (selectedKeys.length < 1) {
      message.info(`请选择您需要${toperationname}的${subname}！`);
      return;
    }

    storedispatch({
      type: addAction,
      payload: {
        id,
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

  const addHandleCancel = () => {
    visiblecallback(false);
  };

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
      <UserSelect
        onSelectKeys={rows => statedispatch({ type: 'selectedKeys', rows })}
        preparams={{ department: id }}
      />
    </Modal>
  );
};
