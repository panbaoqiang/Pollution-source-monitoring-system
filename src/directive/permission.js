import Vue from 'vue'
const hasPermission = Vue.directive('hasPermission', {
  bind: function(el, binding, vnode) {
    const permission = vnode.context.$route.meta.permission
    // 没有这个权限
    if (!permission || permission.indexOf(binding.value) === -1) {
      el.style.visibility = 'hidden'
    }
  } })

// 权限检查方法
export { hasPermission }
