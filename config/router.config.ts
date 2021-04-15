import { IBestAFSRoute } from '@umijs/plugin-layout';
export const permissions = {
  department: {},
};

const PageRoutes: IBestAFSRoute[] = [
  // 登录、注册、忘记密码等页面
  {
    path: '/auth',
    component: '../layouts/UserLayout',
    layout: {
      hideNav: true,
      hideMenu: true,
    },
    routes: [
      { path: '/auth', redirect: 'auth/login' },
      { path: '/auth/login', component: './Auth/Login' },
      { path: '/auth/register', component: './Auth/Register' },
      { path: '/auth/forgetpassword', component: './Auth/Forgetpassword' },

      { path: '/auth/register-result', component: './Auth/RegisterResult' },
      // {
      //   component: '404',
      // },
    ],
  },
  {
    path: '/',
    redirect: '/workbench/index',
    unaccessible: true,
  },
  {
    path: '/workbench/index',
    menu: {
      name: '工作台', // 兼容此写法
      icon: 'icon-workbench',
    },
    component: './Workbench/Workbench',
    access: 'workbench',
  },
  // 系统管理员——>系统管理
  {
    path: '/DepartmentManager',
    access: 'department',
    menu: {
      name: '部门管理',
      icon: 'icon-department',
    },
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
        menu: false,
        component: './DepartmentManager/Import',
      },
    ],
  },
  {
    path: '/userManager',
    name: '用户管理',
    icon: 'icon-usersetting1',
    hideChildren: true,
    access: 'usermanager',
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
        menu: false,
        component: './UserManager/Edit',
      },
      {
        path: '/userManager/create',
        name: '添加用户',
        component: './UserManager/Edit',
      },
    ],
  },

  // 系统管理员——>公告管理
  {
    path: '/announcement',
    name: '公告管理',
    icon: 'icon-gonggao2',
    routes: [
      {
        path: '/announcement',
        redirect: '/announcement/article',
      },
      {
        path: '/announcement/article',
        name: '公告列表',
        access: 'announcement.list',
        component: './Announcement/index',
      },
      {
        path: '/announcement/create',
        name: '发布公告',
        access: 'announcement.create',
        component: './Announcement/ArticleMaking',
      },
      {
        path: '/announcement/edit/:id',
        access: 'announcement.edit',
        component: './Announcement/ArticleMaking',
      },
      {
        path: '/announcement/detail/:id',
        menu: false,
        access: 'announcement.detail',
        component: './Announcement/Detail',
      },
      {
        path: '/announcement/articles',
        name: '查看公告',
        access: 'announcement.listview',
        component: './Announcement/list',
      },
    ],
  },
  {
    path: '/courseware',
    name: '课件管理',
    icon: 'icon-course',
    access: 'courseware.manager',
    routes: [
      {
        path: '/courseware',
        redirect: '/courseware/coursewareManager/index',
      },

      {
        path: '/courseware/coursewareManager/index',
        name: '课件列表',
        component: './Courseware/CoursewareManager/index',
      },
      {
        path: '/courseware/coursewareManager/edit/:id',
        // menu: {
        //   name: '课件编辑',
        //   flatMenu: false,
        // },
        menu: false,
        title: '课件编辑',
        component: './Courseware/CoursewareManager/Edit',
      },

      {
        // 上传课件
        path: '/courseware/uploadZip',
        name: '上传课件',
        component: './Courseware/UploadCourse/index',
      },
    ],
  },
  // 系统管理员——>试卷管理
  {
    path: '/paper',
    name: '试卷管理',
    icon: 'icon-kaoshi1',
    access: 'paper.manager',
    routes: [
      {
        path: '/paper',
        redirect: '/paper/index',
      },
      {
        path: '/paper/index',
        name: '试卷列表',
        component: './Exam/ExamManager/index',
      },
      {
        path: '/paper/edit/:id',

        // name: '试卷修改',
        component: './Exam/ExamManager/Edit',
      },
      {
        path: '/paper/create',

        name: '创建试卷',
        component: './Exam/ExamManager/create',
      },
      {
        // 上传试卷
        path: '/paper/uploadZip',
        name: '上传试卷',

        component: './Exam/UploadExam/index',
      },
    ],
  },

  // 培训管理员——>培训群组管理
  {
    path: '/group',
    name: '培训群组管理',
    icon: 'icon-Shape',
    hideChildren: true,
    access: 'groupmanager',
    routes: [
      {
        path: '/group',
        redirect: '/group/index',
      },
      {
        path: '/group/index',
        // name:'培训群组管理',
        component: './TrainGroupManager/Index',
      },
      {
        path: '/group/addTrainGroup',
        name: '增加培训群组',
        component: './TrainGroupManager/AddTrainGroup',
      },
      {
        path: '/group/editTrainGroup/:id',
        component: './TrainGroupManager/Edit',
      },
      {
        path: '/group/view/:id',
        name: '查看培训群组',
        component: './TrainGroupManager/view',
      },
    ],
  },
  {
    path: '/studyPlan',
    name: '学习计划',
    icon: 'icon-plan',
    access: 'studyPlanmanager',
    routes: [
      { path: '/studyPlan', redirect: '/studyPlan/studyPlanManager' },
      {
        path: '/studyPlan/couser/list',
        name: '查看课程',
        component: './Courseware/CoursewareManager/viewcourses',
      },
      {
        path: '/studyPlan/studyPlanManager',
        name: '学习计划管理',
        hideChildren: true,
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
            path: '/studyPlan/studyPlanManager/create/:courseId',
            name: '创建学习计划',
            component: './StudyPlan/StudyPlanManager/Create',
          },
          {
            path: '/studyPlan/studyPlanManager/view/:studyPlanID',

            component: './StudyPlan/StudyPlanManager/View',
          },
          {
            path: '/studyPlan/studyPlanManager/edit/:studyPlanID',

            component: './StudyPlan/StudyPlanManager/Edit',
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
    access: 'examPlanManager',
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
        hideChildren: true,
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

            component: './ExamPlan/ExamPlanManager/View',
          },
          {
            path: '/examPlan/examPlanManager/edit/:examPlanID',

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
    access: 'trainCertificateMmanager',
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
  // {
  //   path: '/questionnaire',
  //   name: '问卷调查',
  //   icon: 'icon-wenti',
  //   routes: [
  //     { path: '/questionnaire', redirect: '/questionnaire/index' },
  //     {
  //       path: '/questionnaire/index',
  //       name: '问卷列表',
  //       component: './Questionnaire/index',
  //     },
  //     {
  //       path: '/questionnaire/create',
  //       name: '创建问卷',
  //       component: './Questionnaire/createoredit',
  //     },
  //     {
  //       path: '/questionnaire/edit/:id',
  //       menu: false,
  //       name: '修改问卷',
  //       component: './Questionnaire/edit',
  //     },
  //   ],
  // },
  // 培训管理员——>统计分析
  {
    path: '/statisticalAnalysis',
    name: '统计分析',
    icon: 'icon-tongji1',
    access: 'statisticaManager',
    routes: [
      {
        path: '/statisticalAnalysis',
        redirect: '/statisticalAnalysis/statisticalAnalysis1',
      },
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
    access: 'publicCourseLearn',
    component: './MyStudy/publicCourse/publicourse',
  },
  {
    path: '/myStudy',
    name: '我的学习',
    icon: 'icon-xuexi',
    access: 'myStudyManager',
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

        component: './MyStudy/publicCourse/learn',
      },
    ],
  },
  {
    path: '/noticetask',
    name: '通知任务',
    icon: 'icon-exam1',
    access: 'noticetaskManager',
    routes: [
      { path: '/noticetask', redirect: '/noticetask/index' },
      {
        path: '/noticetask/index',
        name: '通知任务列表',
        component: './Noticetask/index',
      },
      {
        path: '/noticetask/create',
        name: '创建通知任务',
        component: './Noticetask/createoredit',
      },
      {
        path: '/noticetask/edit/:id',

        component: './Noticetask/createoredit',
      },
      {
        path: '/noticetask/view/:id',
        component: './Noticetask/view',
      },
    ],
  },
  // 学员——>我的考试
  {
    path: '/myExam',
    name: '我的考试',
    icon: 'icon-exam1',
    access: 'myExamManager',
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
    ],
  },
  // 学员——>我的问卷
  // {
  //   path: '/myQuestionnaire',
  //   name: '我的问卷',
  //   icon: 'self_MyQuestionnaireIcon',
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
    access: 'myCertificateManager',
    hideChildren: true,
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

  {
    name: '个人中心',
    icon: 'icon-shezhi',
    path: '/personalCenter',
    access: 'personalCenter',
    routes: [
      {
        path: '/personalCenter',
        redirect: '/personalCenter/index',
      },
      {
        path: '/personalCenter/index',
        name: '消息中心',
        component: './PersonalCenter/Center/notifications',
        // routes: [
        //   {
        //     path: '/personalCenter/center',
        //     redirect: '/personalCenter/center/notifications',
        //   },
        //   {
        //     path: '/personalCenter/center/notifications',
        //     component: './PersonalCenter/Center/notifications',
        //   },
        // ],
      },
      {
        path: '/personalCenter/settings',
        name: '个人信息',
        // component: './PersonalCenter/Settings/Info',
        component: './PersonalCenter/Settings/Edit',
        // routes: [
        //   {
        //     path: '/personalCenter/settings',
        //     redirect: '/PersonalCenter/settings/base',
        //   },
        //   {
        //     path: '/personalCenter/settings/base',
        //     component: './PersonalCenter/Settings/Edit',
        //   },
        //   // {
        //   //   path: '/personalCenter/settings/security',
        //   //   component: './PersonalCenter/Settings/SecurityView',
        //   // },
        //   // {
        //   //   path: '/personalCenter/settings/binding',
        //   //   component: './PersonalCenter/Settings/BindingView',
        //   // },
        //   {
        //     path: '/personalCenter/settings/notification',
        //     component: './PersonalCenter/Settings/NotificationView',
        //   },
        // ],
      },
    ],
  },

  {
    path: '/exception',
    menu: false,
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
      // {
      //   path: '/exception/trigger',
      //   name: 'trigger',
      //   component: './Exception/TriggerException',
      // },
    ],
  },
];
export default PageRoutes;
