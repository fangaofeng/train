import 'braft-editor/dist/index.css';
import React from 'react';
import BraftEditor from 'braft-editor';
import { Form, Input, Button, Card, Upload, Icon, message, Modal, TimePicker, Select } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getImageUploadurl } from '@/services/uploadUrl/uploadUrl';
import { connect } from 'dva';
import styles from './index.less';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const { Option } = Select;
const FormItem = Form.Item;

@connect(() => ({}))
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
        params: { ID },
      },
      dispatch,
      form,
    } = this.props;
    // 异步设置编辑器内容
    if (ID) {
      dispatch({
        type: 'ArticleManager/GetArticleDetail',
        payload: { id: ID },
        callback: res => {
          if (res.status === 'ok') {
            const { body, thumbnail, title, description, status, pubTime, cover } = res.data;
            console.log('请求成功');
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
            console.log('请求失败');
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
        params: { ID },
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

        if (ID) {
          dispatch({
            type: 'ArticleManager/EditArticle',
            payload: {
              id: ID,
              data,
            },
            callback: res => {
              if (res.status === 'ok') {
                console.log('请求成功');
              } else {
                console.log('请求失败');
              }
            },
          });
        } else {
          data.append('pubTime', values.pubTime);
          dispatch({
            type: 'ArticleManager/CreateArticle',
            payload: data,

            callback: res => {
              if (res.status === 'ok') {
                console.log('请求成功');
              } else {
                console.log('请求失败');
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
    // if (info.file.status === 'uploading') {
    //   this.setState({ loading: true });
    //   return;
    // }

    // if (info.file.status === 'done') {
    //   // Get this url from response in real world.
    //   getBase64(info.file.originFileObj, previewImage =>
    //     this.setState({
    //       previewImage,
    //       loading: false,
    //     })
    //   );
    // }
    // if (info.file.status === 'error') {
    //   message.error(`${info.file.name}上传失败`);
    //   this.setState({
    //     loading: false,
    //   });
    // }
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
      form: { getFieldDecorator },
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
    const coverurl = getImageUploadurl();
    const { previewImage } = this.state;
    return (
      <PageHeaderWrapper title="发布公告">
        <Card className={styles.ArticleManagerContent}>
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
                  action={coverurl}
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
                <Input size="large" placeholder="请输入文章摘要" />
              )}
            </FormItem>
            <Form.Item label="发布日期">
              {getFieldDecorator('pubTime', {
                rules: [{ required: true, message: '请输入' }],
              })(<TimePicker placeholder="提醒时间" style={{ width: '100%' }} />)}
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

        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={coverImg} />
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(FormDemo);
