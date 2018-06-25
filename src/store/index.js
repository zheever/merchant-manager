import Vue from 'vue'
import Vuex from 'vuex'
import {getUserInfo} from '@/api/getData'
// import dialog_store from '../components/dialog_store.js';//引入某个store对象

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    adminInfo: {
      avatar: 'default.jpg'
    }
  },
  mutations: {
    saveAdminInfo (state, adminInfo) {
      state.adminInfo = adminInfo.data
    }
  },
  actions: {
    async getAdminData ({commit}) {
      try {
        const res = await getUserInfo()
        if (res.data.status === 1) {
          commit('saveAdminInfo', res.data)
          return true
        } else {
          console.log('您尚未登陆或者session失效')
        }
      } catch (err) {
        console.log(err)
        console.log('您尚未登陆或者session失效')
      }
      return false
    }
  },
  getters: {}
})
