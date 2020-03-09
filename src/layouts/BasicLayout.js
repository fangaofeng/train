/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, {
  // MenuDataItem,
  // BasicLayoutProps as ProLayoutProps,
  // Settings,
  DefaultFooter,
  SettingDrawer,
} from '@ant-design/pro-layout';

import React, { useEffect } from 'react';
import { Link, formatMessage, Redirect } from 'umi';
import { connect } from 'dva';
import Authorized from '@/utils/Authorized';
import { getAuthority } from '@/utils/authority';

import RightContent from '@/components/GlobalHeader/RightContent';
import logo from '../assets/images/Header/logo.png';

const menuDataRender = menuList =>
  menuList.map(item => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : [],
    };
    return Authorized.check(item.authority, localItem, null);
  });

const footerRender = settings => {
  return <DefaultFooter copyright={settings.companyband} links={[]} />;
};

const BasicLayout = props => {
  const { dispatch, children, settings } = props;
  const authority = getAuthority() || undefined;
  /**
   * constructor
   */

  useEffect(() => {
    if (authority && dispatch) {
      dispatch({
        type: 'account/FetchCurrent',
      });
      dispatch({
        type: 'settings/getSetting',
      });
      dispatch({
        type: 'settings/GetUploadurl',
      });
    }
  }, []);

  /**
   * init variables
   */
  const handleMenuCollapse = payload => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };

  return (
    // eslint-disable-next-line react/jsx-fragments
    <>
      <ProLayout
        className="chidrendiv"
        isChildrenLayout={false}
        logo={logo}
        onCollapse={handleMenuCollapse}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || menuItemProps.children) {
            return defaultDom;
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: formatMessage({
              id: 'menu.home',
              defaultMessage: 'Home',
            }),
          },
          ...routers,
        ]}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        footerRender={tsettings => footerRender(tsettings)}
        menuDataRender={menuDataRender}
        formatMessage={formatMessage}
        rightContentRender={rightProps => <RightContent {...rightProps} />}
        {...props}
        {...settings}
      >
        {/* <Authorized>{children}</Authorized> */}

        {children}
      </ProLayout>
      <SettingDrawer
        settings={settings}
        onSettingChange={config =>
          dispatch({
            type: 'settings/changeSetting',
            payload: config,
          })
        }
      />
    </>
  );
};

export default connect(({ global, settings, account }) => ({
  collapsed: global.collapsed,
  settings,
  currentUser: account.currentUser,
}))(BasicLayout);
