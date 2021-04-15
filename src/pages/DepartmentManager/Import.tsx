import React from 'react';
import { useModel } from 'umi';
import TreeEdit from '@/components/TreeEditDynamic';
import UploadManager from '@/components/upload';

function DepartmentManager() {
  const {
    initialState: {
      uploadurl: { org: orgExcelfile },
    },
  } = useModel('@@initialState');

  const ShowData = data => {
    if (data) {
      const { departments } = data;
      return <TreeEdit treeList={departments} />;
    }
    return '';
  };
  const props = { uploadurl: orgExcelfile, name: '部门', ShowData };
  return <UploadManager {...props} />;
}

export default DepartmentManager;
