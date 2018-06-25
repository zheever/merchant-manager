// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import App from './App'
import Router from 'vue-router'
import Axios from 'axios'
import store from './store'

Vue.prototype.$http = Axios

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Router)

async function valid () {
  try {
    if (!store.state.adminInfo.id) {
      await store.dispatch('getAdminData')
      console.log(store.state.adminInfo.id)
      return store.state.adminInfo.id
    } else {
      return true
    }
  } catch (err) {
    return false
  }
}

router.beforeEach(async (to, from, next) => {
  // 权限校验
  if (to.fullPath === '/' || to.fullPath === '/register') {
    next()
    return
  }
  let validValue = await valid()
  if (validValue) {
    next()
  } else {
    router.replace('/')
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
