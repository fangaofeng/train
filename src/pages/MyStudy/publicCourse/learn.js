import React, { useState, useEffect } from 'react';
import Pdfview from '@/components/learncourse/pdf';
import Video from '@/components/learncourse/video';
import { Layout, Spin } from 'antd';
import QuestionSider from '@/components/learncourse/question';
import { useSelector, useDispatch } from 'dva';

const { Content, Sider } = Layout;

export default function Learn(props) {
  const {
    match: {
      params: { id },
    },
  } = props;
  const [ended, setEnded] = useState(false);
  const progressInfo = useSelector(store => store.PublicCourse.progressInfo);
  const progressInfoloading = useSelector(
    store => store.loading.effects['PublicCourse/GetPubliceProgressDetail']
  );
  const storedispatch = useDispatch();

  const { course, progress } = progressInfo;

  // const getPublicProgressDetail = () => {
  //   storedispatch({
  //     type: 'PublicCourse/GetPubliceProgressDetail',
  //     payload: {
  //       id, // 页码
  //     },
  //   });
  // };

  useEffect(() => {
    storedispatch({
      type: 'PublicCourse/GetPubliceProgressDetail',
      payload: {
        id,
      },
    });
  }, []);

  // 发送pdf的当前页码和学习状态
  const sendRequest = (newprogress, newstatus) => {
    storedispatch({
      type: 'MyLearnPlan/SendProgress',
      payload: {
        id,
        data: {
          progress: newprogress,
          status: newstatus ? '已完成' : '学习中',
        },
      },
    });

    setEnded(newstatus);
  };

  const Playwindow = () => {
    if (course && course.file_type === 'MP4') {
      return <Video dispatch={storedispatch} {...progressInfo} sendRequest={sendRequest} />;
    }
    if (course && course.file_type === 'PDF') {
      return (
        <Pdfview
          courseSrc={course.courseware_file}
          pageNumber={progress.numpage}
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
          {course ? <QuestionSider {...progressInfo} ended={ended} /> : null}
        </Sider>
      </Layout>
    </Spin>
  );
}
