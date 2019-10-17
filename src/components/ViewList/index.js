import React, { useEffect, useState } from 'react';
import { Card, List, Input } from 'antd';

import { useSelector, useDispatch } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './index.less';

const { Search } = Input;

export default function viewlist(props) {
  const { action, name, datalist, renderItem } = props;
  const dispatch = useDispatch();
  const listdata = useSelector(state => datalist(state));
  const [pagination, setPagination] = useState({
    current: 1, // 当前页数
    pageSize: 12, // 每页条数
    pageSizeOptions: ['12', '16', '20', '24'], // 指定每页可以显示多少条数据
    showQuickJumper: true, // 是否可以快速跳转至某页
    showSizeChanger: true, // 是否可以改变 pageSize
  });

  const getListData = (page, size) => {
    dispatch({
      type: action,
      payload: {
        page, // 页码
        size, // 每页条数
      },
    });
  };
  useEffect(() => {
    const { current, pageSize } = pagination;

    getListData(current, pageSize);
  }, []);
  // 分页、排序、筛选变化时触发。这边只有分页功能，没有排序和筛选
  const handlePageChange = (_current, _pageSize) => {
    setPagination({
      ...pagination,
      current: _current,
      pageSize: _pageSize,
    });
    getListData(_current, _pageSize);
  };

  const pageConfig = {
    ...pagination,
    total: listdata.count,
    showTotal: total => `共 ${total} 条记录`,
    onChange: handlePageChange,
  };
  // 循环Table数据，添加key
  const dataSource = listdata.results.map(value => Object.assign({}, value, { key: value.id }));

  return (
    <PageHeaderWrapper title={`查看${name}`}>
      <Card className={styles.managerContent}>
        <div className={styles.searchContent}>
          <div className="">
            <Search
              placeholder="输入编号或名称过滤"
              onSearch={value => console.log(value)}
              style={{ width: 300 }}
            />
          </div>
        </div>

        <List
          grid={{ gutter: 4, xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4 }}
          dataSource={dataSource}
          pagination={pageConfig}
          locale={{
            emptyText: <div>{`没有${name}`}</div>,
          }}
          renderItem={item => <List.Item>{renderItem(item)}</List.Item>}
        />
      </Card>
    </PageHeaderWrapper>
  );
}
