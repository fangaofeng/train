import React, { Component } from 'react';
import { Tooltip , Card , Button , Table , Divider , Popconfirm , Icon , Upload , Row , Col , message , Input , Select , Form , Avatar } from 'antd';
import router from 'umi/router';
import Link from 'umi/link';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import classNames from 'classnames';
import styles from './Common.less';
import uploadSuccess from '@/assets/images/upload_success.png'

const { Search } = Input;
const FormItem = Form.Item;

@connect(({ trainGroupManager,loading }) => ({
    addTrainGroupTableData:trainGroupManager.addTrainGroupTableData,// 培训管理员 ————> 培训群组管理 ————> 增加培训群组（获取table表格数据）
    employeeLoading:loading.effects['trainGroupManager/GetAddTrainGroupData']
}))
@Form.create()
class AddTrainGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxNumberLength:12,// 群组编号最多12字
      maxNameLength:25,// 群组名称最多25字
      numberLengthLeft:12,// 群组编号剩余字数
      nameLengthLeft:25,// 群组名称剩余字数
      addTrainGroupFlag:'fail',// 增加群组是否成功的标志,fail为失败，success为成功
      selectedAllKeys:[],// 选中的数据组成的数组（只包含key值）
      saveSelectedData:{},// 保存选中的数据
      pagination: {// 表格分页信息
        // total:20,// 数据总数
        current:1,// 当前页数
        pageSize:10,// 每页条数
        pageSizeOptions:['10','20','30','40'],// 指定每页可以显示多少条数据
        showQuickJumper:true,// 是否可以快速跳转至某页
        showSizeChanger:true,// 是否可以改变 pageSize
      },

      // 提交成功后
      responseGroupNumber:'',// 提交成功后，返回的群组编号
      responseGroupName:'',// 提交成功后，返回的群组名称
      previewPagination: {// 增加群组成功后预览表格数据
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
    const { addTrainGroupFlag , pagination:{current , pageSize}} = this.state;
    if(addTrainGroupFlag === 'fail'){
      this.getTableData(current,pageSize);
    }
  }

  // 增加培训群组，选择成员。获取table表格数据(指定页码，指定每页条数)
  getTableData = (page,size) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'trainGroupManager/GetAddTrainGroupData',
      payload: {
        page,// 页码
        size,// 每页条数
        role:'employee'
      },
    });
  }

  // 增加培训群组，选择成员。分页、排序、筛选变化时触发。这边只有分页功能，没有排序和筛选
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

  // 提交按钮
  handleSubmit = () => {
    const {form:{validateFieldsAndScroll} , dispatch} = this.props;
    const { selectedAllKeys } = this.state;
    const len = selectedAllKeys.length;
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('表单值', values);
        if(len<1){
          message.info('请选择您需要添加的数据')
          return
        }
        dispatch({
          type:'trainGroupManager/AddTGManagerSubmit',
          payload: {
            name:values.group_name,
            trainers:selectedAllKeys,
          },
          callback: (res) => {
            if (res.status === 'ok') {
              message.success('提交成功')
              this.setState({
                responseGroupNumber:res.data.group_no,
                responseGroupName:res.data.name,
              });
              console.log(this.state.saveSelectedData);
              this.setState({
                addTrainGroupFlag:'success',// 增加群组是否成功的标志,fail为失败，success为成功
              })
            }else{
              message.warning('提交失败')
            }
          }
        })
        
      }
    });
  }

  // 提交成功后————预览所选中的数据
  previewTableChange = (_pagination_) => {
    const { previewPagination } = this.state;
    console.log('预览');
    const {current,pageSize} = _pagination_;
    this.setState({
      previewPagination:{
        ...previewPagination,
        current,
        pageSize
      }
    });
  }

  // 判断剩余多少字
  inputLengthFun = (e,params,total) =>{
    const len = total - e.target.value.length;
    this.setState({
      [params]:len<=0?0:len
    })
  }

  render() {
    const { form:{getFieldDecorator,getFieldValue} } = this.props;
    const {addTrainGroupTableData,employeeLoading} = this.props;
    const { selectedAllKeys , pagination , addTrainGroupFlag , saveSelectedData , previewPagination} = this.state;
    const { maxNumberLength , maxNameLength , numberLengthLeft , nameLengthLeft } = this.state;
    const { responseGroupNumber , responseGroupName } = this.state;

    // 增加培训群组，选择成员Table分页。
    const pageConifg = {
      ...pagination,
      total:addTrainGroupTableData.count,
      showTotal:total => `共 ${total} 条记录`
    }
    // 选中的表格行
    const rowSelection = {
      selectedRowKeys:selectedAllKeys,
      // 选中项发生变化时的回调
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log(selectedRowKeys, selectedRows);
        this.setState({
          selectedAllKeys:selectedRowKeys
        });
        
      },
      // 用户手动选择/取消选择某行的回调
      onSelect:(record, selected, selectedRows)=>{
        // console.log(record, selected, selectedRows);
        const { saveSelectedData } = this.state;
        if(selected){// 选中该条数据
          saveSelectedData[record.key] = record;
        }else{// 取消选中该条数据
          delete saveSelectedData[record.key]
        }
        this.setState({
          saveSelectedData
        })
      },
      // 用户手动选择/取消选择所有行的回调
      onSelectAll:(selected, selectedRows, changeRows)=>{
        // console.log(selected, selectedRows, changeRows);
        const { saveSelectedData } = this.state;
        if(selected){// 全选
          changeRows.forEach((v)=>{ 
            saveSelectedData[v.key] = v;
          });
        }else{// 取消全选
          changeRows.forEach((v)=>{ 
            delete saveSelectedData[v.key];
          });
        }
        this.setState({
          saveSelectedData
        })
      }
    };

    // 循环Table数据，添加key
    const dataSource = addTrainGroupTableData.results.map((value)=>{
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

    // 将选中的数据转换为数组格式
    const filterData = (value)=>{
      let arr = [];
      for(let i in value){
        arr.push(value[i]);
      }
      return arr
    };

    // 预览数据的Table分页参数
    const previewPageConifg = {
        ...previewPagination,
        total:filterData(saveSelectedData).length,
        showTotal:total => `共 ${total} 条记录`
    }

    return (
      <PageHeaderWrapper title={addTrainGroupFlag==='success'?'增加培训群组成功':'增加培训群组'}>
        <Card 
          className={styles.trainGroupCommonContent}
          style={{display:addTrainGroupFlag==='success'?'none':'block'}}
        >
          <Form
            hideRequiredMark
            layout="inline"
            className={styles.formContent}
          >
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
            </FormItem>  */}
            <FormItem
              label="群组名称"
            >
              {
                getFieldDecorator('group_name', {
                  rules: [
                    {
                        required: true, message: '群组名称必填',
                    }
                  ],
                })(
                  <Input style={{width:300}} placeholder='群组名称' maxLength={maxNameLength} onChange={(e)=>{this.inputLengthFun(e,'nameLengthLeft',maxNameLength)}} />
                )
              }
              <span className={styles.spanTips}>剩余<span>{nameLengthLeft}</span>个字</span>
            </FormItem> 
          </Form>
          <div className={styles.tableContent}>
            <div className={styles.searchContent}>
              <div><span>选择群组成员：</span><Search placeholder='输入员工编号或名称过滤' style={{width:300}} /></div>
            </div>
            <Table 
              bordered
              loading={employeeLoading}
              dataSource={dataSource} 
              columns={columns}
              pagination={pageConifg}
              onChange={this.handleTableChange}
              rowSelection={rowSelection}
            />
          </div>
          <div className={styles.foonter_btns}>
            <Button type="primary" onClick={this.handleSubmit}>提交</Button>
            <Button onClick={() => router.push('/trainGroupManager/index')}>取消</Button>
          </div>
        </Card>
        <Card
          className={styles.trainGroupCommonContent}
          style={{display:addTrainGroupFlag==='success'?'block':'none'}}
        >
          <div className={styles.addTrainGroupSuccessContent}>
            <div>
              <img src={uploadSuccess} alt="增加培训群组成功" />
              <span>增加培训群组成功</span>
            </div>
            <div>
              <div>群组编号：<span>{responseGroupNumber}</span></div>
              <div>群组名称：<span>{responseGroupName}</span></div>
            </div>
          </div>
          <div className={styles.tableContent}>
            <div className={styles.searchContent}>
              <div>群组成员：</div>
            </div>
            <Table 
              bordered 
              dataSource={filterData(saveSelectedData)}
              columns={columns}
              pagination={previewPageConifg}
              onChange={this.previewTableChange}
            />
          </div>
          <div className={styles.foonter_btns}>
            <Button type="primary" onClick={() => router.push('/trainGroupManager/index')}>完成</Button>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default AddTrainGroup;