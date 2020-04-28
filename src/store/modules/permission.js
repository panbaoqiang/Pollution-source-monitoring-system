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
    console.log('state.route', state.routes)
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
        console.log('后台返回资源列表数据Data', res)
        const routerTree = createRouterTree(!res.data ? [] : res.data)
        console.log('根据资源列表生成的树', routerTree)
        let accessedRoutes = createRouter(routerTree)
        console.log('根据树生成的routeConfig', accessedRoutes)
        // accessedRoutes = accessedRoutes.concat(asyncRoutes)
        // 我在做两步，第一步
        // 先做那个子路由跳转，导航栏不更新
        accessedRoutes = accessedRoutes.concat(asyncRoutes)
        console.log('最终', accessedRoutes)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    })
  }
}

// 资源树都是管理员构建好的，具有一定逻辑的
// 默认不管是
// 默认后台所有菜单资源都是显示的，不显示的不要加，所以hidden无效,显示不显示只看你是什么类型，resourceType是1就显示，不然就是按钮，默认不显示
// 默认只有菜单跟按钮之称，后台不做api鉴权
// 默认懂这个url的都是懂计算机的，然后自己以正确的方式填写，如果乱写，就维护不了,默认管理员在增加菜单的时候心中已经构建好这个树了，按照一定的规则，然后填写菜单资源
// 默认查看资源，如果是菜单，就放在左侧栏，如果是按钮就当成hidden
// 默认按钮不是菜单，而且按钮下面不能有菜单子集（默认按钮后面不能加按钮）
// 默认一些菜单资源不能删除，只能修改
// 默认菜单里面的url是正确的，最外层父亲菜单节点是/开头，子菜单节点没有
// 默认一旦有这个资源就包含他的父资源，子资源不成立
// 默认父级菜单要用layout包裹,
// 默认code忽略，不然就认为是按钮权限的标识
// 如果是最外层的菜单有子菜单，那么就是说他的component等于#，如果没有，那么就是说他的compoent为具体值，后台自动包装一个一个layout
// 默认在左侧菜单上你只是一个按钮，那么你的compont一定不是#，你不能最外层父亲菜单没有子菜单节点，还变成#
// 默认你parentId=0,你的path一定是以/开头
// 默认按钮不会和菜单同级
// 默认按钮资源一定是在菜单下的孩子，且按钮资源是最后一级
// 默认资源菜单跟按钮权限是对应的,你这个资源对应组件有需要按钮权限的，一般资源后面也会加上按钮资源
// 默认最多三级菜单
// 默认parentId = 0说明是最上面一层的菜单，#说明下面有很多的子菜单，非#号说明下面都是按钮权限，换句话说你资源有很多的子菜单，他的compoent一定是#
// 这个是将数据库里面的所有资源信息列表都返回，默认如果有这个节点，一定有他的父亲节点
// 角色权限赋予时，父亲资源自动被选中，如果不是最底层的菜单，然后就把的儿子资源也选中，菜单资源不一定要按钮资源
// 资源表的leaf只对菜单有效

// 我做错了一件事，有些按钮或者a标签也好，我都当成操作，反正不能在菜单栏中显示，
// 不管是操作会跳转路由也好，还是说不跳转，那么这些就需要判断要不要增加路由
// 我的提议是操作不路由跳转的 resourceType是2，操作路由跳转的，resourceType是3
// 操作资源必须是在菜单资源下面。
// 资源是非菜单资源，并且不会发生路由跳转的，我已经做好了，resourcetype是2
// 菜单是非菜单资源，并且会发生路由跳转的，必须要构建子路由，然后如果他还有子路由就要一级一级的创建下去
// 菜单是非菜单资源，并且会发生路由跳转的，下面不能是菜单资源。

// 从后台获取的菜单资源默认都是显示的，非菜单资源默认在菜单资源的下面，并且不显示在菜单栏目
// 对于数据库resourceType的定义
// 我把菜单资源分为1，
// 非菜单资源，不引发路由跳转的分为2
// 非菜单资源引发路由内跳转的分为3
// 非菜单资源引发路由外跳转的分为4
// 菜单不显示，你就没有办法点击，那么隐藏的菜单资源就没有意义了
// 不如把他转化成某一个菜单资源下的非菜单资源，路由对象还是可以创建的，比如类型3跟4

// 1下面可以有1,2,3,4。1一旦下面是1，那么就不能包括其他选项。2下面不能有任何资源。3,4下面可以有2,3,4
// 所有的path路径都是/开头的，管它是什么资源
// 先把后端的数据列表他弄成树
// 类型三这种路由不适合权限按钮的路由界面的，因为此时路由已经刷新，节点变了
function createRouterTree(routerList) {
  console.log('routerList', routerList)
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
    // 如果是 parentId = 0，节点一定是菜单，所以这里不判断
    // parentId = 0说明是最上面一层的菜单资源，#说明下面有很多的子菜单，非#号说明下面都是按钮权限
    // 菜单不能跟按钮同级
    route.component = viewLoad(item.component) 
    if (item.children && item.children[0].resourceType === 1) {
      // 如果有孩子，并且孩子节点也是菜单的话
      route.children = createRouter(Array.from(item.children))
    } else if (item.children && item.children[0].resourceType !== 1) {
      // 如果有孩子，并且孩子节点是按钮权限的话
      // 由于菜单不能跟按钮同级，一个按钮资源，那么就是全部按钮资源，但是按钮资源分两种
      route.meta.btnPermission = createBtnPermission(item.children)
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
function createBtnPermission(children) {
  const permossionBtnList = children.map((item, index, arr) => {
    // 我有孩子，并且我的部分孩子是不是隐藏的
    // 数据的code当成权限名称吧，不是的话在改
    return item.btnPermissionValue
  })
  return permossionBtnList
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
