<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item to="/orderShop"><i class="el-icon-shopping-bag-1"></i> 订单商品</el-breadcrumb-item>
        <el-breadcrumb-item>查看</el-breadcrumb-item>
      </el-breadcrumb>

    </div>
    <div class="container">
      <el-form ref="addFrom" :model="addFrom" label-width="80px">
        <el-form-item label="订单">
          <el-input v-model="addFrom.order"></el-input>
        </el-form-item>
        <el-form-item label="订单商品">
          <el-input v-model="addFrom.sku.name"></el-input>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="addFrom.count"></el-input>
        </el-form-item>
        <el-form-item label="单价">
          <el-input v-model="addFrom.price"></el-input>
        </el-form-item>
        <el-button class="editor-btn" @click="goBack()">返回上一页</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data: function(){
      return {
        query: {
          ordering:'-create_time'
        },

        addFrom:{},
        data:{},
      }
    },
    created(){
      this.data = JSON.parse(this.$route.query.data)
      console.log(this.data)
      if(this.data !== ''){
        this.addFrom = this.data
      }else{
        this.addFrom = {}
      }
    },
    activated(){
      this.data = JSON.parse(this.$route.query.data)
      if(this.data !== ''){
        this.addFrom = this.data
      }else{
        this.addFrom = {}
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      }
    }
  }
</script>
<style scoped>
  .el-input{
    width: 300px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    line-height: 100px;
  }

  .el-upload .el-upload--picture-card{
    display: flex;
    width: 100px;
    height: 100px;
    text-align: center;
    cursor: pointer;
    outline: 0;
  }
</style>
