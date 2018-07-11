<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span><strong>餐馆资料</strong></span>
    </div>
     <div class="text item">
      姓名：{{ merchantInfo.name }}
    </div>
     <div class="text item">
      地点：{{ merchantInfo.address }}
    </div>
     <div class="text item">
      经营时间：{{ merchantInfo.server_time }}
    </div>
  </el-card>
</template>

<script>
import {getResturantDetail} from '@/api/getData'
export default {
  data () {
    return {
      merchantInfo: {}
    }
  },
  name: 'merchantInfo',
  created: async function () {
    try {
      let res = await getResturantDetail()
      this.merchantInfo = res.data
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
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
