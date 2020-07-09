<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-read"></i> 广告内容
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="el-icon-lx-add" @click="handleAdd(tableData)">增加广告内容</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column prop="id" label="ID" width="80px" align="center"></el-table-column>
        <el-table-column prop="name" label="广告名称" align="center"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-lx-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.page"
          :page-size="query.page_size"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import { getContent,getDeleteContent} from '../../../api/index';
  export default {
    name: 'basetable',
    data() {
      return {
        query: {
          page: 1,
          page_size: 10,
          ordering:'-create_time'
        },
        addFrom:{},
        tableData: [],
        pageTotal: 0,
      };
    },

    created(){
      this.getData();
    },

    activated(){
      this.getData();
    },
    methods: {
      // 获取 easy-mock 的模拟数据
      getData() {
        getContent(this.query).then(res => {
          console.log(res);
          if(res.status === 200 || res.status === 201){
            this.tableData = res.data.results
            this.pageTotal = res.data.count
          }
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
          }else{
            console.log('error')
            this.$message.error('登录过期，请重新登录')
          }
        });
      },


      // 新增操作
      handleAdd(){
        this.addFrom={}
        this.$router.push({name:'adsDetails',query:{data:JSON.stringify('')}})
      },

      // 编辑操作
      handleEdit(index, row){
        this.$router.push({name:'adsDetails',query:{data:JSON.stringify(row)}})
      },



      // 删除操作
      handleDelete(index, row) {
        // 二次确认删除
        this.$confirm('确定要删除吗？', '提示', {
          type: 'warning'
        })
          .then(() => {
            getDeleteContent(row).then(res=>{
              this.tableData.splice(index, 1);
              this.$message.success('删除成功');
              this.getData();
            })
          })
          .catch(() => {});
      },


      // 分页导航
      handlePageChange(val) {
        this.$set(this.query, 'page', val);
        this.getData();
      }
    }
  };
</script>

<style scoped>
  .table {
    width: 100%;
    font-size: 14px;
  }
  .handle-box {
    margin-bottom: 20px;
  }
  .red {
    color: #ff0000;
  }
</style>








