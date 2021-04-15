import React, { useState } from 'react';
import { Badge, Card, Button, Drawer, Descriptions, Spin } from 'antd';
import { request } from 'umi';
import ProTable from '@ant-design/pro-table';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ExamBasicInfo from '@/components/ExamBasicInfo';
import { examplanService } from '@/services';
import styles from './Common.less';

function EditExamPlan(props) {
  const [drawVisible, setDrawVisible] = useState(false);
  const [group, setGroup] = useState({ name: null, no: null });
  const {
    match: {
      params: { examPlanID },
    },
  } = props;
  const { data: explanInfo, loading } = examplanService.retriveRequest(examPlanID);
  const columns = [
    {
      title: '培训群组编号',
      dataIndex: 'group_no',
    },
    {
      title: '培训群组名称',
      dataIndex: 'name',
    },
    {
      title: '群组成员',
      dataIndex: 'count',
      valueType: 'digit',
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
    },

    {
      title: '操作',
      key: 'operations',
      valueType: 'option',
      render: (text, record) => [
        <Button
          type="link"
          onClick={() => {
            setDrawVisible(true);
            setGroup({ name: record.name, no: record.group_no });
          }}
        >
          查看详情
        </Button>,
      ],
    },
  ];
  const modalTableColumns = [
    {
      title: '员工编号',
      align: 'center',
      dataIndex: 'user_no',
    },
    {
      title: '姓名',
      align: 'center',
      dataIndex: 'name',
    },
    {
      title: '归属部门',
      align: 'center',
      dataIndex: 'department_name',
    },
    {
      title: '考试状态',
      align: 'center',
      dataIndex: 'user_status',
      key: 'user_status',
      render: (text, record) => {
        let dom;
        if (record.status === '未完成') {
          dom = [<Badge status="error" text={record.status} />];
        } else {
          dom = [<span>{record.status}</span>];
        }
        return dom;
      },
    },
  ];
  return (
    <PageHeaderWrapper title="查看考试计划">
      <Spin spinning={loading}>
        <ExamBasicInfo isShow ExamInfo={explanInfo?.exampaper} />
      </Spin>
      <Card className={styles.testInfoDetail}>
        <Descriptions title="考试计划信息" bordered>
          <Descriptions.Item label="考试名称">{explanInfo.name}</Descriptions.Item>
          <Descriptions.Item label="开放时间">{explanInfo.start_time}</Descriptions.Item>
          <Descriptions.Item label="结束时间">{explanInfo.end_time}</Descriptions.Item>
        </Descriptions>
        <ProTable
          columns={columns}
          request={async (params = {}) => {
            const { data } = await request(() => examplanService.getGroups(examPlanID), {
              params,
            });
            return {
              data: data.results,
              current: params.current,
              success: true,
              total: data.count,
            };
          }}
        />
      </Card>

      <Drawer
        title={`群组${group?.name}-编号${group?.no}`}
        closable={false}
        onClose={() => setDrawVisible(false)}
        visible={drawVisible}
      >
        <ProTable
          columns={modalTableColumns}
          request={async (params = {}) => {
            const { data } = await request(
              () => examplanService.getGroupMembers(examPlanID, group.no),
              {
                params,
              },
            );
            return {
              data: data.results,
              current: params.current,
              success: true,
              total: data.count,
            };
          }}
        />
      </Drawer>
    </PageHeaderWrapper>
  );
}

export default EditExamPlan;
