import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect, connect, history } from 'umi';
import { stringify } from 'querystring';
import { ConnectState, ConnectProps } from '@/models/connect';
import { CurrentUser } from '@/models/user';

interface SecurityLayoutProps extends ConnectProps {
  loading?: boolean;
  currentUser?: CurrentUser;
}

interface SecurityLayoutState {
  isReady: boolean;
}

class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  state: SecurityLayoutState = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'account/FetchCurrent',
      });
    }
  }

  render() {
    const { isReady } = this.state;
    const { children, loading, currentUser } = this.props;
    // You can replace it to your authentication rule (such as check token exists)
    const isLogin = currentUser && currentUser.username;
    const queryString = stringify({
      redirect: window.location.href,
    });

    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }
    console.log(history.location.pathname);
    console.log(history.location.search);
    console.log(history.location.hash);
    console.log('window.location.pathname', window.location.pathname, queryString);
    if (!isLogin && history.location.pathname !== '/auth/login') {
      return <Redirect to={`/auth/login?${queryString}`} />;
    }
    return children;
  }
}

export default connect(({ account, loading }: ConnectState) => ({
  currentUser: account.currentUser,
  loading: loading.models.account,
}))(SecurityLayout);
