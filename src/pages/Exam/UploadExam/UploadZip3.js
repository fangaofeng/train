/* eslint-disable no-restricted-syntax */
import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Button } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import SubmitSuccessCard from '@/components/SubmitSuccessCard';

@connect(({ uploadExam }) => ({
  testInfo: uploadExam.testInfo, // 试卷信息
  selectedTableData: uploadExam.selectedTableData, // 已经选择的表格数据
}))
class UploadZip3 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { testInfo } = this.props;
    if (Object.keys(testInfo).length === 0) {
      router.push('/exam/uploadZip/uploadZip1');
    }
  }

  render() {
    const { testInfo } = this.props;

    return (
      <PageHeaderWrapper title="试卷上架成功">
        <SubmitSuccessCard
          successFlag="success"
          title="试卷上架成功"
          layout="horizontal"
          infoMsgConfig={{
            试卷名称: testInfo.name,
            试卷编号: testInfo.number,
          }}
          btns={
            <Fragment>
              <Button type="primary" onClick={() => router.push('/exam/index')}>
                返回
              </Button>
            </Fragment>
          }
        />
      </PageHeaderWrapper>
    );
  }
}

export default UploadZip3;
