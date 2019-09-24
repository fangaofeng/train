import React, { Component } from 'react';
import { Card, List, Button, Input } from 'antd';
import AvatarList from '@/components/AvatarList';
import router from 'umi/router';
import Link from 'umi/link';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import SelfItemCard from '@/components/Workbench/selfItemCard';
import SelfItemCardImg from '@/components/Workbench/selfItemCardImg';
import SelfItemCardDetail from '@/components/Workbench/selfItemCardDetail';
import styles from './index.less';

const { Search } = Input;

@connect(({ ExamManager }) => ({
  allTestPapers: ExamManager.allTestPapers, // 系统管理员 ——> 试卷管理 ——> 主页，获取所有试卷的表格数据
}))
class examPaperList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        // 分页信息
        // total:20,// 数据总数
        current: 1, // 当前页数
        pageSize: 12, // 每页条数
        pageSizeOptions: ['12', '16', '20', '24'], // 指定每页可以显示多少条数据
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
      type: 'ExamManager/GetAllTestPapersTableData',
      payload: {
        page, // 页码
        size, // 每页条数
      },
    });
  };

  // 分页、排序、筛选变化时触发。这边只有分页功能，没有排序和筛选
  handlePageChange = (_current,_pageSize) => {
    // console.log('-------------------');
    // console.log(_pagination_);
    // console.log('-------------------');
    const { pagination } = this.state;
    console.log(_current,_pageSize);

    this.setState({
      pagination: {
        ...pagination,
        current:_current,
        pageSize:_pageSize,


      },
    });
    this.getListData(_current, _pageSize);
  };

  render() {
    const { allTestPapers } = this.props;
    const { pagination } = this.state;
    const pageConfig = {
      ...pagination,
      total: allTestPapers.count,
      showTotal: total => `共 ${total} 条记录`,
      onChange: this.handlePageChange,
    };
    // 循环Table数据，添加key
    const dataSource = allTestPapers.results.map(value =>
      Object.assign({}, value, { key: value.id })
    );

    return (
      <PageHeaderWrapper title="查看试卷">
        <Card className={styles.managerContent}>
          <div className={styles.searchContent}>
            <div className="">
              <Search
                placeholder="输入试卷编号或名称过滤"
                onSearch={value => console.log(value)}
                style={{ width: 300 }}
              />
            </div>
          </div>

          <List
            grid={{ gutter: 4, xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4 }}
            dataSource={dataSource}
            pagination={pageConfig}
            locale={{
              emptyText: <div>没有试卷</div>,
            }}
            renderItem={item => (
              <List.Item>
                <SelfItemCard>
                  <SelfItemCardImg
                    // item={item}
                    imgSrc={item.cover}
                    // showCourseTip
                    // showExamTip
                    studyTime={`考试时长：${item.duration}分钟`}
                    btns={<Link to={`/examPlan/examPlanManager/create/${item.id}`}>发布考试</Link>}
                  />
                  <SelfItemCardDetail
                    // item={item}
                    title={item.name}
                    trAdminConfig={{
                      // teacher:item.teacher,
                      suitablePerson: item.applicable_user,
                    }}
                  />
                </SelfItemCard>
              </List.Item>
            )}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default examPaperList;
