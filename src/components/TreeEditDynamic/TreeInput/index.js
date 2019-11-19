import React, { Component } from 'react';
import { Input } from 'antd';

export default class TreeInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || '',
    };
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  onBlur() {
    const { blurInput } = this.props;
    const { value } = this.state;
    blurInput(value);
  }

  render() {
    const { value } = this.state;
    return (
      <Input
        maxLength={32}
        defaultValue={value}
        placeholder="请输入"
        onClick={e => e.stopPropagation()}
        onBlur={this.onBlur}
        autoFocus
        onPressEnter={this.onBlur}
        onChange={this.onChange}
      />
    );
  }
}
