import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'dva';

import { TreeSelect } from 'antd';

export default function TreeSelectEx(props) {
  const { action, onCheck, checkedKeys, isBox = true } = props;

  const storedispatch = useDispatch();
  const treedata = useSelector(store => store.DepartmentManager.departments);

  const getListData = useCallback(() =>
    storedispatch({
      type: action,
    })
  );

  useEffect(() => {
    getListData();
  }, []);

  const onChange = tcheckedKeys => {
    if (onCheck) {
      onCheck(tcheckedKeys);
    }
  };

  const renderTreedata = tdata =>
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
  return (
    <TreeSelect
      treeData={renderTreedata(treedata)}
      value={checkedKeys}
      onChange={onChange}
      treeCheckable={isBox}
      treeDefaultExpandAll
      showCheckedStrategy={TreeSelect.SHOW_PARENT}
      searchPlaceholder="请点击选进行选择"
      style={{ width: '100%' }}
    />
  );
}
