import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Divider, Row, Col } from 'antd';
import { announcementService } from '@/services';
import { useRequest } from 'umi';
import moment from 'moment';

function Detail(props) {
  const {
    match: {
      params: { id },
    },
  } = props;

  const { data, loading } = announcementService.retriveRequest(id);

  return (
    <PageHeaderWrapper title="公告详情">
      <Row gutter={8}>
        <Col xs={24} sm={24} md={24} lg={18} xl={16}>
          <Card
            loading={loading}
            title={data?.title}
            headStyle={{ textAlign: 'center' }}
            bordered={false}
          >
            {/* <img src={cover} alt="no" /> */}
            <div>
              <span>阅读次数: </span>
              <span>{data?.views}</span>
              <Divider type="vertical" />
              <span>时间: </span>
              <span>{moment(data?.pub_time).format('YYYY-MM-DD HH:mm:ss')}</span>
            </div>
            <br />
            <div dangerouslySetInnerHTML={{ __html: data?.body }} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={6} xl={8}>
          <Card title="最近公告" />
        </Col>
      </Row>
    </PageHeaderWrapper>
  );
}

export default Detail;
