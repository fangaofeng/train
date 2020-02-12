import 'braft-editor/dist/index.css';
import React from 'react';
import moment from 'moment';
import BraftEditor from 'braft-editor';
import {
  Form,
  Input,
  Button,
  Card,
  Upload,
  Icon,
  message,
  Modal,
  DatePicker,
  Select,
  Row,
  Col,
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import { getImageUploadurl } from '@/services/uploadUrl/uploadUrl';
import { connect } from 'dva';
import styles from './index.less';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const { Option } = Select;
const FormItem = Form.Item;
const { TextArea } = Input;
function range(start, end) {
  const result = [];
  for (let i = start; i < end; i += 1) {
    result.push(i);
  }
  return result;
}
@connect(settings => ({ blogCover: settings.uploadurl.blog_cover }))
class FormDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      previewImage: '',
      coverImg: '',
      previewVisible: false,
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      dispatch,
      form,
    } = this.props;
    // 异步设置编辑器内容
    if (id) {
      dispatch({
        type: 'Announcement/GetArticleDetail',
        payload: { id },
        callback: res => {
          if (res && res.status === 'ok') {
            const { body, thumbnail, title, description, status, pubTime, cover } = res.data;

            form.setFieldsValue({
              body: BraftEditor.createEditorState(body),
              title,
              status,
              pubTime,
              cover: this.propToFileList(thumbnail),
              description,
            });

            this.setState({
              previewImage: thumbnail,
              coverImg: cover,
              loading: false,
            });
          } else {
            message.warn('请求失败');
          }
        },
      });
    } else {
      form.setFieldsValue({
        body: BraftEditor.createEditorState('你可以在这里编辑你的文章!'),
      });
    }
  }

  beforeUpload = file => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    // return isJPG && isLt2M;
    getBase64(file, previewImage => {
      console.log('beforeUpload getBase64:');
      this.setState({
        previewImage,
        coverImg: previewImage,
        loading: false,
      });
    });
    return false;
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handleRemove = () => this.setState({ previewVisible: false, previewImage: '', coverImg: '' });

  handleSubmit = event => {
    event.preventDefault();
    const {
      form,
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;

    form.validateFields((error, values) => {
      if (!error) {
        const data = new FormData();

        data.append('title', values.title);
        data.append('body', values.body.toHTML());
        data.append('status', values.status);
        if (values.cover[0].originFileObj) {
          data.append('cover', values.cover[0].originFileObj, values.cover[0].name);
        }

        if (id) {
          dispatch({
            type: 'Announcement/EditArticle',
            payload: {
              id,
              data,
            },
            callback: res => {
              if (res && res.status === 'ok') {
                console.log('请求成功');
              } else {
                console.log('请求失败');
              }
            },
          });
        } else {
          data.append('pubTime', values.pubTime);
          dispatch({
            type: 'Announcement/CreateArticle',
            payload: data,

            callback: res => {
              if (res && res.status === 'ok') {
                message.success('公告创建成功');
              } else {
                message.warn('公告创建失败');
              }
            },
          });
        }
      }
    });
  };

  handlePreview = file => {
    // console.log('handlePreview');
    if (!file.url && !file.preview) {
      this.setState({
        previewVisible: true,
      });
    }
  };

  handleUploadChange = info => {
    console.log('handleUploadChange:', info);
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  propToFileList = value => {
    const fileList = [];
    fileList.push({
      uid: 0,
      name: 'cover',
      status: 'done',
      url: value,
    });

    return fileList;
  };

  render() {
    const {
      form: { getFieldDecorator, blogCover },
    } = this.props;
    const { loading, previewVisible, coverImg } = this.state;

    const controls = [
      'bold',
      'italic',
      'underline',
      'text-color',
      'separator',
      'link',
      'separator',
      'media',
    ];

    const uploadButton = (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    function disabledDate(current) {
      // Can not select days before today and today
      // return current < moment().endOf('day');
      return (
        current <
        moment()
          .subtract(1, 'day')
          .endOf('day')
      );
    }

    function disabledDateTime() {
      return {
        disabledHours: () => range(0, 24).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56],
      };
    }
    // const coverurl = getImageUploadurl();
    const { previewImage } = this.state;
    return (
      <PageHeaderWrapper title="发布公告">
        <Row gutter={8}>
          <Col xs={24} sm={24} md={24} lg={18} xl={16}>
            <Card className={styles.managerContent}>
              <Form onSubmit={this.handleSubmit} className={styles.formContent}>
                <FormItem label="文章标题">
                  {getFieldDecorator('title', {
                    rules: [
                      {
                        required: true,
                        message: '请输入标题',
                      },
                    ],
                  })(<Input size="large" placeholder="请输入标题" />)}
                </FormItem>
                <FormItem label="文章封面">
                  {getFieldDecorator('cover', {
                    rules: [
                      {
                        required: true,
                        message: '请上传或选择封面',
                      },
                    ],
                    valuePropName: 'fileList',
                    getValueFromEvent: this.normFile,
                  })(
                    <Upload
                      name="cover"
                      listType="picture-card"
                      className="cover-uploader"
                      // showUploadList={false}
                      action={blogCover}
                      beforeUpload={this.beforeUpload}
                      onChange={this.handleUploadChange}
                      onPreview={this.handlePreview}
                      onRemove={this.handleRemove}
                      withCredentials
                      // fileList={fileList}
                      // {...uploadProps}
                    >
                      {/* {previewImage ? (
                    <img src={previewImage} alt="No COVER" className={styles.image} />
                  ) : (
                    uploadButton
                  )} */}
                      {previewImage ? null : uploadButton}
                    </Upload>
                  )}
                </FormItem>
                <FormItem label="文章摘要">
                  {getFieldDecorator('description')(
                    <TextArea
                      autoSize={{ minRows: 2, maxRows: 5 }}
                      size="large"
                      placeholder="请输入文章摘要"
                    />
                  )}
                </FormItem>
                <Form.Item label="发布日期">
                  {getFieldDecorator('pubTime', {
                    rules: [{ required: true, message: '请输入' }],
                  })(
                    <DatePicker
                      format="YYYY-MM-DD HH:mm:ss"
                      disabledDate={disabledDate}
                      disabledTime={disabledDateTime}
                      showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                      placeholder="提醒时间"
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
                <Form.Item label="发布或草稿">
                  {getFieldDecorator('status', {
                    rules: [{ required: true, message: '选择状态' }],
                    initialValue: 'd',
                  })(
                    <Select placeholder="请选择仓库类型">
                      <Option value="d">草稿</Option>
                      <Option value="p">发布</Option>
                    </Select>
                  )}
                </Form.Item>
                <FormItem label="文章正文">
                  {getFieldDecorator('body', {
                    validateTrigger: 'onBlur',
                    rules: [
                      {
                        required: true,
                        validator: (_, value, callback) => {
                          if (value.isEmpty()) {
                            callback('请输入正文内容');
                          } else {
                            callback();
                          }
                        },
                      },
                    ],
                  })(
                    <BraftEditor
                      className={styles.editorStyle}
                      contentStyle={{
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,.1)',
                      }}
                      controls={controls}
                      placeholder="请输入正文内容"
                    />
                  )}
                </FormItem>
              </Form>
              <div className={styles.foonter_btns}>
                <Button type="primary" onClick={this.handleSubmit}>
                  提交
                </Button>
                <Button onClick={this.btnCancel}>取消</Button>
              </div>
            </Card>
          </Col>{' '}
          <Col xs={24} sm={24} md={24} lg={6} xl={8}>
            <Card title="最近公告" />
          </Col>
        </Row>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={coverImg} />
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(FormDemo);
