<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item to="/classify"><i class="el-icon-lx-apps"></i> 分类</el-breadcrumb-item>
        <el-breadcrumb-item>{{data === '' ? '新增' : '编辑'}}</el-breadcrumb-item>
      </el-breadcrumb>

    </div>
    <div class="container">
      <el-form ref="addFrom" :rules="rules" :model="addFrom" label-width="80px">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="addFrom.name" style="width: 300px;"></el-input>
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
            <img width="100%" :src="addFrom.image" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="父类别" prop="parent_id">
          <el-select v-model="addFrom.parent_id" filterable  placeholder="请搜索父类别" @change="onChange">
            <el-option
              v-for="item in tableData"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <div style="margin-left: 100px">
          <el-button class="editor-btn" type="primary" @click="submitForm">{{data !== ''?'修改':'保存'}}</el-button>
          <el-button class="editor-btn" @click="goBack()">返回上一页</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {getGoodsCategory} from '../../../api/index'
  import axios from 'axios'
  export default {
    name: 'editor',
    data: function(){
      return {
        query: {
          ordering:'-create_time'
        },
        url:'',
        api:'',
        fileList:[],
        dialogVisible:false,
        Headers: {
          Authorization: 'JWT ' + JSON.parse(localStorage.getItem('ms_userInfo')).data.token,
        },
        tableData:[],
        addFrom:{},
        data:{},
        rules: {
          name: [
            { required: true, message: '请输入分类名称', trigger: 'blur' },
          ],
          image: [
            { required: true, message: '请上传图片', trigger: 'blur' }
          ],
          parent_id: [
            { required: true, message: '请选择父类别', trigger: 'blur' }
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
      }else{
        this.addFrom = {}
        this.fileList = []
      }
    },
    methods: {
      getData(){
        getGoodsCategory(this.query).then(res => {
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

      handleChange(file){
        this.addFrom.image = URL.createObjectURL(file.raw);
        this.addFrom.file = file.raw;
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.fileList = [];
      },

      handlePictureCardPreview(file) {
        this.addFrom.image1 = file.url;
        this.dialogVisible = true;
      },

      onChange(id){
        console.log(id)
        this.addFrom.parent_id = id
      },

      submitAdd() {
        console.log(this.addFrom)
        if(this.addFrom.name === ''){
          this.$message.error('分类名称不能为空')
          return
        }
        if(this.addFrom.file === undefined){
          this.$message.error('图片不能为空')
          return
        }
        //  表单提交方式
        let FormDatas = new FormData()
        FormDatas.append('file',this.addFrom.file)
        FormDatas.append('image',this.addFrom.image)
        FormDatas.append('name',this.addFrom.name)
        FormDatas.append('parent_id',this.addFrom.parent_id === undefined?'':this.addFrom.parent_id)
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
        console.log(this.addFrom)
        if(this.addFrom.name === ''){
          this.$message.error('分类名称不能为空')
          return
        }
        if(this.addFrom.file === undefined){
          this.$message.error('请重新上传图片')
          return
        }
        //  表单提交方式
        let FormDatas = new FormData()
        FormDatas.append('file',this.addFrom.file)
        FormDatas.append('name',this.addFrom.name)  //其他参数
        FormDatas.append('parent_id',this.addFrom.parent_id === null?'':this.addFrom.parent_id)
        FormDatas.append('image',this.addFrom.image)
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
            console.log(error.response.data.parent_id[0])
          }
        })
      },


      submitForm(){
        if(this.data !== ''){
          this.url = 'http://47.94.106.106:8000/partner/goods/category/'+this.data.id+'/details/'
          this.submitEdit()
        }else{
          this.api = 'http://47.94.106.106:8000/partner/goods/category/'
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
