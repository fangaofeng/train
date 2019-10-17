const getNotices = (req, res) =>
  res.json({
    status: 'ok',
    data: {
      count: 20,
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
          id: '000000004',

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
          id: '000000005',

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
      ],
    },
  });

export default {
  'GET /api/notices': getNotices,
};
