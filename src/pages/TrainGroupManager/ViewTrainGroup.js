import React, { Component } from 'react';
import { Card , Button , Table , Form } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Common.less';

const FormItem = Form.Item;

@connect(({ trainGroupManager }) => ({
    viewTrainGroupTableData:trainGroupManager.viewTrainGroupTableData// 查看培训群组（获取table表格数据）
}))
// @Form.create()
class ViewTrainGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {// 表格分页信息
        // total:20,// 数据总数
        current:1,// 当前页数
        pageSize:10,// 每页条数
        pageSizeOptions:['10','20','30','40'],// 指定每页可以显示多少条数据
        showQuickJumper:true,// 是否可以快速跳转至某页
        showSizeChanger:true,// 是否可以改变 pageSize
      },
    };
  }
  
  // 页面加载完成后
  componentDidMount(){
    const { pagination:{current , pageSize}} = this.state;
    this.getTableData(current,pageSize);
  }

  // 查看培训群组。获取table表格数据(指定页码，指定每页条数)
  getTableData = (page,size) => {
    const { dispatch } = this.props;
    const { query:{id} } = this.props.location;
    dispatch({
      type: 'trainGroupManager/GetViewTrainGroupData',
      payload: {
        page,// 页码
        size,// 每页条数
        id,// 培训群组id
      },
    });
  }

  // 查看培训群组。分页、排序、筛选变化时触发。这边只有分页功能，没有排序和筛选
  handleTableChange= (_pagination_) => {
    // console.log('-------------------');
    // console.log(_pagination_);
    // console.log('-------------------');
    const {pagination} = this.state;
    const {current,pageSize} = _pagination_;
    this.setState({
      pagination: {
        ...pagination,
        current,
        pageSize
      },
    });
    this.getTableData(current,pageSize);
  }

  render() {
    const { query:{num,name} } = this.props.location;
    const {viewTrainGroupTableData} = this.props;
    const { pagination } = this.state;
    // 查看培训群组，Table分页。
    const pageConifg = {
      ...pagination,
      total:viewTrainGroupTableData.count,
      showTotal:total => `共 ${total} 条记录`
    }

    // 循环Table数据，添加key
    const dataSource = viewTrainGroupTableData.results.map((value)=>{
      return Object.assign({},value,{key:value.id});
    });

    const columns = [
      {
        title: '员工编号',
        dataIndex: 'user_number',
        key: 'user_number',
        render: (text, record) => (
          <span>
            {record.user_no}
          </span>
        ),
      }, 
      {
        title: '姓名',
        dataIndex: 'user_name',
        key: 'user_name',
        render: (text, record) => (
          <span>
            {record.name}
          </span>
        ),
      }, 
      {
        title: '归属部门',
        dataIndex: 'user_department',
        key: 'user_department',
        render: (text, record) => (
          <span>
            {record.department_name}
          </span>
        ),
      },
    ];

    return (
      <PageHeaderWrapper title='查看培训群组'>
        <Card 
          className={styles.trainGroupCommonContent}
        >
          <Form
            hideRequiredMark
            layout="inline"
            className={styles.formContent}
          >
            <FormItem
              label="群组编号"
            >
              <span style={{paddingRight:100}}>{num}</span>
            </FormItem> 
            <FormItem
              label="群组名称"
            >
              <span>{name}</span>
            </FormItem> 
          </Form>
          <div className={styles.tableContent}>
            <div className={styles.searchContent}>
              <div><span>群组成员：</span></div>
            </div>
            <Table 
              bordered
              dataSource={dataSource} 
              columns={columns}
              pagination={pageConifg}
              onChange={this.handleTableChange}
            />
          </div>
          <div className={styles.foonter_btns}>
            <Button type="primary" onClick={() => router.push('/trainGroupManager/index')}>返回</Button>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ViewTrainGroup;