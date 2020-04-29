import { assignRoleForUser, getAllRole, getCurrentPageRole, deleteRole, deleteMultipleRole, updateRole, addRole, assignRoleForResource } from '@/api/role'
import { getOperatorId } from '@/utils/auth'
const state = {}
const mutations = {}

const actions = {
  // 获取资源树,已完成
  getAllRole({ commit }) {
    const parm = {
      platform: navigator.platform.toLowerCase(),
      browserType: navigator.appName.toLowerCase(),
      operatorId: getOperatorId(),
      data: {}
    }
    return new Promise((resolve, reject) => {
      getAllRole(parm).then(res => {
        resolve(res)
      }).catch(error => {
        // 在拦截器里面的错误直接向上传递
        reject(error)
      })
    })
  },
  // 获取当前页的角色
  getCurrentPageRole({ commit }, query) {
    const parm = {
      platform: navigator.platform.toLowerCase(),
      browserType: navigator.appName.toLowerCase(),
      operatorId: getOperatorId(),
      startPage: query.startPage,
      pageSize: query.pageSize,
      data: {
        name: query.name
      }
    }
    return new Promise((resolve, reject) => {
      getCurrentPageRole(parm).then(res => {
        resolve(res)
      }).catch(error => {
        // 在拦截器里面的错误直接向上传递
        reject(error)
      })
    })
  },
  deleteRole({ commit }, query) {
    const parm = {
      platform: navigator.platform.toLowerCase(),
      browserType: navigator.appName.toLowerCase(),
      operatorId: getOperatorId(),
      data: {
        id: query.id
      }
    }
    return new Promise((resolve, reject) => {
      deleteRole(parm).then(res => {
        resolve(res)
      }).catch(error => {
        // 在拦截器里面的错误直接向上传递
        reject(error)
      })
    })
  },
  deleteMultipleRole({ commit }, query) {
    const parm = {
      platform: navigator.platform.toLowerCase(),
      browserType: navigator.appName.toLowerCase(),
      operatorId: getOperatorId(),
      data: {
        roleIdList: query.roleIdList
      }
    }
    return new Promise((resolve, reject) => {
      deleteMultipleRole(parm).then(res => {
        resolve(res)
      }).catch(error => {
        // 在拦截器里面的错误直接向上传递
        reject(error)
      })
    })
  },
  updateRole({ commit }, query) {
    const parm = {
      platform: navigator.platform.toLowerCase(),
      browserType: navigator.appName.toLowerCase(),
      operatorId: getOperatorId(),
      data: {
        id: query.id,
        name: query.name,
        remark: query.remark,
        status: query.status,
        version: query.version
      }
    }
    return new Promise((resolve, reject) => {
      updateRole(parm).then(res => {
        resolve(res)
      }).catch(error => {
        // 在拦截器里面的错误直接向上传递
        reject(error)
      })
    })
  },
  addRole({ commit }, query) {
    const parm = {
      platform: navigator.platform.toLowerCase(),
      browserType: navigator.appName.toLowerCase(),
      operatorId: getOperatorId(),
      data: {
        name: query.name,
        remark: query.remark,
        status: query.status
      }
    }
    return new Promise((resolve, reject) => {
      addRole(parm).then(res => {
        resolve(res)
      }).catch(error => {
        // 在拦截器里面的错误直接向上传递
        reject(error)
      })
    })
  },
  assignRoleForResource({ commit }, query) {
    const parm = {
      platform: navigator.platform.toLowerCase(),
      browserType: navigator.appName.toLowerCase(),
      operatorId: getOperatorId(),
      data: {
        roleIdList: query.roleIdList,
        resourceIds: query.resourceIds
      }
    }
    return new Promise((resolve, reject) => {
      assignRoleForResource(parm).then(res => {
        resolve(res)
      }).catch(error => {
        // 在拦截器里面的错误直接向上传递
        reject(error)
      })
    })
  },
  assignRoleForUser({ commit }, query) {
    const parm = {
      platform: navigator.platform.toLowerCase(),
      browserType: navigator.appName.toLowerCase(),
      operatorId: getOperatorId(),
      data: {
        roleIdList: query.roleIdList,
        userIds: query.userIds
      }
    }
    return new Promise((resolve, reject) => {
      assignRoleForUser(parm).then(res => {
        resolve(res)
      }).catch(error => {
        // 在拦截器里面的错误直接向上传递
        reject(error)
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
