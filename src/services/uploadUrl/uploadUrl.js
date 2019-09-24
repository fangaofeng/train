const url = 'http://localhost:9000';
// 系统管理员上传课件地址
export function getUploadCouserurl() {
  return `${url}/course/zipfileupload`;
}

// 系统管理员上传试卷地址
export function getUploadExamurl() {
  return `${url}/paper/zipfileupload`;
}

// 系统管理员部门管理上传excel
export function getDepartmentUploadurl() {
  return `${url}/orgs/excelupload`;
}
export function getImageUploadurl() {
  return `${url}/upload/file`;
}

// 系统管理员用户管理上传excel
export function getUploadUsersurl() {
  return `${url}/user/excelupload`;
}
export function getUploadAvatarurl() {
  return `${url}/user/avatar`;
}
export function getCoverUploadurl() {
  return `${url}/course/zipfileupload`;
}
