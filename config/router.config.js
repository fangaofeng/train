export default [
  // 登录、注册、忘记密码等页面
  {
    path: '/auth',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/auth', redirect: 'auth/login' },
      { path: '/auth/login', component: './Auth/Login' },
      { path: '/auth/register', component: './Auth/Register' },
      { path: '/auth/forgetpassword', component: './Auth/Forgetpassword' },

      { path: '/auth/register-result', component: './Auth/RegisterResult' },
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
    authority: ['admin', 'trainmanager', 'stu'],
    routes: [
      // 工作台配置
      {
        path: '/',
        redirect: '/workbench/index',
      },
      {
        path: '/workbench/index',
        name: '工作台',
        icon: 'icon-workbench',
        component: './Workbench/Workbench',
      },
      // 系统管理员——>系统管理
      {
        path: '/DepartmentManager',
        name: '部门管理',
        icon: 'icon-department',
        authority: ['admin'],
        routes: [
          {
            path: '/DepartmentManager',
            redirect: '/DepartmentManager/index',
          },
          {
            path: '/DepartmentManager/index',
            name: '部门查看',
            component: './DepartmentManager/index',
          },
          {
            path: '/DepartmentManager/assignManger',
            name: '培训管理员分配',
            component: './DepartmentManager/AssignManger',
          },
          {
            path: '/DepartmentManager/import',
            hideInMenu: true,
            name: '导入部门信息',
            component: './DepartmentManager/Import',
          },
        ],
      },
      {
        path: '/userManager',
        name: '用户管理',
        icon: 'icon-usersetting1',
        hideChildrenInMenu: true,
        authority: ['admin'],

        routes: [
          {
            path: '/userManager',
            redirect: '/userManager/index',
          },
          {
            path: '/userManager/index',
            name: '用户列表',
            component: './UserManager/index',
          },
          {
            path: '/userManager/upload',
            name: '批量导入用户',
            component: './UserManager/UploadUsers',
          },
          {
            path: '/userManager/edit/:id',
            hideInMenu: true,
            name: '修改用户信息',
            component: './UserManager/Edit',
          },
          {
            path: '/userManager/create',

            name: '添加用户',
            component: './UserManager/create',
          },
        ],
      },

      // 系统管理员——>公告管理
      {
        path: '/announcement',
        name: '公告管理',
        icon: 'icon-gonggao2',
        // hideChildrenInMenu: true,
        authority: ['admin', 'trainmanager', 'stu'],
        routes: [
          {
            path: '/announcement',
            redirect: '/announcement/article',
          },
          {
            path: '/announcement/article',
            name: '公告列表',
            authority: ['admin'],
            component: './Announcement/index',
          },
          {
            path: '/announcement/create',
            name: '发布公告',
            component: './Announcement/ArticleMaking',
            authority: ['admin'],
          },
          {
            path: '/announcement/edit/:id',
            // name: '编辑公告',
            component: './Announcement/ArticleMaking',
            authority: ['admin'],
          },
          {
            path: '/announcement/detail/:id',
            name: '公告详情',
            hideInMenu: true,
            component: './Announcement/Detail',
            authority: ['admin', 'trainmanager', 'stu'],
          },
          {
            path: '/announcement/articles',
            name: '查看公告',
            component: './Announcement/list',
            authority: ['admin', 'trainmanager', 'stu'],
          },
        ],
      },
      {
        path: '/courseware',
        name: '课件管理',
        icon: 'icon-course',
        authority: ['admin'],
        routes: [
          {
            path: '/courseware',
            redirect: '/courseware/coursewareManager/index',
          },

          {
            path: '/courseware/coursewareManager/index',
            name: '课件列表',
            component: './Courseware/CoursewareManager/index',
            authority: ['admin'],
          },
          {
            path: '/courseware/coursewareManager/edit/:id',
            name: '课件编辑',
            hideInMenu: true,
            component: './Courseware/CoursewareManager/Edit',
            authority: ['admin'],
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
        icon: 'icon-kaoshi1',
        authority: ['admin'],

        routes: [
          {
            path: '/exam',
            redirect: '/exam/index',
          },
          {
            path: '/exam/index',
            name: '试卷列表',
            component: './Exam/ExamManager/index',
          },
          {
            path: '/exam/edit/:id',
            hideInMenu: true,
            name: '试卷修改',
            component: './Exam/ExamManager/Edit',
          },
          {
            path: '/exam/create',

            name: '创建试卷',
            component: './Exam/ExamManager/Create',
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
        icon: 'icon-Shape',
        authority: ['trainmanager'],
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
            path: '/trainGroupManager/editTrainGroup/:id',
            name: '编辑培训群组',
            component: './TrainGroupManager/Edit',
          },
          {
            path: '/trainGroupManager/viewTrainGroup/:id',
            name: '查看培训群组',
            component: './TrainGroupManager/ViewTrainGroup',
          },
        ],
      },
      // 培训管理员——>学习计划
      {
        path: '/studyPlan',
        name: '学习计划',
        icon: 'icon-plan',
        authority: ['trainmanager'],
        routes: [
          { path: '/studyPlan', redirect: '/studyPlan/studyPlanManager' },
          {
            path: '/studyPlan/couser/list',
            name: '查看课程',
            component: './Courseware/CoursewareManager/viewcourses',
            authority: ['trainmanager'],
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
                path: '/studyPlan/studyPlanManager/create/:courseid',
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
        icon: 'icon-plan1',
        authority: ['trainmanager'],
        routes: [
          { path: '/examPlan', redirect: '/examPlan/examPlanManager' },

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
        icon: 'icon-zhengshu',
        authority: ['trainmanager'],
        routes: [
          { path: '/trainCertificate', redirect: '/trainCertificate/index' },
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
        name: '问卷调查',
        icon: 'icon-wenti',
        authority: ['admin', 'trainmanager', 'stu'],
        routes: [
          { path: '/questionnaire', redirect: '/questionnaire/index' },
          {
            path: '/questionnaire/index',
            name: '问卷列表',
            component: './Questionnaire/index',
          },
          {
            path: '/questionnaire/create',
            name: '创建问卷',
            component: './Questionnaire/createoredit',
          },
          {
            path: '/questionnaire/edit/:id',
            hideInMenu: true,
            name: '修改问卷',
            component: './Questionnaire/edit',
          },
        ],
      },
      // 培训管理员——>统计分析
      {
        path: '/statisticalAnalysis',
        name: '统计分析',
        icon: 'icon-tongji1',
        authority: ['trainmanager'],
        routes: [
          { path: '/statisticalAnalysis', redirect: '/statisticalAnalysis/statisticalAnalysis1' },
          {
            path: '/statisticalAnalysis/statisticalAnalysis1',
            name: '学习资源统计',
            component: './StatisticalAnalysis/StatisticalAnalysis1',
          },
          // {
          //   path: '/statisticalAnalysis/statisticalAnalysis2',
          //   name: '学习情况统计',
          //   component: './StatisticalAnalysis/StatisticalAnalysis2',
          // },
          // {
          //   path: '/statisticalAnalysis/statisticalAnalysis3',
          //   name: '考试情况统计',
          //   component: './StatisticalAnalysis/StatisticalAnalysis3',
          // },
        ],
      },

      // 学员——>我的学习
      {
        path: '/publicCourse',
        name: '公开课',
        icon: 'icon-gongkaike',
        component: './MyStudy/publicCourse/publicourse',
        authority: ['stu'],
      },
      {
        path: '/myStudy',
        name: '我的学习',
        icon: 'icon-xuexi',
        authority: ['stu'],
        routes: [
          {
            path: '/myStudy',
            redirect: '/myStudy/LearnPlan/notcompleted',
          },
          {
            path: '/myStudy/LearnPlan/notcompleted',
            name: '待完成课程',
            component: './MyStudy/LearnPlan/Index',

            routes: [],
          },
          {
            path: '/myStudy/LearnPlan/progress/:id',
            hideInMenu: true,
            name: '课程学习',
            component: './MyStudy/LearnPlan/Learn',
          },
          {
            path: '/myStudy/LearnPlan/completed',
            name: '完成课程',
            component: './MyStudy/LearnPlan/completed',
          },
          {
            path: '/myStudy/overdue',
            name: '逾期课程',
            component: './MyStudy/LearnPlan/overdue',
          },
          {
            path: '/myStudy/publicprogress/index',
            name: '自学课程',
            component: './MyStudy/publicCourse/index',
          },
          {
            path: '/myStudy/publicprogress/:id',
            hideInMenu: true,
            name: '自学课程学习',
            component: './MyStudy/publicCourse/learn',
          },
        ],
      },
      {
        path: '/nofity',
        name: '通知任务',
        icon: 'icon-exam1',

        authority: ['admin'],
        routes: [
          { path: '/nofity', redirect: '/nofity/index' },
          {
            path: '/nofity/index',
            name: '通知任务列表',
            component: './Noticetask/index',
          },
          {
            path: '/nofity/create',
            name: '创建通知任务',
            component: './Noticetask/createoredit',
          },
          {
            path: '/nofity/edit/:id',
            name: '编辑通知',
            hideInMenu: true,
            component: './Noticetask/createoredit',
          },
        ],
      },
      // 学员——>我的考试
      {
        path: '/myExam',
        name: '我的考试',
        icon: 'icon-exam1',

        authority: ['stu'],
        routes: [
          { path: '/myExam', redirect: '/myExam/examPlan' },
          {
            path: '/myExam/examPlan',
            name: '待参加考试',
            component: './MyExam/ExamPlan/Index',
          },
          {
            path: '/myExam/completed',
            name: '完成的考试',
            component: './MyExam/ExamPlan/completed',
          },
          {
            path: '/myExam/overdue',
            name: '逾期的考试',
            component: './MyExam/ExamPlan/overdue',
          },
          {
            path: '/myExam/onlineExam/:id',
            hideInMenu: true,
            name: '参加考试中',
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
        icon: 'icon-zhengshu',
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
        // icon: 'self_SystemManagerIcon',
        icon: 'icon-shezhi',
        authority: ['admin', 'trainmanager', 'stu'],
        path: '/personalCenter',

        routes: [
          {
            path: '/personalCenter',
            redirect: '/personalCenter/center',
          },
          {
            path: '/personalCenter/center',
            name: '消息中心',
            // component: './PersonalCenter/Center/Center',
            routes: [
              {
                path: '/personalCenter/center',
                redirect: '/personalCenter/center/notifications',
              },
              {
                path: '/personalCenter/center/notifications',
                component: './PersonalCenter/Center/notifications',
              },
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
