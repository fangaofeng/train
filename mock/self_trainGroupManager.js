// 代码中会兼容本地 service mock 以及部署站点的静态数据

// 模拟table表格数据
function mockTable(current, pageSize) {
  let obj = {};
  const list = [];
  for (let i = 0; i < pageSize; i += 1) {
    const currentTotal = (current - 1) * pageSize + i + 1;
    if (currentTotal <= 31) {
      list.push({
        id: `${current}${i}`,
        group_no: `2017050000-${current}-${i}`,
        name: `开发组-${current}-${i}`,
        // trainers:[121, 145, 158, 2, 52, 149, 162, 1, 116, 140],
        count: `${current}${i}`,
        created_time: '2018-11-27T16:25:24.465263',
      });
    }
  }
  obj = {
    count: 31,
    next: null,
    previous: null,
    results: list,
  };
  return obj;
}
// 模拟table表格数据
// function mockTable2(current,pageSize) {
//   let obj = {};
//   const list = [];
//   for (let i = 0; i < pageSize; i += 1) {
//     const currentTotal = (current - 1) * pageSize + i + 1;
//     if (currentTotal <= 58) {
//       list.push({
//         id: `${current}${i}`,
//         user_number: `增加-2017050000-${current}-${i}`,
//         user_name: `增加-顾益明-${current}-${i}`,
//         user_department: `增加-技术部-${current}-${i}`,
//       });
//     }
//   }
//   obj = {
//     count: 58,
//     next: null,
//     previous: null,
//     results: list,
//   };
//   return obj;
// }
// 模拟table表格数据(查看培训群组)
function mockTable3(current, pageSize) {
  let obj = {};
  const list = [];
  for (let i = 0; i < pageSize; i += 1) {
    const currentTotal = (current - 1) * pageSize + i + 1;
    if (currentTotal <= 58) {
      list.push({
        id: `${current}${i}`,
        user_no: `查看-2017050000-${current}-${i}`,
        name: `查看-顾益明-${current}-${i}`,
        department_name: `查看-技术部-${current}-${i}`,
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
// 模拟table表格数据(编辑培训群组（获取现有群组成员的Table表格数据）)
// function mockTable4(current,pageSize) {
//   let obj = {};
//   const list = [];
//   for (let i = 0; i < pageSize; i += 1) {
//     const currentTotal = (current - 1) * pageSize + i + 1;
//     if (currentTotal <= 58) {
//       list.push({
//         id: `${current}${i}`,
//         user_no: `编辑-2017050000-${current}-${i}`,
//         name: `编辑-顾益明-${current}-${i}`,
//         department_name: `编辑-技术部-${current}-${i}`,
//       });
//     }
//   }
//   obj = {
//     count: 58,
//     next: null,
//     previous: null,
//     results: list,
//   };
//   return obj;
// }
// // 模拟table表格数据(编辑培训群组（增加群组成员的Table表格数据）)
// function mockTable5(current,pageSize) {
//   let obj = {};
//   const list = [];
//   for (let i = 0; i < pageSize; i += 1) {
//     const currentTotal = (current - 1) * pageSize + i + 1;
//     if (currentTotal <= 31) {
//       list.push({
//         id: `${current}${i}`,
//         user_number: `增加群组成员-2017050000-${current}-${i}`,
//         user_name: `增加群组成员-顾益明-${current}-${i}`,
//         user_department: `增加群组成员-技术部-${current}-${i}`,
//       });
//     }
//   }
//   obj = {
//     count: 31,
//     next: null,
//     previous: null,
//     results: list,
//   };
//   return obj;
// }

export default {
  // ------------------------------------------------------------------
  // 培训群组管理（获取table表格数据）
  /**
   * 接口复用
   * 培训管理员 ————> 培训群组管理 ————> 获取所有培训群组数据
   * 培训管理员 ————> 学习计划 ————> 学习计划管理 ————> 创建学习计划 ————> 获取所有培训群组数据
   */
  'GET /api/group': (req, res) => {
    const params = req.query;
    const { current, pageSize } = params;
    const result = mockTable(current, pageSize);
    return res.json({
      status: 'ok',
      data: result,
    });
  },
  // 培训群组管理（删除）(批量删除)
  'PATCH /api/group/bulkdelete': (req, res) => {
    res.send({
      status: 'ok',
    });
  },

  'POST /api/group': (req, res) => {
    res.send({
      status: 'ok',
      data: {
        id: 1,
        group_no: '编号XXXXXXXX',
        name: '名字XXXXXXX',
      },
    });
  },
  // ------------------------------------------------------------------
  // 查看培训群组（获取table表格数据）
  /**
   * 接口复用
   * 培训管理员 ————> 培训群组管理 ————> 查看培训群组
   * 培训管理员 ————> 学习计划 ————> 学习计划管理 ————> 创建学习计划 ————> 查看按钮（获取群组成员数据）
   * 培训管理员 ————> 培训群组管理 ————> 编辑培训群组（获取现有群组成员的Table表格数据）
   * 培训管理员 ————> 培训群组管理 ————> 编辑培训群组（增加群组成员的Table表格数据）有参数exclude=true
   */

  'GET /api/group/:id/members': (req, res) => {
    const params = req.query;
    const { current, pageSize } = params;
    const data = mockTable3(current, pageSize);
    return res.json({
      status: 'ok',
      data,
    });
  },
  // ------------------------------------------------------------------

  // 编辑培训群组（删除成员,批量删除成员）
  'PATCH /api/group/:id/members': (req, res) => {
    res.send({
      status: 'ok',
    });
  },

  'PUT /api/group/:id': (req, res) => {
    res.send({
      status: 'ok',
    });
  },

  // 编辑培训群组（增加群组成员提交按钮）
  'PUT /api/group/:id/members': (req, res) => {
    res.send({
      status: 'ok',
    });
  },
  // ------------------------------------------------------------------
};
