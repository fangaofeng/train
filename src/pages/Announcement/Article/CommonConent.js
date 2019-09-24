import React, { Component } from 'react'
import { DatePicker , Card , Button , Table , Divider , Icon , Upload , Row , Col , message , Input , Modal , Form , Popconfirm } from 'antd';
import router from 'umi/router';
// import Link from 'umi/link';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import CourseManagerBasicInfo from '@/components/CustomComponent/CourseManagerBasicInfo/CourseManagerBasicInfo';
import styles from './Common.less';

const { Search } = Input;

@connect(({ CourseManager }) => ({
  currentTrainers:CourseManager.currentTrainers,// 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 所有可使用本课件的培训管理员
  addTrainers:CourseManager.addTrainers,// 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 新增可使用本课件的培训管理员
}))
class CommonConent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          courserTeacherInfo:{},

          selectedAllKeys:[],// 选中的数据组成的数组（只包含key值）
          pagination: {// 表格分页信息
            // total:20,// 数据总数
            current:1,// 当前页数
            pageSize:10,// 每页条数
            pageSizeOptions:['10','20','30','40'],// 指定每页可以显示多少条数据
            showQuickJumper:true,// 是否可以快速跳转至某页
            showSizeChanger:true,// 是否可以改变 pageSize
          },

          delVisible:false,// 批量删除的模态框————>显示隐藏
          delConfirmLoading: false,// 批量删除的模态框————>确定按钮 loading

          addVisible:false,// 增加培训管理员的模态框————>显示隐藏
          addConfirmLoading: false,// 增加培训管理员的模态框————>确定按钮 loading
          addSelectedAllKeys:[],// 增加培训管理员的模态框————>选中的数据组成的数组（只包含key值）
          addPagination: {// 增加培训管理员的模态框————>表格分页
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
      this.getCourseTeacherInfo();
      // 默认是获取第一页数据
      const { pagination:{current , pageSize}} = this.state;
      //this.getTableData(current,pageSize);
    }

    // 获取课程信息、讲师信息
    getCourseTeacherInfo=()=>{
      console.log(this.props)
      const { dispatch , ID } = this.props;
      dispatch({
        type: 'CourseManager/GetCourseTeacherInfo',
        payload: {
          id:ID,// id
        },
        callback: (res)=>{
          if (res.status === 'ok') {
            console.log('请求成功');
            this.setState({
              courserTeacherInfo:res.data
            })
          }else{
            console.log('请求失败');
          }
        }
      });
    }

    // 获取table表格数据(指定页码，指定每页条数)
    getTableData = (page,size) => {
      const { dispatch , ID } = this.props;
      dispatch({
        type: 'CourseManager/GetTrainersData',
        payload: {
          id:ID,// 课件id
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

    // 点击“上架”按钮或者点击“重新上架”按钮
    changeCourseStatus = (msg) => {
      const { dispatch , ID } = this.props;
      dispatch({
        type: 'CourseManager/ChangeCourseStatus',
        payload: {
          id:ID,// id
          data:{
            status:'1' // 0：拟制中；1：已上架；2：已下架；3：已归档
          }
        },
        callback: (res)=>{
          if (res.status === 'ok') {
            message.success(`${msg}成功`);
            router.push('/courseware/coursewareManager/index');
          }else{
            message.warning(`${msg}失败`);
          }
        }
      });
    }

    // ---------------批量删除---------------
    // 批量删除,如果选择了数据，则显示删除模态框
    batchDelete = () => {
      const { selectedAllKeys } = this.state;
      if(selectedAllKeys.length<1){
        message.info('请选择您需要删除的数据！')
        return
      }
      this.setState({
        delVisible: true,
        delConfirmLoading:false
      });
    }

    // 批量删除确认按钮
    delHandleOk = () => {
      const { selectedAllKeys } = this.state;
      const { dispatch , ID } = this.props;
      this.setState({
        delConfirmLoading:true,
      })
      dispatch({
        type:'CourseManager/DelBatch',
        payload: {
          id:ID,// 课件id
          data:{
            trainers:selectedAllKeys
          }
        },
        callback: (res) => {
          if (res.status === 'ok') {
            message.success('批量删除成功')
            this.setState({
              delVisible: false,
              delConfirmLoading:false,
              selectedAllKeys:[],// 选中的数据组成的数组（只包含key值）
              pagination: {
                current:1,
                pageSize:10,
              },
            });
            this.getTableData(1,10);
          }else{
            this.setState({
              delConfirmLoading:false,
            })
            message.warning('批量删除失败')
          }
        }
      })
    }

    // 批量删除取消按钮
    delHandleCancel = () => {
      console.log('取消按钮')
      this.setState({
        delVisible: false,
        delConfirmLoading:false
      });
    }
    // ---------------批量删除---------------

    // ---------------单个删除---------------
    // 单个删除
    deleteConfirm = (delID) => {
      const IDArr = [];
      IDArr.push(delID)
      const { dispatch , currentTrainers , ID  } = this.props;
      const { pagination: { current,pageSize } , selectedAllKeys } = this.state;
      const flag = selectedAllKeys.indexOf(delID);// 用于判断该数据是否已经选中存放到selectedAllKeys数组中
      const len = currentTrainers.results.length;// 获取该页数据条数
      dispatch({
        type:'CourseManager/DelOneData',
        payload: {
          id:ID,// 课件id
          data:{
            trainers:IDArr// 字符串转换成数组
          }
        },
        callback: (res) => {
          if (res.status === 'ok') {
            message.success('删除成功');
            console.log(selectedAllKeys);
            if (flag > -1) {
              selectedAllKeys.splice(flag, 1);
              this.setState({
                selectedAllKeys
              })
            }
            if( current > 1 && len === 1){
              const prePage = current-1;
              this.setState({
                pagination: {
                  current:prePage,
                  pageSize,
                },
              });
              this.getTableData(prePage,pageSize);
            }else{
              this.getTableData(current,pageSize);
            }
          }else{
            message.warning('删除失败')
          }
        }
      })
    }
    // ---------------单个删除---------------

    // ---------------增加培训管理员模态框---------------
    // “增加培训管理员”模态框，获取table表格数据(指定页码，指定每页条数)
    getAddTableData = (page,size) => {
      const { dispatch , ID  } = this.props;
      dispatch({
        type: 'CourseManager/GetAddTrainersData',
        payload: {
          page,// 页码
          size,// 每页条数
          id:ID,// 培训群组ID
        },
      });
    }

    // “增加培训管理员”模态框。分页、排序、筛选变化时触发。这边只有分页功能，没有排序和筛选
    handleAddTableChange= (_pagination_) => {
      // console.log('-------------------');
      // console.log(_pagination_);
      // console.log('-------------------');
      const {addPagination} = this.state;
      const {current,pageSize} = _pagination_;
      this.setState({
        addPagination: {
          ...addPagination,
          current,
          pageSize
        },
      });
      this.getAddTableData(current,pageSize);
    }

    // 点击“增加培训管理员”，显示模态框
    addMember = () => {
      // 默认是获取第一页数据
      const { addPagination:{current , pageSize}} = this.state;
      this.setState({
        addVisible:true,// 增加培训管理员的模态框————>显示隐藏
        addConfirmLoading: false,// 增加培训管理员的模态框————>确定按钮 loading
      })
      this.getAddTableData(current,pageSize);
    }

    // 增加培训管理员模态框————>确定按钮
    addHandleOk = () => {
      console.log('确定按钮')
      const { addSelectedAllKeys } = this.state;
      const { dispatch , ID } = this.props;
      if(addSelectedAllKeys.length<1){
        message.info('请选择您需要添加的培训管理员！')
        return
      }
      dispatch({
        type:'CourseManager/SubmitAddedData',
        payload: {
          id:ID,// 课件id
          data:{
            trainers:addSelectedAllKeys
          }
          // id:addSelectedAllKeys
        },
        callback: (res) => {
          if (res.status === 'ok') {
            message.success('培训管理员增加成功')
            this.setState({
              addVisible: false,
              addConfirmLoading:true,
              addSelectedAllKeys:[],// 选中的数据组成的数组（只包含key值）
              addPagination: {
                current:1,
                pageSize:10,
              },
              pagination: {
                current:1,
                pageSize:10,
              },
            });
            this.getTableData(1,10);
          }else{
            message.warning('培训管理员增加失败')
          }
        }
      })
    }

    // 增加培训管理员模态框————>取消按钮
    addHandleCancel = () => {
      console.log('取消按钮')
      this.setState({
        addVisible: false,
        addConfirmLoading:false,
        addSelectedAllKeys:[],// 选中的数据组成的数组（只包含key值）
        addPagination: {
          current:1,
          pageSize:10,
        },
      });
    }
    // ---------------增加培训管理员模态框---------------

    render() {
        const {
          courserTeacherInfo ,
          selectedAllKeys , 
          pagination ,
          delVisible , 
          delConfirmLoading , 
          addVisible , 
          addConfirmLoading ,
          addSelectedAllKeys , 
          addPagination ,
        } = this.state;
        const {
          currentTrainers , 
          addTrainers,
          currentType
        } = this.props;

        // 表格分页配置(已选择的培训管理员)
        const pageConifg = {
          ...pagination,
          total:currentTrainers.count,
          showTotal:total => `共 ${total} 条记录`
        }
        // 选中的表格行(已选择的培训管理员)
        const rowSelection = {
          selectedRowKeys:selectedAllKeys,
          // 选中项发生变化时的回调
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(selectedRowKeys, selectedRows);
            this.setState({
              selectedAllKeys:selectedRowKeys
            });
          },
          getCheckboxProps: record => ({
            disabled: currentType === '拟制中'? false : record.created === '是', // 已创建学习计划不可以选中
          }),
        };
        // 循环Table数据，添加key(已选择的培训管理员)
        const dataSource = currentTrainers.results.map((value)=>{
          return Object.assign({},value,{key:value.id});
        });

        // ---------------增加培训管理员模态框---------------
        // 表格分页配置(准备添加的培训管理员)
        const addPageConifg = {
          ...addPagination,
          total:addTrainers.count,
          showTotal:total => `共 ${total} 条记录`
        }
        // 选中的表格行(准备添加的培训管理员)
        const addRowSelection = {
          selectedRowKeys:addSelectedAllKeys,
          // 选中项发生变化时的回调
          onChange: (selectedRowKeys, selectedRows) => {
            // console.log(selectedRowKeys, selectedRows);
            this.setState({
              addSelectedAllKeys:selectedRowKeys
            });
            
          },
        };
        // 循环Table数据，添加key(准备添加的培训管理员)
        const addDataSource = addTrainers.results.map((value)=>{
          return Object.assign({},value,{key:value.id});
        });
        // ---------------增加培训管理员模态框---------------

        const commonColumns=[
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
        const columns = () => {
          let arr = [];
          if(currentType === '拟制中'){
            arr = [
              ...commonColumns,
              {
                title: '操作',
                dataIndex: 'option',
                key: 'option',
                render: (text, record) => (
                  <span>
                    <Popconfirm placement="topRight" title='确认删除该条数据？' onConfirm={() => this.deleteConfirm(record.key)} okText="确定" cancelText="取消">
                      <a>删除</a>
                    </Popconfirm>
                  </span>
                ),
              },
            ]
          }else{
            arr = [
              ...commonColumns,
              {
                title: '已创建培训计划',
                dataIndex: 'createdPlan',
                key: 'createdPlan',
                render: (text, record) => (
                  <span>
                    {record.created}
                  </span>
                ),
              },
              {
                title: '操作',
                dataIndex: 'option',
                key: 'option',
                render: (text, record) => (
                  <span>
                    <Popconfirm placement="topRight" title='确认删除该条数据？' onConfirm={() => this.deleteConfirm(record.key)} okText="确定" cancelText="取消">
                      <a disabled={record.created === '是'}>删除</a>
                    </Popconfirm>
                  </span>
                ),
              },
            ]
          }
          return arr
        }

        return (
          <PageHeaderWrapper title={`课件编辑（${currentType}）`}>
            <CourseManagerBasicInfo
              isShow={false}
              detailConfig={{
                ...courserTeacherInfo,
                class_hour:`${Number(courserTeacherInfo.class_hour)}小时`
              }}
            /> 
            <Card 
              className={styles.courseManagerContent}
            >
              <div className={styles.tableContent}>
                <div className={styles.searchContent}>
                  <div><span>可以使用本课件的培训管理员：</span></div>
                  <div>
                    <Button type='primary' onClick={this.addMember}>增加培训管理员</Button>
                    <Button className='ant-btn-del' onClick={this.batchDelete}>批量删除</Button>
                  </div>
                </div>
                <Table 
                  bordered
                  dataSource={dataSource} 
                  columns={columns()}
                  pagination={pageConifg}
                  onChange={this.handleTableChange}
                  rowSelection={rowSelection}
                />
              </div>
              <div className={styles.foonter_btns}>
                {
                  currentType === '拟制中'?<Button type="primary" onClick={()=>this.changeCourseStatus('上架')}>上架</Button>:null              
                }
                {
                  currentType === '已下架'?<Button type="primary" onClick={()=>this.changeCourseStatus('重新上架')}>重新上架</Button>:null
                }
                <Button onClick={() => router.push('/courseware/coursewareManager/index')}>返回</Button>
              </div>
            </Card>
            <Modal
              visible={addVisible}
              title="增加培训管理员"
              style={{ top: 150 , minWidth:800 }}
              bodyStyle={{paddingTop:0,paddingBottom:0}}
              onOk={this.addHandleOk}
              onCancel={this.addHandleCancel}
              // confirmLoading={addConfirmLoading}
              footer={
                <div style={{textAlign:'center'}}>
                  <Button type="primary" loading={addConfirmLoading} onClick={this.addHandleOk}>确定</Button>
                  <Button onClick={this.addHandleCancel}>取消</Button>
                </div> 
              }
            >
              <div className={styles.courseManagerContent}>
                <div style={{paddingTop:20}}>
                  <div className={styles.searchContent}>
                    <div><span>选择可以使用本课件的培训管理员：</span><Search placeholder='输入培训管理员姓名或编号过滤' style={{width:300}} /></div>
                  </div>
                  <Table 
                    bordered 
                    dataSource={addDataSource}
                    columns={commonColumns}
                    pagination={addPageConifg}
                    onChange={this.handleAddTableChange}
                    rowSelection={addRowSelection}
                  />
                </div>
              </div>
            </Modal>
            <Modal
              visible={delVisible}
              title="批量删除提示"
              style={{ top: 150 }}
              onOk={this.delHandleOk}
              onCancel={this.delHandleCancel}
              // confirmLoading={delConfirmLoading}
              footer={
                <div style={{textAlign:'center'}}>
                  <Button type="primary" loading={delConfirmLoading} onClick={this.delHandleOk}>确定</Button>
                  <Button onClick={this.delHandleCancel}>取消</Button>
                </div> 
              }
            >
              <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'40px 0'}}>
                <Icon type="exclamation-circle" theme="filled" style={{color:'#faad14', fontSize:'24px',marginRight:'15px'}} />确定要删除所选数据？
              </div>
            </Modal>
          </PageHeaderWrapper>
        );
    }
}

export default CommonConent;