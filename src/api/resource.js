import request from '@/utils/request'

export function getAllResource(data) {
  return request({
    url: '/resource/getAllResource',
    method: 'post',
    data
  })
}
// 根据页码
export function getResourceByPage(data) {
  return request({
    url: '/resource/getResourceChildrenByParentId',
    method: 'post',
    data
  })
}
export function deleteMultResource(data) {
  return request({
    url: '/resource/deleteMultipleResource',
    method: 'post',
    data
  })
}
export function deleteResource(data) {
  return request({
    url: '/resource/deleteResource',
    method: 'post',
    data
  })
}
export function udpateResource(data) {
  return request({
    url: '/resource/updateResource',
    method: 'post',
    data
  })
}
export function AddResource(data) {
  return request({
    url: '/resource/addResource',
    method: 'post',
    data
  })
}
