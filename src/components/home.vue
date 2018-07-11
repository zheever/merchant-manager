<template>
  <el-row class='container'>
    <el-col class='bar'>
      <aside>
        <div class='title'><i class="el-icon-menu"></i> 商家管理</div>
        <el-menu class='menu' :default-active="$route.path" @open="handleopen" @close="handleclose" @select="handleselect" unique-opened router>
          <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
            <el-submenu :index="index+''" :key="index" v-if="!item.leaf">
              <template slot="title"><i :class="item.iconCls"></i><span class="menu_item_title">{{item.name}}</span></template>
              <el-menu-item :index="child.path" v-for="(child,index) in item.children" :key="index" v-if="!child.hidden">{{child.name}}</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </aside>
    </el-col>
    <el-col class='data-container'>
      <section>
        <el-row class='header'>
          <el-breadcrumb separator="/" class="breadcrumb-inner">
            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path"><span class="white_text">{{ item.name }}</span></el-breadcrumb-item>
          </el-breadcrumb>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link userinfo-inner">
              <span class='user-name'>{{this.$store.state.adminInfo.user_name}}</span>
              <img class='head-img' :src="this.sysUserAvatar" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="toDeclarePage">说明</el-dropdown-item>
              <el-dropdown-item @click.native="toSettingPage">设置</el-dropdown-item>
              <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
        <div class='loading_layer'></div>
        <el-row class="content-wrapper">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-row>
      </section>
    </el-col>
  </el-row>
</template>

<script>
import {logOff} from '@/api/getData'
export default{
  data () {
    return {
      sysUserName: 'zhe',
      sysUserAvatar: '/static/head.jpg'
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    handleopen () {
      // console.log('handleopen');
    },
    handleclose () {
      // console.log('handleclose');
    },
    handleselect: function (a, b) {
    },
    // 退出登录
    logout: function () {
      var _this = this
      _this.$confirm('确认退出吗?', '提示', {
      // type: 'warning'
      }).then(async () => {
        this.$store.state.adminInfo = {
          avatar: 'default.jpg'
        }
        await logOff()
        this.$router.push('/')
      }).catch((err) => {
        console.log('log off error')
        console.log(err)
      })
    },
    toSettingPage: function () {
      this.$router.push('/manager')
    },
    toDeclarePage: function () {
      this.$router.push('/definite_declare')
    }
  }
}
</script>
<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
}
.menu_item_title {
  font-size: 15px;
}
.el-submenu {
  text-align: left;
}
.el-menu-item {
  color: #606266;
  font-size: 13px;
  min-width: 140px;
}
.bar {
  height: 100%;
  border-right: solid 1px #e6e6e6;
  width: 180px;
}
.title {
  width: 100%;
  height: 60px;
  line-height: 60px;
  font-size: 17px;
  background-color: #666666;
  color: white;
}
.data-container {
  height: 100%;
  overflow-y: scroll;
  flex: 1;
  position: relative;
}
.header {
  height: 60px;
  background-color: #666666;
}
.loading_layer {
  width: 100%;
  height: 100%;
  position: absolute;
}
.white_text {
  color: white;
}
.el-submenu__title {
  color: white;
}
.userinfo-inner {
  float: right;
  margin-top: 13px;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
.el-menu {
  margin-top: 10px;
}
.head-img {
  width: 35px;
  height: 35px;
  border-radius: 10%;
  margin: 0 30px 0 20px;
}
.el-dropdown {
  float: right;
}
.userinfo-inner {
  color: white;
  display: flex;
  align-items: center;
}
.breadcrumb-inner {
  float: left;
  line-height: 60px;
  margin-left: 20px;
}
.breadcrumb-navigation {
  background-color: white;
  padding: 20px;
  .breadcrumb-title {
    float: left;
    font-size: 14px;
  }
  .breadcrumb-inner {
    float: right;
  }
}
.content-wrapper {
  padding: 40px 20px 20px 20px;
}
.el-menu {
  border-right: none;
}
</style>
