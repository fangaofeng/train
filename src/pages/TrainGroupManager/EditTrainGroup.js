import React, { Component } from 'react';
import { Card, Button, Popconfirm, message, Input, Form } from 'antd';
import router from 'umi/router';

import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PageTable from '@/components/PageTable';
import ModalAdd from '@/components/Modal/ModalAdd';
import ModalDel from '@/components/Modal/ModalDel';
import styles from './Common.less';

const FormItem = Form.Item;

@connect(({ trainGroupManager, loading }) => ({
  trainGroupMembers: trainGroupManager.trainGroupMembers, // 编辑培训群组（获取现有群组成员的Table表格数据）
  groupsLoading: loading.effects['trainGroupManager/GetTrainGroupMembers'],
  EditAddMemberTableData: trainGroupManager.EditAddMemberTableData, // 编辑培训群组（增加群组成员的Table表格数据）
  usersLoading: loading.effects['trainGroupManager/GetEditTGAddData'],
}))
@Form.create()
class EditTrainGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxNameLength: 25, // 群组名称最多25字
      nameLengthLeft: 25, // 群组名称剩余字数
      isChangeTrainGroupName: false, // 是否修改群组名称
      delVisible: false, // 批量删除的模态框————>显示隐藏
      selectedAllKeys: [], // 选中的数据组成的数组（只包含key值）
      addVisible: false, // 增加群组成员的模态框————>显示隐藏
    };
  }

  // 页面加载完成后
  componentDidMount() {
    // 默认是获取第一页数据

    this.setGroupNameValue();
  }

  // 批量删除,如果选择了数据，则显示删除模态框
  batchDelete = () => {
    const { selectedAllKeys } = this.state;
    if (selectedAllKeys.length < 1) {
      message.info('请选择您需要删除的数据！');
      return;
    }
    this.setState({
      delVisible: true,
    });
  };

  // 单个删除
  deleteConfirm = ID => {
    const IDArr = [];
    IDArr.push(ID);
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    const { selectedAllKeys } = this.state;
    const flag = selectedAllKeys.indexOf(ID); // 用于判断该数据是否已经选中存放到selectedAllKeys数组中
    dispatch({
      type: 'trainGroupManager/DelEditTGManager',
      payload: {
        id,
        data: {
          trainers: IDArr, // 字符串转换成数组
        },
      },
      callback: res => {
        if (res.status === 'ok') {
          message.success('删除成功');
          console.log(selectedAllKeys);
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

  // 修改群组名称————>点击“修改群组名称”按钮
  changeTGName = () => {
    this.setGroupNameValue();
    this.setState({
      isChangeTrainGroupName: true,
    });
  };

  // 修改群组名称————>确定按钮
  handleSubmit = () => {
    const {
      form: { validateFieldsAndScroll },
      dispatch,
      match: {
        url,
        params: { id },
      },
    } = this.props;

    const {
      location: {
        query: { num },
      },
    } = this.props;
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('表单值', values);
        dispatch({
          type: 'trainGroupManager/ChangeEditTGName',
          payload: {
            id, // 培训群组ID
            data: {
              name: values.group_name,
            },
          },
          callback: res => {
            if (res.status === 'ok') {
              message.success('修改成功');
              router.replace({
                pathname: url,
                query: {
                  name: values.group_name,
                  num,
                },
              });
              this.setState({
                isChangeTrainGroupName: false,
              });
            } else {
              message.warning('修改失败');
            }
          },
        });
      }
    });
  };

  // 修改群组名称————>取消按钮
  cancelChangeTGName = () => {
    this.setState({
      isChangeTrainGroupName: false,
    });
  };

  // 为群组名称的input框赋值,并修改剩余多少字
  setGroupNameValue = () => {
    const {
      form: { setFieldsValue },
      location: {
        query: { name },
      },
    } = this.props;
    const { maxNameLength } = this.state; // 最多多少字
    const nameLengthLeft = maxNameLength - name.length; // 剩余多少字
    setFieldsValue({
      group_name: name,
    });
    this.setState({
      nameLengthLeft: nameLengthLeft <= 0 ? 0 : nameLengthLeft,
    });
  };

  // 判断剩余多少字
  inputLengthFun = (e, params, total) => {
    const len = total - e.target.value.length;
    this.setState({
      [params]: len <= 0 ? 0 : len,
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedAllKeys: rows,
    });
  };

  // 点击“增加培训管理员”，显示模态框
  addMember = () => {
    // 默认是获取第一页数据
    this.setState({
      addVisible: true, // 增加培训管理员的模态框————>显示隐藏
    });
  };

  // ---------------增加培训管理员模态框---------------
  modaladdcallback = (visible, refresh = false) => {
    console.log('visiblecallback', refresh);
    if (refresh) {
      this.setState({
        delVisible: visible,
        selectedAllKeys: [],
      });
    } else {
      this.setState({
        delVisible: visible,
      });
    }
  };

  modaldelcallback = (visible, refresh = false) => {
    console.log('modaldelcallback', refresh);
    if (refresh) {
      this.setState({
        delVisible: visible,
        selectedAllKeys: [],
      });
    } else {
      this.setState({
        delVisible: visible,
      });
    }
  };

  render() {
    const {
      location: {
        query: { num, name },
      },
    } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { trainGroupMembers, groupsLoading, EditAddMemberTableData, usersLoading } = this.props;
    const { selectedAllKeys } = this.state;
    const { delVisible, addVisible } = this.state;
    const { maxNameLength, nameLengthLeft, isChangeTrainGroupName } = this.state;

    const commonColumns = [
      {
        title: '员工编号',
        dataIndex: 'user_number',
        key: 'user_number',
        render: (text, record) => <span>{record.user_no}</span>,
      },
      {
        title: '姓名',
        dataIndex: 'user_name',
        key: 'user_name',
        render: (text, record) => <span>{record.name}</span>,
      },
      {
        title: '归属部门',
        dataIndex: 'user_department',
        key: 'user_department',
        render: (text, record) => <span>{record.department_name}</span>,
      },
    ];
    const columns = [
      ...commonColumns,
      {
        title: '操作',
        dataIndex: 'train_group_opt',
        key: 'train_group_opt',
        render: (text, record) => (
          <span>
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
      <PageHeaderWrapper title="编辑培训群组">
        <Card className={styles.trainGroupCommonContent}>
          <Form hideRequiredMark layout="inline" className={styles.formContent}>
            <FormItem label="群组编号">
              <span>{num}</span>
            </FormItem>
            <FormItem
              label="群组名称"
              style={{ display: isChangeTrainGroupName ? 'inline-block' : 'none' }}
            >
              {getFieldDecorator('group_name', {
                rules: [
                  {
                    required: true,
                    message: '群组名称必填',
                  },
                ],
                // initialValue:name // 有问题
              })(
                <Input
                  style={{ width: 300 }}
                  placeholder="群组名称"
                  maxLength={maxNameLength}
                  onChange={e => {
                    this.inputLengthFun(e, 'nameLengthLeft', maxNameLength);
                  }}
                />
              )}
              <span className={styles.spanTips}>
                剩余
                <span>{nameLengthLeft}</span>
                个字
              </span>
            </FormItem>
            <FormItem style={{ display: isChangeTrainGroupName ? 'inline-block' : 'none' }}>
              <Button type="primary" onClick={this.handleSubmit}>
                确定
              </Button>
              <Button style={{ marginLeft: 10 }} onClick={this.cancelChangeTGName}>
                取消
              </Button>
            </FormItem>
            <FormItem
              label="群组名称"
              style={{ display: isChangeTrainGroupName ? 'none' : 'inline-block' }}
            >
              <span>{name}</span>
            </FormItem>
            <FormItem style={{ display: isChangeTrainGroupName ? 'none' : 'inline-block' }}>
              <Button type="primary" onClick={this.changeTGName}>
                修改群组名称
              </Button>
            </FormItem>
          </Form>
          <div className={styles.tableContent}>
            <div className={styles.searchContent}>
              <div>
                <span>选择群组成员：</span>
              </div>
              <div>
                <Button type="primary" onClick={this.addMember}>
                  增加群组成员
                </Button>
                <Button className="ant-btn-del" onClick={this.batchDelete}>
                  批量删除
                </Button>
              </div>
            </div>

            <PageTable
              {...this.props}
              data={trainGroupMembers}
              columns={columns}
              loading={groupsLoading}
              onSelectRow={this.handleSelectRows}
              action="trainGroupManager/GetTrainGroupMembers"
              selectedRows={selectedAllKeys}
            />
          </div>
          <div className={styles.foonter_btns}>
            <Button onClick={() => router.push('/trainGroupManager/index')}>取消</Button>
          </div>
        </Card>
        <ModalAdd
          {...this.props}
          addDataSource={EditAddMemberTableData}
          addDataSourceLoading={usersLoading}
          visible={addVisible}
          visiblecallback={this.modaladdcallback}
          listActiontype="trainGroupManager/GetEditTGAddData"
          addActiontype="trainGroupManager/SubmitEditTGAddMember"
        />

        <ModalDel
          {...this.props}
          selectedAllKeys={selectedAllKeys}
          visible={delVisible}
          visiblecallback={this.modaldelcallback}
          delAtiontype="trainGroupManager/BatchDelEditTGManager"
        />
      </PageHeaderWrapper>
    );
  }
}

export default EditTrainGroup;
