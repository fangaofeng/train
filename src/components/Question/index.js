import React, { Component } from 'react';
import { Radio, Card, Button, Checkbox } from 'antd';

import styles from './index.less';
import SelfCard from '@/components/Workbench/selfCard';

class Question extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = { currentAnswer: '' };
  // }

  // 单选框，改变选项时触发
  radioOnChange = e => {
    console.log(e.target.value);

    const { setCurrentAnswer, index } = this.props;
    setCurrentAnswer(index, e.target.value);
  };

  // 多选框，改变选项时触发
  checkboxOnChange = value => {
    console.log(value.join('/'));
    const { setCurrentAnswer, index } = this.props;
    setCurrentAnswer(index, value.join('/'));
  };

  render() {
    const { question, index } = this.props;
    // console.log(isShow);
    // console.log(detailConfig);
    return (
      <div className={styles.leftContentTop}>
        <div className={styles.name}>{question.questionName}</div>
        <SelfCard
          title={
            <span style={{ fontWeight: '600' }}>
              {question.type}（{question.score}
              分）
            </span>
          }
          nopadding="true"
        >
          <div className={styles.questionName}>
            {index}、{question.title}
          </div>
          <div className={styles.optionsBody}>
            {question.type === '多选题' ? (
              <Checkbox.Group
                onChange={this.checkboxOnChange}
                value={question.answer === '' ? [] : question.answer.split('/')}
              >
                {Object.keys(question.options).map(v => (
                  <Checkbox className={styles.option} key={v} value={v}>
                    {v}：{question.options[v]}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            ) : (
              <Radio.Group onChange={this.radioOnChange} value={question.answer}>
                {Object.keys(question.options).map(v => (
                  <Radio className={styles.option} key={v} value={v}>
                    {v}：{question.options[v]}
                  </Radio>
                ))}
              </Radio.Group>
            )}
          </div>
        </SelfCard>
      </div>
    );
  }
}

export default Question;
