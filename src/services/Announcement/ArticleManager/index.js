import { stringify } from 'qs';
import request from '@/utils/request';

// ------------------------------------------------------------------
// 系统管理员 ——> 文章管理 ——> 主页，获取所有文章的表格数据
export async function getArticleLists(params) {
  return request(`/api/blog/article?${stringify(params)}`);
}
// 系统管理员 ——> 文章管理 ——> 主页，删除文章
export async function delArticle(params) {
  return request(`/api/blog/article/${params.id}`, {
    method: 'DELETE',
    body: {},
  });
}
export async function createArticle(params, config) {
  // console.log('createArticle fn');
  return request(`/api/blog/article`, {
    method: 'POST',
    body: params,
    ...config,
  });
}
// 系统管理员 ——> 文章管理 ——> 创建文章
export async function editArticle(params) {
  return request(`/api/blog/article/${params.id}`, {
    method: 'PUT',
    body: params.data,
  });
}
// 系统管理员 ——> 文章管理 ——> 文章编辑（拟制中、已已经发布、预览）——> 发布文章、预览文章
export async function changeArticleStatus(params) {
  return request(`/api/blog/article/${params.id}`, {
    method: 'PATCH',
    body: params.data,
  });
}
// 系统管理员 ——> 文章管理 ——> 文章编辑（拟制中） ——> 获取文章信息
export async function getArticleDetail(params) {
  return request(`/api/blog/article/${params.id}`);
}
// 系统管理员 ——> 文章管理 ——> 主页，预览文章
export async function previewArticle(params) {
  return request(`/api/blog/article/preview/${params.id}`);
}

// 系统管理员 ——> 文章管理 ——> 文章编辑（拟制中） ——> 批量删除
export async function delBatch(params) {
  return request(`/api/blog/article/del`, {
    method: 'PATCH',
    body: params.data,
  });
}

// ------------------------------------------------------------------
