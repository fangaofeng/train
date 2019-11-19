import React, { Component } from 'react';
import { Button, Tree, Modal } from 'antd';
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
    const { treeList } = this.props;
    if (!_.isEqual(treeList, nextProps.treeList)) {
      const treeData = this.formatData(nextProps.treeList);
      this.setState({ treeData });
    }
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
          <TreeNode title={item.title} key={item.id} dataRef={item}>
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
    treeData.map((mItem, mIndex) => {
      const TmItem = mItem;
      TmItem.title = TmItem.copyTitle;
      if (String(TmItem.key) === String(key)) {
        // 选中节点，在节点后面添加edit、del、add的Icon
        if (type === 'select') {
          TmItem.title = (
            <TreeIcon
              editNode={() => this.editNode(TmItem.key)}
              addNode={() => this.addNode(TmItem.key)}
              delNode={() => this.delNode(TmItem.key)}
              title={TmItem.copyTitle || ''}
            />
          );
        }
        // 添加节点，0级添加1级，1级添加2级，2级添加3级，3级添加3级，都在最后面添加
        if (type === 'add') {
          if (Number(TmItem.level) === 3) {
            // 三级添加三级
            treeData.push({
              title: <TreeInput blurInput={value => this.blurInput(value, mItem, 'add')} />,
              key: -1,
            });
          } else {
            TmItem.children = [
              ...TmItem.children,
              {
                title: <TreeInput blurInput={value => this.blurInput(value, mItem, 'add')} />,
                key: -1,
              },
            ];
          }
        }
        // 编辑节点，若节点编辑为''，则变为编辑前的内容，变为input框
        if (type === 'edit') {
          TmItem.title = (
            <TreeInput
              value={mItem.copyTitle}
              key={mItem.key}
              blurInput={value => this.blurInput(value, mItem, 'edit')}
            />
          );
        }
        // input blur 事件，添加的节点为''时，不执行添加
        if (type === 'blur') {
          // eslint-disable-next-line no-unused-expressions
          TmItem.title ? (TmItem.title = TmItem.copyTitle) : treeData.splice(mIndex, 1);
        }
        // 删除节点，删除当前节点及全部子节点
        if (type === 'del') {
          treeData.splice(mIndex, 1);
        }
      } else if (mItem.children) {
        this.handleTreeData(mItem.children, key, type);
      }
      return TmItem;
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
   * input blur事件，保存数据
   * @param value 子组件TreeInput的value值
   * @param item
   * @param type
   */
  blurInput = (value, item, type) => {
    const { addService, editService } = this.props;
    if (value === '') {
      this.changeNode(type === 'add' ? -1 : item.id, 'blur');
      return;
    }
    // 发起保存的action  编辑或添加
    if (type === 'add') {
      const payload = {
        name: value,
        parentId: Number(item.level) === 3 ? item.parentId : item.id,
        level: Number(item.level) === 3 ? item.level : Number(item.level) + 1,
      };
      addService(payload);
    } else if (type === 'edit') {
      const payload = {
        name: value,
        id: item.id,
      };
      editService(payload);
    }
  };

  /**
   * 编辑节点
   * @param key
   */
  editNode = key => {
    this.changeNode(key, 'edit');
  };

  /**
   * 添加节点
   * @param key
   */
  addNode = key => {
    if (key === null) {
      // 添加一级
      let { treeData } = this.state;
      treeData = this.resetTreeNodes(treeData);
      const item = {
        level: 0,
        id: 1,
      };
      treeData.push({
        title: <TreeInput blurInput={value => this.blurInput(value, item, 'add')} />,
        key: -1,
      });
      this.setState({ treeData });
    } else {
      // 添加二级或三级
      this.changeNode(key, 'add');
    }
  };

  /**
   * 删除节点
   * @param key
   */
  delNode = key => {
    const { delService } = this.props;
    Modal.confirm({
      title: '删除',
      content: '确定删除吗？',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        delService({ id: key });
      },
      onCancel() {},
    });
  };

  /**
   * 选择树节点
   * @param selectedKeys
   */
  onSelect = selectedKeys => {
    const { expandedKeys } = this.state;
    let { treeData } = this.state;
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
        <Button type="dashed" className={styles['add-btn']} onClick={() => this.addNode(null)}>
          + 添加
        </Button>
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
