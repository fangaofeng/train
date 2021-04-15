const getNoticeTaskes = (req, res) =>
  res.json({
    status: 'ok',
    data: {
      count: 5,
      next: null,
      previous: null,
      results: [
        {
          id: '1',
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
          id: '2',
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
          id: '3',
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
          id: '4',
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
          id: '5',
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
  'GET /api/noticetask/:id': (req, res) => {
    res.json({
      status: 'ok',
      data: {
        id: '1',
        reason: 'string',
        level: 'success',
        recipient: 2,
        title: 'tr1 werwe 1 day, 5 hours ago',
        unread: true,
        verb: 'werwe',
        description: 'werwer',
        target: null,
        actor: null,
        created: '2019-09-24 08:22:14',
        public: true,
        data: null,
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
