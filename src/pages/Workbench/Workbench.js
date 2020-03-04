import React, { useState, useEffect } from 'react';
import { List, Button } from 'antd';
import moment from 'moment';
// import classNames from 'classnames';
import Link from 'umi/link';
import { GridContent } from '@ant-design/pro-layout';
// import moment from 'moment';
import SelfCard from '@/components/Workbench/selfCard';
import { useSelector, useDispatch } from 'dva';
import Authorized from '@/utils/Authorized';
import { getAuthority } from '@/utils/authority';
import router from 'umi/router';
import AdminBoard from './admin';
import StudentBoard from './student';
import TrainmanagerBoard from './trainmanager';

import styles from './Workbench.less';

function Workbench() {
  const announcementListAction = 'workbench/getAnnouncement';

  const announcementList = useSelector(store => store.workbench.announcement);
  const announcementListLoading = useSelector(
    store => store.loading.effects[announcementListAction]
  );
  const [announcementItemKey, setItemKey] = useState(0);
  const storedispatch = useDispatch();

  useEffect(() => {
    storedispatch({
      type: announcementListAction,
    });
  }, []);

  // 跳转页面
  const btnChangePage = key => {
    // console.log(key);
    switch (key) {
      case 'announcement':
        router.push('/announcement/create');
        break;

      default:
        break;
    }
  };

  const currentUserFlag = getAuthority();
  return (
    <GridContent>
      <div>
        <SelfCard
          title="平台公告"
          extra={
            currentUserFlag[0] === 'admin' ? (
              <Link to="/announcement/ViewPage">查看更多&gt;&gt;</Link>
            ) : (
              <Link to="/announcementviewlist">查看更多&gt;&gt;</Link>
            )
          }
        >
          <div className={styles.Notice_Card_contend}>
            <div className={styles.notice_left}>
              {announcementList.length > 0 ? (
                <img src={announcementList[announcementItemKey].cover} alt="" />
              ) : null}
            </div>
            <List
              className={styles.workbench}
              dataSource={announcementList}
              loading={announcementListLoading}
              renderItem={(item, k) => (
                <List.Item
                  title={item.title}
                  className={k === announcementItemKey ? styles.active_listItem : ''}
                  onMouseEnter={setItemKey(k)}
                >
                  <List.Item.Meta
                    title={
                      <div>
                        <span className={styles.listCircle} />
                        <Link to={`/announcement/detail/${item.id}`}>{item.title}</Link>
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
                btnChangePage('announcement');
              }}
              className="ant-btn-upload"
            >
              新增公告
            </Button>
          </Authorized>
        </SelfCard>

        <Authorized authority="admin">
          <AdminBoard />
        </Authorized>
        <Authorized authority="trainmanager">
          {' '}
          <TrainmanagerBoard />{' '}
        </Authorized>
        <Authorized authority="stu">
          {' '}
          <StudentBoard />
        </Authorized>
      </div>
    </GridContent>
  );
}

export default Workbench;
