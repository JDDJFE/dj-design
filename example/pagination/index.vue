<template>
    <div>
      <p class=" f30 mb20">Pagination 分页</p>
      <p class="mb10">当数据量过多时，使用分页分解数据。</p><br/>
      <dj-pagination
        :total="total"
        :pageSize="10"
        :currentPage.sync="currentPage"
        :pageSizes="[10,20,30,5]"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></dj-pagination>
      <br/>
      <dj-pagination
        border
        :total="300"
        :pageSize="10"
        :currentPage="1"
        :pageSizes="[10,20,30,5]"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></dj-pagination>
      <br/>
      <dj-pagination
        border
        :total="40300"
        :pageSize="10"
        :currentPage="1"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></dj-pagination>
      <br/>
      <dj-pagination
        border
        :total="300"
        :pageSize="10"
        :currentPage="1"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></dj-pagination>
      <br />
      <dj-pagination
        border
        :total="300"
        :pageSize="10"
        :currentPage="1"
        size="small"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></dj-pagination>
      <br />
      <dj-pagination
        :total="total"
        :pageSize="10"
        :currentPage.sync="currentPage"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></dj-pagination>
      <br />
      <dj-pagination
        :total="total"
        :pageSize="10"
        size="small"
        :currentPage.sync="currentPage"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></dj-pagination>
      <div class="markdown-body">
        <doc></doc>
      </div>
    </div>
</template>

<script >
import doc from '../../docs/pagination.md';
export default {
  components: {
    doc
  },
  data(){
    return {
      currentPage: 1,
      total: 30
    };
  },
  methods: {
    handleSizeChange(val){
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val, size){
      console.log(`当前页: ${val}`,`每页 ${size} 条`);
    }
  }
};
</script>
<style scoped>

</style>
