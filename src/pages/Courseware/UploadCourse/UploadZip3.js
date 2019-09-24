import React, { Component } from 'react'
import { connect } from 'dva';
import router from 'umi/router';
import { Card , Table , Row , Col   , Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import uploadSuccess from '@/assets/images/upload_success.png'
import styles from './UploadZip3.less';


@connect(({ uploadCourse }) => ({
  zipInfo: uploadCourse.zipInfo,
  selectedTableData:uploadCourse.selectedTableData// 已经选择的表格数据
}))
class UploadZip3 extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      current:1,// 当前页码
      pageSize:10,// 每页条数
      // zipInfo:{
      //   JSJS: "多年从事互联网金融、大数据、区块链法律风险防控研究",
      //   JSXM: "付博",
      //   JSZP: "http://localhost/001.jpg",
      //   KJBH: "20181031000001",
      //   KJFL: "0",
      //   KJFM: "http://localhost/001.jpg",
      //   KJJS: "介绍反贿赂合规体系涵盖的业务范围和工作要点",
      //   KJLX: "0",
      //   KJMC: "反贿赂合规体系的建立与实践",
      //   KJWJ: "fhlhg.mp4",
      //   KJWJLX: "1",
      //   KS: "1.5",
      //   SYDX: "财务管理人员",
      //   YXSPTF: "0"
      // },
    };
  }


  componentDidMount(){
    const {zipInfo} = this.props;
    if(Object.keys(zipInfo).length===0){
      router.push('/courseware/uploadZip/uploadZip1')
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
    const { zipInfo , selectedTableData} = this.props;
    const {current ,pageSize} = this.state;
    // const { zipInfo } = this.state;

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
      <PageHeaderWrapper title='课件上架成功'>
        <Card className={styles.uploadSuccessCard}>
          <div className={styles.uploadSuccessTitle}>
            <img src={uploadSuccess} alt="课件上架成功" />
            <span>课件上架成功</span>
          </div>
          <Row gutter={12}>
            <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>课件编号：{zipInfo.KJBH}</Col>
            <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>课件名称：{zipInfo.KJMC}</Col>
            <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>课&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时：{zipInfo.KS}小时</Col>
          </Row>
          <Row gutter={12}>
            <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>讲师姓名：{zipInfo.JSXM}</Col>
            <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>讲师介绍：{zipInfo.JSJS}</Col>
          </Row>

        </Card>
        <Card className={styles.uploadSuccessCardTable}>
          <div className={styles.uploadSuccessCardTableMsg}>可以使用本课件的培训管理员：</div>
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
            <Button type="primary" onClick={()=>router.push('/courseware/coursewareManager/index')}>完成</Button>
          </div>
        </Card>
      </PageHeaderWrapper>

    );
  }
}

export default UploadZip3;
