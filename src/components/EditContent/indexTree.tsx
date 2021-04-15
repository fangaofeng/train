import React, { useState } from 'react';
import { Card, Button, message, Spin } from 'antd';
import { history } from 'umi';
import styles from './Common.less';
import TreeSelect from './tree';

export default function EditContent(props) {
  const { service, treeService, currentType, id, Info, returnUrl, subname } = props;
  const [checkedKeys, setCheckedKeys] = useState([]);
  const { data, loading } = service.retriveRequest(id, null, {
    onSuccess: restul => {
      setCheckedKeys(restul.departments);
    },
  });

  const patch = service.patch(id, data, {
    manual: true,
    fetchKey: id,
    onError: (error, params) => {
      message.error(`修改失败： ${params[0]}`);
    },
    onSuccess: (result, params) => {
      if (result) {
        message.success(`修改成功 ${params[0]}`);
      }
    },
  });

  const changeStatus = msg => {
    patch.run(id, { status: msg });
  };
  const changeData = () => {
    patch.run(id, { departments: checkedKeys });
  };
  return (
    <>
      {Info && data ? (
        <Spin spinning={loading}>
          <Info {...data} />
        </Spin>
      ) : null}

      <Card
        className={styles.treeManagerContent}
        title={`${subname}`}
        extra={
          <Button type="primary" loading={patch.loading} onClick={() => changeData()}>
            提交授权部门
          </Button>
        }
      >
        {checkedKeys ? (
          <TreeSelect
            onChange={checkedallKeys => setCheckedKeys(checkedallKeys)}
            service={treeService}
            checkedKeys={checkedKeys}
            name={subname}
          />
        ) : (
          ''
        )}
        <div className={styles.foonter_btns}>
          {currentType === '拟制中' ? (
            <Button type="primary" loading={patch.loading} onClick={() => changeStatus('已上架')}>
              上架
            </Button>
          ) : null}
          {currentType === '已下架' ? (
            <Button type="primary" loading={patch.loading} onClick={() => changeStatus('已上架')}>
              重新上架
            </Button>
          ) : null}
          <Button onClick={() => history.push(returnUrl)}>返回</Button>
        </div>
      </Card>
    </>
  );
}
