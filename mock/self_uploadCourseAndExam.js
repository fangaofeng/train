// 代码中会兼容本地 service mock 以及部署站点的静态数据

// 模拟table表格数据
function fakeList(current, pageSize) {
  let obj = {};
  const list = [];
  for (let i = 0; i < pageSize; i += 1) {
    const currentTotal = (current - 1) * pageSize + i + 1;
    if (currentTotal <= 58) {
      // {
      //   "id": 4,
      //   "username": "tr",
      //   "name": "",
      //   "user_no": "123333343333",
      //   "employee_position": "",
      //   "role_display": "培训管理员",
      //   "thumbnail": null
      // }
      list.push({
        id: `${current}-${i}`,
        user_no: `2017110800-${current}-${i}`,
        name: `顾益明-${current}-${i}`,
        department_name: `财务部-${current}-${i}`,
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
  /**
   * 1、系统管理员 ————> 课件管理 ————> 上传课件 ————> 获取培训管理员数据
   * 2、系统管理员 ————> 试卷管理 ————> 上传试卷 ————> 获取培训管理员数据
   */
  'GET /api/user?role=培训管理员': (req, res) => {
    const params = req.query;
    const { current, pageSize } = params;
    const result = fakeList(current, pageSize);
    return res.send({
      status: 'ok',
      data: result, // ok成功  error失败
    });
  },
};
