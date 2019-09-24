// 代码中会兼容本地 service mock 以及部署站点的静态数据

// 模拟table表格数据
function mockTable(page,size,importid) {
    let obj = {};
    const list = [];
    for (let i = 0; i < size; i += 1) {
      const currentTotal = (page-1)*size+i+1;
      if(currentTotal<=58){
        let content = '';
        if(importid){
          content = `-${page}-${i}-${importid}`;
        }else{
          content = `-${page}-${i}`;
        }
        list.push({
          id: `${page}-${i}`,
          user_no:`2017050000${content}`,// 员工编号
          name:`王晓霞${content}`,// 姓名
          username:`Linda${content}`,// 登录账号
          email:`123456${content}`,// EMAIL
          // user_pwd:`123456${content}`,// 登录密码
          department_name:`技术部${content}`,// 归属部门
          employee_position:`产品运营专员${content}`,// 职务
          role_display:`系统管理员${content}`,// 用户类别
        });
      }
    }
    obj = 
    {
      "count": 58,
      "next": null,
      "previous": null,
      "results": list
    }
    return obj;
}

export default {

    // 系统管理员 ————> 系统管理 ————> 用户管理 ————> 获取批量导入的table表格用户数据
    // 'GET /api//user/list/getBatchImportTableData': (req, res) => {
    // 'GET /api//user/list': (req, res) => {
    //     const params = req.query;
    //     const { page , size , importid} = params;
    //     const result = mockTable(page,size,importid);
    //     return res.json(result);
    // },
    // 系统管理员 ————> 系统管理 ————> 用户管理 ————> 获取所有的用户数据
    // 'GET /api//user/list/getAllUsersTableData': (req, res) => {
    //     const params = req.query;
    //     const { page , size } = params;
    //     const result = mockTable(page,size);
    //     return res.json(result);
    // },
    
    /** 
     * 接口复用
     * 系统管理员 ————> 系统管理 ————> 用户管理 ————> 获取批量导入的table表格用户数据
     * 系统管理员 ————> 系统管理 ————> 用户管理 ————> 获取所有的用户数据
     * 培训管理员 ————> 培训群组管理 ————>增加培训群组（获取table表格数据）
    */
    'GET /api/user/list': (req, res) => {
      const params = req.query;
      const { page , size , importid} = params;
      const result = mockTable(page,size,importid);
      return res.json(result);
    },
  };
  