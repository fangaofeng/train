import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { List, Button } from 'antd';
import moment from 'moment';
import { announcementService } from '@/services';
import { Link, history, Access, useAccess } from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import SelfCard from '@/components/Workbench/selfCard';

import AdminBoard from './admin';
import StudentBoard from './student';
import TrainmanagerBoard from './trainmanager';

import styles from './Workbench.less';

function Workbench() {
  const [announcementItemKey, setItemKey] = useState(0);
  const { data, loading } = announcementService.listRequest({ current: 1, pageSize: 5 });
  const announcementList = data?.list || [];
  const access = useAccess();

  // 跳转页面
  const btnChangePage = key => {
    switch (key) {
      case 'announcement':
        history.push('/announcement/create');
        break;

      default:
        break;
    }
  };

  return (
    <GridContent>
      <div>
        <SelfCard
          title="平台公告"
          extra={
            access?.department ? (
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
              loading={loading}
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
          <Access accessible={access.department} fallback="">
            <Button
              type="dashed"
              style={{ width: '100%', marginTop: 20, marginBottom: 20 }}
              icon={<PlusOutlined />}
              onClick={() => {
                btnChangePage('announcement');
              }}
              className="ant-btn-upload"
            >
              新增公告
            </Button>
          </Access>
        </SelfCard>
        <Access accessible={access?.department} fallback="">
          <AdminBoard />
        </Access>
        <Access accessible={access?.groupmanager} fallback="">
          <TrainmanagerBoard />
        </Access>
        <Access accessible={access?.myStudyManager} fallback="">
          <StudentBoard />
        </Access>
      </div>
    </GridContent>
  );
}

export default Workbench;
