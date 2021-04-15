import React from 'react';
import { Card, Button, Modal, Descriptions } from 'antd';
import styles from './Common.less';
import UserSelect from '@/pages/UserManager/ViewSelect';
import { groupsService } from '@/services';
import { history } from 'umi';

export default props => {
  const { num, name, id, visiblecallback, visible } = props;
  return (
    <Modal
      visible={visible}
      title="查看培训群组"
      style={{ top: 150, minWidth: 800 }}
      bodyStyle={{ padding: 0 }}
      onCancel={() => visiblecallback(false)}
      footer={
        <div style={{ textAlign: 'center' }}>
          <Button type="primary" onClick={() => visiblecallback(false)}>
            返回
          </Button>
        </div>
      }
    >
      <Card className={styles.managerContent}>
        <Descriptions>
          <Descriptions.Item label="名称">{name}</Descriptions.Item>
          <Descriptions.Item label="群组编号">{num}</Descriptions.Item>
        </Descriptions>
        <UserSelect servicepath={groupsService.getMembers(id)} />
        <div className={styles.foonter_btns}>
          <Button type="primary" onClick={() => history.goBack()}>
            返回
          </Button>
        </div>
      </Card>
    </Modal>
  );
};
