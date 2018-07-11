<template>
  <div class='indent_container'>
    <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="时间">
            <span>{{ props.row.order_time }}</span>
          </el-form-item>
          <el-form-item label="订单id">
            <span>{{ props.row.order_id }}</span>
          </el-form-item>
          <el-form-item label="商品">
            <span>{{ props.row.order_contain }}</span>
          </el-form-item>
          <el-form-item label="总金额">
            <span>{{ props.row.total }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="时间" prop="order_time"></el-table-column>
    <el-table-column label="订单id" prop="order_id"></el-table-column>
    <el-table-column label="商品" prop="order_contain"></el-table-column>
    <el-table-column label="金额" prop="total"></el-table-column>
  </el-table>
  <el-pagination
      background
      layout="prev, pager, next"
       :total="tableData.length" class="page_navigator">
    </el-pagination>
  </div>
</template>

<style>
  .indent_container {
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
</style>
<script>
import {getOrderList} from '@/api/getData'
export default {
  data () {
    return {
      tableData: []
    }
  },
  created: async function () {
    try {
      let res = await getOrderList()
      let end = res.data.length > 10 ? 10 : res.data.length
      let foods_list = [];
      for (let i = 0; i < res.data.length; i ++) {
        let foods = ''
        for (let j = 0; j < res.data[i].order_contain.length; j ++) {
          foods += res.data[i].order_contain[j].name + ' ￥' +  res.data[i].order_contain[j].price + ' X' +  res.data[i].order_contain[j].order_num + ' | '
        }
        console.log(foods)
        foods_list.push(foods)
        res.data[i].order_contain = foods_list
      }
      this.tableData = res.data.slice(0, end)
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    handleCurrentChange (val) {
      let start = (val - 1) * 10
      let end = start + 10
      if (end > this.tableData.length) {
        end = this.tableData.length - 1
      }
      this.pageData = this.tableData.slice(start, end)
    }
  }
}
</script>
