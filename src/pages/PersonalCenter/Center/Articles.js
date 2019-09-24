import React, { PureComponent } from 'react';
import { List, Icon, Tag, Card } from 'antd';
import { connect } from 'dva';
import ArticleListContent from '@/components/ArticleListContent';
import styles from './Articles.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({ list }) => ({
  list,
}))
class Center extends PureComponent {
  render() {
    const {
      list: { list },
    } = this.props;
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    return (
      <PageHeaderWrapper title="消息中心">
        <Card title="通知" style={{ marginBottom: 24 }} bordered={false}>
          <List
            size="large"
            className={styles.articleList}
            rowKey="id"
            itemLayout="vertical"
            dataSource={list}
            locale={{
              emptyText: <div>没有消息</div>,
            }}
            renderItem={item => (
              <List.Item
                key={item.id}
                actions={[
                  <IconText type="star-o" text={item.star} />,
                  <IconText type="like-o" text={item.like} />,
                  <IconText type="message" text={item.message} />,
                ]}
              >
                <List.Item.Meta
                  title={
                    <a className={styles.listItemMetaTitle} href={item.href}>
                      {item.title}
                    </a>
                  }
                  description={
                    <span>
                      <Tag>Ant Design</Tag>
                      <Tag>设计语言</Tag>
                      <Tag>蚂蚁金服</Tag>
                    </span>
                  }
                />
                <ArticleListContent data={item} />
              </List.Item>
            )}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Center;
