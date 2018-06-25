<template>
  <el-card class="login_card">
    <el-form :model="loginForm" label-width="65px" :rules="login_rule" ref="loginForm">
      <el-form-item prop="username" label="用户名">
          <el-input v-model="loginForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
          <el-input type="password" v-model="loginForm.password" placeholder="密码"><span>dsfsf</span></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
        <el-button type="primary" @click="to_register">去注册</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {mapActions, mapState} from 'vuex'
// import Axios from 'axios'
import md5 from 'js-md5'
import {login} from '@/api/getData'
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      login_rule: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      showLogin: false
    }
  },
  mounted: async function () {
    if (!this.adminInfo.id) {
      let result = await this.getAdminData()
      if (result) {
        this.showLogin = true
      }
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  methods: {
    ...mapActions(['getAdminData']),
    to_register () {
      this.$router.push('register')
    },
    async submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await login({username: this.loginForm.username, password: md5(this.loginForm.password)})
          console.log(res)
          if (res.data.status === 1) {
            this.$message({
              type: 'success',
              message: '登录成功'
            })
            this.$router.push('DataManage')
          } else {
            this.$message({
              type: 'error',
              message: res.data.message
            })
          }
        } else {
          this.$notify.error({
            title: '错误',
            message: '请输入正确的用户名密码',
            offset: 100
          })
          return false
        }
      })
    }
  },
  watch: {
    adminInfo: function (newValue) {
      if (newValue.id) {
        this.showLogin = false
        this.$message({
          type: 'success',
          message: '检测到您之前登录过，将自动登录'
        })
        this.$router.push('dish')
      }
    }
  }
}
</script>

<style lang="scss">
.login_card {
  width: 500px;
  margin: 0 auto 0 auto;
}
</style>
