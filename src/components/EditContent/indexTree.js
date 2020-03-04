import React, { useReducer, useEffect } from 'react';
import { Card, Button, message, Spin } from 'antd';
import router from 'umi/router';
import { useSelector, useDispatch } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './Common.less';

import TreeSelect from './tree';

const initialState = {
  checkedKeys: [], // 选中的数据组成的数组（只包含key值）
};

function reducer(state, action) {
  switch (action.type) {
    case 'checkedKeys':
      return { ...state, checkedKeys: action.checkedKeys };
    default:
      throw new Error();
  }
}
export default function EditContent(props) {
  const {
    action,
    getCheckedKeys,
    data,
    name,
    currentType,
    subaction,
    changestatusAction,
    changeDataAction,
    id,
    Info,
    returnUrl,
    subname,
  } = props;
  const storedispatch = useDispatch();
  const datainfo = useSelector(store => data(store));

  const changestatusloading = useSelector(store => store.loading.effects[changestatusAction]);
  const checkedKeys = useSelector(store => getCheckedKeys(store));
  console.log(checkedKeys);
  const changedataloading = useSelector(store => store.loading.effects[changeDataAction]);
  // console.log(checkedKeys);
  const [state, statedispatch] = useReducer(reducer, initialState);
  const detailloading = useSelector(store => store.loading.effects[action]);

  const getdata = () => {
    storedispatch({
      type: action,
      payload: {
        id, // id
      },
      callback: resdata => {
        return resdata;
      },
    });
  };
  useEffect(() => {
    getdata();
  }, []);
  useEffect(() => {
    if (checkedKeys) statedispatch({ type: 'checkedKeys', checkedKeys });
  }, [checkedKeys]);
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
        } else {
          message.warning(`${msg}失败`);
        }
      },
    });
  };
  const changeData = msg => {
    storedispatch({
      type: changeDataAction,
      payload: {
        id, // id
        data: {
          departments: state.checkedKeys,
        },
      },
      callback: res => {
        if (res && res.status === 'ok') {
          message.success(`${msg}成功`);
        } else {
          message.warning(`${msg}失败`);
        }
      },
    });
  };
  return (
    <PageHeaderWrapper title={currentType ? `${name}编辑（${currentType}）` : `${name}编辑`}>
      {Info && datainfo ? (
        <Spin spinning={detailloading}>
          <Info {...datainfo} />
        </Spin>
      ) : null}

      <Card
        className={styles.treeManagerContent}
        title={`${name}的${subname}`}
        extra={
          <Button type="primary" loading={changedataloading} onClick={() => changeData('上架')}>
            提交授权部门
          </Button>
        }
      >
        {checkedKeys ? (
          <TreeSelect
            onCheck={checkedallKeys =>
              statedispatch({ type: 'checkedKeys', checkedKeys: checkedallKeys })
            }
            action={subaction}
            checkedKeys={state.checkedKeys}
            name={subname}
          />
        ) : (
          ''
        )}
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
    </PageHeaderWrapper>
  );
}
