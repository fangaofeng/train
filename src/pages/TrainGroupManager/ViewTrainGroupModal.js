import React, { PureComponent } from 'react';
import { Card, Button, Modal, Form } from 'antd';
// import { history } from 'umi'
import { connect } from 'dva';
import styles from './Common.less';
import PageTable from '@/components/PageTable';

const FormItem = Form.Item;

@connect(({ trainGroupManager, loading }) => ({
  trainGroupMembers: trainGroupManager.trainGroupMembers, // 查看培训群组（获取table表格数据）
  loading: loading.effects['trainGroupManager/GetTrainGroupMembers'],
}))
class ViewTrainGroupModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 页面加载完成后
  componentDidMount() {}

  handleTableCancel = () => {
    const { visiblecallback } = this.props;
    visiblecallback(false);
  };

  // 查看培训群组。获取table表格数据(指定页码，指定每页条数)
  render() {
    const { trainGroupMembers, loading, id, visible, dispatch } = this.props;

    // 查看培训群组，Table分页。

    const { num, name } = this.props;
    // 循环Table数据，添加key

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
      <Modal
        visible={visible}
        title="查看培训群组"
        style={{ top: 150, minWidth: 800 }}
        bodyStyle={{ padding: 0 }}
        onCancel={this.handleTableCancel}
        footer={
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" onClick={this.handleTableCancel}>
              返回
            </Button>
          </div>
        }
      >
        <Card className={styles.trainGroupCommonContent}>
          <Form hideRequiredMark layout="inline" className={styles.formContent}>
            <FormItem label="群组编号">
              <span style={{ paddingRight: 100 }}>{num}</span>
            </FormItem>
            <FormItem label="群组名称">
              <span>{name}</span>
            </FormItem>
          </Form>
          <div className={styles.tableContent}>
            <div className={styles.searchContent}>
              <div>
                <span>群组成员：</span>
              </div>
            </div>
            <PageTable
              dispatch={dispatch}
              params={{ id }}
              data={trainGroupMembers}
              columns={columns}
              loading={loading}
              action="trainGroupManager/GetTrainGroupMembers"
            />
          </div>
        </Card>
      </Modal>
    );
  }
}

export default ViewTrainGroupModal;
