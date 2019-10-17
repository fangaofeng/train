import React, { PureComponent, Fragment } from 'react';
import { Table, Alert } from 'antd';
import styles from './index.less';

function initTotalList(columns) {
  const totalList = [];
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}

class PageTable extends PureComponent {
  constructor(props) {
    super(props);
    const { columns } = props;
    const needTotalList = initTotalList(columns);

    this.state = {
      selectedRowKeys: [],
      saveSelectedData: {},
      needTotalList,
      pagination: {
        // 表格分页信息
        current: 1, // 当前页数
        pageSize: 10, // 每页条数
        pageSizeOptions: ['10', '20', '30', '40'], // 指定每页可以显示多少条数据
        showQuickJumper: true, // 是否可以快速跳转至某页
        showSizeChanger: true, // 是否可以改变 pageSize
      },
    };
  }

  // 页面加载完成后
  componentDidMount() {
    const {
      pagination: { current, pageSize },
    } = this.state;
    this.getTableData(current, pageSize);
  }

  // 获取table表格数据(指定页码，指定每页条数)
  getTableData = (page, size) => {
    const { dispatch, id, action } = this.props;
    if (dispatch) {
      if (id) {
        dispatch({
          type: action,
          payload: {
            id, // 数据id
            page, // 页码
            size, // 每页条数
          },
        });
      } else {
        dispatch({
          type: action,
          payload: {
            page, // 页码
            size, // 每页条数
          },
        });
      }
    }
  };

  static getDerivedStateFromProps(nextProps) {
    // clean state
    if (nextProps.selectedRows && nextProps.selectedRows.length === 0) {
      const needTotalList = initTotalList(nextProps.columns);
      return {
        selectedRowKeys: [],
        needTotalList,
      };
    }
    return null;
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    let { needTotalList } = this.state;
    needTotalList = needTotalList.map(item => ({
      ...item,
      total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex], 10), 0),
    }));
    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(selectedRowKeys);
    }

    this.setState({ selectedRowKeys, needTotalList });
  };

  // 用户手动选择/取消选择某行的回调
  onSelect = (record, selected) => {
    // console.log(record, selected, selectedRows);
    const { saveSelectedData } = this.state;
    if (selected) {
      // 选中该条数据
      saveSelectedData[record.key] = record;
    } else {
      // 取消选中该条数据
      delete saveSelectedData[record.key];
    }
    this.setState({
      saveSelectedData,
    });
    const { onSelectData } = this.props;
    if (onSelectData) {
      onSelectData(saveSelectedData);
    }
  };

  // 用户手动选择/取消选择所有行的回调
  onSelectAll = (selected, selectedRows, changeRows) => {
    // console.log(selected, selectedRows, changeRows);
    const { saveSelectedData } = this.state;
    if (selected) {
      // 全选
      changeRows.forEach(v => {
        saveSelectedData[v.key] = v;
      });
    } else {
      // 取消全选
      changeRows.forEach(v => {
        delete saveSelectedData[v.key];
      });
    }
    this.setState({
      saveSelectedData,
    });
    const { onSelectData } = this.props;
    if (onSelectData) {
      onSelectData(saveSelectedData);
    }
  };

  // 分页、排序、筛选变化时触发。这边只有分页功能，没有排序和筛选
  handleTableChange = _pagination_ => {
    const { pagination } = this.state;
    const { current, pageSize } = _pagination_;
    this.setState({
      pagination: {
        ...pagination,
        current,
        pageSize,
      },
    });
    this.getTableData(current, pageSize);
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  render() {
    const { selectedRowKeys, needTotalList, pagination } = this.state;
    const { loading, columns, rowKey, onSelectRow, data } = this.props;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      onSelect: this.onSelect,
      onSelectAll: this.onSelectAll,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };

    const { results, count } = data;

    const dataSource = results.map(value => Object.assign({}, value, { key: value.id }));
    const pageConifg = {
      ...pagination,
      total: count,
      showTotal: total => `共 ${total} 条记录`,
    };
    return onSelectRow ? (
      <div className={styles.standardTable}>
        <div className={styles.tableAlert}>
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
                <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>
                  清空
                </a>
              </Fragment>
            }
            type="info"
            showIcon
          />
        </div>
        <Table
          bordered
          loading={loading}
          rowKey={rowKey || 'key'}
          rowSelection={rowSelection}
          dataSource={dataSource}
          columns={columns}
          pagination={pageConifg}
          onChange={this.handleTableChange}
        />
      </div>
    ) : (
      <div className={styles.standardTable}>
        <Table
          bordered
          loading={loading}
          rowKey={rowKey || 'key'}
          dataSource={dataSource}
          columns={columns}
          pagination={pageConifg}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default PageTable;
