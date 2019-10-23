import React, { PureComponent, Suspense } from 'react';
import { Layout, Avatar } from 'antd';
import classNames from 'classnames';
import Link from 'umi/link';
import styles from './index.less';
import PageLoading from '../PageLoading';
import { getDefaultCollapsedSubMenus } from './SiderMenuUtils';
import { title } from '../../defaultSettings';

const BaseMenu = React.lazy(() => import('./BaseMenu'));
const { Sider } = Layout;
const bigavatar = require('@/assets/images/SiderMenu/avatar_default_big.png');

let firstMount = true;

export default class SiderMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: getDefaultCollapsedSubMenus(props),
    };
  }

  componentDidMount() {
    firstMount = false;
  }

  static getDerivedStateFromProps(props, state) {
    const { pathname, flatMenuKeysLen } = state;
    if (props.location.pathname !== pathname || props.flatMenuKeys.length !== flatMenuKeysLen) {
      return {
        pathname: props.location.pathname,
        flatMenuKeysLen: props.flatMenuKeys.length,
        openKeys: getDefaultCollapsedSubMenus(props),
      };
    }
    return null;
  }

  isMainMenu = key => {
    const { menuData } = this.props;
    return menuData.some(item => {
      if (key) {
        return item.key === key || item.path === key;
      }
      return false;
    });
  };

  handleOpenChange = openKeys => {
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys],
    });
  };

  render() {
    const { currentUser } = this.props;
    const { logo, collapsed, onCollapse, fixSiderbar, theme, isMobile } = this.props;
    const { openKeys } = this.state;
    const defaultProps = collapsed ? {} : { openKeys };

    const siderClassName = classNames(styles.sider, {
      [styles.fixSiderBar]: fixSiderbar,
      [styles.light]: theme === 'light',
    });
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={collapse => {
          if (firstMount || !isMobile) {
            onCollapse(collapse);
          }
        }}
        width={256}
        theme={theme}
        className={siderClassName}
      >
        <div className={styles.logo} id="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>{title}</h1>
          </Link>
        </div>
        {collapsed ? null : (
          <div className={styles.customer_avatar}>
            {currentUser.thumbnail ? (
              // <img src={currentUser.thumbnail} alt="用户头像" />
              <Avatar src={currentUser.thumbnail} size={100} />
            ) : (
              <Avatar src={bigavatar} size={100} />
            )
            // <img src={require('@/assets/images/SiderMenu/avatar_default_big.png')} alt="默认头像" />
            }
            <div>{currentUser.username}</div>
            <div>{currentUser.employee_position}</div>
          </div>
        )}
        <Suspense fallback={<PageLoading />}>
          <BaseMenu
            {...this.props}
            mode="inline"
            handleOpenChange={this.handleOpenChange}
            onOpenChange={this.handleOpenChange}
            style={{ width: '100%' }}
            {...defaultProps}
          />
        </Suspense>
      </Sider>
    );
  }
}
