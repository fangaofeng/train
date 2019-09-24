import React, { Component } from 'react'
import { Modal , Table , Button , Form } from 'antd';
import styles from './ModalTable.less';

const FormItem = Form.Item;

class ModalTable extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // 取消按钮
    handleTableCancel = () => {
        const { handleTableCancel } = this.props;
        if (handleTableCancel) {
            handleTableCancel();
        } 
    }

    handleTableChange = (pagination, filters, sorter) => {
        const { onChange } = this.props;
        if (onChange) {
          onChange(pagination, filters, sorter);
        }
    };

    // 表格行的类名
    handleRowClassName = (record, index) => {
      const { rowClassName } = this.props;
      if (rowClassName) {
        return rowClassName(record, index);
      }
    };

    render() {
        const {
            modalTableVisible,
            modalTitle,
            trainGroupNumber,
            trainGroupName,
            dataSource,
            pagination,
            columns,
        } = this.props;

        return (
          <Modal
            visible={modalTableVisible}
            title={modalTitle}
            style={{ top: 150 , minWidth:800 }}
            bodyStyle={{paddingTop:0,paddingBottom:0}}
            onCancel={this.handleTableCancel}
            footer={
              <div style={{textAlign:'center'}}>
                <Button type="primary" onClick={this.handleTableCancel}>返回</Button>
              </div> 
            }
          >
            <div className={styles.ModalTableContent}>
              <div className={styles.modalHeaderinfo}>
                <Form layout="inline" style={{marginRight:20}}>
                  <FormItem label="群组编号"><span>{trainGroupNumber}</span></FormItem>
                  <FormItem label="群组名称"><span>{trainGroupName}</span></FormItem>
                </Form>
              </div>
              <div>
                <div className={styles.searchContent}>
                  <div><span>群组成员：</span></div>
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