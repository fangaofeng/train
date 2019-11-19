import React, { Component } from 'react';
import { Tree } from 'antd';
// import _ from 'lodash'
// import TreeIcon from './TreeIcon'
// import TreeInput from './TreeInput'

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

  static getDerivedStateFromProps(props, state) {
    if (props.treeList) {
      const treeData = this.formatData(props.treeList);
      return { ...state, treeData };
    }
    return state;
  }

  /**
   * 处理后台的数据
   * @param treeData
   */
  formatData = treeData =>
    treeData.map(item => {
      const mItem = { ...item, title: item.name, copyTitle: item.name, key: item.id };
      if (item.children) {
        mItem.children = this.formatData(item.children);
      }
      return mItem;
    });

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
      const TmItem = mItem;
      TmItem.title = TmItem.copyTitle;
      if (TmItem.children) {
        this.resetTreeNodes(TmItem.children);
      }
      return TmItem;
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
    treeData.map(mItem => {
      const TmItem = mItem;
      TmItem.title = TmItem.copyTitle;

      if (TmItem.children) {
        this.handleTreeData(TmItem.children, key, type);
      }

      return mItem;
    });
    const { onSelect } = this.props;
    onSelect(key);
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
    const { expandedKeys } = this.state;
    treeData = this.resetTreeNodes(treeData);
    treeData = this.handleTreeData(treeData, selectedKeys[0], 'select');
    this.setState({ treeData, expandedKeys: [...expandedKeys, selectedKeys[0]] });
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
