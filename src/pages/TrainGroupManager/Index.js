import React, { Component } from 'react';
import { Modal, Card, Button, Divider, Popconfirm, Icon, message, Input } from 'antd';
import router from 'umi/router';
import Link from 'umi/link';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Common.less';
import PageTable from '@/components/PageTable';

const { Search } = Input;

@connect(({ trainGroupManager, loading }) => ({
  trainGroups: trainGroupManager.trainGroups, // 培训管理员 ————> 培训群组管理 ————> 主页面（获取table表格数据）
  traingroupsLoading: loading.effects['trainGroupManager/GetTrainGroups'],
}))
class TrainGroupManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false, // 是否显示批量删除的模态框
      confirmLoading: false, // 确定按钮 loading
      selectedAllKeys: [], // 选中的数据组成的数组（只包含key值）
    };
  }

  // 页面加载完成后
  componentDidMount() {}

  // 增加群组
  addTrainGroup = () => {
    router.push('/trainGroupManager/addTrainGroup');
  };

  handleSelectRows = rows => {
    this.setState({
      selectedAllKeys: rows,
    });
  };

  // 批量删除,如果选择了数据，则显示删除模态框
  batchDelete = () => {
    const { selectedAllKeys } = this.state;
    if (selectedAllKeys.length < 1) {
      message.info('请选择您需要删除的数据！');
      return;
    }
    this.setState({
      visible: true,
      confirmLoading: false,
    });
  };

  // 批量删除确认按钮
  handleOk = () => {
    const { selectedAllKeys } = this.state;
    const { dispatch } = this.props;
    this.setState({
      confirmLoading: true,
    });
    dispatch({
      type: 'trainGroupManager/BatchDelTraingroups',
      payload: {
        traingroups: selectedAllKeys,
      },
      callback: res => {
        if (res.status === 'ok') {
          message.success('批量删除成功');
          this.setState({
            visible: false,
            confirmLoading: false,
            selectedAllKeys: [], // 选中的数据组成的数组（只包含key值）
          });
        } else {
          message.warning('批量删除失败');
          this.setState({
            confirmLoading: false,
          });
        }
      },
    });
  };

  // 批量删除取消按钮
  handleCancel = () => {
    this.setState({
      visible: false,
      confirmLoading: false,
    });
  };

  // 单个删除
  deleteConfirm = id => {
    const IDArr = [];
    IDArr.push(id);
    const { dispatch } = this.props;
    const { selectedAllKeys } = this.state;
    const flag = selectedAllKeys.indexOf(id); // 用于判断该数据是否已经选中存放到selectedAllKeys数组中
    dispatch({
      type: 'trainGroupManager/batchDelTGManager',
      payload: {
        traingroups: IDArr, // 转换成数组
      },
      callback: res => {
        if (res.status === 'ok') {
          message.success('删除成功');
          if (flag > -1) {
            selectedAllKeys.splice(flag, 1);
            this.setState({
              selectedAllKeys,
            });
          }
        } else {
          message.warning('删除失败');
        }
      },
    });
  };

  render() {
    const { trainGroups, traingroupsLoading } = this.props;
    const { selectedAllKeys, visible, confirmLoading } = this.state;

    const columns = [
      {
        title: '培训群组编号',
        dataIndex: 'train_group_number',
        key: 'train_group_number',
        render: (text, record) => <span>{record.group_no}</span>,
      },
      {
        title: '培训群组名称',
        dataIndex: 'train_group_name',
        key: 'train_group_name',
        render: (text, record) => <span>{record.name}</span>,
      },
      {
        title: '群组成员',
        dataIndex: 'train_group_member',
        key: 'train_group_member',
        render: (text, record) => (
          <span>
            {/* {record.trainers.length} */}
            {record.count}
          </span>
        ),
      },
      {
        title: '操作',
        dataIndex: 'train_group_opt',
        key: 'train_group_opt',
        render: (text, record) => (
          <span>
            <Link
              to={`/trainGroupManager/viewTrainGroup/${record.id}?name=${record.name}&num=${
                record.group_no
              }`}
            >
              查看
            </Link>
            <Divider type="vertical" />
            <Link
              to={`/trainGroupManager/editTrainGroup/${record.id}?name=${record.name}&num=${
                record.group_no
              }`}
            >
              编辑
            </Link>
            <Divider type="vertical" />
            <Popconfirm
              placement="topRight"
              title="确认删除该条数据？"
              onConfirm={() => this.deleteConfirm(record.key)}
              okText="确定"
              cancelText="取消"
            >
              <a>删除</a>
            </Popconfirm>
          </span>
        ),
      },
    ];

    return (
      <PageHeaderWrapper title="培训群组管理">
        <Card className={styles.trainGroupCommonContent}>
          <div className={styles.searchContent}>
            <div>
              <Search
                placeholder="输入群组编号或名称过滤"
                onSearch={value => console.log(value)}
                style={{ width: 300 }}
              />
            </div>
            <div>
              <Button type="primary" onClick={this.addTrainGroup}>
                增加群组
              </Button>
              <Button className="ant-btn-del" onClick={this.batchDelete}>
                批量删除
              </Button>
            </div>
          </div>

          <PageTable
            {...this.props}
            data={trainGroups}
            columns={columns}
            loading={traingroupsLoading}
            onSelectRow={this.handleSelectRows}
            action="trainGroupManager/GetTrainGroups"
            selectedRows={selectedAllKeys}
          />
        </Card>
        <Modal
          visible={visible}
          title="删除培训群组"
          style={{ top: 150 }}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          // confirmLoading={confirmLoading}
          footer={
            <div style={{ textAlign: 'center' }}>
              <Button type="primary" loading={confirmLoading} onClick={this.handleOk}>
                确定
              </Button>
              <Button onClick={this.handleCancel}>取消</Button>
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
            确定要删除培训群组吗？
          </div>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default TrainGroupManage;
