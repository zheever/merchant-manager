<template>
  <div class='indent_container'>
    <el-table
    :data="tableData5"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="时间">
            <span>{{ props.row.time }}</span>
          </el-form-item>
          <el-form-item label="客户">
            <span>{{ props.row.client }}</span>
          </el-form-item>
          <el-form-item label="商品">
            <span>{{ props.row.dishs }}</span>
          </el-form-item>
          <el-form-item label="金额">
            <span>{{ props.row.price }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="时间" prop="time"></el-table-column>
    <el-table-column label="客户" prop="client"></el-table-column>
    <el-table-column label="商品" prop="dishs"></el-table-column>
    <el-table-column label="金额" prop="price"></el-table-column>
  </el-table>
  <el-pagination
      background
      layout="prev, pager, next"
       :total="tableData5.length" class="page_navigator">
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
export default {
  data () {
    return {
      tableData5: [{
        time: '2018-5-20 21:00',
        price: 19,
        client: 'zhe',
        dishs: '好滋好味鸡蛋仔, 可乐, 汉堡'
      }, {
        time: '2018-5-20 21:00',
        price: 19,
        client: 'zhe',
        dishs: '好滋好味鸡蛋仔, 可乐, 汉堡'
      }, {
        time: '2018-5-20 21:00',
        price: 19,
        client: 'zhe',
        dishs: '好滋好味鸡蛋仔, 可乐, 汉堡'
      }, {
        time: '2018-5-20 21:00',
        price: 19,
        client: 'zhe',
        dishs: '好滋好味鸡蛋仔, 可乐, 汉堡'
      }]
    }
  }
}
</script>
