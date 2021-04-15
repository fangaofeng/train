import React from 'react';
import { Card, List, Input, Empty } from 'antd';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from '@/components/styles.less';

const { Search } = Input;

export default function Viewlist(props) {
  const { service, name, renderItem, selfempty, params = {}, isGrid = true } = props;
  const { data, loading, pagination } = service.listRequest({
    current: 1,
    pageSize: 12,
    ...params,
  });
  const pageConfig = {
    ...pagination,
    showTotal: total => `共 ${total} 条记录`,
  };

  return (
    <PageHeaderWrapper title={`查看${name}`}>
      <Card className={styles.managerContent}>
        <div className={styles.searchContent}>
          <div className="">
            <Search placeholder="输入编号或名称过滤" style={{ width: 300 }} />
          </div>
        </div>

        <List
          grid={isGrid ? { gutter: 4, xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4 } : null}
          dataSource={data.results}
          pagination={pageConfig}
          loading={loading}
          locale={selfempty || <Empty description={<span>{`没有${name}`}</span>} />}
          renderItem={item => renderItem(item)}
        />
      </Card>
    </PageHeaderWrapper>
  );
}
