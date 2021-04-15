import React from 'react';
import { Card, Row, Col, Spin, Button, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history } from 'umi';

import TreeEdit from '@/components/TreeEditDynamic';
import SelfCard from '@/components/Workbench/selfCard';
import { departmentService } from '@/services';
import styles from './style.less';

function DepartmentManager() {
  const { data, loading } = departmentService.listRequest();

  const patch = departmentService.patchRequest(null, null, {
    manual: true,
    onError: (_error, params) => {
      message.error(`添加部门失败: ${params[0]}`);
    },
    onSuccess: (result, params) => {
      if (result) {
        message.success(`添加部门成功 ${params[0]}`);
      }
    },
  });
  const create = departmentService.createRequest(null, {
    manual: true,
    onError: (error, params) => {
      message.error(`修改失败： ${params[0]}`);
    },
    onSuccess: (result, params) => {
      if (result) {
        message.success(`修改成功 ${params[0]}`);
      }
    },
  });
  const destory = departmentService.destoryRequest(null, {
    manual: true,
    onError: (error, params) => {
      message.error(`删除失败： ${params[0]}`);
    },
    onSuccess: (result, params) => {
      if (result) {
        message.success(`删除成功 ${params[0]}`);
      }
    },
  });
  const addService = palyload => {
    create.run({ name: palyload.name, parent: palyload.parent });
  };

  const editService = palyload => {
    patch.run(palyload.id, { name: palyload.name });
  };

  const delService = palyload => {
    destory.run(palyload.id);
  };

  // if (data && data.ui === 'onlyupload') {
  //   history.push('/DepartmentManager/import');
  //   return '';
  // }
  const extra =
    data?.length === 0 && !loading === 'canupload' ? (
      <Button type="link" onClick={() => history.push('/DepartmentManager/import')}>
        {' '}
        导入部门信息
      </Button>
    ) : (
      ''
    );
  return (
    <PageHeaderWrapper>
      <Spin spinning={loading}>
        <Card className={styles.departmentManagerContent}>
          {/* -------------有部门，没有用户------------- */}
          <Row className={styles.deparmentAlreadyExist}>
            <Col xs={24} sm={24} md={11}>
              <SelfCard bordered={false} title="部门名称" nopanding="true">
                <TreeEdit
                  treeList={data || []}
                  addService={addService}
                  editService={editService}
                  delService={delService}
                />
              </SelfCard>
            </Col>
            <Col md={1} />
            <Col xs={24} sm={24} md={12}>
              <SelfCard bordered={false} title="部门信息" extra={extra} nopanding="true" />
            </Col>
          </Row>
        </Card>
      </Spin>
    </PageHeaderWrapper>
  );
}

export default DepartmentManager;
