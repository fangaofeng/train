import { useState } from 'react';
import { accountService as service } from '@/services';

export default () => {
  const [collapsed, setCollapsed] = useState(false);

  // subscriptions: {
  //   setup({ history }) {
  //     // Subscribe history(url) change, trigger `load` action if pathname is `/`
  //     return history.listen(({ pathname, search }) => {
  //       if (typeof window.ga !== 'undefined') {
  //         window.ga('send', 'pageview', pathname + search);
  //       }
  //     });
  //   },
  // },
  return { collapsed, setCollapsed };
};
