import React from 'react';
import { Button, Popconfirm, Spin } from 'antd';
import { useSelector } from 'dva';
import EditContent from '@/components/EditContent';
import ExamBasicInfo from '@/components/ExamBasicInfo';

export default props => {
  const {
    location: {
      query: { currentType },
    },
    match: {
      params: { id },
    },
  } = props;
  const data = state => ({
    listdata: state.ExamManager.currenttrainmanagers,
    addlistdata: state.ExamManager.addtrainmanagers,
  });

  const detailloading = useSelector(store => store.loading.effects['ExamManager/GetPaperDetail']);

  const info = storedispatch => (
    <Spin spinning={detailloading}>
      <ExamBasicInfo
        dispatch={storedispatch}
        id={id}
        action="ExamManager/GetPaperDetail"
        isShow={false}
      />
    </Spin>
  );
  const commonColumns = [
    {
      title: '员工编号',
      dataIndex: 'user_number',
      key: 'user_number',
      render: (text, record) => <span>{record.user_no}</span>,
    },
    {
      title: '姓名',
      dataIndex: 'user_name',
      key: 'user_name',
      render: (text, record) => <span>{record.name}</span>,
    },
    {
      title: '归属部门',
      dataIndex: 'user_department',
      key: 'user_department',
      render: (text, record) => <span>{record.department_name}</span>,
    },
  ];
  const columns = (deleteConfirm, delloading) => {
    let arr = [];
    if (currentType === '拟制中') {
      arr = [
        ...commonColumns,
        {
          title: '操作',
          dataIndex: 'option',
          key: 'option',
          render: (text, record) => (
            <span>
              <Popconfirm
                placement="topRight"
                title="确认删除该条数据？"
                onConfirm={() => deleteConfirm(record.id)}
                okText="确定"
                cancelText="取消"
              >
                <Button type="link" loading={delloading}>
                  删除
                </Button>
              </Popconfirm>
            </span>
          ),
        },
      ];
    } else {
      arr = [
        ...commonColumns,
        {
          title: '已创建考试计划',
          dataIndex: 'createdPlan',
          key: 'createdPlan',
          render: (text, record) => <span>{record.createdPlan}</span>,
        },
        {
          title: '操作',
          dataIndex: 'option',
          key: 'option',
          render: (text, record) => (
            <span>
              <Popconfirm
                placement="topRight"
                title="确认删除该条数据？"
                onConfirm={() => deleteConfirm(record.id)}
                okText="确定"
                cancelText="取消"
              >
                <Button disabled={record.createdPlan === '是'} type="link">
                  删除
                </Button>
              </Popconfirm>
            </span>
          ),
        },
      ];
    }
    return arr;
  };

  const params = {
    listAction: 'ExamManager/GetTrainmanagers',
    name: '试卷',
    data,
    columns,
    changestatusAction: 'ExamManager/ChangeExamStatus',
    delAction: 'ExamManager/DelTrainmanagers',
    addAction: 'ExamManager/SubmitAddedData',
    sublistAction: 'ExamManager/GetOtherTrainmanagers',
    id,
    currentType,
    info,
    returnUrl: '/exam/examManager/index',
  };

  return EditContent(params);
};
