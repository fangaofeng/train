/* eslint-disable dot-notation */
/* eslint-disable prefer-destructuring */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Upload, Row, Col, message } from 'antd';

// import SelfCard from '@/components/Workbench/selfCard';

import JSZip from 'jszip';

import storetoken from '@/utils/token';

function UploadZip0(props) {
  const { uploadurl, setZipInfo, setFileList, fileList, next } = props;
  const [zipFileName, setZipFileName] = useState('');
  // const [fileList, setFileList] = useState([]);

  // 解析config.ini文件，生成对应的json
  const parseINIString = data => {
    const regex = {
      section: /^\s*\s*([^]*)\s*\]\s*$/,
      // eslint-disable-next-line no-useless-escape
      param: /^\s*([\w\.\-\_]+)\s*=\s*(.*?)\s*$/,
      comment: /^\s*;.*$/,
    };
    const value = {};
    const lines = data.split(/\r\n|\r|\n/);
    let section = null;
    lines.forEach(line => {
      if (regex.comment.test(line)) {
        // dfdfdf
      } else if (regex.param.test(line)) {
        const match = line.match(regex.param);
        if (section) {
          value[section][match[1]] = match[2];
        } else {
          value[match[1]] = match[2];
        }
      } else if (regex.section.test(line)) {
        const match = line.match(regex.section);
        value[match[1]] = {};
        section = match[1];
      } else if (line.length === 0 && section) {
        section = null;
      }
    });
    const obj = {};
    for (const i in value) {
      obj[i] = value[i].split(/\s+/)[0];
    }
    return obj;
  };

  // beforeUpload会调用
  const unzipHandler = file => {
    const zip = new JSZip();
    return zip
      .loadAsync(file)
      .then(zipObject => zipObject.files)
      .then(() => {
        return Promise.all([
          zip.file('config.ini').async('string'),
          zip.file('fb.jpg').async('base64'),
          zip.file('fhlhg.jpg').async('base64'),
        ]);
      })

      .then(contentlist => {
        const content = contentlist[0];
        // console.log(content);
        const objInfo = parseINIString(content);
        // console.log(objInfo);
        objInfo['teacherimg'] = `data:image/png;base64,${contentlist[1]}`;
        objInfo['cover'] = `data:image/png;base64,${contentlist[2]}`;
        return objInfo;
      });
  };

  // Upload组件beforeUpload调用的方法
  const beforeUpload = file => {
    const filetype = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
    if (filetype !== 'zip') {
      message.warning('请根据模板上传zip课件包');
      return false;
    }

    setZipFileName(file.name);
    unzipHandler(file)
      .then(data => {
        setZipInfo(data);
        next();
      })
      .catch(error => {
        message.error(error);
      });
    return false;
  };

  // Upload组件OnChange调用的方法
  const uploadOnChange = info => {
    setFileList(info.fileList);
    if (info.file.status === 'done') {
      message.success(`${info.file.name}上传成功`);
      // this.setState({
      //   isUploadDone: true,
      //   zipfileResponse: info.file.response.data.zipfileid,
      // });
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name}上传失败`);
      // this.setState({
      //   isUploadDone: false,
      // });
    } else {
      // this.setState({
      //   isUploadDone: false,
      // });
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
    // <Card className={styles.uploadZipContent}>
    //   <div className={styles.uploadZipStep}>
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
          // className={styles.uploadContent}
          className="uploadContent"
          fileList={fileList}
          {...uploadProps}
        >
          <Button disabled={!(fileList.length < 1)} type="dashed" style={{ width: '100%' }}>
            <PlusOutlined />
            选择课件包（ZIP）文件
          </Button>
        </Upload>
      </Col>
    </Row>
    //   </div>
    // </Card>
  );
}

export default UploadZip0;
