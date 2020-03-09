import React, { Component } from 'react';
import { connect } from 'dva';
import { history } from 'umi';
import { Card, Row, Col, Button, message, Modal, Icon } from 'antd';
import SelfCard from '@/components/Workbench/selfCard';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import TreeSelect from '@/components/EditContent/tree';
import styles from './UploadZip2.less';

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
      checkedKeys: [], // 选中的数据组成的数组（只包含key值）
    };
  }

  componentDidMount() {
    const { testInfo } = this.props;
    if (Object.keys(testInfo).length === 0) {
      history.push('/exam/uploadZip/uploadZip1');
    }
  }

  // 保存和上架时候，转换一下数据格式
  getRequestData = status => {
    const { testInfo, zipfileid } = this.props;
    const { checkedKeys } = this.state;
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
      departmens: checkedKeys, // ;已选择的培训管理员
    };
    return obj;
  };

  // 保存按钮
  saveTableData = () => {
    const { dispatch } = this.props;
    const obj = this.getRequestData('拟制中');
    // console.log('保存', obj);
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
    const obj = this.getRequestData('已上架');

    dispatch({
      type: 'uploadExam/SaveExam',
      payload: {
        ...obj,
      },
      callback: res => {
        if (res && res.status === 'ok') {
          history.push('/exam/uploadZip/uploadZip3');
        } else {
          message.warning('上架失败');
        }
      },
    });
  };

  // 返回按钮
  goBack = () => {
    history.push('/exam/uploadZip/uploadZip1/Y');
  };

  // 保存成功提示模态框（关闭模态框）
  submitModal = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { testInfo } = this.props;
    const { checkedKeys, visible } = this.state;

    return (
      <PageHeaderWrapper title="试卷上架">
        <Card className={styles.afterUpload}>
          <Row gutter={24} className={styles.afterUploadRow}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12} className={styles.firstCol}>
              <SelfCard title="试卷信息" bordered={false} nopadding="true">
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
              </div>

              <TreeSelect
                onCheck={checkedallKeys => this.setState({ checkedKeys: checkedallKeys })}
                action="DepartmentManager/GetOrgsDeparments"
                checkedKeys={checkedKeys}
              />
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
