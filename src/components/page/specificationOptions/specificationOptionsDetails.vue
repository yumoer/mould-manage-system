<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item to="/specificationOptions"><i class="el-icon-lx-vipcard"></i> 规格选项</el-breadcrumb-item>
        <el-breadcrumb-item>{{data === '' ? '新增' : '编辑'}}</el-breadcrumb-item>
      </el-breadcrumb>

    </div>
    <div class="container">
      <el-form ref="addFrom" :rules="rules" :model="addFrom" label-width="80px">
        <el-form-item label="规格" prop="spec">
          <el-select v-model="addFrom.spec_id" filterable  placeholder="请搜索商品">
            <el-option
              v-for="item in tableData"
              :key="item.id"
              :label="item.goods+':'+item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选项值" prop="name">
          <el-input v-model="addFrom.value" style="width: 300px"></el-input>
        </el-form-item>
        <div>
          <el-button class="editor-btn" type="primary" @click="submitForm()">{{data !== ''?'修改':'保存'}}</el-button>
          <el-button class="editor-btn" @click="goBack()">返回上一页</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {getAddSpecificationOption,getEditSpecificationOption,getGoodsSpecification} from '../../../api/index'
  export default {
    name: 'editor',
    data: function(){
      return {
        query: {
          ordering:'-create_time'
        },
        addFrom:{},
        tableData:[],
        data:{},
        rules: {
          spec:[
            { required: true, message: '请选择规格', trigger: 'blur' },
          ],
          value: [
            { required: true, message: '请输入选项值', trigger: 'blur' },
          ],
        }
      }
    },
    created(){
      this.getDate()
      this.data = JSON.parse(this.$route.query.data)
      console.log(this.data)
      if(this.data !== ''){
        this.addFrom = this.data

      }else{
        this.addFrom = {}
      }
    },
    activated(){
      this.getDate()
      this.data = JSON.parse(this.$route.query.data)
      if(this.data !== ''){
        this.addFrom = this.data
      }else{
        this.addFrom = {}
      }
    },
    methods: {
      getDate(){
        getGoodsSpecification(this.query).then(res => {
          console.log(res);
          this.tableData = res.data.results
        }).catch(error=>{
          if (error.response !== undefined) {
            switch (error.response.status) {
              case 500:
                this.$message.error('服务器错误')
                break
              case 401:
                this.$message.error('登录过期，请重新登录')
                localStorage.removeItem('ms_userInfo')
                break
              case 403:
                this.$message.error('您没有执行该操作的权限')
                break
              default:
                this.$message.error('其他错误')
                break
            }
          }
        });
      },


      getAdd(){
        getAddSpecificationOption(this.addFrom).then(res=>{
          console.log(res,res.status)
          if(res.status === 201){
            this.$message.success('保存成功')
            this.$router.go(-1)
          }
        }).catch(error=>{
          if (error.response !== undefined) {
            switch (error.response.status) {
              case 500:
                this.$message.error('服务器错误')
                break
              case 401:
                this.$message.error('登录过期，请重新登录')
                localStorage.removeItem('ms_userInfo')
                break
              case 403:
                this.$message.error('您没有执行该操作的权限')
                break
              default:
                this.$message.error('其他错误')
                break
            }
          }
        })
      },

      getEdit(){
        getEditSpecificationOption(this.addFrom).then(res=>{
          console.log(res,res.status)
          if(res.status === 200){
            this.$message.success('修改成功')
            this.$router.go(-1)
          }
        }).catch(error=>{
          if (error.response !== undefined) {
            switch (error.response.status) {
              case 500:
                this.$message.error('服务器错误')
                break
              case 401:
                this.$message.error('登录过期，请重新登录')
                localStorage.removeItem('ms_userInfo')
                break
              case 403:
                this.$message.error('您没有执行该操作的权限')
                break
              default:
                this.$message.error('其他错误')
                break
            }
          }
        })
      },

      submitForm(){
        console.log(this.addFrom)
        if(this.addFrom.name === ''){
          this.$message.error('SPU规格不能为空')
          return
        }

        if(this.data !== ''){
          this.getEdit()
        }else{
          this.getAdd()
        }
      },
      goBack() {
        this.$router.go(-1)
      }
    }
  }
</script>
<style scoped>
  page{
    position: relative;
  }
  .editor-btn{
    margin-top: 20px;
  }
</style>
