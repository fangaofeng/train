/* eslint-disable no-restricted-syntax */
import React, { Component } from 'react';
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import {
  Card,
  Button,
  Upload,
  Row,
  Col,
  message,
  Input,
  InputNumber,
  Tabs,
  Tooltip,
  List,
  Radio,
  Checkbox,
  Form,
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import SelfCard from '@/components/Workbench/selfCard';
import { paperService } from '@/services';
import { useUpdateEffect } from '@umijs/hooks';
import { Link } from 'umi';
import { LimitInput, LimitTextArea } from '@/components/LimitInput';

import styles from './UploadZip1.less';

const FormItem = Form.Item;
const { TabPane } = Tabs;

function UploadZip1(props) {
  const { paperInfo, zipfileid, next, prev } = props;

  const MaxLength = {
    name: 50, // 试卷名称最多50字
    applicablePerson: 50, // 适用对象最多50字
    introduce: 500, // 试卷介绍最多500字
  };

  const [form] = Form.useForm();

  const onFinish = values => {
    // setZipInfo({ ...values, depatments: checkedKeys });
    next();
  };

  return (
    <>
      <Row>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={{ span: 18, offset: 3 }}
          xxl={{ span: 16, offset: 4 }}
        >
          <Form form={form} initialValues={paperInfo} onFinish={onFinish}>
            <SelfCard title="试卷信息" nopadding="true">
              <FormItem
                label="试卷编号"
                name="number"
                className={styles.selfFormItem}
                rules={[
                  {
                    required: true,
                    message: '试卷编号必填',
                  },
                ]}
              >
                <Input disabled style={{ display: 'none' }} />
              </FormItem>
              <FormItem
                label="试卷名称"
                name="name"
                className={styles.selfFormItem}
                rules={[
                  {
                    required: true,
                    message: '试卷名称必填',
                  },
                ]}
              >
                <LimitInput placeholder="试卷名称" maxLength={MaxLength.name} />
              </FormItem>
              <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
                  <FormItem
                    label="考试时长"
                    name="time"
                    className={styles.selfFormItem}
                    rules={[
                      {
                        required: true,
                        message: '考试时长必填',
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      max={240}
                      formatter={value => `${value}分钟`}
                      parser={value => value.replace('分钟', '')}
                    />
                    ,
                    <Tooltip title="考试时长可在0~240分钟以内选择">
                      <QuestionCircleOutlined style={{ marginLeft: 10 }} />
                    </Tooltip>
                    {/* <span style={{color: "#f5222d",paddingLeft:10}}>0~240</span> */}
                  </FormItem>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
                  <FormItem
                    label="试卷总分"
                    name="score"
                    className={styles.selfFormItem}
                    rules={[
                      {
                        required: true,
                        message: '试卷总分必填',
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      formatter={value => `${value}分`}
                      parser={value => value.replace('分', '')}
                    />
                  </FormItem>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
                  <FormItem
                    label="合格分数"
                    name="passScore"
                    className={styles.selfFormItem}
                    rules={[
                      {
                        required: true,
                        message: '合格分数必填',
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      formatter={value => `${value}分`}
                      parser={value => value.replace('分', '')}
                    />
                  </FormItem>
                </Col>
              </Row>
              <FormItem
                label="适用对象"
                name="applicablePerson"
                className={styles.selfFormItem}
                rules={[
                  {
                    required: true,
                    message: '适用对象必填',
                  },
                ]}
              >
                <Input placeholder="适用对象" maxLength={MaxLength.applicablePerson} />,
              </FormItem>
              <FormItem
                label="试卷介绍"
                name="introduce"
                className={styles.selfFormItem}
                rules={[
                  {
                    required: true,
                    message: '试卷介绍必填',
                  },
                ]}
              >
                <LimitTextArea placeholder="试卷介绍" maxLength={MaxLength.introduce} />
              </FormItem>
              <FormItem
                label="适用课程编号"
                name="applicableCourseNumber"
                className={styles.selfFormItem}
              >
                <Input placeholder="适用课程编号" />
              </FormItem>
              <FormItem
                label="适用课程名称"
                name="applicableCourseName"
                className={styles.selfFormItem}
              >
                <Input placeholder="适用课程名称" />
              </FormItem>
              <FormItem label="试卷封面" name="cover" className={styles.selfFormItem}>
                <Input style={{ display: 'none' }} />
                {paperInfo?.cover ? (
                  <img src={paperInfo.cover} alt="课件封面" height="130" />
                ) : (
                  <div style={{ width: '230px', height: '130px', background: '#ccc' }} />
                )}
              </FormItem>
            </SelfCard>
            {/* <SelfCard title="试题信息" nopadding="true">
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
               */}
            <div className={styles.foonter_btns}>
              <FormItem>
                <Button type="primary" onClick={() => prev()}>
                  上一步
                </Button>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>

                <Link to="/courseware/coursewareManager/index">
                  <Button>取消</Button>
                </Link>
              </FormItem>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default UploadZip1;
