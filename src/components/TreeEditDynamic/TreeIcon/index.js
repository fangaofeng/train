import React from 'react';
import { Icon } from 'antd';

export default ({ title, editNode, addNode, delNode }) => (
  <React.Fragment>
    <span>{title}</span>{' '}
    <Icon
      type="edit"
      style={{ marginLeft: '10px' }}
      onClick={e => {
          e.stopPropagation();
          editNode();
        }}
    />
    <Icon
      type="minus-circle"
      style={{ marginLeft: '10px' }}
      onClick={e => {
          e.stopPropagation();
          delNode();
        }}
    />
    <Icon
      type="plus-circle"
      style={{ marginLeft: '10px' }}
      onClick={e => {
          e.stopPropagation();
          addNode();
        }}
    />
  </React.Fragment>
  );
