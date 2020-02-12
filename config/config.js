// https://umijs.org/config/
// import os from 'os';
// import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import pageRoutes from './router.config';
import webpackPlugin from './plugin.config';
// import defaultSettings from '../src/defaultSettings';
import myThemeConfig from './myThemeConfig';

export default {
  // add for transfer to umi
  base: '/front',
  // runtimePublicPath: true,
  // publicPath: '/front/',
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          hmr: true,
        },
        targets: {
          ie: 11,
        },
        locale: {
          // default false
          enable: false,
          // default zh-CN
          default: 'zh-CN',
          // default true, when it is true, will use `navigator.language` overwrite default
          baseNavigator: false,
        },
        // dynamicImport: {
        //   loadingComponent: './components/PageLoading/index',
        //   webpackChunkName: true,
        //   level: 3,
        // },
        // ...(!process.env.TEST && os.platform() === 'darwin'
        //   ? {
        //       dll: {
        //         include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
        //         exclude: ['@babel/runtime'],
        //       },
        //     }
        //   : {}),
      },
    ],
  ],
  targets: {
    ie: 11,
  },
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
  },
  // 路由配置
  routes: pageRoutes,
  theme: myThemeConfig, // 自定义主题
  // {   'primary-color': defaultSettings.primaryColor, },
  externals: {
    '@antv/data-set': 'DataSet',
  },

  uglifyJSOptions(opts) {
    if (process.env.NODE_ENV !== 'production') {
      const optss = opts;
      optss.uglifyOptions.compress.warnings = true;
      optss.uglifyOptions.compress.drop_console = true;
      optss.uglifyOptions.compress.drop_debugger = true;
      return optss;
    }
    return opts;
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
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, localIdentName, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('web.less') ||
        context.resourcePath.includes('global.less')
      ) {
        // console.log('localName1:', context.resourcePath.includes('node_modules'));
        return localName;
      }
      const match = context.resourcePath.match(/src(.*)/);
      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        // console.log('antdProPath:', antdProPath);
        const arr = antdProPath
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        // console.log('localName3:', `web${arr.join('-')}-${localName}`.replace(/--/g, '-'));
        return `web${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }
      // console.log('localName2:', localName);
      return localName;
    },
  },
  manifest: {
    name: 'ledi',
    background_color: '#FFF',
    description: 'bonado web train',
    display: 'standalone',
    start_url: '/index.html',
    icons: [
      {
        src: '/favicon.png',
        sizes: '48x48',
        type: 'image/png',
      },
    ],
  },

  chainWebpack: webpackPlugin,
  // cssnano: {
  //   mergeRules: false,
  // },
  extraBabelIncludes: [/node_modules[\\/][\\@]uform[\\/]antd[\\/]esm/],
  // exportStatic: true,
};
