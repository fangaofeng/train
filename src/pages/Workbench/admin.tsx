import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { List, Button, Card, Row, Col, Spin } from 'antd';
import { workbenchService, paperService, coursewareService } from '@/services';

// import classNames from 'classnames';
import { Link, history, useAccess } from 'umi';

// import { useUpdateEffect } from '@umijs/hooks';

// import moment from 'moment';
import SelfCard from '@/components/Workbench/selfCard';
import SelfItemCard from '@/components/Workbench/selfItemCard';
import SelfItemCardImg from '@/components/Workbench/selfItemCardImg';
import SelfItemCardDetail from '@/components/Workbench/selfItemCardDetail';
// import { useDispatch, useSelector } from 'dva';

import imgPlatform1 from '@/assets/images/Workbench/01.png';
import imgPlatform2 from '@/assets/images/Workbench/02.png';
import imgPlatform3 from '@/assets/images/Workbench/03.png';
import imgPlatform4 from '@/assets/images/Workbench/04.png';
import noDataTips from './utils';
import styles from './Workbench.less';

function AdminWorkbench() {
  const paper = paperService.listRequest({ current: 1, pageSize: 4 });
  const courseware = coursewareService.listRequest({ current: 1, pageSize: 4 });
  const stats = workbenchService.statsRequest();

  // 跳转页面
  const btnChangePage = key => {
    // console.log(key);
    switch (key) {
      case 'courseware':
        history.push('/courseware/uploadZip');
        break;
      case 'exam':
        history.push('/paper/uploadZip');
        break;
      case 'announcement':
        history.push('/announcement/create');
        break;

      default:
        break;
    }
  };

  const courseManager = (status, id) => {
    // status状态  ‘拟制中’、‘已上架’、‘已下架’、‘已归档’
    let url = '';
    if (status === '拟制中') {
      url = `/courseware/coursewareManager/edit/${id}?currentType=${status}`;
    } else if (status === '已上架') {
      url = `/courseware/coursewareManager/edit/${id}?currentType=${status}`;
    } else if (status === '已下架') {
      url = `/courseware/coursewareManager/edit/${id}?currentType=${status}`;
    } else {
      url = '';
    }
    return url;
  };

  return (
    <>
      <SelfCard
        title="课件管理"
        extra={<Link to="/courseware/coursewareManager/index">查看更多&gt;&gt;</Link>}
      >
        <List
          grid={{ gutter: 4, xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4 }}
          dataSource={courseware?.data?.list}
          loading={courseware?.loading}
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
          icon={<PlusOutlined />}
          onClick={() => {
            btnChangePage('courseware');
          }}
          className="ant-btn-upload"
        >
          上传课件
        </Button>
      </SelfCard>
      <SelfCard title="试卷管理" extra={<Link to="/paper/index">查看更多&gt;&gt;</Link>}>
        <List
          grid={{ gutter: 4, xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4 }}
          dataSource={paper?.data?.list}
          loading={paper?.loading}
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
                  title={item.name}
                  adminConfig={{
                    status: item.status,
                    btns: <Link to={`/paper/examMaking/${item.id}`}>编辑</Link>,
                  }}
                />
              </SelfItemCard>
            </List.Item>
          )}
        />
        <Button
          type="dashed"
          style={{ width: '100%' }}
          icon={<PlusOutlined />}
          onClick={() => {
            btnChangePage('exam');
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
            <span>{stats?.data?.statstime ? stats?.data?.statstime : '----:--:---'}</span>
          </div>
        </Card>
        <Card bordered={false} className={styles.secondCard}>
          <Spin spinning={stats?.loading}>
            <Row>
              {/* <Col xs={24} sm={12} md={12} lg={12} xl={6}> */}
              <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                <div className={styles.secondCardCol}>
                  <img src={imgPlatform1} alt="课件(总数/上架)" />
                  <div>
                    <div>课件(总数/新增)</div>
                    <div>
                      {stats?.data?.coursewareCount ? stats!.data?.coursewareCount : '*'}
                      个/
                      {stats?.data?.courserwareonCount ? stats?.data?.courserwareonCount : '*'}个
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
                      {stats?.data?.exampaperCount ? stats?.data?.exampaperCount : '*'}/
                      {stats?.data?.exampaperonCount ? stats?.data?.exampaperonCount : '*'}个
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                <div className={styles.secondCardCol}>
                  <img src={imgPlatform3} alt="学员数量" />
                  <div>
                    <div>学员数量</div>
                    <div>{stats?.data?.stuCount ? stats?.data?.stuCount : '*'}人</div>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                <div className={styles.secondCardCol}>
                  <img src={imgPlatform4} alt="平台访问次数" />
                  <div>
                    <div>平台访问次数</div>
                    <div>{stats?.data?.websiteViews ? stats?.data?.websiteViews : '*'}</div>
                  </div>
                </div>
              </Col>
            </Row>
          </Spin>
        </Card>
      </div>
    </>
  );
}

export default AdminWorkbench;
