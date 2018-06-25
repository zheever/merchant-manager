<template>
  <el-card class="register_card">
    <el-form :model="registerForm" :rules="register_rule" ref="registerForm"  label-width="65px">
      <el-form-item prop="username" label="用户名">
          <el-input v-model="registerForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
          <el-input type="password" v-model="registerForm.password" placeholder="密码"><span>dsfsf</span></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('registerForm')" class="submit_btn">注册</el-button>
        <el-button type="primary" @click="to_login">去登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import md5 from 'js-md5'
export default {
  name: 'register',
  data () {
    return {
      registerForm: {
        username: '',
        password: ''
      },
      register_rule: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    to_login () {
      this.$router.push('login')
    },
    async register  (params) {
      let responseMess = {}
      await this.$http({
        method: 'post',
        url: 'http://localhost:3001/register',
        params: {
          username: this.registerForm.username,
          password: md5(this.registerForm.password)
        }
      }).then((res) => {
        responseMess = res.data
        console.log(res)
      })
      return responseMess
    },
    async submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.register({user_name: this.registerForm.username, password: this.registerForm.password})
          if (res.status === 1) {
            this.$message({
              type: 'success',
              message: '注册成功,请登录'
            })
            this.$router.push('manage')
          } else {
            this.$message({
              type: 'error',
              message: res.message
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
  }
}
</script>

<style>
.register_card {
  width: 500px;
  margin: 0 auto 0 auto;
}
</style>
