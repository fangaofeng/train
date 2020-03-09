import React, { Component } from 'react';
import { Card, Icon, Input, List, Row, Col } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Link } from 'umi';
import moment from 'moment';
// import ArticleListContent from '@/components/ArticleListContent';
import styles from '@/components/styles.less';

const { Search } = Input;

@connect(({ Announcement, loading }) => ({
  articleList: Announcement.articleList, // 系统管理员 ——> 文章管理 ——> 主页，获取所有文章的表格数据
  articleListloading: loading.effects['Announcement/GetArticleLists'],
}))
class articleManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.getListData(current, pageSize);
  }

  // 获取table表格数据(指定页码，指定每页条数)
  getListData = (page, size) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'Announcement/GetArticleLists',
      payload: {
        page, // 页码
        size, // 每页条数
      },
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

  render() {
    const { articleList, articleListloading } = this.props;
    const { pagination } = this.state;
    const pageConifg = {
      ...pagination,
      total: articleList.count,
      showTotal: total => `共 ${total} 条记录`,
    };
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    return (
      <PageHeaderWrapper title="公告列表">
        <Row gutter={8}>
          <Col xs={24} sm={24} md={24} lg={18} xl={16}>
            <Card className={styles.managerContent}>
              <div className={styles.searchContent}>
                <div className="">
                  <Search
                    placeholder="输入文章编号或名称过滤"
                    onSearch={value => console.log(value)}
                    style={{ width: 300 }}
                  />
                </div>
              </div>

              <List
                itemLayout="vertical"
                size="large"
                pagination={pageConifg}
                dataSource={articleList.results}
                loading={articleListloading}
                renderItem={item => (
                  <List.Item
                    key={item.id}
                    actions={[
                      <IconText type="eye" text={item.views} key="list-vertical-star-o" />,
                      <IconText
                        type="history"
                        text={`发布时间: ${moment(item.pub_time).format('YYYY-MM-DD HH:mm')}`}
                        key="list-vertical-star-o"
                      />,
                    ]}
                    extra={
                      <Link to={`/announcement/detail/${item.id}`}>
                        <img height={172} alt="" src={item.thumbnail} />
                      </Link>
                    }
                  >
                    <List.Item.Meta
                      // avatar={<Avatar src={item.avatar} />}
                      title={<Link to={`/announcement/detail/${item.id}`}>{item.title} </Link>}
                      description={
                        <Link to={`/announcement/detail/${item.id}`}>{item.description} </Link>
                      }
                    />
                    {/* <ArticleListContent data={item} /> */}
                  </List.Item>
                )}
              />
            </Card>{' '}
          </Col>
          <Col xs={24} sm={24} md={24} lg={6} xl={8}>
            <Card title="最近公告" />
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}
export default articleManager;
