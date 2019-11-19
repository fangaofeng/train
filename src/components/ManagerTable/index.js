import React, { useReducer } from 'react';
import { Card, Modal, Icon, Button, Input, message } from 'antd';

import { useSelector, useDispatch } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PageTable from '@/components/PageTable';
import styles from './index.less';

const { Search } = Input;
const initialState = {
  fileOnArchivevisible: false,
  deldataVisible: false,
  offShelfVisible: false,
  id: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'fileOnArchivevisible':
      return { ...state, fileOnArchivevisible: action.visible, id: action.id };
    case 'deldataVisible':
      return { ...state, deldataVisible: action.visible, id: action.id };
    case 'offShelfVisible':
      return { ...state, offShelfVisible: action.visible, id: action.id };
    default:
      throw new Error();
  }
}

export default function ManagerTable(props) {
  const { listAction, datalist, name, columns, extrabutton, changestatusAction, delAction } = props;
  const storedispatch = useDispatch();
  const listdata = useSelector(store => datalist(store));
  const listdataloading = useSelector(store => store.loading.effects[listAction]);
  const changestatusloading = useSelector(store => store.loading.effects[changestatusAction]);
  const delloading = useSelector(store => store.loading.effects[delAction]);
  const [state, statedispatch] = useReducer(reducer, initialState);

  // 确定归档（归档成功后关闭模态框）
  const fileOnArchiveOK = () => {
    storedispatch({
      type: changestatusAction,
      payload: {
        id: state.id, // id
        data: {
          status: '已归档', // 0：拟制中；1：已上架；2：已下架；3：已归档
        },
      },
      callback: res => {
        statedispatch({ type: 'loading', loading: false });
        if (res && res.status === 'ok') {
          statedispatch({ type: 'fileOnArchivevisible', fileOnArchivevisible: false });
        } else {
          message.warning('归档失败');
        }
      },
    });
  };

  // -------------------------删除操作-------------------------

  // 确定删除（归档成功后关闭模态框）
  const delFileOK = () => {
    storedispatch({
      type: delAction,
      payload: {
        id: state.id,
      },
      callback: res => {
        const response = JSON.parse(res);
        if (response && response.status === 'ok') {
          message.success('删除成功');
          statedispatch({ type: 'deldataVisible', deldataVisible: false });
        } else {
          message.warning('删除失败');
        }
      },
    });
  };
  // -------------------------删除操作-------------------------

  // -------------------------下架操作-------------------------
  // 下架操作

  // 确定下架（归档成功后关闭模态框）
  const OffShelfOK = () => {
    storedispatch({
      type: changestatusAction,
      payload: {
        id: state.id, // id
        data: {
          status: '已下架', // 0：拟制中；1：已上架；2：已下架；3：已归档
        },
      },
      callback: res => {
        if (res && res.status === 'ok') {
          message.success('下架成功');
          statedispatch({ type: 'offShelfVisible', offShelfVisible: false });
        } else {
          message.warning('下架失败');
        }
      },
    });
  };
  // -------------------------下架操作-------------------------

  return (
    <PageHeaderWrapper title={`${name}管理`}>
      <Card className={styles.managerContent}>
        <div className={styles.searchContent}>
          <div className="">
            <Search
              placeholder={`输入${name}编号或名称过滤`}
              onSearch={value => value}
              style={{ width: 300 }}
            />
          </div>
          {extrabutton}
        </div>

        <PageTable
          dispatch={storedispatch}
          data={listdata}
          columns={columns(statedispatch)}
          loading={listdataloading}
          action={listAction}
        />
      </Card>
      <Modal
        visible={state.fileOnArchivevisible}
        title="归档提示"
        style={{ top: 150 }}
        onOk={fileOnArchiveOK}
        onCancel={() => statedispatch({ type: 'fileOnArchivevisible', visible: false, id: null })}
        // confirmLoading={loading}
        footer={
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" loading={changestatusloading} onClick={fileOnArchiveOK}>
              确定
            </Button>
            <Button
              onClick={() =>
                statedispatch({ type: 'fileOnArchivevisible', visible: false, id: null })
              }
            >
              取消
            </Button>
          </div>
        }
      >
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
          <Icon
            type="exclamation-circle"
            theme="filled"
            style={{ color: '#faad14', fontSize: '24px', marginRight: '15px' }}
          />
          <div>
            <div>
              确定要归档
              {`${name}`}
              吗？
            </div>
            <div>
              注意：
              {`${name}`}
              归档后不能重新上架！
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        visible={state.deldataVisible}
        title="删除提示"
        style={{ top: 150 }}
        onOk={delFileOK}
        onCancel={() => statedispatch({ type: 'deldataVisible', visible: false, id: null })}
        // confirmLoading={loading}
        footer={
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" loading={delloading} onClick={delFileOK}>
              确定
            </Button>
            <Button
              onClick={() => statedispatch({ type: 'deldataVisible', visible: false, id: null })}
            >
              取消
            </Button>
          </div>
        }
      >
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
          <Icon
            type="exclamation-circle"
            theme="filled"
            style={{ color: '#faad14', fontSize: '24px', marginRight: '15px' }}
          />
          <div>
            <div>
              确定要删除
              {`${name}`}
              吗？
            </div>
            <div>
              注意：
              {`${name}`}
              删除后无法恢复！
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        visible={state.offShelfVisible}
        title="下架提示"
        style={{ top: 150 }}
        onOk={OffShelfOK}
        onCancel={() => statedispatch({ type: 'offShelfVisible', visible: false, id: null })}
        confirmLoading={changestatusloading}
        footer={
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" loading={changestatusloading} onClick={OffShelfOK}>
              确定
            </Button>
            <Button
              onClick={() => statedispatch({ type: 'offShelfVisible', visible: false, id: null })}
            >
              取消
            </Button>
          </div>
        }
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px 0',
          }}
        >
          <Icon
            type="exclamation-circle"
            theme="filled"
            style={{ color: '#faad14', fontSize: '24px', marginRight: '15px' }}
          />
          确定要下架
          {`${name}`}
          吗？
        </div>
      </Modal>
    </PageHeaderWrapper>
  );
}
