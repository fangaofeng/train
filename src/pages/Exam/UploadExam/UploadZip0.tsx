/* eslint-disable prefer-destructuring */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Button, Upload, Row, Col, message, Input, Select, Avatar } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import SelfCard from '@/components/Workbench/selfCard';
import classNames from 'classnames';
import JSZip from 'jszip';
import { history, Link, useUpdateEffect } from 'umi';
import styles from './UploadZip1.less';
import storetoken from '@/utils/token';

function UploadZip0(props) {
  const { uploadurl, setPaperInfo, fileList, setFileList, next } = props;

  // Upload组件beforeUpload调用的方法
  const beforeUpload = file => {
    const filetype = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
    if (filetype !== 'zip') {
      message.warning('请根据模板上传zip课件包');
      return false;
    }
    return true;
  };

  // Upload组件OnChange调用的方法
  const uploadOnChange = info => {
    setFileList(info.fileList);

    if (info.file.status === 'done') {
      message.success(`${info.file.name}上传成功`);
      if (info.file.response && info.file.response.status === 'ok') {
        const tpaperInfo = {
          // 试卷编号
          number: info.file.response.data.paper_info['试卷编号'],
          // 试卷名称
          name: info.file.response.data.paper_info['试卷名称'],
          // 考试时长
          time: info.file.response.data.paper_info['考试时长'],
          // 试卷总分
          score: info.file.response.data.paper_info['试卷总分'],
          // 合格分数
          passScore: info.file.response.data.paper_info['合格分数'],
          // 适用对象
          applicablePerson: info.file.response.data.paper_info['适用对象'],
          // 试卷介绍
          introduce: info.file.response.data.paper_info['试卷简介'],
          // 封面
          cover: info.file.response.data.paper_info['试卷封面'],
          // 适用课程编号，不是必填
          applicableCourseNumber: info.file.response.data.paper_info['适用课程编号'],
          // 适用课程名称，不是必填
          applicableCourseName: info.file.response.data.paper_info['适用课程名称'],
        };
        setPaperInfo({
          zipfileid: info.file.response.data.zipfileid, // 上传成功后服务器返回的zip文件id
          zipfileResponse: {
            // 试卷信息
            tpaperInfo,
            // 试题信息
            questions: {
              // 实际总分
              totalScore: info.file.response.data.paper_info['实际总分'],
              // 单选题
              singlechoices: info.file.response.data.questions.singlechoices,
              // 多选题
              multichoices: info.file.response.data.questions.multichoices,
              // 判断题
              judgements: info.file.response.data.questions.judgements,
            },
          },
        });
        next();
      }
    }
    if (info.file.status === 'error') {
      message.error(`${info.file.name}上传失败`);
    }
  };

  const token = storetoken.get();
  const uploadProps = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  // const uploadurl = getUploadCouserurl();
  return (
    <Card className={styles.uploadZipContent}>
      <div className={styles.uploadZipStep}>
        <Row>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={{ span: 18, offset: 3 }}
            xxl={{ span: 16, offset: 4 }}
          >
            <Upload
              accept=".zip"
              name="zipfile"
              action={uploadurl}
              beforeUpload={beforeUpload}
              onChange={uploadOnChange}
              className="uploadContent"
              fileList={fileList}
              {...uploadProps}
            >
              <Button disabled={!(fileList.length < 1)} type="dashed" style={{ width: '100%' }}>
                <PlusOutlined />
                上传试卷包（ZIP）文件
              </Button>
            </Upload>
          </Col>
        </Row>
      </div>
    </Card>
  );
}

export default UploadZip0;
