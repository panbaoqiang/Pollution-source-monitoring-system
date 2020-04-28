import { loginAjax, getInfoAjax,getAllUser } from '@/api/user'
import { getToken, setToken, removeToken, getName, setName, removeName, getOperatorId, setOperatorId, removeOperatorId } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
    // 三个都是放在本地的store,刷新也可以保存
    // 这个是token验证
    token: getToken(),
    // 用户姓名,本地存储
    name: getName(),
    // 操作人Id
    operatorId: getOperatorId(),
    // 角色
    roles: [],
  }


const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_OPERATOR_ID: (state, operatorId) => {
    state.operatorId = operatorId
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // 用户登入，初次返回所有的用户信息
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    const parm = {
      platform: navigator.platform.toLowerCase(),
      browserType: navigator.appName.toLowerCase(),
      data: {
        username: username.trim(),
        status: 1,
        password
      }
    }
    return new Promise((resolve, reject) => {
      loginAjax(parm).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        commit('SET_NAME', data.user.name)
        commit('SET_OPERATOR_ID', data.user.id)
        setToken(data.token)
        setName(data.user.name)
        setOperatorId(data.user.id)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info,是在token有的情况下，但是没有角色
  // 后端会传送一个类似于list
  getInfo({ commit, state }) {
    const parm = {
      platform: navigator.platform.toLowerCase(),
      browserType: navigator.appName.toLowerCase(),
      operatorId: state.operatorId,
      data: {}
    }
    return new Promise((resolve, reject) => {
      getInfoAjax(parm).then(response => {
        console.log('response', response)
        const { data } = response
        const roles = !data || data.length === 0 ? ['VISITOR'] : data
        commit('SET_ROLES', roles)
        resolve(roles)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
        removeToken() // must remove  token  first
        removeName()
        removeOperatorId()
        resetRouter()
        commit('SET_TOKEN', '')
        commit('SET_NAME', [])
        commit('SET_OPERATOR_ID', '')
        commit('SET_ROLES', '')  
        resolve()
    })
  },

  // clear user
  resetUser({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      removeName()
      removeOperatorId()
      commit('SET_TOKEN', '')
      commit('SET_NAME', [])
      commit('SET_OPERATOR_ID', '')  
      commit('SET_ROLES', '')  
      resolve()
    })
  },

   //测试
   getAllUser({ commit, state }) {
    return new Promise((resolve, reject) => {
      getAllUser({}).then(response => {
        resolve(response)
      }).catch(error => {
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

