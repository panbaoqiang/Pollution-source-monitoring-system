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