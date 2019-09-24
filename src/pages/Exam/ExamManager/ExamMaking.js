import React, { Component } from 'react';
import CommonConent from './CommonConent';

class ExamMaking extends Component {
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
    return <CommonConent ID={ID} currentType="拟制中" />;
  }
}

export default ExamMaking;
