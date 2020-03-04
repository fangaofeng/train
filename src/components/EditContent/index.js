import React, { useReducer } from 'react';
import { Card, Button, message } from 'antd';
import router from 'umi/router';
import { useSelector, useDispatch } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import PageTable from '@/components/PageTable';
import styles from '@/components/Modal/Common.less';

import UserModalAdd from '@/pages/UserManager/ModalAdd';
import ModalDel from '@/components/Modal/ModalDel';

// const { Search } = Input;
const initialState = {
  selectedAllKeys: [], // 选中的数据组成的数组（只包含key值）
  delVisible: false, // 批量删除的模态框————>显示隐藏
  addVisible: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'selectedAllKeys':
      return { ...state, selectedAllKeys: action.rows };
    case 'delVisible':
      return { ...state, delVisible: action.visible };
    case 'addVisible':
      return { ...state, addVisible: action.visible };
    default:
      throw new Error();
  }
}
export default function EditContent(props) {
  const {
    listAction,
    data,
    name,
    currentType,
    changestatusAction,
    delAction,
    addAction,
    columns,
    sublistAction,
    id,
    info,
    returnUrl,
    subname,
  } = props;
  const storedispatch = useDispatch();
  const storedata = useSelector(store => data(store));
  const listdataloading = useSelector(store => store.loading.effects[listAction]);
  // const addlistdataLoading = useSelector(store => store.loading.effects[sublistAction]);
  const changestatusloading = useSelector(store => store.loading.effects[changestatusAction]);
  const delloading = useSelector(store => store.loading.effects[delAction]);
  const [state, statedispatch] = useReducer(reducer, initialState);

  const changeStatus = msg => {
    storedispatch({
      type: changestatusAction,
      payload: {
        id, // id
        data: {
          status: '已上架', // 0：拟制中；1：已上架；2：已下架；3：已归档
        },
      },
      callback: res => {
        if (res && res.status === 'ok') {
          message.success(`${msg}成功`);
          // this.forceUpdate();
        } else {
          message.warning(`${msg}失败`);
        }
      },
    });
  };
  // ---------------批量删除---------------
  // 批量删除,如果选择了数据，则显示删除模态框
  const batchDelete = () => {
    const { selectedAllKeys } = state;
    if (selectedAllKeys.length < 1) {
      message.info('请选择您需要删除的数据！');
      return;
    }
    statedispatch({ type: 'delVisible', visible: true });
  };

  // ---------------单个删除---------------
  // 单个删除
  const deleteConfirm = delID => {
    const { selectedAllKeys } = state;

    storedispatch({
      type: delAction,
      payload: {
        id, // 课件id
        data: [delID],
      },
      callback: res => {
        if (res && res.status === 'ok') {
          message.success('删除成功');
          const flag = selectedAllKeys.indexOf(delID);
          if (flag > -1) {
            selectedAllKeys.splice(flag, 1);
            statedispatch({ type: 'selectedAllKeys', rows: selectedAllKeys });
          }
        } else {
          message.warning('删除失败');
        }
      },
    });
  };

  // 点击“增加培训管理员”，显示模态框
  const addMember = () => {
    statedispatch({ type: 'addVisible', visible: true });
  };

  // ---------------增加培训管理员模态框---------------
  const modaladdcallback = (visible, refresh = false) => {
    console.log('visiblecallback', refresh);
    statedispatch({ type: 'addVisible', visible });
    statedispatch({ type: 'selectedAllKeys', rows: [] });
  };

  const modaldelcallback = (visible, refresh = false) => {
    console.log('modaldelcallback', refresh);
    statedispatch({ type: 'delVisible', visible });
    statedispatch({ type: 'selectedAllKeys', rows: [] });
  };

  return (
    <PageHeaderWrapper title={currentType ? `${name}编辑（${currentType}）` : `${name}编辑`}>
      {info ? info(storedispatch) : null}
      <Card className={styles.listManagerContent}>
        <div className={styles.tableContent}>
          <div className={styles.searchContent}>
            <div>
              <span>{`${name}的${subname}:`}</span>
            </div>
            <div>
              <Button type="primary" onClick={addMember}>
                {`增加${name}`}
              </Button>
              <Button className="ant-btn-del" onClick={batchDelete}>
                批量删除
              </Button>
            </div>
          </div>
          <PageTable
            dispatch={storedispatch}
            params={{ id }}
            data={storedata.listdata}
            columns={columns(deleteConfirm, delloading)}
            loading={listdataloading}
            onSelectRow={rows => statedispatch({ type: 'selectedAllKeys', rows })}
            action={listAction}
            selectedRows={state.selectedAllKeys}
          />
        </div>
        <div className={styles.foonter_btns}>
          {currentType === '拟制中' ? (
            <Button
              type="primary"
              loading={changestatusloading}
              onClick={() => changeStatus('上架')}
            >
              上架
            </Button>
          ) : null}
          {currentType === '已下架' ? (
            <Button
              type="primary"
              loading={changestatusloading}
              onClick={() => changeStatus('重新上架')}
            >
              重新上架
            </Button>
          ) : null}
          <Button onClick={() => router.push(returnUrl)}>返回</Button>
        </div>
      </Card>
      <UserModalAdd
        // dispatch={storedispatch}
        addDataSource={storedata.addlistdata}
        // addDataSourceLoading={addlistdataLoading}
        visible={state.addVisible}
        id={id}
        name={name}
        subname={subname}
        visiblecallback={modaladdcallback}
        listAction={sublistAction} // "CourseManager/GetOtherTrainmanagers"
        addAction={addAction} // "CourseManager/SubmitAddedData"
      />
      <ModalDel
        dispatch={storedispatch}
        selectedAllKeys={state.selectedAllKeys}
        visible={state.delVisible}
        visiblecallback={modaldelcallback}
        id={id}
        name={name}
        subname={subname}
        delAtiontype={delAction}
      />
    </PageHeaderWrapper>
  );
}
