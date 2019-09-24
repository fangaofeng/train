// 代码中会兼容本地 service mock 以及部署站点的静态数据

export default {
  // ------------------------------------------------------------------
  /**
   * 系统管理员——系统管理——部门管理
   * 进行3种状态判断
   * 无部门;onlyupload
   * 有部门，没有用户;canupload
   * 有部门，有用户;noupload
   */
  'GET /api/orgs/departments': (req, res) => {
    res.send({
      status: 'ok',
      ui: 'canupload',
      data: [
        {
          id: 391,
          name: '江苏博纳德s',
          children: [
            {
              id: 392,
              name: '研发中心',
              children: [
                {
                  id: 393,
                  name: '测试部',
                  children: [
                    {
                      id: 394,
                      name: '交付团队dfgsdfgsdfgsdgsdfgsdfgsdfgdfg',
                      children: [],
                      parent: 393,
                    },
                  ],
                  parent: 392,
                },
              ],
              parent: 391,
            },
          ],
          parent: null,
        },
      ],
    });
  },
  // ------------------------------------------------------------------
};
