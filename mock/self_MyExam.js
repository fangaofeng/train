// 代码中会兼容本地 service mock 以及部署站点的静态数据
function mockTable(current, pageSize) {
  let obj = {};
  const list = [];
  for (let i = 0; i < pageSize; i += 1) {
    const currentTotal = (current - 1) * pageSize + i + 1;
    if (currentTotal <= 31) {
      let sta = '';
      if (i === 0 || i === 5) {
        sta = '待参加';
      } else if (i === 1 || i === 6) {
        sta = '待参加';
      } else if (i === 2 || i === 7) {
        sta = '已完成';
      } else if (i === 3 || i === 8) {
        sta = '超期未完成';
      } else {
        sta = '超期已完成';
      }

      const idt = `${current}${i}`;

      list.push({
        id: idt,
        status: sta, // 已指派、学习中、已完成、超期已完成、超期未完成
        start_time: '2019-08-10',
        end_time: '2019-09-12',
        score: 80,
        days_remaining: 3,
        plan: {
          id: 1,
          name: '反贿赂合规体系的建立与实践',
          exam_name: '反贿赂合规培训',
          start_time: '2018-10-26 12:50:00',
          end_time: '2018-11-25 12:50:00',
          exampaper: {
            id: 1,
            // 试卷编号
            number: `201810310001${current}${i}`,
            // 试卷名称
            name: '反贿赂合规体系的建立与实践考试',
            // 考试时长
            duration: 60,
            // 试卷总分
            total_score: 100,
            // 合格分数
            passing_score: 60,
            // 适用对象
            applicable_user: '财务管理人员',
            // 试卷介绍
            introduce: '考查反贿赂合规体系涵盖的业务范围和工作要点',
            // 封面
            cover: 'http://localhost/001.jpg',
            // 适用课程编号，不是必填
            applicableCourseNumber: `20181031000110`,
            // 适用课程名称，不是必填
            applicableCourseName: '反贿赂合规体系的建立与实践',
          },
        },
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

function mockquestions(current, pageSize) {
  let obj = {};
  const list = [];
  for (let i = 0; i < pageSize; i += 1) {
    const order = (current - 1) * pageSize + i + 1;
    if (order <= 20) {
      let type = '';
      if (i === 0 || i === 5) {
        type = '单选题';
      } else {
        type = '多选题';
      }

      const idt = `${current}${i}`;

      list.push({
        id: idt,
        type,
        // 分值
        score: 3,
        // 排序
        order,
        // 题目名称
        title:
          '反贿赂合规体系的建立与实践考试反贿赂合规体系的建立与实践考试反贿赂合规体系的建立与实践考试反贿赂合规体系的建立与实践考试反贿赂合规体系的建立与实践考试反贿赂合规体系的建立与实践考试',
        // 题目选项
        options: {
          A: '反贿赂合规体系的建立与实践考试反贿赂合规体系的建立与实践考试',
          B: '反贿赂合规体系的建立贿赂合规体系的建立与实践考试',
          C: '反贿赂合规体系的建立与实践考试反贿赂合规体系的建实践考试',
          D: '反贿赂合规体系的建立与实践考试反贿赂合规体系的建立与建立与实践考试',
          // 'E':'反贿赂合规体系的建立与实践考试',
          // 'F':'反贿赂合规体系的建立与实践考试反贿赂合规体系的建立与实践考试反贿与实践考',

          // 'G':'反贿赂合规体系的建立与实践考试反贿赂合规体系的建实践考试',
          // 'H':'反贿赂合规体系的建立与实践考试反贿赂合规体系的建立与建立与实践考试',
          // 'I':'反贿赂合规体系的建立与实践考试',
          // 'J':'反贿赂合规体系的建立与实践考试反贿赂合规体系的建立与实践考试反贿与实践考',
        },
      });
    }
  }
  obj = {
    status: 'ok',
    data: {
      count: 20,
      next: null,
      previous: null,
      results: list,
    },
  };
  return obj;
}

export default {
  // ------------------------------------------------------------------

  'GET /api/paper/progress': (req, res) => {
    const params = req.query;
    const { current, pageSize } = params;
    const result = mockTable(current, pageSize);
    return res.json(result);
  },
  /**
   * 1、我的学习计划 ——> 课程学习（MP4） ——> 获取视频资源，课程信息等
   * 2、我的学习计划 ——> 课程学习（PDF） ——> 获取PDF资源，课程信息等
   */
  'GET /api/paper/progress/:id': (req, res) => {
    // const params = req.query;
    const { params } = req;
    const { id } = params;
    res.send({
      status: 'ok',
      data: {
        id,
        status: '待参加', // 已指派、学习中、已完成、超期已完成、超期未完成
        start_time: '2019-08-10',
        end_time: '2019-09-12',
        score: 80,
        days_remaining: 0,
        plan: {
          id: 1,
          name: '反贿赂合规体系的建立与实践',
          exam_name: '反贿赂合规培训',
          start_time: '2018-10-26 12:50:00',
          end_time: '2018-11-25 12:50:00',
          exampaper: {
            id: 1,
            // 试卷编号
            number: `20181031000199`,
            // 试卷名称
            name: '反贿赂合规体系的建立与实践考试',
            // 考试时长
            duration: 60,
            // 试卷总分
            total_score: 100,
            // 合格分数
            passing_score: 60,
            // 适用对象
            applicablePerson: '财务管理人员',
            // 试卷介绍
            introduce: '考查反贿赂合规体系涵盖的业务范围和工作要点',
            // 封面
            cover: 'http://localhost/001.jpg',
            // 适用课程编号，不是必填
            applicableCourseNumber: `20181031000110`,
            // 适用课程名称，不是必填
            applicableCourseName: '反贿赂合规体系的建立与实践',
          },
        },
      },
    });
  },
  /**
   * 1、我的学习计划 ——> 课程学习(mp4) ——> 每隔10秒调用一次接口，发送视频的当前时间和播放状态
   * 2、我的学习计划 ——> 课程学习(pdf) ——> 发送pdf的当前页码和学习状态
   */
  'PATCH /api/paper/progress/:id': (req, res) => {
    res.send({
      status: 'ok',
      data: {},
    });
  },
  // ------------------------------------------------------------------

  'GET /api/paper/progress/:id/questions': (req, res) => {
    const params = req.query;
    const { current, pageSize } = params;
    if (current === '-1' && pageSize === '-1') {
      const result = mockquestions(1, 20);
      return res.json(result);
    }
    const result = mockquestions(1, 20);
    return res.json(result);
  },

  'GET /api/paper/progress/:progressid/questions/:id': (req, res) => {
    const { params } = req;
    const { id } = params;
    res.send({
      id,
      type: '单选题',
      // 分值
      score: 3,
      // 排序
      order: '1',
      // 题目名称
      questionName:
        '反贿赂合规体系的建立与实践考试反贿赂合规体系的建立与实践考试反贿赂合规体系的建立与实践考试反贿赂合规体系的建立与实践考试反贿赂合规体系的建立与实践考试反贿赂合规体系的建立与实践考试',
      // 题目选项
      options: {
        A: '反贿赂合规体系的建立与实践考试反贿赂合规体系的建立与实践考试',
        B: '反贿赂合规体系的建立贿赂合规体系的建立与实践考试',
        C: '反贿赂合规体系的建立与实践考试反贿赂合规体系的建实践考试',
        D: '反贿赂合规体系的建立与实践考试反贿赂合规体系的建立与建立与实践考试',
        // 'E':'反贿赂合规体系的建立与实践考试',
        // 'F':'反贿赂合规体系的建立与实践考试反贿赂合规体系的建立与实践考试反贿与实践考',

        // 'G':'反贿赂合规体系的建立与实践考试反贿赂合规体系的建实践考试',
        // 'H':'反贿赂合规体系的建立与实践考试反贿赂合规体系的建立与建立与实践考试',
        // 'I':'反贿赂合规体系的建立与实践考试',
        // 'J':'反贿赂合规体系的建立与实践考试反贿赂合规体系的建立与实践考试反贿与实践考',
      },
      // anwsers: '',
    });
  },

  'POST /api/paper/progress/:id': (req, res) => {
    // const params = req.query;

    res.send({
      status: 'ok',
    });
  },
};
