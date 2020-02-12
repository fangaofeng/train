import React, { Component } from 'react';
import { Card, Button, Progress, Icon, Upload, Row, Col, message } from 'antd';
import router from 'umi/router';
// import Link from 'umi/link';
// import Redirect from 'umi/redirect';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import { getUploadUsersurl } from '@/services/uploadUrl/uploadUrl';
import uploadSuccess from '@/assets/images/upload_success.png';
import styles from './UploadUsers.less';
import PageTable from '@/components/PageTable';
import storetoken from '@/utils/token';

@connect(({ UserManager, settings, loading }) => ({
  zipfile: settings.uploadurl.zipfile,
  batchImportData: UserManager.batchImportData, // 获取指定页码的表格数据
  userloading: loading.effects['UserManager/GetbatchImportData'],
}))
class UploadUserStep1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /**
       * 首次默认是'before'。 上传前————'before'；上传中————'uploading'；上传成功————'success'
       */
      uploadStatus: 'before',
      isFirstUpload: true, // 是否是第一次上传
      uploadFileName: '', // 上传文件的文件名
      fileStatus: 'removed', // 上传中的文件的状态。uploading done error removed
      progressPercent: 0, // 上传进度条
      fileList: [], // 存放上传的文件

      importcount: -1, // 导入成功的数量
      // importid: '', // 导入成功后返回的信息
    };
  }

  // 页面加载完之后
  componentDidMount() {}

  // Upload组件beforeUpload调用的方法
  beforeUpload = file => {
    this.reset(); // 恢复初始状态
    const filetype = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
    const fileTypeFlag = filetype === 'xls' || filetype === 'xlsx';
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
      const {
        pagination: { current, pageSize },
      } = this.state;
      message.success(`${info.file.name}上传成功`);
      this.setState({
        uploadStatus: 'success',
        fileStatus: 'done',
        // importid: info.file.response.importid,
        importcount: info.file.response.importcount,
      });
      if (info.file.response.importcount === 0) {
        return;
      }
      this.getbatchImportData(current, pageSize);
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

  // 重置相关数据
  reset = () => {
    this.setState({
      uploadStatus: 'before', // 首次默认是'before'。 上传前————'before'；上传中————'uploading'；上传后————'after';上传成功————'success'
      isFirstUpload: true, // 是否是第一次上传
      uploadFileName: '', // 上传文件的文件名
      fileStatus: 'removed', // 上传中的文件的状态。uploading done error removed
      progressPercent: 0, // 上传进度条
      fileList: [], // 存放上传的文件

      importcount: 0, // 导入成功的数量
      // importid: '', // 导入成功后返回的信息
      pagination: {
        // 表格分页信息
        current: 1, // 当前页数
        pageSize: 10, // 每页条数
        pageSizeOptions: ['10', '20', '30', '40'], // 指定每页可以显示多少条数据
        showQuickJumper: true, // 是否可以快速跳转至某页
        showSizeChanger: true, // 是否可以改变 pageSize
      },
    });
  };

  render() {
    const {
      uploadFileName,
      isFirstUpload,
      fileList,
      uploadStatus,
      userloading,
      progressPercent,
      fileStatus,
      dispatch,
    } = this.state;
    // const uploadurl = getUploadUsersurl(); // 获取上传excel的地址
    const token = storetoken.get();
    const uploadProps = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    const { batchImportData, zipfile } = this.props;
    const { importcount } = this.state;

    // Table通用的columns
    const commonColumns = [
      {
        title: '员工编号',
        dataIndex: 'user_manager_number',
        key: 'user_manager_number',
        render: (text, record) => <span>{record.user_no}</span>,
      },
      {
        title: '姓名',
        dataIndex: 'user_manager_name',
        key: 'user_manager_name',
        render: (text, record) => <span>{record.name}</span>,
      },
      {
        title: '登录账号',
        dataIndex: 'user_manager_account',
        key: 'user_manager_account',
        render: (text, record) => <span>{record.username}</span>,
      },
      {
        title: 'EMAIL',
        dataIndex: 'user_manager_email',
        key: 'user_manager_email',
        render: (text, record) => <span>{record.email}</span>,
      },
      {
        title: '归属部门',
        dataIndex: 'user_manager_belong',
        key: 'user_manager_belong',
        render: (text, record) => <span>{record.department_name}</span>,
      },
      {
        title: '职务',
        dataIndex: 'user_manager_job',
        key: 'user_manager_job',
        render: (text, record) => <span>{record.employee_position}</span>,
      },
      {
        title: '用户类别',
        dataIndex: 'user_manager_type',
        key: 'user_manager_type',
        render: (text, record) => <span>{record.role_display}</span>,
      },
    ];

    return (
      <PageHeaderWrapper title={uploadStatus === 'success' ? '批量导入用户成功' : '批量导入用户'}>
        <Card className={styles.batchImportUsersContent}>
          {/* -------------上传组件Upload------------- */}
          <Upload
            showUploadList={false}
            accept=".xls,.xlsx"
            name="excelfile"
            action={zipfile}
            // action='//jsonplaceholder.typicode.com/posts/'
            beforeUpload={this.beforeUpload}
            onChange={this.uploadOnChange}
            className="uploadContent"
            fileList={fileList}
            {...uploadProps}
            style={{ display: uploadStatus === 'success' ? 'none' : 'block' }}
          >
            <Button type="dashed" style={{ width: '100%' }}>
              <Icon type="plus" theme="outlined" />
              {isFirstUpload ? '批量导入用户信息（EXCEL模板）' : '重新导入用户信息（EXCEL模板）'}
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
                  文件名称：<span>{uploadFileName || 'XXXXXX'}</span>
                </div>
                <div>正在导入用户数据......</div>
                <div>
                  <Progress
                    percent={progressPercent}
                    status={fileStatus === 'error' ? 'exception' : 'active'}
                  />
                </div>
              </div>
            </Col>
          </Row>
          {/* -------------提交成功后------------- */}
          <div
            className={styles.uploadSuccessDiv}
            style={{ display: uploadStatus === 'success' ? 'block' : 'none' }}
          >
            <div>
              <img src={uploadSuccess} alt="上传成功" />
              <span>用户信息导入成功</span>
            </div>
            <div>
              本次导入用户数：<span>{importcount}个</span>！
            </div>
          </div>
          <div
            className={styles.uploadSuccessRow}
            style={{ display: uploadStatus === 'success' ? 'block' : 'none' }}
          >
            <div style={{ marginBottom: 30 }}>本次导入用户:</div>
            <PageTable
              dispatch={dispatch}
              data={batchImportData}
              columns={commonColumns}
              loading={userloading}
              action="UserManager/GetbatchImportData"
            />
          </div>
          {/* -------------完成------------- */}
          <div className={styles.foonter_btns}>
            <Button
              type="primary"
              onClick={() => {
                router.push('/userManager/index');
              }}
              style={{ display: uploadStatus === 'success' ? 'block' : 'none' }}
            >
              完成
            </Button>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default UploadUserStep1;
