<template>
  <div>
    <p class="f30 mb20">Button 按钮</p>
    <p class="mb10">常用的操作按钮。</p><br/>
    <div>
      <span class="f14 wb">基础按钮：</span>&ensp;
      <dj-button>默认按钮</dj-button>&ensp;
      <dj-button type="primary" >主要按钮</dj-button>&ensp;
      <dj-button type="success" >成功按钮</dj-button>&ensp;
      <dj-button type="info" >信息按钮</dj-button>&ensp;
      <dj-button type="warning" >警告按钮</dj-button>&ensp;
      <dj-button type="danger" >危险按钮</dj-button>&ensp;
    </div>
    <br>
    <div>
      <span class="f14 wb">圆角按钮：</span>&ensp;
      <dj-button round>默认按钮</dj-button>&ensp;
      <dj-button type="primary" round>主要按钮</dj-button>&ensp;
      <dj-button type="success" round>成功按钮</dj-button>&ensp;
      <dj-button type="info" round>信息按钮</dj-button>&ensp;
      <dj-button type="warning" round>警告按钮</dj-button>&ensp;
      <dj-button type="danger" round>危险按钮</dj-button>&ensp;
    </div>
    <br>
    <div>
      <span class="f14 wb">朴素按钮：</span>&ensp;
      <dj-button plain>默认按钮</dj-button>&ensp;
      <dj-button type="primary" plain>主要按钮</dj-button>&ensp;
      <dj-button type="success" plain>成功按钮</dj-button>&ensp;
      <dj-button type="info" plain>信息按钮</dj-button>&ensp;
      <dj-button type="warning" plain>警告按钮</dj-button>&ensp;
      <dj-button type="danger" plain>危险按钮</dj-button>&ensp;
    </div>
    <br>
    <div>
      <span class="f14 wb">禁用按钮：</span>&ensp;
      <dj-button disabled>默认按钮</dj-button>&ensp;
      <dj-button type="primary" disabled>主要按钮</dj-button>&ensp;
      <dj-button type="success" disabled>成功按钮</dj-button>&ensp;
      <dj-button type="info" disabled>信息按钮</dj-button>&ensp;
      <dj-button type="warning" disabled>警告按钮</dj-button>&ensp;
      <dj-button type="danger" disabled>危险按钮</dj-button>&ensp;
    </div>
    <br>
    <div>
      <span class="f14 wb">图标按钮：</span>&ensp;
      <dj-button icon="signout">默认icon</dj-button>&ensp;
      <dj-button type="primary" icon="user1" right>右侧icon</dj-button>&ensp;
      <dj-button type="success" icon="back-step" round></dj-button>&ensp;
      <dj-button type="info" icon="copy1" round></dj-button>&ensp;
      <dj-button type="warning" icon="check" circle plain></dj-button>&ensp;
      <dj-button type="danger" icon="close" square></dj-button>
    </div>
    <br>
    <div>
      <span class="f14 wb">文字按钮：</span>&ensp;
      <dj-button  type="text" >文字按钮</dj-button>&ensp;
      <dj-button type="text" disabled>文字禁用</dj-button>&ensp;
    </div>
    <br>
    <div>
      <span class="f14 wb">警告按钮：</span>&ensp;
      <dj-button error>警告按钮</dj-button>
    </div>
    <br>
    <div>
      <span class="f14 wb">自定义样式：</span>&ensp;
      <dj-button :colors="['#fff','#7979FF','#7979FF']" :hovers="['#fff','#333','#333']">基础按钮</dj-button>&ensp;
      <dj-button :colors="['#fff','#7979FF','#7979FF']" round>圆角按钮</dj-button>&ensp;
      <dj-button :colors="['#7979FF','#fff','#7979FF']" plain>朴素按钮</dj-button>&ensp;
      <dj-button type="text" :colors="['#7979FF']">文字按钮</dj-button>&ensp;
      <dj-button :colors="['#fff','#7979FF','#7979FF']" disabled>禁用按钮</dj-button>&ensp;
      <dj-button :colors="['#7979FF','#fff','#7979FF']" icon="search2" circle plain></dj-button>&ensp;
      <dj-button :colors="['#fff','#7979FF','#7979FF']" icon="search2" square></dj-button>
    </div>
    <br>
    <!-- <p class=" f30 mb20 mt20">文档示例</p> -->
    <div class="markdown-body">
        <doc></doc>
    </div>
  </div>
</template>

<script>
import doc from '../../docs/button.md';
export default {
  components: {
    doc
  },
  created(){
    setInterval(() => {
      this.loading = !this.loading;
    }, 2000);
  }
};
</script>
