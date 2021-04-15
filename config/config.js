// https://umijs.org/config/
import { defineConfig, utils } from 'umi';
import pageRoutes from './router.config';
import webpackPlugin from './plugin.config';
import defaultSettings from './defaultSettings';

import myThemeConfig from './myThemeConfig';
const { REACT_APP_ENV } = process.env;
const ttt = process.env;
const { pwa, iconfontUrl } = defaultSettings;
const { winPath } = utils;

export default defineConfig({
  // add for transfer to umi
  hash: true,
  antd: {},
  base: '/front',
  publicPath: '/front/static/',
  favicon: REACT_APP_ENV ? '/favicon.png' : '/front/static/favicon.png',
  // dva: {
  //   hmr: true,
  // },
  layout: {
    name: ' ', //南京博纳德网络科技有限公司
    logo: 'http://localhost/logo_txt_white.png',
    locale: false,
    collapsedButtonRender: false,
    iconfontUrl,
    fixedHeader: false,
    ...defaultSettings,
  },
  request: {
    dataField: 'data',
  },
  locale: {
    default: 'zh-CN',
    baseNavigator: false,
  },
  //dynamicImport: {
  // 无需 level, webpackChunkName 配置
  // loadingComponent: './components/PageLoading/index'
  // loading: '@/components/PageLoading/index',
  //},

  pwa,
  targets: {
    ie: 11,
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
  },
  // 路由配置
  routes: pageRoutes,
  theme: myThemeConfig, // 自定义主题
  externals: {
    '@antv/data-set': 'DataSet',
  },
  proxy: {
    '/api': {
      target: 'http://localhost:9000/',
      changeOrigin: true,
      // pathRewrite: {
      //   '^/api': '',
      // },
    },
  },
  ignoreMomentLocale: true,
  lessLoader: {
    javascriptEnabled: true,
  },
  cssLoader: {
    modules: {
      getLocalIdent: (context, _, localName) => {
        if (
          context.resourcePath.includes('node_modules') ||
          context.resourcePath.includes('ant.design.pro.less') ||
          context.resourcePath.includes('global.less')
        ) {
          return localName;
        }
        const match = context.resourcePath.match(/src(.*)/);
        if (match && match[1]) {
          const antdProPath = match[1].replace('.less', '');

          const arr = winPath(antdProPath)
            .split('/')
            .map(a => a.replace(/([A-Z])/g, '-$1'))
            .map(a => a.toLowerCase());
          return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
        }

        return localName;
      },
    },
  },
  manifest: {
    basePath: '/',
  },

  chainWebpack: webpackPlugin,
  // cssnano: {
  //   mergeRules: false,
  // },
  // extraBabelIncludes: [/node_modules[\\/][\\@]uform[\\/]antd[\\/]esm/],
  // manifest: {
  //   name: 'ledi',
  //   background_color: '#FFF',
  //   description: 'bonado web train',
  //   display: 'standalone',
  //   start_url: '/index.html',
  //   icons: [
  //     {
  //       src: '/favicon.png',
  //       sizes: '48x48',
  //       type: 'image/png',
  //     },
  //   ],
  // },
});
