export default [
  // 登录、注册、忘记密码等页面
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
      {
        component: '404',
      },
    ],
  },
  // 登录后
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user', 'stu'],
    routes: [
      // 工作台配置
      {
        path: '/',
        redirect: '/workbench/workbench',
      },
      {
        path: '/workbench/workbench',
        name: '工作台',
        icon: 'self_WorkbenchIcon',
        component: './Workbench/Workbench',
      },
      // 系统管理员——>系统管理
      {
        path: '/systemManager',
        name: '系统管理',
        icon: 'self_SystemManagerIcon',
        authority: ['admin'],
        routes: [
          {
            path: '/systemManager/department',
            name: '部门管理',
            component: './SystemManager/DepartmentManager',
          },
          {
            path: '/systemManager/userManager',
            name: '用户管理',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/systemManager/userManager',
                redirect: '/systemManager/userManager/index',
              },
              {
                path: '/systemManager/userManager/index',
                // name:'用户管理',
                component: './SystemManager/UserManager/index',
              },
              {
                path: '/systemManager/userManager/upload',
                // name:'批量导入用户',
                component: './SystemManager/UserManager/UploadUsers',
              },
            ],
          },
          {
            path: '/systemManager/assignManger',
            name: '培训管理员分配',
            component: './SystemManager/AssignManger',
          },
        ],
      },
      // 系统管理员——>公告管理
      {
        path: '/announcement',
        name: '公告管理',
        icon: 'self_AnnouncementIcon',
        // hideChildrenInMenu: true,
        authority: ['admin'],
        routes: [
          {
            path: '/announcement',
            redirect: '/announcement/article',
          },
          {
            path: '/announcement/article',
            name: '公告列表',
            component: './Announcement/Article/index',
          },
          {
            path: '/announcement/create',
            name: '发布公告',
            component: './Announcement/Article/ArticleMaking',
            // authority: ['admin'],
          },
          {
            path: '/announcement/edit/:ID',
            // name: '编辑公告',
            component: './Announcement/Article/ArticleMaking',
            // authority: ['admin'],
          },
          {
            path: '/announcement/detail/:ID',
            // name: '编辑公告',
            component: './Announcement/Article/Detail',
            // authority: ['admin'],
          },
          {
            path: '/announcement/viewlistadmin',
            name: '查看公告',
            component: './Announcement/Article/list',
            // authority: ['admin'],
          },
        ],
      },
      {
        path: '/announcementviewlist',
        name: '查看公告',
        icon: 'self_AnnouncementIcon',
        component: './Announcement/Article/list',
        authority: ['user', 'stu'],
      },
      {
        path: '/courseware',
        name: '课件管理',
        icon: 'self_CoursewareIcon',
        authority: ['admin'],
        routes: [
          {
            path: '/courseware',
            redirect: '/courseware/coursewareManager',
          },

          {
            path: '/courseware/coursewareManager',
            name: '课件管理',
            // component:'./Courseware/coursewareManager',
            authority: ['admin'],
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/courseware/coursewareManager',
                redirect: '/courseware/coursewareManager/index',
                authority: ['admin'],
              },
              {
                path: '/courseware/coursewareManager/index',
                // name:'课件管理',
                component: './Courseware/CoursewareManager/Index',
                authority: ['admin'],
              },
              {
                path: '/courseware/coursewareManager/edit/:ID',
                name: '课件编辑',
                component: './Courseware/CoursewareManager/EditConent',
                authority: ['admin'],
              },
              // {
              //   path: '/courseware/coursewareManager/onShelf/:ID',
              //   name: '课件编辑（已上架）',
              //   component: './Courseware/CoursewareManager/OnShelf',
              //   authority: ['admin'],
              // },
              // {
              //   path: '/courseware/coursewareManager/OffShelf/:ID',
              //   name: '课件编辑（已下架）',
              //   component: './Courseware/CoursewareManager/OffShelf',
              //   authority: ['admin'],
              // },
            ],
          },

          {
            // 上传课件
            path: '/courseware/uploadZip',
            name: '上传课件',
            authority: ['admin'],
            hideChildrenInMenu: true,
            routes: [
              // 首次打开重定向到上传zip课件前的界面
              {
                path: '/courseware/uploadZip',
                redirect: '/courseware/uploadZip/uploadZip1/:isBack?',
              },
              // 上传zip课件前
              {
                path: '/courseware/uploadZip/uploadZip1/:isBack?',
                // name:'上传课件',
                component: './Courseware/UploadCourse/UploadZip1',
              },
              // 上传zip课件后，选择培训管理员
              {
                path: '/courseware/uploadZip/uploadZip2',
                name: '课件上架',
                component: './Courseware/UploadCourse/UploadZip2',
              },
              // 上传课件上架成功后页面
              {
                path: '/courseware/uploadZip/uploadZip3',
                name: '课件上架成功',
                component: './Courseware/UploadCourse/UploadZip3',
              },
            ],
          },
        ],
      },
      // 系统管理员——>试卷管理
      {
        path: '/exam',
        name: '试卷管理',
        icon: 'self_TestResourceIcon',
        authority: ['admin'],

        routes: [
          {
            path: '/exam',
            redirect: '/exam/examManager',
          },
          {
            path: '/exam/examManager',
            name: '试卷管理',
            authority: ['admin'],
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/exam/examManager',
                redirect: '/exam/examManager/index',
              },
              {
                path: '/exam/examManager/index',
                // name:'试卷管理',
                component: './Exam/ExamManager/Index',
              },
              {
                path: '/exam/examManager/edit/:ID',
                name: '试卷管理',
                component: './Exam/ExamManager/EditConent',
              },
              // {
              //   path: '/exam/examManager/onShelf/:ID',
              //   name: '试卷管理（已上架）',
              //   component: './Exam/ExamManager/OnShelf',
              // },
              // {
              //   path: '/exam/examManager/OffShelf/:ID',
              //   name: '试卷管理（已下架）',
              //   component: './Exam/ExamManager/OffShelf',
              // },
            ],
          },

          {
            // 上传试卷
            path: '/exam/uploadZip',
            name: '上传试卷',
            authority: ['admin'],
            hideChildrenInMenu: true,
            routes: [
              // 首次打开重定向到上传zip试卷前的界面
              {
                path: '/exam/uploadZip',
                redirect: '/exam/uploadZip/uploadZip1/:isBack?',
              },
              // 上传zip试卷前
              {
                path: '/exam/uploadZip/uploadZip1/:isBack?',
                // name:'上传试卷',
                component: './Exam/UploadExam/UploadZip1',
              },
              // 上传zip试卷后，选择培训管理员
              {
                path: '/exam/uploadZip/uploadZip2',
                name: '试卷上架',
                component: './Exam/UploadExam/UploadZip2',
              },
              // 上传试卷上架成功后页面
              {
                path: '/exam/uploadZip/uploadZip3',
                name: '试卷上架成功',
                component: './Exam/UploadExam/UploadZip3',
              },
            ],
          },
        ],
      },

      // 培训管理员——>培训群组管理
      {
        path: '/trainGroupManager',
        name: '培训群组管理',
        icon: 'self_StuManagerIcon',
        authority: ['user'],
        hideChildrenInMenu: true,
        routes: [
          {
            path: '/trainGroupManager',
            redirect: '/trainGroupManager/index',
          },
          {
            path: '/trainGroupManager/index',
            // name:'培训群组管理',
            component: './TrainGroupManager/Index',
          },
          {
            path: '/trainGroupManager/addTrainGroup',
            name: '增加培训群组',
            component: './TrainGroupManager/AddTrainGroup',
          },
          {
            path: '/trainGroupManager/editTrainGroup/:ID',
            name: '编辑培训群组',
            component: './TrainGroupManager/EditTrainGroup',
          },
          {
            path: '/trainGroupManager/viewTrainGroup/:ID',
            name: '查看培训群组',
            component: './TrainGroupManager/ViewTrainGroup',
          },
        ],
      },
      // 培训管理员——>学习计划
      {
        path: '/studyPlan',
        name: '学习计划',
        icon: 'self_StudyPlanIcon',
        authority: ['user'],
        routes: [
          {
            path: '/studyPlan/couser/list',
            name: '查看课程',
            component: './Courseware/CoursewareManager/viewcourses',
            authority: ['user'],
          },
          {
            path: '/studyPlan/studyPlanManager',
            name: '学习计划管理',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/studyPlan/studyPlanManager',
                redirect: '/studyPlan/studyPlanManager/index',
              },
              {
                path: '/studyPlan/studyPlanManager/index',
                component: './StudyPlan/StudyPlanManager/Index',
              },
              {
                path: '/studyPlan/studyPlanManager/create/:courseID',
                name: '创建学习计划',
                component: './StudyPlan/StudyPlanManager/CreateSP',
              },
              {
                path: '/studyPlan/studyPlanManager/view/:studyPlanID',
                name: '查看学习计划',
                component: './StudyPlan/StudyPlanManager/ViewSP',
              },
              {
                path: '/studyPlan/studyPlanManager/edit/:studyPlanID',
                name: '编辑学习计划',
                component: './StudyPlan/StudyPlanManager/EditSP',
              },
            ],
          },
          {
            path: '/studyPlan/answerQuestion',
            name: '课堂提问答复',
            component: './StudyPlan/AnswerQuestion/AnswerQuestion',
          },
        ],
      },
      // 培训管理员——>考试计划
      {
        path: '/examPlan',
        name: '考试计划',
        icon: 'self_ExamPlanIcon',
        authority: ['user'],
        routes: [
          {
            path: '/examPlan/viewAllTests',
            name: '查看试卷',
            component: './Exam/ExamManager/viewpapers',
          },
          {
            path: '/examPlan/examPlanManager',
            name: '考试管理',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/examPlan/examPlanManager',
                redirect: '/examPlan/examPlanManager/index',
              },
              {
                path: '/examPlan/examPlanManager/index',
                component: './ExamPlan/ExamPlanManager/Index',
              },
              {
                path: '/examPlan/examPlanManager/create/:examID',
                name: '发布考试',
                component: './ExamPlan/ExamPlanManager/Create',
              },
              {
                path: '/examPlan/examPlanManager/view/:examPlanID',
                name: '查看考试',
                component: './ExamPlan/ExamPlanManager/View',
              },
              {
                path: '/examPlan/examPlanManager/edit/:examPlanID',
                name: '编辑考试',
                component: './ExamPlan/ExamPlanManager/Edit',
              },
            ],
          },
          {
            path: '/examPlan/markExam',
            name: '人工阅卷',
            component: './ExamPlan/MarkExam/MarkExam',
          },
        ],
      },
      // 培训管理员——>培训证书 没有实现
      {
        path: '/trainCertificate',
        // name: '培训证书',
        icon: 'self_TrainCertificateIcon',
        authority: ['user'],
        routes: [
          {
            path: '/trainCertificate/index',
            name: '证书管理',
            component: './TrainCertificate/index',
          },
        ],
      },
      // 培训管理员——>问卷调查  没有实现
      {
        path: '/questionnaire',
        // name: '问卷调查',
        icon: 'self_QuestionnaireIcon',
        authority: ['user'],
        routes: [
          {
            path: '/questionnaire/questionnaire1',
            name: '发布问卷',
            component: './Questionnaire/Questionnaire1',
          },
          {
            path: '/questionnaire/questionnaire2',
            name: '问卷回收',
            component: './Questionnaire/Questionnaire2',
          },
        ],
      },
      // 培训管理员——>统计分析
      {
        path: '/statisticalAnalysis',
        name: '统计分析',
        icon: 'self_StatisticalAnalysisIcon',
        authority: ['user'],
        routes: [
          {
            path: '/statisticalAnalysis/statisticalAnalysis1',
            name: '学习资源统计',
            component: './StatisticalAnalysis/StatisticalAnalysis1',
          },
          {
            path: '/statisticalAnalysis/statisticalAnalysis2',
            name: '学习情况统计',
            component: './StatisticalAnalysis/StatisticalAnalysis2',
          },
          {
            path: '/statisticalAnalysis/statisticalAnalysis3',
            name: '考试情况统计',
            component: './StatisticalAnalysis/StatisticalAnalysis3',
          },
        ],
      },

      // 学员——>我的学习
      {
        path: '/myStudy',
        name: '我的学习',
        icon: 'self_MyStudyIcon',
        authority: ['stu'],
        routes: [
          {
            path: '/myStudy/learnPlan',
            name: '我的学习计划',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/myStudy/learnPlan',
                redirect: '/myStudy/learnPlan/index',
              },
              {
                path: '/myStudy/learnPlan/index',
                component: './MyStudy/LearnPlan/Index',
              },
              {
                path: '/myStudy/learnPlan/video/:id',
                name: '课程学习',
                component: './MyStudy/LearnPlan/LearnVideo',
              },
              {
                path: '/myStudy/learnPlan/pdf/:id',
                name: '课程学习',
                component: './MyStudy/LearnPlan/LearnPDF',
              },
            ],
          },
          {
            path: '/myStudy/publicCourse',
            name: '我的公开课',
            component: './MyStudy/publicCourse/index',
          },
          // {
          //   path: '/myStudy/myStudy3',
          //   name: '我的提问',
          //   component: './MyStudy/MyStudy3',
          // },
        ],
      },
      // 学员——>我的考试
      {
        path: '/myExam',
        name: '我的考试',
        icon: 'self_MyExamIcon',
        authority: ['stu'],
        routes: [
          {
            path: '/myExam/examPlan',
            name: '我的考试计划',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/myExam/examPlan',
                redirect: '/myExam/examPlan/index',
              },
              {
                path: '/myExam/examPlan/index',
                component: './MyExam/ExamPlan/Index',
              },
            ],
          },
          {
            path: '/myExam/onlineExam/:id',

            component: './MyExam/OnlineExam/Index',

            routes: [
              {
                path: '/myExam/onlineExam/:id',
                redirect: '/myExam/onlineExam/login/:id',
              },
              {
                path: '/myExam/onlineExam/login/:id',
                component: './MyExam/OnlineExam/Login',
              },
              {
                path: '/myExam/onlineExam/answer/:id',
                component: './MyExam/OnlineExam/Answer',
              },
            ],
          },
          // {
          //   path: '/myExam/myExam2',
          //   name: '错题分析',
          //   component: './MyExam/MyExam2',
          // },
        ],
      },
      // 学员——>我的问卷
      // {
      //   path: '/myQuestionnaire',
      //   name: '我的问卷',
      //   icon: 'self_MyQuestionnaireIcon',
      //   authority: ['stu'],
      //   routes: [
      //     {
      //       path: '/myQuestionnaire/myQuestionnaire1',
      //       name: '待我反馈',
      //       component: './MyQuestionnaire/MyQuestionnaire1',
      //     },
      //     {
      //       path: '/myQuestionnaire/myQuestionnaire2',
      //       name: '我已反馈',
      //       component: './MyQuestionnaire/MyQuestionnaire2',
      //     },
      //   ],
      // },
      // 学员——>我的培训记录
      // {
      //   path: '/myTrain',
      //   name: '我的培训记录',
      //   icon: 'self_MyTrainIcon',
      //   authority: ['stu'],
      //   routes: [
      //     {
      //       path: '/myTrain/myTrain1',
      //       name: '学习记录',
      //       component: './MyTrain/MyTrain1',
      //     },
      //     {
      //       path: '/myTrain/myTrain2',
      //       name: '考试记录',
      //       component: './MyTrain/MyTrain2',
      //     },
      //   ],
      // },
      // 学员——>我的证书
      {
        path: '/myCertificate',
        name: '我的证书',
        icon: 'self_MyCertificateIcon',
        authority: ['stu'],
        hideChildrenInMenu: true,
        routes: [
          {
            path: '/myCertificate',
            redirect: '/myCertificate/index',
          },
          {
            path: '/myCertificate/index',
            name: '我的证书',
            component: './MyCertificate/index',
          },
        ],
      },

      // 个人中心
      {
        name: '个人中心',
        icon: 'self_PersonalCenterIcon',
        authority: ['admin', 'user', 'stu'],
        path: '/personalCenter',

        routes: [
          {
            path: '/personalCenter/center',
            name: '消息中心',
            // component: './PersonalCenter/Center/Center',
            routes: [
              {
                path: '/personalCenter/center',
                redirect: '/personalCenter/center/articles',
              },
              {
                path: '/personalCenter/center/articles',
                component: './PersonalCenter/Center/Articles',
              },
              // {
              //   path: '/personalCenter/center/applications',
              //   component: './PersonalCenter/Center/Applications',
              // },
              // {
              //   path: '/personalCenter/center/projects',
              //   component: './PersonalCenter/Center/Projects',
              // },
            ],
          },
          {
            path: '/personalCenter/settings',
            name: '个人信息',
            component: './PersonalCenter/Settings/Info',
            routes: [
              {
                path: '/personalCenter/settings',
                redirect: '/PersonalCenter/settings/base',
              },
              {
                path: '/personalCenter/settings/base',
                component: './PersonalCenter/Settings/BaseView',
              },
              // {
              //   path: '/personalCenter/settings/security',
              //   component: './PersonalCenter/Settings/SecurityView',
              // },
              // {
              //   path: '/personalCenter/settings/binding',
              //   component: './PersonalCenter/Settings/BindingView',
              // },
              {
                path: '/personalCenter/settings/notification',
                component: './PersonalCenter/Settings/NotificationView',
              },
            ],
          },
        ],
      },

      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        hideInMenu: true,
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
