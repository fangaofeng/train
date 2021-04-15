import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu } from 'antd';

import { formatMessage, FormattedMessage, useModel, history } from 'umi';
import React from 'react';

// eslint-disable-next-line import/no-unresolved
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

function AvatarDropdown(props) {
  const { menu, currentUser } = props;
  const { logout } = useModel('account');
  const onMenuClick = event => {
    const { key } = event;

    if (key === 'logout') {
      logout();
      history.push('/auth/login');
    }
  };

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          <FormattedMessage id="menu.account.center" defaultMessage="account center" />
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          <FormattedMessage id="menu.account.settings" defaultMessage="account settings" />
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="logout">
        <LogoutOutlined />
        <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={currentUser?.avatar} alt="avatar" />
        <span className={styles.name}>{currentUser?.name}</span>
      </span>
    </HeaderDropdown>
  );
  // return currentUserLoading === true ? (
  //   <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
  // ) : (
  //   <HeaderDropdown overlay={menuHeaderDropdown}>
  //     <span className={`${styles.action} ${styles.account}`}>
  //       <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
  //       <span className={styles.name}>{currentUser.name}</span>
  //     </span>
  //   </HeaderDropdown>
  // );
}

export default AvatarDropdown;
// export default AvatarDropdown;
