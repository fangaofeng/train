import React, { Component } from 'react';
import { Button, Tree, Modal, Row, Col } from 'antd';
import _ from 'lodash';
import TreeIcon from './TreeIcon';
import TreeInput from './TreeInput';

import styles from './index.less';

const { TreeNode } = Tree;

export default class TreeEdit extends Component {
  constructor(props) {
    super(props);
    const treeData = this.formatData(props.treeList);
    this.state = {
      treeData,
      expandedKeys: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    // 这里处理store数据，处理成与antd Tree格式一样的，保存至state中
    if (!_.isEqual(this.props.treeList, nextProps.treeList)) {
      const treeData = this.formatData(nextProps.treeList);
      this.setState({ treeData });
    }
  }

  /**
   * 处理后台的数据
   * @param treeData
   */
  formatData = treeData => {
    treeData.map(mItem => {
      mItem.title = mItem.name;
      mItem.copyTitle = mItem.name;
      mItem.key = mItem.id;
      if (mItem.children) {
        this.formatData(mItem.children);
      }
    });
    return treeData;
  };

  /**
   * 渲染树节点
   * @param treeData
   */
  renderTreeNodes = treeData =>
    treeData.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });

  /**
   * 还原数据
   * @param treeData
   */
  resetTreeNodes = treeData => {
    treeData.map(mItem => {
      mItem.title = mItem.copyTitle;
      if (mItem.children) {
        this.resetTreeNodes(mItem.children);
      }
    });
    return treeData;
  };

  /**
   * 处理数据
   * @param treeData
   * @param key 选中节点的key
   * @param type 'add' 'del' 'edit'  'blur'
   */
  handleTreeData = (treeData, key, type) => {
    treeData.map((mItem, mIndex) => {
      mItem.title = mItem.copyTitle;
      if (String(mItem.key) === String(key)) {
      } else {
        // 递归
        if (mItem.children) {
          this.handleTreeData(mItem.children, key, type);
        }
      }
    });
    return treeData;
  };

  /**
   * 改变节点的公共方法
   * @param key
   * @param type 'add' 'del' 'edit'  'blur'
   */
  changeNode = (key, type) => {
    let { treeData } = this.state;
    treeData = this.handleTreeData(treeData, key, type);
    this.setState({ treeData });
  };

  /**
   * 选择树节点
   * @param selectedKeys
   */
  onSelect = selectedKeys => {
    let { treeData } = this.state;
    treeData = this.resetTreeNodes(treeData);
    treeData = this.handleTreeData(treeData, selectedKeys[0], 'select');
    this.setState({ treeData, expandedKeys: [...this.state.expandedKeys, selectedKeys[0]] });
  };

  /**
   * 展开或收起树节点
   * @param expandedKeys
   */
  onExpand = expandedKeys => {
    this.setState({ expandedKeys });
  };

  render() {
    const { treeData, expandedKeys } = this.state;
    return (
      <div className={styles.body}>
        <Tree
          showLine
          expandedKeys={expandedKeys}
          onSelect={this.onSelect}
          onExpand={this.onExpand}
        >
          {this.renderTreeNodes(treeData)}
        </Tree>
      </div>
    );
  }
}
