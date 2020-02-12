import React from 'react';

import TreeSelect from '@/components/EditContent/tree';

export default props => {
  const { onSelectKeys } = props;
  const action = 'DepartmentManager/GetOrgsDeparments';
  const name = '部门选择';

  return (
    <TreeSelect
      onCheck={checkedallKeys => onSelectKeys(checkedallKeys)}
      action={action}
      name={name}
    />
  );
};
