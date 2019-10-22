import React, { PureComponent, Fragment } from 'react';
import { Popover, Icon, Tabs, Badge, Spin } from 'antd';
import classNames from 'classnames';
import router from 'umi/router';
import List from './NoticeList';
import styles from './index.less';

const { TabPane } = Tabs;

export default class NoticeIcon extends PureComponent {
  static Tab = TabPane;

  static defaultProps = {
    onItemClick: () => {},
    onPopupVisibleChange: () => {},
    onTabChange: () => {},
    onClear: () => {},
    loading: false,
    locale: {
      emptyText: 'No notifications',
      clear: 'Clear',
      viewMore: 'More',
    },
    emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg',
  };

  onItemClick = (item, tabProps) => {
    const { onItemClick } = this.props;
    onItemClick(item, tabProps);
  };

  onViewMore = () => {
    router.push('/personalCenter/center/articles');
  };

  onTabChange = tabType => {
    const { onTabChange } = this.props;
    onTabChange(tabType);
  };

  getNotificationBox() {
    const { children, loading, locale, onClear } = this.props;
    if (!children) {
      return null;
    }
    const panes = React.Children.map(children, child => {
      const { list, title, count, emptyText, emptyImage, showClear, showViewMore } = child.props;
      const len = list && list.length ? list.length : 0;
      const msgCount = count || count === 0 ? count : len;
      const localeTitle = locale[title] || title;
      const tabTitle = msgCount > 0 ? `${localeTitle} (${msgCount})` : localeTitle;
      return (
        <TabPane tab={tabTitle} key={title}>
          <List
            data={list}
            emptyImage={emptyImage}
            emptyText={emptyText}
            locale={locale}
            onClear={() => onClear(title)}
            onClick={item => this.onItemClick(item, child.props)}
            onViewMore={event => this.onViewMore(child.props, event)}
            showClear={showClear}
            showViewMore={showViewMore}
            title={title}
          />
        </TabPane>
      );
    });
    return (
      <Fragment>
        <Spin spinning={loading} delay={0}>
          <Tabs className={styles.tabs} onChange={this.onTabChange}>
            {panes}
          </Tabs>
        </Spin>
      </Fragment>
    );
  }

  render() {
    const { className, count, popupAlign, popupVisible, onPopupVisibleChange, bell } = this.props;
    const noticeButtonClass = classNames(className, styles.noticeButton);
    const notificationBox = this.getNotificationBox();
    const NoticeBellIcon = bell || <Icon type="bell" className={styles.icon} />;
    const trigger = (
      <span className={noticeButtonClass}>
        <Badge count={count} style={{ boxShadow: 'none' }} className={styles.badge}>
          {NoticeBellIcon}
        </Badge>
      </span>
    );
    if (!notificationBox) {
      return trigger;
    }
    const popoverProps = {};
    if ('popupVisible' in this.props) {
      popoverProps.visible = popupVisible;
    }
    return (
      <Popover
        placement="bottomRight"
        content={notificationBox}
        popupClassName={styles.popover}
        trigger="click"
        arrowPointAtCenter
        popupAlign={popupAlign}
        onVisibleChange={onPopupVisibleChange}
        {...popoverProps}
      >
        {trigger}
      </Popover>
    );
  }
}
