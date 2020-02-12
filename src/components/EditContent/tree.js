import React, { useReducer, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'dva';

import { Tree } from 'antd';

const { TreeNode } = Tree;
// const formatData = treeData =>
//   treeData.map(item => {
//     const mItem = { title: item.name, copyTitle: item.name, key: item.id };
//     if (item.children) {
//       mItem.children = formatData(item.children);
//     }
//     return mItem;
//   });
function reducer(state, action) {
  switch (action.type) {
    // case 'selectedAllKeys':
    //   return { ...state, selectedAllKeys: action.selectedAllKeys };
    case 'expandedKeys':
      return { ...state, expandedKeys: action.expandedKeys };
    case 'autoExpandParent':
      return { ...state, autoExpandParent: action.autoExpandParent };
    case 'checkedKeys':
      return { ...state, checkedKeys: action.checkedKeys };
    default:
      throw new Error();
  }
}

export default function TreeCheckBox(props) {
  const { action, onCheck, checkedKeys } = props;
  const storedispatch = useDispatch();
  const treedata = useSelector(store => store.DepartmentManager.departments);

  const [state, statedispatch] = useReducer(reducer, { checkedKeys, autoExpandParent: true });
  const getListData = useCallback(() =>
    storedispatch({
      type: action,
    })
  );

  useEffect(() => {
    getListData();
  }, []);

  const onExpand = expandedKeys => {
    // console.log('onExpand', expandedKeys);

    statedispatch({ type: 'expandedKeys', expandedKeys });
    statedispatch({ type: 'autoExpandParent', autoExpandParent: false });
  };
  const onCheckself = tcheckedKeys => {
    // console.log('onExpand', expandedKeys);

    statedispatch({ type: 'checkedKeys', tcheckedKeys });
    if (onCheckself) {
      onCheck(tcheckedKeys);
    }
  };
  const renderTreeNodes = tdata =>
    tdata.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.id} dataRef={item}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.id} title={item.name} {...item} />;
    });

  // const tt = renderTreeNodes(ttreedata);
  // console.log('ttreedata', ttreedata);
  // console.log('tt', tt);

  return (
    <Tree
      checkable
      onExpand={onExpand}
      expandedKeys={state.expandedKeys}
      autoExpandParent={state.autoExpandParent}
      onCheck={onCheckself}
      checkedKeys={state.checkedKeys}
    >
      {renderTreeNodes(treedata)}
    </Tree>
  );
}
