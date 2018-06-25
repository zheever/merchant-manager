<template>
  <div class='dish_container'>
    <el-table
    :data="tableData5"
    style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.categorys }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.detail }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品 ID" prop="id"></el-table-column>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="描述" prop="detail"></el-table-column>
      <el-table-column label="价格" prop="price"></el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
       :total="1000">
    </el-pagination>
  </div>
</template>

<style>
  .dish_container {
    height: 100%;
    overflow-y: auto;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-table th>.cell {
    text-align: center;
  }
  .el-pagination {
    margin: 20px;
  }
</style>
<script>
import {loading} from 'element-ui'
import {getMenu} from '@/api/getData'
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
      try {
        let res = getMenu()
        this.tableData5 = res.data
      } catch (err) {
        console.log(err)
      } 
    }
  }
}
</script>
