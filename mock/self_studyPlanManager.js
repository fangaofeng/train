// 代码中会兼容本地 service mock 以及部署站点的静态数据
// 模拟table表格数据
function mockTable(current, pageSize) {
  let obj = {};
  const list = [];
  for (let i = 0; i < pageSize; i += 1) {
    const currentTotal = (current - 1) * pageSize + i + 1;
    if (currentTotal <= 31) {
      let sta = '';
      if (i === 0 || i === 3 || i === 6) {
        sta = '已指派';
      } else if (i === 1 || i === 4 || i === 7) {
        sta = '已完成';
      } else if (i === 2 || i === 5 || i === 8) {
        sta = '学习中';
      } else {
        sta = '已归档';
      }
      list.push({
        id: Number(`${current}${i}`),
        name: `反贿赂合规培训${current}${i}`,
        start_time: `2018-10-${current}${i}`,
        end_time: `2019-10-${current}${i}`,
        status: sta, // 已指派、已完成、学习中、已归档
        ratio: `${current}${i}/1${current}${i}`,
        course: {
          id: Number(`${current}${i}`),
          name: `反贿赂合规体系的建立与实践${current}${i}`,
        },
        questionanswer: `${current}${i}/1${current}${i}`,
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
function mockTable2(current, pageSize) {
  let obj = {};
  const list = [];
  for (let i = 0; i < pageSize; i += 1) {
    const currentTotal = (current - 1) * pageSize + i + 1;
    if (currentTotal <= 31) {
      list.push({
        id: `${current}${i}`,
        group_no: `2017050000-${current}-${i}`,
        name: `开发组-${current}-${i}`,
        trainers: [121, 145, 158, 2, 52, 149, 162, 1, 116, 140],
        created_time: '2018-11-27T16:25:24.465263',
        ratio: `${current}${i}/1${current}${i}`,
        questionanswer: `${current}${i}/1${current}${i}`,
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
function mockTable3(current, pageSize) {
  let obj = {};
  const list = [];
  for (let i = 0; i < pageSize; i += 1) {
    const currentTotal = (current - 1) * pageSize + i + 1;
    if (currentTotal <= 31) {
      let sta = '';
      if (i === 0 || i === 5) {
        sta = '已指派';
      } else if (i === 1 || i === 6) {
        sta = '学习中';
      } else if (i === 2 || i === 7) {
        sta = '已完成';
      } else if (i === 3 || i === 8) {
        sta = '超期未完成';
      } else {
        sta = '超期已完成';
      }
      list.push({
        id: `${current}${i}`,
        user_no: `查看-2017050000-${current}-${i}`,
        name: `查看-顾益明-${current}-${i}`,
        department_name: `查看-技术部-${current}-${i}`,
        status: sta,
        questionanswer: `${current}${i}/1${current}${i}`,
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

export default {
  // ------------------------------------------------------------------
  /**
   * 1、学习计划管理——>创建学习计划——>获取课程信息，讲师信息
   * 2、系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 获取课件信息，老师信息
   * 3、
   * 4、
   */

  // 学习计划管理——>创建学习计划——>点击提交按钮
  'POST /api/learn/plan': (req, res) => {
    res.send({
      status: 'ok',
      data: {
        course_name: '反贿赂合规体系的建立与实践',
        name: '反贿赂合规培训',
        start_time: '2018-10-26',
        end_time: '2018-11-25',
        course: 3,
        id: 27,
        orexame: false,
        status: '已指派',
        traingroups: [29, 28],
      },
    });
  },
  // ------------------------------------------------------------------
  // 学习计划管理——>主页，获取所有的学习计划
  'GET /api/learn/plan': (req, res) => {
    const params = req.query;
    const { current, pageSize } = params;
    const result = mockTable(current, pageSize);
    return res.json(result);
  },
  // ------------------------------------------------------------------
  /**
   * 学习计划管理——>编辑学习计划——>获取课程信息、讲师信息，获取计划名称、计划时间
   * 学习计划管理——>查看学习计划——>获取课程信息、讲师信息，获取计划名称、计划时间
   */
  'GET /api/learn/plan/:id': (req, res) => {
    res.send({
      status: 'ok',
      data: {
        name: `反贿赂合规培训`,
        start_time: `2018-10-10`,
        end_time: `2019-10-20`,
        course: {
          // ;课件名称：替换为实际课件名称（50个汉字以内）
          name: '反贿赂合规体系的建立与实践',
          // ;课件分类：0 公开课；1 非公开课
          category: '非公开课',
          // ;课件类型：0 通用课件；1 合规基础课件；2 合规管理课件；3 其他
          courseware_type: '通用课件',
          // ;课件简介：替换为实际课件内容简介（250个汉字以内）
          intruduce: '课件介绍课件介绍课件介绍课件介绍课件介绍',
          // ;适用对象：替换为本课程适用的人员群体描述（50个汉字以内）
          applicable_user: '财务管理人员',
          // ;课时：课件名义学时（取值范围0~4，小数点后面保留1位，后续用于学时统计）
          class_hour: '2',
          // ;课件封面
          cover: 'http://localhost/001.jpg',
          // ;讲师姓名：替换为实际讲师姓名（25个汉字以内）
          teachername: '付博',
          // ;讲师介绍：替换为实际讲师信息简介（250个汉字以内）
          teacherdesc:
            '讲师介绍讲师介绍讲师介绍讲师介绍讲师介绍讲师介绍讲师介绍讲师介绍讲师介绍讲师介绍讲师介绍讲师介绍讲师介绍讲师介绍讲师介绍讲师介绍',
          // ;老师封面
          teacherimg: 'http://localhost/002.jpg',
        },
      },
    });
  },
  // 学习计划管理——>编辑学习计划——>点击提交按钮
  'PUT /api/learn/plan/:id': (req, res) => {
    res.send({
      status: 'ok',
      data: {
        courseName: '反贿赂合规体系的建立与实践',
        name: '反贿赂合规培训',
        start_time: '2018-10-26',
        end_time: '2018-11-25',
      },
    });
  },
  // ------------------------------------------------------------------
  // 学习计划管理——>查看学习计划（获取table表格数据）
  'GET /api/learn/plan/:id/groups': (req, res) => {
    const params = req.query;
    const { current, pageSize } = params;
    const result = mockTable2(current, pageSize);
    return res.json(result);
  },
  // 学习计划管理——>查看学习计划——>查看培训群组学习详情（获取table表格数据）
  'GET /api/learn/plan/:studyPlanID/:trainGroupID/members': (req, res) => {
    const params = req.query;
    const { current, pageSize } = params;
    const result = mockTable3(current, pageSize);
    return res.json(result);
  },
  // // ------------------------------------------------------------------
  // 学习计划管理——>主页，归档学习计划
  'PATCH /api/learn/plan/:id': (req, res) => {
    res.send({
      status: 'ok',
      data: {},
    });
  },
  // ------------------------------------------------------------------
};
