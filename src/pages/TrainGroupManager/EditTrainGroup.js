import React, { Component } from 'react';
import { TreeSelect , Card , Button , Table , Modal , Divider , Popconfirm , Icon , Upload , Row , Col , message , Input , Select , Form , Avatar } from 'antd';
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
  EditTrainGroupTableData:trainGroupManager.EditTrainGroupTableData,// 编辑培训群组（获取现有群组成员的Table表格数据）
  groupsLoading:loading.effects['trainGroupManager/GetEditTrainGroupData'],
  EditAddMemberTableData:trainGroupManager.EditAddMemberTableData,// 编辑培训群组（增加群组成员的Table表格数据）
  usersLoading:loading.effects['trainGroupManager/GetEditTGAddData']
}))
@Form.create()
class EditTrainGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // maxNumberLength:12,// 群组编号最多12字
      // numberLengthLeft:12,// 群组编号剩余字数
      maxNameLength:25,// 群组名称最多25字
      nameLengthLeft:25,// 群组名称剩余字数
      isChangeTrainGroupName:false,// 是否修改群组名称

      delVisible:false,// 批量删除的模态框————>显示隐藏
      delConfirmLoading: false,// 批量删除的模态框————>确定按钮 loading
      selectedAllKeys:[],// 选中的数据组成的数组（只包含key值）
      pagination: {// 表格分页信息
        // total:20,// 数据总数
        current:1,// 当前页数
        pageSize:10,// 每页条数
        pageSizeOptions:['10','20','30','40'],// 指定每页可以显示多少条数据
        showQuickJumper:true,// 是否可以快速跳转至某页
        showSizeChanger:true,// 是否可以改变 pageSize
      },

      addVisible:false,// 增加群组成员的模态框————>显示隐藏
      addConfirmLoading: false,// 增加群组成员的模态框————>确定按钮 loading
      addSelectedAllKeys:[],// 增加群组成员的模态框————>选中的数据组成的数组（只包含key值）
      addPagination: {// 增加群组成员的模态框————>表格分页
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
    // 默认是获取第一页数据
    const { pagination:{current , pageSize}} = this.state;
    this.getTableData(current,pageSize);
    this.setGroupNameValue()
  }

  // 编辑培训群组。获取table表格数据(指定页码，指定每页条数)
  getTableData = (page,size) => {
    const { dispatch } = this.props;
    const { query:{id} } = this.props.location;
    dispatch({
      type: 'trainGroupManager/GetEditTrainGroupData',
      payload: {
        page,// 页码
        size,// 每页条数
        id,// 培训群组ID
      },
    });
  }

  // 编辑培训群组。分页、排序、筛选变化时触发。这边只有分页功能，没有排序和筛选
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
    const { dispatch } = this.props;
    const { query:{id} } = this.props.location;
    this.setState({
      delConfirmLoading:true,
    })
    dispatch({
      type:'trainGroupManager/BatchDelEditTGManager',
      payload: {
        id,
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

  // 单个删除
  deleteConfirm = (ID) => {
    const IDArr = [];
    IDArr.push(ID)
    const { query:{id} } = this.props.location;
    const { dispatch , EditTrainGroupTableData } = this.props;
    const { pagination: { current,pageSize } , selectedAllKeys } = this.state;
    const flag = selectedAllKeys.indexOf(ID);// 用于判断该数据是否已经选中存放到selectedAllKeys数组中
    const len = EditTrainGroupTableData.results.length;// 获取该页数据条数
    dispatch({
      type:'trainGroupManager/DelEditTGManager',
      payload: {
        id,
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

  // “增加群组成员”模态框，获取table表格数据(指定页码，指定每页条数)
  getAddTableData = (page,size) => {
    const { dispatch } = this.props;
    const { query:{id} } = this.props.location;
    dispatch({
      type: 'trainGroupManager/GetEditTGAddData',
      payload: {
        page,// 页码
        size,// 每页条数
        id,// 培训群组ID
      },
    });
  }

  // “增加群组成员”模态框。分页、排序、筛选变化时触发。这边只有分页功能，没有排序和筛选
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

  // 点击“增加群组成员”，显示模态框
  addMember = () => {
    // 默认是获取第一页数据
    const { addPagination:{current , pageSize}} = this.state;
    this.setState({
      addVisible:true,// 增加群组成员的模态框————>显示隐藏
      addConfirmLoading: false,// 增加群组成员的模态框————>确定按钮 loading
    })
    this.getAddTableData(current,pageSize);
  }

  // 增加群组成员模态框————>确定按钮
  addHandleOk = () => {
    console.log('确定按钮')
    const { addSelectedAllKeys } = this.state;
    const { dispatch } = this.props;
    const { query:{id} } = this.props.location;
    if(addSelectedAllKeys.length<1){
      message.info('请选择您需要添加的成员！')
      return
    }
    dispatch({
      type:'trainGroupManager/SubmitEditTGAddMember',
      payload: {
        id,
        data:{
          trainers:addSelectedAllKeys
        }
        // id:addSelectedAllKeys
      },
      callback: (res) => {
        if (res.status === 'ok') {
          message.success('增加群组成员成功')
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
          message.warning('增加群组成员失败')
        }
      }
    })
  }

  // 增加群组成员模态框————>取消按钮
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

  // 修改群组名称————>点击“修改群组名称”按钮
  changeTGName = () =>{
    this.setGroupNameValue()
    this.setState({
      isChangeTrainGroupName:true
    })
  }

  // 修改群组名称————>确定按钮
  handleSubmit = () => {
    const {form:{validateFieldsAndScroll} , dispatch , match} = this.props;
    const { query:{id,num} } = this.props.location;
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('表单值', values);
        dispatch({
          type:'trainGroupManager/ChangeEditTGName',
          payload: {
            id,// 培训群组ID
            data:{
              name:values.group_name
            }
          },
          callback: (res) => {
            if (res.status === 'ok') {
              message.success('修改成功')
              router.replace({
                pathname:match.url,
                query: {
                  id,
                  name:values.group_name,
                  num
                },
              });
              this.setState({
                isChangeTrainGroupName:false
              })
            }else{
              message.warning('修改失败')
            }
          }
        })
      }
    });
  }

  // 修改群组名称————>取消按钮
  cancelChangeTGName = () =>{
    this.setState({
      isChangeTrainGroupName:false
    })
  }

  // 为群组名称的input框赋值,并修改剩余多少字
  setGroupNameValue = ()=>{
    const { form:{setFieldsValue} } = this.props;
    const { query:{name} } = this.props.location;
    const { maxNameLength } = this.state;// 最多多少字
    const nameLengthLeft = maxNameLength -name.length;// 剩余多少字
    setFieldsValue({
      'group_name': name,
    });
    this.setState({
      nameLengthLeft:nameLengthLeft<=0?0:nameLengthLeft
    })
  }

  // 判断剩余多少字
  inputLengthFun = (e,params,total) =>{
    console.log(e.target.value);
    const len = total - e.target.value.length;
    console.log(len);
    this.setState({
      [params]:len<=0?0:len
    })
  }

  render() {
    const { query:{num,name} } = this.props.location;
    const { form:{getFieldDecorator,setFieldsValue} } = this.props;
    const {EditTrainGroupTableData ,groupsLoading, EditAddMemberTableData,usersLoading } = this.props;
    const { selectedAllKeys , pagination , addSelectedAllKeys , addPagination } = this.state;
    const { delVisible , delConfirmLoading , addVisible , addConfirmLoading } = this.state;
    const { maxNameLength , nameLengthLeft , isChangeTrainGroupName } = this.state;
    // 表格分页配置(已选择的群组成员)
    const pageConifg = {
      ...pagination,
      total:EditTrainGroupTableData.count,
      showTotal:total => `共 ${total} 条记录`
    }
    // 选中的表格行(已选择的群组成员)
    const rowSelection = {
      selectedRowKeys:selectedAllKeys,
      // 选中项发生变化时的回调
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys, selectedRows);
        this.setState({
          selectedAllKeys:selectedRowKeys
        });
        
      },
    };
    // 循环Table数据，添加key(已选择的群组成员)
    const dataSource = EditTrainGroupTableData.results.map((value)=>{
      return Object.assign({},value,{key:value.id});
    });

    // 表格分页配置(准备添加的群组成员)
    const addPageConifg = {
      ...addPagination,
      total:EditAddMemberTableData.count,
      showTotal:total => `共 ${total} 条记录`
    }
    // 选中的表格行(准备添加的群组成员)
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
    // 循环Table数据，添加key(准备添加的群组成员)
    const addDataSource = EditAddMemberTableData.results.map((value)=>{
      return Object.assign({},value,{key:value.id});
    });

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
    const columns = [
      ...commonColumns,
      {
        title: '操作',
        dataIndex: 'train_group_opt',
        key: 'train_group_opt',
        render: (text, record) => (
          <span>
            <Popconfirm placement="topRight" title='确认删除该条数据？' onConfirm={() => this.deleteConfirm(record.key)} okText="确定" cancelText="取消">
              <a>删除</a>
            </Popconfirm>
          </span>
        ),
      },
    ];

    return (
      <PageHeaderWrapper title='编辑培训群组'>
        <Card 
          className={styles.trainGroupCommonContent}
        >
          <Form
            hideRequiredMark
            layout="inline"
            className={styles.formContent}
          >
            <FormItem label="群组编号"><span>{num}</span></FormItem> 
            <FormItem
              label="群组名称"
              style={{display :isChangeTrainGroupName?'inline-block':'none'}}
            >
              {
                getFieldDecorator('group_name', {
                  rules: [
                    {
                        required: true, message: '群组名称必填',
                    }
                  ],
                  // initialValue:name // 有问题
                })(
                  <Input style={{width:300}} placeholder='群组名称' maxLength={maxNameLength} onChange={(e)=>{this.inputLengthFun(e,'nameLengthLeft',maxNameLength)}} />
                )
              }
              <span className={styles.spanTips}>剩余<span>{nameLengthLeft}</span>个字</span>
            </FormItem> 
            <FormItem style={{display :isChangeTrainGroupName?'inline-block':'none'}}>
              <Button type="primary" onClick={this.handleSubmit}>确定</Button>
              <Button style={{marginLeft:10}} onClick={this.cancelChangeTGName}>取消</Button>
            </FormItem>
            <FormItem label="群组名称" style={{display :isChangeTrainGroupName?'none':'inline-block'}}>
              <span>{name}</span>
            </FormItem> 
            <FormItem style={{display :isChangeTrainGroupName?'none':'inline-block'}}>
              <Button type="primary" onClick={this.changeTGName}>修改群组名称</Button>
            </FormItem>
            
          </Form>
          <div className={styles.tableContent}>
            <div className={styles.searchContent}>
              <div><span>选择群组成员：</span></div>
              <div>
                <Button type='primary' onClick={this.addMember}>增加群组成员</Button>
                <Button className='ant-btn-del' onClick={this.batchDelete}>批量删除</Button>
              </div>
            </div>
            <Table 
              bordered

              loading={groupsLoading}
              dataSource={dataSource} 
              columns={columns}
              pagination={pageConifg}
              onChange={this.handleTableChange}
              rowSelection={rowSelection}
            />
          </div>
          <div className={styles.foonter_btns}>
            {/* <Button type="primary" onClick={this.handleSubmit}>提交</Button> */}
            <Button onClick={() => router.push('/trainGroupManager/index')}>取消</Button>
          </div>
        </Card>
        <Modal
          visible={addVisible}
          title="增加群组成员"
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
          <div className={styles.trainGroupCommonContent}>
            <div className={styles.modalHeaderinfo}>
              <div style={{marginRight:20}}><span>群组编号：</span><span>{num}</span></div>
              <div><span>群组名称：</span><span>{name}</span></div>
            </div>
            <div>
              <div className={styles.searchContent}>
                <div><span>选择群组成员：</span><Search placeholder='输入员工编号或名称过滤' style={{width:300}} /></div>
              </div>
              <Table 
                bordered 
                loading={usersLoading}
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
          title="删除培训群组"
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

export default EditTrainGroup;