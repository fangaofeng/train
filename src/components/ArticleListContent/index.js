import React from 'react';
// import moment from 'moment';

import styles from './index.less';

const ArticleListContent = ({ data: { body } }) => (
  <div className={styles.listContent}>
    <div className={styles.body}>{body}</div>
    {/* <div className={styles.extra}>
      <Avatar src={avatar} size="small" /> pub_time, avatar, owner, href

      <Link to={href}>{owner}</Link>  <a href={href}>{href}</a>
      <div> 时间： {moment(pubTime).format('YYYY-MM-DD HH:mm')}</div>
    </div> */}
  </div>
);

export default ArticleListContent;
