import React from 'react';
import { List, Card } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { noticesService } from '@/services';
import styles from './style.less';

function Center() {
  const { data: notices, loading, pagination } = noticesService.listRequest();
  const pageConifg = {
    ...pagination,
    showTotal: total => `共 ${total} 条记录`,
  };

  return (
    <PageHeaderWrapper>
      <Card title="通知" style={{ marginBottom: 24 }} bordered={false}>
        <List
          size="large"
          className={styles.articleList}
          rowKey="id"
          itemLayout="vertical"
          pagination={pageConifg}
          dataSource={notices?.list}
          loading={loading}
          locale={{
            emptyText: <div>没有消息</div>,
          }}
          renderItem={item => (
            <List.Item
              key={item.id}
              // actions={[
              //   <IconText type="star-o" text={item.star} />,
              //   <IconText type="like-o" text={item.like} />,
              //   <IconText type="message" text={item.message} />,
              // ]}
            >
              <List.Item.Meta
                title={<a className={styles.listItemMetaTitle}>{item.task.verb}</a>}
                description={
                  <div>
                    <div className={styles.description}>{item.task.description}</div>
                    <div className={styles.datetime}>{item.created}</div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </PageHeaderWrapper>
  );
}

export default Center;
