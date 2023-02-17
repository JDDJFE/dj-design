<template>
  <div>
    <h2>span 栅格占据的列数</h2>
    <dj-row>
      <dj-col :span="24"><div class="grid-content">col-24</div></dj-col>
    </dj-row>
    <dj-row>
      <dj-col :span="8"><div class="grid-content">col-8</div></dj-col>
      <dj-col :span="16"><div class="grid-content">col-16</div></dj-col>
    </dj-row>
    <br>
    <h2>gutter 栅格间隔</h2>
    <dj-row :gutter="20">
      <dj-col :span="8"><div class="grid-content">col-8</div></dj-col>
      <dj-col :span="8"><div class="grid-content">col-8</div></dj-col>
      <dj-col :span="8"><div class="grid-content">col-8</div></dj-col>
    </dj-row>
    <br>
    <h2>offset 左侧间隔格数</h2>
    <dj-row :gutter="20">
      <dj-col :span="8"><div class="grid-content">col-8</div></dj-col>
      <dj-col :span="8" :offset="8"><div class="grid-content">col-8</div></dj-col>
      <dj-col :span="8" :offset="8"><div class="grid-content">col-8</div></dj-col>
    </dj-row>
    <br>
    <h2>push 向右移动格数 pull 向左移动格数</h2>
    <dj-row :gutter="20">
      <dj-col :span="18" :push="6"><div class="grid-content">col-18</div></dj-col>
      <dj-col :span="6" :pull="18"><div class="grid-content">col-6</div></dj-col>
    </dj-row>
    <br>
    <h2>justify 对齐方式</h2>
    <div class="row-background">
      <dj-row type="flex" justify="center">
        <dj-col :span="6"><div class="grid-content">col-6</div></dj-col>
        <dj-col :span="6"><div class="grid-content">col-6</div></dj-col>
        <dj-col :span="6"><div class="grid-content">col-6</div></dj-col>
      </dj-row>
      <dj-row type="flex" justify="flex-start">
        <dj-col :span="6"><div class="grid-content">col-6</div></dj-col>
        <dj-col :span="6"><div class="grid-content">col-6</div></dj-col>
        <dj-col :span="6"><div class="grid-content">col-6</div></dj-col>
      </dj-row>
      <dj-row type="flex" justify="flex-end">
        <dj-col :span="6"><div class="grid-content">col-6</div></dj-col>
        <dj-col :span="6"><div class="grid-content">col-6</div></dj-col>
        <dj-col :span="6"><div class="grid-content">col-6</div></dj-col>
      </dj-row>
      <dj-row type="flex" justify="space-between">
        <dj-col :span="6"><div class="grid-content">col-6</div></dj-col>
        <dj-col :span="6"><div class="grid-content">col-6</div></dj-col>
        <dj-col :span="6"><div class="grid-content">col-6</div></dj-col>
      </dj-row>
      <dj-row type="flex" justify="space-around">
        <dj-col :span="6"><div class="grid-content">col-6</div></dj-col>
        <dj-col :span="6"><div class="grid-content">col-6</div></dj-col>
        <dj-col :span="6"><div class="grid-content">col-6</div></dj-col>
      </dj-row>
    </div>
    <br>
    <h2>align 对齐方式</h2>
    <div class="row-background">
      <dj-row :gutter="20" type="flex" align="flex-start">
        <dj-col :span="8"><div class="grid-content" style="height:50px">col-8</div></dj-col>
        <dj-col :span="8"><div class="grid-content" style="height:90px">col-8</div></dj-col>
        <dj-col :span="8"><div class="grid-content" style="height:60px">col-8</div></dj-col>
      </dj-row>
    </div>
    <div class="row-background">
      <dj-row :gutter="20" type="flex" align="flex-end">
        <dj-col :span="8"><div class="grid-content" style="height:50px">col-8</div></dj-col>
        <dj-col :span="8"><div class="grid-content" style="height:90px">col-8</div></dj-col>
        <dj-col :span="8"><div class="grid-content" style="height:60px">col-8</div></dj-col>
      </dj-row>
    </div>
    <div class="row-background">
      <dj-row :gutter="20" type="flex" align="center">
        <dj-col :span="8"><div class="grid-content" style="height:50px">col-8</div></dj-col>
        <dj-col :span="8"><div class="grid-content" style="height:90px">col-8</div></dj-col>
        <dj-col :span="8"><div class="grid-content" style="height:60px">col-8</div></dj-col>
      </dj-row>
    </div>
    <br>
    <h2>排序</h2>
    <dj-row>
      <dj-col :span="8" :order="2"><div class="grid-content">1 - col-8 / order-2</div></dj-col>
      <dj-col :span="16" :order="1"><div class="grid-content">2 - col-16 / order-1</div></dj-col>
    </dj-row>
    <br>
    <h2>响应式布局</h2>
    <dj-row :gutter="10">
      <dj-col :xs="8" :sm="6" :md="4" :lg="3"><div class="grid-content">col</div></dj-col>
      <dj-col :xs="4" :sm="6" :md="8" :lg="9"><div class="grid-content">col</div></dj-col>
      <dj-col :xs="4" :sm="6" :md="8" :lg="9"><div class="grid-content">col</div></dj-col>
      <dj-col :xs="8" :sm="6" :md="4" :lg="3"><div class="grid-content">col</div></dj-col>
    </dj-row>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="less">
.row-background{
  background: rgba(128, 128, 128, 0.08);
  padding:0 5px;
  .dj-row{
    padding: 15px 0;
  }
}
.dj-row{
  margin: 5px;
  .grid-content{
    padding: 16px 0;
    color:#fff;
    text-align: center;
  }
  & .dj-col:nth-child(even) .grid-content{
    background: #0092ff;
  }
  & .dj-col:nth-child(odd) .grid-content{
    background: rgba(0,146,255,.75);
  }
}
</style>
