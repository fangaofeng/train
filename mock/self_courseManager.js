const basicUrl = 'http://localhost';

// 模拟数据
function mockTable(current, pageSize) {
  let count;
  if (current === 1 && pageSize === 4) {
    count = 4;
  } else {
    count = 31;
  }
  let obj = {};
  const list = [];
  for (let i = 0; i < pageSize; i += 1) {
    const currentTotal = (current - 1) * pageSize + i + 1;
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
        id: `${current}${i}`,
        applicable_user: '财务管理人员',
        category: '公开课',
        class_hour: '1.50',
        courseware_file: 'http://192.168.101.11:8000/media/coursewarefile/string_fhlhg.mp4',
        courseware_no: `2018103100${current}${i}`,
        courseware_type: '通用课件',
        cover: `${basicUrl}/${img}`, // 背景图片
        drag_flag: true,
        file_type: 'MP4',
        intruduce: '介绍反贿赂合规体系涵盖的业务范围和工作要点',
        name: '反贿赂合规体系的建立与实践',
        property: { duration: 59.7 },
        status: sta,
        teacherdesc: '多年从事互联网金融、大数据、区块链法律风险防控研究',
        teacherimg: 'http://192.168.101.11:8000/media/teacherimg/string_fhlhg.jpg',
        teachername: '付博',
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
function mockTable3(current, pageSize) {
  let obj = {};
  const list = [];
  for (let i = 0; i < pageSize; i += 1) {
    const currentTotal = (current - 1) * pageSize + i + 1;
    if (currentTotal <= 58) {
      list.push({
        id: `${current}${i}`,
        user_no: `2017050000-${current}-${i}`,
        name: `课件管理-顾sds明-${current}-${i}`,
        department_name: `课件管理-技术部-${current}-${i}`,
        createdPlan: i % 2 === 0 ? '是' : '否',
      });
    }
  }
  obj = {
    count: 58,
    next: null,
    previous: null,
    results: list,
  };
  return obj;
}

export default {
  // ------------------------------------------------------------------
  /**
   * 接口复用
   * 1、培训管理员首页：获取最新课程
   * 2、系统管理员首页：获取课件管理
   * 3、系统管理员 ——> 课件管理 ——> 主页，获取所有课件的表格数据
   */
  'GET /api/course/ware': (req, res) => {
    const params = req.query;
    const { current, pageSize } = params;
    const result = mockTable(current, pageSize);
    return res.json(result);
  },
  // 系统管理员 ——> 课件管理 ——> 主页，删除课件
  'DELETE /api/course/ware/:id': (req, res) => {
    res.send({
      status: 'ok',
      data: {},
    });
  },
  /**
   * 接口复用
   * 系统管理员 ——> 课件管理 ——> 主页，下架课件
   * 系统管理员 ——> 课件管理 ——> 主页，归档课件
   * 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中、已上架、已下架）——> 上架课件、重新上架课件
   */
  'PATCH /api/course/ware/:id': (req, res) => {
    // const { username,password } = req.body;
    res.send({
      status: 'ok', // ok成功  error失败
    });
  },

  'GET /api/course/ware/:id': (req, res) => {
    res.send({
      status: 'ok',
      data: {
        // 课件编号
        courseware_no: '201812142002',
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
        teachername: '张老师',
        // ;讲师介绍：替换为实际讲师信息简介（250个汉字以内）
        teacherdesc:
          '上海交通大学工科硕士。二年级起钻研奥赛，中考前夕代班上课，高中获数学物理竞赛省级奖。10年起兼职教育行业，12年入沪上某知名机构，15年合伙加入乐课力培优，现任职乐课力竞赛部。执教5年，所带班级在各类竞赛中战绩优异。 张老师功底深厚，逻辑性强，上课激情，板书清晰，重、难点突出。她将用爱心耐心责任心及独特的教学能力，培养孩子们对于未知领域的兴趣，畅享数学。',
        // ;老师封面
        teacherimg: 'http://localhost/002.jpg',
        departments: [3, 4],
      },
    });
  },
  // ------------------------------------------------------------------
  /**
   * 接口复用
   * 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 获取现有培训管理员的Table表格数据
   * 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 增加培训管理员的Table表格数据 有参数exclude=true
   */
  'GET /api/course/ware/:id/trainmanagers': (req, res) => {
    const params = req.query;
    const { current, pageSize } = params;
    const result = mockTable3(current, pageSize);
    return res.json({
      status: 'ok',
      data: result,
    });
  },
  // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> (单个删除、批量删除)
  'PATCH /api/course/ware/:id/trainmanagers': (req, res) => {
    res.send({
      status: 'ok',
    });
  },
  // 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 增加培训管理员模态框提交按钮
  'PUT /api/course/ware/:id/trainmanagers': (req, res) => {
    res.send({
      status: 'ok',
    });
  },
  'POST /api/course/upload': (req, res) => {
    res.send({
      status: 'ok',
      data: {
        zipfileid: 48,
      },
    });
  },
  'POST /api/course/ware': (req, res) => {
    res.send({
      status: 'ok',
      data: {
        id: 48,
      },
    });
  },
  // ------------------------------------------------------------------
};
