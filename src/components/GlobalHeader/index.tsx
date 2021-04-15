import React from 'react';

import { useModel } from 'umi';
import AvatarDropdown from './AvatarDropdown';
// import HeaderSearch from '../HeaderSearch'
// import SelectLang from '../SelectLang'
import NoticeIconView from './NoticeIconView';
import styles from './index.less';

const GlobalHeaderRight = props => {
  const { settings } = useModel('settings');

  const { navTheme: theme, layout } = settings;
  let className = styles.right;
  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <NoticeIconView />
      <AvatarDropdown menu {...props} />
    </div>
  );
};

export default GlobalHeaderRight;
