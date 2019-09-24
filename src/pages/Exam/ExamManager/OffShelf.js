import React, { Component } from 'react';
import CommonConent from './CommonConent';

class ExamOffShelf extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 页面渲染完成前
  componentWillMount() {}

  render() {
    const {
      match: {
        params: { ID },
      },
    } = this.props;
    return <CommonConent ID={ID} currentType="已下架" />;
  }
}

export default ExamOffShelf;
