import React from 'react';
import { EditOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

export default ({ title, editNode, addNode, delNode }) => (
  <React.Fragment>
    <span>{title}</span>{' '}
    <EditOutlined
      style={{ marginLeft: '10px' }}
      onClick={e => {
          e.stopPropagation();
          editNode();
        }} />
    <MinusCircleOutlined
      style={{ marginLeft: '10px' }}
      onClick={e => {
          e.stopPropagation();
          delNode();
        }} />
    <PlusCircleOutlined
      style={{ marginLeft: '10px' }}
      onClick={e => {
          e.stopPropagation();
          addNode();
        }} />
  </React.Fragment>
  );
