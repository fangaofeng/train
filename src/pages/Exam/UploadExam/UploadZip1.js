/* eslint-disable no-restricted-syntax */
import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Card,
  Button,
  Icon,
  Upload,
  Row,
  Col,
  message,
  Input,
  Form,
  InputNumber,
  Tabs,
  Tooltip,
  List,
  Radio,
  Checkbox,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import SelfCard from '@/components/Workbench/selfCard';
// import classNames from 'classnames';
// import JSZip from 'jszip';
import router from 'umi/router';
import Link from 'umi/link';
import styles from './UploadZip1.less';
import { getUploadExamurl } from '@/services/uploadUrl/uploadUrl';
import storetoken from '@/utils/token';

const { TextArea } = Input;
const FormItem = Form.Item;
const { TabPane } = Tabs;

@connect(({ uploadExam }) => ({
  zipFileName: uploadExam.zipFileName,
  testInfo: uploadExam.testInfo,
  testDetails: uploadExam.testDetails,
  zipfileid: uploadExam.zipfileid,
}))
@Form.create()
class UploadExamStepFirst extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameMaxLength: 50, // 试卷名称最多50字
      nameLengthLeft: 50, // 试卷名称剩余字数
      applicablePersonMaxLength: 50, // 适用对象最多50字
      applicablePersonLengthLeft: 50, // 适用对象剩余字数
      introduceMaxLength: 500, // 试卷介绍最多500字
      introduceLengthLeft: 500, // 试卷介绍剩余字数
      applicableCourseNumberMaxLength: 12, // 适用课程编号最多12字
      applicableCourseNumberLengthLeft: 12, // 适用课程编号剩余字数
      applicableCourseNameMaxLength: 50, // 适用课程名称最多50字
      applicableCourseNameLengthLeft: 50, // 适用课程名称剩余字数

      zipFileName: '', // zip文件名
      zipfileid: '', // 上传成功后服务器返回的zip文件id
      zipfileResponse: {
        // 上传成功后服务器返回的值
        testInfo: {}, // 试卷信息
        questions: {
          // 试题信息
          totalScore: null, // 实际总分
          singlechoices: [], // 单选题
          multichoices: [], // 多选题
          judgements: [], // 判断题
        },
      },
      isUploadDone: false, // 判断文件是否上传成功
      isFirstUpload: true, // 是否是首次上传
      fileList: [], // 存放上传的文件

      // 试题信息分页参数：
      sinCurrent: 1, // 单选题页码
      sinPageSize: 5, // 单选题每页个数
      mulCurrent: 1, // 多选题页码
      mulPageSize: 1, // 多选题每页个数
      judCurrent: 1, // 判断题页码
      judPageSize: 5, // 判断题每页个数
    };
  }

  componentDidMount() {
    const {
      match: { params },
      zipFileName,
      testInfo,
      testDetails,
      zipfileid,
      form,
    } = this.props;
    // 如果是从返回进来的页面
    if (params && params.isBack === 'Y') {
      if (Object.keys(testInfo).length === 0) {
        return;
      }
      this.setState({
        zipFileName, // zip文件名
        zipfileid, // zip文件的id
        zipfileResponse: {
          testInfo, // 试卷信息
          questions: testDetails, // 试题信息
        },
        isUploadDone: true, // 判断文件是否上传成功
        isFirstUpload: false, // 是否是首次上传
      });

      for (const i in testInfo) {
        if (Object.prototype.hasOwnProperty.call(testInfo, i)) {
          let v = testInfo[i];
          v = v === undefined || v === null || v === '' ? '' : v;
          form.setFieldsValue({
            [i]: v,
          });
          if (
            i === 'name' ||
            i === 'applicablePerson' ||
            i === 'introduce' ||
            i === 'applicableCourseNumber' ||
            i === 'applicableCourseName'
          ) {
            const maxLen = `${i}MaxLength`;
            const lenleft = `${i}LengthLeft`;
            const value = v;
            this.setFormLengthLeft(maxLen, lenleft, value);
          }
        }
      }
    }
  }

  // 下一步表单提交
  handleSubmit = () => {
    const { isFirstUpload, isUploadDone, zipFileName, zipfileResponse, zipfileid } = this.state;
    const { form } = this.props;
    if (isFirstUpload) {
      message.warning('请上传试卷包');
      return false;
    }
    // 测试关闭
    if (!isUploadDone) {
      message.warning('请试卷包上传成功后再点击下一步');
      return false;
    }
    const { dispatch } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('表单值', values);
        dispatch({
          type: 'uploadExam/saveZipInfo',
          param: {
            zipFileName, // zip文件名
            testInfo: values, // 试卷信息
            testDetails: zipfileResponse.questions, // 试题信息
            zipfileid, // zip文件的id
          },
        });
        router.push('/exam/uploadZip/uploadZip2');
      }
    });

    return true;
  };

  // Upload组件beforeUpload调用的方法
  beforeUpload = file => {
    this.setState({
      // fileList:[],// 只能一次上传一个文件
      sinCurrent: 1, // 单选题页码
      sinPageSize: 5, // 单选题每页个数
      mulCurrent: 1, // 多选题页码
      mulPageSize: 5, // 多选题每页个数
      judCurrent: 1, // 判断题页码
      judPageSize: 5, // 判断题每页个数
    });
    // const filetype = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
    // 测试关闭
    // if (filetype !== 'zip') {
    //   message.warning('请根据模板上传zip试卷包');
    //   return false;
    // }
    this.setState({
      zipFileName: file.name,
    });
  };

  // Upload组件OnChange调用的方法
  uploadOnChange = info => {
    this.setState({
      fileList: info.fileList,
    });
    if (info.file.status === 'uploading') {
      this.setState({
        isFirstUpload: false,
      });
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name}上传成功`);
      if (info.file.response && info.file.response.status === 'ok') {
        this.setState({
          isUploadDone: true,
          zipfileid: info.file.response.data.zipfileid, // 上传成功后服务器返回的zip文件id
          zipfileResponse: {
            // 试卷信息
            testInfo: {
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
            },
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
        const {
          zipfileResponse: { testinfo },
        } = this.state;
        const { form } = this.porps;
        for (const i in testinfo) {
          if (Object.prototype.hasOwnProperty.call(testinfo, i)) {
            let v = testinfo[i];
            v = v === undefined || v === null || v === '' ? '' : v;
            form.setFieldsValue({
              [i]: v,
            });
            if (
              i === 'name' ||
              i === 'applicablePerson' ||
              i === 'introduce' ||
              i === 'applicableCourseNumber' ||
              i === 'applicableCourseName'
            ) {
              const maxLen = `${i}MaxLength`;
              const lenleft = `${i}LengthLeft`;
              const value = v;
              this.setFormLengthLeft(maxLen, lenleft, value);
            }
          }
        }
      }
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name}上传失败`);
      this.setState({
        isUploadDone: false,
      });
    } else {
      this.setState({
        isUploadDone: false,
      });
    }
  };

  // 判断试卷总分和试题实际总分是否一致
  handleTestTotalScore = (rule, value, callback) => {
    const {
      zipfileResponse: {
        // 上传成功后服务器返回的值
        questions: {
          // 试题信息
          totalScore, // 实际总分
        },
      },
    } = this.state;
    if (value && value !== totalScore) {
      callback(`与实际试题总分（${totalScore}）不符`);
    }
    callback();
  };

  // 为表单赋值同时修改剩余多少字
  setFormLengthLeft = (maxLen, lenleft, value) => {
    // eslint-disable-next-line react/destructuring-assignment
    const lengthLeft = this.state[maxLen] - value.length; // 剩余多少字
    this.setState({
      [lenleft]: lengthLeft <= 0 ? 0 : lengthLeft,
    });
  };

  // 判断剩余多少字
  inputLengthFun = (e, params, total) => {
    const len = total - e.target.value.length;
    this.setState({
      [params]: len <= 0 ? 0 : len,
    });
  };

  // // 点击tabs
  // changeTabs = (key) =>{
  //   console.log(key)
  // }

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const {
      zipFileName, // zip文件名
      zipfileResponse: {
        // 上传成功后服务器返回的值
        testInfo, // 试卷信息
        questions: {
          // 试题信息
          singlechoices, // 单选题
          multichoices, // 多选题
          judgements, // 判断题
        },
      },
      // isUploadDone,// 判断文件是否上传成功
      isFirstUpload, // 是否是首次上传
      fileList, // 存放上传的文件
      sinCurrent, // 单选题页码
      sinPageSize, // 单选题每页个数
      mulCurrent, // 多选题页码
      mulPageSize, // 多选题每页个数
      judCurrent, // 判断题页码
      judPageSize, // 判断题每页个数
    } = this.state;
    const {
      nameMaxLength, // 试卷名称最多50字
      nameLengthLeft, // 试卷名称剩余字数
      applicablePersonMaxLength, // 适用对象最多50字
      applicablePersonLengthLeft, // 适用对象剩余字数
      introduceMaxLength, // 试卷介绍最多500字
      introduceLengthLeft, // 试卷介绍剩余字数
      applicableCourseNumberMaxLength, // 适用课程编号最多12字
      applicableCourseNumberLengthLeft, // 适用课程编号剩余字数
      applicableCourseNameMaxLength, // 适用课程名称最多50字
      applicableCourseNameLengthLeft, // 适用课程名称剩余字数
    } = this.state;
    const token = storetoken.get();
    const uploadProps = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    const uploadurl = getUploadExamurl();
    return (
      <PageHeaderWrapper title="上传试卷">
        <Card className={styles.uploadZipContent}>
          <div className={isFirstUpload ? ' ' : styles.uploadZipStep}>
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
                  // action='//jsonplaceholder.typicode.com/posts/'
                  action={uploadurl}
                  beforeUpload={this.beforeUpload}
                  onChange={this.uploadOnChange}
                  // className={styles.uploadContent}
                  className="uploadContent"
                  fileList={fileList}
                  {...uploadProps}
                >
                  <Button disabled={!(fileList.length < 1)} type="dashed" style={{ width: '100%' }}>
                    <Icon type="plus" theme="outlined" />
                    {isFirstUpload ? '上传试卷包（ZIP）文件' : '重新上传试卷包（ZIP）文件'}
                  </Button>
                </Upload>
                <div
                  style={{
                    marginTop: '20px',
                    marginBottom: '20px',
                    display: isFirstUpload ? 'none' : 'block',
                  }}
                >
                  试卷包：
                  {zipFileName ? (
                    <span>
                      <Icon type="paper-clip" theme="outlined" />
                      {zipFileName}
                    </span>
                  ) : null}
                </div>
                <Form hideRequiredMark style={{ display: isFirstUpload ? 'none' : 'block' }}>
                  <SelfCard title="试卷信息" nopadding="true">
                    <FormItem label="试卷编号" className={styles.selfFormItem}>
                      {getFieldDecorator('number', {
                        rules: [
                          {
                            required: true,
                            message: '试卷编号必填',
                          },
                        ],
                      })(<Input disabled style={{ display: 'none' }} />)}
                      <div>{testInfo.number ? testInfo.number : 'XXXXXXXXXXXXXX'}</div>
                    </FormItem>
                    <FormItem label="试卷名称" className={styles.selfFormItem}>
                      {getFieldDecorator('name', {
                        rules: [
                          {
                            required: true,
                            message: '试卷名称必填',
                          },
                        ],
                      })(
                        <Input
                          placeholder="试卷名称"
                          maxLength={nameMaxLength}
                          onChange={e => {
                            this.inputLengthFun(e, 'nameLengthLeft', nameMaxLength);
                          }}
                        />
                      )}
                      <span className={styles.spanTipsContent}>
                        剩余
                        <span>{nameLengthLeft}</span>字
                      </span>
                    </FormItem>
                    <Row>
                      <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
                        <FormItem
                          label={
                            <span>
                              考试时长
                              {/* 考试时长&nbsp;
                              <Tooltip title="考试时长可在0~240分钟以内选择">
                                <Icon type="question-circle-o" />
                              </Tooltip> */}
                            </span>
                          }
                          className={styles.selfFormItem}
                        >
                          {getFieldDecorator('time', {
                            rules: [
                              {
                                required: true,
                                message: '考试时长必填',
                              },
                            ],
                          })(
                            <InputNumber
                              min={0}
                              max={240}
                              formatter={value => `${value}分钟`}
                              parser={value => value.replace('分钟', '')}
                            />
                          )}
                          <Tooltip title="考试时长可在0~240分钟以内选择">
                            <Icon type="question-circle-o" style={{ marginLeft: 10 }} />
                          </Tooltip>
                          {/* <span style={{color: "#f5222d",paddingLeft:10}}>0~240</span> */}
                        </FormItem>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
                        <FormItem label="试卷总分" className={styles.selfFormItem}>
                          {getFieldDecorator('score', {
                            rules: [
                              {
                                required: true,
                                message: '试卷总分必填',
                              },
                              {
                                validator: this.handleTestTotalScore,
                              },
                            ],
                          })(
                            <InputNumber
                              min={0}
                              formatter={value => `${value}分`}
                              parser={value => value.replace('分', '')}
                            />
                          )}
                        </FormItem>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
                        <FormItem label="合格分数" className={styles.selfFormItem}>
                          {getFieldDecorator('passScore', {
                            rules: [
                              {
                                required: true,
                                message: '合格分数必填',
                              },
                            ],
                          })(
                            <InputNumber
                              min={0}
                              formatter={value => `${value}分`}
                              parser={value => value.replace('分', '')}
                            />
                          )}
                          {/* <span style={{width:'30px'}}>小时</span> */}
                        </FormItem>
                      </Col>
                    </Row>
                    <FormItem label="适用对象" className={styles.selfFormItem}>
                      {getFieldDecorator('applicablePerson', {
                        rules: [
                          {
                            required: true,
                            message: '适用对象必填',
                          },
                        ],
                      })(
                        <Input
                          placeholder="适用对象"
                          maxLength={applicablePersonMaxLength}
                          onChange={e => {
                            this.inputLengthFun(
                              e,
                              'applicablePersonLengthLeft',
                              applicablePersonMaxLength
                            );
                          }}
                        />
                      )}
                      <span className={styles.spanTipsContent}>
                        剩余
                        <span>{applicablePersonLengthLeft}</span>字
                      </span>
                    </FormItem>
                    <FormItem label="试卷介绍" className={styles.selfFormItem}>
                      {getFieldDecorator('introduce', {
                        rules: [
                          {
                            required: true,
                            message: '试卷介绍必填',
                          },
                        ],
                      })(
                        <TextArea
                          placeholder="试卷介绍"
                          maxLength={introduceMaxLength}
                          onChange={e => {
                            this.inputLengthFun(e, 'introduceLengthLeft', introduceMaxLength);
                          }}
                        />
                      )}
                      <span className={styles.spanTipsContent}>
                        剩余
                        <span>{introduceLengthLeft}</span>字
                      </span>
                    </FormItem>
                    <FormItem label="适用课程编号" className={styles.selfFormItem}>
                      {getFieldDecorator('applicableCourseNumber')(
                        <Input
                          placeholder="适用课程编号"
                          maxLength={applicableCourseNumberMaxLength}
                          onChange={e => {
                            this.inputLengthFun(
                              e,
                              'applicableCourseNumberLengthLeft',
                              applicableCourseNumberMaxLength
                            );
                          }}
                        />
                      )}
                      <span className={styles.spanTipsContent}>
                        剩余
                        <span>{applicableCourseNumberLengthLeft}</span>字
                      </span>
                    </FormItem>
                    <FormItem label="适用课程名称" className={styles.selfFormItem}>
                      {getFieldDecorator('applicableCourseName')(
                        <Input
                          placeholder="适用课程名称"
                          maxLength={applicableCourseNameMaxLength}
                          onChange={e => {
                            this.inputLengthFun(
                              e,
                              'applicableCourseNameLengthLeft',
                              applicableCourseNameMaxLength
                            );
                          }}
                        />
                      )}
                      <span className={styles.spanTipsContent}>
                        剩余
                        <span>{applicableCourseNameLengthLeft}</span>字
                      </span>
                    </FormItem>
                    <FormItem label="试卷封面" className={styles.selfFormItem}>
                      {getFieldDecorator('cover', {
                        rules: [
                          {
                            required: true,
                            message: '试卷封面必须上传',
                          },
                        ],
                      })(<Input style={{ display: 'none' }} />)}
                      {testInfo.cover ? (
                        <img src={testInfo.cover} alt="课件封面" height="130" />
                      ) : (
                        <div style={{ width: '230px', height: '130px', background: '#ccc' }} />
                      )}
                    </FormItem>
                  </SelfCard>
                  <SelfCard title="试题信息" nopadding="true">
                    <Tabs
                      // onChange={this.changeTabs}
                      type="card"
                      tabBarGutter={10}
                      // tabBarStyle={{background:'red'}}
                      className={styles.testInfoTabs}
                    >
                      <TabPane tab={`单选题(${singlechoices.length}题)`} key="1" forceRender>
                        <List
                          itemLayout="vertical"
                          pagination={{
                            current: sinCurrent,
                            pageSize: sinPageSize, // 每页条数
                            pageSizeOptions: ['5', '10', '15', '20'], // 指定每页可以显示多少条数据
                            showQuickJumper: true, // 是否可以快速跳转至某页
                            showSizeChanger: true, // 是否可以改变 pageSize
                            // total:singlechoices.length,
                            showTotal: total => `共 ${total} 条记录`,
                            onChange: page => {
                              this.setState({ sinCurrent: page });
                            },
                            onShowSizeChange: (current, pageSize) => {
                              this.setState({
                                sinCurrent: current,
                                sinPageSize: pageSize,
                              });
                            },
                          }}
                          dataSource={singlechoices}
                          renderItem={item => (
                            <List.Item key={item.id}>
                              <div className={styles.testDetailContent}>
                                <div className={styles.name}>
                                  {item.order}、{item['题目']}
                                </div>
                                <div className={styles.optionsBody}>
                                  <Radio.Group>
                                    {Object.keys(item['选项']).map(v => (
                                      <Radio className={styles.option} key={v} value={v}>
                                        {v}：{item['选项'][v]}
                                      </Radio>
                                    ))}
                                  </Radio.Group>
                                </div>
                                <div className={styles.analysis}>
                                  <span className={styles.analysisArrow} />
                                  <div className={styles.answerAndScore}>
                                    <span>
                                      答案：
                                      {item['答案']}
                                    </span>
                                    <span>
                                      分值：
                                      {item['分值']}
                                    </span>
                                  </div>
                                  <div>题目解析：</div>
                                  <div>{item['解析']}</div>
                                </div>
                              </div>
                            </List.Item>
                          )}
                        />
                      </TabPane>
                      <TabPane tab={`多选题(${multichoices.length}题)`} key="2" forceRender>
                        <List
                          itemLayout="vertical"
                          pagination={{
                            current: mulCurrent,
                            pageSize: mulPageSize, // 每页条数
                            pageSizeOptions: ['5', '10', '15', '20'], // 指定每页可以显示多少条数据
                            showQuickJumper: true, // 是否可以快速跳转至某页
                            showSizeChanger: true, // 是否可以改变 pageSize
                            // total:multichoices.length,
                            showTotal: total => `共 ${total} 条记录`,
                            onChange: page => {
                              this.setState({ mulCurrent: page });
                            },
                            onShowSizeChange: (current, pageSize) => {
                              this.setState({
                                mulCurrent: current,
                                mulPageSize: pageSize,
                              });
                            },
                          }}
                          dataSource={multichoices}
                          renderItem={item => (
                            <List.Item key={item.id}>
                              <div className={styles.testDetailContent}>
                                <div className={styles.name}>
                                  {item.order}、{item['题目']}
                                </div>
                                <div className={styles.optionsBody}>
                                  <Checkbox.Group>
                                    {Object.keys(item['选项']).map(v => (
                                      <Checkbox className={styles.option} key={v} value={v}>
                                        {v}：{item['选项'][v]}
                                      </Checkbox>
                                    ))}
                                  </Checkbox.Group>
                                </div>
                                <div className={styles.analysis}>
                                  <span className={styles.analysisArrow} />
                                  <div className={styles.answerAndScore}>
                                    <span>
                                      答案：
                                      {item['答案']}
                                    </span>
                                    <span>
                                      分值：
                                      {item['分值']}
                                    </span>
                                  </div>
                                  <div>题目解析：</div>
                                  <div>{item['解析']}</div>
                                </div>
                              </div>
                            </List.Item>
                          )}
                        />
                      </TabPane>
                      <TabPane tab={`判断题(${judgements.length}题)`} key="3" forceRender>
                        <List
                          itemLayout="vertical"
                          pagination={{
                            current: judCurrent,
                            pageSize: judPageSize, // 每页条数
                            pageSizeOptions: ['5', '10', '15', '20'], // 指定每页可以显示多少条数据
                            showQuickJumper: true, // 是否可以快速跳转至某页
                            showSizeChanger: true, // 是否可以改变 pageSize
                            // total:judgements.length,
                            showTotal: total => `共 ${total} 条记录`,
                            onChange: page => {
                              this.setState({ judCurrent: page });
                            },
                            onShowSizeChange: (current, pageSize) => {
                              this.setState({
                                judCurrent: current,
                                judPageSize: pageSize,
                              });
                            },
                          }}
                          dataSource={judgements}
                          renderItem={item => (
                            <List.Item key={item.id}>
                              <div className={styles.testDetailContent}>
                                <div className={styles.name}>
                                  {item.order}、{item['题目']}
                                </div>
                                <div className={styles.optionsBody}>
                                  <Radio.Group>
                                    {Object.keys(item['选项']).map(v => (
                                      <Radio className={styles.option} key={v} value={v}>
                                        {v}：{item['选项'][v]}
                                      </Radio>
                                    ))}
                                  </Radio.Group>
                                </div>
                                <div className={styles.analysis}>
                                  <span className={styles.analysisArrow} />
                                  <div className={styles.answerAndScore}>
                                    <span>
                                      答案：
                                      {item['答案']}
                                    </span>
                                    <span>
                                      分值：
                                      {item['分值']}
                                    </span>
                                  </div>
                                  <div>题目解析：</div>
                                  <div>{item['解析']}</div>
                                </div>
                              </div>
                            </List.Item>
                          )}
                        />
                      </TabPane>
                    </Tabs>
                  </SelfCard>
                </Form>
              </Col>
            </Row>
          </div>
          <div className={styles.foonter_btns}>
            <Button type="primary" onClick={this.handleSubmit}>
              下一步
            </Button>
            <Link to="/exam/examManager/index">
              <Button>取消</Button>
            </Link>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default UploadExamStepFirst;
