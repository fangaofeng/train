import React, { Component,Fragment} from 'react'
import { Button } from 'antd';
import classNames from 'classnames';
// import Authorized from '@/utils/Authorized';
import styles from './selfItemCardImg.less';

class SelfItemCardImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        // const {item} = this.props;
        const {
          showCourseTip,
          showExamTip,
          imgSrc,
          studyTime,
          btns,
        } = this.props
        return (
          <React.Fragment>
            <div className={styles.list_item_card_img_conter}>
              <img src={imgSrc} alt="图片" className={styles.list_item_card_img} />
              {
                showCourseTip && 
                <Fragment>
                  <div className={classNames(styles.top_left_triangle,styles.course)}></div>
                  <div className={styles.top_left_msg}>课程</div>
                </Fragment>
              }
              {
                showExamTip && 
                <Fragment>
                  <div className={classNames(styles.top_left_triangle,styles.exam)}></div>
                  <div className={styles.top_left_msg}>考试</div>
                </Fragment>
              }
              {
                studyTime && 
                <div className={styles.bottom_right}>
                  <div className={styles.bottom_right_triangle}></div>
                  <div className={styles.bottom_right_msg}>{studyTime}</div>
                </div>
              }
              {
                btns &&
                <div className={styles.list_item_card_hover}>
                  <Button type="primary">{btns}</Button>
                </div>
              }
              {/* <img src={item.imgSrc} alt="" className={styles.list_item_card_img} />
              {
                !item.type ? null :
                item.type == 'course' ?
                <Fragment>
                <div className={classNames(styles.top_left_triangle,styles.course)}></div>
                <div className={styles.top_left_msg}>课程</div>
                </Fragment>
                :
                <Fragment>
                <div className={classNames(styles.top_left_triangle,styles.exam)}></div>
                <div className={styles.top_left_msg}>考试</div>
                </Fragment>
              }
              {
                  item.studyTime?
                    <div className={styles.bottom_right}>
                      <div className={styles.bottom_right_triangle}></div>
                      <div className={styles.bottom_right_msg}>{item.studyTime}</div>
                    </div>
                  :
                  null
              }

              <Authorized
                authority='user'
              >
                <div className={styles.list_item_card_hover}>
                  <Button type="primary">创建学习计划</Button>
                </div>
              </Authorized> */}

              
              {/* <div className={styles.list_item_card_hover}>
                <Button type="primary">创建学习计划</Button>
              </div> */}
            </div>
          </React.Fragment>
        );
    }
}

export default SelfItemCardImg;