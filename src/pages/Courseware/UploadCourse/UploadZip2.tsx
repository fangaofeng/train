import React, { useState, useEffect, useLayoutEffect } from 'react';

import { useUpdateEffect } from '@umijs/hooks';
import { CheckCircleFilled, UserOutlined } from '@ant-design/icons';
import { Card, Row, Col, Avatar, Button, message, Progress } from 'antd';
import SelfCard from '@/components/Workbench/selfCard';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import TreeSelect from '@/components/EditContent/tree';
import { coursewareService } from '@/services';
import styles from './UploadZip2.less';

// const { Search } = Input;

// @connect(({ uploadCourse }) => ({
//   zipInfo: uploadCourse.zipInfo,
//   zipfileResponse: uploadCourse.zipfileResponse,
// }))
function UploadZip2(props) {
  const { zipInfo, fileList, next } = props;
  const [uploading, setUploading] = useState(0);

  const handleUpload = id => {
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files[]', file);
    });
    formData.append('id', id);
    setUploading(true);

    // You can use any AJAX library you like
    // reqwest({
    //   url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    //   method: 'post',
    //   processData: false,
    //   data: formData,
    //   success: () => {
    //     setUploading(false);
    //   },
    //   error: () => {
    //     setUploading(false);
    //     message.error('upload failed.');
    //   },
    // });
    next();
  };
  const { run, loading } = coursewareService.createRequest(null, {
    manual: true,
    onSuccess: result => {
      handleUpload(result.id);
    },
  });

  useEffect(() => {
    run({ ...zipInfo });
  }, []);

  // 上架按钮

  return (
    <>
      <Progress />
      <Progress />
    </>
  );
}

export default UploadZip2;
