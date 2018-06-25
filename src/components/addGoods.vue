<template>
  <div>
    <el-col :span="14" :offset='4'>
      <header class="form_category_header">选择食品种类</header>
      <el-form :model="categoryForm" ref="categoryForm" label-width="110px" class="form">
        <el-row class="category_select">
          <el-form-item label="食品种类">
            <el-select v-model="categoryForm.categorySelect" placeholder="请选择" style="width:100%;">
              <el-option v-for="(item, index) in categoryList" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row class="add_category_row" :class="showAddCategory? 'showEdit': ''">
          <div class="add_category">
            <el-form-item label="食品种类" prop="name">
              <el-input v-model="categoryForm.name"></el-input>
            </el-form-item>
            <el-form-item label="种类描述" prop="description">
              <el-input v-model="categoryForm.description"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitcategoryForm('categoryForm')">提交</el-button>
            </el-form-item>
          </div>
       </el-row>
        <div class="add_category_button" @click="addCategoryFun">
          <i class="el-icon-caret-top edit_icon" v-if="showAddCategory"></i>
          <i class="el-icon-caret-bottom edit_icon" v-else slot="icon"></i>
          <span>添加食品种类</span>
        </div>
      </el-form>
      <header class="form_header">添加食品</header>
      <el-form :model="foodForm" :rules="foodrules" ref="foodForm" label-width="110px" class="form food_form">
        <el-form-item label="食品名称" prop="name">
          <el-input v-model="foodForm.name"></el-input>
        </el-form-item>
        <el-form-item label="食品详情" prop="detail">
          <el-input v-model="foodForm.detail"></el-input>
        </el-form-item>
        <el-form-item label="上传食品图片">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:3001/photos/upload"
            :show-file-list="false"
            :on-success="uploadImg"
            :before-upload="beforeImgUpload">
            <img v-if="foodForm.src" :src="foodForm.src" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="价格">
          <el-input-number v-model="foodForm.price" :min="0" :max="10000"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitAddFoodForm('foodForm')">确认添加食品</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
import {getCategory, addFood} from '@/api/getData'
export default {
  data () {
    return {
      categoryList: [],
      categoryForm: {
        categorySelect: '',
        name: '',
        description: ''
      },
      showAddCategory: false,
      foodrules: {
        name: [
          { required: true, message: '请输入食品名称', trigger: 'blur' }
        ]
      },
      foodForm: {
        name: '',
        detail: '',
        src: '',
        price: '',
        categorys: ''
      }
    }
  },
  mounted: async function () {
    try {
      let res = await getCategory()
      console.log(res.data)
      this.categoryList = res.data
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    addCategoryFun () {
      this.showAddCategory = !this.showAddCategory
    },
    uploadImg (res, file) {
      if (res[0].status === 1) {
        this.foodForm.src = res[0].image_path
      } else {
        this.$message.error('上传图片失败！')
      }
    },
    beforeImgUpload (file) {
      const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png')
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isRightType) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isRightType && isLt2M
    },
    async submitAddFoodForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        const res = await addFood({
          name: this.foodForm.name,
          detail: this.foodForm.detail,
          src: this.foodForm.src,
          price: this.foodForm.price,
          categorys: this.categoryForm.categorySelect
        })
        if (res.data.status === 1) {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: '添加失败'
          })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.form_category_header {
  text-align: center;
  margin-bottom: 10px;
}
.form{
  min-width: 400px;
  margin-bottom: 30px;
  &:hover{
    box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
    border-radius: 6px;
    transition: all 400ms;
  }
}
.category_select{
  border: 1px solid #eaeefb;
  padding: 15px 30px 10px 10px;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
}
.add_category_row{
  height: 0;
  overflow: hidden;
  transition: all 400ms;
  background: #f9fafc;
}
.showEdit{
  height: 185px;
}
.add_category_button{
  text-align: center;
  line-height: 40px;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  border: 1px solid #eaeefb;
  border-top: none;
  transition: all 400ms;
  span{
    transition: all 400ms;
  }
  .edit_icon{
    color: #ccc;
    transition: all 400ms;
  }
  &:hover{
    background: #f9fafc;
    span{
      color: #20a0ff;
    }
    .edit_icon{
      color: #20a0ff;
    }
  }
}
.add_category{
  background: #f9fafc;
  padding: 15px 30px 0px 10px;
  border: 1px solid #eaeefb;
  border-top: none;
}
.el-button {
  float: left;
}
.food_form{
  border: 1px solid #eaeefb;
  padding: 10px 10px 0;
}
.form_header{
  text-align: center;
  margin-bottom: 10px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  float: left;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.el-input-number {
  float: left;
}
.el-upload {
  width: 120px;
  height: 120px;
  img {
    width: 120px;
    height: 120px;
  }
}
</style>
