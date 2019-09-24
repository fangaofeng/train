import React, { Component } from 'react';
import {
  Modal,
  Card,
  Button,
  Table,
  Divider,
  Popconfirm,
  Icon,
  Upload,
  Row,
  Col,
  message,
  Input,
  Select,
  Form,
  Avatar,
} from 'antd';
import router from 'umi/router';
import Link from 'umi/link';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Common.less';

const { Search } = Input;

@connect(({ trainGroupManager, loading }) => ({
  allTrainGroupTableData: trainGroupManager.allTrainGroupTableData, // 培训管理员 ————> 培训群组管理 ————> 主页面（获取table表格数据）
  traingroupsLoading: loading.effects['trainGroupManager/GetAllTrainGroupData'],
}))
class TrainGroupManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false, // 是否显示批量删除的模态框
      confirmLoading: false, // 确定按钮 loading
      selectedAllKeys: [], // 选中的数据组成的数组（只包含key值）
      pagination: {
        // 表格分页信息
        // total:20,// 数据总数
        current: 1, // 当前页数
        pageSize: 10, // 每页条数
        pageSizeOptions: ['10', '20', '30', '40'], // 指定每页可以显示多少条数据
        showQuickJumper: true, // 是否可以快速跳转至某页
        showSizeChanger: true, // 是否可以改变 pageSize
      },
    };
  }

  // 页面加载完成后
  componentDidMount() {
    // 默认是获取第一页数据
    const {
      pagination: { current, pageSize },
    } = this.state;
    this.getTableData(current, pageSize);
  }

  // 增加群组
  addTrainGroup = () => {
    router.push('/trainGroupManager/addTrainGroup');
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
      type: 'trainGroupManager/BatchDelTGManager',
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
            pagination: {
              current: 1,
              pageSize: 10,
            },
          });
          this.getTableData(1, 10);
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
    console.log('取消按钮');
    this.setState({
      visible: false,
      confirmLoading: false,
    });
  };

  // 查看
  viewDetail = record => {
    console.log('查看', record);
    router.push({
      pathname: '/trainGroupManager/viewTrainGroup',
      query: {
        id: record.id,
        num: record.group_no,
        name: record.name,
      },
    });
  };

  // 编辑
  editGroup = record => {
    console.log('编辑', record);
    router.push({
      pathname: '/trainGroupManager/editTrainGroup',
      query: {
        id: record.id,
        num: record.group_no,
        name: record.name,
      },
    });
  };

  // 单个删除
  deleteConfirm = id => {
    const IDArr = [];
    IDArr.push(id);
    const { dispatch, allTrainGroupTableData } = this.props;
    const {
      pagination: { current, pageSize },
      selectedAllKeys,
    } = this.state;
    const flag = selectedAllKeys.indexOf(id); // 用于判断该数据是否已经选中存放到selectedAllKeys数组中
    const len = allTrainGroupTableData.results.length; // 获取该页数据条数
    dispatch({
      type: 'trainGroupManager/DelTGManager',
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
          if (current > 1 && len === 1) {
            const prePage = current - 1;
            this.setState({
              pagination: {
                current: prePage,
                pageSize,
              },
            });
            this.getTableData(prePage, pageSize);
          } else {
            this.getTableData(current, pageSize);
          }
        } else {
          message.warning('删除失败');
        }
      },
    });
  };

  // 获取table表格数据(指定页码，指定每页条数)
  getTableData = (page, size) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'trainGroupManager/GetAllTrainGroupData',
      payload: {
        page, // 页码
        size, // 每页条数
      },
    });
  };

  // 分页、排序、筛选变化时触发。这边只有分页功能，没有排序和筛选
  handleTableChange = _pagination_ => {
    // console.log('-------------------');
    // console.log(_pagination_);
    // console.log('-------------------');
    const { pagination } = this.state;
    const { current, pageSize } = _pagination_;
    this.setState({
      pagination: {
        ...pagination,
        current,
        pageSize,
      },
    });
    this.getTableData(current, pageSize);
  };

  render() {
    const { allTrainGroupTableData, traingroupsLoading } = this.props;
    const { selectedAllKeys, pagination, visible, confirmLoading } = this.state;
    const pageConifg = {
      ...pagination,
      total: allTrainGroupTableData.count,
      showTotal: total => `共 ${total} 条记录`,
    };
    // 选中的表格行
    const rowSelection = {
      selectedRowKeys: selectedAllKeys,
      // 选中项发生变化时的回调
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys, selectedRows);
        this.setState({
          selectedAllKeys: selectedRowKeys,
        });
      },
    };
    // 循环Table数据，添加key
    const dataSource = allTrainGroupTableData.results.map(value =>
      Object.assign({}, value, { key: value.id })
    );

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
            <a onClick={() => this.viewDetail(record)}>查看</a>
            <Divider type="vertical" />
            <a onClick={() => this.editGroup(record)}>编辑</a>
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
          <Table
            bordered
            loading={traingroupsLoading}
            dataSource={dataSource}
            columns={columns}
            pagination={pageConifg}
            onChange={this.handleTableChange}
            rowSelection={rowSelection}
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
