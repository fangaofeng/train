import { stringify } from 'qs';
import request from '@/utils/request';

// ------------------------------------------------------------------
// 系统管理员 ——> 文章管理 ——> 主页，获取所有文章的表格数据
export async function getArticleLists(params) {
  return request(`/blog/article?${stringify(params)}`);
}
// 系统管理员 ——> 文章管理 ——> 主页，删除文章
export async function delArticle(params) {
  return request(`/blog/article/${params.id}`, {
    method: 'DELETE',
    data: {},
  });
}
export async function createArticle(params) {
  return request(`/blog/article`, {
    method: 'POST',
    data: params,
  });
}
// 系统管理员 ——> 文章管理 ——> 创建文章
export async function editArticle(params) {
  return request(`/blog/article/${params.id}`, {
    method: 'PATCH',
    data: params.data,
  });
}
// 系统管理员 ——> 文章管理 ——> 文章编辑（拟制中、已已经发布、预览）——> 发布文章、预览文章
export async function changeArticleStatus(params) {
  return request(`/blog/article/${params.id}`, {
    method: 'PATCH',
    data: params.data,
  });
}
// 系统管理员 ——> 文章管理 ——> 文章编辑（拟制中） ——> 获取文章信息
export async function getArticleDetail(params) {
  return request(`/blog/article/${params.id}`);
}
// 系统管理员 ——> 文章管理 ——> 主页，预览文章
export async function previewArticle(params) {
  return request(`/blog/article/preview/${params.id}`);
}

// 系统管理员 ——> 文章管理 ——> 文章编辑（拟制中） ——> 批量删除
export async function delBatch(params) {
  return request(`/blog/article/del`, {
    method: 'PATCH',
    data: params.data,
  });
}

// ------------------------------------------------------------------
