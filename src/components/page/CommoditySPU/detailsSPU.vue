<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item to="/CommoditySPU"><i class="el-icon-lx-copy"></i> 商品SPU</el-breadcrumb-item>
        <el-breadcrumb-item>{{data === '' ? '新增' : '编辑'}}</el-breadcrumb-item>
      </el-breadcrumb>

    </div>
    <div class="container">
      <el-form ref="addFrom" :rules="rules" :model="addFrom" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addFrom.name" style="width: 215px" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="品牌" prop="brand">
          <el-select v-model="addFrom.brand" filterable  placeholder="请搜索品牌">
            <el-option
              v-for="item in brand"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="一级类别" prop="category1_id">
          <el-select v-model="addFrom.category1_id" filterable  placeholder="请搜索一级类别" @change="onChange1">
            <el-option
              v-for="item in category1"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级类别" prop="category2_id">
          <el-select v-model="addFrom.category2_id" filterable  placeholder="请搜索二级类别" @change="onChange2">
            <el-option
              v-for="item in category2"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级类别" prop="category3_id">
          <el-select v-model="addFrom.category3_id" filterable  placeholder="请搜索三级类别" @change="onChange3">
            <el-option
              v-for="item in category3"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="销量">
          <el-input v-model="addFrom.sales" style="width: 215px" placeholder="请输入销量"></el-input>
        </el-form-item>
        <el-form-item label="评价数">
          <el-input v-model="addFrom.comments" style="width: 215px" placeholder="请输入评价数"></el-input>
        </el-form-item>
        <el-form-item label="详细介绍" prop="desc_detail">
          <quill-editor ref="myTextEditor"
                        v-model="addFrom.desc_detail"
                        :option="editorOption"
                        @change="onEditorChange($event)">
          </quill-editor>
        </el-form-item>
        <el-form-item label="包装信息" prop="desc_pack">
          <quill-editor ref="myTextEditor"
                        v-model="addFrom.desc_pack"
                        :option="editorOption"
                        @change="onEditorChange($event)">
          </quill-editor>
        </el-form-item>
        <el-form-item label="售后服务" prop="desc_service">
          <el-input
            type="textarea"
            placeholder="请输入售后服务"
            :autosize="{ minRows: 4, maxRows: 4}"
            v-model="addFrom.desc_service">
          </el-input>
        </el-form-item>
        <el-form-item label="	常见问题" prop="desc_problem">
          <quill-editor ref="myTextEditor"
                        v-model="addFrom.desc_problem"
                        :option="editorOption"
                        @change="onEditorChange($event)">
          </quill-editor>
        </el-form-item>
        <el-form-item label="包装清单" placeholder="请输入包装清单" prop="desc_ware">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 4}"
            placeholder="请输入包装清单"
            v-model="addFrom.desc_ware">
          </el-input>
        </el-form-item>
      </el-form>
      <el-form style="position: fixed;right:100px;bottom: 20px;z-index: 1">
        <el-form-item >
          <el-button class="editor-btn" type="primary" @click="submitForm()">{{data !== ''?'修改':'保存'}}</el-button>
          <el-button class="editor-btn" @click="goBack()">返回上一页</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {getGoodsBrand,getSgoodsCategory,getSpusCategory2,getSpusCategory3,getAddSpus,getEditSpus} from '../../../api/index'
  export default {
    name: 'editor',
    data: function(){
      return {
        query: {
          ordering:'-create_time'
        },
        addFrom:{},
        data:{},
        brand: [],
        category1:[],
        category2:[],
        category3:[],
        editorOption: {
          placeholder: 'Hello World',
          modules: {
            ImageExtend: {
              // 如果不作设置，即{}  则依然开启复制粘贴功能且以base64插入
              name: "file", // 图片参数名
              size: 3, // 可选参数 图片大小，单位为M，1M = 1024kb
              action: "/api/admin/sys-file/uploadImg", // 服务器地址, 如果action为空，则采用base64插入图片
              // response 为一个函数用来获取服务器返回的具体图片地址
              // 例如服务器返回{code: 200; data:{ url: 'baidu.com'}}
              // 则 return res.data.url
              response: res => {
                return res.data;
              },
              headers: xhr => {
                // 上传图片请求需要携带token的 在xhr.setRequestHeader中设置
                xhr.setRequestHeader(
                  "Authorization",
                  this.getCookie("username")
                    ? this.getCookie("username").token_type +
                    this.getCookie("username").access_token
                    : "Basic emh4eTp6aHh5"
                );
              }, // 可选参数 设置请求头部
              sizeError: () => {}, // 图片超过大小的回调
              start: () => {}, // 可选参数 自定义开始上传触发事件
              end: () => {}, // 可选参数 自定义上传结束触发的事件，无论成功或者失败
              error: () => {}, // 可选参数 上传失败触发的事件
              success: () => {}, // 可选参数  上传成功触发的事件
              change: (xhr, formData) => {
                // xhr.setRequestHeader('myHeader','myValue')
                // formData.append('token', 'myToken')
              } // 可选参数 每次选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
            },

            toolbar: {
              // 如果不上传图片到服务器，此处不必配置
              container: [
                ["bold", "italic", "underline", "strike"], // toggled buttons
                ["blockquote", "code-block"],

                [{ header: 1 }, { header: 2 }], // custom button values
                [{ list: "ordered" }, { list: "bullet" }],
                [{ script: "sub" }, { script: "super" }], // superscript/subscript
                [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
                [{ direction: "rtl" }], // text direction

                [{ size: ["small", false, "large", "huge"] }], // custom dropdown
                [{ header: [1, 2, 3, 4, 5, 6, false] }],

                [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                [{ font: [] }],
                [{ align: [] }],
                ["image"] //去除video即可
              ], // container为工具栏，此次引入了全部工具栏，也可自行配置
              handlers: {
                image: function() {
                  // 劫持原来的图片点击按钮事件
                  QuillWatch.emit(this.quill.id);
                }
              }
            }
          }
        },
        rules: {
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          brand: [
            { required: true, message: '请选择品牌', trigger: 'blur' }
          ],
          category1_id: [
            { required: true, message: '请选择一级分类', trigger: 'blur' }
          ],
          category2_id: [
            { required: true, message: '请选择二级分类', trigger: 'blur' }
          ],
          category3_id: [
            { required: true, message: '请选择三级分类', trigger: 'blur' }
          ],
          desc_detail: [
            { required: true, message: '请选择详细介绍', trigger: 'blur' }
          ],
          desc_pack: [
            { required: true, message: '请填写包装信息', trigger: 'blur' }
          ],
          desc_service: [
            { required: true, message: '请填写售后服务', trigger: 'blur' }
          ],
          desc_problem: [
            { required: true, message: '请填写常见问题', trigger: 'blur' }
          ],
          desc_ware: [
            { required: true, message: '请填写包装清单', trigger: 'blur' }
          ],
        }
      }
    },
    created(){
      this.getGoodsBrand()
      this.getSgoodsCategory()
      this.data = JSON.parse(this.$route.query.data)
      console.log(this.data)
      if(this.data !== ''){
        this.addFrom = this.data

      }else{
        this.addFrom = {}
      }
    },
    activated(){
      this.getGoodsBrand()
      this.getSgoodsCategory()
      this.data = JSON.parse(this.$route.query.data)
      if(this.data !== ''){
        this.addFrom = this.data
      }else{
        this.addFrom = {}
      }
    },
    methods: {
      onEditorChange({ editor, html, text }) {
        this.content = html;
      },
      getGoodsBrand(){
        getGoodsBrand(this.query).then(res => {
          console.log(res);
          this.brand = res.data
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
      getSgoodsCategory(){
        getSgoodsCategory(this.query).then(res => {
          console.log(res);
          this.category1 = res.data
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
      onChange1(id){
        console.log(id)
        // this.addFrom.category1_id = id
        this.getSpusCategory2(id)
      },

      onChange2(id){
        console.log(id)
        // this.addFrom.category2_id = id
        this.getSpusCategory3(id)
      },

      onChange3(id){
        // this.addFrom.category3_id = id
      },

      getSpusCategory2(id){
        getSpusCategory2(id).then(res=>{
          console.log(res)
          this.category2 = res.data
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

      getSpusCategory3(id){
        getSpusCategory3(id).then(res=>{
          console.log(res)
          this.category3 = res.data
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
        getAddSpus(this.addFrom).then(res=>{
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
        getEditSpus(this.addFrom).then(res=>{
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
          this.$message.error('商品SPU名称不能为空')
          return
        }
        if(this.addFrom.brand === ''){
          this.$message.error('品牌不能为空')
          return
        }
        if(this.addFrom.category1_id === ''){
          this.$message.error('一级分类不能为空')
          return
        }
        if(this.addFrom.category2_id === ''){
          this.$message.error('二级分类不能为空')
          return
        }
        if(this.addFrom.category3_id === ''){
          this.$message.error('三级分类不能为空')
          return
        }
        if(this.addFrom.desc_detail === ''){
          this.$message.error('详细介绍不能为空')
          return
        }
        if(this.addFrom.desc_pack === ''){
          this.$message.error('包装信息不能为空')
          return
        }

        if(this.addFrom.desc_service === ''){
          this.$message.error('售后服务不能为空')
          return
        }
        if(this.addFrom.desc_problem === ''){
          this.$message.error('常见问题不能为空')
          return
        }

        if(this.addFrom.desc_ware === ''){
          this.$message.error('包装清单不能为空')
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
