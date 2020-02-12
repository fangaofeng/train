import React, { Component } from 'react';
import { Tag, message } from 'antd';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import moment from 'moment';
import router from 'umi/router';

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
// }

class GlobalHeaderRight extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        payload: {
          unread: 'true', // id
        },
        type: 'account/fetchNotices',
      });
    }
  }

  changeReadState = clickedItem => {
    const { id } = clickedItem;
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'account/changeNoticeReadState',
        payload: id,
      });
    }
  };

  handleNoticeClear = (title, key) => {
    const { dispatch } = this.props;
    message.success(`${formatMessage({ id: 'component.noticeIcon.cleared' })} ${title}`);
    if (dispatch) {
      dispatch({
        type: 'account/clearNotices',
        payload: key,
      });
    }
  };

  onViewMore = () => {
    router.push('/personalCenter/center/notifications');
  };

  getNoticeData = () => {
    const {
      notices: { results = [], count },
    } = this.props;
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

  render() {
    const { fetchingNotices, onNoticeVisibleChange, unreadnoticescount } = this.props;
    const noticeData = this.getNoticeData();

    return (
      <NoticeIcon
        className={styles.action}
        count={unreadnoticescount}
        onItemClick={item => {
          this.changeReadState(item);
        }}
        loading={fetchingNotices}
        clearText={formatMessage({ id: 'component.noticeIcon.clear' })}
        viewMoreText={formatMessage({ id: 'component.noticeIcon.view-more' })}
        onClear={this.handleNoticeClear}
        onPopupVisibleChange={onNoticeVisibleChange}
        onViewMore={this.onViewMore}
        clearClose
      >
        <NoticeIcon.Tab
          tabKey="notification"
          // count={unreadMsg.notification}
          list={noticeData}
          title={formatMessage({ id: 'component.globalHeader.notification' })}
          emptyText={formatMessage({ id: 'component.globalHeader.notification.empty' })}
          showViewMore
        />
      </NoticeIcon>
    );
  }
}

export default connect(({ account, global, loading }) => ({
  collapsed: global.collapsed,
  fetchingMoreNotices: loading.effects['account/fetchMoreNotices'],
  fetchingNotices: loading.effects['account/fetchNotices'],
  notices: account.notices,
  unreadnoticescount: account.unreadnoticescount,
}))(GlobalHeaderRight);
