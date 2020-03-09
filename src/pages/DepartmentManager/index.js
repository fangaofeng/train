import React, { Component } from 'react';
import { Card, Row, Col, Spin, Button, message } from 'antd';
import { connect } from 'dva';
// import { Link } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { history } from 'umi';
import styles from './style.less';
import TreeEdit from '@/components/TreeEditDynamic';
import SelfCard from '@/components/Workbench/selfCard';

// const { TreeNode } = Tree;

@connect(({ DepartmentManager, loading }) => ({
  departments: DepartmentManager.departments,
  ui: DepartmentManager.ui,
  departmentloading: loading.effects['DepartmentManager/GetOrgsDeparments'],
}))
class DepartmentManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /**
       * 默认是'',调用接口判断。
       * 无部门————'noDep' ;
       * 有部门，没有用户————'noUser' ;
       * 有部门，有用户————'hasUser' ;
       * 上传中————'uploading'；
       * 上传成功后————'success'
       */
      // uploadStatus: '',
    };
  }

  // 页面将要加载完成
  componentDidMount() {
    this.GetAlreadyOrgs();
  }

  // 判断：<1>.无部门；<2>.有部门，没有用户；<3>.有部门，有用户；
  GetAlreadyOrgs = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'DepartmentManager/GetOrgsDeparments',
    });
  };

  addService = palyload => {
    const { dispatch } = this.props;
    dispatch({
      type: 'DepartmentManager/CreateOrgsDeparments',
      payload: { name: palyload.name, parent: palyload.parent },
      callback: res => {
        if (res && res.status === 'ok') {
          message.info(`添加部门成功`);
        } else {
          message.error(`添加部门失败，错误码${res.status}`);
        }
      },
    });
  };

  editService = palyload => {
    const { dispatch } = this.props;
    dispatch({
      type: 'DepartmentManager/PatchOrgsDeparments',
      payload: { data: { name: palyload.name }, id: palyload.id },
      callback: res => {
        if (res && res.status === 'ok') {
          message.info(`修改部门失败，错误码`);
        } else {
          message.error(`修改部门失败，错误码${res.status}`);
        }
      },
    });
  };

  delService = palyload => {
    const { dispatch } = this.props;
    dispatch({
      type: 'DepartmentManager/DelOrgsDeparments',
      payload: { id: palyload.id },
      callback: res => {
        if (res && res.status === 'ok') {
          message.info(`删除部门失败`);
        } else {
          message.error(`删除部门失败，错误码${res.status}`);
        }
      },
    });
  };

  render() {
    const { departmentloading, departments, ui } = this.props;
    if (ui === 'onlyupload') history.push('/DepartmentManager/import');
    const extra =
      ui === 'canupload' ? (
        <Button type="link" onClick={() => history.push('/DepartmentManager/import')}>
          {' '}
          重新导入部门信息
        </Button>
      ) : (
        ''
      );
    return (
      <PageHeaderWrapper title="部门管理">
        <Spin spinning={departmentloading}>
          <Card className={styles.departmentManagerContent}>
            {/* -------------有部门，没有用户------------- */}
            <Row className={styles.deparmentAlreadyExist}>
              <Col xs={24} sm={24} md={11}>
                <SelfCard bordered={false} title="部门名称" nopanding="true">
                  <TreeEdit
                    treeList={departments}
                    addService={this.addService}
                    editService={this.editService}
                    delService={this.delService}
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
}

export default DepartmentManager;
