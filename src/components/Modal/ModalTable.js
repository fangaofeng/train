import React, { Component } from 'react';
import { Modal, Table, Button } from 'antd';
import styles from './ModalTable.less';

// const FormItem = Form.Item;

class ModalTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        current: 1, // 当前页数
        pageSize: 10, // 每页条数
        pageSizeOptions: ['10', '20', '30', '40'], // 指定每页可以显示多少条数据
        showQuickJumper: true, // 是否可以快速跳转至某页
        showSizeChanger: true, // 是否可以改变 pageSize
      },
    };
  }

  // 页面加载完成后
  componentDidMount() {}

  componentDidUpdate(prevProps) {
    const { visible } = this.props;
    if (prevProps.visible !== visible && visible === true) {
      const {
        pagination: { current, pageSize },
      } = this.state;
      this.getTableData(current, pageSize);
    }
  }

  getTableData = (page, size) => {
    const { dispatch, id, action } = this.props;
    dispatch({
      type: action,
      payload: {
        page, // 页码
        size, // 每页条数
        id, // 课程id
      },
    });
  };

  // 取消按钮
  handleTableCancel = () => {
    const { visiblecallback } = this.props;
    if (visiblecallback) {
      visiblecallback(false, true);
    }
  };

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

  // 表格行的类名
  handleRowClassName = (record, index) => {
    const { rowClassName } = this.props;
    if (rowClassName) {
      return rowClassName(record, index);
    }
    return '';
  };

  render() {
    const { visible, modalTitle, data, columns, Headerinfo } = this.props;
    const { pagination } = this.state;
    pagination.total = data.count;

    // 循环Table数据，添加key(准备添加的培训管理员)
    const dataSource = data.results.map(value => Object.assign({}, value, { key: value.id }));
    return (
      <Modal
        visible={visible}
        title={modalTitle}
        style={{ top: 150, minWidth: 800 }}
        bodyStyle={{ paddingTop: 0, paddingBottom: 0 }}
        onCancel={this.handleTableCancel}
        footer={
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" onClick={this.handleTableCancel}>
              返回
            </Button>
          </div>
        }
      >
        <div className={styles.ModalTableContent}>
          {Headerinfo ? <div className={styles.modalHeaderinfo}>{Headerinfo} </div> : null}
          <div>
            <div className={styles.searchContent}>
              <div>
                <span>群组成员：</span>
              </div>
            </div>
            <Table
              bordered
              dataSource={dataSource}
              columns={columns}
              pagination={pagination}
              onChange={this.handleTableChange}
              rowClassName={this.handleRowClassName}
            />
          </div>
        </div>
      </Modal>
    );
  }
}

export default ModalTable;
