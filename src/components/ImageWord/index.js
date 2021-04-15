import React, { Component, Fragment } from 'react';
import { Button } from 'antd';
import classNames from 'classnames';

import styles from './ImgWord.less';

class ImgWord extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // const {item} = this.props;
    const { topLeftTip, topLeftMsg, imgSrc, bottomRight, bottomRightMsg, btns } = this.props;
    return (
      <React.Fragment>
        <div className={styles.list_item_card_img_conter}>
          <img src={imgSrc} alt="图片" className={styles.list_item_card_img} />
          {topLeftTip && (
            <Fragment>
              <div className={classNames(styles.top_left_triangle, styles.course)} />
              <div className={styles.top_left_msg}>{topLeftMsg}</div>
            </Fragment>
          )}

          {bottomRight && (
            <div className={styles.bottom_right}>
              <div className={styles.bottom_right_triangle} />
              <div className={styles.bottom_right_msg}>{bottomRightMsg}</div>
            </div>
          )}
          {btns && (
            <div className={styles.list_item_card_hover}>
              <Button type="primary">{btns}</Button>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default ImgWord;
