import React, { Component } from 'react'
import { connect } from 'dva';
import router from 'umi/router';
import { Card , Table , Row , Col   , Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import uploadSuccess from '@/assets/images/upload_success.png'
import styles from './UploadZip3.less';


@connect(({ uploadExam }) => ({
  testInfo:uploadExam.testInfo, // 试卷信息
  selectedTableData:uploadExam.selectedTableData// 已经选择的表格数据
}))
class UploadZip3 extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      current:1,// 当前页码
      pageSize:10,// 每页条数
    };
  }

  componentDidMount(){
    const {testInfo} = this.props;
    if(Object.keys(testInfo).length===0){
      router.push('/exam/uploadZip/uploadZip1')
    }
  }

  // 分页、排序、筛选变化时触发。这边只有分页功能，没有排序和筛选
  handleTableChange= (_pagination_) => {
    const {current,pageSize} = _pagination_;
    this.setState({
      current,
      pageSize
    });
  }

  render() {
    const { testInfo , selectedTableData} = this.props;
    const {current ,pageSize} = this.state;

    // 选中的数据
    const filterData = (value)=>{
      let arr = [];
      for(let i in value){
        arr.push(value[i]);
      }
      return arr
    };

    const pageConifg = {
      current,// 当前页数
      pageSize,// 每页条数
      pageSizeOptions:['10','20','30','40'],// 指定每页可以显示多少条数据
      showQuickJumper:true,// 是否可以快速跳转至某页
      showSizeChanger:true,// 是否可以改变 pageSize
      // total:tableData.count,
      showTotal:total => `共 ${total} 条记录`
    }

    const columns = [{
      title: '员工编号',
      dataIndex: 'train_admin_num',
      key: 'train_admin_num',
      render: (text, record) => (
        <span>
          {record.user_no}
        </span>
      ),
    }, {
      title: '员工姓名',
      dataIndex: 'train_admin_name',
      key: 'train_admin_name',
      render: (text, record) => (
        <span>
          {record.name}
        </span>
      ),
    }, {
      title: '所属部门',
      dataIndex: 'train_admin_department_name',
      key: 'train_admin_department_name',
      render: (text, record) => (
        <span>
          {record.department_name}
        </span>
      ),
    }];

    return (
      <PageHeaderWrapper title='试卷上架成功'>
        <Card className={styles.uploadSuccessCard}>
          <div className={styles.uploadSuccessContent}>
            <div className={styles.uploadSuccessTitle}>
              <img src={uploadSuccess} alt="试卷上架成功" />
              <span>试卷上架成功</span>
            </div>
            <div className={styles.uploadSuccessMsg}>
              <div>
                <span>试卷名称：</span>
                <span>{testInfo.name}</span>
              </div>
              <div>
                <span>试卷编号：</span>
                <span>{testInfo.number}</span>
              </div>
            </div>
          </div>
        </Card>
        <Card className={styles.uploadSuccessCardTable}>
          <div className={styles.uploadSuccessCardTableMsg}>可以使用本试卷的培训管理员：</div>
          <Table 
            bordered 
            dataSource={filterData(selectedTableData)}
            columns={columns}
            pagination={{
              ...pageConifg,
              total:filterData(selectedTableData).length
            }}
            onChange={this.handleTableChange}
          />
          <div className={styles.footerBtns}>
            <Button type="primary" onClick={()=>router.push('/exam/examManager/index')}>完成</Button>
          </div>
        </Card>
      </PageHeaderWrapper>

    );
  }
}

export default UploadZip3;
