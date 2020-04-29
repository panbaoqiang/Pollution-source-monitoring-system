import Vue from 'vue'
const has = Vue.directive('has', {
  bind: function(el, binding, vnode) {
    const btnPermission = vnode.context.$route.meta.btnPermission
    // 没有这个权限
    if (!btnPermission || btnPermission.indexOf(binding.value) === -1) {
      el.style.visibility = 'hidden'
    }
  } })

// 权限检查方法
export { has }
