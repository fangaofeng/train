// 代码中会兼容本地 service mock 以及部署站点的静态数据
function mockTable(current, pageSize) {
  let obj = {};
  const list = [];
  for (let i = 0; i < pageSize; i += 1) {
    const currentTotal = (current - 1) * pageSize + i + 1;
    if (currentTotal <= 31) {
      let sta = '';
      if (i === 0 || i === 5) {
        sta = '已指派';
      } else if (i === 1 || i === 6) {
        sta = '学习中';
      } else if (i === 2 || i === 7) {
        sta = '已完成';
      } else if (i === 3 || i === 8) {
        sta = '超期未完成';
      } else {
        sta = '超期已完成';
      }
      let courseSrc;
      let fileType;
      const idt = `${current}${i}`;
      if (idt % 2 === 1) {
        fileType = 'MP4';
        courseSrc = 'http://localhost/test.mp4'; // 课件资源路径
      } else {
        fileType = 'PDF';
        courseSrc = 'http://localhost/test.pdf'; // 课件资源路径
      }
      list.push({
        id: idt,
        status: sta, // 已指派、学习中、已完成、超期已完成、超期未完成
        progress: {
          starttime: '300',
          numpage: 2,
        },
        percent: Math.ceil(Math.random() * 50) + 50,

        start_time: '2018-10-26', // 学习计划开始时间
        end_time: '2018-10-26', // 学习计划开始时间
        course: {
          courseware_no: '1234',
          name: '反贿赂合规体系的建立与实践', // 课件名称
          category: '公开课',
          intruduce: '课件介绍课件介绍课件介绍课件介绍课件介绍', // 课件简介
          applicable_user: 'string',
          class_hour: '1.50', // 课时
          file_type: fileType,
          teachername: '张老师', // 讲师姓名
          teacherdesc:
            '上海交通大学工科硕士。二年级起钻研奥赛，中力竞赛部爱心耐心责任心及独特的教学能力，培养孩子们对于未知领域的兴趣，畅享数学。',
          teacherimg: 'http://localhost/002.jpg', // 老师封面
          cover: 'http://localhost/001.jpg', // 课件封面
          status: '拟制',
          drag_flag: true, // 是否允许视频拖动
          courseware_file: courseSrc,
          courseware_type: '通用课件',
          property: {},
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
export default {
  // ------------------------------------------------------------------

  'GET /api/learn/publicprogress': (req, res) => {
    const params = req.query;
    const { current, pageSize } = params;
    const result = mockTable(current, pageSize);
    return res.json(result);
  },
  /**
   * 1、我的学习计划 ——> 课程学习（MP4） ——> 获取视频资源，课程信息等
   * 2、我的学习计划 ——> 课程学习（PDF） ——> 获取PDF资源，课程信息等
   */
  'GET /api/learn/publicprogress/:id': (req, res) => {
    // const params = req.query;
    const { params } = req;
    const { id } = params;
    let courseSrc;
    let fileType;
    if (id % 2 === 1) {
      fileType = 'MP4';
      courseSrc = 'http://localhost/test.mp4'; // 课件资源路径
    } else {
      fileType = 'PDF';
      courseSrc = 'http://localhost/test.pdf'; // 课件资源路径
    }
    res.send({
      status: 'ok',
      data: {
        id,
        status: '学习中', // 已指派、学习中、已完成、超期已完成、超期未完成
        progress: {
          starttime: '300',
          numpage: 2,
        },
        type: fileType,
        start_time: '2018-10-26', // 学习计划开始时间
        end_time: '2018-10-26', // 学习计划开始时间
        course: {
          courseware_no: '1234',
          name: '反贿赂合规体系的建立与实践', // 课件名称
          category: '公开课',
          intruduce: '课件介绍课件介绍课件介绍课件介绍课件介绍', // 课件简介
          applicable_user: 'string',
          class_hour: '1.50', // 课时
          file_type: fileType,
          teachername: '张老师', // 讲师姓名
          teacherdesc: '上海交通大学工科硕士能力，培养孩子们对于未知领域的兴趣，畅享数学。',
          teacherimg: 'http://localhost/002.jpg', // 老师封面
          cover: 'http://localhost/001.jpg', // 课件封面
          status: '拟制',
          drag_flag: true, // 是否允许视频拖动
          courseware_file: courseSrc,
          courseware_type: '通用课件',
          property: {},
        },
      },
    });
  },
  /**
   * 1、我的学习计划 ——> 课程学习(mp4) ——> 每隔10秒调用一次接口，发送视频的当前时间和播放状态
   * 2、我的学习计划 ——> 课程学习(pdf) ——> 发送pdf的当前页码和学习状态
   */
  'POST /api/learn/publicprogress': (req, res) => {
    const { body } = req;
    // console.log(body);
    const { course } = body;
    res.send({
      status: 'ok',
      data: { id: course },
    });
  },

  'PATCH /api/learn/publicprogress/:id': (req, res) => {
    res.send({
      status: 'ok',
      data: {},
    });
  },
  // ------------------------------------------------------------------
};
