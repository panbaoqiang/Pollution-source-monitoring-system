import { getAllResource, getResourceByPage, deleteMultResource, deleteResource, udpateResource, AddResource } from '@/api/resource'
const state = {}
import { getOperatorId } from '@/utils/auth'

const mutations = {}

const actions = {
  // 获取资源树,已完成
  getResourceTotalTree({ commit }) {
    const parm = {
      platform: navigator.platform.toLowerCase(),
      browserType: navigator.appName.toLowerCase(),
      data: {}
    }
    return new Promise(resolve => {
      getAllResource(parm).then(res => {
        console.log('后台返回资源列表数据Dataxxx', res)
        resolve(res)
      })
    })
  },
  getResourceByCondition({ commit }, query) {
    const parm = {
      platform: navigator.platform.toLowerCase(),
      browserType: navigator.appName.toLowerCase(),
      operatorId: getOperatorId(),
      startPage: query.startPage,
      pageSize: query.pageSize,
      data: {
        // 这个是资源id
        id: query.id
      }
    }
    return new Promise(resolve => {
      getResourceByPage(parm).then(res => {
        console.log('当前页面的数据为', res)
        resolve(res)
      })
    })
  },
  deleteMultResource({ commit }, query) {
    const parm = {
      platform: navigator.platform.toLowerCase(),
      browserType: navigator.appName.toLowerCase(),
      operatorId: getOperatorId(),
      data: {
        resourceIdList: query.resourceIdList
      }
    }
    return new Promise(resolve => {
      deleteMultResource(parm).then(res => {
        console.log('后台返回资源列表数据Data', res)
        resolve(res)
      })
    })
  },
  deleteResource({ commit }, query) {
    const parm = {
      platform: navigator.platform.toLowerCase(),
      browserType: navigator.appName.toLowerCase(),
      operatorId: getOperatorId(),
      data: {
        id: query.id
      }
    }
    return new Promise(resolve => {
      deleteResource(parm).then(res => {
        console.log('后台返回数据Data', res)
        resolve(res)
      })
    })
  },
  updateResource({ commit }, query) {
    const parm = {
      version: '0.0.1',
      serviceType: 'resource-update',
      deviceId: navigator.userAgent.toLowerCase(),
      deviceType: 0,
      operatorId: getOperatorId(),
      data: {
        id: query.id,
        name: query.name,
        path: query.path,
        icon: query.icon,
        remark: query.remark,
        leaf: query.leaf,
        resourceType: query.resourceType,
        parentId: query.parentId,
        component: query.component,
        version: query.version
      }
    }
    return new Promise(resolve => {
      udpateResource(parm).then(res => {
        console.log('更新资源后台返回', res)
        resolve(res)
      })
    })
  },
  AddResource({ commit }, query) {
    const parm = {
      platform: navigator.platform.toLowerCase(),
      browserType: navigator.appName.toLowerCase(),
      operatorId: getOperatorId(),
      data: {
        name: query.name,
        path: query.path,
        icon: query.icon,
        remark: query.remark,
        leaf: query.leaf,
        resourceType: query.resourceType,
        parentId: query.parentId,
        component: query.component
      }
    }
    return new Promise(resolve => {
      AddResource(parm).then(res => {
        console.log('添加资源后台返回', res)
        resolve(res)
      })
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
