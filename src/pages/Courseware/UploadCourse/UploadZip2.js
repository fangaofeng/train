import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Card, Table, Row, Col, Avatar, Input, Button, message, Modal, Icon } from 'antd';
import SelfCard from '@/components/Workbench/selfCard';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './UploadZip2.less';

const { Search } = Input;

@connect(({ uploadCourse, TrainGroupManage }) => ({
  zipInfo: uploadCourse.zipInfo,
  zipfileResponse: uploadCourse.zipfileResponse,
  tableData: TrainGroupManage.tableData, // 获取指定页码的表格数据
}))
class UploadZip2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false, // 是否显示保存成功提示的模态框
      selectedAllKeys: [], // 选中的数据组成的数组（只包含key值）
      saveSelectedData: {}, // 保存选中的数据
      pagination: {
        // total:20,// 数据总数
        current: 1, // 当前页数
        pageSize: 10, // 每页条数
        pageSizeOptions: ['10', '20', '30', '40'], // 指定每页可以显示多少条数据
        showQuickJumper: true, // 是否可以快速跳转至某页
        showSizeChanger: true, // 是否可以改变 pageSize
      }, // 表格分页信息
      // loading: false,// 表格是否正在加载
    };
  }

  componentDidMount() {
    const { zipInfo } = this.props;
    if (Object.keys(zipInfo).length === 0) {
      router.push('/courseware/uploadZip/uploadZip1');
    }
    const { pagination } = this.state;
    this.getTrainmanagers(pagination.current, pagination.pageSize);
  }

  // 保存和上架时候，转换一下数据格式
  getRequestData = status => {
    const { zipInfo, zipfileResponse } = this.props;
    const { selectedAllKeys } = this.state;
    const obj = {
      zipfileid: zipfileResponse, // ;上传的zip返回值
      status, // ;保存'0',上架'1'
      courseware_no: zipInfo.KJBH, // ;课件编号：日期+当日新增课件的序号（12位数字，不允许重复，如10.31增加的第1个课件的编号为20181031+000001）
      name: zipInfo.KJMC, // ;课件名称：替换为实际课件名称（50个汉字以内）
      category: zipInfo.KJFL, // ;课件分类：0 公开课；1 非公开课
      courseware_type: zipInfo.KJLX, // ;课件类型：0 通用课件；1 合规基础课件；2 合规管理课件；3 其他
      intruduce: zipInfo.KJJS, // ;课件简介：替换为实际课件内容简介（250个汉字以内）
      applicable_user: zipInfo.SYDX, // ;适用对象：替换为本课程适用的人员群体描述（50个汉字以内）
      class_hour: zipInfo.KS, // ;课时：课件名义学时（取值范围0~4，小数点后面保留1位，后续用于学时统计）
      file_type: zipInfo.KJWJLX === '0' ? 'PDF' : 'MP4', // ;课件文件类型：0 PDF；1 MP4
      teachername: zipInfo.JSXM, // ;讲师姓名：替换为实际讲师姓名（25个汉字以内）
      teacherdesc: zipInfo.JSJS, // ;讲师介绍：替换为实际讲师信息简介（250个汉字以内）
      drag_flag: zipInfo.YXSPTF === '0', // ;是否允许视频拖放：0 不允许；1 允许
      trainmanagers: selectedAllKeys, // ;已选择的培训管理员
    };
    return obj;
  };

  // 保存选中的培训管理员到selectedTableData中
  saveSelectedTableData = () => {
    const { dispatch } = this.props;
    const { saveSelectedData } = this.state;
    dispatch({
      type: 'uploadCourse/saveSelectedTableData',
      param: {
        saveSelectedData,
      },
    });
  };

  // 保存按钮
  saveTableData = () => {
    const { dispatch } = this.props;
    const obj = this.getRequestData('0');
    // console.log('保存',obj);
    dispatch({
      type: 'uploadCourse/SaveCourseWare',
      payload: {
        ...obj,
      },
      callback: res => {
        if (res) {
          if (res && res.status === 'ok') {
            // message.success('保存成功')
            this.setState({
              visible: true,
            });
          } else {
            message.warning('保存失败');
            this.setState({
              visible: false,
            });
          }
        }
      },
    });
  };

  // 上架按钮
  commitTableData = () => {
    const { dispatch } = this.props;
    const obj = this.getRequestData('1');
    console.log('上架', obj);
    dispatch({
      type: 'uploadCourse/SaveCourseWare',
      payload: {
        ...obj,
      },
      callback: res => {
        if (res && res.status === 'ok') {
          message.success('上架成功');
          this.saveSelectedTableData();
          router.push('/courseware/uploadZip/uploadZip3');
        } else {
          message.warning('上架失败');
        }
      },
    });
  };

  // 返回按钮
  goBack = () => {
    router.push('/courseware/uploadZip/uploadZip1/Y');
  };

  // 获取培训管理员表格数据(指定页码，指定每页条数)
  getTrainmanagers = (page, size) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'TrainGroupManage/GetTrainmanagers',
      payload: {
        page, // 页码
        size, // 每页条数
        role: '培训管理员',
      },
    });
  };

  // 分页、排序、筛选变化时触发。这边只有分页功能，没有排序和筛选
  handleTableChange = _pagination_ => {
    // console.log('-------------------');
    // console.log(_pagination_);
    // console.log('-------------------');
    const { pagination } = this.state;
    const { current, pageSize } = _pagination_;
    this.setState({
      pagination: {
        ...pagination,
        current,
        pageSize,
      },
    });
    this.getTrainmanagers(current, pageSize);
  };

  // 保存成功提示模态框（关闭模态框）
  submitModal = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { zipInfo, tableData } = this.props;
    const { selectedAllKeys, pagination, visible } = this.state;
    const pageConifg = {
      ...pagination,
      total: tableData.count,
      showTotal: total => `共 ${total} 条记录`,
    };

    const dataSource = tableData.results.map(value => Object.assign({}, value, { key: value.id }));

    const columns = [
      {
        title: '员工编号',
        dataIndex: 'train_admin_num',
        key: 'train_admin_num',
        render: (text, record) => <span>{record.user_no}</span>,
      },
      {
        title: '员工姓名',
        dataIndex: 'train_admin_name',
        key: 'train_admin_name',
        render: (text, record) => <span>{record.name}</span>,
      },
      {
        title: '所属部门',
        dataIndex: 'train_admin_belong',
        key: 'train_admin_belong',
        render: (text, record) => <span>{record.department_name}</span>,
      },
    ];
    // rowSelection object indicates the need for row selection
    const rowSelection = {
      selectedRowKeys: selectedAllKeys,
      // 选中项发生变化时的回调
      onChange: selectedRowKeys => {
        // console.log(selectedRowKeys, selectedRows);
        this.setState({
          selectedAllKeys: selectedRowKeys,
        });
      },
      // 用户手动选择/取消选择某行的回调
      onSelect: (record, selected) => {
        // console.log(record, selected, selectedRows);
        const { saveSelectedData } = this.state;
        if (selected) {
          // 选中该条数据
          saveSelectedData[record.id] = record;
        } else {
          // 取消选中该条数据
          delete saveSelectedData[record.id];
        }
        this.setState({
          saveSelectedData,
        });
      },
      // 用户手动选择/取消选择所有行的回调
      onSelectAll: (selected, selectedRows, changeRows) => {
        // console.log(selected, selectedRows, changeRows);
        const { saveSelectedData } = this.state;
        if (selected) {
          // 全选
          changeRows.forEach(v => {
            saveSelectedData[v.id] = v;
          });
        } else {
          // 取消全选
          changeRows.forEach(v => {
            delete saveSelectedData[v.id];
          });
        }
        this.setState({
          saveSelectedData,
        });
      },
    };

    return (
      <PageHeaderWrapper title="课件上架">
        <Card className={styles.afterUpload}>
          <Row gutter={24} className={styles.afterUploadRow}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12} className={styles.firstCol}>
              <SelfCard
                title="课程信息"
                bordered={false}
                noLeftAndRightPadding="noLeftAndRightPadding"
              >
                <div className={styles.imgContent}>
                  <div className={styles.imgLeft}>
                    <img src={zipInfo.KJFM} alt="" />
                  </div>
                  <div className={styles.imgRight}>
                    <div className={styles.msgDetail}>
                      <span>课件编号：</span>
                      <span className={styles.msgDetailOverflow} title={zipInfo.KJBH}>
                        {zipInfo.KJBH}
                      </span>
                    </div>
                    <div className={styles.msgDetail}>
                      <span>课件名称：</span>
                      <span className={styles.msgDetailOverflow} title={zipInfo.KJMC}>
                        {zipInfo.KJMC}
                      </span>
                    </div>
                    <div className={styles.msgDetail}>
                      <span>课时：</span>
                      <span>
                        {zipInfo.KS}
                        小时
                      </span>
                    </div>
                  </div>
                </div>
                <Row style={{ marginTop: 15 }}>
                  <Col>
                    <div className={styles.msgDetail}>
                      <span>适用对象：</span>
                      <span>{zipInfo.SYDX}</span>
                    </div>
                  </Col>
                </Row>
                <div className={styles.columnContent}>
                  <div className={styles.columnContentL}>
                    <div className={styles.msgDetail}>
                      <span>课件分类：</span>
                      <span>{zipInfo.KJFL === '0' ? '公开课' : '非公开课'}</span>
                    </div>
                  </div>
                  <div className={styles.columnContentR}>
                    <div className={styles.msgDetail}>
                      <span>课件类型：</span>
                      <span>
                        {zipInfo.KJLX === '0' ? '通用课件' : null}
                        {zipInfo.KJLX === '1' ? '合规基础课件' : null}
                        {zipInfo.KJLX === '2' ? '合规管理课件' : null}
                        {zipInfo.KJLX === '3' ? '其他' : null}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.columnContent}>
                  <div className={styles.columnContentL}>
                    <div className={styles.msgDetail}>
                      <span>课程文件类型：</span>
                      <span>{zipInfo.KJWJLX === '0' ? 'PDF' : 'MP4'}</span>
                    </div>
                  </div>
                  <div className={styles.columnContentR}>
                    <div className={styles.msgDetail}>
                      <span>允许视频拖放：</span>
                      <span>{zipInfo.YXSPTF === '0' ? '是' : '否'}</span>
                    </div>
                  </div>
                </div>
                <Row>
                  <Col>
                    <div className={styles.msgDetail} style={{ lineHeight: 1.5 }}>
                      <span>课件介绍：</span>
                      <span>{zipInfo.KJJS}</span>
                    </div>
                  </Col>
                </Row>
              </SelfCard>
              <SelfCard
                title="讲师信息"
                bordered={false}
                noLeftAndRightPadding="noLeftAndRightPadding"
              >
                <div className={styles.imgContent2}>
                  <div className={styles.imgLeft2}>
                    <Avatar size={100} src={zipInfo.JSZP} alt="老师头像" icon="user" />
                  </div>
                  <div className={styles.imgRight2}>
                    <div className={styles.msgDetail}>
                      <span>讲师姓名：</span>
                      <span>{zipInfo.JSXM}</span>
                    </div>
                    <div className={styles.msgDetail}>
                      <span>讲师介绍：</span>
                      <span>{zipInfo.JSJS}</span>
                    </div>
                  </div>
                </div>
              </SelfCard>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12} className={styles.secondCol}>
              <div className={styles.searchInputContent}>
                <span>选择可以使用本课件的培训管理员：</span>
                {/* <Input placeholder='输入员工编号或姓名过滤' /> */}
                <Search
                  placeholder="输入员工编号或姓名过滤"
                  onSearch={value => console.log(value)}
                />
              </div>
              <Table
                bordered
                rowSelection={rowSelection}
                dataSource={dataSource}
                columns={columns}
                pagination={pageConifg}
                // loading={this.state.loading}
                onChange={this.handleTableChange}
              />
              {/* <div>已选择{selectedAllKeys.length}人</div> */}
            </Col>
          </Row>
          <div className={styles.footerBtns}>
            <Button type="primary" onClick={this.saveTableData}>
              保存
            </Button>
            <Button onClick={this.commitTableData}>上架</Button>
            <Button onClick={this.goBack}>返回</Button>
          </div>
        </Card>
        <Modal
          visible={visible}
          title="课件保存成功！"
          style={{ top: 150 }}
          onCancel={this.submitModal}
          footer={
            <div style={{ textAlign: 'center' }}>
              <Button type="primary" onClick={this.submitModal}>
                确定
              </Button>
            </div>
          }
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px 0',
            }}
          >
            <Icon
              type="check-circle"
              theme="filled"
              style={{ color: '#8fc127', fontSize: '40px', marginRight: '15px' }}
            />
            <span style={{ fontSize: '20px', color: '#3b3b3b' }}>课件已保存</span>
          </div>
          <div
            style={{
              padding: '0 0 20px 0',
              textAlign: 'center',
              fontSize: '16px',
              color: '#3b3b3b',
            }}
          >
            您可在课件管理页中查看已保存课件！
          </div>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default UploadZip2;
