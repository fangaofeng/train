import React, { useEffect } from 'react';
import { Tag, message } from 'antd';
// import { connect } from 'dva';
import { formatMessage, history, useModel } from 'umi';
import moment from 'moment';

// eslint-disable-next-line import/no-unresolved
import NoticeIcon from '../NoticeIcon';
import styles from './index.less';

// export interface CurrentUser {
//   avatar?: string;
//   name?: string;
//   title?: string;
//   group?: string;
//   signature?: string;
//   tags?: {
//     key: string;
//     label: string;
//   }[];
//   userid?: string;
//   unreadnoticescount?: number;
// }

// export interface GlobalHeaderRightProps extends ConnectProps {
//   notices?: { results?: NoticeItem[]; count?: number };
//   currentUser?: CurrentUser;
//   fetchingNotices?: boolean;
//   onNoticeVisibleChange?: (visible: boolean) => void;
//   onNoticeClear?: (tabName?: string) => void;
//   unreadnoticescount?: number;
// }notices

const NoticeIconView = props => {
  const { notices, list, retrive, patch, bulkdel, clear } = useModel('notices');
  const { currentUser, unreadnoticescount, setCurrentUser, setUnreadnoticescount } = useModel(
    'account',
  );
  useEffect(() => {
    list.run({ unread: 'true' });
  }, []);

  const changeReadState = clickedItem => {
    const { id } = clickedItem;
    patch.run(id, { unread: 'false' });
  };

  const handleNoticeClear = (title, key) => {
    // message.success(`${formatMessage({ id: 'component.noticeIcon.cleared' })} ${title}`);
    clear.run();
  };

  const onViewMore = () => {
    history.push('/personalCenter/center/notifications');
  };

  const getNoticeData = () => {
    const { results = [], count } = notices;
    if (count === 0) {
      return [];
    }
    const newNotices = results.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.timestamp) {
        newNotice.datetime = moment(notice.timestamp).fromNow();
      }

      if (newNotice.verb && newNotice.level) {
        const color = {
          info: '',
          warning: 'blue',
          error: 'red',
          success: 'gold',
        }[newNotice.status];
        newNotice.verb = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.verb}
          </Tag>
        );
      }
      return newNotice;
    });
    return newNotices;
  };

  // render() {
  const { onNoticeVisibleChange } = props;
  //   const noticeData = this.getNoticeData();

  return (
    <NoticeIcon
      className={styles.action}
      count={unreadnoticescount}
      onItemClick={item => {
        changeReadState(item);
      }}
      loading={list.loading}
      clearText={formatMessage({ id: 'component.noticeIcon.clear' })}
      viewMoreText={formatMessage({ id: 'component.noticeIcon.view-more' })}
      onClear={handleNoticeClear}
      onPopupVisibleChange={onNoticeVisibleChange}
      onViewMore={onViewMore}
      clearClose
    >
      <NoticeIcon.Tab
        tabKey="notification"
        // count={unreadMsg.notification}
        list={notices.results}
        title={formatMessage({ id: 'component.globalHeader.notification' })}
        emptyText={formatMessage({ id: 'component.globalHeader.notification.empty' })}
        showViewMore
      />
    </NoticeIcon>
  );
};

export default NoticeIconView;
