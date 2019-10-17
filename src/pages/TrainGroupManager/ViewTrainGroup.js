import React, { PureComponent } from 'react';
import { Card, Button, Form } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Common.less';
import PageTable from '@/components/PageTable';

const FormItem = Form.Item;

@connect(({ trainGroupManager, loading }) => ({
  trainGroupMembers: trainGroupManager.trainGroupMembers, // 查看培训群组（获取table表格数据）
  loading: loading.effects['trainGroupManager/GetTrainGroupMembers'],
}))
// @Form.create()
class ViewTrainGroup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 页面加载完成后
  componentDidMount() {}

  // 查看培训群组。获取table表格数据(指定页码，指定每页条数)
  render() {
    const {
      trainGroupMembers,
      loading,
      match: { query: ID },
    } = this.props;

    // 查看培训群组，Table分页。

    const {
      location: {
        query: { num, name },
      },
    } = this.props;
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
      <PageHeaderWrapper title="查看培训群组">
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
              {...this.props}
              id={ID}
              data={trainGroupMembers}
              columns={columns}
              loading={loading}
              action="trainGroupManager/GetTrainGroupMembers"
            />
          </div>
          <div className={styles.foonter_btns}>
            <Button type="primary" onClick={() => router.push('/trainGroupManager/index')}>
              返回
            </Button>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ViewTrainGroup;
