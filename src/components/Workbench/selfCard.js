import React, { Component } from 'react';
import { Card } from 'antd';
import Link from 'umi/link';
import classNames from 'classnames';
import styles from './selfCard.less';

class SelfCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, extra, children, noCardHeaderBorderBottom, nopadding, bordered } = this.props;
    return (
      <React.Fragment>
        {nopadding ? (
          <Card
            bordered={bordered}
            className={classNames(
              styles.Notice_Card,
              styles.nopadding,
              styles[noCardHeaderBorderBottom]
            )}
            title={<span className={styles.notice_title}>{title}</span>}
            extra={<Link to="#">{extra}</Link>}
            {...this.props}
          >
            {children}
          </Card>
        ) : (
          <Card
            className={classNames(styles.Notice_Card)}
            title={<span className={styles.notice_title}>{title}</span>}
            {...this.props}
          >
            {children}
          </Card>
        )}
      </React.Fragment>
    );
  }
}

export default SelfCard;
