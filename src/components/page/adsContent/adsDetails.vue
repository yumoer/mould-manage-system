<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item to="/adsContent"><i class="el-icon-lx-read"></i> 广告内容</el-breadcrumb-item>
        <el-breadcrumb-item>{{data === '' ? '新增' : '编辑'}}</el-breadcrumb-item>
      </el-breadcrumb>

    </div>
    <div class="container">
      <el-form ref="addFrom" :rules="rules" :model="addFrom" label-width="80px">
        <el-form-item label="广告名称" prop="name">
          <el-input v-model="addFrom.name" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="image">
          <span>图片上传最多1张，修改图片时请删除之前图片重新上传</span>
          <el-upload
            action="#"
            :limit="1"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            accept=".jpg, .jpeg, .png"
            :file-list="fileList"
            :auto-upload="false"
            :on-change="handleChange"
            :before-upload="submitForm">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" v-if="addFrom.image !== null" :src="addFrom.image" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="官网地址" prop="url">
          <el-input v-model="addFrom.url" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="手机地址" prop="mobile_url">
          <el-input v-model="addFrom.mobile_url" style="width: 300px"></el-input>
        </el-form-item>

        <el-form-item label="分组" prop="group">
          <el-select v-model="addFrom.group" placeholder="请选择分组">
            <el-option label="首页大图" :value="0"></el-option>
            <el-option label="一层广告" :value="1"></el-option>
            <el-option label="module1" :value="2"></el-option>
            <el-option label="module2" :value="3"></el-option>
            <el-option label="module3" :value="4"></el-option>
            <el-option label="module4" :value="5"></el-option>
            <el-option label="台头广告" :value="6"></el-option>
            <el-option label="标题" :value="7"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="sequence">
          <el-input v-model="addFrom.sequence" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="广告价格" prop="sku_price">
          <el-input v-model="addFrom.sku_price" style="width: 300px"></el-input>
        </el-form-item>
        <div style="margin-left: 100px">
          <el-button class="editor-btn" type="primary" @click="submitForm()">{{data !== ''?'修改':'保存'}}</el-button>
          <el-button class="editor-btn" @click="goBack()">返回上一页</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {getSpus,getAddSkus,getEditSkus} from '../../../api/index'
  import axios from 'axios'
  export default {
    data: function(){
      return {
        query: {
          ordering:'-create_time'
        },
        url:'',
        api:'',
        fileList:[],
        dialogVisible:false,
        tableData:[],
        addFrom:{},
        Headers: {
          Authorization: 'JWT ' + JSON.parse(localStorage.getItem('ms_userInfo')).data.token,
        },
        data:{},
        rules: {
          name: [
            { required: true, message: '请输入广告名称', trigger: 'blur' },
          ],
          url: [
            { required: true, message: '请输入官网地址', trigger: 'blur' }
          ],
          mobile_url: [
            { required: true, message: '请选择手机地址', trigger: 'blur' }
          ],
          sequence: [
            { required: true, message: '请输入排序', trigger: 'blur' }
          ],
          sku_price: [
            { required: true, message: '请输入广告价格', trigger: 'blur' }
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
        this.fileList = [{url:this.addFrom.image}]

      }else{
        this.addFrom = {}
        this.fileList = []
      }
    },
    activated(){
      this.getData()
      this.data = JSON.parse(this.$route.query.data)
      if(this.data !== ''){
        this.addFrom = this.data
        this.fileList = [{url:this.addFrom.image}]
        console.log(this.fileList)
      }else{
        this.addFrom = {}
        this.fileList = []
      }
    },
    methods: {
      getData(){
        getSpus(this.query).then(res => {
          console.log(res);
          this.tableData = res.data.results;
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

      handleChange(file, fileList){
        console.log(file, fileList)
        this.addFrom.image = URL.createObjectURL(file.raw);
        this.addFrom.file = file.raw
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.fileList = [];
      },

      handlePictureCardPreview(file) {
        this.addFrom.image1 = file.url;
        this.dialogVisible = true;
      },

      submitAdd() {
        if(this.addFrom.name === undefined){
          this.$message.error('广告名称不能为空')
          return
        }
        if(this.addFrom.file === undefined){
          this.$message.error('图片不能为空')
          return
        }
        if(this.addFrom.url === undefined){
          this.$message.error('官网地址不能为空')
          return
        }
        if(this.addFrom.mobile_url === undefined){
          this.$message.error('手机地址不能为空')
          return
        }
        if(this.addFrom.group === undefined){
          this.$message.error('分组不能为空')
          return
        }
        if(this.addFrom.sequence === undefined){
          this.$message.error('排序不能为空')
          return
        }
        if(this.addFrom.sku_price === undefined){
          this.$message.error('广告价格不能为空')
          return
        }
        this.addFrom.sku_name = this.addFrom.name
        //  表单提交方式
        let FormDatas = new FormData()
        FormDatas.append('file',this.addFrom.file)
        FormDatas.append('image',this.addFrom.image)
        FormDatas.append('name',this.addFrom.name)
        FormDatas.append('url',this.addFrom.url)
        FormDatas.append('mobile_url',this.addFrom.mobile_url)
        FormDatas.append('group',this.addFrom.group)
        FormDatas.append('sequence',this.addFrom.sequence)
        FormDatas.append('sku_name',this.addFrom.sku_name)
        FormDatas.append('sku_price',this.addFrom.sku_price)
        console.log(FormDatas)
        let that = this
        axios({
          method:'post',
          url:that.api,   //  二次接口
          headers:that.Headers,
          data:FormDatas
        }).then(res=>{
          console.log(res)
          if(res.status===201){
            this.$message.success('新增成功')
            this.$router.go(-1)
          }
        }).catch(error=>{
          console.log(error.response.status)
          if(error.response.status === 400){
            console.log(error.response.data.parent_id[0])
          }
        })
      },

      submitEdit(){
        if(this.addFrom.name === undefined){
          this.$message.error('广告名称不能为空')
          return
        }
        if(this.addFrom.file === undefined){
          this.$message.error('请重新上传图片')
          return
        }
        if(this.addFrom.url === undefined){
          this.$message.error('官网地址不能为空')
          return
        }
        if(this.addFrom.mobile_url === undefined){
          this.$message.error('手机地址不能为空')
          return
        }
        if(this.addFrom.group === undefined){
          this.$message.error('分组不能为空')
          return
        }
        if(this.addFrom.sequence === undefined){
          this.$message.error('排序不能为空')
          return
        }
        if(this.addFrom.sku_price === undefined){
          this.$message.error('广告价格不能为空')
          return
        }
        //  表单提交方式
        let FormDatas = new FormData()
        FormDatas.append('file',this.addFrom.file)
        FormDatas.append('image',this.addFrom.image)
        FormDatas.append('name',this.addFrom.name)
        FormDatas.append('url',this.addFrom.url)
        FormDatas.append('mobile_url',this.addFrom.mobile_url)
        FormDatas.append('group',this.addFrom.group)
        FormDatas.append('sequence',this.addFrom.sequence)
        FormDatas.append('sku_name',this.addFrom.sku_name)
        FormDatas.append('sku_price',this.addFrom.sku_price)
        console.log(FormDatas)
        let that = this
        axios({
          method:'post',
          url:that.url,   //  二次接口
          headers:that.Headers,
          data:FormDatas
        }).then(res=>{
          console.log(res)
          if(res.status===200){
            this.$message.success('修改成功')
            this.$router.go(-1)
          }
        }).catch(error=>{
          console.log(error.response.status)
          if(error.response.status === 400){
            console.log()
            this.$message.error(error.response.data.parent_id[0])
          }
        })
      },

      submitForm(){
        console.log(this.addFrom)
        if(this.data !== ''){
          this.url = 'http://47.94.106.106:8000/partner/content/'+this.data.id+'/details/'
          this.submitEdit()
        }else{
          this.api = 'http://47.94.106.106:8000/partner/content/'
          this.submitAdd()
        }
      },
      goBack() {
        this.$router.go(-1)
      }
    }
  }
</script>
<style scoped>
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
    display: block;
  }
</style>
