import { constantRoutes, asyncRoutes } from '@/router'
import { getUserResource } from '@/api/user'
import { getOperatorId } from '@/utils/auth'
import Layout from '@/layout'
const state = {
  // 经过一次路由权限获取之后，routes变成了全部的路由信息，反正就是一种数据结构
  routes: [],
  // addRoutes是一个动态路由信息根据你权限获取的
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    // permisson的router一定是增加了所有的可视化的组件
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  // 这个情况下你需要看哪里调用了这个generateRoutes方法，他一定是用获取当前的角色，然后传参数传进来
  generateRoutes({ commit }) {
    const parm = {
      platform: navigator.platform.toLowerCase(),
      browserType: navigator.appName.toLowerCase(),
      operatorId: getOperatorId(),
      data: {}
    }
    return new Promise(resolve => {
      getUserResource(parm).then(res => {
        const routerTree = createRouterTree(!res.data ? [] : res.data)
        let accessedRoutes = createRouter(routerTree)
        // accessedRoutes = accessedRoutes.concat(asyncRoutes)
        // 我在做两步，第一步
        // 先做那个子路由跳转，导航栏不更新
        accessedRoutes = accessedRoutes.concat(asyncRoutes)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    })
  }
}

function createRouterTree(routerList) {
  const cloneData = JSON.parse(JSON.stringify(routerList))
  const data = cloneData.filter(father => {
    const branchArr = cloneData.filter(child => father.id === child.parentId)
    branchArr.length > 0 ? father['children'] = branchArr : ''
    return father.parentId === '0' // 如果第一层不是parentId=0，请自行修改
  })
  return data
}
// 传进来是数据库资源对象的树，接着上一个函数，构造一个路由对象，并且这个数组的每一个对象都是菜单
// 所以不需要判断说是不是等于1类型的
function createRouter(routerTree, router) {
  const newRouter = routerTree.map((item, index, arr) => {
    let route = {
      path: item.path,
      name: item.name,
      meta: {
        title: item.name,
        icon: item.icon
      }
    }
    route.component = viewLoad(item.component) 
    if (item.children && item.children[0].resourceType === 1) {
      // 如果有孩子，并且孩子节点也是菜单的话
      route.children = createRouter(Array.from(item.children))
    } else if (item.children && item.children[0].resourceType !== 1) {
      // 如果有孩子，并且孩子节点是按钮权限的话
      // 由于菜单不能跟按钮同级，一个按钮资源，那么就是全部按钮资源，但是按钮资源分两种
      route.meta.permission = createPermission(item.children)
    }
    if (item.parentId === '0' && item.component !== 'layout/index') {
      // 包装一下，外层加一个layout
      route.path = route.path.replace('/', '')
      const tmp = {
        path: item.path,
        redirect: item.path + item.path,
        component: Layout,
        children: [route]
      }
      route = tmp
    }
    return route
  })
  return newRouter
}
// 这个是把我所有的按钮级别的孩子节点的权限构造成一个新的数组
function createPermission(children) {
  const permossionList = children.map((item, index, arr) => {
    // 我有孩子，并且我的部分孩子是不是隐藏的
    // 数据的code当成权限名称吧，不是的话在改
    return item.permission
  })
  return permossionList
}
function viewLoad (path) {
  return function (resolve) {
    require([`@/${path}.vue`], resolve)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
