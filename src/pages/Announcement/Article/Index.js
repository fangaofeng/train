import React, { Component } from 'react';
import { Card, Modal, Avatar, Table, Divider, Icon, Button, Input, message } from 'antd';
import router from 'umi/router';
import Link from 'umi/link';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './index.less';

const { Search } = Input;

@connect(({ ArticleManager, loading }) => ({
  articleList: ArticleManager.articleList,
  // 系统管理员 ——> 文章管理 ——> 主页，获取所有文章的表格数据
  articleListLoading: loading.effects['ArticleManager/GetArticleListTableData'],
}))
class articleManager extends Component {
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
      type: 'ArticleManager/GetArticleListTableData',
      payload: {
        page, // 页码
        size, // 每页条数
      },
      config: { sdfsdfs: 1 },
    });
  };

  // 分页、排序、筛选变化时触发。这边只有分页功能，没有排序和筛选
  handleTableChange = _pagination_ => {
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
      type: 'ArticleManager/ChangeArticleStatus',
      payload: {
        id: fileOnArchiveID, // id
        data: {
          status: '3', // 0：拟制中；1：已上架；2：已下架；3：已归档
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
    const { dispatch, articleList } = this.props;
    const {
      pagination: { current, pageSize },
    } = this.state;
    const { delID } = this.state;
    const len = articleList.results.length; // 获取该页数据条数
    console.log('id', delID);
    this.setState({
      delLoading: true,
    });

    dispatch({
      type: 'ArticleManager/DelArticle',
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
      type: 'ArticleManager/ChangeArticleStatus',
      payload: {
        id: OffShelfID, // id
        data: {
          status: '2', // 0：拟制中；1：已上架；2：已下架；3：已归档
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
    const { articleList, articleListLoading } = this.props;
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
      total: articleList.count,
      showTotal: total => `共 ${total} 条记录`,
    };
    // 循环Table数据，添加key
    const dataSource = articleList.results.map(value =>
      Object.assign({}, value, { key: value.id })
    );

    const columns = [
      {
        title: '文章编号',
        dataIndex: 'Article_KJBH',
        key: 'Article_KJBH',
        render: (text, record) => <span>{record.id}</span>,
      },
      {
        title: '封面',
        dataIndex: 'Article_Cover',
        key: 'Article_Cover',
        width: 50,
        render: (text, record) => (
          <Avatar shape="square" src={record.thumbnail} size={40} icon="user" />
        ),
      },

      {
        title: '文章名称',
        dataIndex: 'Article_KJMC',
        key: 'Article_KJMC',
        render: (text, record) => <span>{record.title}</span>,
      },
      // {
      //   title: '文章分类',
      //   dataIndex: 'Article_KJFL',
      //   key: 'Article_KJFL',
      //   render: (text, record) => <span>{record.category}</span>,
      // },

      {
        title: '状态',
        dataIndex: 'Article_status',
        key: 'Article_status',
        render: (text, record) => <span>{record.status}</span>,
      },
      // {
      //   title: '创建人',
      //   dataIndex: 'Article_creater',
      //   key: 'Article_creater',
      //   render: (text, record) => <span>{record.creater}</span>,
      // },
      {
        title: '发布时间',
        dataIndex: 'Article_pubtime',
        key: 'Article_creater',
        render: (text, record) => <span>{record.pub_time}</span>,
      },
      {
        title: '操作',
        dataIndex: 'Article_opt',
        key: 'Article_opt',
        render: (text, record) => {
          let dom;
          if (record.status === '草稿') {
            dom = (
              <span>
                <Link to={`/announcement/edit/${record.id}`}>编辑</Link>
                <Divider type="vertical" />
                <a onClick={() => this.delFile(record)}>删除</a>
                <Divider type="vertical" />
                <a href={`/announcement/detail/${record.id}`}>预览</a>
              </span>
            );
          } else if (record.status === '发表') {
            dom = (
              <span>
                <Link to={`/Article/ArticleManager/onShelf/${record.id}`}>编辑</Link>
                <Divider type="vertical" />
                <a onClick={() => this.OffShelf(record)}>归档</a>
                <Divider type="vertical" />
                <a onClick={() => this.delFile(record)}>查看</a>
              </span>
            );
          } else if (record.status === '归档') {
            dom = (
              <span>
                <a onClick={() => this.delFile(record)}>查看</a>
              </span>
            );
          }
          return dom;
        },
      },
    ];

    return (
      <PageHeaderWrapper title="文章管理">
        <Card className={styles.ArticleManagerContent}>
          <div className={styles.searchContent}>
            <div>
              <Search
                placeholder="输入文章编号或名称过滤"
                onSearch={value => console.log(value)}
                style={{ width: 300 }}
              />
            </div>
            <div>
              <Button type="primary" onClick={() => router.push('/Article/uploadZip/uploadZip1')}>
                新建文章
              </Button>
            </div>
          </div>
          <Table
            loading={articleListLoading}
            dataSource={dataSource}
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
              <div>确定要归档文章吗？</div>
              <div>注意：文章归档后不能重新上架！</div>
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
              <div>确定要删除文章吗？</div>
              <div>注意：文章删除后无法恢复！</div>
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
            确定要下架文章吗？
          </div>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default articleManager;
