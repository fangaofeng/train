import React, { Component } from 'react';
import { connect } from 'dva';
import { history } from 'umi';
// import { formatMessage } from 'umi';
import { Menu } from 'antd';
import { PageHeaderWrapper, GridContent } from '@ant-design/pro-layout';
import styles from './Info.less';

const { Item } = Menu;

@connect(({ account }) => ({
  currentUser: account.currentUser,
}))
class Info extends Component {
  constructor(props) {
    super(props);
    const { match, location } = props;
    const menuMap = {
      base: '个人信息',
      // security: (
      //   <FormattedMessage id="app.settings.menuMap.security" defaultMessage="Security Settings" />
      // ),
      // binding: (
      //   <FormattedMessage id="app.settings.menuMap.binding" defaultMessage="Account Binding" />
      // ),
      notification: '通知',
    };
    const key = location.pathname.replace(`${match.path}/`, '');
    this.state = {
      mode: 'inline',
      menuMap,
      selectKey: menuMap[key] ? key : 'base',
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { match, location } = props;
    let selectKey = location.pathname.replace(`${match.path}/`, '');
    selectKey = state.menuMap[selectKey] ? selectKey : 'base';
    if (selectKey !== state.selectKey) {
      return { selectKey };
    }
    return null;
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  getmenu = () => {
    const { menuMap } = this.state;
    return Object.keys(menuMap).map(item => <Item key={item}>{menuMap[item]}</Item>);
  };

  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    return menuMap[selectKey];
  };

  selectKey = ({ key }) => {
    history.push(`/personalCenter/settings/${key}`);
    this.setState({
      selectKey: key,
    });
  };

  resize = () => {
    if (!this.main) {
      return;
    }

    const { mode: currentMode } = this.state;

    let mode = 'inline';
    const { offsetWidth } = this.main;

    if (offsetWidth > 400 && offsetWidth < 641) {
      mode = 'horizontal';
    }

    if (window.innerWidth < 768 && offsetWidth > 400) {
      mode = 'horizontal';
    }

    if (mode !== currentMode) {
      requestAnimationFrame(() => this.setState({ mode }));
    }
  };

  render() {
    const { children } = this.props;
    // if (!currentUser.userid) {
    //   return '';
    // }
    const { mode, selectKey } = this.state;
    return (
      <PageHeaderWrapper title="用户信息">
        <GridContent>
          <div
            className={styles.main}
            ref={ref => {
              this.main = ref;
            }}
          >
            <div className={styles.leftmenu}>
              <Menu mode={mode} selectedKeys={[selectKey]} onClick={this.selectKey}>
                {this.getmenu()}
              </Menu>
            </div>
            <div className={styles.right}>
              <div className={styles.title}>{this.getRightTitle()}</div>
              {children}
            </div>
          </div>
        </GridContent>
      </PageHeaderWrapper>
    );
  }
}

export default Info;
