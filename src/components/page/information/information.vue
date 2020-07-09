<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-s-comment"></i> 评论信息
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column label="用户" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.user.username}}</div>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.sku.name}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="order" label="订单" align="center"></el-table-column>
        <el-table-column prop="comment" label="商品评论" align="center"></el-table-column>
        <el-table-column prop="score" label="评分" align="center"></el-table-column>
        <el-table-column prop="avg_score" label="总评分" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-lx-attention"
              @click="handleLook(scope.$index, scope.row)"
            >查看</el-button>
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
  import { getGoodsOrder } from '../../../api/index';
  export default {
    data() {
      return {
        query: {
          page: 1,
          page_size: 10
        },
        addFrom:{},
        tableData: [],
        pageTotal: 0,
      };
    },
    created() {
      this.getData();
    },
    methods: {
      // 获取 easy-mock 的模拟数据
      getData() {
        getGoodsOrder(this.query).then(res => {
          console.log(res);
          this.tableData = res.data.results;
          if(this.tableData.length === 0){
            this.$message.success('数据为空')
          }
          this.pageTotal = res.data.count
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

      // 查看操作
      handleLook(index, row) {
        this.$router.push({name:'informationDetails',query:{data:JSON.stringify(row)}})
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
</style>
