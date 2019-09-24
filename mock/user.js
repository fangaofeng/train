// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 用户信息
  'GET /api/user/info': {
    id: 1,
    username: 'fgf', // 账号
    name: '刘涛', // 名称
    user_no: '001', // 编号
    employee_position: '开发经理', // 职位
    email: 'fgf@whl.com', // 邮箱
    role_display: '系统管理员', // 角色
    thumbnail: 'http://localhost/avatar_default_big_bak.png', // 缩略图
    department_name: '总经办', // 部门
  },

  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    name: 'Serati Ma',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email: 'antdesign@alipay.com',
    signature: '海纳百川，有容乃大',
    title: '交互专家',
    group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
    tags: [
      {
        key: '0',
        label: '很有想法的',
      },
      {
        key: '1',
        label: '专注设计',
      },
      {
        key: '2',
        label: '辣~',
      },
      {
        key: '3',
        label: '大长腿',
      },
      {
        key: '4',
        label: '川妹子',
      },
      {
        key: '5',
        label: '海纳百川',
      },
    ],
    notifyCount: 12,
    country: 'China',
    geographic: {
      province: {
        label: '浙江省',
        key: '330000',
      },
      city: {
        label: '杭州市',
        key: '330100',
      },
    },
    address: '西湖区工专路 77 号',
    phone: '0752-268888888',
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/auth/login': (req, res) => {
    const { username, password } = req.body;
    if (username === 'fgf' && password === '1234qwer') {
      res.send({
        token: 'a9e85cd0f340b52b7d285af8f41b7f342e771be7', // toekn
        role: 0, // 角色
        role_display: '系统管理员',
      });
      return;
    }
    if (username === 'tr' && password === '1234qwer') {
      res.send({
        token: 'a9e85cd0f340b52b7d285af8f41b7f342e771be7', // toekn
        role: 1, // 角色
        role_display: '培训管理员',
      });
      return;
    }
    if (username === 'stu' && password === '1234qwer') {
      res.send({
        token: 'a9e85cd0f340b52b7d285af8f41b7f342e771be7', // toekn
        role: 2, // 角色
        role_display: '学员',
      });
      return;
    }
    res.send({
      status: 'error',
    });
    // const { password, userName, type } = req.body;
    // if (password === '888888' && userName === 'admin') {
    //   res.send({
    //     key:'sfsafaskfsafaslfljljljlj',// toekn
    //     role:'0',// 角色
    //     status: 'ok',
    //     type,
    //     currentAuthority: 'admin',
    //   });
    //   return;
    // }
    // if (password === '123456' && userName === 'user') {
    //   res.send({
    //     key:'sfsafaskfsafaslfljljljlj',// toekn
    //     role:'1',// 角色
    //     status: 'ok',
    //     type,
    //     currentAuthority: 'user',
    //   });
    //   return;
    // }
    // if (password === '123456' && userName === 'stu') {
    //   res.send({
    //     key:'sfsafaskfsafaslfljljljlj',// toekn
    //     role:'2',// 角色
    //     status: 'ok',
    //     type,
    //     currentAuthority: 'stu',
    //   });
    //   return;
    // }
    // res.send({
    //   status: 'error',
    //   type,
    //   currentAuthority: 'guest',
    // });
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
