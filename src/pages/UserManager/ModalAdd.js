import React, { useReducer } from 'react';
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
  const { subname, id, visiblecallback, visible, addService, operationname, type } = props;
  const [state, statedispatch] = useReducer(reducer, { selectedKeys: [] });

  const toperationname = operationname || '增加';

  const addHandleOk = () => {
    const { selectedKeys } = state;
    if (selectedKeys.length < 1) {
      message.info(`请选择您需要${toperationname}的${subname}！`);
      return;
    }
    addService.run(id, selectedKeys);
    visiblecallback(false, true);
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
      confirmLoading={addService.loading}
      footer={
        <div style={{ textAlign: 'center' }}>
          <Button type="primary" loading={addService.loading} onClick={addHandleOk}>
            确定
          </Button>
          <Button onClick={addHandleCancel}>取消</Button>
        </div>
      }
    >
      <UserSelect
        type={type}
        onSelectKeys={rows => statedispatch({ type: 'selectedKeys', rows })}
        preparams={{ department: id }}
      />
    </Modal>
  );
};
