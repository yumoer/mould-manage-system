<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item to="/pictureSKU"><i class="el-icon-lx-pic"></i> SKU图片</el-breadcrumb-item>
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
        <el-form-item label="图片" prop="spec">
          <span>图片上传最多5张，修改图片时请删除之前所有图片重新上传</span>
          <div>
            <el-upload
              action="#"
              :limit="5"
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
              <img width="100%" v-if="addFrom.image1 !== null" :src="addFrom.image1" alt="">
              <img width="100%" v-if="addFrom.image2 !== null" :src="addFrom.image2" alt="">
              <img width="100%" v-if="addFrom.image3 !== null" :src="addFrom.image3" alt="">
              <img width="100%" v-if="addFrom.image4 !== null" :src="addFrom.image4" alt="">
              <img width="100%" v-if="addFrom.image5 !== null" :src="addFrom.image5" alt="">
            </el-dialog>
          </div>
        </el-form-item>
        <div>
          <el-button class="editor-btn" type="primary" @click="submitForm">{{data!==''?'修改':'保存'}}</el-button>
          <el-button class="editor-btn" @click="goBack">返回上一页</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {getSkus,getAddSkuImage,getEditSkuImage} from '../../../api/index'
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
        dialogVisible: false,
        fileList:[],
        Headers: {
          Authorization: 'JWT ' + JSON.parse(localStorage.getItem('ms_userInfo')).data.token,
        },
        image1:null,
        image2:null,
        image3:null,
        image4:null,
        image5:null,
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
        this.fileList = [{url:this.addFrom.image1},{url:this.addFrom.image2},{url:this.addFrom.image3},{url:this.addFrom.image4},{url:this.addFrom.image5}]
      }else{
        this.addFrom = {}
        this.fileList = []
      }
    },
    activated(){
      this.fileList = []
      this.getData()
      this.data = JSON.parse(this.$route.query.data)
      if(this.data !== ''){
        this.addFrom = this.data
        this.fileList = [{url:this.addFrom.image1},{url:this.addFrom.image2},{url:this.addFrom.image3},{url:this.addFrom.image4},{url:this.addFrom.image5}]
        console.log(this.fileList)
      }else{
        this.addFrom = {}
        this.fileList = []
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
                this.$message.error('请重新上传全部图片')
                break
            }
          }
        });
      },

      handleChange(file,fileList){
        console.log(file,fileList)
        this.image1 = fileList[0].raw;
        this.image2 = fileList[1].raw;
        this.image3 = fileList[2].raw;
        this.image4 = fileList[3].raw;
        this.image5 = fileList[4].raw;
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.fileList.splice(index, 1);
      },

      handlePictureCardPreview(file) {
        this.addFrom.image1 = file.url;
        this.dialogVisible = true;
      },

      getAdd(){
        if(this.addFrom.sku_id === undefined){
          this.$message.error('商品sku不能为空')
          return
        }
        if(this.addFrom.image1 === null){
          this.$message.error('图片不能为空')
          return
        }
        //  表单提交方式
        let FormDatas = new FormData()
        FormDatas.append('sku_id',this.addFrom.sku_id)
        FormDatas.append('image1',this.image1 === null ? '' : this.image1)
        FormDatas.append('image2',this.image2 === null ? '' : this.image2)
        FormDatas.append('image3',this.image3 === null ? '' : this.image3)
        FormDatas.append('image4',this.image4 === null ? '' : this.image4)
        FormDatas.append('image5',this.image5 === null ? '' : this.image5)
        console.log(FormDatas)

        let that = this
        axios({
          method:'post',
          url:that.api,   //  二次接口
          headers:that.Headers,
          data:FormDatas
        }).then(res=>{
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
        if(this.addFrom.sku_id === undefined){
          this.$message.error('商品sku不能为空')
          return
        }
        if(this.addFrom.image1 === null){
          this.$message.error('请重新上传图片')
          return
        }
        //  表单提交方式
        let FormDatas = new FormData()
        FormDatas.append('sku_id',this.addFrom.sku_id)
        FormDatas.append('image1',this.image1 === null ? '' : this.image1)
        FormDatas.append('image2',this.image2 === null ? '' : this.image2)
        FormDatas.append('image3',this.image3 === null ? '' : this.image3)
        FormDatas.append('image4',this.image4 === null ? '' : this.image4)
        FormDatas.append('image5',this.image5 === null ? '' : this.image5)
        console.log(FormDatas)
        let that = this
        axios({
          method:'put',
          url:that.url,   //  二次接口
          headers:that.Headers,
          data:FormDatas
        }).then(res=>{
          console.log(res,res.status)
          if(res.status === 200){
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

      submitForm(file){
        console.log(file)
        console.log(this.addFrom)
        if(this.data === ''){
          this.api='http://47.94.106.106:8000/partner/sku/image/'+this.addFrom.sku_id+'/sku/'
          this.getAdd()
        }else{
          this.url='http://47.94.106.106:8000/partner/sku/image/'+this.addFrom.id+'/'
          this.getEdit()
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
