/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { Upload, message, Avatar } from 'antd';
import storetoken from '@/utils/token';


function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

class AvatarView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      imageUrl: null,
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    if ('avatar' in nextProps && nextProps.avatar) {
      if (state.imageUrl === null) {
        return { imageUrl: nextProps.avatar };
      }
    }
    return null;
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      const {
        response: {
          data: { avatar },
        },
      } = info.file;

      this.setState({
        imageUrl: avatar,
        loading: false,
      });
    }
  };

  render() {
    const { loading, imageUrl } = this.state;
    const { uploadurl } = this.props;
    const uploadButton = (
      <div>
        <LegacyIcon type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传头像</div>
      </div>
    );

    const token = storetoken.get();
    const uploadProps = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    // const action = getUploadAvatarurl();
    return (
      <section className="example">
        <h3 className="ex-title">头像</h3>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action={uploadurl}
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
          {...uploadProps}
        >
          {imageUrl ? (
            loading ? (
              <Avatar size={136} icon={<LoadingOutlined />} />
            ) : (
              <Avatar size={136} src={imageUrl} icon={<UserOutlined />} />
            )
          ) : (
            uploadButton
          )}
        </Upload>
      </section>
    );
  }
}

export default AvatarView;
