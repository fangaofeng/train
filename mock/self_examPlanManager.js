// 代码中会兼容本地 service mock 以及部署站点的静态数据
// // 模拟table表格数据
function mockTable(page, size) {
  let obj = {};
  const list = [];
  for (let i = 0; i < size; i += 1) {
    const currentTotal = (page - 1) * size + i + 1;
    if (currentTotal <= 31) {
      let sta = '';
      if (i === 0 || i === 5) {
        sta = '已指派';
      } else if (i === 1 || i === 6) {
        sta = '学习中';
      } else if (i === 2 || i === 7) {
        sta = '已完成';
      } else if (i === 3 || i === 8) {
        sta = '已归档';
      } else {
        sta = '拟制中';
      }
      list.push({
        id: `${page}${i}`,
        name: '反贿赂合规体系的建立与实践',
        exam_name: '反贿赂合规培训',
        start_time: '2018-10-26 12:50:00',
        end_time: '2018-11-25 12:50:00',
        course: 3,
        ratio: `${page}${i}/1${page}${i}`,
        pass_ration: `${page}${i}/1${page}${i}`,
        orexame: false,
        status: sta,
      });
    }
  }
  obj = {
    status: 'ok',
    data: {
      count: 31,
      next: null,
      previous: null,
      results: list,
    },
  };
  return obj;
}
// // 模拟table表格数据
function mockTable2(page, size) {
  let obj = {};
  const list = [];
  for (let i = 0; i < size; i += 1) {
    const currentTotal = (page - 1) * size + i + 1;
    if (currentTotal <= 31) {
      list.push({
        id: `${page}${i}`,
        group_no: `2017050000-${page}-${i}`,
        name: `开发组-${page}-${i}`,
        trainers: [121, 145, 158, 2, 52, 149, 162, 1, 116, 140],
        created_time: '2018-11-27T16:25:24.465263',
        ratio: `${page}${i}/1${page}${i}`,
        questionanswer: `${page}${i}/1${page}${i}`,
      });
    }
  }
  obj = {
    status: 'ok',
    data: {
      count: 31,
      next: null,
      previous: null,
      results: list,
    },
  };
  return obj;
}
// 模拟table表格数据
// 模拟table表格数据
function mockTable3(page, size) {
  let obj = {};
  const list = [];
  for (let i = 0; i < size; i += 1) {
    const currentTotal = (page - 1) * size + i + 1;
    if (currentTotal <= 31) {
      let sta = '';
      if (i === 0 || i === 5) {
        sta = '已指派';
      } else if (i === 1 || i === 6) {
        sta = '考试中';
      } else if (i === 2 || i === 7) {
        sta = '已完成';
      } else if (i === 3 || i === 8) {
        sta = '已完成';
      } else {
        sta = '已归档';
      }
      list.push({
        id: `${page}${i}`,
        user_no: `查看-2017050000-${page}-${i}`,
        name: `查看-顾益明-${page}-${i}`,
        department_name: `查看-技术部-${page}-${i}`,
        status: sta,
      });
    }
  }
  obj = {
    status: 'ok',
    data: {
      count: 12,
      next: null,
      previous: null,
      results: list,
    },
  };
  return obj;
}

export default {
  // 考试管理——>主页，分页获取所有的考试计划
  'GET /api/exam/plan': (req, res) => {
    const params = req.query;
    const { page, size } = params;
    const result = mockTable(page, size);
    return res.json(result);
  },

  // ------------------------------------------------------------------
  // 获取单个计划详情，不包含群组
  'GET /api/exam/plan/:id': (req, res) => {
    res.send({
      status: 'ok',
      data: {
        name: `反贿赂合规培训`,
        start_time: `2018-10-10 10:30:00`,
        end_time: `2019-10-20 10:50:00`,
        exampaper: {
          // 试卷编号
          number: `20181031000199`,
          // 试卷名称
          name: '反贿赂合规体系的建立与实践考试',
          // 考试时长
          duration: 60,
          // 试卷总分
          total_score: 100,
          // 合格分数
          passing_score: 60,
          // 适用对象
          applicable_user: '财务管理人员',
          // 试卷介绍
          introduce: '考查反贿赂合规体系涵盖的业务范围和工作要点',
          // 封面
          cover: 'http://localhost/001.jpg',
          // 适用课程编号，不是必填
          applicableCourseNumber: `20181031000110`,
          // 适用课程名称，不是必填
          applicableCourseName: '反贿赂合规体系的建立与实践',
        },
      },
    });
  },
  // 考试管理——>发布考试计划——>点击提交按钮
  'POST /api/exam/plan': (req, res) => {
    res.send({
      status: 'ok',
      data: {
        name: '反贿赂合规体系的建立与实践',
        exam_name: '反贿赂合规培训',
        start_time: '2018-10-26 12:50:00',
        end_time: '2018-11-25 12:50:00',
        course: 3,
        id: 27,
        orexame: false,
        status: '已指派',
        traingroups: [29, 28],
      },
    });
  },
  // ------------------------------------------------------------------

  // 考试管理——>编辑考试计划——>点击提交按钮
  'PUT /api/exam/plan/:examPlanID': (req, res) => {
    res.send({
      status: 'ok',
      data: {
        examName: '反贿赂合规体系的建立与实践',
        name: '反贿赂合规培训',
        start_time: '2018-10-26',
        end_time: '2018-11-25',
      },
    });
  },

  'PATCH /api/exam/plan/:examPlanID': (req, res) => {
    res.send({
      status: 'ok',
      data: {
        examName: '反贿赂合规体系的建立与实践',
        name: '反贿赂合规培训',
        start_time: '2018-10-26',
        end_time: '2018-11-25',
      },
    });
  },
  // ------------------------------------------------------------------
  // 考试管理——>查看考试计划（获取table表格数据）
  'GET /api/exam/plan/:examPlanID/groups': (req, res) => {
    const params = req.query;
    const { page, size } = params;
    const result = mockTable2(page, size);
    return res.json(result);
  },
  // 考试管理——>查看考试计划——>查看培训群组学习详情（获取table表格数据）
  'GET /api/exam/plan/:examPlanID/group/:trainGroupID': (req, res) => {
    const params = req.query;
    const { page, size } = params;
    const result = mockTable3(page, size);
    return res.json(result);
  },
  // ------------------------------------------------------------------
  // 考试管理——>主页，归档考试计划
  // 'POST /api/exam/plan/fileOnArchive': (req, res) => {
  //   res.send({
  //     status: 'ok',
  //     data:{

  //     }
  //   });
  // },
  // ------------------------------------------------------------------
};
