<template>
    <div id="">
      基础用法
      <dj-button @click="open" hollow> 默认</dj-button>
      不同状态
      <dj-button @click="open" hollow> 默认</dj-button>
      <dj-button type="success" @click="open1" hollow>成功</dj-button>
      <dj-button type="warning" @click="open3" hollow>警告</dj-button>
      <dj-button type="danger" @click="open4" hollow>危险</dj-button>


      自定义内容
    </div>
</template>

<script >
export default {
  data(){
    return {
    };
  },
  created(){
  },
  methods: {
    open(){
      this.$message(`这是一条默认的信息！${new Date() % 100}`);
    },
    open1(){
      this.$message({
        message: '这是一条成功的信息!',
        type: 'success'
      });
    },
    open3(){
      this.$message({
        message: '这是一条警告信息!',
        type: 'warning'
      });
    },
    open4(){
      this.$message({
        message: '这是一条危险的信息!',
        type: 'error'
      });
    }
  }
};
</script>
