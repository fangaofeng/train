import { Avatar, Icon, Menu, Spin } from 'antd';

import { formatMessage, FormattedMessage } from 'umi';
import React from 'react';
import { history } from 'umi';
import { connect } from 'dva';
// eslint-disable-next-line import/no-unresolved
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

class AvatarDropdown extends React.Component {
  onMenuClick = event => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;
      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }

      return;
    }
    history.push(`/personalCenter/${key}`);
  };

  render() {
    const { currentUser, menu, currentUserLoading } = this.props;
    // console.log(this.props);
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="center">
            <Icon type="user" />
            <FormattedMessage id="menu.account.center" defaultMessage="account center" />
          </Menu.Item>
        )}
        {menu && (
          <Menu.Item key="settings">
            <Icon type="setting" />
            <FormattedMessage id="menu.account.settings" defaultMessage="account settings" />
          </Menu.Item>
        )}
        {menu && <Menu.Divider />}

        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );

    return currentUserLoading === true ? (
      <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
    ) : (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
          <span className={styles.name}>{currentUser.name}</span>
        </span>
      </HeaderDropdown>
    );
  }
}

export default connect(({ account, loading }) => ({
  currentUser: account.currentUser,
  currentUserLoading: loading.effects['account/FetchCurrent'],
}))(AvatarDropdown);
// export default AvatarDropdown;
