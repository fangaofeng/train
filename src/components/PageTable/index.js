import React, { useState, Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import { Table, Alert } from 'antd';
import hash from 'object-hash';
import styles from './index.less';

// function usePrevious(value) {
//   // The ref object is a generic container whose current property is mutable ...
//   // ... and can hold any value, similar to an instance property on a class
//   const ref = useRef();

//   // Store current value in ref
//   useEffect(() => {
//     ref.current = value;
//   }, [value]); // Only re-run if value changes

//   // Return previous value (happens before update in useEffect above)
//   return ref.current;
// }

function initTotalList(columns) {
  const totalList = [];
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}

function PageTable(props) {
  const { columns, params, action, data, onSelectRow, onSelectData, rowKey } = props;
  const tneedTotalList = initTotalList(columns);

  const storedispatch = useDispatch();
  const actionloading = useSelector(store => store.loading.effects[action]);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [saveSelectedData, setSaveSelectedData] = useState({});
  const [needTotalList, setNeedTotalList] = useState(tneedTotalList);
  const [pagination, setPagination] = useState({
    // 表格分页信息
    current: 1, // 当前页数
    pageSize: 10, // 每页条数
    pageSizeOptions: ['10', '20', '30', '40'], // 指定每页可以显示多少条数据
    showQuickJumper: true, // 是否可以快速跳转至某页
    showSizeChanger: true, // 是否可以改变 pageSize
  });
  // const prevparams = usePrevious(params);

  const getTableData = () => {
    storedispatch({
      type: action,
      payload: {
        ...params,
        page: pagination.current, // 页码
        size: pagination.pageSize, // 每页条数
      },
    });
  };

  useEffect(() => {
    getTableData();
  }, [pagination, hash(params || '')]);

  const handleRowSelectChange = (tselectedRowKeys, selectedRows) => {
    let ttneedTotalList = needTotalList;
    ttneedTotalList = needTotalList.map(item => ({
      ...item,
      total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex], 10), 0),
    }));
    // const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(tselectedRowKeys);
    }
    setselectedRowKeys(tselectedRowKeys);
    setNeedTotalList(ttneedTotalList);
    // statedispatch({ type: 'selectedAllKeys', selectedRowKeys });
    // statedispatch({ type: 'needTotalList', needTotalList });
  };

  // 用户手动选择/取消选择某行的回调
  const onSelect = (record, selected) => {
    // console.log(record, selected, selectedRows);
    // const { saveSelectedData } = state;
    if (selected) {
      // 选中该条数据
      saveSelectedData[record.id] = record;
    } else {
      // 取消选中该条数据
      delete saveSelectedData[record.id];
    }
    setSaveSelectedData(saveSelectedData);
    // statedispatch({ type: 'saveSelectedData', saveSelectedData });
    if (onSelectData) {
      onSelectData(saveSelectedData);
    }
  };

  // 用户手动选择/取消选择所有行的回调
  const onSelectAll = (selected, selectedRows, changeRows) => {
    // console.log(selected, selectedRows, changeRows);
    // const { saveSelectedData } = state;
    if (selected) {
      // 全选
      changeRows.forEach(v => {
        saveSelectedData[v.id] = v;
      });
    } else {
      // 取消全选
      changeRows.forEach(v => {
        delete saveSelectedData[v.id];
      });
    }
    // statedispatch({ type: 'saveSelectedData', saveSelectedData });
    setSaveSelectedData(saveSelectedData);
    if (onSelectData) {
      onSelectData(saveSelectedData);
    }
  };

  // 分页、排序、筛选变化时触发。这边只有分页功能，没有排序和筛选
  const handleTableChange = _pagination_ => {
    // const { pagination } = state;
    const { current, pageSize } = _pagination_;
    setPagination({
      ...pagination,
      current,
      pageSize,
    });
    // getTableData(current, pageSize);
  };

  const cleanSelectedKeys = () => {
    handleRowSelectChange([], []);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: handleRowSelectChange,
    onSelect,
    onSelectAll,
    getCheckboxProps: record => ({
      disabled: record.disabled,
    }),
  };

  const { results, count } = data;

  // const dataSource = results.map(value => Object.assign({}, value, { key: value.id }));
  const pageConifg = {
    ...pagination,
    total: count,
    showTotal: total => `共 ${total} 条记录`,
  };
  return onSelectRow ? (
    <div className={styles.standardTable}>
      <div className={styles.tableAlert}>
        {selectedRowKeys.length > 0 ? (
          <Alert
            message={
              <Fragment>
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
                {needTotalList.map(item => (
                  <span style={{ marginLeft: 8 }} key={item.dataIndex}>
                    {item.title}
                    总计&nbsp;
                    <span style={{ fontWeight: 600 }}>
                      {item.render ? item.render(item.total) : item.total}
                    </span>
                  </span>
                ))}
                <a onClick={cleanSelectedKeys} style={{ marginLeft: 24 }}>
                  清空
                </a>
              </Fragment>
            }
            type="info"
            showIcon
          />
        ) : null}
      </div>
      <Table
        bordered
        loading={actionloading}
        rowKey={rowKey || 'id'}
        rowSelection={rowSelection}
        dataSource={results}
        columns={columns}
        pagination={pageConifg}
        onChange={handleTableChange}
      />
    </div>
  ) : (
    <div className={styles.standardTable}>
      <Table
        bordered
        loading={actionloading}
        rowKey={rowKey || 'id'}
        dataSource={results}
        columns={columns}
        pagination={pageConifg}
        onChange={handleTableChange}
      />
    </div>
  );
}

export default PageTable;
