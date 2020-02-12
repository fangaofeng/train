const getNoticeTaskes = (req, res) =>
  res.json({
    status: 'ok',
    data: {
      count: 5,
      next: null,
      previous: null,
      results: [
        {
          id: '000000001',
          reason: 'test',
          level: 'success',
          recipient: 2,
          verb: 'werwe',
          description: 'werwer',
          created: '2019-09-24 08:22:14',
          public: true,
          data: null,
        },
        {
          id: '000000002',
          reason: 'test',
          level: 'success',
          recipient: 2,
          verb: 'werwe',
          description: 'werwer',
          created: '2019-09-24 08:22:14',
          public: true,
          data: null,
        },
        {
          id: '000000003',
          reason: 'test',
          level: 'success',
          recipient: 2,
          verb: 'werwe',
          description: 'werwer',
          created: '2019-09-24 08:22:14',
          public: true,
          data: null,
        },
        {
          id: '000000004',
          reason: 'test',
          level: 'success',
          recipient: 2,
          verb: 'werwe',
          description: 'werwer',
          created: '2019-09-24 08:22:14',
          public: true,
          data: null,
        },
        {
          id: '000000005',
          reason: 'test',
          level: 'success',
          recipient: 2,
          verb: 'werwe',
          description: 'werwer',
          created: '2019-09-24 08:22:14',
          public: true,
          data: null,
        },
      ],
    },
  });

export default {
  'GET /api/noticetask': getNoticeTaskes,
  'PATCH /api/noticetask': (req, res) => {
    res.json({
      status: 'ok',
      data: {
        count: 3,
        next: null,
        previous: null,
        results: [
          {
            id: '000000001',

            level: 'success',
            recipient: 2,
            title: 'tr1 werwe 1 day, 5 hours ago',
            unread: true,
            verb: 'werwe',
            description: 'werwer',
            target: null,
            action_object: null,
            timestamp: '2019-09-24 08:22:14',
            public: true,
            data: null,
          },
          {
            id: '000000002',

            level: 'success',
            recipient: 2,
            title: 'tr1 werwe 1 day, 5 hours ago',
            unread: true,
            verb: 'werwe',
            description: 'werwer',
            target: null,
            action_object: null,
            timestamp: '2019-09-24 08:22:14',
            public: true,
            data: null,
          },
          {
            id: '000000003',

            level: 'success',
            recipient: 2,
            title: 'tr1 werwe 1 day, 5 hours ago',
            unread: false,
            verb: 'werwe',
            description: 'werwer',
            target: null,
            action_object: null,
            timestamp: '2019-09-24 08:22:14',
            public: true,
            data: null,
          },
        ],
      },
    });
  },

  'POST /api/noticetask': (req, res) => {
    res.json({
      status: 'ok',
      data: { id: 1 },
    });
  },
};
