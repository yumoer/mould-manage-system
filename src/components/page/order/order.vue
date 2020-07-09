<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-s-claim"></i> 订单
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
        <el-table-column prop="order_id" label="订单号" align="center"></el-table-column>
        <el-table-column prop="address" label="收货地址" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.address.province}}{{scope.row.address.city}}{{scope.row.address.district}}{{scope.row.address.place}}</div>
          </template>
        </el-table-column>
        <el-table-column label="下单用户" align="center" width="80">
          <template slot-scope="scope">
            <div>{{scope.row.user.username}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="收货电话" align="center" width="110">
          <template slot-scope="scope">
            <div>{{scope.row.address.mobile}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="订单金额" align="center" width="80">
          <template slot-scope="scope">
            <div>{{scope.row.total_amount}}</div>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" align="center" width="80">
          <template slot-scope="scope">
            <div v-if="scope.row.status === 1">待支付</div>
            <div v-if="scope.row.status === 2">待发货</div>
            <div v-if="scope.row.status === 3">待收货</div>
            <div v-if="scope.row.status === 4">待评价</div>
            <div v-if="scope.row.status === 5">已完成</div>
            <div v-if="scope.row.status === 6">已取消</div>
          </template>
        </el-table-column>
        <el-table-column label="支付方式" align="center" width="80">
          <template slot-scope="scope">
            <div v-if="scope.row.pay_method === 1">货到付款</div>
            <div v-if="scope.row.pay_method === 2">支付宝</div>
            <div v-if="scope.row.pay_method === 3">国库集中支付</div>
            <div v-if="scope.row.pay_method === 4">支票</div>
            <div v-if="scope.row.pay_method === 5">微信支付</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="100">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-lx-attention"
              @click="handleLookOrder(scope.$index, scope.row)"
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
  import { getOrderInfo } from '../../../api/index';
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
        getOrderInfo(this.query).then(res => {
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

      // 查看订单
      handleLookOrder(index, row) {
        console.log(index, row)
        this.$router.push({name:'orderDetails',query:{data:JSON.stringify(row)}})
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
