// 代码中会兼容本地 service mock 以及部署站点的静态数据
// const basicUrl = 'http://192.168.101.72';
const basicUrl = 'http://localhost';

export default {
  // 获取平台公告
  'GET /api/workbench/getAnnouncement': [
    {
      imgSrc: `${basicUrl}/001.jpg`,
      content: '关于2018年秋季公司全员合规技能竞赛的通知',
      date: '2018/09/01',
      time: '09:56',
    },
    {
      imgSrc: `${basicUrl}/002.jpg`,
      content: '关于2018年秋季公司全员合规技能竞赛的通知',
      date: '2018/09/01',
      time: '09:56',
    },
    {
      imgSrc: `${basicUrl}/003.jpg`,
      content: '关于2018年秋季公司全员合规技能竞赛的通知',
      date: '2018/09/01',
      time: '09:56',
    },
    {
      imgSrc: `${basicUrl}/004.jpg`,
      content: '关于2018年秋季公司全员合规技能竞赛的通知',
      date: '2018/09/01',
      time: '09:56',
    },
    {
      imgSrc: `${basicUrl}/005.jpg`,
      content: '关于2018年秋季公司全员合规技能竞赛的通知',
      date: '2018/09/01',
      time: '09:56',
    },
  ],

  'GET /api/workbench/latestExam': (req, res) => {
    res.send([
      {
        id: '10',
        imgSrc: `${basicUrl}/001.jpg`, // 背景图片
        studyTime: '3', // 学时
        title: '关于2018年秋季公司全员合规技能竞赛的通知', // 标题
        // teacher:'欧阳狄恩',
        suitablePerson: '财务管理人员等等',
        // isFinished:'Y',// 拟制中为'N' or 已上架为'Y'
        // progress:'70',// 进度条
        // days:'3天'// 剩余天数
        // type:'course',// 课程还是考试
      },
      {
        id: '0002',
        imgSrc: `${basicUrl}/002.jpg`, // 背景图片
        studyTime: '3', // 学时
        title: '关于2018年秋季公司全员合规技能竞赛的通知', // 标题
        // teacher:'欧阳狄恩',
        suitablePerson: '财务管理人员等等',
        // isFinished:'N',// 拟制中为'N' or 已上架为'Y'
        // progress:'70',// 进度条
        // days:'3天'// 剩余天数
        // type:'course',// 课程还是考试
      },
      {
        id: '0003',
        imgSrc: `${basicUrl}/003.jpg`, // 背景图片
        studyTime: '3', // 学时
        title: '关于2018年秋季公司全员合规技能竞赛的通知', // 标题
        // teacher:'欧阳狄恩',
        suitablePerson: '财务管理人员等等',
        // isFinished:'Y',// 拟制中为'N' or 已上架为'Y'
        // progress:'70',// 进度条
        // days:'3天'// 剩余天数
        // type:'course',// 课程还是考试
      },
      {
        id: '0004',
        imgSrc: `${basicUrl}/004.jpg`, // 背景图片
        studyTime: '3', // 学时
        title: '关于2018年秋季公司全员合规技能竞赛的通知', // 标题
        // teacher:'欧阳狄恩',
        suitablePerson: '财务管理人员等等',
        // isFinished:'N',// 拟制中为'N' or 已上架为'Y'
        // progress:'70',// 进度条
        // days:'3天'// 剩余天数
        // type:'course',// 课程还是考试
      },
    ]);
  },

  // 学员待完成、已完成、已逾期
  'GET /api/exam/aggregation': (req, res) => {
    res.send({
      status: 'ok',
      data: {
        completed: [
          // 已完成
          {
            id: 2003,
            days_remaining: '3', // 剩余天数
            end_time: '2018-10-12 23:30:58',
            plan: {
              name: '关于2018年秋季公司全员合规技能竞赛的通知',
              end_time: '2018-10-12 23:30:58',
              course: {
                class_hour: '1.50',
                cover: `${basicUrl}/002.jpg`,
                // "file_type": "MP4",
              },
            },
            progress: {},
          },

          {
            id: 2004,
            days_remaining: '3', // 剩余天数
            end_time: '2018-10-12 23:30:58',
            plan: {
              name: '关于2018年秋季公司全员合规技能竞赛的通知',
              end_time: '2018-10-12 23:30:58',
              course: {
                class_hour: '1.50',
                cover: `${basicUrl}/004.jpg`,
                // "file_type": "PDF",
              },
            },
            progress: {},
          },
        ],
        todo: [
          {
            id: 1002,
            status: '未开始',
            days_remaining: '3', // 剩余天数
            plan: {
              name: '关于2018年秋季公司全员合规技能竞赛的通知',
              start_time: '2018-10-12 23:30:58',
              end_time: '2018-10-12 23:30:58',
              course: {
                class_hour: '1.50',
                cover: `${basicUrl}/002.jpg`,
                // "file_type": "MP4",
              },
            },
            progress: {},
          },
          {
            id: 1004,
            status: '已指派',
            type: 'exam',
            days_remaining: '3', // 剩余天数
            plan: {
              name: '关于2018年秋季公司全员合规技能竞赛的通知',
              start_time: '2018-10-12 23:30:58',
              end_time: '2018-10-12 23:30:58',
              course: {
                class_hour: '1.50',
                cover: `${basicUrl}/002.jpg`,
                // "file_type": "MP4",
              },
            },
            progress: {},
          },
          // {
          //   "id": 1006,
          //   'status':'考试中',
          //   "type": "exam",
          //   'rate_progress':'',// 百分比进度条
          //   'days_remaining':'3',// 剩余天数
          //   'plan':{
          //     "name": "关于2018年秋季公司全员合规技能竞赛的通知",
          //     'start_time':"2018-10-12 23:30:58",
          //     "end_time": "2018-10-12 23:30:58",
          //     'course':{
          //       "class_hour": "1.50",
          //       "cover": `${basicUrl}/002.jpg`,
          //       // "file_type": "MP4",
          //     }
          //   },
          //   "progress": {},
          // },
        ],
        overdue: [],
      },
    });
  },
  // 学员待完成、已完成、已逾期
  'GET /api/learn/aggregation': (req, res) => {
    res.send({
      status: 'ok',
      data: {
        completed: [
          // 已完成
          {
            id: 2001,
            rate_progress: 0, // 百分比进度条
            days_remaining: '3', // 剩余天数
            plan: {
              name: '关于2018年秋季公司全员合规技能竞赛的通知',
              end_time: '2018-10-12',
              course: {
                class_hour: '1.50',
                cover: `${basicUrl}/001.jpg`,
                file_type: 'MP4',
              },
            },
            progress: {},
          },
          {
            id: 2002,
            type: 'course',
            rate_progress: '90', // 百分比进度条
            days_remaining: '3', // 剩余天数
            plan: {
              name: '关于2018年秋季公司全员合规技能竞赛的通知',
              end_time: '2018-10-12',
              course: {
                class_hour: '1.50',
                cover: `${basicUrl}/003.jpg`,
                file_type: 'PDF',
              },
            },
            progress: {},
          },
        ],
        todo: [
          // 待完成
          {
            id: 1001,
            status: '未开始',

            rate_progress: 0, // 百分比进度条
            days_remaining: '3', // 剩余天数
            plan: {
              name: '关于2018年秋季公司全员合规技能竞赛的通知',
              start_time: '2018-10-12',
              end_time: '2018-10-12',
              course: {
                class_hour: '1.50',
                cover: `${basicUrl}/001.jpg`,
                file_type: 'MP4',
              },
            },
            progress: {},
          },
          {
            id: 1003,
            status: '已指派',
            rate_progress: 0, // 百分比进度条
            days_remaining: '3', // 剩余天数
            plan: {
              name: '关于2018年秋季公司全员合规技能竞赛的通知',
              start_time: '2018-10-12',
              end_time: '2018-10-12',
              course: {
                class_hour: '1.50',
                cover: `${basicUrl}/001.jpg`,
                file_type: 'MP4',
              },
            },
            progress: {},
          },
          // {
          //   "id": 1005,
          //   'status':'学习中',
          //   "type": "course",
          //   'rate_progress':70,// 百分比进度条
          //   'days_remaining':'3',// 剩余天数
          //   'plan':{
          //     "name": "关于2018年秋季公司全员合规技能竞赛的通知",
          //     'start_time':"2018-10-12",
          //     "end_time": "2018-10-12",
          //     'course':{
          //       "class_hour": "1.50",
          //       "cover": `${basicUrl}/001.jpg`,
          //       "file_type": "MP4",
          //     }
          //   },
          //   "progress": {},
          // },

          // {
          //   "id": 1006,
          //   'status':'考试中',
          //   "type": "exam",
          //   'rate_progress':'',// 百分比进度条
          //   'days_remaining':'3',// 剩余天数
          //   'plan':{
          //     "name": "关于2018年秋季公司全员合规技能竞赛的通知",
          //     'start_time':"2018-10-12 23:30:58",
          //     "end_time": "2018-10-12 23:30:58",
          //     'course':{
          //       "class_hour": "1.50",
          //       "cover": `${basicUrl}/002.jpg`,
          //       // "file_type": "MP4",
          //     }
          //   },
          //   "progress": {},
          // },
        ],
        overdue: [
          // 已逾期
          {
            id: 1001,
            status: '超期未完成',

            rate_progress: 0, // 百分比进度条
            days_remaining: 0, // 剩余天数
            plan: {
              name: '关于2018年秋季公司全员合规技能竞赛的通知',
              start_time: '2018-10-12',
              end_time: '2018-10-12',
              course: {
                class_hour: '1.50',
                cover: `${basicUrl}/001.jpg`,
                file_type: 'MP4',
              },
            },
            progress: {},
          },
          {
            id: 1002,
            status: '超期未完成',
            rate_progress: 0, // 百分比进度条
            days_remaining: 0, // 剩余天数
            plan: {
              name: '关于2018年秋季公司全员合规技能竞赛的通知',
              start_time: '2018-10-12',
              end_time: '2018-10-12',
              course: {
                class_hour: '1.50',
                cover: `${basicUrl}/001.jpg`,
                file_type: 'MP4',
              },
            },
            progress: {},
          },
          {
            id: 1003,
            status: '超期未完成',
            type: 'course',
            rate_progress: 70, // 百分比进度条
            days_remaining: 0, // 剩余天数
            plan: {
              name: '关于2018年秋季公司全员合规技能竞赛的通知',
              start_time: '2018-10-12',
              end_time: '2018-10-12',
              course: {
                class_hour: '1.50',
                cover: `${basicUrl}/001.jpg`,
                file_type: 'MP4',
              },
            },
            progress: {},
          },
          {
            id: 1004,
            status: '超期未完成',
            type: 'course',
            rate_progress: 70, // 百分比进度条
            days_remaining: 0, // 剩余天数
            plan: {
              name: '关于2018年秋季公司全员合规技能竞赛的通知',
              start_time: '2018-10-12',
              end_time: '2018-10-12',
              course: {
                class_hour: '1.50',
                cover: `${basicUrl}/001.jpg`,
                file_type: 'MP4',
              },
            },
            progress: {},
          },
          // {
          //   "id": 1005,
          //   'status':'超期未完成',
          //   "type": "exam",
          //   'rate_progress':'',// 百分比进度条
          //   'days_remaining':'3',// 剩余天数
          //   'plan':{
          //     "name": "关于2018年秋季公司全员合规技能竞赛的通知",
          //     'start_time':"2018-10-12",
          //     "end_time": "2018-10-12",
          //     'course':{
          //       "class_hour": "1.50",
          //       "cover": `${basicUrl}/002.jpg`,
          //       // "file_type": "MP4",
          //     }
          //   },
          //   "progress": {},
          // },
          // {
          //   "id": 1006,
          //   'status':'超期未完成',
          //   "type": "exam",
          //   'rate_progress':'',// 百分比进度条
          //   'days_remaining':'3',// 剩余天数
          //   'plan':{
          //     "name": "关于2018年秋季公司全员合规技能竞赛的通知",
          //     'start_time':"2018-10-12",
          //     "end_time": "2018-10-12",
          //     'course':{
          //       "class_hour": "1.50",
          //       "cover": `${basicUrl}/002.jpg`,
          //       // "file_type": "MP4",
          //     }
          //   },
          //   "progress": {},
          // },
          // {
          //   "id": 1007,
          //   'status':'超期未完成',
          //   "type": "exam",
          //   'rate_progress':'',// 百分比进度条
          //   'days_remaining':'3',// 剩余天数
          //   'plan':{
          //     "name": "关于2018年秋季公司全员合规技能竞赛的通知",
          //     'start_time':"2018-10-12",
          //     "end_time": "2018-10-12",
          //     'course':{
          //       "class_hour": "1.50",
          //       "cover": `${basicUrl}/002.jpg`,
          //       // "file_type": "MP4",
          //     }
          //   },
          //   "progress": {},
          // },
        ],
      },
    });
  },
  // 学员推荐课程
  'GET /api/workbench/stuRecommendCourse': (req, res) => {
    res.send([
      {
        id: '0001',
        imgSrc: `${basicUrl}/001.jpg`, // 背景图片
        studyTime: '3', // 学时
        title: '关于2018年秋季公司全员合规技能竞赛的通知', // 标题
        teacher: '欧阳狄恩',
        suitablePerson: '财务管理人员等等',
        // isFinished:'Y',// 拟制中为'N' or 已上架为'Y'
        // progress:'70',// 进度条
        // days:'3天'// 剩余天数
        // type:'course',// 课程还是考试
      },
      {
        id: '0002',
        imgSrc: `${basicUrl}/002.jpg`, // 背景图片
        studyTime: '3', // 学时
        title: '关于2018年秋季公司全员合规技能竞赛的通知', // 标题
        teacher: '欧阳狄恩',
        suitablePerson: '财务管理人员等等',
        // isFinished:'N',// 拟制中为'N' or 已上架为'Y'
        // progress:'70',// 进度条
        // days:'3天'// 剩余天数
        // type:'course',// 课程还是考试
      },
      {
        id: '0003',
        imgSrc: `${basicUrl}/003.jpg`, // 背景图片
        studyTime: '3', // 学时
        title: '关于2018年秋季公司全员合规技能竞赛的通知', // 标题
        teacher: '欧阳狄恩',
        suitablePerson: '财务管理人员等等',
        // isFinished:'Y',// 拟制中为'N' or 已上架为'Y'
        // progress:'70',// 进度条
        // days:'3天'// 剩余天数
        // type:'course',// 课程还是考试
      },
      {
        id: '0004',
        imgSrc: `${basicUrl}/004.jpg`, // 背景图片
        studyTime: '3', // 学时
        title: '关于2018年秋季公司全员合规技能竞赛的通知', // 标题
        teacher: '欧阳狄恩',
        suitablePerson: '财务管理人员等等',
        // isFinished:'N',// 拟制中为'N' or 已上架为'Y'
        // progress:'70',// 进度条
        // days:'3天'// 剩余天数
        // type:'course',// 课程还是考试
      },
    ]);
  },
};
