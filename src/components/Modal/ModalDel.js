import React, { Component } from 'react';
import { Button, Icon, message, Modal } from 'antd';
// import router from 'umi/router';
// import Link from 'umi/link';
// import styles from './Common.less';

class CommonConent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delConfirmLoading: false, // 批量删除的模态框————>确定按钮 loading
    };
  }

  // 页面加载完成后
  componentDidMount() {}

  // ---------------批量删除---------------
  // 批量删除确认按钮
  delHandleOk = () => {
    const {
      dispatch,
      match: {
        params: { ID },
      },
      selectedAllKeys,
      delAtiontype,
      visiblecallback,
    } = this.props;
    this.setState({
      delConfirmLoading: true,
    });
    dispatch({
      type: delAtiontype,
      payload: {
        id: ID, // 课件id
        data: {
          trainmanagers: selectedAllKeys,
        },
      },
      callback: res => {
        if (res.status === 'ok') {
          message.success('批量删除成功');
          visiblecallback(false, true);
        } else {
          message.warning('批量删除失败');
          visiblecallback(false, false);
        }
        this.setState({
          delConfirmLoading: false,
        });
      },
    });
  };

  // 批量删除取消按钮
  delHandleCancel = () => {
    console.log('取消按钮');
    const { visiblecallback } = this.props;
    this.setState({
      delConfirmLoading: false,
    });
    visiblecallback(false, false);
  };
  // ---------------批量删除---------------

  render() {
    const { delConfirmLoading } = this.state;

    const { visible } = this.props;

    return (
      <Modal
        visible={visible}
        title="批量删除提示"
        style={{ top: 150 }}
        onOk={this.delHandleOk}
        onCancel={this.delHandleCancel}
        footer={
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" loading={delConfirmLoading} onClick={this.delHandleOk}>
              确定
            </Button>
            <Button onClick={this.delHandleCancel}>取消</Button>
          </div>
        }
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px 0',
          }}
        >
          <Icon
            type="exclamation-circle"
            theme="filled"
            style={{ color: '#faad14', fontSize: '24px', marginRight: '15px' }}
          />
          确定要删除所选数据？
        </div>
      </Modal>
    );
  }
}

export default CommonConent;
