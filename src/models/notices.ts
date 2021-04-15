import { useState } from 'react';
import { noticesService as service, formatResultPage } from '@/services';
import { useRequest, useModel } from 'umi';

export default () => {
  const [notices, setNotices] = useState({ results: [], count: 0 });
  const list = useRequest(data => service.list(data), {
    manual: true,
    formatResult: formatResultPage,
    onSuccess: (result, params) => {
      setNotices({ ...result });
    },
  });
  const retrive = useRequest(id => service.retrive(id), {
    manual: true,
    // onError: (error, params) => {
    //   message.error(`获取失败 ${params[0]}`);
    // },
  });

  const patch = useRequest((id, data) => service.patch(id, data), {
    manual: true,
    fetchKey: id => id,

    // onError: (error, params) => {
    //   message.error(`修改失败： ${params[0]}`);
    // },
    onSuccess: (result, params) => {
      if (result) {
        // message.success(`修改成功 ${params[0]}`);
        // if (params.currentRef) {
        //   params.currentRef.reload();
        // }
      }
    },
  });

  const bulkdel = useRequest(data => service.bulkdel(data), {
    manual: true,
    onError: (error, params) => {
      // message.error(`批量删除失败： ${params[0]}`);
    },
    onSuccess: (result, params) => {
      if (result.success) {
        // message.success(`批量删除成功 ${params[0]}`);
        // if (params.currentRef) {
        //   params.currentRef.reload();
        // }
      }
    },
  });

  const clear = useRequest(data => service.clear(data), {
    manual: true,
    onError: (error, params) => {
      // message.error(`清除失败： ${params[0]}`);
    },
    // onSuccess: (result, params) => {
    //   if (result.success) {
    //     message.success(`批量删除成功 ${params[0]}`);
    //     if (params.currentRef) {
    //       params.currentRef.reload();
    //     }
    //   }
    // },
  });

  return { notices, list, retrive, patch, bulkdel, clear };
};
