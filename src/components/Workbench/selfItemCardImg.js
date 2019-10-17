import React, { Component, Fragment } from 'react';
import { Button } from 'antd';
import classNames from 'classnames';
// import Authorized from '@/utils/Authorized';
import styles from './selfItemCardImg.less';

class SelfItemCardImg extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // const {item} = this.props;
    const { showCourseTip, showExamTip, imgSrc, studyTime, btns } = this.props;
    return (
      // <React.Fragment>
      <div className={styles.list_item_card_img_conter}>
        <img src={imgSrc} alt="图片" className={styles.list_item_card_img} />
        {showCourseTip && (
          <Fragment>
            <div className={classNames(styles.top_left_triangle, styles.course)} />
            <div className={styles.top_left_msg}>课程</div>
          </Fragment>
        )}
        {showExamTip && (
          <Fragment>
            <div className={classNames(styles.top_left_triangle, styles.exam)} />
            <div className={styles.top_left_msg}>考试</div>
          </Fragment>
        )}
        {studyTime && (
          <div className={styles.bottom_right}>
            <div className={styles.bottom_right_triangle} />
            <div className={styles.bottom_right_msg}>{studyTime}</div>
          </div>
        )}
        {btns && (
          <div className={styles.list_item_card_hover}>
            <Button type="primary">{btns}</Button>
          </div>
        )}
      </div>
      // </React.Fragment>
    );
  }
}

export default SelfItemCardImg;
