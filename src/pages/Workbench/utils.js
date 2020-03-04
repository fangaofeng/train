// eslint-disable-next-line no-unused-vars
import React from 'react';
import noDataTips1 from '@/assets/images/Workbench/001.png';
import noDataTips2 from '@/assets/images/Workbench/002.png';
import noDataTips3 from '@/assets/images/Workbench/003.png';
import noDataTips4 from '@/assets/images/Workbench/004.png';

const noDataTips = {
  courseManager: {
    imgSrc: noDataTips1,
    title: '还没有课件，请先上传课件',
  },
  examManager: {
    imgSrc: noDataTips2,
    title: '还没有试卷，请先上传试卷',
  },
  newestCourse: {
    imgSrc: noDataTips1,
    title: '还没有课程，请等待系统管理员上架课程',
  },
  newestExam: {
    imgSrc: noDataTips2,
    title: '还没有试卷，请等待系统管理员上传试卷',
  },
  toDoList: {
    imgSrc: noDataTips3,
    title: '没有待办事项',
  },
  stuToDo: {
    imgSrc: noDataTips4,
    title: '没有待完成课程或考试',
  },
  stuDone: {
    imgSrc: noDataTips4,
    title: '没有已完成课程或考试',
  },
  stuOverdue: {
    imgSrc: noDataTips4,
    title: '没有已逾期课程或考试',
  },
  stuRecommend: {
    imgSrc: noDataTips1,
    title: '没有推荐课程，请等待系统管理员上架课程',
  },
};

export default noDataTips;
