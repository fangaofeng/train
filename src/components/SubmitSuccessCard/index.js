import React, { PureComponent } from 'react';
import { Card, Result, Descriptions } from 'antd';

class SubmitSuccessCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      successFlag,
      title,
      infoMsgConfig,
      btns,
      layout, // 底部按钮
    } = this.props;
    const listItem = Object.keys(infoMsgConfig).map(v => (
      <Descriptions.Item key={v} label={v}>
        {infoMsgConfig[v]}
      </Descriptions.Item>
    ));
    return (
      <Card style={{ display: successFlag === 'success' ? 'block' : 'none' }}>
        <Result
          status="success"
          title={title}
          layout="vertical"
          subTitle={
            <Descriptions layout={layout || 'vertical'} style={{ textAlign: 'left' }}>
              {listItem}
            </Descriptions>
          }
          extra={[btns]}
        />
      </Card>
    );
  }
}

export default SubmitSuccessCard;
