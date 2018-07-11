<template>
  <div class="reduce_good_container">
  <el-table
    :data="pageData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="center" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="所属店铺">
            <span>{{ props.row.shop }}</span>
          </el-form-item>
          <el-form-item label="商品 ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{ props.row.shopId }}</span>
          </el-form-item>
          <el-form-item label="商品分类">
            <span>{{ props.row.category }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ props.row.address }}</span>
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
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      background
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
       :total="tableData.length" class="page_navigator">
    </el-pagination>
  </div>
</template>

<style>
  .reduce_good_container {
    border: 1px solid #e6e6e6;
    padding: 10px;
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
  .page_navigator {
    margin-top: 30px;
  }
  .cell {
    display: flex;
    justify-content: center;
  }
</style>
<script>
import { Loading } from 'element-ui'
import {getMenu, deleteFood} from '@/api/getData'
export default {
  data () {
    return {
      tableData: [],
      pageData: []
    }
  },
  created: function () {
    this.getGoods()
  },
  methods: {
    async getGoods () {
      var self = this
      let loadingInstance = Loading.service({fullscreen: true, target: document.querySelector('.loading_layer')})
      try {
        const res = await getMenu()
        self.tableData = res.data
        let end = self.tableData.length > 10 ? 10 : self.tableData.length
        self.pageData = self.tableData.slice(0, end)
        loadingInstance.close()
      } catch (err) {
        console.log(err)
      }
    },
    handleCurrentChange (val) {
      let start = (val - 1) * 10
      let end = start + 10
      if (end > this.tableData.length) {
        end = this.tableData.length - 1
      }
      this.pageData = this.tableData.slice(start, end)
    },
    async handleDelete (index, row) {
      let res = await deleteFood({
        id: row.id
      })
      if (res.data.status === 1) {
        this.$message({
          type: 'success',
          message: '成功删除'
        })
      } else {
        this.$message({
          type: 'error',
          message: '删除失败'
        })
      }
      try {
        const res = await getMenu()
        this.tableData = res.data
        let end = this.tableData.length > 10 ? 10 : this.tableData.length
        this.pageData = this.tableData.slice(0, end)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
