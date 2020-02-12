const getNotices = (req, res) =>
  res.json({
    status: 'ok',
    data: {
      count: 5,
      next: null,
      previous: null,
      results: [
        {
          id: 1,
          task: {
            id: 47,
            level: 'info',
            reason: 'test',
            actor: {
              id: 1,
              name: '刘呼兰',
              avatar: '/media/avatar/4b90f603738da977a970da61be51f8198618e319_myoU2A4.jpg',
              user_no: '201908170003',
              employee_position: '经理',
              thumbnail:
                '/media/CACHE/images/avatar/4b90f603738da977a970da61be51f8198618e319_myoU2A4/99b4841b14238375414cde4cea4d4961.jpg',
              department_name: '1/2-1',
            },
            verb: 'sdfsd',
            description: 'hgjh',
            target: null,
            action: null,
            public: true,
            data: null,
          },
          unread: true,
          emailed: false,
          created: '2019-12-22',
        },
        {
          id: 2,

          task: {
            id: 47,
            level: 'info',
            reason: 'test',
            actor: {
              id: 1,
              name: '刘呼兰',
              avatar: '/media/avatar/4b90f603738da977a970da61be51f8198618e319_myoU2A4.jpg',
              user_no: '201908170003',
              employee_position: '经理',
              thumbnail:
                '/media/CACHE/images/avatar/4b90f603738da977a970da61be51f8198618e319_myoU2A4/99b4841b14238375414cde4cea4d4961.jpg',
              department_name: '1/2-1',
            },
            verb: 'sdfsd',
            description: 'hgjh',
            target: null,
            action: null,
            public: true,
            data: null,
          },
          unread: true,
          emailed: false,
          created: '2019-12-22',
        },
        {
          id: 3,

          task: {
            id: 47,
            level: 'info',
            reason: 'test',
            actor: {
              id: 1,
              name: '刘呼兰',
              avatar: '/media/avatar/4b90f603738da977a970da61be51f8198618e319_myoU2A4.jpg',
              user_no: '201908170003',
              employee_position: '经理',
              thumbnail:
                '/media/CACHE/images/avatar/4b90f603738da977a970da61be51f8198618e319_myoU2A4/99b4841b14238375414cde4cea4d4961.jpg',
              department_name: '1/2-1',
            },
            verb: 'sdfsd',
            description: 'hgjh',
            target: null,
            action: null,
            public: true,
            data: null,
          },
          unread: true,
          emailed: false,
          created: '2019-12-22',
        },
        {
          id: 4,

          task: {
            id: 47,
            level: 'info',
            reason: 'test',
            actor: {
              id: 1,
              name: '刘呼兰',
              avatar: '/media/avatar/4b90f603738da977a970da61be51f8198618e319_myoU2A4.jpg',
              user_no: '201908170003',
              employee_position: '经理',
              thumbnail:
                '/media/CACHE/images/avatar/4b90f603738da977a970da61be51f8198618e319_myoU2A4/99b4841b14238375414cde4cea4d4961.jpg',
              department_name: '1/2-1',
            },
            verb: 'sdfsd',
            description: 'hgjh',
            target: null,
            action: null,
            public: true,
            data: null,
          },
          unread: true,
          emailed: false,
          created: '2019-12-22',
        },
        {
          id: 5,
          task: {
            id: 47,
            level: 'info',
            reason: 'test',
            actor: {
              id: 1,
              name: '刘呼兰',
              avatar: '/media/avatar/4b90f603738da977a970da61be51f8198618e319_myoU2A4.jpg',
              user_no: '201908170003',
              employee_position: '经理',
              thumbnail:
                '/media/CACHE/images/avatar/4b90f603738da977a970da61be51f8198618e319_myoU2A4/99b4841b14238375414cde4cea4d4961.jpg',
              department_name: '1/2-1',
            },
            verb: 'sdfsd',
            description: 'hgjh',
            target: null,
            action: null,
            public: true,
            data: null,
          },
          unread: true,
          emailed: false,
          created: '2019-12-22',
        },
      ],
    },
  });

export default {
  'GET /api/notices': getNotices,
  'PATCH /api/notices': (req, res) => {
    res.json({
      status: 'ok',
      data: {
        count: 3,
        next: null,
        previous: null,
        results: [
          {
            id: 1,
            task: {
              id: 47,
              level: 'info',
              reason: 'test',
              actor: {
                id: 1,
                name: '刘呼兰',
                avatar: '/media/avatar/4b90f603738da977a970da61be51f8198618e319_myoU2A4.jpg',
                user_no: '201908170003',
                employee_position: '经理',
                thumbnail:
                  '/media/CACHE/images/avatar/4b90f603738da977a970da61be51f8198618e319_myoU2A4/99b4841b14238375414cde4cea4d4961.jpg',
                department_name: '1/2-1',
              },
              verb: 'sdfsd',
              description: 'hgjh',
              target: null,
              action: null,
              public: true,
              data: null,
            },
            unread: true,
            emailed: false,
            created: '2019-12-22',
          },
          {
            id: 2,

            task: {
              id: 47,
              level: 'info',
              reason: 'test',
              actor: {
                id: 1,
                name: '刘呼兰',
                avatar: '/media/avatar/4b90f603738da977a970da61be51f8198618e319_myoU2A4.jpg',
                user_no: '201908170003',
                employee_position: '经理',
                thumbnail:
                  '/media/CACHE/images/avatar/4b90f603738da977a970da61be51f8198618e319_myoU2A4/99b4841b14238375414cde4cea4d4961.jpg',
                department_name: '1/2-1',
              },
              verb: 'sdfsd',
              description: 'hgjh',
              target: null,
              action: null,
              public: true,
              data: null,
            },
            unread: true,
            emailed: false,
            created: '2019-12-22',
          },
          {
            id: 3,

            task: {
              id: 47,
              level: 'info',
              reason: 'test',
              actor: {
                id: 1,
                name: '刘呼兰',
                avatar: '/media/avatar/4b90f603738da977a970da61be51f8198618e319_myoU2A4.jpg',
                user_no: '201908170003',
                employee_position: '经理',
                thumbnail:
                  '/media/CACHE/images/avatar/4b90f603738da977a970da61be51f8198618e319_myoU2A4/99b4841b14238375414cde4cea4d4961.jpg',
                department_name: '1/2-1',
              },
              verb: 'sdfsd',
              description: 'hgjh',
              target: null,
              action: null,
              public: true,
              data: null,
            },
            unread: true,
            emailed: false,
            created: '2019-12-22',
          },
        ],
      },
    });
  },

  'PATCH /api/notices/clear': (req, res) => {
    res.json({
      status: 'ok',
      data: {},
    });
  },
};
