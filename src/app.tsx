import React from 'react';
import RightContent from '@/components/GlobalHeader';
import tokenmanager from './utils/token';
import { history, RequestConfig, request as requestservice, Link } from 'umi';
import { configService, accountService } from '@/services';
import { ILayoutRuntimeConfig } from '@umijs/plugin-layout';
import { BasicLayoutProps, DefaultFooter } from '@ant-design/pro-layout';
import style from './global.less';

export const request: RequestConfig = {
  timeout: 6000,
  prefix: '/api',
  errorConfig: {
    adaptor: resData => ({
      // ...resData,
      success: resData?.status === 'ok' || false,
      errorMessage: resData?.detail || 'unknow error',
      showType: 2,
    }),
    errorPage: '/exception/404',
  },
  middlewares: [],
};

export async function getInitialState() {
  const token = tokenmanager.get();
  const {
    // @ts-ignore
    location: { pathname },
  } = history;
  const loginPathName = '/auth/login';
  // return { currentrole: 'admin', uploadurl: {} };
  // 未登录的情况
  if (!token) {
    if (pathname !== loginPathName) {
      // @ts-ignore
      history.push({
        pathname: loginPathName,
        query: {
          redirect: pathname,
        },
      });
    }
    return {
      currentUser: {
        avatar: '',
        name: '',
        username: null,
        currentrole: null,
      },
    };
  }

  const { data: currentUser } = await requestservice(accountService.getInfo());
  const { data: uploadurl } = await requestservice(configService.getuploadurl());
  return { currentUser, uploadurl };
}

export const layout: ILayoutRuntimeConfig & BasicLayoutProps = {
  className: style.header,
  rightRender: initialState => <RightContent {...initialState} />,
  breadcrumbRender: (routers = []) => [
    {
      path: '/',
      breadcrumbName: '首页',
    },
    ...routers,
  ],
  itemRender: (route, params, routes, paths) => {
    const first = routes.indexOf(route) === 0;
    return first ? (
      <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
    ) : (
      <span>{route.breadcrumbName}</span>
    );
  },
  footerRender: props => (
    <DefaultFooter copyright={props.companyband} links={[]}>
      console.log(props)
    </DefaultFooter>
  ),
  contentStyle: {
    // padding: '10px 10px 0 10px',
    minHeight: 'calc(100vh - 64px)',
  },
};
