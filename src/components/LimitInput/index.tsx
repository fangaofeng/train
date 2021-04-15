import React, { useState } from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

export function LimitInput(props) {
  const {
    maxLength = 50,
    isvalid = true,
    suffix = null,
    onChange = null,
    value = null,
    ...restProps
  } = props;
  const [len, setLen] = useState(maxLength);
  const isvalidt = isvalid && suffix && onChange && !value;

  // 若外部定义了onChange事件，handleChange将会被覆盖
  const handleChange = e => {
    const val = e.target.value;
    setLen(val.length);
    if (onChange) onChange(e);
  };

  return isvalidt ? (
    <Input
      onChange={e => handleChange(e)}
      suffix={`${len}/${maxLength}`}
      maxLength={maxLength}
      value={value}
      {...restProps}
    />
  ) : (
    <Input {...props} />
  );
}
export function LimitTextArea(props) {
  const {
    maxLength = 50,
    isvalid = true,
    suffix = null,
    onChange = null,
    value = null,
    ...restProps
  } = props;
  const [len, setLen] = useState(maxLength);
  const isvalidt = isvalid && suffix && onChange && !value;

  // 若外部定义了onChange事件，handleChange将会被覆盖
  const handleChange = e => {
    const val = e.target.value;
    setLen(val.length);
    if (onChange) onChange(e);
  };

  return isvalidt ? (
    <TextArea
      onChange={e => handleChange(e)}
      suffix={`${len}/${maxLength}`}
      maxLength={maxLength}
      value={value}
      {...restProps}
    />
  ) : (
    <TextArea {...props} />
  );
}
