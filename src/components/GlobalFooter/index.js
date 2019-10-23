import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

const GlobalFooter = ({ className, copyright }) => {
  const clsString = classNames(styles.globalFooter, className);
  return (
    <footer className={clsString}>
      {copyright && <div className={styles.copyright}>{copyright}</div>}
    </footer>
  );
};

export default GlobalFooter;
