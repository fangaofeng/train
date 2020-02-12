import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { message, Card, Divider, Row, Col } from 'antd';
import { connect } from 'dva';
import moment from 'moment';

@connect(() => ({}))
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = { body: '', title: '' };
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      dispatch,
    } = this.props;

    dispatch({
      type: 'Announcement/GetArticleDetail',
      payload: {
        id,
      },
      callback: res => {
        if (res && res.status === 'ok') {
          this.setState({ ...res.data });
        } else {
          message('获取数据失败');
        }
      },
    });
  }

  render() {
    const { body, title, pub_time: pubTime, views } = this.state;
    return (
      <PageHeaderWrapper title="公告详情">
        <Row gutter={8}>
          <Col xs={24} sm={24} md={24} lg={18} xl={16}>
            <Card title={title} headStyle={{ textAlign: 'center' }} bordered={false}>
              {/* <img src={cover} alt="no" /> */}
              <div>
                <span>阅读次数: </span>
                <span>{views}</span>
                <Divider type="vertical" />
                <span>时间: </span>
                <span>{moment(pubTime).format('YYYY-MM-DD HH:mm:ss')}</span>
              </div>

              {/* <Divider /> */}
              {/* eslint-disable-next-line react/no-danger */}
              <br />
              <div dangerouslySetInnerHTML={{ __html: body }} />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={6} xl={8}>
            <Card title="最近公告" />
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default Detail;
