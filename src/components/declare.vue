<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span><strong>说明</strong></span>
    </div>
    <div class='item text'>
      <p>商家后台管理系统</p>
      <p>提供查看食品列表</P>
      <p>订单列表，添加商品</P>
      <p>删除商品，查看管理员等功能</p>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'manager'
}
</script>

<style>
  .text {
    font-size: 16px;
  }
  p {
    text-align: center;
  }

  .item {
    width: 100%;
    margin-bottom: 38px;
    text-align: left;
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
