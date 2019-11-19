import React, { useReducer } from 'react';
import { Card, Button, message } from 'antd';
import router from 'umi/router';
import { useSelector, useDispatch } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PageTable from '@/components/PageTable';
import styles from '@/components/Modal/Common.less';
import ModalDel from '@/components/Modal/ModalDel';

// const { Search } = Input;
const initialState = {
  selectedAllKeys: [], // 选中的数据组成的数组（只包含key值）
  delVisible: false, // 批量删除的模态框————>显示隐藏
};

function reducer(state, action) {
  switch (action.type) {
    case 'selectedAllKeys':
      return { ...state, selectedAllKeys: action.rows };
    case 'delVisible':
      return { ...state, delVisible: action.visible };

    default:
      throw new Error();
  }
}
export default function EditContent(props) {
  const { listAction, listdata, name, delAction, columns, addUrl } = props;
  const storedispatch = useDispatch();
  const data = useSelector(store => listdata(store));
  const listdataloading = useSelector(store => store.loading.effects[listAction]);
  const delloading = useSelector(store => store.loading.effects[delAction]);
  const [state, statedispatch] = useReducer(reducer, initialState);

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

  const modaldelcallback = (visible, refresh = false) => {
    console.log('modaldelcallback', refresh);
    statedispatch({ type: 'delVisible', visible });
    statedispatch({ type: 'selectedAllKeys', rows: [] });
  };

  return (
    <PageHeaderWrapper title={`${name}管理`}>
      <Card className={styles.listManagerContent}>
        <div className={styles.tableContent}>
          <div className={styles.searchContent}>
            <div>
              <span>{`可以使用本${name}的培训管理员：`}</span>
            </div>
            <div>
              <Button type="primary" onClick={() => router.push(addUrl)}>
                {`增加${name}`}
              </Button>
              <Button className="ant-btn-del" onClick={batchDelete}>
                批量删除
              </Button>
            </div>
          </div>
          <PageTable
            dispatch={storedispatch}
            data={data}
            columns={columns(deleteConfirm, delloading)}
            loading={listdataloading}
            onSelectRow={rows => statedispatch({ type: 'selectedAllKeys', rows })}
            action={listAction}
            selectedRows={state.selectedAllKeys}
          />
        </div>
      </Card>
      <ModalDel
        dispatch={storedispatch}
        selectedAllKeys={state.selectedAllKeys}
        visible={state.delVisible}
        visiblecallback={modaldelcallback}
        delAtiontype={delAction}
      />
    </PageHeaderWrapper>
  );
}
