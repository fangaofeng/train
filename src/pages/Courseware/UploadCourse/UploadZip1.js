/* eslint-disable prefer-destructuring */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, Upload, Row, Col, message, Input, Select, Form, Avatar } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import SelfCard from '@/components/Workbench/selfCard';
import classNames from 'classnames';
import JSZip from 'jszip';
import router from 'umi/router';
import Link from 'umi/link';
import styles from './UploadZip1.less';
// import { getUploadCouserurl } from '@/services/uploadUrl/uploadUrl';
import storetoken from '@/utils/token';

const { TextArea } = Input;
const { Option } = Select;
const FormItem = Form.Item;

@connect(({ uploadCourse, settings }) => ({
  zipInfo: uploadCourse.zipInfo,
  coursewareFileUrl: settings.uploadurl.course,
  zipFileName: uploadCourse.zipFileName,
  zipfileResponse: uploadCourse.zipfileResponse,
}))
@Form.create()
class UploadZipNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      KJMCMaxLength: 50, // 课件名称最多50字
      KJMCLengthLeft: 50, // 课件名称剩余字数
      KJJSMaxLength: 500, // 课件介绍最多500字
      KJJSLengthLeft: 500, // 课件介绍剩余字数
      SYDXMaxLength: 50, // 使用对象最多50字
      SYDXLengthLeft: 50, // 使用对象剩余字数
      JSJSMaxLength: 500, // 讲师介绍最多500字
      JSJSLengthLeft: 500, // 讲师介绍剩余字数

      zipFileName: '', // zip文件名
      zipInfo: {}, // jszip读到的信息
      zipfileResponse: '', // 上传成功后服务器返回的值
      isUploadDone: false, // 判断文件是否上传成功
      isFirstUpload: true, // 是否是首次上传
      fileList: [], // 存放上传的文件
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { isNewPage },
      },
      zipInfo,
      zipFileName,
      zipfileResponse,
      form,
    } = this.props;
    // 如果是从返回进来的页面
    if (isNewPage && isNewPage.isBack === 'Y') {
      if (Object.keys(zipInfo).length === 0) {
        return;
      }
      this.setState({
        zipFileName, // zip文件名
        isUploadDone: true, // 判断文件是否上传成功
        isFirstUpload: false, // 是否是首次上传
        zipInfo,
        zipfileResponse,
      });

      for (const key in zipInfo) {
        if (Object.prototype.hasOwnProperty.call(zipInfo, key)) {
          form.setFieldsValue({
            [key]: zipInfo[key],
          });
          if (key === 'KJMC' || key === 'KJJS' || key === 'SYDX' || key === 'JSJS') {
            const maxLen = `${key}MaxLength`;
            const lenleft = `${key}LengthLeft`;
            const value = zipInfo[key];
            this.setFormLengthLeft(maxLen, lenleft, value);
          }
        }
      }
    }
  }

  // 表单提交
  handleSubmit = () => {
    const { isFirstUpload, isUploadDone, zipFileName, zipfileResponse } = this.state;
    if (isFirstUpload) {
      message.warning('请上传课件包');
      return false;
    }
    // 测试关闭

    if (!isUploadDone) {
      message.warning('请课件包上传成功后再点击下一步');
      return false;
    }
    const {
      dispatch,
      form: { validateFieldsAndScroll },
    } = this.props;
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('表单值', values);
        dispatch({
          type: 'uploadCourse/saveZipInfo',
          param: {
            formData: values,
            zipFileName,
            zipfileResponse,
          },
        });
        router.push('/courseware/uploadZip/uploadZip2');
      }
    });
    return true;
  };

  // 解析config.ini文件，生成对应的json
  parseINIString = data => {
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
  unzipHandler = file => {
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
        const objInfo = this.parseINIString(content);
        // console.log(objInfo);
        objInfo.JSZP = `data:image/png;base64,${contentlist[1]}`;
        objInfo.KJFM = `data:image/png;base64,${contentlist[2]}`;
        return objInfo;
      });
  };

  // Upload组件beforeUpload调用的方法
  beforeUpload = file => {
    const filetype = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
    if (filetype !== 'zip') {
      message.warning('请根据模板上传zip课件包');
      return false;
    }
    this.setState({
      zipFileName: file.name,
    });
    const obj = this.unzipHandler(file)
      .then(data => {
        const { form } = this.props;
        this.setState({
          zipInfo: data,
        });
        const { zipInfo } = this.state;
        for (const i in zipInfo) {
          form.setFieldsValue({
            [i]: zipInfo[i],
          });
          if (i === 'KJMC' || i === 'KJJS' || i === 'SYDX' || i === 'JSJS') {
            const maxLen = `${i}MaxLength`;
            const lenleft = `${i}LengthLeft`;
            const value = zipInfo[i];
            this.setFormLengthLeft(maxLen, lenleft, value);
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
    return obj;
  };

  // Upload组件OnChange调用的方法
  uploadOnChange = info => {
    // console.log(info.file.status);
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
      // console.log(info);
      // console.log(info.file.response.zipfile);
      this.setState({
        isUploadDone: true,
        zipfileResponse: info.file.response.zipfileid,
      });
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

  render() {
    // const { pageHeaderWrapperTittle } = this.state;
    const {
      form: { getFieldDecorator },
      coursewareFileUrl,
    } = this.props;
    const { isFirstUpload, fileList, zipFileName, zipInfo } = this.state;
    const {
      KJMCMaxLength,
      KJMCLengthLeft,
      KJJSMaxLength,
      KJJSLengthLeft,
      SYDXMaxLength,
      SYDXLengthLeft,
      JSJSMaxLength,
      JSJSLengthLeft,
    } = this.state;
    const token = storetoken.get();
    const uploadProps = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    // const uploadurl = getUploadCouserurl();
    return (
      <PageHeaderWrapper title="上传课件">
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
                  action={coursewareFileUrl}
                  beforeUpload={this.beforeUpload}
                  onChange={this.uploadOnChange}
                  // className={styles.uploadContent}
                  className="uploadContent"
                  fileList={fileList}
                  {...uploadProps}
                >
                  <Button disabled={!(fileList.length < 1)} type="dashed" style={{ width: '100%' }}>
                    <Icon type="plus" theme="outlined" />
                    {isFirstUpload ? '上传课件包（ZIP）文件' : '重新上传课件包（ZIP）文件'}
                  </Button>
                </Upload>
                <div
                  style={{
                    marginTop: '20px',
                    marginBottom: '20px',
                    display: isFirstUpload ? 'none' : 'block',
                  }}
                >
                  课件包：
                  {zipFileName ? (
                    <span>
                      <Icon type="paper-clip" theme="outlined" />
                      {zipFileName}
                    </span>
                  ) : null}
                  {/* <span><Icon type="paper-clip" theme="outlined" />反贿赂合规.zip</span> */}
                </div>
                <Form hideRequiredMark style={{ display: isFirstUpload ? 'none' : 'block' }}>
                  <SelfCard title="课程信息" nopadding="true">
                    <FormItem label="课件编号：" className={styles.selfFormItem}>
                      {getFieldDecorator('KJBH', {
                        rules: [
                          {
                            required: true,
                            message: '课件编号必填',
                          },
                        ],
                      })(<Input disabled style={{ display: 'none' }} />)}
                      <div>{zipInfo.KJBH ? zipInfo.KJBH : 'XXXXXXXXXXXXXX'}</div>
                    </FormItem>
                    <FormItem label="课件名称：" className={styles.selfFormItem}>
                      {getFieldDecorator('KJMC', {
                        rules: [
                          {
                            required: true,
                            message: '课件名称必填',
                          },
                        ],
                      })(
                        <Input
                          placeholder="课件名称"
                          maxLength={KJMCMaxLength}
                          onChange={e => {
                            this.inputLengthFun(e, 'KJMCLengthLeft', KJMCMaxLength);
                          }}
                        />
                      )}
                      <span className={styles.spanTipsContent}>
                        剩余
                        <span>{KJMCLengthLeft}</span>字
                      </span>
                    </FormItem>
                    <Row>
                      <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
                        <FormItem
                          label="课件分类："
                          className={classNames(styles.selfFormItem, styles.selfFormItemPadding)}
                        >
                          {getFieldDecorator('KJFL', {
                            rules: [
                              {
                                required: true,
                                message: '课件分类必填',
                              },
                            ],
                          })(
                            <Select>
                              <Option value="公开课">公开课</Option>
                              <Option value="非公开课">非公开课</Option>
                            </Select>
                          )}
                        </FormItem>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
                        <FormItem
                          label="课件类型："
                          className={classNames(styles.selfFormItem, styles.selfFormItemPadding)}
                        >
                          {getFieldDecorator('KJLX', {
                            rules: [
                              {
                                required: true,
                                message: '课件类型必填',
                              },
                            ],
                          })(
                            <Select>
                              <Option value="通用课件">通用课件</Option>
                              <Option value="合规基础课件">合规基础课件</Option>
                              <Option value="合规管理课件">合规管理课件</Option>
                              <Option value="其他">其他</Option>
                            </Select>
                          )}
                        </FormItem>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
                        <FormItem
                          label="课&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时："
                          className={styles.selfFormItem}
                        >
                          {getFieldDecorator('KS', {
                            rules: [
                              {
                                required: true,
                                message: '课时必填',
                              },
                            ],
                          })(<Input placeholder="课时" style={{ width: 'calc(100% - 30px)' }} />)}
                          <span style={{ width: '30px' }}>小时</span>
                        </FormItem>
                      </Col>
                    </Row>
                    <FormItem label="课件介绍：" className={styles.selfFormItem}>
                      {getFieldDecorator('KJJS', {
                        rules: [
                          {
                            required: true,
                            message: '课件介绍必填',
                          },
                        ],
                      })(
                        <TextArea
                          placeholder="课件介绍"
                          maxLength={KJJSMaxLength}
                          onChange={e => {
                            this.inputLengthFun(e, 'KJJSLengthLeft', KJJSMaxLength);
                          }}
                        />
                      )}
                      <span className={styles.spanTipsContent}>
                        剩余
                        <span>{KJJSLengthLeft}</span>字
                      </span>
                    </FormItem>
                    <FormItem label="适用对象：" className={styles.selfFormItem}>
                      {getFieldDecorator('SYDX', {
                        rules: [
                          {
                            required: true,
                            message: '适用对象必填',
                          },
                        ],
                      })(
                        <Input
                          placeholder="适用对象"
                          maxLength={SYDXMaxLength}
                          onChange={e => {
                            this.inputLengthFun(e, 'SYDXLengthLeft', SYDXMaxLength);
                          }}
                        />
                      )}
                      <span className={styles.spanTipsContent}>
                        剩余
                        <span>{SYDXLengthLeft}</span>字
                      </span>
                    </FormItem>
                    <Row>
                      <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
                        <FormItem
                          label="课程文件类型："
                          className={classNames(styles.selfFormItem, styles.selfFormItemPadding)}
                        >
                          {getFieldDecorator('KJWJLX', {
                            rules: [
                              {
                                required: true,
                                message: '课程文件类型必填',
                              },
                            ],
                          })(
                            <Select disabled style={{ display: 'none' }}>
                              <Option value="0">PDF</Option>
                              <Option value="1">MP4</Option>
                            </Select>
                          )}
                          {!zipInfo.KJWJLX ? (
                            <div>PDF/MP4</div>
                          ) : zipInfo.KJWJLX === '0' ? (
                            <div>PDF</div>
                          ) : (
                            <div>MP4</div>
                          )}
                        </FormItem>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
                        <FormItem
                          label="允许视频拖放："
                          className={classNames(styles.selfFormItem, styles.selfFormItemPadding)}
                        >
                          {getFieldDecorator('YXSPTF', {
                            rules: [
                              {
                                required: true,
                                message: '允许视频拖放必填',
                              },
                            ],
                          })(
                            <Select>
                              <Option value="0">是</Option>
                              <Option value="1">否</Option>
                            </Select>
                          )}
                        </FormItem>
                      </Col>
                    </Row>
                    <FormItem label="课件封面：" className={styles.selfFormItem}>
                      {getFieldDecorator('KJFM', {
                        rules: [
                          {
                            required: true,
                            message: '课件封面必填',
                          },
                        ],
                      })(<Input style={{ display: 'none' }} />)}
                      {zipInfo.KJFM ? (
                        <img src={zipInfo.KJFM} alt="课件封面" height="130" />
                      ) : (
                        <div style={{ width: '230px', height: '130px', background: '#ccc' }} />
                      )}
                    </FormItem>
                    <FormItem label="文件名称" className={styles.selfFormItem}>
                      {getFieldDecorator('KJWJ', {
                        rules: [
                          {
                            required: true,
                            message: '文件名称',
                          },
                        ],
                      })(<Input disable="true" placeholder="文件名称" />)}
                    </FormItem>
                  </SelfCard>
                  <SelfCard title="讲师信息" nopadding="true">
                    <div className={styles.teacherInfo}>
                      <div className={styles.teacherInfoLeft}>
                        <FormItem className={styles.selfFormItem}>
                          {getFieldDecorator('JSZP', {
                            rules: [
                              {
                                required: true,
                                message: '讲师照片必填',
                              },
                            ],
                          })(<Input style={{ display: 'none' }} />)}
                          <Avatar size={100} src={zipInfo.JSZP} alt="老师头像" icon="user" />
                          {/* <Avatar size={100} src={require('@/assets/images/SiderMenu/avatar_default_big.png')} alt="老师头像" icon='user' /> */}
                        </FormItem>
                      </div>
                      <div className={styles.teacherInfoRight}>
                        <FormItem label="讲师姓名：" className={styles.selfFormItem}>
                          {getFieldDecorator('JSXM', {
                            rules: [
                              {
                                required: true,
                                message: '讲师姓名必填',
                              },
                            ],
                          })(<Input placeholder="讲师姓名" />)}
                        </FormItem>
                        <FormItem label="讲师介绍：" className={styles.selfFormItem}>
                          {getFieldDecorator('JSJS', {
                            rules: [
                              {
                                required: true,
                                message: '讲师介绍必填',
                              },
                            ],
                          })(
                            <TextArea
                              placeholder="讲师介绍"
                              maxLength={JSJSMaxLength}
                              onChange={e => {
                                this.inputLengthFun(e, 'JSJSLengthLeft', JSJSMaxLength);
                              }}
                            />
                          )}
                          <span className={styles.spanTipsContent}>
                            剩余
                            <span>{JSJSLengthLeft}</span>字
                          </span>
                        </FormItem>
                      </div>
                    </div>
                  </SelfCard>
                </Form>
              </Col>
            </Row>
          </div>
          <div className={styles.foonter_btns}>
            <Button type="primary" onClick={this.handleSubmit}>
              下一步
            </Button>

            <Link to="/courseware/coursewareManager/index">
              <Button>取消</Button>
            </Link>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default UploadZipNew;
