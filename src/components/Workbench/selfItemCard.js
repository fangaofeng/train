import React, { Component } from 'react';
import { Card } from 'antd';
import styles from './selfItemCard.less';

class SelfItemCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children } = this.props;
    return (
      // <React.Fragment>
      <Card bordered={false} className={styles.list_item_card}>
        {children}
      </Card>
      // </React.Fragment>
    );
  }
}

export default SelfItemCard;
