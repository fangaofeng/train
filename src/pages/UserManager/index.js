import React, { useState } from 'react';
import { Card, Button, Form, Divider, Popconfirm, message, Input } from 'antd';
import { history, Link } from 'umi';
import { useDispatch } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from '@/components/styles.less';

import ModalDel from '@/components/Modal/ModalDel';
import UserSelect from './ViewSelect';

function UserManager() {
  const [visible, setVisible] = useState(false);
  const [selectedKeys, setSelectKeys] = useState([]);
  const storedispatch = useDispatch();
  // 批量导入用户
  const goPage = () => {
    history.push('/UserManager/upload');
  };

  // 批量删除,如果选择了数据，则显示删除模态框
  const batchDelete = () => {
    if (selectedKeys.length < 1) {
      message.info('请选择您需要删除的数据！');
      return;
    }
    setVisible(true);
  };

  // selectedRows = rows => {
  //   setSelectKeys(  rows );
  // };

  // 单个删除
  const deleteConfirm = id => {
    const flag = selectedKeys.indexOf(id); // 用于判断该数据是否已经选中存放到selectedAllKeys数组中
    storedispatch({
      type: 'UserManager/DelUsers',
      payload: {
        data: [id],
      },
      callback: res => {
        if (res && res.status === 'ok') {
          message.success('删除成功');
          if (flag > -1) {
            selectedKeys.splice(flag, 1);
            setSelectKeys({
              selectedKeys,
            });
          }
        } else {
          message.warning('删除失败');
        }
      },
    });
  };

  const modaldelcallback = (tvisible, refresh = false) => {
    setVisible(tvisible);
  };

  // Table通用的columns
  const ColumnsOperation = [
    {
      title: '操作',
      dataIndex: 'user_manager_opt',
      key: 'user_manager_opt',
      render: (text, record) => (
        <span>
          <Link to={`/usermanager/edit/${record.id}`}>修改</Link>
          <Divider type="vertical" />
          <Popconfirm
            placement="topRight"
            title="确认删除这个用户吗？"
            onConfirm={() => deleteConfirm(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <a type="link">删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <PageHeaderWrapper title="用户管理">
      <Card className={styles.managerContent}>
        <div className={styles.searchContent}>
          <div></div>
          <div className="">
            <Button type="primary" onClick={goPage}>
              批量导入用户
            </Button>
            <Button type="primary">
              <Link to="/userManager/create">增加用户</Link>
            </Button>
            <Button className="ant-btn-del" onClick={batchDelete}>
              批量删除用户
            </Button>
          </div>
        </div>
        <UserSelect
          onSelectKeys={rows => setSelectKeys(rows)}
          ColumnsOperation={ColumnsOperation}
        />
      </Card>
      <ModalDel
        dispatch={storedispatch}
        selectedKeys={selectedKeys}
        visible={visible}
        visiblecallback={modaldelcallback}
        delAtiontype="UserManager/DelUsers"
      />
    </PageHeaderWrapper>
  );
}

export default Form.create()(UserManager);
