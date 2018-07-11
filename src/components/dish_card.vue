<template>
  <div class='dish_container'>
    <template v-for="(dish, index) in tableData5">
      <div class='dish_detail_container' :key="index">
        <el-card :body-style="{ padding: '0' }">
          <img :src="dish.src" class="image">
          <div style="padding: 14px;" class="info_box">
            <p>{{ dish.name }}</p>
            <p>id：{{ dish.id }}</p>
            <p>类别：{{ dish.categorys }}</p>
            <p>价格: {{ dish.price }}</p>
            <p class="detail_text">详情: {{ dish.detail }}</p>
          </div>
        </el-card>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
.dish_container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.dish_detail_container {
  margin: 10px;
  width: 350px;
  .image {
    float: left;
    width: 150px;
    height: 150px;
    margin: 10px;
  }
  .info_box {
    float: left;
    text-align: left;
    .detail_text {
      height: 60px;
      line-height: 25px;
    }
    p {
      text-align: left;
      width: 140px;
      height: 20px;
      overflow: hidden;
    }
  }
}
</style>
<script>
import { Loading } from 'element-ui'
import { getMenu } from '@/api/getData'
export default {
  data () {
    return {
      tableData5: []
    }
  },
  created: function () {
    this.getGoods()
  },
  methods: {
    async getGoods () {
      var self = this
      let loadingInstance = Loading.service({fullscreen: true, target: document.querySelector('.loading_layer')})
      let res = await getMenu()
      self.tableData5 = res.data
      loadingInstance.close()
    }
  }
}
</script>
