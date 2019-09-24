import React, { Component } from 'react';
import { Button, Tree } from 'antd';
import TreeIcon from './TreeIcon';
import TreeInput from './TreeInput';
import styles from './index.less';

const { TreeNode } = Tree;

const treeData = [
  {
    title: '0-0',
    copyTitle: '0-0',
    key: '0-0',
    id: 1,
    parentId: -1,
    children: [
      {
        title: '0-0-0',
        copyTitle: '0-0-0',
        key: '0-0-0',
        id: 11,
        parentId: 1,
        children: [
          { title: '0-0-0-0', copyTitle: '0-0-0-0', id: 111, parentId: 2, key: '0-0-0-0' },
          { title: '0-0-0-1', copyTitle: '0-0-0-1', id: 112, parentId: 2, key: '0-0-0-1' },
          { title: '0-0-0-2', copyTitle: '0-0-0-2', id: 113, parentId: 2, key: '0-0-0-2' },
        ],
      },
      {
        title: '0-0-1',
        copyTitle: '0-0-1',
        key: '0-0-1',
        parentId: 1,
        id: 12,
        children: [
          { title: '0-0-1-0', copyTitle: '0-0-1-0', id: 121, parentId: 3, key: '0-0-1-0' },
          { title: '0-0-1-1', copyTitle: '0-0-1-1', id: 122, parentId: 3, key: '0-0-1-1' },
          { title: '0-0-1-2', copyTitle: '0-0-1-2', id: 123, parentId: 3, key: '0-0-1-2' },
        ],
      },
      {
        title: '0-0-2',
        copyTitle: '0-0-2',
        key: '0-0-2',
        parentId: 1,
        id: 13,
        children: [],
      },
    ],
  },
  {
    title: '0-1',
    copyTitle: '0-1',
    key: '0-1',
    parentId: -1,
    id: 2,
    children: [
      {
        title: '0-1-0-0',
        copyTitle: '0-1-0-0',
        parentId: 5,
        id: 21,
        key: '0-1-0-0',
        isEdit: false,
        selected: false,
        children: [],
      },
      {
        title: '0-1-0-1',
        copyTitle: '0-1-0-1',
        parentId: 5,
        id: 22,
        key: '0-1-0-1',
        isEdit: false,
        selected: false,
        children: [],
      },
      {
        title: '0-1-0-2',
        copyTitle: '0-1-0-2',
        parentId: 5,
        id: 23,
        key: '0-1-0-2',
        isEdit: false,
        selected: false,
        children: [],
      },
    ],
  },
  {
    title: '0-2',
    copyTitle: '0-2',
    key: '0-2',
    parentId: -1,
    id: 3,
    children: [],
  },
];

export default class TreeEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData,
      inputValue: '',
      expandedKeys: [],
    };
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps, nextContext) {}

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
   * 处理数据（静态）
   * @param treeData
   * @param key 选中节点的key
   * @param type 'add' 'del' 'edit' 'blur'
   */
  handleTreeData = (treeData, key, type) => {
    treeData.map((mItem, mIndex) => {
      mItem.title = mItem.copyTitle;
      if (String(mItem.key) === String(key)) {
        // 选中节点，在节点后面添加edit、del、add的Icon
        if (type === 'select') {
          mItem.title = (
            <TreeIcon
              editNode={() => this.editNode(mItem.key)}
              addNode={() => this.addNode(mItem.key)}
              delNode={() => this.delNode(mItem.key)}
              title={mItem.copyTitle || ''}
            />
          );
        }
        // 添加节点，0级添加1级，1级添加2级，2级添加3级，3级添加3级，都在最后面添加
        if (type === 'add') {
          if (mItem.children && mItem.parentId === -1) {
            // 一级添加二级
            const idx = mItem.children.length;
            const id = idx === 0 ? `${mItem.id}1` : Number(mItem.children[idx - 1].id) + 1;
            mItem.children = [
              ...mItem.children,
              {
                title: <TreeInput blurInput={value => this.blurInput(value, id)} />,
                key: id,
                id,
                parentId: mItem.id,
                children: [],
              },
            ];
          } else if (mItem.children && mItem.parentId !== -1) {
            // 二级添加三级
            const idx = mItem.children.length;
            const id = idx === 0 ? `${mItem.id}1` : Number(mItem.children[idx - 1].id) + 1;
            mItem.children = [
              ...mItem.children,
              {
                title: <TreeInput blurInput={value => this.blurInput(value, id)} />,
                key: id,
                id,
                parentId: mItem.id,
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
              parentId: mItem.parentId,
            });
          }
        }
        // 编辑节点，变为input框
        if (type === 'edit') {
          mItem.title = (
            <TreeInput
              value={mItem.copyTitle}
              key={mItem.key}
              blurInput={value => this.blurInput(value, mItem.key)}
            />
          );
        }
        // input blur 事件，value值变为title
        if (type === 'blur') {
          mItem.title = this.state.inputValue;
          mItem.copyTitle = this.state.inputValue;
          if (mItem.title === '') {
            treeData.splice(mIndex, 1);
          }
        }
        // 删除节点，删除当前与子节点
        if (type === 'del') {
          treeData.splice(mIndex, 1);
        }
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
