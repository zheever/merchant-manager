<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span><strong>管理员资料</strong></span>
      <el-button style="float: right; padding: 8px 0;" type="text" @click="ToEidt">编辑</el-button>
    </div>
    <div class="name_container">
      <div class="name_div text item">
        姓名：{{ adminInfo.user_name }}
      </div>
      <el-input class="name_input" v-show="isEdit">
      </el-input>
    </div>
    <div class="text item">
      管理员权限：{{ adminInfo.authority }}
    </div>
    <div class="text item">
      管理员ID：{{ adminInfo.id }}
    </div>
    <div class="submit_button_container">
      <el-button type="primary" style="float: right; margin: 20px px 20px 0" v-show="isEdit" disabled:="!isEdit" @click="changeUsername">提交</el-button>
    </div>
  </el-card>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      isEdit: false
    }
  },
  name: 'manager',
  computed: {
    ...mapState(['adminInfo'])
  },
  methods: {
    ToEidt: function () {
      this.isEdit = !this.isEdit
    },
    changeUsername: function () {

    }
  }
}
</script>

<style>
  .name_container {
    position: relative;
    height: 60px;
    text-align: center;
  }

  .name_div {
    height: 40px;
    position: absolute;
    line-height: 40px;
  }

  .name_input {
    position: absolute;
    margin-left: 10px;
    width: 200px;
  }

  .text {
    font-size: 16px;
  }

  .item {
    width: 100%;
    margin-bottom: 38px;
    text-align: center !important;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 680px;
    margin: 0 auto 0 auto;
    padding-bottom: 20px;
  }

  .submit_button_container {
    width: 100%;
  }
</style>
