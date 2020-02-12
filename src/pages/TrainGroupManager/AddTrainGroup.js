import React, { Component } from 'react';
import { Card, Button, message, Input, Form } from 'antd';
import router from 'umi/router';

import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import PageTable from '@/components/PageTable';
import styles from './Common.less';
import uploadSuccess from '@/assets/images/upload_success.png';

const { Search } = Input;
const FormItem = Form.Item;

@connect(({ trainGroupManager, loading }) => ({
  addUsers: trainGroupManager.addUsers, // 培训管理员 ————> 培训群组管理 ————> 增加培训群组（获取table表格数据）
  employeeLoading: loading.effects['trainGroupManager/GetUsers'],
}))
@Form.create()
class AddTrainGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxNameLength: 25, // 群组名称最多25字
      nameLengthLeft: 25, // 群组名称剩余字数
      addTrainGroupFlag: 'fail', // 增加群组是否成功的标志,fail为失败，success为成功
      selectedAllKeys: [], // 选中的数据组成的数组（只包含key值）
      // 提交成功后
      responseGroupId: '',
      responseGroupNumber: '', // 提交成功后，返回的群组编号
      responseGroupName: '', // 提交成功后，返回的群组名称
    };
  }

  // 页面加载完成后
  componentDidMount() {}

  // 提交按钮
  handleSubmit = () => {
    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    const { selectedAllKeys } = this.state;
    const len = selectedAllKeys.length;
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (len < 1) {
          message.info('请选择您需要添加的数据');
          return;
        }
        dispatch({
          type: 'trainGroupManager/addTrainGroup',
          payload: {
            name: values.group_name,
            trainers: selectedAllKeys,
          },
          callback: res => {
            if (res && res.status === 'ok') {
              // message.success('提交成功')
              this.setState({
                responseGroupId: res.data.id,
                responseGroupNumber: res.data.group_no,
                responseGroupName: res.data.name,
                addTrainGroupFlag: 'success',
              });
            } else {
              message.warning('提交失败');
            }
          },
        });
      }
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedAllKeys: rows,
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
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { addUsers, employeeLoading } = this.props;
    const {
      selectedAllKeys,
      addTrainGroupFlag,
      responseGroupId,
      responseGroupName,
      responseGroupNumber,
      maxNameLength,
      nameLengthLeft,
    } = this.state;

    const columns = [
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

    return (
      <PageHeaderWrapper
        title={addTrainGroupFlag === 'success' ? '增加培训群组成功' : '增加培训群组'}
      >
        <Card
          className={styles.trainGroupCommonContent}
          style={{ display: addTrainGroupFlag === 'success' ? 'none' : 'block' }}
        >
          <Form hideRequiredMark layout="inline" className={styles.formContent}>
            {/* <FormItem
              label="群组编号"
            >
              {
                getFieldDecorator('group_num', {
                  rules: [
                    {
                        required: true, message: '群组编号必填',
                    }
                  ],
                })(
                  <Input style={{width:200}} placeholder='群组编号' maxLength={maxNumberLength} onChange={(e)=>{this.inputLengthFun(e,'numberLengthLeft',maxNumberLength)}} />
                )
              }
              <span className={styles.spanTips}>剩余<span>{numberLengthLeft}</span>个字</span>
            </FormItem>  */}{' '}
            <FormItem label="群组名称">
              {getFieldDecorator('group_name', {
                rules: [
                  {
                    required: true,
                    message: '群组名称必填',
                  },
                ],
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
          </Form>
          <div className={styles.tableContent}>
            <div className={styles.searchContent}>
              <div>
                <span>选择群组成员：</span>
                <Search placeholder="输入员工编号或名称过滤" style={{ width: 300 }} />
              </div>
            </div>

            <PageTable
              // dataSource={dataSource}
              {...this.props}
              data={addUsers}
              columns={columns}
              loading={employeeLoading}
              onSelectRow={this.handleSelectRows}
              action="trainGroupManager/GetUsers"
              selectedRows={selectedAllKeys}
            />
          </div>
          <div className={styles.foonter_btns}>
            <Button type="primary" onClick={this.handleSubmit}>
              提交
            </Button>
            <Button onClick={() => router.push('/trainGroupManager/index')}>取消</Button>
          </div>
        </Card>
        <Card
          className={styles.trainGroupCommonContent}
          style={{ display: addTrainGroupFlag === 'success' ? 'block' : 'none' }}
        >
          <div className={styles.addTrainGroupSuccessContent}>
            <div>
              <img src={uploadSuccess} alt="增加培训群组成功" />
              <span>增加培训群组成功</span>
            </div>
            <div>
              <div>
                群组编号：
                <span>{responseGroupNumber}</span>
              </div>
              <div>
                群组名称：
                <span>{responseGroupName}</span>
              </div>
            </div>
          </div>

          <div className={styles.foonter_btns}>
            <Button type="primary" onClick={() => router.push('/trainGroupManager/index')}>
              返回
            </Button>
            <Button
              // type="primary"
              onClick={() =>
                router.push({
                  pathname: `/trainGroupManager/viewTrainGroup/${responseGroupId}`,
                  query: {
                    num: responseGroupNumber,
                    name: responseGroupName,
                  },
                })
              }
            >
              查看当前群组
            </Button>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default AddTrainGroup;
