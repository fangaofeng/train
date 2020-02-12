import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

class OnlineExam extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getCurrentStep() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    switch (pathList[pathList.length - 2]) {
      case 'login':
        return 'login';
      case 'answer':
        return 'answer';
      default:
        return 'login';
    }
  }

  render() {
    const { children } = this.props;
    return (
      <PageHeaderWrapper title={this.getCurrentStep() === 'login' ? '在线考试' : '在线答题'}>
        {children}
      </PageHeaderWrapper>
    );
  }
}

export default OnlineExam;
