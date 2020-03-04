/* eslint-disable no-restricted-syntax */
import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Button } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import SubmitSuccessCard from '@/components/SubmitSuccessCard';

@connect(({ uploadCourse }) => ({
  zipInfo: uploadCourse.zipInfo,
  selectedTableData: uploadCourse.selectedTableData, // 已经选择的表格数据
}))
class UploadZip3 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { zipInfo } = this.props;
    if (Object.keys(zipInfo).length === 0) {
      router.push('/courseware/uploadZip/uploadZip1');
    }
  }

  render() {
    const { zipInfo } = this.props;

    return (
      <PageHeaderWrapper title="课件上架成功">
        <SubmitSuccessCard
          successFlag="success"
          title="课件上架成功"
          layout="horizontal"
          infoMsgConfig={{
            课件编号: zipInfo.KJBH,
            课件名称: zipInfo.KJMC,
            '课   时': `${zipInfo.KS}小时`,
            讲师姓名: zipInfo.JSXM,
            讲师介绍: zipInfo.JSJS,
          }}
          btns={
            <Fragment>
              <Button
                type="primary"
                onClick={() => router.push('/courseware/coursewareManager/index')}
              >
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
