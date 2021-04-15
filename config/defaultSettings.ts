import { MenuTheme } from 'antd/es/menu/MenuContext';

export type ContentWidth = 'Fluid' | 'Fixed';

export interface DefaultSettings {
  /**
   * theme for nav menu
   */
  navTheme: MenuTheme;
  /**
   * primary color of ant design
   */
  primaryColor: string;
  /**
   * nav menu position: `sidemenu` or `topmenu`
   */
  layout: 'sidemenu' | 'topmenu';
  /**
   * layout of content: `Fluid` or `Fixed`, only works when layout is topmenu
   */
  contentWidth: ContentWidth;
  /**
   * sticky header
   */
  fixedHeader: boolean;
  /**
   * auto hide header
   */
  autoHideHeader: boolean;
  /**
   * sticky siderbar
   */
  fixSiderbar: boolean;
  menu: { locale: boolean };

  pwa: boolean;
  // Your custom iconfont Symbol script Url
  // eg：//at.alicdn.com/t/font_1039637_btcrd5co4w.js
  // 注意：如果需要图标多色，Iconfont 图标项目里要进行批量去色处理
  // Usage: https://github.com/ant-design/ant-design-pro/pull/3517
  iconfontUrl: string;
  colorWeak: boolean;
  companyband: string;
}

export default {
  navTheme: 'dark',
  primaryColor: '#1890FF',
  layout: 'sidemenu',
  contentWidth: 'Fluid',
  fixedHeader: false,
  autoHideHeader: false,
  fixSiderbar: false,
  colorWeak: false,
  collapsedButtonRender: false,
  menu: {
    locale: false,
  },

  pwa: false,
  iconfontUrl: 'https://at.alicdn.com/t/font_1522724_lgyw7kkfn58.js',

  company: '南京博纳德网络科技有限公司',
  companyband: '2019 南京博纳德网络科技有限公司',
} as DefaultSettings;

// uploadurl: {
//   course: 'http://localhost:8000/api/course/upload',
//   paper: 'http://localhost:8000/api/paper/upload',
//   avatar: 'http://localhost:8000/api/account/avatar',
//   org: 'http://localhost:8000/api/orgs/upload',
//   user: 'http://localhost:8000/api/user/upload',
//   blogCover: 'http://localhost:8000/', // 假的
// },
