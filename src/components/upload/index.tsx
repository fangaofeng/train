import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Card, Button, Progress, Upload, Row, Col, message } from 'antd';
import { history } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import uploadSuccess from '@/assets/images/upload_success.png';
import storetoken from '@/utils/token';
import styles from './style.less';

function UploadManager(props) {
  const { uploadurl, name, ShowData } = props;

  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadFileName, setUploadFileName] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [fileStatus, setFileStatus] = useState('removed');
  const [progressPercent, setProgressPercent] = useState(0);
  const [fileList, setFileList] = useState([]);
  // const [importcount, setImportcount] = useState(0);

  const beforeUpload = file => {
    setFileList([]); // 只能一次上传一个文件

    const filetype = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
    const fileTypeFlag = filetype === 'xls' || filetype === 'xlsx';
    // 测试关闭
    if (!fileTypeFlag) {
      message.warning('请根据模板上传EXCEL文件，支持xls和xlsx。');
      return false;
    }
    setUploadFileName(file.name);
    return true;
  };

  // Upload组件OnChange调用的方法
  const uploadOnChange = info => {
    setFileList(info.fileList);
    if (info.file.status === 'uploading') {
      // 上传中
      setUploadStatus('uploading');
      setProgressPercent(Math.floor(info.file.percent));
      setFileStatus('uploading');
    } else if (info.file.status === 'done') {
      // 上传完成
      message.success(`${info.file.name}上传成功`);
      setUploadStatus('success');
      setProgressPercent(Math.floor(info.file.percent));
      setFileStatus('done');
      // setImportcount(info.file.response.importcount);
      setResponseData(info.file.response.data);
    } else if (info.file.status === 'error') {
      // 上传失败
      message.error(`${info.file.name}上传失败`);
      setUploadStatus('uploading');
      setFileStatus('error');
    } else {
      // 移除文件
      setUploadStatus('uploading');
      setFileStatus('removed');
      setProgressPercent(0);
      setUploadFileName('');
    }
  };

  const token = storetoken.get();
  const uploadProps = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const pageHeaderWrapperTitle = () => {
    let title = '';
    if (uploadStatus === 'uploading') {
      title = `${name}信息导入`;
    } else if (uploadStatus === 'success') {
      title = `${name}信息成功`;
    } else {
      title = `查看导入${name}数据`;
    }
    return title;
  };

  return (
    <PageHeaderWrapper title={pageHeaderWrapperTitle()}>
      <Card className={styles.ManagerContent}>
        {/* -------------上传组件Upload------------- */}
        <Upload
          showUploadList={false}
          accept=".xls,.xlsx"
          name="excelfile"
          action={uploadurl}
          // action='//jsonplaceholder.typicode.com/posts/'
          beforeUpload={beforeUpload}
          onChange={uploadOnChange}
          className="uploadContent"
          fileList={fileList}
          {...uploadProps}
        >
          <Button type="dashed" style={{ width: '100%' }}>
            <PlusOutlined />
            {`导入${name}信息（EXCEL模板）`}
          </Button>
        </Upload>
        {/* -------------上传中------------- */}
        <Row
          className={styles.uploadingExcelRow}
          style={{ display: uploadStatus === 'uploading' ? 'block' : 'none' }}
        >
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={{ span: 16, offset: 4 }}
            xl={{ span: 12, offset: 6 }}
            xxl={{ span: 8, offset: 8 }}
          >
            <div className={styles.uploadingExcel}>
              <div title={uploadFileName}>
                文件名称：
                <span>{uploadFileName || 'XXXXXX'}</span>
              </div>
              <div>{`正在导入${name}信息......`}</div>
              <div>
                <Progress
                  percent={progressPercent}
                  status={fileStatus === 'error' ? 'exception' : 'active'}
                />
              </div>
            </div>
          </Col>
        </Row>
        {/* -------------上传成功后------------- */}
        <div
          className={styles.uploadSuccessDiv}
          style={{ display: uploadStatus === 'success' ? 'block' : 'none' }}
        >
          <div>
            <img src={uploadSuccess} alt="上传成功" />
            <span>{`${name}信息导入成功`}</span>
          </div>
          <div>
            {`本次导入${name}数：`}
            <span>{responseData?.count}个</span>！
          </div>
        </div>
        <Row
          className={styles.uploadSuccessRow}
          style={{ display: uploadStatus === 'success' ? 'block' : 'none' }}
        >
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={{ span: 16, offset: 4 }}
            xl={{ span: 12, offset: 6 }}
            xxl={{ span: 8, offset: 8 }}
          >
            {ShowData(responseData)}
          </Col>
        </Row>
        {/* -------------完成------------- */}
        <div className={styles.foonter_btns}>
          <Button type="primary" style={{ display: uploadStatus === 'success' ? 'block' : 'none' }}>
            <a onClick={() => history.push('/DepartmentManager/index')}>返回</a>
          </Button>
        </div>
      </Card>
    </PageHeaderWrapper>
  );
}

export default UploadManager;
