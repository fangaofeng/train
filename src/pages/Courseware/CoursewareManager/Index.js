import React, { Component } from 'react';
import { Card, Modal, Table, Divider, Icon, Button, Input, message } from 'antd';
import router from 'umi/router';
import Link from 'umi/link';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './index.less';

const { Search } = Input;

@connect(({ CourseManager, loading }) => ({
  coursewarerList: CourseManager.allCourseManager, // 系统管理员 ——> 课件管理 ——> 主页，获取所有课件的表格数据
  coursewareLoading: loading.effects['CourseManager/getAllCourseManagerListData'],
}))
class coursewareManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileOnArchiveVisible: false, // 是否显示归档操作的模态框
      fileOnArchiveLoading: false, // 归档确定按钮 loading
      fileOnArchiveID: null, // 需要归档的文件id

      delVisible: false, // 是否显示删除操作的模态框
      delLoading: false, // 删除确定按钮 loading
      delID: null, // 需要删除的文件id

      OffShelfVisible: false, // 是否显示下架操作的模态框
      OffShelfLoading: false, // 下架确定按钮 loading
      OffShelfID: null, // 需要下架的文件id

      pagination: {
        // 表格分页信息
        // total:20,// 数据总数
        current: 1, // 当前页数
        pageSize: 10, // 每页条数
        pageSizeOptions: ['10', '20', '30', '40'], // 指定每页可以显示多少条数据
        showQuickJumper: true, // 是否可以快速跳转至某页
        showSizeChanger: true, // 是否可以改变 pageSize
      },
    };
  }

  // 页面加载完成后
  componentDidMount() {
    // 默认是获取第一页数据
    const {
      pagination: { current, pageSize },
    } = this.state;
    this.getTableData(current, pageSize);
  }

  // 获取table表格数据(指定页码，指定每页条数)
  getTableData = (page, size) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'CourseManager/getAllCourseManagerListData',
      payload: {
        page, // 页码
        size, // 每页条数
      },
    });
  };

  // 分页、排序、筛选变化时触发。这边只有分页功能，没有排序和筛选
  handleTableChange = _pagination_ => {
    // console.log('-------------------');
    // console.log(_pagination_);
    // console.log('-------------------');
    const { pagination } = this.state;
    const { current, pageSize } = _pagination_;
    this.setState({
      pagination: {
        ...pagination,
        current,
        pageSize,
      },
    });
    this.getTableData(current, pageSize);
  };

  // -------------------------归档操作-------------------------
  // 归档操作
  fileOnArchive = record => {
    console.log(record.id);
    this.setState({
      fileOnArchiveVisible: true,
      fileOnArchiveLoading: false,
      fileOnArchiveID: record.id,
    });
  };

  // 取消归档（关闭模态框）
  fileOnArchiveCancel = () => {
    console.log('取消按钮');
    this.setState({
      fileOnArchiveVisible: false,
      fileOnArchiveLoading: false,
      fileOnArchiveID: null,
    });
  };

  // 确定归档（归档成功后关闭模态框）
  fileOnArchiveOK = () => {
    const {
      pagination: { current, pageSize },
    } = this.state;
    const { fileOnArchiveID } = this.state;
    console.log('id', fileOnArchiveID);
    this.setState({
      fileOnArchiveLoading: true,
    });

    const { dispatch } = this.props;
    dispatch({
      type: 'CourseManager/CourseOnArchive',
      payload: {
        id: fileOnArchiveID, // id
        data: {
          status: '已归档', // 0：拟制中；1：已上架；2：已下架；3：已归档
        },
      },
      callback: res => {
        if (res.status === 'ok') {
          message.success('归档成功');
          this.setState({
            fileOnArchiveVisible: false,
            fileOnArchiveLoading: false,
            fileOnArchiveID: null,
          });
          this.getTableData(current, pageSize);
        } else {
          message.warning('归档失败');
          this.setState({
            fileOnArchiveLoading: false,
          });
        }
      },
    });
  };
  // -------------------------归档操作-------------------------

  // -------------------------删除操作-------------------------
  // 删除操作
  delFile = record => {
    console.log(record.id);
    this.setState({
      delVisible: true,
      delLoading: false,
      delID: record.id,
    });
  };

  // 取消删除（关闭模态框）
  delFileCancel = () => {
    console.log('取消按钮');
    this.setState({
      delVisible: false,
      delLoading: false,
      delID: null,
    });
  };

  // 确定删除（归档成功后关闭模态框）
  delFileOK = () => {
    const { dispatch, coursewarerList } = this.props;
    const {
      pagination: { current, pageSize },
    } = this.state;
    const { delID } = this.state;
    const len = coursewarerList.results.length; // 获取该页数据条数
    console.log('id', delID);
    this.setState({
      delLoading: true,
    });

    dispatch({
      type: 'CourseManager/DelCourse',
      payload: {
        id: delID,
      },
      callback: res => {
        console.log(res);
        const response = JSON.parse(res);
        if (response.status === 'ok') {
          message.success('删除成功');
          this.setState({
            delVisible: false,
            delLoading: false,
            delID: null,
          });
          if (current > 1 && len === 1) {
            const prePage = current - 1;
            this.setState({
              pagination: {
                current: prePage,
                pageSize,
              },
            });
            this.getTableData(prePage, pageSize);
          } else {
            this.getTableData(current, pageSize);
          }
        } else {
          message.warning('删除失败');
          this.setState({
            delLoading: false,
          });
        }
      },
    });
  };
  // -------------------------删除操作-------------------------

  // -------------------------下架操作-------------------------
  // 下架操作
  OffShelf = record => {
    console.log(record.id);
    this.setState({
      OffShelfVisible: true,
      OffShelfLoading: false,
      OffShelfID: record.id,
    });
  };

  // 取消下架（关闭模态框）
  OffShelfCancel = () => {
    console.log('取消按钮');
    this.setState({
      OffShelfVisible: false,
      OffShelfLoading: false,
      OffShelfID: null,
    });
  };

  // 确定下架（归档成功后关闭模态框）
  OffShelfOK = () => {
    const {
      pagination: { current, pageSize },
    } = this.state;
    const { OffShelfID } = this.state;
    console.log('下架id', OffShelfID);
    this.setState({
      OffShelfLoading: true,
    });

    const { dispatch } = this.props;
    dispatch({
      type: 'CourseManager/OffShelfCourse',
      payload: {
        id: OffShelfID, // id
        data: {
          status: '已下架', // 0：拟制中；1：已上架；2：已下架；3：已归档
        },
      },
      callback: res => {
        if (res.status === 'ok') {
          message.success('下架成功');
          this.setState({
            OffShelfVisible: false,
            OffShelfLoading: false,
            OffShelfID: null,
          });
          this.getTableData(current, pageSize);
        } else {
          message.warning('下架失败');
          this.setState({
            OffShelfLoading: false,
          });
        }
      },
    });
  };
  // -------------------------下架操作-------------------------

  render() {
    const { coursewarerList, coursewareLoading } = this.props;
    const {
      pagination,
      fileOnArchiveVisible,
      fileOnArchiveLoading,
      delVisible,
      delLoading,
      OffShelfVisible,
      OffShelfLoading,
    } = this.state;
    const pageConifg = {
      ...pagination,
      total: coursewarerList.count,
      showTotal: total => `共 ${total} 条记录`,
    };
    // 循环Table数据，添加key
    const dataSource = coursewarerList.results.map(value =>
      Object.assign({}, value, { key: value.id })
    );

    const columns = [
      {
        title: '课件编号',
        dataIndex: 'course_manager_KJBH',
        key: 'course_manager_KJBH',
        render: (text, record) => <span>{record.courseware_no}</span>,
      },
      {
        title: '课件名称',
        dataIndex: 'course_manager_KJMC',
        key: 'course_manager_KJMC',
        render: (text, record) => <span>{record.name}</span>,
      },
      {
        title: '课件分类',
        dataIndex: 'course_manager_KJFL',
        key: 'course_manager_KJFL',
        render: (text, record) => <span>{record.category}</span>,
      },
      {
        title: '课件类型',
        dataIndex: 'course_manager_KJLX',
        key: 'course_manager_KJLX',
        render: (text, record) => <span>{record.courseware_type}</span>,
      },
      {
        title: '课时',
        dataIndex: 'course_manager_KS',
        key: 'course_manager_KS',
        render: (text, record) => <span>{Number(record.class_hour)}</span>,
      },
      {
        title: '讲师',
        dataIndex: 'course_manager_JS',
        key: 'course_manager_JS',
        render: (text, record) => <span>{record.teachername}</span>,
      },
      {
        title: '状态',
        dataIndex: 'course_manager_status',
        key: 'course_manager_status',
        render: (text, record) => <span>{record.status}</span>,
      },
      {
        title: '创建人',
        dataIndex: 'course_manager_creater',
        key: 'course_manager_creater',
        render: (text, record) => <span>{record.creater}</span>,
      },
      {
        title: '操作',
        dataIndex: 'course_manager_opt',
        key: 'course_manager_opt',
        render: (text, record) => {
          let dom;
          if (record.status === '拟制中') {
            dom = (
              <span>
                <Link
                  to={`/courseware/coursewareManager/edit/${record.id}?currentType=${
                    record.status
                  }`}
                >
                  编辑
                </Link>
                <Divider type="vertical" />
                <a onClick={() => this.delFile(record)}>删除</a>
              </span>
            );
          } else if (record.status === '已上架') {
            dom = (
              <span>
                <Link
                  to={`/courseware/coursewareManager/edit/${record.id}?currentType=${
                    record.status
                  }`}
                >
                  编辑
                </Link>
                <Divider type="vertical" />
                <a onClick={() => this.OffShelf(record)}>下架</a>
              </span>
            );
          } else if (record.status === '已下架') {
            dom = (
              <span>
                <Link
                  to={`/courseware/coursewareManager/edit/${record.id}?currentType=${
                    record.status
                  }`}
                >
                  编辑
                </Link>
                <Divider type="vertical" />
                <a onClick={() => this.fileOnArchive(record)}>归档</a>
              </span>
            );
          } else if (record.status === '已归档') {
            dom = (
              <span>
                <a disabled>归档后禁止操作</a>
              </span>
            );
          }
          return dom;
        },
      },
    ];

    return (
      <PageHeaderWrapper title="课件管理">
        <Card className={styles.managerContent}>
          <div className={styles.searchContent}>
            <div className="">
              <Search
                placeholder="输入课件编号或名称过滤"
                onSearch={value => console.log(value)}
                style={{ width: 300 }}
              />
            </div>
            <div className="">
              <Button
                type="primary"
                onClick={() => router.push('/courseware/uploadZip/uploadZip1')}
              >
                上传课件
              </Button>
            </div>
          </div>
          <Table
            dataSource={dataSource}
            loading={coursewareLoading}
            columns={columns}
            pagination={pageConifg}
            onChange={this.handleTableChange}
          />
        </Card>
        <Modal
          visible={fileOnArchiveVisible}
          title="归档提示"
          style={{ top: 150 }}
          onOk={this.fileOnArchiveOK}
          onCancel={this.fileOnArchiveCancel}
          // confirmLoading={fileOnArchiveLoading}
          footer={
            <div style={{ textAlign: 'center' }}>
              <Button type="primary" loading={fileOnArchiveLoading} onClick={this.fileOnArchiveOK}>
                确定
              </Button>
              <Button onClick={this.fileOnArchiveCancel}>取消</Button>
            </div>
          }
        >
          <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
            <Icon
              type="exclamation-circle"
              theme="filled"
              style={{ color: '#faad14', fontSize: '24px', marginRight: '15px' }}
            />
            <div>
              <div>确定要归档课件吗？</div>
              <div>注意：课件归档后不能重新上架！</div>
            </div>
          </div>
        </Modal>
        <Modal
          visible={delVisible}
          title="删除提示"
          style={{ top: 150 }}
          onOk={this.delFileOK}
          onCancel={this.delFileCancel}
          // confirmLoading={delLoading}
          footer={
            <div style={{ textAlign: 'center' }}>
              <Button type="primary" loading={delLoading} onClick={this.delFileOK}>
                确定
              </Button>
              <Button onClick={this.delFileCancel}>取消</Button>
            </div>
          }
        >
          <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
            <Icon
              type="exclamation-circle"
              theme="filled"
              style={{ color: '#faad14', fontSize: '24px', marginRight: '15px' }}
            />
            <div>
              <div>确定要删除课件吗？</div>
              <div>注意：课件删除后无法恢复！</div>
            </div>
          </div>
        </Modal>
        <Modal
          visible={OffShelfVisible}
          title="下架提示"
          style={{ top: 150 }}
          onOk={this.OffShelfOK}
          onCancel={this.OffShelfCancel}
          // confirmLoading={OffShelfLoading}
          footer={
            <div style={{ textAlign: 'center' }}>
              <Button type="primary" loading={OffShelfLoading} onClick={this.OffShelfOK}>
                确定
              </Button>
              <Button onClick={this.OffShelfCancel}>取消</Button>
            </div>
          }
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '40px 0',
            }}
          >
            <Icon
              type="exclamation-circle"
              theme="filled"
              style={{ color: '#faad14', fontSize: '24px', marginRight: '15px' }}
            />
            确定要下架课件吗？
          </div>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default coursewareManager;
