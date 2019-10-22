import React from 'react';
import { Layout, BackTop } from 'antd';
import DocumentTitle from 'react-document-title';
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import { connect } from 'dva';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import pathToRegexp from 'path-to-regexp';
import { enquireScreen, unenquireScreen } from 'enquire-js';
// import { formatMessage } from 'umi/locale';
import SiderMenu from '@/components/SiderMenu';
import Authorized from '@/utils/Authorized';
import SettingDrawer from '@/components/SettingDrawer';
// import logo from '../assets/logo.svg';
import logo from '../assets/images/Header/logo.png';
import Footer from './Footer';
import Header from './Header';
import Context from './MenuContext';
import Exception403 from '../pages/Exception/403';

const { Content } = Layout;

// Conversion router to menu.
function formatter(data, parentAuthority) {
  return data
    .map(item => {
      if (!item.name || !item.path) {
        return null;
      }

      // let locale = 'menu';
      // if (parentName) {
      //   locale = `${parentName}.${item.name}`;
      // } else {
      //   locale = `menu.${item.name}`;
      // }

      const result = {
        ...item,
        // name: formatMessage({ id: locale, defaultMessage: item.name }),
        name: item.name,
        // locale,
        authority: item.authority || parentAuthority,
      };
      if (item.routes) {
        // const children = formatter(item.routes, item.authority, locale);
        const children = formatter(item.routes, item.authority);
        // Reduce memory usage
        result.children = children;
      }
      delete result.routes;
      return result;
    })
    .filter(item => item);
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

class BasicLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getPageTitle = memoizeOne(this.getPageTitle);
    this.getBreadcrumbNameMap = memoizeOne(this.getBreadcrumbNameMap, isEqual);
    this.breadcrumbNameMap = this.getBreadcrumbNameMap();
    this.matchParamsPath = memoizeOne(this.matchParamsPath, isEqual);
  }

  state = {
    rendering: true,
    isMobile: false,
    menuData: this.getMenuData(),
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
    dispatch({
      type: 'setting/getSetting',
    });
    dispatch({
      type: 'global/fetchNotices',
    });
    this.renderRef = requestAnimationFrame(() => {
      this.setState({
        rendering: false,
      });
    });
    this.enquireHandler = enquireScreen(mobile => {
      const { isMobile } = this.state;
      if (isMobile !== mobile) {
        this.setState({
          isMobile: mobile,
        });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { location } = this.props;
    // 当路由切换时,返回顶部
    if (location !== nextProps.location) {
      window.scrollTo(0, 0);
    }
  }

  componentDidUpdate(preProps) {
    // After changing to phone mode,
    // if collapsed is true, you need to click twice to display
    this.breadcrumbNameMap = this.getBreadcrumbNameMap();
    const { isMobile } = this.state;
    const { collapsed } = this.props;
    if (isMobile && !preProps.isMobile && !collapsed) {
      this.handleMenuCollapse(false);
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.renderRef);
    unenquireScreen(this.enquireHandler);
  }

  getContext() {
    const { location } = this.props;
    return {
      location,
      breadcrumbNameMap: this.breadcrumbNameMap,
    };
  }

  getMenuData() {
    const {
      route: { routes },
    } = this.props;
    return memoizeOneFormatter(routes);
  }

  /**
   * 获取面包屑映射
   * @param {Object} menuData 菜单配置
   */
  getBreadcrumbNameMap() {
    const routerMap = {};
    const mergeMenuAndRouter = data => {
      data.forEach(menuItem => {
        if (menuItem.children) {
          mergeMenuAndRouter(menuItem.children);
        }
        // Reduce memory usage
        routerMap[menuItem.path] = menuItem;
      });
    };
    mergeMenuAndRouter(this.getMenuData());
    return routerMap;
  }

  // 新增方法
  getAllRoutes = (data, parentAuthority) =>
    data
      .map(item => {
        if (!item.path) {
          return null;
        }

        const result = {
          ...item,
          // name:item.name || '',
          authority: item.authority || parentAuthority,
        };

        if (item.routes) {
          const children = this.getAllRoutes(item.routes, item.authority || parentAuthority);
          // Reduce memory usage
          result.children = children;
        }
        delete result.routes;
        return result;
      })
      .filter(item => item);

  // 新增方法
  getAllRoutesToJson() {
    const {
      route: { routes },
    } = this.props;
    const routerMap = {};
    // console.log('--------routes----------')
    // console.log(routes)
    // console.log('--------routes----------')
    const mergeMenuAndRouter = data => {
      data.forEach(menuItem => {
        if (menuItem.children) {
          mergeMenuAndRouter(menuItem.children);
        }
        routerMap[menuItem.path] = menuItem;
      });
    };
    mergeMenuAndRouter(this.getAllRoutes(routes));
    // console.log('--------------routerMap--------------');
    // console.log(routerMap);
    // console.log('--------------routerMap--------------');
    return routerMap;
  }

  // 新增方法
  matchParamsPath = pathname => {
    const obj = this.getAllRoutesToJson();
    const pathKey = Object.keys(obj).find(key => pathToRegexp(key).test(pathname));
    return obj[pathKey];
  };

  // 新增方法
  getPageTitle = pathname => {
    const currRouterData = this.matchParamsPath(pathname);

    if (!currRouterData) {
      // return 'Ant Design Pro';
      return '南京博纳德网络科技有限公司';
    }
    const message = currRouterData.name
      ? `${currRouterData.name} - 南京博纳德网络科技有限公司`
      : '南京博纳德网络科技有限公司';
    // return `${message} - Ant Design Pro`;
    // return `${message} - 南京博纳德网络科技有限公司`;
    return message;
  };

  // matchParamsPath = pathname => {
  //   const pathKey = Object.keys(this.breadcrumbNameMap).find(key =>
  //     pathToRegexp(key).test(pathname)
  //   );
  //   return this.breadcrumbNameMap[pathKey];
  // };

  // getPageTitle = pathname => {
  //   const currRouterData = this.matchParamsPath(pathname);

  //   if (!currRouterData) {
  //     // return 'Ant Design Pro';
  //     return '南京博纳德网络科技有限公司';
  //   }
  //   const message = formatMessage({
  //     id: currRouterData.locale || currRouterData.name,
  //     defaultMessage: currRouterData.name,
  //   });
  //   // return `${message} - Ant Design Pro`;
  //   return `${message} - 南京博纳德网络科技有限公司`;
  // };

  getLayoutStyle = () => {
    const { isMobile } = this.state;
    const { fixSiderbar, collapsed, layout } = this.props;
    if (fixSiderbar && layout !== 'topmenu' && !isMobile) {
      return {
        paddingLeft: collapsed ? '80px' : '256px',
      };
    }
    return null;
  };

  getContentStyle = () => {
    const { fixedHeader } = this.props;
    return {
      // margin: '24px 24px 0',
      margin: '20px 20px 0',
      paddingTop: fixedHeader ? 64 : 0,
    };
  };

  handleMenuCollapse = collapsed => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };

  renderSettingDrawer() {
    // Do not render SettingDrawer in production
    // unless it is deployed in preview.pro.ant.design as demo
    const { rendering } = this.state;
    if ((rendering || process.env.NODE_ENV === 'production') && process.env.APP_TYPE !== 'site') {
      return null;
    }
    return <SettingDrawer />;
  }

  render() {
    const {
      navTheme,
      layout: PropsLayout,
      children,
      location: { pathname },
    } = this.props;
    const { isMobile, menuData } = this.state;
    const isTop = PropsLayout === 'topmenu';
    const routerConfig = this.matchParamsPath(pathname);
    // console.log('----------routerConfig----------');
    // console.log(routerConfig);
    // console.log(routerConfig && routerConfig.authority);
    // console.log('----------routerConfig----------');
    const layout = (
      <Layout
        style={{
          ...this.getLayoutStyle(),
          minHeight: '100vh',
        }}
      >
        <Header
          menuData={menuData}
          handleMenuCollapse={this.handleMenuCollapse}
          logo={logo}
          isMobile={isMobile}
          {...this.props}
        />
        <Layout>
          {isTop && !isMobile ? null : (
            <SiderMenu
              logo={logo}
              Authorized={Authorized}
              theme={navTheme}
              onCollapse={this.handleMenuCollapse}
              menuData={menuData}
              isMobile={isMobile}
              {...this.props}
            />
          )}
          <Layout>
            <Content style={this.getContentStyle()}>
              <Authorized
                authority={routerConfig && routerConfig.authority}
                noMatch={<Exception403 />}
              >
                {children}
                <BackTop visibilityHeight={200} />
              </Authorized>
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </Layout>
    );
    return (
      <React.Fragment>
        <DocumentTitle title={this.getPageTitle(pathname)}>
          <ContainerQuery query={query}>
            {params => (
              <Context.Provider value={this.getContext()}>
                <div className={classNames(params)}>{layout}</div>
              </Context.Provider>
            )}
          </ContainerQuery>
        </DocumentTitle>
        {this.renderSettingDrawer()}
      </React.Fragment>
    );
  }
}

export default connect(({ global, setting }) => ({
  collapsed: global.collapsed,

  layout: setting.layout,
  ...setting,
}))(BasicLayout);
