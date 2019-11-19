import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Card, Table, Row, Col, Input, Button, message, Modal, Icon } from 'antd';
import SelfCard from '@/components/Workbench/selfCard';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './UploadZip2.less';

const { Search } = Input;

@connect(({ uploadExam }) => ({
  testInfo: uploadExam.testInfo, // 试卷信息
  testDetails: uploadExam.testDetails, // 试题信息
  tableData: uploadExam.tableData, // 获取指定页码的表格数据
  zipfileid: uploadExam.zipfileid, // zip文件id
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
    };
  }

  componentDidMount() {
    const { testInfo } = this.props;
    if (Object.keys(testInfo).length === 0) {
      router.push('/exam/uploadZip/uploadZip1');
    }
    const { pagination } = this.state;
    this.getTableData(pagination.current, pagination.pageSize);
  }

  // 保存和上架时候，转换一下数据格式
  getRequestData = status => {
    const { testInfo, zipfileid } = this.props;
    const { selectedAllKeys } = this.state;
    const obj = {
      zipfileid, // ;上传的zip返回的zip文件id
      status, // ;保存'0',上架'1'
      exame_no: testInfo.number,
      name: testInfo.name,
      duration: testInfo.time,
      total_score: testInfo.score,
      passing_score: testInfo.passScore,
      applicable_user: testInfo.applicablePerson,
      introduce: testInfo.introduce,
      // '适用课程编号':testInfo.applicableCourseNumber,
      // '适用课程名称':testInfo.applicableCourseName,
      trainmanagers: selectedAllKeys, // ;已选择的培训管理员
    };
    return obj;
  };

  // 保存选中的培训管理员到selectedTableData中
  saveSelectedTableData = () => {
    const { dispatch } = this.props;
    const { saveSelectedData } = this.state;
    dispatch({
      type: 'uploadExam/saveSelectedTableData',
      param: {
        saveSelectedData,
      },
    });
  };

  // 保存按钮
  saveTableData = () => {
    const { dispatch } = this.props;
    const obj = this.getRequestData('拟制中');
    console.log('保存', obj);
    dispatch({
      type: 'uploadExam/SaveExam',
      payload: {
        ...obj,
      },
      callback: res => {
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
      },
    });
  };

  // 上架按钮
  commitTableData = () => {
    const { dispatch } = this.props;
    const obj = this.getRequestData('1');
    console.log('保存', obj);
    dispatch({
      type: 'uploadExam/SaveExam',
      payload: {
        ...obj,
      },
      callback: res => {
        if (res && res.status === 'ok') {
          message.success('上架成功');
          this.saveSelectedTableData();
          router.push('/exam/uploadZip/uploadZip3');
        } else {
          message.warning('上架失败');
        }
      },
    });
  };

  // 返回按钮
  goBack = () => {
    router.push('/exam/uploadZip/uploadZip1/Y');
  };

  // 获取培训管理员表格数据(指定页码，指定每页条数)
  getTableData = (page, size) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'uploadExam/GetTrainmanagers',
      payload: {
        page, // 页码
        size, // 每页条数
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
    this.getTableData(current, pageSize);
  };

  // 保存成功提示模态框（关闭模态框）
  submitModal = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { testInfo, tableData } = this.props;
    const { selectedAllKeys, pagination, visible } = this.state;
    const pageConifg = {
      ...pagination,
      total: tableData.count,
      showTotal: total => `共 ${total} 条记录`,
    };

    // const dataSource = tableData.results.map(value => Object.assign({}, value, { key: value.id }));

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
      <PageHeaderWrapper title="试卷上架">
        <Card className={styles.afterUpload}>
          <Row gutter={24} className={styles.afterUploadRow}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12} className={styles.firstCol}>
              <SelfCard
                title="试卷信息"
                bordered={false}
                noLeftAndRightPadding="noLeftAndRightPadding"
              >
                <div className={styles.imgContent}>
                  <div className={styles.imgLeft}>
                    <img src={testInfo.cover} alt="" />
                  </div>
                  <div className={styles.imgRight}>
                    <div className={styles.msgDetail}>
                      <span>试卷编号：</span>
                      <span className={styles.msgDetailOverflow} title={testInfo.number}>
                        {testInfo.number}
                      </span>
                    </div>
                    <div className={styles.msgDetail}>
                      <span>试卷名称：</span>
                      <span className={styles.msgDetailOverflow} title={testInfo.name}>
                        {testInfo.name}
                      </span>
                    </div>
                    <div className={styles.msgDetail}>
                      <span>考试时长：</span>
                      <span title={testInfo.time}>
                        {testInfo.time}
                        分钟
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.columnContent}>
                  <div className={styles.columnContentL}>
                    <div className={styles.msgDetail}>
                      <span>试卷总分：</span>
                      <span>{testInfo.score}分</span>
                    </div>
                  </div>
                  <div className={styles.columnContentR}>
                    <div className={styles.msgDetail}>
                      <span>合格分数：</span>
                      <span>{testInfo.passScore}分</span>
                    </div>
                  </div>
                </div>
                <Row>
                  <Col>
                    <div className={styles.msgDetail} style={{ lineHeight: 1.5 }}>
                      <span>适用对象：</span>
                      <span>{testInfo.applicablePerson}</span>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className={styles.msgDetail} style={{ lineHeight: 1.5 }}>
                      <span>试卷介绍：</span>
                      <span>{testInfo.introduce}</span>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className={styles.msgDetail} style={{ lineHeight: 1.5 }}>
                      <span>适用课程编号：</span>
                      <span>{testInfo.applicableCourseNumber}</span>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className={styles.msgDetail} style={{ lineHeight: 1.5 }}>
                      <span>适用课程名称：</span>
                      <span>{testInfo.applicableCourseName}</span>
                    </div>
                  </Col>
                </Row>
              </SelfCard>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12} className={styles.secondCol}>
              <div className={styles.searchInputContent}>
                <span>选择可以使用本试卷的培训管理员：</span>
                <Search
                  placeholder="输入员工编号或姓名过滤"
                  onSearch={value => console.log(value)}
                  // style={{ width: 200 }}
                />
              </div>
              <Table
                bordered
                rowSelection={rowSelection}
                dataSource={tableData.results}
                rowKey="id"
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
          title="试卷保存成功！"
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
            <span style={{ fontSize: '20px', color: '#3b3b3b' }}>试卷已保存</span>
          </div>
          <div
            style={{
              padding: '0 0 20px 0',
              textAlign: 'center',
              fontSize: '16px',
              color: '#3b3b3b',
            }}
          >
            试卷已保存,您可在试卷管理页中查看已保存试卷！
          </div>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default UploadZip2;
