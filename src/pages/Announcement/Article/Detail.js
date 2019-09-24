import React, { Component } from 'react';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { message, Card } from 'antd';
import { connect } from 'dva';

@connect(() => ({}))
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = { body: '', pubTime: '', title: '', description: '', status: '', cover: '' };
  }

  // 页面渲染完成前
  componentWillMount() {
    const {
      match: {
        params: { ID },
      },
      dispatch,
    } = this.props;

    dispatch({
      type: 'ArticleManager/GetArticleDetail',
      payload: {
        id: ID,
      },
      callback: res => {
        if (res.status === 'ok') {
          const { body, title, description, pubTime, cover, status } = res.data;
          // this.setState({body, title, description, pubTime, cover, status});
          this.setState({ ...res.data });
        } else {
          message('获取数据失败');
        }
      },
    });
  }

  render() {
    const { body, title, description, pubTime, cover, status } = this.state;
    return (
      <PageHeaderWrapper title={title}>
        <Card title={title} bordered={false}>
          <img src={cover} alt="no" />
          <p>{body}</p>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Detail;
