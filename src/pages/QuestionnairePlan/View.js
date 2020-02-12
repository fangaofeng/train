import React, { useReducer, useEffect } from 'react';
import { Card, Badge, Form, message } from 'antd';
// import router from 'umi/router';
// import Link from 'umi/link';
import { useDispatch, useSelector } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ExamBasicInfo from '@/components/ExamBasicInfo';

import PageTable from '@/components/PageTable';
import ModalTable from '@/components/Modal/ModalTable';
import styles from './Common.less';

const FormItem = Form.Item;

// @connect(({ ExamPlanManager, loading }) => ({
//   viewGroups: ExamPlanManager.viewGroups, // 学习计划管理——>查看学习计划（获取table表格数据）
//   viewGroupMembers: ExamPlanManager.viewGroupMembers, // 学习计划管理——>查看学习计划——>查看培训群组学习详情（获取table表格数据）
//   ViewGroupsLoading: loading.effects['ExamPlanManager/GetExamplanGroups'],
// }))

const initstate = {
  paperInfo: {},

  planInfo: {
    name: '', // 考试计划名称
    startTime: '', // 考试计划开始时间
    endTime: '', // 考试计划结束时间
  },
  group: {
    id: null, // 要显示群组成员的培训群组的ID
    name: '', // 要显示群组成员的模态框的群组名称
  },

  showModalTable: false, // 是否显示查看群组成员模态框
};

function reducer(state, action) {
  switch (action.type) {
    case 'paperInfo':
      return { ...state, paperInfo: action.paperInfo };
    case 'planInfo':
      return { ...state, planInfo: action.planInfo };
    case 'group':
      return { ...state, group: action.group };
    case 'showModalTable':
      return { ...state, showModalTable: action.showModalTable };
    default:
      throw new Error();
  }
}

const ViewPlan = props => {
  const [state, statedispatch] = useReducer(reducer, initstate);
  const reduxdispatch = useDispatch();
  const viewGroups = useSelector(store => store.ExamPlanManager.viewGroups);
  const viewGroupMembers = useSelector(store => store.ExamPlanManager.viewGroupMembers);
  const ViewGroupsLoading = useSelector(
    store => store.loading.effects['ExamPlanManager/GetExamplanGroups']
  );

  const {
    match: {
      params: { id },
    },
  } = props;
  const getExamInfo = () => {
    reduxdispatch({
      type: 'QuestionnairePlan/GetPlan',
      payload: {
        id, // id
      },
      callback: res => {
        if (res && res.status === 'ok') {
          statedispatch({ type: 'paperInfo', paperInfo: res.data.exampaper });
          statedispatch({
            type: 'planInfo',
            planInfo: {
              name: res.data.name,
              startTime: res.data.start_time,
              endTime: res.data.end_time,
            },
          });
        } else {
          message.warning('请求失败');
        }
      },
    });
  };
  useEffect(() => {
    getExamInfo();
  }, []);

  // ------------查看群组成员弹框------------
  // 点击“查看”按钮
  const viewModalTable = record => {
    statedispatch({
      type: 'group',
      group: {
        showModalTable: true,
        id: record.id,
        name: record.name, // 要显示群组成员的模态框的群组名称
      },
    });
    statedispatch({ type: 'showModalTable', showModalTable: true });
    // getModalTableTGMembers(current, pageSize, record.id);
  };

  // 点击“返回”按钮
  // const cancelViewModalTable = () => {
  //   statedispatch({
  //     type: 'group',
  //     group: {
  //       id: null,
  //       name: '', // 要显示群组成员的模态框的群组名称
  //     },
  //   });
  //   statedispatch({ type: 'showModalTable', showModalTable: false });
  // };

  // 表格行的类名
  const modalTableRowClassName = record => {
    let str;
    if (record.status === '未完成') {
      str = 'tableRowClassNameErr';
    } else {
      str = '';
    }
    return str;
  };

  const modalcallback = (visible, refresh = false) => {
    console.log('modalcallback', refresh);
    statedispatch({ type: 'showModalTable', showModalTable: false });
  };
  // ------------查看群组成员弹框------------

  const columns = [
    {
      title: '培训群组编号',
      dataIndex: 'id',
      render: (text, record) => <span>{record.id}</span>,
    },
    {
      title: '培训群组名称',
      dataIndex: 'name',

      render: (text, record) => <span>{record.name}</span>,
    },
    {
      title: '群组成员',
      dataIndex: 'count',
      render: (text, record) => <span>{record.count}</span>,
    },
    {
      title: (
        <div>
          <span>完成比</span>
          <br />
          <span>（完成人数/参加人数）</span>
        </div>
      ),
      align: 'center',
      dataIndex: 'ratio',

      render: (text, record) => <span>{record.ratio}</span>,
    },

    {
      title: '操作',
      dataIndex: 'opt',
      render: (text, record) => (
        <span>
          <a onClick={() => viewModalTable(record)}>查看详情</a>
        </span>
      ),
    },
  ];

  const modalTableColumns = [
    {
      title: '员工编号',
      align: 'center',
      dataIndex: 'user_number',
      render: (text, record) => <span>{record.user_no}</span>,
    },
    {
      title: '姓名',
      align: 'center',
      dataIndex: 'user_name',
      render: (text, record) => <span>{record.name}</span>,
    },
    {
      title: '归属部门',
      align: 'center',
      dataIndex: 'department_name',
      render: (text, record) => <span>{record.department_name}</span>,
    },
    {
      title: '考试状态',
      align: 'center',
      dataIndex: 'status',
      render: (text, record) => {
        let dom;
        if (record.status === '未完成') {
          dom = <Badge status="error" text={record.status} />;
        } else {
          dom = <span>{record.status}</span>;
        }
        return dom;
      },
    },
  ];
  // ------------查看群组成员弹框------------
  return (
    <PageHeaderWrapper title="考试学习计划">
      <ExamBasicInfo
        isShow
        ExamInfo={{
          ...state.paperInfo,
        }}
      />
      <Card className={styles.detailSP}>
        <Form hideRequiredMark layout="inline" className={styles.formContent}>
          <FormItem label="计划名称">
            <span>{state.planInfo.name}</span>
          </FormItem>
          <FormItem label="学习开放时间">
            <span>
              {state.planInfo.startTime} 至 {state.planInfo.endTime}
            </span>
          </FormItem>
        </Form>
        <div className={styles.tableContent} style={{ border: 'none' }}>
          <div className={styles.searchContent}>
            <div>
              <span>考试参加学习群组：</span>
            </div>
          </div>

          <PageTable
            {...props}
            id={id}
            data={viewGroups}
            columns={columns}
            loading={ViewGroupsLoading}
            action="ExamPlanManager/GetExamplanGroups"
          />
        </div>
      </Card>

      <ModalTable
        id={id}
        sid={state.group.id}
        visible={state.showModalTable}
        modalTitle="查看培训群组考试详情"
        Headerinfo={
          <Form layout="inline" style={{ marginRight: 20 }}>
            <FormItem label="群组编号">
              <span>{state.group.id}</span>
            </FormItem>
            <FormItem label="群组名称">
              <span>{state.group.name}</span>
            </FormItem>
          </Form>
        }
        data={viewGroupMembers}
        columns={modalTableColumns}
        visiblecallback={modalcallback}
        rowClassName={modalTableRowClassName}
        action="ExamPlanManager/getExamplanGroupMembers"
        dispatch={reduxdispatch}
      />
    </PageHeaderWrapper>
  );
};

export default ViewPlan;
