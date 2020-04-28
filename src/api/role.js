import request from '@/utils/request'

// 获取所有的角色
export function getAllRole(data) {
  return request({
    url: '/role/getAllRole',
    method: 'post',
    data
  })
}

export function getCurrentPageRole(data) {
  return request({
    url: '/role/getCurrentPageRole',
    method: 'post',
    data
  })
}

export function deleteRole(data) {
  return request({
    url: '/role/deleteRole',
    method: 'post',
    data
  })
}
export function deleteMultipleRole(data) {
  return request({
    url: '/role/deleteMultipleRole',
    method: 'post',
    data
  })
}
export function updateRole(data) {
  return request({
    url: '/role/updateRole',
    method: 'post',
    data
  })
}
export function addRole(data) {
  return request({
    url: '/role/addRole',
    method: 'post',
    data
  })
}
export function assignRoleForResource(data) {
  return request({
    url: '/role/assignRoleForResource',
    method: 'post',
    data
  })
}

export function assignRoleForUser(data) {
  return request({
    url: '/role/assignRoleForUser',
    method: 'post',
    data
  })
}
