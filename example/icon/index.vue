<template>
    <div>
      <p class="f30 mb20">Icon 图标</p>
      <p class="mb10">提供了一套常用的图标集合，可拓展图标。</p><br/>
      <i class="iconfont more"></i>&ensp;
      <dj-icon icon="signout" fontSize="20px"></dj-icon>&ensp;
      <dj-button type="primary" icon="check">默认按钮</dj-button>
      <dj-icon icon="load1" load loadColor="red" loadW="50px" loadH="50px"></dj-icon>
      <p class=" f24 mb20 mt20">图标合集</p>
      <div class="iconList">
        <div class="lt" v-for="(item, index) in icons" :key="index">
          <dj-icon :icon="item"></dj-icon><br><br>
          <span>{{item}}</span>
        </div>
      </div>
      <p class=" f24 mb20 mt20">图片合集</p>
      <div class="iconList">
        <div class="lt" v-for="(item, index) in image" :key="index">
          <dj-icon :icon="item"></dj-icon><br><br>
          <span>{{item}}</span>
        </div>
      </div>
      <p class=" f24 mb20 mt20">CSS3动图合集</p>
      <div class="iconList">
        <div class="lt">
          <dj-icon icon="load"></dj-icon><br><br>
          <span>load</span>
        </div>
      </div>
      <p class=" f24 mb20 mt20">SVG动图合集</p>
      <div class="iconList">
        <div class="lt">
          <dj-icon icon="load1" load></dj-icon><br><br>
          <span>load1</span>
        </div>
        <div class="lt">
          <dj-icon icon="load2" load></dj-icon><br><br>
          <span>load2</span>
        </div>
        <div class="lt">
          <dj-icon icon="load3" load></dj-icon><br><br>
          <span>load3</span>
        </div>
        <div class="lt">
          <dj-icon icon="load4" load></dj-icon><br><br>
          <span>load4</span>
        </div>
        <div class="lt">
          <dj-icon icon="load5" load></dj-icon><br><br>
          <span>load5</span>
        </div>
        <div class="lt">
          <dj-icon icon="load6" load></dj-icon><br><br>
          <span>load6</span>
        </div>
        <div class="lt">
          <dj-icon icon="load7" load></dj-icon><br><br>
          <span>load7</span>
        </div>
      </div>
      <p class=" f24 mb20 mt20">旧图合集</p>
      <div class="iconList">
        <div class="lt">
            <dj-icon icon="icon-more"></dj-icon><br><br>
            <span>icon-more</span>
        </div>
        <div class="lt">
            <dj-icon icon="icon-RectangleCopy"></dj-icon><br><br>
            <span>icon-RectangleCopy</span>
        </div>
        <div class="lt">
            <dj-icon icon="icon-icon_chexiao"></dj-icon><br><br>
            <span>icon-icon_chexiao</span>
        </div>
        <div class="lt">
            <dj-icon icon="icon-icon_zhongzhi"></dj-icon><br><br>
            <span>icon-icon_zhongzhi</span>
        </div>
        <div class="lt">
            <dj-icon icon="icon-up1"></dj-icon><br><br>
            <span>icon-up1</span>
        </div>
        <div class="lt">
            <dj-icon icon="icon-forward"></dj-icon><br><br>
            <span>icon-forward</span>
        </div>
        <div class="lt">
            <dj-icon icon="icon-down1"></dj-icon><br><br>
            <span>icon-down1</span>
        </div>
        <div class="lt">
            <dj-icon icon="icon-check"></dj-icon><br><br>
            <span>icon-check</span>
        </div>
        <div class="lt">
            <dj-icon icon="icon-add"></dj-icon><br><br>
            <span>icon-add</span>
        </div>
        <div class="lt">
            <dj-icon icon="icon-back"></dj-icon><br><br>
            <span>icon-back</span>
        </div>
        <div class="lt">
            <dj-icon icon="icon-yunhang"></dj-icon><br><br>
            <span>icon-yunhang</span>
        </div>
        <div class="lt">
            <dj-icon icon="icon-guangbo"></dj-icon><br><br>
            <span>icon-guangbo</span>
        </div>
        <div class="lt">
            <dj-icon icon="icon-youhui"></dj-icon><br><br>
            <span>icon-youhui</span>
        </div>
        <div class="lt">
            <dj-icon icon="icon-youhui"></dj-icon><br><br>
            <span>icon-youhui</span>
        </div>
        <div class="lt">
            <dj-icon icon="icon-kefu"></dj-icon><br><br>
            <span>icon-kefu</span>
        </div>
        <div class="lt">
            <dj-icon icon="icon-arrowdown"></dj-icon><br><br>
            <span>icon-arrowdown</span>
        </div>
        <div class="lt">
            <dj-icon icon="icon-arrowleft"></dj-icon><br><br>
            <span>icon-arrowleft</span>
        </div>
        <div class="lt">
            <dj-icon icon="icon-arrowup"></dj-icon><br><br>
            <span>icon-arrowup</span>
        </div>
        <div class="lt">
            <dj-icon icon="icon-arrowright"></dj-icon><br><br>
            <span>icon-arrowright</span>
        </div>
        <div class="lt">
            <dj-icon icon="icon-down"></dj-icon><br><br>
            <span>icon-down</span>
        </div>
        <div class="lt">
            <dj-icon icon="icon-up"></dj-icon><br><br>
            <span>icon-up</span>
        </div>
        <div class="lt">
            <dj-icon icon="icon-left"></dj-icon><br><br>
            <span>icon-left</span>
        </div>
        <div class="lt">
            <dj-icon icon="icon-right"></dj-icon><br><br>
            <span>icon-right</span>
        </div>
        <div class="lt">
            <dj-icon icon="icon-shangyibu"></dj-icon><br><br>
            <span>icon-shangyibu</span>
        </div>
        <div class="lt">
            <dj-icon icon="icon-xiayibu"></dj-icon><br><br>
            <span>icon-xiayibu</span>
        </div>
        <div class="lt">
            <dj-icon icon="icon-icon_zhanghao"></dj-icon><br><br>
            <span>icon-icon_zhanghao</span>
        </div>
        <div class="lt">
            <dj-icon icon="icon-icon_yulan"></dj-icon><br><br>
            <span>icon-icon_yulan</span>
        </div>
        <div class="lt">
            <dj-icon icon="icon-icon_tianjia"></dj-icon><br><br>
            <span>icon-icon_tianjia</span>
        </div>
        <div class="lt">
            <dj-icon icon="icon-icon_loading"></dj-icon><br><br>
            <span>icon-icon_loading</span>
        </div>
        <div class="lt">
            <dj-icon icon="icon-zidingyi"></dj-icon><br><br>
            <span>icon-zidingyi</span>
        </div>
        <div class="lt">
            <dj-icon icon="icon-yingyongguanli"></dj-icon><br><br>
            <span>icon-yingyongguanli</span>
        </div>
        <div class="lt">
            <dj-icon icon="icon-rili"></dj-icon><br><br>
            <span>icon-rili</span>
        </div>
        <div class="lt">
            <dj-icon icon="icon-chazhao"></dj-icon><br><br>
            <span>icon-chazhao</span>
        </div>
      </div>
      <br/>
      <br/>
      <br/>
    </div>
</template>

<script >import '../../packages/icon/src/svg';
// import doc from '../../docs/icon.md';
export default {
  components: {
    // doc
  },
  data() {
    return {
      image: [
        'wushuju','nodata'
      ],
      load: [
        'load1', 'load2', 'load3', 'load4', 'load5', 'load6', 'load7'
      ],
      icons: [
        'tuozhuai','signout', 'user1', 'home', 'sort1', 'sort2', 'sort-up', 'sort-down', 'left-circle', 'bottom-circle', 'right-circle', 'top-circle', 'back1', 'back2', 'next-step', 'back-step', 'discount', 'statistics', 'enclosure', 'copy1', 'garbage', 'link1', 'screen', 'calendar', 'refresh1', 'pourin', 'export', 'check', 'double-bottom', 'double-right', 'double-left', 'double-top', 'more', 'abstract-check', 'frame-check', 'location', 'function', 'search1', 'add', 'close', 'subtract', 'view', 'view-off', 'message', 'message-unread', 'record', 'time', 'order', 'order-unread', 'cart-empty', 'cart', 'search2', 'edit', 'link2', 'share', 'setting', 'upload', 'download', 'play', 'region', 'notification', 'notification-off', 'phonecall', 'phonecall-off', 'lock', 'unlock', 'filter', 'calculator', 'image', 'email', 'copy2', 'user2', 'customer-service', 'sub-account', 'list', 'refresh2', 'close-filled', 'check-solid', 'close-solid', 'check-filled', 'forbidden', 'info-filled', 'info', 'help-filled', 'help', 'caution', 'caution-filled', 'like', 'like-filled', 'star', 'star-filled', 'arrow-top', 'arrow-left', 'arrow-bottom', 'arrow-right', 'solid-left', 'solid-bottom', 'solid-top', 'solid-right', 'turning-left', 'turning-right', 'turning-top', 'turning-bottom'
      ]
    };
  }
};
</script>
<style lang="less" scoped>


</style>
