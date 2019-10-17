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
        applicable_user: '财务管理人员',
        category: '公开课',
        class_hour: '1.50',
        courseware_file: 'http://192.168.101.11:8000/media/coursewarefile/string_fhlhg.mp4',
        courseware_no: `2018103100${page}${i}`,
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
function mockTable3(page, size) {
  let obj = {};
  const list = [];
  for (let i = 0; i < size; i += 1) {
    const currentTotal = (page - 1) * size + i + 1;
    if (currentTotal <= 58) {
      list.push({
        id: `${page}${i}`,
        user_no: `2017050000-${page}-${i}`,
        name: `课件管理-顾sds明-${page}-${i}`,
        department_name: `课件管理-技术部-${page}-${i}`,
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
    const { page, size } = params;
    const result = mockTable(page, size);
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
  // // 系统管理员 ——> 课件管理 ——> 主页，下架课件
  // 'POST /api/course/ware/offShelf': (req, res) => {
  //   res.send({
  //     status: 'ok',
  //     data:{}
  //   });
  // },
  // // 系统管理员 ——> 课件管理 ——> 主页，归档课件
  // 'POST /api/course/ware/fileOnArchive': (req, res) => {
  //   res.send({
  //     status: 'ok',
  //     data:{}
  //   });
  // },
  // ------------------------------------------------------------------
  /**
   * 接口复用
   * 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 获取现有培训管理员的Table表格数据
   * 系统管理员 ——> 课件管理 ——> 课件编辑（拟制中） ——> 增加培训管理员的Table表格数据 有参数exclude=true
   */
  'GET /api/course/ware/:id/trainmanagers': (req, res) => {
    const params = req.query;
    const { page, size } = params;
    const result = mockTable3(page, size);
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

  // ------------------------------------------------------------------
};
