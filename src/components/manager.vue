<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span><strong>管理员资料</strong></span>
      <el-button style="float: right; padding: 3px 0" type="text">编辑</el-button>
    </div>
    <div class="text item">
      姓名：{{ adminInfo.user_name }}
    </div>
    <div class="text item">
      管理员权限：{{ adminInfo.authority }}
    </div>
    <div class="text item">
      管理员ID：{{ adminInfo.id }}
    </div>
  </el-card>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
    }
  },
  name: 'manager',
  computed: {
    ...mapState(['adminInfo'])
  }
}
</script>

<style>
  .text {
    font-size: 16px;
  }

  .item {
    width: 100%;
    margin-bottom: 38px;
    text-align: centre;
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
  }
</style>
