<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item to="/specificationsSKU"><i class="el-icon-lx-news"></i> SKU规格</el-breadcrumb-item>
        <el-breadcrumb-item>{{data === '' ? '新增' : '编辑'}}</el-breadcrumb-item>
      </el-breadcrumb>

    </div>
    <div class="container">
      <el-form ref="addFrom" :rules="rules" :model="addFrom" label-width="80px">
        <el-form-item label="商品sku" prop="sku">
          <el-select v-model="addFrom.sku_id" filterable  placeholder="请搜索商品sku">
            <el-option
              v-for="item in tableDataSku"
              :key="item.id"
              :label="item.id+':'+item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格名称" prop="spec">
          <el-select v-model="addFrom.spec_id" filterable  placeholder="请搜索规格名称">
            <el-option
              v-for="item in tableDataSpec"
              :key="item.id"
              :label="item.goods+':'+item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格值" prop="option">
          <el-select v-model="addFrom.option_id" filterable  placeholder="请搜索规格值">
            <el-option
              v-for="item in tableDataOption"
              :key="item.id"
              :label="item.spec+':'+item.value"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <div>
          <el-button class="editor-btn" type="primary" @click="submitForm()">保存</el-button>
          <el-button class="editor-btn" @click="goBack()">返回上一页</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {getSkus,getGoodsSpecification,getSpecificationOption,getAddSkuSpecification} from '../../../api/index'
  export default {
    name: 'editor',
    data: function(){
      return {
        query: {
          ordering:'-create_time'
        },
        addFrom:{},
        tableDataSku:[],
        tableDataSpec:[],
        tableDataOption:[],
        data:{},
        rules: {
          sku:[
            { required: true, message: '请输入商品', trigger: 'blur' },
          ],
          spec: [
            { required: true, message: '请输入规格名称', trigger: 'blur' },
          ],
          option: [
            { required: true, message: '请输入规格名称', trigger: 'blur' },
          ],
        }
      }
    },
    created(){
      this.getData()
      this.data = JSON.parse(this.$route.query.data)
      console.log(this.data)
      if(this.data !== ''){
        this.addFrom = this.data

      }else{
        this.addFrom = {}
      }
    },
    activated(){
      this.getData()
      this.data = JSON.parse(this.$route.query.data)
      if(this.data !== ''){
        this.addFrom = this.data
      }else{
        this.addFrom = {}
      }
    },
    methods: {
      getData(){
        getSkus(this.query).then(res => {
          console.log(res);
          this.tableDataSku = res.data.results
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
        getGoodsSpecification(this.query).then(res => {
          console.log(res);
          this.tableDataSpec = res.data.results
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
        getSpecificationOption(this.query).then(res => {
          console.log(res);
          this.tableDataOption = res.data.results
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
        getAddSkuSpecification(this.addFrom).then(res=>{
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

      submitForm(){
        console.log(this.addFrom)
        if(this.addFrom.name === ''){
          this.$message.error('SPU规格不能为空')
          return
        }
        if(this.data === ''){
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
