import React, { Component } from 'react';
import { Card, List, Button, Input } from 'antd';
import router from 'umi/router';
import Link from 'umi/link';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import SelfCard from '@/components/Workbench/selfCard';
import SelfItemCard from '@/components/Workbench/selfItemCard';
import SelfItemCardImg from '@/components/Workbench/selfItemCardImg';
import SelfItemCardDetail from '@/components/Workbench/selfItemCardDetail';
import styles from './index.less';

const { Search } = Input;

@connect(({ CourseManager }) => ({
  allCourseManager: CourseManager.allCourseManager, // 系统管理员 ——> 课件管理 ——> 主页，获取所有课件的表格数据
}))
class coursewareList extends Component {
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
      type: 'CourseManager/getAllCourseManagerListData',
      payload: {
        page, // 页码
        size, // 每页条数
      },
    });
  };

  // 分页、排序、筛选变化时触发。这边只有分页功能，没有排序和筛选
  handlePageChange = _pagination_ => {
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
    this.getListData(current, pageSize);
  };

  render() {
    const { allCourseManager } = this.props;
    const { pagination } = this.state;
    const pageConfig = {
      ...pagination,
      total: allCourseManager.count,
      showTotal: total => `共 ${total} 条记录`,
      onChange: this.handlePageChange,
    };
    // 循环Table数据，添加key
    const dataSource = allCourseManager.results.map(value =>
      Object.assign({}, value, { key: value.id })
    );

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
          </div>

          <List
            grid={{ gutter: 4, xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4 }}
            dataSource={dataSource}
            pagination={pageConfig}
            locale={{
              emptyText: <div>没有培训证书</div>,
            }}
            renderItem={item => (
              <List.Item>
                <SelfItemCard>
                  <SelfItemCardImg
                    // item={item}
                    imgSrc={item.cover}
                    // showCourseTip
                    // showExamTip
                    studyTime={`${Number(item.class_hour)}学时`}
                    btns={
                      <Link to={`/studyPlan/studyPlanManager/create/${item.id}`}>创建学习计划</Link>
                    }
                  />
                  <SelfItemCardDetail
                    // item={item}
                    title={<Link to={`/courseware/view/${item.id}`}>{item.name}</Link>}
                    trAdminConfig={{
                      teacher: item.teachername,
                      suitablePerson: item.applicable_user,
                      btns: <Link to={`/studyPlan/studyPlanManager/create/${item.id}`}>编辑</Link>,
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

export default coursewareList;
