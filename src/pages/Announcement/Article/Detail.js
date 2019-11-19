import React, { Component } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { message, Card } from 'antd';
import { connect } from 'dva';

@connect(() => ({}))
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = { body: '', title: '', cover: '' };
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      dispatch,
    } = this.props;

    dispatch({
      type: 'ArticleManager/GetArticleDetail',
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
    const { body, title, cover } = this.state;
    return (
      <PageHeaderWrapper title={title}>
        <Card title={title} bordered={false}>
          <img src={cover} alt="no" />
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Detail;
