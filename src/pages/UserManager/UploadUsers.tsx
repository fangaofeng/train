import React from 'react';
import { useModel } from 'umi';
import ViewSelcet from './ViewSelect';
import UploadManager from '@/components/upload';

function UploadUser() {
  const {
    initialState: {
      uploadurl: { user: useruploadurl },
    },
  } = useModel('@@initialState');

  const ShowData = data => {
    if (data) {
      const { importid } = data;
      return <ViewSelcet params={importid} />;
    }
    return '';
  };
  const props = { uploadurl: useruploadurl, name: '用户', ShowData };
  return <UploadManager {...props} />;
}

export default UploadUser;
