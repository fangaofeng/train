import React, { Component } from 'react';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Card, Input, List, Row, Col } from 'antd';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Link } from 'umi';
import moment from 'moment';
import { announcementService } from '@/services';
import { useRequest } from 'umi';
// import ArticleListContent from '@/components/ArticleListContent';
import styles from '@/components/styles.less';

const { Search } = Input;

function articleManager(props) {
  const { data, loading, pagination } = announcementService.listRequest();
  const pageConifg = {
    ...pagination,
    showTotal: total => `共 ${total} 条记录`,
  };
  const IconText = ({ type, text }) => (
    <span>
      <LegacyIcon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );

  return (
    <PageHeaderWrapper title="公告列表">
      <Row gutter={8} style={{ display: 'flex' }}>
        <Col xs={24} sm={24} md={24} lg={18} xl={16}>
          <Card className={styles.managerContent}>
            <div className={styles.searchContent}>
              <div className="">
                <Search
                  placeholder="输入文章编号或名称过滤"
                  onSearch={value => console.log(value)}
                  style={{ width: 300 }}
                />
              </div>
            </div>

            <List
              itemLayout="vertical"
              size="large"
              pagination={pageConifg}
              dataSource={data?.list}
              loading={loading}
              renderItem={item => (
                <List.Item
                  key={item.id}
                  actions={[
                    <IconText type="eye" text={item.views} key="list-vertical-star-o" />,
                    <IconText
                      type="history"
                      text={`发布时间: ${moment(item.pub_time).format('YYYY-MM-DD HH:mm')}`}
                      key="list-vertical-star-o"
                    />,
                  ]}
                  extra={
                    <Link to={`/announcement/detail/${item.id}`}>
                      <img height={172} alt="" src={item.thumbnail} />
                    </Link>
                  }
                >
                  <List.Item.Meta
                    title={<Link to={`/announcement/detail/${item.id}`}>{item.title} </Link>}
                    description={
                      <Link to={`/announcement/detail/${item.id}`}>{item.description} </Link>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>{' '}
        </Col>
        <Col xs={24} sm={24} md={24} lg={6} xl={8} style={{ display: 'flex' }}>
          <Card title="最近公告" style={{ width: '100%' }} />
        </Col>
      </Row>
    </PageHeaderWrapper>
  );
}
export default articleManager;
