import React, { useEffect, useState, useCallback } from 'react';
import { Card, Table, Input, Button } from 'antd';
import { history } from 'umi';
import { useSelector, useDispatch } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from '@/components/styles.less';

const { Search } = Input;

export default function ViewTable(props) {
  const { action, name, datalist, columns, rowKey, info, id, returnUrl } = props;
  const dispatch = useDispatch();
  const listdata = useSelector(store => datalist(store));
  const listdataloading = useSelector(store => store.loading.effects[action]);
  const [pagination, setPagination] = useState({
    current: 1, // 当前页数
    pageSize: 12, // 每页条数
    pageSizeOptions: ['10', '20', '30', '40'], // 指定每页可以显示多少条数据
    showQuickJumper: true, // 是否可以快速跳转至某页
    showSizeChanger: true, // 是否可以改变 pageSize
  });
  const { current, pageSize } = pagination;

  const getListData = useCallback((page, size) =>
    dispatch({
      type: action,
      payload: {
        page, // 页码
        size, // 每页条数
        id,
      },
    })
  );

  useEffect(() => {
    getListData(current, pageSize);
  }, [current, pageSize]);
  // 分页、排序、筛选变化时触发。这边只有分页功能，没有排序和筛选
  const handlePageChange = (_current, _pageSize) => {
    setPagination({
      ...pagination,
      current: _current,
      pageSize: _pageSize,
    });
    // getListData(_current, _pageSize);
  };

  const handleTableChange = _pagination_ => {
    setPagination({
      ...pagination,
      current: _pagination_.current,
      pageSize: _pagination_.pageSize,
    });
    // this.getTableData(current, pageSize);
  };

  const pageConfig = {
    ...pagination,
    total: listdata.count,
    showTotal: total => `共 ${total} 条记录`,
    onChange: handlePageChange,
  };
  // 循环Table数据，添加key
  // const dataSource = listdata.results.map(value => Object.assign({}, value, { key: value.id }));

  return (
    <PageHeaderWrapper title={`查看${name}`}>
      <Card className={styles.managerContent}>
        {info || null}
        <div className={styles.searchContent}>
          <div className="">
            <Search
              placeholder="输入编号或名称过滤"
              onSearch={value => console.log(value)}
              style={{ width: 300 }}
            />
          </div>
        </div>

        <Table
          bordered
          loading={listdataloading}
          rowKey={rowKey || 'id'}
          dataSource={listdata.results}
          columns={columns}
          pagination={pageConfig}
          onChange={handleTableChange}
        />
        <div className={styles.foonter_btns}>
          <Button type="primary" onClick={() => history.push(returnUrl)}>
            返回
          </Button>
        </div>
      </Card>
    </PageHeaderWrapper>
  );
}
