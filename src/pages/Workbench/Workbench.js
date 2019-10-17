import React, { Component } from 'react';
import { List, Button, Card, Row, Col, Progress, Table, Badge, Tabs, Spin } from 'antd';
import moment from 'moment';
// import classNames from 'classnames';
import Link from 'umi/link';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
// import moment from 'moment';
import SelfCard from '@/components/Workbench/selfCard';
import SelfItemCard from '@/components/Workbench/selfItemCard';
import SelfItemCardImg from '@/components/Workbench/selfItemCardImg';
import SelfItemCardDetail from '@/components/Workbench/selfItemCardDetail';
import { connect } from 'dva';
import Authorized from '@/utils/Authorized';
import { getAuthority } from '@/utils/authority';
import router from 'umi/router';
import imgPlatform1 from '@/assets/images/Workbench/01.png';
import imgPlatform2 from '@/assets/images/Workbench/02.png';
import imgPlatform3 from '@/assets/images/Workbench/03.png';
import imgPlatform4 from '@/assets/images/Workbench/04.png';
import noDataTips1 from '@/assets/images/Workbench/001.png';
import noDataTips2 from '@/assets/images/Workbench/002.png';
import noDataTips3 from '@/assets/images/Workbench/003.png';
import noDataTips4 from '@/assets/images/Workbench/004.png';
import styles from './Workbench.less';

const { TabPane } = Tabs;

@connect(({ workbench, loading }) => ({
  announcementList: workbench.getAnnouncement, // 平台公告列表数据
  announcementListLoading: loading.effects['workbench/getAnnouncement'],
  courseManagerList: workbench.courseManager, // 课件管理列表数据
  coursewaresLoading: loading.effects['workbench/getCourseManager'],
  examManagerList: workbench.examManager, // 试卷管理列表数据
  papersLoading: loading.effects['workbench/getExamManager'],
  latestCourseList: workbench.latestCourse, // 最新课程列表数据
  latestcourseLoading: loading.effects['workbench/getLatestCourse'],
  latestExamList: workbench.latestExam, // 最新试卷列表数据
  latestExamListLoading: loading.effects['workbench/getLatestExam'],
  stuAllCourseAndExamData: workbench.stuAllCourseAndExamData, // 待完成、已完成、已逾期列表数据
  stuAllCourseAndExamDataLoading: loading.effects['workbench/GetStuAllCourseAndExam'],
  recommendCourseList: workbench.recommendCourse,
  recommendCourseListLoading: loading.effects['workbench/getStuRecommendCourse'],
  stats: workbench.stats, // 推荐课程列表数据
  statsLoading: loading.effects['workbench/getStats'],
}))
class Workbench extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentListItemKey: 0,
      // currentTabKey:'1',// 学员tabs标签key
      noDataTips: {
        courseManager: {
          imgSrc: noDataTips1,
          title: '还没有课件，请先上传课件',
        },
        examManager: {
          imgSrc: noDataTips2,
          title: '还没有试卷，请先上传试卷',
        },
        newestCourse: {
          imgSrc: noDataTips1,
          title: '还没有课程，请等待系统管理员上架课程',
        },
        newestExam: {
          imgSrc: noDataTips2,
          title: '还没有试卷，请等待系统管理员上传试卷',
        },
        toDoList: {
          imgSrc: noDataTips3,
          title: '没有待办事项',
        },
        stuToDo: {
          imgSrc: noDataTips4,
          title: '没有待完成课程或考试',
        },
        stuDone: {
          imgSrc: noDataTips4,
          title: '没有已完成课程或考试',
        },
        stuOverdue: {
          imgSrc: noDataTips4,
          title: '没有已逾期课程或考试',
        },
        stuRecommend: {
          imgSrc: noDataTips1,
          title: '没有推荐课程，请等待系统管理员上架课程',
        },
      },
    };
  }

  componentDidMount() {
    const currentUserFlag = getAuthority();
    const { dispatch } = this.props;
    // 平台公告
    dispatch({
      type: 'workbench/getAnnouncement',
    });
    if (currentUserFlag[0] === 'admin') {
      // 课件管理
      dispatch({
        type: 'workbench/getCourseManager',
        payload: {
          page: 1,
          size: 4,
        },
      });
      // 试卷管理
      dispatch({
        type: 'workbench/getExamManager',
        payload: {
          page: 1,
          size: 4,
        },
      });
      // 统计数据
      dispatch({
        type: 'workbench/getStats',
        payload: {},
      });
    } else if (currentUserFlag[0] === 'user') {
      // 最新课程
      dispatch({
        type: 'workbench/getLatestCourse',
        payload: {
          page: 1,
          size: 4,
        },
      });
      // 最新试卷
      dispatch({
        type: 'workbench/getLatestExam',
        payload: {
          page: 1,
          size: 4,
        },
      });
      // 代办事项
    } else if (currentUserFlag[0] === 'stu') {
      // 待完成、已完成、已逾期
      dispatch({
        type: 'workbench/GetStuAllCourseAndExam',
      });
      // 推荐课程
      dispatch({
        type: 'workbench/getStuRecommendCourse',
        payload: {
          page: 1,
          size: 4,
          recommend: 'true',
        },
      });
    }
  }

  // 鼠标滑过平台公告的list改变图片
  changeAnnouncementImg = key => {
    // console.log(key);
    this.setState({
      currentListItemKey: key,
    });
  };

  // 跳转页面
  btnChangePage = key => {
    // console.log(key);
    switch (key) {
      case 'courseware':
        router.push('/courseware/uploadZip');
        break;
      case 'exam':
        router.push('/exam/uploadZip');
        break;
      case 'announcement':
        router.push('/announcement/create');
        break;

      default:
        break;
    }
  };

  render() {
    const {
      announcementList, // 平台公告
      announcementListLoading,
      courseManagerList, // 课件管理
      coursewaresLoading,
      examManagerList, // 试卷管理
      papersLoading,
      latestCourseList, // 最新课程列表数据
      latestcourseLoading,
      latestExamList, // 最新试卷列表数据
      latestExamListLoading,
      stuAllCourseAndExamData, // 待完成、已完成、已逾期列表数据
      stuAllCourseAndExamDataLoading,
      recommendCourseList, // 推荐课程列表数据
      recommendCourseListLoading,
      stats,
      statsLoading,
    } = this.props;
    // console.log(stats);
    const { currentListItemKey, noDataTips } = this.state;
    const columns = [
      {
        title: '业务类型',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: '内容',
        dataIndex: 'content',
        key: 'content',
      },
      {
        title: '到期时间',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '当前进度',
        dataIndex: 'progress',
        key: 'progress',
        width: '20%',
        render: (text, record) => {
          if (record.status === 'danger') {
            return <Progress percent={Number(text)} showInfo={false} strokeColor="#f5222d" />;
          }
          if (record.status === 'warn') {
            return <Progress percent={Number(text)} showInfo={false} strokeColor="#faad14" />;
          }
          // if (record.status === 'normal') {
          //   return <Progress percent={Number(text)} showInfo={false} strokeColor="#1890ff" />;
          // }

          return <Progress percent={Number(text)} showInfo={false} strokeColor="#1890ff" />;
        },
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: '10%',
        render: text => {
          if (text === 'danger') {
            return <Badge status="error" text="超期" />;
          }
          if (text === 'warn') {
            return <Badge status="warning" text="预警" />;
          }
          // if (text === 'normal') {
          //   return <Badge status="processing" text="正常" />;
          // }
          return <Badge status="processing" text="正常" />;
        },
      },
    ];
    const dataSource = [
      {
        key: '1',
        type: '学习跟催',
        content: '反海外腐败法是否会导致国内的反腐调查？',
        time: '2018/10/19',
        progress: '100',
        status: 'danger',
      },
      {
        key: '2',
        type: '提问答复',
        content: '如何与机构客户（国有企业国有医院）同时又合法合规？',
        time: '2018/10/19',
        progress: '80',
        status: 'warn',
      },
      {
        key: '3',
        type: '考试阅卷',
        content: '企业合规管理基础知识考试',
        time: '2018/10/19',
        progress: '60',
        status: 'normal',
      },
      {
        key: '4',
        type: '提问答复',
        content: '在查欺诈员工时，公安会把公司查个底掉吗？',
        time: '2018/10/19',
        progress: '60',
        status: 'normal',
      },
      {
        key: '5',
        type: '提问答复',
        content: '业务数据存储过程中违反GDPR条款有什么影响？',
        time: '2018/10/19',
        progress: '60',
        status: 'normal',
      },
    ];

    // 课件管理 编辑 按钮路由
    const courseManager = (status, id) => {
      // status状态  ‘拟制中’、‘已上架’、‘已下架’、‘已归档’
      let url = '';
      if (status === '拟制中') {
        url = `/courseware/coursewareManager/courseMaking/${id}`;
      } else if (status === '已上架') {
        url = `/courseware/coursewareManager/onShelf/${id}`;
      } else if (status === '已下架') {
        url = `/courseware/coursewareManager/offShelf/${id}`;
      } else {
        url = '';
      }
      return url;
    };
    return (
      <GridContent>
        <div>
          <SelfCard
            title="平台公告"
            extra={<Link to="/announcement/viewlist">查看更多&gt;&gt;</Link>}
          >
            <div className={styles.Notice_Card_contend}>
              <div className={styles.notice_left}>
                {announcementList.length > 0 ? (
                  <img src={announcementList[currentListItemKey].cover} alt="" />
                ) : null}
              </div>
              <List
                className={styles.workbench}
                dataSource={announcementList}
                loading={announcementListLoading}
                renderItem={(item, k) => (
                  <List.Item
                    title={item.title}
                    className={k === currentListItemKey ? styles.active_listItem : ''}
                    onMouseEnter={() => {
                      this.changeAnnouncementImg(k);
                    }}
                  >
                    <List.Item.Meta
                      title={
                        <div>
                          <span className={styles.listCircle} />
                          <a href={`/announcement/detail/${item.id}`}>{item.title}</a>
                        </div>
                      }
                    />

                    <div>{moment(item.created).format('YYYY-MM-DD HH:mm')}</div>
                  </List.Item>
                )}
              />
            </div>
            <Authorized authority="admin">
              <Button
                type="dashed"
                style={{ width: '100%', marginTop: 20, marginBottom: 20 }}
                icon="plus"
                onClick={() => {
                  this.btnChangePage('announcement');
                }}
                className="ant-btn-upload"
              >
                新增公告
              </Button>
            </Authorized>
          </SelfCard>
          {/* <SelfCard title='课件管理' extra='查看更多>>' noCardHeaderBorderBottom='noCardHeaderBorderBottom'> */}
          <Authorized authority="admin">
            {/* /courseware/coursewareManager/manager */}
            <SelfCard
              title="课件管理"
              extra={<Link to="/courseware/coursewareManager/index">查看更多&gt;&gt;</Link>}
            >
              <List
                grid={{ gutter: 4, xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4 }}
                dataSource={courseManagerList}
                loading={coursewaresLoading}
                locale={{
                  emptyText: (
                    <div className={styles.noDataTips}>
                      <img src={noDataTips.courseManager.imgSrc} alt="课件管理" />
                      <span>{noDataTips.courseManager.title}</span>
                    </div>
                  ),
                }}
                renderItem={item => (
                  <List.Item>
                    <SelfItemCard>
                      <SelfItemCardImg
                        imgSrc={item.cover}
                        studyTime={`${Number(item.class_hour)}学时`}
                        // btns={<Link to={`/studyPlan/studyPlanManager/create/${item.id}`}>发布考试</Link>}
                      />
                      <SelfItemCardDetail
                        title={item.name}
                        adminConfig={{
                          status: item.status,
                          btns: <Link to={courseManager(item.status, item.id)}>编辑</Link>,
                        }}
                      />
                    </SelfItemCard>
                  </List.Item>
                )}
              />
              <Button
                type="dashed"
                style={{ width: '100%' }}
                icon="plus"
                onClick={() => {
                  this.btnChangePage('courseware');
                }}
                className="ant-btn-upload"
              >
                上传课件
              </Button>
            </SelfCard>
            <SelfCard
              title="试卷管理"
              extra={<Link to="/exam/examManager/index">查看更多&gt;&gt;</Link>}
            >
              <List
                grid={{ gutter: 4, xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4 }}
                dataSource={examManagerList}
                loading={papersLoading}
                locale={{
                  emptyText: (
                    <div className={styles.noDataTips}>
                      <img src={noDataTips.examManager.imgSrc} alt="试卷管理" />
                      <span>{noDataTips.examManager.title}</span>
                    </div>
                  ),
                }}
                renderItem={item => (
                  <List.Item>
                    <SelfItemCard>
                      <SelfItemCardImg imgSrc={item.cover} />
                      <SelfItemCardDetail
                        title={item.title}
                        adminConfig={{
                          status: item.status,
                          btns: <Link to={`/exam/examManager/examMaking/${item.id}`}>编辑</Link>,
                        }}
                      />
                    </SelfItemCard>
                  </List.Item>
                )}
              />
              <Button
                type="dashed"
                style={{ width: '100%' }}
                icon="plus"
                onClick={() => {
                  this.btnChangePage('exam');
                }}
                className="ant-btn-upload"
              >
                上传试卷
              </Button>
            </SelfCard>
            <div className={styles.adminPlatformConent}>
              <Card bordered={false} className={styles.firstCard}>
                <div className={styles.firstCard_tit}>平台运营基础数据</div>
                <div className={styles.firstCard_det}>
                  数据统计截止时间：
                  <span>{stats.statstime ? stats.statstime : '----:--:---'}</span>
                </div>
              </Card>
              <Card bordered={false} className={styles.secondCard}>
                <Spin spinning={statsLoading}>
                  <Row>
                    {/* <Col xs={24} sm={12} md={12} lg={12} xl={6}> */}
                    <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                      <div className={styles.secondCardCol}>
                        <img src={imgPlatform1} alt="课件(总数/上架)" />
                        <div>
                          <div>课件(总数/新增)</div>
                          <div>
                            {stats.coursewareCount ? stats.coursewareCount : '*'}
                            个/
                            {stats.courserwareonCount ? stats.courserwareonCount : '*'}个
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                      <div className={styles.secondCardCol}>
                        <img src={imgPlatform2} alt="试卷(总数/上架)" />
                        <div>
                          <div>试卷(总数/上架)</div>
                          <div>
                            {stats.exampaperCount ? stats.exampaperCount : '*'}/
                            {stats.exampaperonCount ? stats.exampaperonCount : '*'}个
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                      <div className={styles.secondCardCol}>
                        <img src={imgPlatform3} alt="学员数量" />
                        <div>
                          <div>学员数量</div>
                          <div>{stats.stuCount ? stats.stuCount : '*'}人</div>
                        </div>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                      <div className={styles.secondCardCol}>
                        <img src={imgPlatform4} alt="平台访问次数" />
                        <div>
                          <div>平台访问次数</div>
                          <div>{stats.websiteViews ? stats.websiteViews : '*'}</div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Spin>
              </Card>
            </div>
          </Authorized>
          <Authorized authority="user">
            <SelfCard title="最新课程" extra={<Link to="#">查看更多&gt;&gt;</Link>}>
              <List
                grid={{ gutter: 4, xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4 }}
                dataSource={latestCourseList}
                loading={latestcourseLoading}
                locale={{
                  emptyText: (
                    <div className={styles.noDataTips}>
                      <img src={noDataTips.newestCourse.imgSrc} alt="最新课程" />
                      <span>{noDataTips.newestCourse.title}</span>
                    </div>
                  ),
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
                          <Link to={`/studyPlan/studyPlanManager/create/${item.id}`}>
                            创建学习计划
                          </Link>
                        }
                      />
                      <SelfItemCardDetail
                        // item={item}
                        title={item.name}
                        trAdminConfig={{
                          teacher: item.teachername,
                          suitablePerson: item.applicable_user,
                        }}
                      />
                    </SelfItemCard>
                  </List.Item>
                )}
              />
            </SelfCard>
            <SelfCard title="最新试卷" extra={<Link to="#">查看更多&gt;&gt;</Link>}>
              <List
                grid={{ gutter: 4, xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4 }}
                dataSource={latestExamList}
                loading={latestExamListLoading}
                locale={{
                  emptyText: (
                    <div className={styles.noDataTips}>
                      <img src={noDataTips.newestExam.imgSrc} alt="最新试卷" />
                      <span>{noDataTips.newestExam.title}</span>
                    </div>
                  ),
                }}
                renderItem={item => (
                  <List.Item>
                    <SelfItemCard>
                      <SelfItemCardImg
                        // item={item}
                        imgSrc={item.cover}
                        // showCourseTip
                        // showExamTip
                        studyTime={`考试时长：${item.class_hour}分钟`}
                        btns={
                          <Link to={`/examPlan/examPlanManager/create/${item.id}`}>发布考试</Link>
                        }
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
            </SelfCard>
            <SelfCard title="待办事项" extra={<Link to="#">查看更多&gt;&gt;</Link>}>
              <Table
                style={{ marginTop: -24 }}
                pagination={false}
                locale={{
                  emptyText: (
                    <div className={styles.noDataTips}>
                      <img src={noDataTips.toDoList.imgSrc} alt="待办事项" />
                      <span>{noDataTips.toDoList.title}</span>
                    </div>
                  ),
                }}
                dataSource={dataSource}
                columns={columns}
              />
            </SelfCard>
          </Authorized>
          <Authorized authority="stu">
            <Card className={styles.stuFinishCard}>
              <Tabs
                animated={false}
                tabBarExtraContent={<Link to="#">查看更多&gt;&gt;</Link>}
                defaultActiveKey="1"
              >
                <TabPane tab="待完成" key="1">
                  <List
                    grid={{ gutter: 4, xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4 }}
                    dataSource={stuAllCourseAndExamData.learntodoes}
                    loading={stuAllCourseAndExamDataLoading}
                    locale={{
                      emptyText: (
                        <div className={styles.noDataTips}>
                          <img src={noDataTips.stuToDo.imgSrc} alt="待完成" />
                          <span>{noDataTips.stuToDo.title}</span>
                        </div>
                      ),
                    }}
                    renderItem={item => (
                      <List.Item>
                        <SelfItemCard>
                          <SelfItemCardImg
                            // item={item}
                            imgSrc={item.plan.course.cover}
                            showCourseTip={item.type === 'course'}
                            showExamTip={item.type === 'exam'}
                            studyTime={
                              item.type === 'course'
                                ? `${Number(item.plan.course.class_hour)}学时`
                                : false
                            }
                            // btns={<Link to={`/studyPlan/studyPlanManager/create/${item.id}`}>发布考试</Link>}
                          />
                          <SelfItemCardDetail
                            // item={item}
                            title={item.plan.name}
                            stuUnfinishedConfig={{
                              status: item.status,
                              progress: item.type === 'course' ? item.rate_progress : null,
                              endTime: item.type === 'exam' ? item.plan.end_time : null,
                              days: item.days_remaining ? item.days_remaining : 'XXX',
                              planStartTime:
                                item.type === 'course' ? (
                                  <span title={`学习开放时间：${item.plan.start_time}`}>
                                    学习开放时间：
                                    {item.plan.start_time}
                                  </span>
                                ) : (
                                  <span title={`考试开放时间：${item.plan.start_time}`}>
                                    考试开放时间：
                                    {item.plan.start_time}
                                  </span>
                                ),
                              btns:
                                item.type === 'course' ? (
                                  <Link
                                    to={`/myStudy/learnPlan/${
                                      item.plan.course.file_type === 'MP4' ? 'video' : 'pdf'
                                    }/${item.id}`}
                                  >
                                    去学习
                                  </Link>
                                ) : (
                                  <Link to={`/myExam/onlineExam/login/${item.id}`}>去考试</Link>
                                ),
                            }}
                          />
                        </SelfItemCard>
                      </List.Item>
                    )}
                  />
                  {/* <List
                      grid={{ gutter: 4, xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4 }}
                      dataSource={stuUnFinishedList}
                      renderItem={item => (
                        <List.Item>
                          <SelfItemCard>
                            <SelfItemCardImg
                              // item={item}
                              imgSrc={item.imgSrc}
                              showCourseTip={item.type==='course'}
                              showExamTip={item.type==='exam'}
                              studyTime={item.type==='course'?`${item.studyTime}学时`:false}
                              // btns={<Link to={`/studyPlan/studyPlanManager/create/${item.id}`}>发布考试</Link>}
                            />
                            <SelfItemCardDetail
                              // item={item}
                              title={item.title}
                              stuUnfinishedConfig={
                                {
                                  progress:item.type==='course'?item.progress:null,
                                  endTime:item.type==='exam'?item.endTime:null,
                                  days:item.days,
                                  btns:item.type==='course'?<Link to={`/studyPlan/studyPlanManager/create/${item.id}`}>去学习</Link>:<Link to={`/studyPlan/studyPlanManager/create/${item.id}`}>去考试</Link>
                                }
                              }
                            />
                          </SelfItemCard>
                        </List.Item>
                      )}
                    /> */}
                </TabPane>
                <TabPane tab="已完成" key="2">
                  <List
                    grid={{ gutter: 4, xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4 }}
                    dataSource={stuAllCourseAndExamData.learncompletedes}
                    loading={stuAllCourseAndExamDataLoading}
                    locale={{
                      emptyText: (
                        <div className={styles.noDataTips}>
                          <img src={noDataTips.stuDone.imgSrc} alt="已完成" />
                          <span>{noDataTips.stuDone.title}</span>
                        </div>
                      ),
                    }}
                    renderItem={item => (
                      <List.Item>
                        <SelfItemCard>
                          <SelfItemCardImg
                            // item={item}
                            imgSrc={item.plan.course.cover}
                            showCourseTip={item.type === 'course'}
                            showExamTip={item.type === 'exam'}
                            studyTime={
                              item.type === 'course'
                                ? `${Number(item.plan.course.class_hour)}学时`
                                : false
                            }
                            // btns={<Link to={`/studyPlan/studyPlanManager/create/${item.id}`}>发布考试</Link>}
                          />
                          <SelfItemCardDetail
                            // item={item}
                            title={item.plan.name}
                            stuFinishedConfig={{
                              availableTime: item.type === 'course' ? item.plan.end_time : null,
                              examEndTime: item.type === 'exam' ? item.end_time : null,
                              btns:
                                item.type === 'course' ? (
                                  <Link
                                    to={`/myStudy/learnPlan/${
                                      item.plan.course.file_type === 'MP4' ? 'video' : 'pdf'
                                    }/${item.id}`}
                                  >
                                    去学习
                                  </Link>
                                ) : (
                                  <Link to={`/studyPlan/studyPlanManager/create/${item.id}`}>
                                    查看试卷
                                  </Link>
                                ),
                            }}
                          />
                        </SelfItemCard>
                      </List.Item>
                    )}
                  />
                </TabPane>
                <TabPane tab="已逾期" key="3">
                  <List
                    grid={{ gutter: 4, xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4 }}
                    dataSource={stuAllCourseAndExamData.learnoverdue}
                    loading={stuAllCourseAndExamDataLoading}
                    locale={{
                      emptyText: (
                        <div className={styles.noDataTips}>
                          <img src={noDataTips.stuOverdue.imgSrc} alt="已逾期" />
                          <span>{noDataTips.stuOverdue.title}</span>
                        </div>
                      ),
                    }}
                    renderItem={item => (
                      <List.Item>
                        <SelfItemCard>
                          <SelfItemCardImg
                            // item={item}
                            imgSrc={item.plan.course.cover}
                            showCourseTip={item.type === 'course'}
                            showExamTip={item.type === 'exam'}
                            studyTime={
                              item.type === 'course'
                                ? `${Number(item.plan.course.class_hour)}学时`
                                : false
                            }
                            // btns={<Link to={`/studyPlan/studyPlanManager/create/${item.id}`}>发布考试</Link>}
                          />
                          <SelfItemCardDetail
                            // item={item}
                            title={item.plan.name}
                            stuUnfinishedConfig={{
                              status: item.status,
                              progress: item.type === 'course' ? item.rate_progress : null,
                              endTime: item.type === 'exam' ? item.plan.end_time : null,
                              days: item.days_remaining ? item.days_remaining : '0',
                              planStartTime:
                                item.type === 'course' ? (
                                  <span title={`学习开放时间：${item.plan.start_time}`}>
                                    学习开放时间：
                                    {item.plan.start_time}
                                  </span>
                                ) : (
                                  <span title={`考试开放时间：${item.plan.start_time}`}>
                                    考试开放时间：
                                    {item.plan.start_time}
                                  </span>
                                ),
                              btns:
                                item.type === 'course' ? (
                                  <Link
                                    to={`/myStudy/learnPlan/${
                                      item.plan.course.file_type === 'MP4' ? 'video' : 'pdf'
                                    }/${item.id}`}
                                  >
                                    去学习
                                  </Link>
                                ) : (
                                  <Link to={`/studyPlan/studyPlanManager/create/${item.id}`}>
                                    去考试
                                  </Link>
                                ),
                            }}
                          />
                        </SelfItemCard>
                      </List.Item>
                    )}
                  />
                </TabPane>
              </Tabs>
            </Card>

            <SelfCard title="推荐课程" extra={<Link to="#">查看更多&gt;&gt;</Link>}>
              <List
                grid={{ gutter: 4, xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4 }}
                dataSource={recommendCourseList}
                loading={recommendCourseListLoading}
                locale={{
                  emptyText: (
                    <div className={styles.noDataTips}>
                      <img src={noDataTips.stuRecommend.imgSrc} alt="推荐课程" />
                      <span>{noDataTips.stuRecommend.title}</span>
                    </div>
                  ),
                }}
                renderItem={item => (
                  <List.Item>
                    <SelfItemCard>
                      <SelfItemCardImg
                        // item={item}
                        imgSrc={item.cover}
                        // showCourseTip
                        // showExamTip
                        studyTime={`${item.class_hour}学时`}
                        btns={
                          <Link
                            to={`/myStudy/learnPlan/${item.file_type === 'MP4' ? 'video' : 'pdf'}/${
                              item.id
                            }`}
                          >
                            去学习
                          </Link>
                        }
                      />
                      <SelfItemCardDetail
                        // item={item}
                        title={item.title}
                        stuRecommendedCourse={{
                          teacher: item.teachername,
                          suitablePerson: item.applicable_user,
                        }}
                      />
                    </SelfItemCard>
                  </List.Item>
                )}
              />
            </SelfCard>
          </Authorized>
        </div>
      </GridContent>
    );
  }
}

export default Workbench;
