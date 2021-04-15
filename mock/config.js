export default {
  // 用户信息
  'GET /api/config/uploadpath': {
    status: 'ok',
    data: {
      course: '/api/course/upload',
      paper: '/api/paper/upload',
      avatar: '/api/account/avatar',
      org: '/api/orgs/upload',
      user: '/api/user/upload',
      blogCover: '', // 假的
    },
  },
};
