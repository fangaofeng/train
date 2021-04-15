import React, { useState, useEffect } from 'react';
import TreeSelect from '@/components/EditContent/tree';
import { useUpdateEffect } from '@umijs/hooks';
import { departmentService } from '@/services';
import { hash } from 'object-hash';

export default props => {
  const { onChange, isBox = false, value = [], defaultValue = [] } = props;
  const [checkedKeys, setcheckedKeys] = useState(defaultValue);
  const name = '部门选择';
  // useUpdateEffect(() => {
  //   setcheckedKeys(value);
  // }, [hash(value)]);
  return (
    <TreeSelect
      isBox={isBox}
      onChange={checkedallKeys => {
        onChange(checkedallKeys);
        setcheckedKeys(checkedallKeys);
      }}
      service={departmentService}
      checkedKeys={checkedKeys}
      name={name}
    />
  );
};
