import React, { useState } from 'react';
import { Steps, Button, message, Row, Col, Card } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useModel } from 'umi';
import UploadFile0 from './UploadZip0';
import UploadFile1 from './UploadZip1';
import UploadFile2 from './UploadZip2';
import UploadFile3 from './UploadZip3';

const { Step } = Steps;

function Upload() {
  const [current, setCurrent] = useState(0);
  const [zipInfo, setZipInfo] = useState({});
  const [fileList, setFileList] = useState([]);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const {
    initialState: { uploadurl },
  } = useModel('@@initialState');

  const steps = [
    {
      title: '选择文件',
      content: (
        <UploadFile0
          uploadurl={uploadurl.course}
          next={next}
          prev={prev}
          setZipInfo={setZipInfo}
          setFileList={setFileList}
          fileList={fileList}
        />
      ),
    },
    {
      title: '修改参数',
      content: (
        <UploadFile1
          next={next}
          prev={prev}
          zipInfo={zipInfo}
          setZipInfo={setZipInfo}
          fileList={fileList}
        />
      ),
    },
    {
      title: '上传文件',
      content: <UploadFile2 next={next} prev={prev} zipInfo={zipInfo} fileList={fileList} />,
    },
    {
      title: '显示结果',
      content: <UploadFile3 zipInfo={zipInfo} />,
    },
  ];

  return (
    <PageHeaderWrapper>
      <Card>
        <Row>
          <Col xs={24} sm={24} md={8} lg={6} xl={4}>
            <Steps direction="vertical" current={current}>
              {steps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
          </Col>
          <Col xs={24} sm={24} md={16} lg={18} xl={20}>
            <div className="steps-content">{steps[current].content}</div>
            {/* <div className="steps-action">
              {current < steps.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                  Next
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button type="primary" onClick={() => message.success('Processing complete!')}>
                  Done
                </Button>
              )}
              {current > 0 && (
                <Button style={{ margin: 8 }} onClick={() => prev()}>
                  Previous
                </Button>
              )}
            </div> */}
          </Col>
        </Row>
      </Card>
    </PageHeaderWrapper>
  );
}
export default Upload;
