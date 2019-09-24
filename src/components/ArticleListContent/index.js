import React from 'react';
import moment from 'moment';
import { Avatar } from 'antd';
import styles from './index.less';

const ArticleListContent = ({ data: { body, pub_time, avatar, owner, href } }) => (
  <div className={styles.listContent}>
    <div className={styles.description}>{body}</div>
    <div className={styles.extra}>
      {/* <Avatar src={avatar} size="small" /> */}

      {/* <a href={href}>{owner}</a>  <a href={href}>{href}</a> */}
      <div>发布人: 阿斯蒂芬撒地方 时间： {moment(pub_time).format('YYYY-MM-DD HH:mm')}</div>
    </div>
  </div>
);

export default ArticleListContent;
