import React, { useState } from 'react';
import Pdfview from '@/components/learncourse/pdf';
import Video from '@/components/learncourse/video';
import { Layout, Spin } from 'antd';
import QuestionSider from '@/components/learncourse/question';
import { learnPublicProgressService } from '@/services';

const { Content, Sider } = Layout;

export function Learn(props) {
  const { serivce } = props;
  const {
    match: {
      params: { id },
    },
  } = props;
  const [ended, setEnded] = useState(false);
  const { data: progressInfo, loading: progressInfoloading } = serivce.retriveRequest(id);

  const { run: sendProgress } = serivce.patch();

  // 发送pdf的当前页码和学习状态
  const sendRequest = (newprogress, newstatus) => {
    sendProgress(id, {
      progress: newprogress,
      status: newstatus ? '已完成' : '学习中',
    });
    setEnded(newstatus);
  };

  const Playwindow = () => {
    if (progressInfo?.course && progressInfo?.course.file_type === 'MP4') {
      return <Video {...progressInfo} sendRequest={sendRequest} />;
    }
    if (progressInfo?.course && progressInfo?.course.file_type === 'PDF') {
      return (
        <Pdfview
          courseSrc={progressInfo?.course.courseware_file}
          pageNumber={progressInfo?.progress.numpage}
          sendRequest={sendRequest}
        />
      );
    }
    return null;
  };

  return (
    <Spin spinning={progressInfoloading}>
      <Layout>
        <Content>
          <Playwindow />
        </Content>
        <Sider width={300}>
          {progressInfo?.course ? <QuestionSider {...progressInfo} ended={ended} /> : null}
        </Sider>
      </Layout>
    </Spin>
  );
}

export default props => Learn({ serivce: learnPublicProgressService, ...props });
