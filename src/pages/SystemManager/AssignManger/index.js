import React, { Component } from 'react';
import { Card, Tree, Row, Col } from 'antd';
import router from 'umi/router';
import SelfCard from '@/components/Workbench/selfCard';
import Link from 'umi/link';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './index.less';
import TreeOtherOpration from '@/components/TreeOtherOpration';

const { TreeNode } = Tree;

@connect(({ DepartmentManager }) => ({}))
class DepartmentManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /**
       * 默认是'',调用接口判断。
       * 无部门————'noDep' ;
       * 有部门，没有用户————'noUser' ;
       * 有部门，有用户————'hasUser' ;
       */
      uploadStatus: 'noDep',
      alreadyExistTreeData: [], // 已经存在部门，可以有用户，可以没有用户，树形控件数据
    };
  }

  // 页面将要加载完成
  componentWillMount() {
    this.isAlreadyExist();
  }

  // 判断：<1>.无部门；<2>.有部门，没有用户；<3>.有部门，有用户；
  isAlreadyExist = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'DepartmentManager/GetOrgsDeparments',
      callback: res => {
        if (res.status === 'ok') {
          console.log('成功', res);
          if (res.ui === 'onlyupload') {
            this.setState({
              uploadStatus: 'noDep',
            });
          } else if (res.ui === 'canupload') {
            this.setState({
              uploadStatus: 'noUser',
              alreadyExistTreeData: res.data,
            });
          } else if (res.ui === 'noupload') {
            this.setState({
              uploadStatus: 'hasUser',
              alreadyExistTreeData: res.data,
            });
          }
        } else {
          console.log('失败', res);
        }
      },
    });
  };

  render() {
    const { alreadyExistTreeData } = this.state;

    return (
      <PageHeaderWrapper title="部门管理员管理">
        <Card>
          <Row type="flex" justify="space-between" gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <SelfCard bordered={false} title="部门名称">
                <TreeOtherOpration treeList={alreadyExistTreeData} />
              </SelfCard>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <SelfCard
                bordered={false}
                title="对应部门管理员"
                actions={[<a>修改</a>, <a>删除</a>]}
              >
                {/* <Button type="dashed" className={styles.newButton}>
                  <Icon type="plus" /> 新建产品
                </Button>
                <Meta title="Card title" description="This is the description" /> */}
                <div className={styles.courseInfo}>
                  <div className={styles.courseInfoImgContent}>
                    <div className={styles.imgLeft}>
                      <img
                        src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
                        alt=""
                      />
                    </div>
                    <div className={styles.imgRight}>
                      <div className={styles.msgDetail}>
                        <span>课件编号：</span>
                        <span className={styles.msgDetailOverflow} title="阿三发射点发">
                          阿三发射点发
                        </span>
                      </div>
                      <div className={styles.msgDetail}>
                        <span>课件名称：</span>
                        <span className={styles.msgDetailOverflow} title="sdf ">
                          阿三发射点发
                        </span>
                      </div>
                      <div className={styles.msgDetail}>
                        <span>课&emsp;&emsp;时：</span>
                        <span>阿三发射点发</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SelfCard>
            </Col>
          </Row>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default DepartmentManager;
