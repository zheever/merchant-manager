import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
// import Dish from '@/components/dish'
import Indent from '@/components/Indent'
import AddGoods from '@/components/addGoods'
import ReduceGood from '@/components/reduceGood'
import Manager from '@/components/manager'
import Declare from '@/components/declare'
import DishCard from '@/components/dish_card'
import register from '@/components/register'
import Login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/DataManage',
      name: '数据管理',
      redirect: '/dish',
      component: Home,
      iconCls: 'el-icon-document',
      children: [
        { path: '/dish', component: DishCard, name: '食品列表' },
        { path: '/indent', component: Indent, name: '订单列表' }
      ]
    },
    {
      path: '/addData',
      name: '增删数据',
      component: Home,
      iconCls: 'el-icon-tickets',
      children: [
        { path: '/addGoods', component: AddGoods, name: '添加商品' },
        { path: '/reduceGood', component: ReduceGood, name: '删除商品' }
      ]
    },
    {
      path: '/set',
      name: '设置',
      component: Home,
      iconCls: 'el-icon-setting',
      children: [
        { path: '/manager', component: Manager, name: '管理员设置' }
      ]
    },
    {
      path: '/declare',
      name: '说明',
      component: Home,
      iconCls: 'el-icon-message',
      children: [
        { path: '/definite_declare', component: Declare, name: '具体说明' }
      ]
    },
    {
      path: '/register',
      name: '注册',
      hidden: true,
      component: register
    },
    {
      path: '/',
      name: '登录',
      hidden: true,
      component: Login
    }
  ]
})
