/* eslint-disable no-restricted-syntax */
import React from 'react';

import { history } from 'umi';
import { Button } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import SubmitSuccessCard from '@/components/SubmitSuccessCard';

function UploadZip3(props) {
  const { zipInfo } = props;

  return (
    <SubmitSuccessCard
      successFlag="success"
      title="课件上架成功"
      layout="horizontal"
      infoMsgConfig={{
        课件编号: zipInfo.courseware_no,
        课件名称: zipInfo.name,
        '课   时': `${zipInfo.class_hour}小时`,
        讲师姓名: zipInfo.teachername,
        讲师介绍: zipInfo.teacherdesc,
      }}
      btns={
        <>
          <Button
            type="primary"
            onClick={() => history.push('/courseware/coursewareManager/index')}
          >
            返回
          </Button>
        </>
      }
    />
  );
}

export default UploadZip3;
