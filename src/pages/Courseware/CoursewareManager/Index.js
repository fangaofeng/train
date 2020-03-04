import React from 'react';
import { Divider, Button } from 'antd';
import router from 'umi/router';
import Link from 'umi/link';
import ManagerTable from '@/components/ManagerTable/index';

export default () => {
  const datalist = state => state.CourseManager.allCourseManager;
  const extrabutton = (
    <div className="">
      <Button type="primary" onClick={() => router.push('/courseware/uploadZip/uploadZip1')}>
        上传课件
      </Button>
    </div>
  );
  const columns = statedispatch => [
    {
      title: '课件编号',
      dataIndex: 'course_manager_KJBH',
      key: 'course_manager_KJBH',
      render: (text, record) => <span>{record.courseware_no}</span>,
    },
    {
      title: '课件名称',
      dataIndex: 'course_manager_KJMC',
      key: 'course_manager_KJMC',
      render: (text, record) => <span>{record.name}</span>,
    },
    {
      title: '课件分类',
      dataIndex: 'course_manager_KJFL',
      key: 'course_manager_KJFL',
      render: (text, record) => <span>{record.category}</span>,
    },
    {
      title: '课件类型',
      dataIndex: 'course_manager_KJLX',
      key: 'course_manager_KJLX',
      render: (text, record) => <span>{record.file_type}</span>,
    },
    {
      title: '课时',
      dataIndex: 'course_manager_KS',
      key: 'course_manager_KS',
      render: (text, record) => <span>{Number(record.class_hour)}</span>,
    },
    {
      title: '讲师',
      dataIndex: 'course_manager_JS',
      key: 'course_manager_JS',
      render: (text, record) => <span>{record.teachername}</span>,
    },
    {
      title: '状态',
      dataIndex: 'course_manager_status',
      key: 'course_manager_status',
      render: (text, record) => <span>{record.status}</span>,
    },
    {
      title: '创建人',
      dataIndex: 'course_manager_creater',
      key: 'course_manager_creater',
      render: (text, record) => <span>{record.creater}</span>,
    },
    {
      title: '操作',
      dataIndex: 'course_manager_opt',
      key: 'course_manager_opt',
      render: (text, record) => {
        let dom;
        if (record.status === '拟制中') {
          dom = (
            <span>
              <Link
                to={`/courseware/coursewareManager/edit/${record.id}?currentType=${record.status}`}
              >
                编辑
              </Link>
              <Divider type="vertical" />
              <a
                onClick={() =>
                  statedispatch({ type: 'deldataVisible', visible: true, id: record.id })
                }
              >
                删除
              </a>
            </span>
          );
        } else if (record.status === '已上架') {
          dom = (
            <span>
              <Link
                to={`/courseware/coursewareManager/edit/${record.id}?currentType=${record.status}`}
              >
                编辑
              </Link>
              <Divider type="vertical" />
              <a
                onClick={() =>
                  statedispatch({ type: 'offShelfVisible', visible: true, id: record.id })
                }
              >
                下架
              </a>
            </span>
          );
        } else if (record.status === '已下架') {
          dom = (
            <span>
              <Link
                to={`/courseware/coursewareManager/edit/${record.id}?currentType=${record.status}`}
              >
                编辑
              </Link>
              <Divider type="vertical" />
              <a
                onClick={() =>
                  statedispatch({ type: 'fileOnArchivevisible', visible: true, id: record.id })
                }
              >
                归档
              </a>
            </span>
          );
        } else if (record.status === '已归档') {
          dom = (
            <span>
              <a disabled>归档后禁止操作</a>
            </span>
          );
        }
        return dom;
      },
    },
  ];
  const props = {
    listAction: 'CourseManager/GetCourses',
    name: '课件',
    datalist,
    columns,
    extrabutton,
    changestatusAction: 'CourseManager/CourseChangeStatus',
    delAction: 'CourseManager/DelCourse',
  };

  return ManagerTable(props);
};
