import React, { useState } from 'react';
import { Steps, Button, message, Row, Col, Card } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useModel } from 'umi';
import UploadFile0 from './UploadZip0';
import UploadFile1 from './UploadZip1';
import UploadFile2 from './UploadZip2';

const { Step } = Steps;

function Upload() {
  const [current, setCurrent] = useState(0);
  const [paperInfo, setPaperInfo] = useState({});
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
          uploadurl={uploadurl.paper}
          next={next}
          prev={prev}
          setPaperInfo={setPaperInfo}
          setFileList={setFileList}
          fileList={fileList}
        />
      ),
    },
    {
      title: '修改试卷',
      content: (
        <UploadFile1
          next={next}
          prev={prev}
          paperInfo={paperInfo}
          setPaperInfo={setPaperInfo}
          fileList={fileList}
        />
      ),
    },
    {
      title: '显示结果',
      content: <UploadFile2 paperInfo={paperInfo} />,
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
          </Col>
        </Row>
      </Card>
    </PageHeaderWrapper>
  );
}
export default Upload;
