// 代码中会兼容本地 service mock 以及部署站点的静态数据
// const basicUrl = 'http://192.168.101.72';
const basicUrl = 'http://localhost';

export default {
    // 获取平台公告
    'GET /api/workbench/getAnnouncement':[
        {
          imgSrc:`${basicUrl}/001.jpg`,
          content:'关于2018年秋季公司全员合规技能竞赛的通知',
          date:'2018/09/01',
          time:'09:56'
        },
        {
          imgSrc:`${basicUrl}/002.jpg`,
          content:'关于2018年秋季公司全员合规技能竞赛的通知',
          date:'2018/09/01',
          time:'09:56'
        },
        {
          imgSrc:`${basicUrl}/003.jpg`,
          content:'关于2018年秋季公司全员合规技能竞赛的通知',
          date:'2018/09/01',
          time:'09:56'
        },
        {
          imgSrc:`${basicUrl}/004.jpg`,
          content:'关于2018年秋季公司全员合规技能竞赛的通知',
          date:'2018/09/01',
          time:'09:56'
        },
        {
          imgSrc:`${basicUrl}/005.jpg`,
          content:'关于2018年秋季公司全员合规技能竞赛的通知',
          date:'2018/09/01',
          time:'09:56'
        }
    ],
    // // 系统管理员中获取课件管理
    // 'POST /api/workbench/courseManager': (req, res) => {
    //   res.send([
    //     {
    //       id:'001',
    //       imgSrc:`${basicUrl}/001.jpg`,// 背景图片
    //       studyTime:'3',// 学时
    //       title:'关于2018年秋季公司全员合规技能竞赛的通知',// 标题
    //       // isFinished:'Y',// 拟制中为'N' or 已上架为'Y'
    //       // progress:'70',// 进度条
    //       // days:'3天'// 剩余天数
    //       // type:'course',// 课程还是考试
    //       status:'拟制中',// 状态。‘拟制中’、‘已上架’、‘已下架’、‘已归档’
    //     },
    //     {
    //       id:'002',
    //       imgSrc:`${basicUrl}/002.jpg`,// 背景图片
    //       studyTime:'3',// 学时
    //       title:'关于2018年秋季公司全员合规技能竞赛的通知',// 标题
    //       // isFinished:'N',// 拟制中为'N' or 已上架为'Y'
    //       // progress:'70',// 进度条
    //       // days:'3天'// 剩余天数
    //       // type:'course',// 课程还是考试
    //       status:'已上架',// 状态。‘拟制中’、‘已上架’、‘已下架’、‘已归档’
    //     },
    //     {
    //       id:'003',
    //       imgSrc:`${basicUrl}/003.jpg`,// 背景图片
    //       studyTime:'2',// 学时
    //       title:'关于2018年秋季公司全员合规技能竞赛的通知',// 标题
    //       // isFinished:'N',// 拟制中为'N' or 已上架为'Y'
    //       // progress:'70',// 进度条
    //       // days:'3天'// 剩余天数
    //       // type:'course',// 课程还是考试
    //       status:'已下架',// 状态。‘拟制中’、‘已上架’、‘已下架’、‘已归档’
    //     },
    //     {
    //       id:'004',
    //       imgSrc:`${basicUrl}/004.jpg`,// 背景图片
    //       studyTime:'5',// 学时
    //       title:'关于2018年秋季公司全员合规技能竞赛的通知',// 标题
    //       // isFinished:'Y',// 拟制中为'N' or 已上架为'Y'
    //       // progress:'70',// 进度条
    //       // days:'3天'// 剩余天数
    //       // type:'course',// 课程还是考试
    //       status:'已归档',// 状态。‘拟制中’、‘已上架’、‘已下架’、‘已归档’
    //     }
    //   ])
    // },
    // 系统管理员中获取试卷管理
    'POST /api/workbench/examManager': (req, res) => {
      res.send([
        {
          id:'0001',
          imgSrc:`${basicUrl}/001.jpg`,// 背景图片
          // studyTime:'3学时',// 学时
          title:'关于2018年秋季公司全员合规技能竞赛的通知',// 标题
          // isFinished:'Y',// 拟制中为'N' or 已上架为'Y'
          // progress:'70',// 进度条
          // days:'3天'// 剩余天数
          // type:'course',// 课程还是考试
          status:'拟制中',// 状态。‘拟制中’、‘已上架’、‘已下架’、‘已归档’
        },
        {
          id:'0002',
          imgSrc:`${basicUrl}/002.jpg`,// 背景图片
          // studyTime:'3学时',// 学时
          title:'关于2018年秋季公司全员合规技能竞赛的通知',// 标题
          // isFinished:'N',// 拟制中为'N' or 已上架为'Y'
          // progress:'70',// 进度条
          // days:'3天'// 剩余天数
          // type:'course',// 课程还是考试
          status:'已上架',// 状态。‘拟制中’、‘已上架’、‘已下架’、‘已归档’
        },
        {
          id:'0003',
          imgSrc:`${basicUrl}/003.jpg`,// 背景图片
          // studyTime:'3学时',// 学时
          title:'关于2018年秋季公司全员合规技能竞赛的通知',// 标题
          // isFinished:'Y',// 拟制中为'N' or 已上架为'Y'
          // progress:'70',// 进度条
          // days:'3天'// 剩余天数
          // type:'course',// 课程还是考试
          status:'已下架',// 状态。‘拟制中’、‘已上架’、‘已下架’、‘已归档’
        },
        {
          id:'0004',
          imgSrc:`${basicUrl}/004.jpg`,// 背景图片
          // studyTime:'3学时',// 学时
          title:'关于2018年秋季公司全员合规技能竞赛的通知',// 标题
          // isFinished:'N',// 拟制中为'N' or 已上架为'Y'
          // progress:'70',// 进度条
          // days:'3天'// 剩余天数
          // type:'course',// 课程还是考试
          status:'已归档',// 状态。‘拟制中’、‘已上架’、‘已下架’、‘已归档’
        }
      ])
    },
    // 系统管理员平台运营数据

    // 培训管理员获取最新课程
    // 'GET /api/course/ware': (req, res) => {
    //   res.send({
    //     status:'ok',
    //     data:{
    //       count: 4,
    //       next: null,
    //       previous: null,
    //       results:[
    //         {
    //           applicable_user: "string",
    //           category: "公开课",
    //           class_hour: "1.50",
    //           courseware_file: "http://192.168.101.11:8000/media/coursewarefile/string_fhlhg.mp4",
    //           courseware_no: "string",
    //           courseware_type: "通用课件",
    //           cover: `${basicUrl}/001.jpg`,// 背景图片
    //           drag_flag: true,
    //           file_type: "MP4",
    //           id: 10,
    //           intruduce: "string",
    //           name: "string",
    //           property: {duration: 59.7},
    //           status: "拟制",
    //           teacherdesc: "string",
    //           teacherimg: "http://192.168.101.11:8000/media/teacherimg/string_fhlhg.jpg",
    //           teachername: "string",
    //         },
    //         {
    //           applicable_user: "string",
    //           category: "公开课",
    //           class_hour: "1.50",
    //           courseware_file: "http://192.168.101.11:8000/media/coursewarefile/string_fhlhg.mp4",
    //           courseware_no: "string",
    //           courseware_type: "通用课件",
    //           cover: `${basicUrl}/002.jpg`,// 背景图片
    //           drag_flag: true,
    //           file_type: "MP4",
    //           id: 11,
    //           intruduce: "string",
    //           name: "string",
    //           property: {duration: 59.7},
    //           status: "拟制",
    //           teacherdesc: "string",
    //           teacherimg: "http://192.168.101.11:8000/media/teacherimg/string_fhlhg.jpg",
    //           teachername: "string",
    //         },
    //         {
    //           applicable_user: "string",
    //           category: "公开课",
    //           class_hour: "1.50",
    //           courseware_file: "http://192.168.101.11:8000/media/coursewarefile/string_fhlhg.mp4",
    //           courseware_no: "string",
    //           courseware_type: "通用课件",
    //           cover: `${basicUrl}/003.jpg`,// 背景图片
    //           drag_flag: true,
    //           file_type: "MP4",
    //           id: 12,
    //           intruduce: "string",
    //           name: "string",
    //           property: {duration: 59.7},
    //           status: "拟制",
    //           teacherdesc: "string",
    //           teacherimg: "http://192.168.101.11:8000/media/teacherimg/string_fhlhg.jpg",
    //           teachername: "string",
    //         },
    //         {
    //           applicable_user: "string",
    //           category: "公开课",
    //           class_hour: "1.50",
    //           courseware_file: "http://192.168.101.11:8000/media/coursewarefile/string_fhlhg.mp4",
    //           courseware_no: "string",
    //           courseware_type: "通用课件",
    //           cover: `${basicUrl}/004.jpg`,// 背景图片
    //           drag_flag: true,
    //           file_type: "MP4",
    //           id: 13,
    //           intruduce: "string",
    //           name: "string",
    //           property: {duration: 59.7},
    //           status: "拟制",
    //           teacherdesc: "string",
    //           teacherimg: "http://192.168.101.11:8000/media/teacherimg/string_fhlhg.jpg",
    //           teachername: "string",
    //         },
    //       ]
    //     }
    //   })
    // },
    // // 培训管理员获取最新课程
    // 'POST /api/workbench/latestCourse': (req, res) => {
    //   res.send([
    //     {
    //       id:10,
    //       imgSrc:`${basicUrl}/001.jpg`,// 背景图片
    //       studyTime:'3',// 学时
    //       title:'关于2018年秋季公司全员合规技能竞赛的通知',// 标题
    //       teacher:'欧阳狄恩',
    //       suitablePerson:'财务管理人员等等',
    //       // isFinished:'Y',// 拟制中为'N' or 已上架为'Y'
    //       // progress:'70',// 进度条
    //       // days:'3天'// 剩余天数
    //       // type:'course',// 课程还是考试
    //     },
    //     {
    //       id:'0002',
    //       imgSrc:`${basicUrl}/002.jpg`,// 背景图片
    //       studyTime:'3',// 学时
    //       title:'关于2018年秋季公司全员合规技能竞赛的通知',// 标题
    //       teacher:'欧阳狄恩',
    //       suitablePerson:'财务管理人员等等',
    //       // isFinished:'N',// 拟制中为'N' or 已上架为'Y'
    //       // progress:'70',// 进度条
    //       // days:'3天'// 剩余天数
    //       // type:'course',// 课程还是考试
    //     },
    //     {
    //       id:'0003',
    //       imgSrc:`${basicUrl}/003.jpg`,// 背景图片
    //       studyTime:'3',// 学时
    //       title:'关于2018年秋季公司全员合规技能竞赛的通知',// 标题
    //       teacher:'欧阳狄恩',
    //       suitablePerson:'财务管理人员等等',
    //       // isFinished:'Y',// 拟制中为'N' or 已上架为'Y'
    //       // progress:'70',// 进度条
    //       // days:'3天'// 剩余天数
    //       // type:'course',// 课程还是考试
    //     },
    //     {
    //       id:'0004',
    //       imgSrc:`${basicUrl}/004.jpg`,// 背景图片
    //       studyTime:'3',// 学时
    //       title:'关于2018年秋季公司全员合规技能竞赛的通知',// 标题
    //       teacher:'欧阳狄恩',
    //       suitablePerson:'财务管理人员等等',
    //       // isFinished:'N',// 拟制中为'N' or 已上架为'Y'
    //       // progress:'70',// 进度条
    //       // days:'3天'// 剩余天数
    //       // type:'course',// 课程还是考试
    //     }
    //   ])
    // },
     // 培训管理员获取最新试卷
     'POST /api/workbench/latestExam': (req, res) => {
      res.send([
        {
          id:'10',
          imgSrc:`${basicUrl}/001.jpg`,// 背景图片
          studyTime:'3',// 学时
          title:'关于2018年秋季公司全员合规技能竞赛的通知',// 标题
          // teacher:'欧阳狄恩',
          suitablePerson:'财务管理人员等等',
          // isFinished:'Y',// 拟制中为'N' or 已上架为'Y'
          // progress:'70',// 进度条
          // days:'3天'// 剩余天数
          // type:'course',// 课程还是考试
        },
        {
          id:'0002',
          imgSrc:`${basicUrl}/002.jpg`,// 背景图片
          studyTime:'3',// 学时
          title:'关于2018年秋季公司全员合规技能竞赛的通知',// 标题
          // teacher:'欧阳狄恩',
          suitablePerson:'财务管理人员等等',
          // isFinished:'N',// 拟制中为'N' or 已上架为'Y'
          // progress:'70',// 进度条
          // days:'3天'// 剩余天数
          // type:'course',// 课程还是考试
        },
        {
          id:'0003',
          imgSrc:`${basicUrl}/003.jpg`,// 背景图片
          studyTime:'3',// 学时
          title:'关于2018年秋季公司全员合规技能竞赛的通知',// 标题
          // teacher:'欧阳狄恩',
          suitablePerson:'财务管理人员等等',
          // isFinished:'Y',// 拟制中为'N' or 已上架为'Y'
          // progress:'70',// 进度条
          // days:'3天'// 剩余天数
          // type:'course',// 课程还是考试
        },
        {
          id:'0004',
          imgSrc:`${basicUrl}/004.jpg`,// 背景图片
          studyTime:'3',// 学时
          title:'关于2018年秋季公司全员合规技能竞赛的通知',// 标题
          // teacher:'欧阳狄恩',
          suitablePerson:'财务管理人员等等',
          // isFinished:'N',// 拟制中为'N' or 已上架为'Y'
          // progress:'70',// 进度条
          // days:'3天'// 剩余天数
          // type:'course',// 课程还是考试
        }
      ])
    },
    // 培训管理员待办事项


    // {
    //   "id": 7,
    //   "status": "已指派",
    //   "start_time": null,
    //   "end_time": null,
    //   "progress": {},
    //   "create_time": "2018-11-30 11:20:40",
    //   "type": "course",
    //   "plan_no": 12,
    //   "trainer": 1,
    //   "traingroup": 23,
    //   "plan": {
    //     "id": 12,
    //     "name": "1233",
    //     "start_time": "2018-10-10",
    //     "creater": 1,
    //     "questionanswer": "3/7",
    //     "course": {
    //       "id": 1,
    //       "courseware_no": "1234",
    //       "name": "string",
    //       "category": "公开课",
    //       "intruduce": "string",
    //       "applicable_user": "string",
    //       "class_hour": "1.50",
    //       "file_type": "PDF",
    //       "teachername": "string",
    //       "teacherdesc": "string",
    //       "cover": "http://192.168.101.11:8000/media/filecover/1234_fb.jpg`,
    //       "status": "拟制",
    //       "drag_flag": true,
    //       "courseware_type": "通用课件",
    //       "property": {}
    //     },
    //     "ratio": "3/7",
    //     "end_time": "2018-10-12",
    //     "orexame": false,
    //     "status": "已指派"
    //   },
    // }

    // 学员待完成、已完成、已逾期
    'GET /api/learn/aggregation': (req, res) => {
      res.send(
        {
          "status": "ok",
          "data": {
            "learncompletedes": [// 已完成
              {
                "id": 2001,
                "type": "course",
                'rate_progress':0,// 百分比进度条
                'days_remaining':'3',// 剩余天数
                'plan':{
                  "name": "关于2018年秋季公司全员合规技能竞赛的通知",
                  "end_time": "2018-10-12",
                  'course':{
                    "class_hour": "1.50",
                    "cover": `${basicUrl}/001.jpg`,
                    "file_type": "MP4",
                  }
                },
                "progress": {},
              },
              {
                "id": 2003,
                "type": "exam",
                'rate_progress':'',// 百分比进度条
                'days_remaining':'3',// 剩余天数
                "end_time": "2018-10-12 23:30:58",
                'plan':{
                  "name": "关于2018年秋季公司全员合规技能竞赛的通知",
                  "end_time": "2018-10-12 23:30:58",
                  'course':{
                    "class_hour": "1.50",
                    "cover": `${basicUrl}/002.jpg`,
                    // "file_type": "MP4",
                  }
                },
                "progress": {},
              },
              {
                "id": 2002,
                "type": "course",
                'rate_progress':'90',// 百分比进度条
                'days_remaining':'3',// 剩余天数
                'plan':{
                  "name": "关于2018年秋季公司全员合规技能竞赛的通知",
                  "end_time": "2018-10-12",
                  'course':{
                    "class_hour": "1.50",
                    "cover": `${basicUrl}/003.jpg`,
                    "file_type": "PDF",
                  }
                },
                "progress": {},
              },
              {
                "id": 2004,
                "type": "exam",
                'rate_progress':'',// 百分比进度条
                'days_remaining':'3',// 剩余天数
                "end_time": "2018-10-12 23:30:58",
                'plan':{
                  "name": "关于2018年秋季公司全员合规技能竞赛的通知",
                  "end_time": "2018-10-12 23:30:58",
                  'course':{
                    "class_hour": "1.50",
                    "cover": `${basicUrl}/004.jpg`,
                    // "file_type": "PDF",
                  }
                },
                "progress": {},
              },
            ],
            "learntodoes": [// 待完成
              {
                "id": 1001,
                'status':'未开始',
                "type": "course",
                'rate_progress':0,// 百分比进度条
                'days_remaining':'3',// 剩余天数
                'plan':{
                  "name": "关于2018年秋季公司全员合规技能竞赛的通知",
                  'start_time':"2018-10-12",
                  "end_time": "2018-10-12",
                  'course':{
                    "class_hour": "1.50",
                    "cover": `${basicUrl}/001.jpg`,
                    "file_type": "MP4",
                  }
                },
                "progress": {},
              },
              {
                "id": 1003,
                'status':'已指派',
                "type": "course",
                'rate_progress':0,// 百分比进度条
                'days_remaining':'3',// 剩余天数
                'plan':{
                  "name": "关于2018年秋季公司全员合规技能竞赛的通知",
                  'start_time':"2018-10-12",
                  "end_time": "2018-10-12",
                  'course':{
                    "class_hour": "1.50",
                    "cover": `${basicUrl}/001.jpg`,
                    "file_type": "MP4",
                  }
                },
                "progress": {},
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
              {
                "id": 1002,
                'status':'未开始',
                "type": "exam",
                'rate_progress':'',// 百分比进度条
                'days_remaining':'3',// 剩余天数
                'plan':{
                  "name": "关于2018年秋季公司全员合规技能竞赛的通知",
                  'start_time':"2018-10-12 23:30:58",
                  "end_time": "2018-10-12 23:30:58",
                  'course':{
                    "class_hour": "1.50",
                    "cover": `${basicUrl}/002.jpg`,
                    // "file_type": "MP4",
                  }
                },
                "progress": {},
              },
              {
                "id": 1004,
                'status':'已指派',
                "type": "exam",
                'rate_progress':'',// 百分比进度条
                'days_remaining':'3',// 剩余天数
                'plan':{
                  "name": "关于2018年秋季公司全员合规技能竞赛的通知",
                  'start_time':"2018-10-12 23:30:58",
                  "end_time": "2018-10-12 23:30:58",
                  'course':{
                    "class_hour": "1.50",
                    "cover": `${basicUrl}/002.jpg`,
                    // "file_type": "MP4",
                  }
                },
                "progress": {},
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
            "learnoverdue": [// 已逾期
              {
                "id": 1001,
                'status':'超期未完成',
                "type": "course",
                'rate_progress':0,// 百分比进度条
                'days_remaining':0,// 剩余天数
                'plan':{
                  "name": "关于2018年秋季公司全员合规技能竞赛的通知",
                  'start_time':"2018-10-12",
                  "end_time": "2018-10-12",
                  'course':{
                    "class_hour": "1.50",
                    "cover": `${basicUrl}/001.jpg`,
                    "file_type": "MP4",
                  }
                },
                "progress": {},
              },
              {
                "id": 1002,
                'status':'超期未完成',
                "type": "course",
                'rate_progress':0,// 百分比进度条
                'days_remaining':0,// 剩余天数
                'plan':{
                  "name": "关于2018年秋季公司全员合规技能竞赛的通知",
                  'start_time':"2018-10-12",
                  "end_time": "2018-10-12",
                  'course':{
                    "class_hour": "1.50",
                    "cover": `${basicUrl}/001.jpg`,
                    "file_type": "MP4",
                  }
                },
                "progress": {},
              },
              {
                "id": 1003,
                'status':'超期未完成',
                "type": "course",
                'rate_progress':70,// 百分比进度条
                'days_remaining':0,// 剩余天数
                'plan':{
                  "name": "关于2018年秋季公司全员合规技能竞赛的通知",
                  'start_time':"2018-10-12",
                  "end_time": "2018-10-12",
                  'course':{
                    "class_hour": "1.50",
                    "cover": `${basicUrl}/001.jpg`,
                    "file_type": "MP4",
                  }
                },
                "progress": {},
              },
              {
                "id": 1004,
                'status':'超期未完成',
                "type": "course",
                'rate_progress':70,// 百分比进度条
                'days_remaining':0,// 剩余天数
                'plan':{
                  "name": "关于2018年秋季公司全员合规技能竞赛的通知",
                  'start_time':"2018-10-12",
                  "end_time": "2018-10-12",
                  'course':{
                    "class_hour": "1.50",
                    "cover": `${basicUrl}/001.jpg`,
                    "file_type": "MP4",
                  }
                },
                "progress": {},
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
            ]
          }
        }
      );
    },

    // 学员推荐课程
    'POST /api/workbench/stuRecommendCourse': (req, res) => {
      res.send([
        {
          id:'0001',
          imgSrc:`${basicUrl}/001.jpg`,// 背景图片
          studyTime:'3',// 学时
          title:'关于2018年秋季公司全员合规技能竞赛的通知',// 标题
          teacher:'欧阳狄恩',
          suitablePerson:'财务管理人员等等',
          // isFinished:'Y',// 拟制中为'N' or 已上架为'Y'
          // progress:'70',// 进度条
          // days:'3天'// 剩余天数
          // type:'course',// 课程还是考试
        },
        {
          id:'0002',
          imgSrc:`${basicUrl}/002.jpg`,// 背景图片
          studyTime:'3',// 学时
          title:'关于2018年秋季公司全员合规技能竞赛的通知',// 标题
          teacher:'欧阳狄恩',
          suitablePerson:'财务管理人员等等',
          // isFinished:'N',// 拟制中为'N' or 已上架为'Y'
          // progress:'70',// 进度条
          // days:'3天'// 剩余天数
          // type:'course',// 课程还是考试
        },
        {
          id:'0003',
          imgSrc:`${basicUrl}/003.jpg`,// 背景图片
          studyTime:'3',// 学时
          title:'关于2018年秋季公司全员合规技能竞赛的通知',// 标题
          teacher:'欧阳狄恩',
          suitablePerson:'财务管理人员等等',
          // isFinished:'Y',// 拟制中为'N' or 已上架为'Y'
          // progress:'70',// 进度条
          // days:'3天'// 剩余天数
          // type:'course',// 课程还是考试
        },
        {
          id:'0004',
          imgSrc:`${basicUrl}/004.jpg`,// 背景图片
          studyTime:'3',// 学时
          title:'关于2018年秋季公司全员合规技能竞赛的通知',// 标题
          teacher:'欧阳狄恩',
          suitablePerson:'财务管理人员等等',
          // isFinished:'N',// 拟制中为'N' or 已上架为'Y'
          // progress:'70',// 进度条
          // days:'3天'// 剩余天数
          // type:'course',// 课程还是考试
        }
      ])
    },
  };
  