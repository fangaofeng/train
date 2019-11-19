// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 用户信息
  'GET /api/account/info': {
    status: 'ok',
    data: {
      id: 1,
      username: 'fgf', // 账号
      name: '刘涛', // 名称
      user_no: '001', // 编号
      phone: '13912344412',
      employee_position: '开发经理', // 职位
      email: 'fgf@whl.com', // 邮箱
      role_display: '系统管理员', // 角色
      thumbnail: 'http://localhost/avatar_default_big_bak.png', // 缩略图
      avatar: 'http://localhost/avatar_default_big_bak.png',
      department_name: '总经办', // 部门
    },
  },

  'POST /api/auth/login': (req, res) => {
    const { username, password } = req.body;
    if (username === 'fgf' && password === '1234qwer') {
      res.send({
        token: 'a9e85cd0f340b52b7d285af8f41b7f342e771be7', // toekn
        role: '系统管理员', // 角色
        role_display: '系统管理员',
      });
      return;
    }
    if (username === 'tr' && password === '1234qwer') {
      res.send({
        token: 'a9e85cd0f340b52b7d285af8f41b7f342e771be7', // toekn
        role: '培训管理员', // 角色
        role_display: '培训管理员',
      });
      return;
    }
    if (username === 'stu' && password === '1234qwer') {
      res.send({
        token: 'a9e85cd0f340b52b7d285af8f41b7f342e771be7', // toekn
        role: '员工', // 角色
        role_display: '学员',
      });
      return;
    }
    res.send({
      status: 'error',
    });
  },
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
};
