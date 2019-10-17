import { stringify } from 'qs';
import request from '@/utils/request';

// 系统管理员 ————> 系统管理 ————> 用户管理 ————> 获取批量导入的table表格用户数据
// export async function getBatchImportTableData(params) {
//   return request(`/api//user/list?${stringify(params)}`);
//   // return request(`/api//user/list/getBatchImportTableData?${stringify(params)}`);
// }

// 系统管理员 ————> 系统管理 ————> 用户管理 ————> 获取所有的用户数据
// export async function getAllUserManagerTableData(params) {
//   return request(`/api//user/list?${stringify(params)}`);
//   // return request(`/api//user/list/getAllUsersTableData?${stringify(params)}`);
// }
/**
 * 接口复用
 * 系统管理员 ————> 系统管理 ————> 用户管理 ————> 获取批量导入的table表格用户数据
 * 系统管理员 ————> 系统管理 ————> 用户管理 ————> 获取所有的用户数据
 * 培训管理员 ————> 培训群组管理 ————>增加培训群组（获取table表格数据）
 */
export default async function getUserManagerTableData(params) {
  return request(`/api/user/list?${stringify(params)}`);
}
