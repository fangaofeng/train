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
        sta = '草稿';
        img = '001.jpg';
      } else if (i === 1 || i === 5 || i === 8) {
        sta = '发布';
        img = '002.jpg';
      } else {
        sta = '归档';
        img = '003.jpg';
      }
      list.push({
        // id:10,
        id: `${page}${i}`,
        category: '公开课',
        article_no: `2018103100${page}${i}`,
        article_type: '通用文章',
        cover: `${basicUrl}/${img}`, // 背景图片

        drag_flag: true,
        description: '介绍反贿赂合规体系涵盖的业务范围和工作要点',
        title: '反贿赂合规体系的建立与实践',
        status: sta,
        creater: '刘涛',
        publish_time: '20190929',
        avatar: 'http://192.168.101.11:8000/media/teacherimg/string_fhlhg.jpg',
        content:
          '介绍反贿赂合规体系涵盖的业务范围和工作要点介绍反贿赂合规体系涵盖的业务范围和工作要点介绍反贿赂合规体系涵盖的业务范围和工作要点介绍反贿赂合规体系涵盖的业务范围和工作要点',
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
        user_no: `文章管理-2017050000-${page}-${i}`,
        name: `文章管理-顾益明-${page}-${i}`,
        department_name: `文章管理-技术部-${page}-${i}`,
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
   * 1、培训管理员首页：获取最新课程
   * 2、系统管理员首页：获取文章管理
   * 3、系统管理员 ——> 文章管理 ——> 主页，获取所有文章的表格数据
   */
  'GET /api/blog/article': (req, res) => {
    const params = req.query;
    const { page, size } = params;
    const result = mockTable(page, size);
    return res.json(result);
  },
  // 系统管理员 ——> 文章管理 ——> 主页，删除文章
  'DELETE /api/blog/article/:id': (req, res) => {
    res.send({
      status: 'ok',
      data: {},
    });
  },
  // // 系统管理员 ——> 文章管理 ——> 主页，下架文章
  // 'POST /api/article/detail/offShelf': (req, res) => {
  //   res.send({
  //     status: 'ok',
  //     data:{}
  //   });
  // },
  // // 系统管理员 ——> 文章管理 ——> 主页，归档文章
  // 'POST /api/article/detail/fileOnArchive': (req, res) => {
  //   res.send({
  //     status: 'ok',
  //     data:{}
  //   });
  // },
  // ------------------------------------------------------------------
  /**
   * 接口复用
   * 系统管理员 ——> 文章管理 ——> 文章编辑（拟制中） ——> 获取现有培训管理员的Table表格数据
   * 系统管理员 ——> 文章管理 ——> 文章编辑（拟制中） ——> 增加培训管理员的Table表格数据 有参数exclude=true
   */
  'GET /api/blog/article/:id': (req, res) => {
    const params = req.query;
    const { page, size } = params;
    const result = mockTable3(page, size);
    return res.json(result);
  },
  // 系统管理员 ——> 文章管理 ——> 文章编辑（拟制中） ——> (单个删除、批量删除)
  'PATCH /api/blog/article/edit/:id/members': (req, res) => {
    // 'POST /api//user/list/editTGManagerDel': (req, res) => {
    res.send({
      status: 'ok',
    });
  },
  // 系统管理员 ——> 文章管理 ——> 文章编辑（拟制中） ——> 增加培训管理员模态框提交按钮
  'PUT /api/blog/article/:id': (req, res) => {
    // 'POST /api//user/list/editTGMAddMemberSubmit': (req, res) => {
    res.send({
      status: 'ok',
    });
  },
  /**
   * 接口复用
   * 系统管理员 ——> 文章管理 ——> 主页，下架文章
   * 系统管理员 ——> 文章管理 ——> 主页，归档文章
   * 系统管理员 ——> 文章管理 ——> 文章编辑（拟制中、已上架、已下架）——> 上架文章、重新上架文章
   */
  'PATCH /api/blog/article/detail/:id': (req, res) => {
    // const { username,password } = req.body;
    res.send({
      status: 'ok', // ok成功  error失败
    });
  },
  // ------------------------------------------------------------------
};
