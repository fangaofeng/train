import React, { PureComponent } from 'react';
import { formatMessage } from 'umi/locale';
import { Tag } from 'antd';
import moment from 'moment';

import NoticeIcon from '../NoticeIcon';
// import HeaderSearch from '../HeaderSearch';
// import SelectLang from '../SelectLang';
import styles from './index.less';

export default class GlobalHeaderRight extends PureComponent {
  getNoticeData() {
    const {
      notices: { results, count },
    } = this.props;
    // console.log(results);
    if (count === 0) {
      return {};
    }
    const newNotices = results.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.timestamp) {
        newNotice.datetime = moment(notice.timestamp).fromNow();
      }
      if (newNotice.id) {
        newNotice.key = newNotice.id;
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
    // return groupBy(newNotices, 'type');
  }

  render() {
    const {
      currentUser,
      fetchingNotices,
      onNoticeVisibleChange,
      // onMenuClick,
      onLogOut,
      onNoticeClear,
      theme,
    } = this.props;
    // const menu = (

    const noticeData = this.getNoticeData();
    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }
    return (
      <div className={className}>
        {/* <HeaderSearch
          className={`${styles.action} ${styles.search}`}
          placeholder={formatMessage({ id: 'component.globalHeader.search' })}
          dataSource={[
            formatMessage({ id: 'component.globalHeader.search.example1' }),
            formatMessage({ id: 'component.globalHeader.search.example2' }),
            formatMessage({ id: 'component.globalHeader.search.example3' }),
          ]}
          onSearch={value => {
            console.log('input', value); // eslint-disable-line
          }}
          onPressEnter={value => {
            console.log('enter', value); // eslint-disable-line
          }}
        />
        <Tooltip title={formatMessage({ id: 'component.globalHeader.help' })}>
          <a
            target="_blank"
            href="https://pro.ant.design/docs/getting-started"
            rel="noopener noreferrer"
            className={styles.action}
          >
            <Icon type="question-circle-o" />
          </a>
        </Tooltip> */}
        <NoticeIcon
          className={styles.action}
          count={currentUser.notifyCount}
          // count={count}
          onItemClick={(item, tabProps) => {
            console.log(item, tabProps); // eslint-disable-line
          }}
          locale={{
            emptyText: formatMessage({ id: 'component.noticeIcon.empty' }),
            clear: formatMessage({ id: 'component.noticeIcon.clear' }),
            viewMore: formatMessage({ id: 'component.noticeIcon.view-more' }),
          }}
          onClear={onNoticeClear}
          onPopupVisibleChange={onNoticeVisibleChange}
          loading={fetchingNotices}
          popupAlign={{ offset: [20, -16] }}
        >
          <NoticeIcon.Tab
            list={noticeData}
            title={formatMessage({ id: 'component.globalHeader.notification' })}
            name="notification"
            emptyText={formatMessage({ id: 'component.globalHeader.notification.empty' })}
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
            showViewMore
          />
          {/* <NoticeIcon.Tab
            list={noticeData.message}
            title={formatMessage({ id: 'component.globalHeader.message' })}
            name="message"
            emptyText={formatMessage({ id: 'component.globalHeader.message.empty' })}
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
          />
          <NoticeIcon.Tab
            list={noticeData.event}
            title={formatMessage({ id: 'component.globalHeader.event' })}
            name="event"
            emptyText={formatMessage({ id: 'component.globalHeader.event.empty' })}
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
          /> */}
        </NoticeIcon>
        {/* <span style={{cursor:'unset'}} className={styles.action}>|</span>
        {currentUser.name ? (
          // <Dropdown overlay={menu}>
          //   <span className={`${styles.action} ${styles.account}`}>
          //     <Avatar
          //       size="small"
          //       className={styles.avatar}
          //       src={currentUser.avatar}
          //       alt="avatar"
          //     />
          //     <span className={styles.name}>{currentUser.name}</span>
          //   </span>
          // </Dropdown>
          <span style={{cursor:'unset'}} className={`${styles.action} ${styles.account}`}>
            {
              currentUser.thumbnail?
                <Avatar
                  size="small"
                  className={styles.avatar}
                  src={currentUser.thumbnail}
                  alt="avatar"
                />
              :
                <Avatar
                  size="small"
                  className={styles.avatar}
                  src={require('@/assets/images/SiderMenu/avatar_default_big.png')}
                  alt="avatar"
                />
            }
            <span style={{cursor:'unset'}} className={styles.name}>{currentUser.name}</span>
          </span>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )} */}
        <span className={styles.action}>|</span>
        <span className={styles.action} onClick={onLogOut} title="点击退出登录">
          退出
        </span>
        {/* <SelectLang className={styles.action} /> */}
      </div>
    );
  }
}
