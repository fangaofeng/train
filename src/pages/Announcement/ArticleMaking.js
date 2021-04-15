import React, { useState, useEffect } from 'react';
import { useModel, useRequest, history } from 'umi';
import { useUpdateEffect } from '@umijs/hooks';
import moment from 'moment';
import BraftEditor from 'braft-editor';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { announcementService } from '@/services';

import 'braft-editor/dist/index.css';
// import '@ant-design/compatible/assets/index.css';
import {
  Input,
  Button,
  Card,
  Upload,
  message,
  Modal,
  DatePicker,
  Select,
  Row,
  Col,
  Form,
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
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

function ArticleEdit(props) {
  const {
    match: {
      params: { id },
    },
  } = props;
  const {
    initialState: { uploadurl },
  } = useModel('@@initialState');

  const blogCoverUrl = uploadurl.blogCover;

  const [form] = Form.useForm();
  const [previewImage, setPreviewImage] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [coverImg, setCoverImg] = useState('');

  const { data, run, loading } = useRequest(tid => announcementService.retrive(tid), {
    manual: true,
  });

  useEffect(() => {
    if (id) {
      run(id);
    } else {
      form.setFieldsValue({
        body: BraftEditor.createEditorState('你可以在这里编辑你的文章!'),
      });
    }
  }, []);

  const propToFileList = value => {
    const fileList = [];
    fileList.push({
      uid: 0,
      name: 'cover',
      status: 'done',
      url: value,
    });

    return fileList;
  };

  useUpdateEffect(() => {
    if (data) {
      form.setFieldsValue({
        body: BraftEditor.createEditorState(data.body),
        title: data.title,
        status: data.title,
        pubTime: moment(data.pub_time),
        cover: propToFileList(data.cover),
        description: data.description,
      });
      setCoverImg(data.cover);
      setPreviewImage(data.thumbnail);
    }
  }, [data]);

  const beforeUpload = file => {
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
      setCoverImg(previewImage);
      setPreviewImage(previewImage);
    });
    return false;
  };

  const handleRemove = () => (setPreviewVisible(false), setCoverImg(''), setPreviewImage(''));

  const patchRequest = useRequest((idt, datat) => announcementService.patch(idt, datat), {
    manual: true,
    onSuccess: (result, params) => {
      if (result.success) {
        message.success(`修改成功 ${params[0]}`);
      }
    },
  });

  const createRequest = useRequest(datat => announcementService.create(datat), {
    manual: true,
    onSuccess: (result, params) => {
      if (result.success) {
        message.success(`创建成功 ${params[0]}`);
      }
    },
  });

  const onFinish = values => {
    const data = new FormData();
    data.append('title', values.title);
    data.append('body', values.body.toHTML());
    data.append('status', values.status);
    if (values.cover[0].originFileObj) {
      data.append('cover', values.cover[0].originFileObj, values.cover[0].name);
    }

    if (id) {
      patchRequest.run(id, data);
    } else {
      data.append('pub_time', values.pubTime);
      createRequest.run(data);
    }
  };

  const handlePreview = file => {
    if (file.url) {
      setPreviewVisible(true);
    }
  };

  const handleUploadChange = info => {
    console.log('handleUploadChange:', info);
  };

  const normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

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
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">上传</div>
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

  return (
    <PageHeaderWrapper title="发布公告">
      <Row gutter={8} style={{ display: 'flex' }}>
        <Col xs={24} sm={24} md={24} lg={18} xl={16}>
          <Card className={styles.managerContent}>
            <Form
              form={form}
              initialValues={{ status: 'd' }}
              onFinish={onFinish}
              className={styles.formContent}
            >
              <FormItem
                label="文章标题"
                name="title"
                rules={[{ required: true, message: '请输入标题' }]}
              >
                <Input size="large" placeholder="请输入标题" />
              </FormItem>
              <FormItem
                label="文章封面"
                name="cover"
                rules={[{ required: true, message: '请上传或选择封面' }]}
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload
                  name="cover"
                  listType="picture-card"
                  className="cover-uploader"
                  action={blogCoverUrl}
                  beforeUpload={beforeUpload}
                  onChange={handleUploadChange}
                  onPreview={handlePreview}
                  onRemove={handleRemove}
                  withCredentials
                >
                  {previewImage === '' ? uploadButton : null}
                </Upload>
              </FormItem>
              <FormItem label="文章摘要" name="description">
                <TextArea
                  autoSize={{ minRows: 2, maxRows: 5 }}
                  size="large"
                  placeholder="请输入文章摘要"
                />
              </FormItem>
              <Form.Item
                label="发布日期"
                name="pubTime"
                rules={[{ required: true, message: '请输入' }]}
              >
                <DatePicker
                  format="YYYY-MM-DD HH:mm:ss"
                  disabledDate={disabledDate}
                  disabledTime={disabledDateTime}
                  showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                  placeholder="提醒时间"
                  style={{ width: '100%' }}
                />
              </Form.Item>
              <Form.Item
                label="发布或草稿"
                name="status"
                rules={[{ required: true, message: '选择状态' }]}
              >
                <Select placeholder="请选择仓库类型">
                  <Option value="d">草稿</Option>
                  <Option value="p">发布</Option>
                </Select>
              </Form.Item>
              <FormItem
                label="文章正文"
                name="body"
                rules={[
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
                ]}
                validateTrigger="onBlur"
              >
                <BraftEditor
                  className={styles.editorStyle}
                  contentStyle={{
                    boxShadow: 'inset 0 1px 3px rgba(0,0,0,.1)',
                  }}
                  controls={controls}
                  placeholder="请输入正文内容"
                />
              </FormItem>
              <Form.Item className={styles.foonter_btns}>
                {' '}
                {/* <Button
                  type="primary"
                  loading={patchRequest.loading | createRequest.loading}
                  htmlType="submit"
                >
                  提交
                </Button>
                <Button onClick={() => history.replace('/announcement/article')}>取消</Button> */}
                <div className={styles.foonter_btns}>
                  <Button
                    type="primary"
                    loading={patchRequest.loading | createRequest.loading}
                    htmlType="submit"
                  >
                    提交
                  </Button>
                  <Button onClick={() => history.replace('/announcement/article')}>取消</Button>
                </div>
              </Form.Item>
            </Form>
          </Card>
        </Col>{' '}
        <Col xs={24} sm={24} md={24} lg={6} xl={8} style={{ display: 'flex' }}>
          <Card title="最近公告" style={{ width: '100%' }} />
        </Col>
      </Row>
      <Modal visible={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)}>
        <img alt="coverImg" style={{ width: '100%' }} src={coverImg} />
      </Modal>
    </PageHeaderWrapper>
  );
}

export default ArticleEdit;
