import React, { useState, useEffect } from 'react';

import TreeSelect from '@/components/EditContent/tree';

export default props => {
  const { onChange, isBox = false, value } = props;
  const [checkedKeys, setcheckedKeys] = useState(value);
  const action = 'DepartmentManager/GetOrgsDeparments';
  const name = '部门选择';
  console.log('checkedKeys:', checkedKeys, value);
  useEffect(() => {
    setcheckedKeys(value);
  }, [value]);
  return (
    <TreeSelect
      isBox={isBox}
      onCheck={checkedallKeys => {
        onChange(checkedallKeys);
        setcheckedKeys(checkedallKeys);
      }}
      action={action}
      checkedKeys={checkedKeys}
      name={name}
    />
  );
};
