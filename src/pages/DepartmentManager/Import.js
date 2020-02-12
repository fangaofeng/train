import React, { Component } from 'react';
import { Card, Button, Progress, Icon, Upload, Row, Col, Spin, message } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import { getDepartmentUploadurl } from '@/services/uploadUrl/uploadUrl';
import uploadSuccess from '@/assets/images/upload_success.png';
import styles from './style.less';
import TreeEdit from '@/components/TreeEditDynamic';
import storetoken from '@/utils/token';
// const { TreeNode } = Tree;

@connect(({ loading, settings }) => ({
  orgExcelfile: settings.uploadurl.org,
  departmentloading: loading.effects['DepartmentManager/GetOrgsDeparments'],
}))
class DepartmentManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /**
       * 默认是'',调用接口判断。
       * 无部门————'noDep' ;
       * 有部门，没有用户————'noUser' ;
       * 有部门，有用户————'hasUser' ;
       * 上传中————'uploading'；
       * 上传成功后————'success'
       */
      uploadStatus: '',
      isFirstUpload: true, // 是否是第一次上传
      uploadFileName: '', // 上传文件的文件名
      fileStatus: 'removed', // 上传中的文件的状态。uploading done error removed
      progressPercent: 0, // 上传进度条
      fileList: [], // 存放上传的文件

      importcount: 0, // 导入的部门数
      treeData: [], // 树形控件数据
    };
  }

  // 页面将要加载完成
  // UNSAFE_componentWillMount() {}

  // Upload组件beforeUpload调用的方法
  beforeUpload = file => {
    this.setState({
      fileList: [], // 只能一次上传一个文件
    });

    const filetype = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
    const fileTypeFlag = filetype === 'xls' || filetype === 'xlsx';
    // 测试关闭
    if (!fileTypeFlag) {
      message.warning('请根据模板上传EXCEL文件，支持xls和xlsx。');
      return false;
    }
    this.setState({
      uploadFileName: file.name,
    });
    return true;
  };

  // Upload组件OnChange调用的方法
  uploadOnChange = info => {
    this.setState({
      fileList: info.fileList,
    });
    if (info.file.status === 'uploading') {
      // 上传中
      this.setState({
        isFirstUpload: false,
        uploadStatus: 'uploading',
        progressPercent: Math.floor(info.file.percent),
        fileStatus: 'uploading',
      });
    } else if (info.file.status === 'done') {
      // 上传完成
      message.success(`${info.file.name}上传成功`);
      this.setState({
        uploadStatus: 'success',
        fileStatus: 'done',
        treeData: info.file.response.importdata,
        importcount: info.file.response.importcount,
      });
    } else if (info.file.status === 'error') {
      // 上传失败
      message.error(`${info.file.name}上传失败`);
      this.setState({
        uploadStatus: 'uploading',
        fileStatus: 'error',
      });
    } else {
      // 移除文件
      this.setState({
        uploadStatus: 'uploading',
        fileStatus: 'removed',
        progressPercent: 0,
        uploadFileName: '',
      });
    }
  };

  // 有部门，没有用户,点击重新上传按钮
  reUpload = () => {
    this.setState({
      isFirstUpload: false,
      uploadStatus: 'noDep',
    });
  };

  render() {
    const { departmentloading, orgExcelfile } = this.props;
    const {
      uploadFileName,
      isFirstUpload,
      fileList,
      uploadStatus,
      progressPercent,
      fileStatus,
    } = this.state;
    // const uploadurl = getDepartmentUploadurl(); // 获取上传excel的地址
    const token = storetoken.get();
    const uploadProps = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    const { treeData, importcount } = this.state;

    const pageHeaderWrapperTitle = () => {
      let title = '';
      if (uploadStatus === 'uploading') {
        title = '部门信息导入';
      } else if (uploadStatus === 'success') {
        title = '部门信息导入成功';
      } else {
        title = '部门管理';
      }
      return title;
    };

    return (
      <PageHeaderWrapper title={pageHeaderWrapperTitle()}>
        <Card className={styles.departmentManagerContent}>
          {/* -------------上传组件Upload------------- */}
          <Upload
            showUploadList={false}
            accept=".xls,.xlsx"
            name="excelfile"
            action={orgExcelfile}
            // action='//jsonplaceholder.typicode.com/posts/'
            beforeUpload={this.beforeUpload}
            onChange={this.uploadOnChange}
            className="uploadContent"
            fileList={fileList}
            {...uploadProps}
          >
            <Button type="dashed" style={{ width: '100%' }}>
              <Icon type="plus" theme="outlined" />
              {isFirstUpload ? '批量导入部门信息（EXCEL模板）' : '重新导入部门信息（EXCEL模板）'}
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
                <div>正在导入部门信息......</div>
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
              <span>部门信息导入成功</span>
            </div>
            <div>
              本次导入部门数：
              <span>{importcount}个</span>！
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
              <Spin spinning={departmentloading}>
                <div className={styles.uploadSuccessPreview}>
                  <div style={{ marginBottom: 30 }}>本次导入部门:</div>
                  {/* <Tree showLine>{previewLoop(treeData)}</Tree> */}
                  <TreeEdit treeList={treeData} />
                </div>
              </Spin>
            </Col>
          </Row>
          {/* -------------完成------------- */}
          <div className={styles.foonter_btns}>
            <Button
              type="primary"
              style={{ display: uploadStatus === 'success' ? 'block' : 'none' }}
            >
              <a onClick={this.isAlreadyExist}>完成</a>
            </Button>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default DepartmentManager;
