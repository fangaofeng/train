const basicUrl = 'http://localhost';

// 模拟数据
function mockTable(page, size) {
  let count;
  if (page === 1 && size === 4) {
    count = 4;
  } else {
    count = 31;
  }
  let obj = {};
  const list = [];
  for (let i = 0; i < size; i += 1) {
    const currentTotal = (page - 1) * size + i + 1;
    if (currentTotal <= count) {
      let sta = '';
      let img = '';
      if (i === 0 || i === 4) {
        sta = '拟制中';
        img = '001.jpg';
      } else if (i === 1 || i === 5 || i === 8) {
        sta = '已上架';
        img = '002.jpg';
      } else if (i === 2 || i === 6) {
        sta = '已下架';
        img = '003.jpg';
      } else {
        sta = '已归档';
        img = '004.jpg';
      }
      list.push({
        // id:10,
        id: `${page}${i}`,
        // 试卷编号
        number: `201810310001${page}${i}`,
        // 试卷名称
        title: '反贿赂合规体系的建立与实践考试',
        // 考试时长
        time: 60,
        // 试卷总分
        score: 100,
        // 合格分数
        passScore: 60,
        // 适用对象
        suitablePerson: '财务管理人员',
        // 试卷介绍
        introduce: '考查反贿赂合规体系涵盖的业务范围和工作要点',
        // 封面
        cover: `${basicUrl}/${img}`, // 背景图片
        // 适用课程编号，不是必填
        applicableCourseNumber: undefined,
        // 适用课程名称，不是必填
        applicableCourseName: '反贿赂合规体系的建立与实践',
        status: sta,
        creater: '刘涛',
      });
    }
  }
  obj = {
    status: 'ok',
    data: {
      count,
      next: null,
      previous: null,
      results: list,
    },
  };
  return obj;
}

// 模拟table表格数据
function mockTable3(page, size) {
  let obj = {};
  const list = [];
  for (let i = 0; i < size; i += 1) {
    const currentTotal = (page - 1) * size + i + 1;
    if (currentTotal <= 58) {
      list.push({
        id: `${page}${i}`,
        user_no: `试卷管理-2017050000-${page}-${i}`,
        name: `试卷管理-顾益明-${page}-${i}`,
        department_name: `试卷管理-技术部-${page}-${i}`,
        created: i % 2 === 0 ? '是' : '否',
      });
    }
  }
  obj = {
    status: 'ok',
    data: {
      count: 58,
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
   * 接口复用
   * 1、培训管理员首页：获取最新考试
   * 2、系统管理员首页：获取试卷管理
   * 3、系统管理员 ——> 试卷管理 ——> 主页，获取所有试卷的表格数据
   */
  'GET /api/test/ware': (req, res) => {
    const params = req.query;
    const { page, size } = params;
    const result = mockTable(page, size);
    return res.json(result);
  },
  // 系统管理员 ——> 试卷管理 ——> 主页，删除试卷
  'DELETE /api/test/ware/:id': (req, res) => {
    res.send({
      status: 'ok',
      data: {},
    });
  },

  // ------------------------------------------------------------------
  /**
   * 接口复用
   * 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中、已上架、已下架） ——> 获取现有培训管理员的Table表格数据
   * 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中、已上架、已下架） ——> 增加培训管理员的Table表格数据 有参数exclude=true
   */
  'GET /api/examManager/edit/:id/members': (req, res) => {
    const params = req.query;
    const { page, size } = params;
    const result = mockTable3(page, size);
    return res.json(result);
  },
  // 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中、已上架、已下架） ——> (单个删除、批量删除)
  'PATCH /api/examManager/edit/:id/members': (req, res) => {
    // 'POST /api//user/list/editTGManagerDel': (req, res) => {
    res.send({
      status: 'ok',
    });
  },
  // 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中、已上架、已下架） ——> 增加培训管理员模态框提交按钮
  'PUT /api/examManager/edit/:id/members': (req, res) => {
    // 'POST /api//user/list/editTGMAddMemberSubmit': (req, res) => {
    res.send({
      status: 'ok',
    });
  },
  /**
   * 接口复用
   * 系统管理员 ——> 试卷管理 ——> 主页，下架试卷
   * 系统管理员 ——> 试卷管理 ——> 主页，归档试卷
   * 系统管理员 ——> 试卷管理 ——> 试卷编辑（拟制中、已上架、已下架）——> 上架试卷、重新上架试卷
   */
  'PATCH /api/test/ware/:id': (req, res) => {
    // const { username,password } = req.body;
    res.send({
      status: 'ok', // ok成功  error失败
    });
  },
  // ------------------------------------------------------------------
};
