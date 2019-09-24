import React, { Component } from 'react'
import { Card  } from 'antd';
import styles from './SubmitSuccessCard.less';
import uploadSuccess from '@/assets/images/upload_success.png'

class SubmitSuccessCard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const { 
            successFlag,
            title,
            infoMsgConfig,
            btns,// 底部按钮
            children
        } = this.props;
        const listItem = Object.keys(infoMsgConfig).map((v)=> <div key={v}><span>{v}</span><span>{infoMsgConfig[v]}</span></div>);
        return (
          <Card
            className={styles.SubmitSuccessCardContent}
            style={{display:successFlag==='success'?'block':'none'}}
          >
            <div className={styles.successImgContent}>
              <div>
                <img src={uploadSuccess} alt="成功" />
                <span>{title}</span>
              </div>
              <div>
                { listItem }
              </div>
            </div>
            {children}
            <div className={styles.successFooterBtns}>
              {btns}
            </div>
          </Card>
        );
    }
}

export default SubmitSuccessCard;