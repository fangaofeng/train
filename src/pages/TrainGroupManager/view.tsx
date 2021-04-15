import React from 'react';
import { Descriptions, Card, Button } from 'antd';
import { history } from 'umi';
import UserSelect from '@/pages/UserManager/ViewSelect';
import { groupsService } from '@/services';
import styles from '@/components/styles.less';
export default props => {
  const {
    match: {
      params: { id },
    },
    location: {
      query: { num, name },
    },
  } = props;

  return (
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
  );
};
