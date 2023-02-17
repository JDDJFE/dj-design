<template>
    <div id="dj-headers">
        <div class="cont">
            <img src="@/assets/logo.png" width="50px" height="50px" alt="">
            <span>DJWEB-UI</span>
        </div>
    </div>
</template>
<script>
export default {
  components: {}
};
</script>
<style lang="less" scoped>
#dj-headers{
    /*display: none;*/
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  border-bottom: 1px solid #cccccc;
  background: #fff;
  overflow: hidden;
  z-index: 50;
  .cont{
    width: 1300px;
    margin:0 auto;
    background: #fff;
    overflow: hidden;
    display: flex;
    margin-top: 10px;
  }
  img{
    margin-right: 15px;
  }
  span{
    margin-top: 5px;
    font-weight: 600;
    font-size: 28px;
  }
}
</style>
