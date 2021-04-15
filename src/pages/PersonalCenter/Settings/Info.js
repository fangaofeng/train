import React, { useEffect, useState, useRef } from 'react';

import { history } from 'umi';
import { useUpdateEffect } from '@umijs/hooks';
import { Menu } from 'antd';
import { PageHeaderWrapper, GridContent } from '@ant-design/pro-layout';
import styles from './Info.less';

function Info(props) {
  const { match, location, children } = props;
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
  const [selectKey, setSelectKey] = useState(menuMap[key] ? key : 'base');
  const [mode, setMode] = useState('inline');
  const main = useRef();
  const resize = () => {
    if (!main) {
      return;
    }

    let mode = 'inline';
    const { offsetWidth } = main;

    if (offsetWidth > 400 && offsetWidth < 641) {
      mode = 'horizontal';
    }

    if (window.innerWidth < 768 && offsetWidth > 400) {
      mode = 'horizontal';
    }

    if (mode !== currentMode) {
      requestAnimationFrame(() => setMode({ mode }));
    }
  };

  useEffect(() => {
    window.addEventListener('resize', resize);
    resize();
  }, []);

  useUpdateEffect(() => {
    setSelectKey(menuMap[key] ? key : 'base');
  }, [key]);

  const getmenu = () => {
    return Object.keys(menuMap).map(item => <Menu.Item key={item}>{menuMap[item]}</Menu.Item>);
  };

  const getRightTitle = () => {
    return menuMap[selectKey];
  };

  const selectKeyf = ({ key }) => {
    history.push(`/personalCenter/settings/${key}`);
    setSelectKey(key);
  };

  return (
    <PageHeaderWrapper title="用户信息">
      <GridContent>
        <div className={styles.main} ref={main}>
          <div className={styles.leftmenu}>
            <Menu mode={mode} selectedKeys={[selectKey]} onClick={selectKeyf}>
              {getmenu()}
            </Menu>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>{getRightTitle()}</div>
            {children}
          </div>
        </div>
      </GridContent>
    </PageHeaderWrapper>
  );
}

export default Info;
