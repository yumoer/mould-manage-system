<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item to="/order"><i class="el-icon-s-claim"></i> 订单</el-breadcrumb-item>
        <el-breadcrumb-item>查看</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-form ref="addFrom" :model="addFrom" label-width="70px">
        <el-form-item label="订单">
          <el-input v-model="addFrom.order_id"></el-input>
        </el-form-item>
        <el-form-item label="收货地址">
          <el-input v-model="addFrom.address.province+''+addFrom.address.city+''+addFrom.address.district+''+addFrom.address.place"></el-input>
        </el-form-item>
        <el-form-item label="下单用户">
          <el-input v-model="addFrom.user.username"></el-input>
        </el-form-item>
        <el-form-item label="收货电话">
          <el-input v-model="addFrom.address.mobile"></el-input>
        </el-form-item>
        <el-form-item label="订单金额">
          <el-input v-model="addFrom.total_amount"></el-input>
        </el-form-item>

        <el-form-item label="订单状态">
          <el-input v-if="addFrom.status === 1" v-model="addFrom.status === 1?'待支付':''"></el-input>
          <el-input v-if="addFrom.status === 2" v-model="addFrom.status === 2?'待发货':''"></el-input>
          <el-input v-if="addFrom.status === 3" v-model="addFrom.status === 3?'待收货':''"></el-input>
          <el-input v-if="addFrom.status === 4" v-model="addFrom.status === 4?'待评价':''"></el-input>
          <el-input v-if="addFrom.status === 5" v-model="addFrom.status === 5?'已完成':''"></el-input>
          <el-input v-if="addFrom.status === 6" v-model="addFrom.status === 6?'已取消':''"></el-input>
        </el-form-item>
        <el-form-item label="支付方式">
          <el-input v-if="addFrom.pay_method === 1" v-model="addFrom.pay_method === 1?'货到付款':''"></el-input>
          <el-input v-if="addFrom.pay_method === 2" v-model="addFrom.pay_method === 2?'支付宝':''"></el-input>
          <el-input v-if="addFrom.pay_method === 3" v-model="addFrom.pay_method === 3?'国库集中支付':''"></el-input>
          <el-input v-if="addFrom.pay_method === 4" v-model="addFrom.pay_method === 4?'支票':''"></el-input>
          <el-input v-if="addFrom.pay_method === 5" v-model="addFrom.pay_method === 5?'微信支付':''"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="addFrom.remark"></el-input>
        </el-form-item>
        <el-button class="editor-btn" @click="goBack()">返回上一页</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
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
