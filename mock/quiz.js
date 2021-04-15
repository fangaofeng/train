function mockquizes(current, pageSize) {
  let obj = {};
  const list = [];
  let count;
  if (current === 1 && pageSize === 4) {
    count = 4;
  } else {
    count = 31;
  }

  for (let i = 0; i < pageSize; i += 1) {
    const currentTotal = (current - 1) * pageSize + i + 1;
    if (currentTotal <= count) {
      let sta = '';
      // eslint-disable-next-line no-unused-vars
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
        id: `${current}${i}`,
        totalscore: 100,
        introduce: 'fdf',
        name: 'dfdf',
        status: sta,
      });
    }
  }
  obj = {
    status: 'ok',
    data: {
      count: 31,
      next: null,
      previous: null,
      results: list,
    },
  };
  return obj;
}

export default {
  // 考试管理——>主页，分页获取所有的考试计划
  'GET /api/quiz': (req, res) => {
    const params = req.query;
    const { current, pageSize } = params;
    const result = mockquizes(current, pageSize);
    return res.json(result);
  },
  'POST /api/quiz': (req, res) => {
    const result = { status: 'ok', data: { id: 1 } };
    return res.json(result);
  },
  // ------------------------------------------------------------------
  // 获取单个计划详情，不包含群组
  'GET /api/quiz/:id': (req, res) => {
    res.send({
      status: 'ok',
      data: {
        id: 1,
        totalscore: 100,
        introduce: 'fdf',
        name: 'dfdf',
        questiones: [{ type: 'yesorno', answer: { yesorno: true }, content: 'df' }],
      },
    });
  },

  // ------------------------------------------------------------------

  // 考试管理——>编辑考试计划——>点击提交按钮
  'PUT /api/quiz/:id': (req, res) => {
    res.send({
      status: 'ok',
      data: {
        examName: '反贿赂合规体系的建立与实践',
        name: '反贿赂合规培训',
        start_time: '2018-10-26',
        end_time: '2018-11-25',
      },
    });
  },

  'PATCH /api/quiz/:id': (req, res) => {
    res.send({
      status: 'ok',
      data: {
        examName: '反贿赂合规体系的建立与实践',
        name: '反贿赂合规培训',
        start_time: '2018-10-26',
        end_time: '2018-11-25',
      },
    });
  },
};
