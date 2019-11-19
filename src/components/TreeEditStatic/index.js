import React, { Component } from 'react';
import { Button, Tree } from 'antd';
import TreeIcon from './TreeIcon';
import TreeInput from './TreeInput';
import styles from './index.less';

const { TreeNode } = Tree;

export default class TreeEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: null,
      inputValue: '',
      expandedKeys: [],
    };
  }

  componentDidMount() {}

  // UNSAFE_componentWillReceiveProps(nextProps, nextContext) {}

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
      TmItem.title = mItem.copyTitle;
      if (TmItem.children) {
        this.resetTreeNodes(TmItem.children);
      }
      return TmItem;
    });
    return treeData;
  };

  /**
   * 处理数据（静态）
   * @param treeData
   * @param key 选中节点的key
   * @param type 'add' 'del' 'edit' 'blur'
   */
  handleTreeData = (treeData, key, type) => {
    treeData.map((mItem, mIndex) => {
      const TmItem = mItem;
      TmItem.title = mItem.copyTitle;
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
          if (TmItem.children && TmItem.parentId === -1) {
            // 一级添加二级
            const idx = TmItem.children.length;
            const id = idx === 0 ? `${TmItem.id}1` : Number(TmItem.children[idx - 1].id) + 1;
            TmItem.children = [
              ...TmItem.children,
              {
                title: <TreeInput blurInput={value => this.blurInput(value, id)} />,
                key: id,
                id,
                parentId: TmItem.id,
                children: [],
              },
            ];
          } else if (TmItem.children && TmItem.parentId !== -1) {
            // 二级添加三级
            const idx = TmItem.children.length;
            const id = idx === 0 ? `${TmItem.id}1` : Number(TmItem.children[idx - 1].id) + 1;
            TmItem.children = [
              ...TmItem.children,
              {
                title: <TreeInput blurInput={value => this.blurInput(value, id)} />,
                key: id,
                id,
                parentId: TmItem.id,
              },
            ];
          } else {
            // 三级添加三级
            const idx = treeData.length;
            const id = Number(treeData[idx - 1].id) + 1;
            treeData.push({
              title: <TreeInput blurInput={value => this.blurInput(value, id)} />,
              key: id,
              id,
              parentId: TmItem.parentId,
            });
          }
        }
        // 编辑节点，变为input框
        if (type === 'edit') {
          TmItem.title = (
            <TreeInput
              value={TmItem.copyTitle}
              key={TmItem.key}
              blurInput={value => this.blurInput(value, TmItem.key)}
            />
          );
        }
        // input blur 事件，value值变为title
        if (type === 'blur') {
          const { inputValue } = this.state;
          TmItem.title = inputValue;
          TmItem.copyTitle = inputValue;
          if (TmItem.title === '') {
            treeData.splice(mIndex, 1);
          }
        }
        // 删除节点，删除当前与子节点
        if (type === 'del') {
          treeData.splice(mIndex, 1);
        }
      } else if (TmItem.children) {
        this.handleTreeData(TmItem.children, key, type);
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
   * @param value
   * @param key
   */
  blurInput = (value, key) => {
    this.setState({ inputValue: value }, () => {
      this.changeNode(key, 'blur');
    });
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
      const { treeData } = this.state;
      const idx = treeData.length;
      const id = Number(treeData[idx - 1].id) + 1;
      treeData.push({
        title: <TreeInput blurInput={value => this.blurInput(value, id)} />,
        key: id,
        id,
        parentId: -1,
        children: [],
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
    this.changeNode(key, 'del');
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
          + 添加一级节点
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
