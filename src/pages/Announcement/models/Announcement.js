import {
  getArticleLists, // 系统管理员 ——> 文章管理 ——> 主页，获取所有文章的表格数据
  delArticle, // 系统管理员 ——> 文章管理 ——> 主页，删除文章
  createArticle, // 系统管理员 ——> 文章管理 ——>创建文章
  editArticle, // 系统管理员 ——> 文章管理 ——> 文章编辑
  changeArticleStatus, // 系统管理员 ——> 文章管理 ——>更改状态，发布or预览
  getArticleDetail, // 系统管理员 ——> 文章管理 ——> 获取文章详情
  // previewArticle, // 系统管理员 ——> 文章管理 ——> 文章预览
  delBatch, // 系统管理员 ——> 文章管理 ——> 文章批量删除
} from '@/services/Announcement/index';

export default {
  namespace: 'Announcement',

  state: {
    articleList: { results: [], count: 0 }, // 系统管理员 ——> 文章管理 ——> 主页，获取所有文章的表格数据
  },

  effects: {
    // ------------------------------------------------------------------
    // 系统管理员 ——> 文章管理 ——> 主页，获取所有文章的表格数据
    *GetArticleLists({ payload }, { call, put }) {
      // console.log(config);
      const response = yield call(getArticleLists, payload);
      if (response && response.status === 'ok') {
        // console.log('成功');
        yield put({
          type: 'saveArticleListTableData',
          payload: response.data,
        });
      }
    },
    // 系统管理员 ——> 文章管理 ——> 主页，删除文章
    *DelArticle({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(delArticle, payload);
      callback(response); // 返回结果
    },

    // ------------------------------------------------------------------
    // 系统管理员 ——> 文章管理 ——> 文章编辑（拟制中） ——> 获取文章信息，老师信息
    *GetArticleDetail({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(getArticleDetail, payload);
      callback(response); // 返回结果
    },
    *CreateArticle({ payload, config, callback }, { call }) {
      console.log('CreateArticle');
      const response = yield call(createArticle, payload, config);
      callback(response); // 返回结果
    },
    // 系统管理员 ——> 文章管理 ——> 文章编辑（拟制中） ——> 批量删除
    *DelBatch({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(delBatch, payload);
      callback(response); // 返回结果
    },

    // 系统管理员 ——> 文章管理 ——> 文章编辑（拟制中、已上架、已下架）——> 上架文章、重新上架文章
    *ChangeArticleStatus({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(changeArticleStatus, payload);
      callback(response); // 返回结果
    },
    *EditArticle({ payload, callback }, { call }) {
      console.log(payload);
      const response = yield call(editArticle, payload);
      callback(response); // 返回结果
    },
    // ------------------------------------------------------------------
  },

  reducers: {
    // ------------------------------------------------------------------
    // 系统管理员 ——> 文章管理 ——> 主页，获取所有文章的表格数据
    saveArticleListTableData(state, action) {
      return {
        ...state,
        articleList: action.payload,
      };
    },

    // ------------------------------------------------------------------
  },
};
