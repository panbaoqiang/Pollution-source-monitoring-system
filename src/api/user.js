import request from '@/utils/request'

export function loginAjax(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfoAjax(data) {
  return request({
    url: '/user/getInfo',
    method: 'post',
    data
  })
}
// 测试
export function getAllUser(data) {
  return request({
    url: '/user/getAllUser',
    method: 'post',
    data
  })
}

export function getUserResource(data) {
  return request({
    url: '/user/getUserResource',
    method: 'post',
    data
  })
}
export function getCurrentPageUser(data) {
  return request({
    url: '/user/getCurrentPageUser',
    method: 'post',
    data
  })
}
export function updateUser(data) {
  return request({
    url: '/user/updateUser',
    method: 'post',
    data
  })
}
export function deleteMultipleUser(data) {
  return request({
    url: '/user/deleteMultipleUser',
    method: 'post',
    data
  })
}
export function deleteUser(data) {
  return request({
    url: '/user/deleteUser',
    method: 'post',
    data
  })
}
export function addUser(data) {
  return request({
    url: '/user/addUser',
    method: 'post',
    data
  })
}
export function assignUserForRole(data) {
  return request({
    url: '/user/assignUserForRole',
    method: 'post',
    data
  })
}
export function clearUserRoleByUserIdList(data) {
  return request({
    url: '/user/clearUserRoleByUserIdList',
    method: 'post',
    data
  })
}
export function clearUserRoleByUserId(data) {
  return request({
    url: '/user/clearUserRoleByUserId',
    method: 'post',
    data
  })
}