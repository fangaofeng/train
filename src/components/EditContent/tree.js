import React from 'react';
import { TreeSelect, Spin } from 'antd';

export default function TreeSelectEx(props) {
  const { service, onChange, checkedKeys, isBox = true, placeholder } = props;
  const { data, loading } = service.listRequest();
  const renderTreedata = (tdata = []) =>
    tdata.map(item => {
      if (item.children) {
        return {
          title: item.name,
          key: item.id,
          value: item.id,
          dataRef: item,
          children: renderTreedata(item.children),
        };
      }
      return { title: item.name, key: item.id, value: item.id, dataRef: item };
    });

  return loading ? (
    <Spin size="small" />
  ) : (
    <TreeSelect
      treeData={renderTreedata(data)}
      value={checkedKeys}
      onChange={tcheckedKeys => onChange(tcheckedKeys)}
      treeCheckable={isBox}
      treeDefaultExpandAll
      showCheckedStrategy={TreeSelect.SHOW_PARENT}
      placeholder={placeholder || '请点击选进行选择'}
      style={{ width: '100%' }}
    />
  );
}
