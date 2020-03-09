import React from 'react';
import { useSelector } from 'dva';
// import { Icon, Tooltip } from 'antd';
// import { formatMessage } from 'umi'
import AvatarDropdown from './AvatarDropdown';
// import HeaderSearch from '../HeaderSearch'
// import SelectLang from '../SelectLang'
import NoticeIconView from './NoticeIconView';
// export type SiderTheme = 'light' | 'dark';
import styles from './index.less';

const GlobalHeaderRight = () => {
  const settings = useSelector(store => store.settings);
  // const currentUser = useSelector(store => store.account.currentUser);
  // const currentUserLoading = useSelector(store => store.loading.effects['account/FetchCurrent']);

  // const sotredispatch = useDispatch();
  const { navTheme: theme, layout } = settings;
  let className = styles.right;
  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <NoticeIconView />
      <AvatarDropdown menu />
      {}
      {/*         <span className={styles.action}>|</span>
        <span className={styles.action} onClick={onLogOut} title="点击退出登录">
          退出
        </span>
        <SelectLang className={styles.action} /> */}
    </div>
  );
};

export default GlobalHeaderRight;
