import React from 'react';
import { Redirect, connect } from 'umi';
import Authorized from '@/utils/Authorized';
import { getRouteAuthority } from '@/utils/utils';
import { ConnectProps, ConnectState, UserModelState } from '@/models/connect';

interface AuthComponentProps extends ConnectProps {
  account: UserModelState;
}

const AuthComponent: React.FC<AuthComponentProps> = ({
  children,
  route = {
    routes: [],
  },
  location = {
    pathname: '',
  },
  account,
}) => {
  const { currentUser } = account;
  const { routes = [] } = route;
  const isLogin = currentUser && currentUser.username;
  return (
    <Authorized
      authority={getRouteAuthority(location.pathname, routes) || ''}
      noMatch={isLogin ? <Redirect to="/exception/403" /> : <Redirect to="/auth/login" />}
    >
      {children}
    </Authorized>
  );
};

export default connect(({ account }: ConnectState) => ({
  account,
}))(AuthComponent);
