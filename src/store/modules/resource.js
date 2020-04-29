import { getAllMenuResource, getAllComponent, getAllResource, getResourceByPage, deleteMultResource, deleteResource, udpateResource, AddResource } from '@/api/resource'
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
    return new Promise((resolve, reject)  => {
      getAllResource(parm).then(res => {
        resolve(res)
      }).catch(error => {
        // 在拦截器里面的错误直接向上传递
        reject(error)
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
    return new Promise((resolve, reject)  => {
      getResourceByPage(parm).then(res => {
        resolve(res)
      }).catch(error => {
        // 在拦截器里面的错误直接向上传递
        reject(error)
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
    return new Promise((resolve, reject)  => {
      deleteMultResource(parm).then(res => {
        resolve(res)
      }).catch(error => {
        // 在拦截器里面的错误直接向上传递
        reject(error)
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
    return new Promise((resolve, reject)  => {
      deleteResource(parm).then(res => {
        resolve(res)
      }).catch(error => {
        // 在拦截器里面的错误直接向上传递
        reject(error)
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
    return new Promise((resolve, reject)  => {
      udpateResource(parm).then(res => {
        resolve(res)
      }).catch(error => {
        // 在拦截器里面的错误直接向上传递
        reject(error)
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
    return new Promise((resolve, reject)  => {
      AddResource(parm).then(res => {
        resolve(res)
      }).catch(error => {
        // 在拦截器里面的错误直接向上传递
        reject(error)
      })
    })
  },
  getAllComponent({ commit }) {
    const parm = {
      platform: navigator.platform.toLowerCase(),
      browserType: navigator.appName.toLowerCase(),
      operatorId: getOperatorId(),
    }
    return new Promise((resolve, reject)  => {
      getAllComponent(parm).then(res => {
        resolve(res)
      }).catch(error => {
        // 在拦截器里面的错误直接向上传递
        reject(error)
      })
    })
  },
  getAllMenuResource({ commit }) {
    const parm = {
      platform: navigator.platform.toLowerCase(),
      browserType: navigator.appName.toLowerCase(),
      operatorId: getOperatorId(),
    }
    return new Promise((resolve, reject)  => {
      getAllMenuResource(parm).then(res => {
        resolve(res)
      }).catch(error => {
        // 在拦截器里面的错误直接向上传递
        reject(error)
      })
    })
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
