import { stringify } from 'qs';
import request from '@/utils/request';
// 文章
export async function queryArticle(params) {
  return request(`/api/getArticleList?${stringify(params)}`);
}

export async function addArticle(params, config) {
  return request('/api/addArticle', {
    method: 'POST',
    body: params,
    ...config,
  });
}
export async function delArticle(params) {
  return request('/api/delArticle', {
    method: 'POST',
    body: params,
  });
}

export async function updateArticle(params) {
  return request('/api/updateArticle', {
    method: 'POST',
    body: params,
  });
}

export async function getArticleDetail(params) {
  return request('/api/getArticleDetail', {
    method: 'POST',
    body: params,
  });
}
