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
        status: sta,
        arttype: '文章',
        comment_status: '打开',
        thumbnail: `${basicUrl}/${img}`,
        created: '2019-09-02 23:57:43',
        modified: '2019-09-08 16:24:20',
        title: '介绍反贿赂合规体系涵盖的业务范围和工作要点',
        body:
          '<p>介绍反贿赂合规体系涵盖的业务范围和工作要点介绍反贿赂合规体系涵盖的业务范围和工作要点介绍反贿赂合规体系涵盖的业务范围和工作要点介绍反贿赂合规体系涵盖的业务范围和工作要点</p>',
        description:
          '介绍反贿赂合规体系涵盖的业务范围和工作要点介绍反贿赂合规体系涵盖的业务范围和工作要点介绍反贿赂合规体系涵盖的业务范围和工作要点介绍反贿赂合规体系涵盖的业务范围和工作要点介绍反贿赂合规体系涵盖的业务范围和工作要点介绍反贿赂合规体系涵盖的业务范围和工作要点介绍反贿赂合规体系涵盖的业务范围和工作要点介绍反贿赂合规体系涵盖的业务范围和工作要点',
        pub_time: '2019-09-02 23:57:43',
        views: 0,
        article_order: 0,
        cover: `${basicUrl}/${img}`,
        category: '公开课',
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

const article = {
  status: '草稿',
  arttype: '文章',
  comment_status: '打开',
  thumbnail: `${basicUrl}/003.jpg`,
  created: '2019-09-02 23:57:43',
  modified: '2019-09-08 16:24:20',
  title: '介绍反贿赂合规体系涵盖的业务范围和工作要点',
  body:
    '<p>介绍反贿赂合规体系涵盖的业务范围和工作要点介绍反贿赂合规体系涵盖的业务范围和工作要点介绍反贿赂合规体系涵盖的业务范围和工作要点介绍反贿赂合规体系涵盖的业务范围和工作要点</p>',
  description: '介绍反贿赂合规体系涵盖的业务范围和工作要点',
  pub_time: '2019-09-02 23:57:43',
  views: 0,
  article_order: 0,
  cover: `${basicUrl}/003.jpg`,
  category: '公开课',
};
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
    });
  },

  /**
   * 接口复用
   * 系统管理员 ——> 文章管理 ——> 文章编辑（拟制中） ——> 获取现有培训管理员的Table表格数据
   * 系统管理员 ——> 文章管理 ——> 文章编辑（拟制中） ——> 增加培训管理员的Table表格数据 有参数exclude=true
   */
  'GET /api/blog/article/:id': (req, res) =>
    res.json({
      status: 'ok',
      data: article,
    }),
  'POST /api/blog/article': (req, res) =>
    res.json({
      status: 'ok',
      data: { id: 1 },
    }),
  //  res.json(result);

  // 系统管理员 ——> 文章管理 ——> 文章编辑（拟制中） ——> 增加培训管理员模态框提交按钮
  'PUT /api/blog/article/:id': (req, res) => {
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
