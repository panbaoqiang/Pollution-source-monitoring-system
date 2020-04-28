import { assignRoleForUser, getAllRole, getCurrentPageRole, deleteRole, deleteMultipleRole, updateRole, addRole, assignRoleForResource } from '@/api/role'
import { getOperatorId } from '@/utils/auth'
const state = {}
const mutations = {}

const actions = {
  // 获取资源树,已完成
  getAllRole({ commit }) {
    const parm = {
      version: '0.0.1',
      serviceType: 'role-queryAll',
      deviceId: navigator.userAgent.toLowerCase(),
      deviceType: 0,
      operatorId: getOperatorId(),
      data: {}
    }
    console.log('参数：', parm)
    return new Promise(resolve => {
      getAllRole(parm).then(res => {
        console.log('后台返回角色列表数据Data', res)
        resolve(res)
      })
    })
  },
  // 获取当前页的角色
  getCurrentPageRole({ commit }, query) {
    const parm = {
      version: '0.0.1',
      serviceType: 'role-currentPageQuery',
      deviceId: navigator.userAgent.toLowerCase(),
      deviceType: 0,
      operatorId: getOperatorId(),
      startPage: query.startPage,
      pageSize: query.pageSize,
      data: {
        name: query.name
      }
    }
    console.log('参数：', parm)
    return new Promise(resolve => {
      getCurrentPageRole(parm).then(res => {
        console.log('后台返回角色列表数据Data', res)
        resolve(res)
      })
    })
  },
  deleteRole({ commit }, query) {
    const parm = {
      version: '0.0.1',
      serviceType: 'role-delete',
      deviceId: navigator.userAgent.toLowerCase(),
      operatorId: getOperatorId(),
      deviceType: 0,
      data: {
        id: query.id
      }
    }
    return new Promise(resolve => {
      deleteRole(parm).then(res => {
        console.log('删除单个角色后数据Data', res)
        resolve(res)
      })
    })
  },
  deleteMultipleRole({ commit }, query) {
    const parm = {
      version: '0.0.1',
      serviceType: 'role-deleteMult',
      deviceId: navigator.userAgent.toLowerCase(),
      deviceType: 0,
      operatorId: getOperatorId(),
      data: {
        roleIdList: query.roleIdList
      }
    }
    return new Promise(resolve => {
      deleteMultipleRole(parm).then(res => {
        console.log('批量删除角色后：', res)
        resolve(res)
      })
    })
  },
  updateRole({ commit }, query) {
    const parm = {
      version: '0.0.1',
      serviceType: 'role-update',
      deviceId: navigator.userAgent.toLowerCase(),
      deviceType: 0,
      operatorId: getOperatorId(),
      data: {
        id: query.id,
        name: query.name,
        remark: query.remark,
        status: query.status,
        version: query.version
      }
    }
    return new Promise(resolve => {
      updateRole(parm).then(res => {
        console.log('更改角色后：', res)
        resolve(res)
      })
    })
  },
  addRole({ commit }, query) {
    const parm = {
      version: '0.0.1',
      serviceType: 'role-add',
      deviceId: navigator.userAgent.toLowerCase(),
      deviceType: 0,
      operatorId: getOperatorId(),
      data: {
        name: query.name,
        remark: query.remark,
        status: query.status
      }
    }
    return new Promise(resolve => {
      addRole(parm).then(res => {
        console.log('添加角色后：', res)
        resolve(res)
      })
    })
  },
  assignRoleForResource({ commit }, query) {
    const parm = {
      version: '0.0.1',
      serviceType: 'role-roleAllocateResource',
      deviceId: navigator.userAgent.toLowerCase(),
      deviceType: 0,
      operatorId: getOperatorId(),
      data: {
        roleIdList: query.roleIdList,
        resourceIds: query.resourceIds
      }
    }
    return new Promise(resolve => {
      assignRoleForResource(parm).then(res => {
        console.log('角色赋予资源后', res)
        resolve(res)
      })
    })
  },
  assignRoleForUser({ commit }, query) {
    const parm = {
      version: '0.0.1',
      serviceType: 'role-roleAllocateUser',
      deviceId: navigator.userAgent.toLowerCase(),
      deviceType: 0,
      operatorId: getOperatorId(),
      data: {
        roleIdList: query.roleIdList,
        userIds: query.userIds
      }
    }
    return new Promise(resolve => {
      assignRoleForUser(parm).then(res => {
        console.log('角色赋予用户后', res)
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
