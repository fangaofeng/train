import React, { Component } from 'react'
import { Card , Badge , Table , Form } from 'antd';
// import router from 'umi/router';
// import Link from 'umi/link';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import CourseTeacherDetail from '@/components/CustomComponent/CourseTeacherDetail/CourseTeacherDetail';
import ModalTable from '@/components/CustomComponent/ModalTable/ModalTable';
import styles from './Common.less';

const FormItem = Form.Item;

@connect(({ StudyPlanManager }) => ({
  viewSPData:StudyPlanManager.viewSPData,// 学习计划管理——>查看学习计划（获取table表格数据）
  viewSPDataDetails:StudyPlanManager.viewSPDataDetails,// 学习计划管理——>查看学习计划——>查看培训群组学习详情（获取table表格数据）
}))
@Form.create()
class ViewSP extends Component {
    constructor(props) {
        super(props);
        this.state = {
          courserTeacherInfo:{},// 课程信息、讲师信息
          studyPlanName:'',// 学习计划名称
          studyPlanStartTime:'',// 学习计划开始时间
          studyPlanEndTime:'',// 学习计划结束时间

          pagination: {// 表格分页信息
            // total:20,// 数据总数
            current:1,// 当前页数
            pageSize:10,// 每页条数
            pageSizeOptions:['10','20','30','40'],// 指定每页可以显示多少条数据
            showQuickJumper:true,// 是否可以快速跳转至某页
            showSizeChanger:true,// 是否可以改变 pageSize
          },

          showModalTable:false,// 是否显示查看群组成员模态框
          modalTableTGID:null,// 要显示群组成员的培训群组的ID
          modalTableTGNumber:'',// 要显示群组成员的模态框的群组编号
          modalTableTGName:'',// 要显示群组成员的模态框的群组名称
          modalTablePagination: {// 模态框表格分页信息
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
      this.getInfo();
      // 默认是获取第一页数据
      const { pagination:{current , pageSize}} = this.state;
      this.getTableData(current,pageSize);
    }

    // 根据学习计划id获取课程信息、讲师信息、学习计划名称、学习计划开始时间、学习计划结束时间
    getInfo = () => {
      const { dispatch , match:{params:{studyPlanID}}} = this.props;
      dispatch({
        type: 'StudyPlanManager/ViewGetCourseAndPlanInfo',
        payload: {
          id:studyPlanID,// id
        },
        callback: (res)=>{
          if (res.status === 'ok') {
            console.log('请求成功',res);
            this.setState({
              courserTeacherInfo:res.data.course,// 课件名称
              studyPlanName:res.data.name,// 学习计划名称
              studyPlanStartTime:res.data.start_time,// 学习计划开始时间
              studyPlanEndTime:res.data.end_time,// 学习计划结束时间
            });
          }else{
            console.log('请求失败');
          }
        }
      });
    }

    // 获取table表格数据(指定页码，指定每页条数)
    getTableData = (page,size) => {
      const { dispatch , match:{params:{studyPlanID}}} = this.props;
      dispatch({
        type: 'StudyPlanManager/GetViewSPData',
        payload: {
          studyPlanID,// 学习计划id
          page,// 页码
          size,// 每页条数
        },
      });
    }

    // 分页、排序、筛选变化时触发。这边只有分页功能，没有排序和筛选
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

    // ------------查看群组成员弹框------------
    // 点击“查看”按钮
    viewModalTable = (record) =>{
      const { modalTablePagination:{current , pageSize}} = this.state;
      this.setState({
        showModalTable:true,
        modalTableTGID:record.id,
        modalTableTGNumber:record.group_no,// 要显示群组成员的模态框的群组编号
        modalTableTGName:record.name,// 要显示群组成员的模态框的群组名称
      })
      this.getModalTableTGMembers(current,pageSize,record.id)
    }

    // 查看培训群组成员。获取table表格数据(指定页码，指定每页条数)
    getModalTableTGMembers = ( page , size , id) => {
      const { dispatch , match:{params:{studyPlanID}}} = this.props;
      const { modalTableTGID } = this.state;
      const ID = id || modalTableTGID;
      dispatch({
        type: 'StudyPlanManager/GetViewSPDataDetails',
        payload: {
          studyPlanID,// 学习计划id
          trainGroupID:ID,// 培训群组id
          page,// 页码
          size,// 每页条数
        },
      });
    }

    // 查看培训群组成员。分页、排序、筛选变化时触发。这边只有分页功能，没有排序和筛选
    modalTablePageChange= (_pagination_) => {
      const {modalTablePagination} = this.state;
      const {current,pageSize} = _pagination_;
      this.setState({
        modalTablePagination: {
          ...modalTablePagination,
          current,
          pageSize
        },
      });
      this.getModalTableTGMembers(current,pageSize);
    }

    // 点击“返回”按钮
    cancelViewModalTable = () =>{
      this.setState({
        showModalTable:false,
        modalTableTGID:null,
        modalTableTGNumber:'',// 要显示群组成员的模态框的群组编号
        modalTableTGName:'',// 要显示群组成员的模态框的群组名称
        modalTablePagination: {
          current:1,
          pageSize:10
        },
      })
    }

    // 表格行的类名
    modalTableRowClassName = (record,index)=>{
      let str ;
      if(record.status === '超期未完成' || record.status === '超期已完成'){
        str = 'tableRowClassNameErr'
      }else{
        str = ''
      }
      return str
    }
    // ------------查看群组成员弹框------------

    render() {
        const { 
          courserTeacherInfo , 
          studyPlanName , 
          studyPlanStartTime , 
          studyPlanEndTime ,
          pagination ,
        } = this.state;
        const {viewSPData} = this.props;
        const pageConifg = {
          ...pagination,
          total:viewSPData.count,
          showTotal:total => `共 ${total} 条记录`
        }

        // 循环Table数据，添加key
        const dataSource = viewSPData.results.map((value)=>{
          return Object.assign({},value,{key:value.id});
        });

        const columns = [
          {
            title: '培训群组编号',
            dataIndex: 'train_group_number',
            key: 'train_group_number',
            render: (text, record) => (
              <span>
                {record.group_no}
              </span>
            ),
          }, 
          {
            title: '培训群组名称',
            dataIndex: 'train_group_name',
            key: 'train_group_name',
            render: (text, record) => (
              <span>
                {record.name}
              </span>
            ),
          }, 
          {
            title: '群组成员',
            dataIndex: 'train_group_member',
            key: 'train_group_member',
            render: (text, record) => (
              <span>
                {record.trainers.length}
              </span>
            ),
          },
          {
            title:<div><span>完成比</span><br /><span>（完成人数/参加人数）</span></div>,
            align:'center',
            dataIndex: 'studyPlanManager_finishedNum',
            key: 'studyPlanManager_finishedNum',
            render: (text, record) => (
              <span>
                {record.ratio}
              </span>
            ),
          },
          {
            title:<div><span>课堂提问</span><br /><span>（答复/提问）</span></div>,
            align:'center',
            dataIndex: 'studyPlanManager_question',
            key: 'studyPlanManager_question',
            render: (text, record) => (
              <span>
                {record.questionanswer}
              </span>
            ),
          },
          {
            title: '操作',
            dataIndex: 'train_group_opt',
            key: 'train_group_opt',
            render: (text, record) => (
              <span>
                <a onClick={() => this.viewModalTable(record)}>查看详情</a>
              </span>
            ),
          },
        ];

        // ------------查看群组成员弹框------------
        const { viewSPDataDetails } = this.props;
        const { showModalTable , modalTablePagination , modalTableTGNumber , modalTableTGName} = this.state;
        const modalTablePageConifg = {
          ...modalTablePagination,
          total:viewSPDataDetails.count,
          showTotal:total => `共 ${total} 条记录`
        }
        // 循环Table数据，添加key
        const modalTableDataSource = viewSPDataDetails.results.map((value)=>{
          return Object.assign({},value,{key:value.id});
        });
        const modalTableColumns = [
          {
            title: '员工编号',
            align:'center',
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
            align:'center',
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
            align:'center',
            dataIndex: 'user_department',
            key: 'user_department',
            render: (text, record) => (
              <span>
                {record.department_name}
              </span>
            ),
          },
          {
            title: '学习状态',
            align:'center',
            dataIndex: 'user_status',
            key: 'user_status',
            render: (text, record) => {
              let dom ;
              if(record.status === '超期未完成' || record.status === '超期已完成'){
                dom = <Badge status="error" text={record.status} />
              }else{
                dom = <span>{record.status}</span>
              }
              return dom
            }
          },
          {
            title:<div><span>课堂提问</span><br /><span>（答复/提问）</span></div>,
            align:'center',
            dataIndex: 'user_question',
            key: 'user_question',
            render: (text, record) => (
              <span>
                {record.questionanswer}
              </span>
            ),
          },
        ];
        // ------------查看群组成员弹框------------
        return (
          <PageHeaderWrapper title='查看学习计划'>
            <CourseTeacherDetail
              isShow={false}
              detailConfig={{
                ...courserTeacherInfo,
                class_hour:`${Number(courserTeacherInfo.class_hour)}小时`
              }}
            />
            <Card 
              className={styles.detailSP}
            >
              <Form
                hideRequiredMark
                layout="inline"
                className={styles.formContent}
              >
                <FormItem label="计划名称"><span>{studyPlanName}</span></FormItem> 
                <FormItem label="学习开放时间"><span>{studyPlanStartTime} 至 {studyPlanEndTime}</span></FormItem>
              </Form>
              <div className={styles.tableContent} style={{border:'none'}}>
                <div className={styles.searchContent}>
                  <div><span>参加学习群组：</span></div>
                </div>
                <Table 
                  bordered
                  dataSource={dataSource} 
                  columns={columns}
                  pagination={pageConifg}
                  onChange={this.handleTableChange}
                />
              </div>
            </Card>
            <ModalTable 
              modalTableVisible={showModalTable}
              modalTitle='查看培训群组学习详情'
              trainGroupNumber={modalTableTGNumber}
              trainGroupName={modalTableTGName}
              dataSource={modalTableDataSource} 
              columns={modalTableColumns}
              pagination={modalTablePageConifg}
              onChange={this.modalTablePageChange}
              handleTableCancel={this.cancelViewModalTable}
              rowClassName={this.modalTableRowClassName}
            />
          </PageHeaderWrapper>
        );
    }
}

export default ViewSP;