import React, { PureComponent } from 'react';
import { List, Card } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './style.less';

@connect(({ account }) => ({
  notices: account.notices,
}))
class Center extends PureComponent {
  render() {
    const { notices } = this.props;

    return (
      <PageHeaderWrapper title="消息中心">
        <Card title="通知" style={{ marginBottom: 24 }} bordered={false}>
          <List
            size="large"
            className={styles.articleList}
            rowKey="id"
            itemLayout="vertical"
            dataSource={notices.results}
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
}

export default Center;
