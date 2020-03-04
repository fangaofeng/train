export default {
  // 用户信息
  'GET /api/config/uploadpath': {
    status: 'ok',
    data: {
      course: 'http://localhost:8000/api/course/upload',
      paper: 'http://localhost:8000/api/paper/upload',
      avatar: 'http://localhost:8000/api/account/avatar',
      org: 'http://localhost:8000/api/orgs/upload',
      user: 'http://localhost:8000/api/user/upload',
      blogCover: 'http://localhost:8000/', // 假的
    },
  },
};
