<template>
  <transition name="viewer-fade">
    <div ref="dj-image-preview-wrap" class="dj-image-preview-wrap" v-if="showViewer">
      <div class="dj-image-preview-mask" @click.self="handleMaskClick"></div>
      <div class="dj-image-preview-operations">
        <div class="dj-image-preview-operations-operation" @click="close">
          <i class="iconfont close"></i>
        </div>
        <div class="dj-image-preview-operations-operation" @click="handleActions('zoomIn')">
          <i class="iconfont zoom-in"></i>
        </div>
        <div class="dj-image-preview-operations-operation" @click="handleActions('zoomOut')">
          <i class="iconfont zoom-out"></i>
        </div>
        <div class="dj-image-preview-operations-operation" @click="handleActions('rotateRight')">
          <i class="iconfont rotate-right"></i>
        </div>
        <div class="dj-image-preview-operations-operation" @click="handleActions('rotateLeft')">
          <i class="iconfont rotate-left"></i>
        </div>
        <div v-if="downloadStatus" class="dj-image-preview-operations-operation" @click="download">
          <i class="iconfont download"></i>
        </div>
      </div>
      <div v-if="previewSrcList && previewSrcList.length > 1" class="dj-image-preview-switch-left" @click="prev">
        <i class="iconfont arrow-left f30"></i>
      </div>
      <div v-if="previewSrcList && previewSrcList.length > 1" class="dj-image-preview-switch-right" @click="next">
        <i class="iconfont arrow-right f30"></i>
      </div>
      <div class="dj-img-preview-wrapper" :style="wrapperStyle">
        <img :src="currentImg" alt="" :style="imgStyle" :id="tooltipId" @mousedown="handleMouseDown">
      </div>
    </div>
  </transition>
</template>

<script>
let prevOverflow = '';
let mousewheelEventName = 'mousewheel';
if (document.addEventListener) {// firefox
  mousewheelEventName = 'DOMMouseScroll';
} else {
  // window.onmousewheel = document.onmousewheel = this.scrollFun;
  mousewheelEventName = 'onmousewheel';
}
// function rafThrottle(fn) {
//   let locked = false;
//   return function(...args) {
//     if (locked) return;
//     locked = true;
//     window.requestAnimationFrame(_ => {
//       fn.apply(this, args);
//       locked = false;
//     });
//   };
// }
export default {
  name: 'djImagePreview',
  props: {
    previewSrcList: {
      type: Array,
      default: () => []
    },
    initialIndex: {
      type: Number,
      default: 0
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    showViewer: {
      type: Boolean,
      default: true
    },
    // ??????????????????
    downloadStatus: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      appendToBody: true,
      index: this.initialIndex,
      transform: {
        scale: 1,
        deg: 0,
        enableTransition: false,
        offsetX: 0,
        offsetY: 0
      }
    };
  },
  computed: {
    currentImg() {
      return this.previewSrcList[this.index];
    },
    imgStyle() {
      let style = {};
      style.maxWidth = style.maxHeight = '100%';
      style.transform = `scale(${this.transform.scale}) rotate(${this.transform.deg}deg)`;
      style.transition = this.transform.enableTransition ? 'transform .3s' : '';
      style.marginTop = this.transform.offsetY + 'px';
      style.marginLeft = this.transform.offsetX + 'px';
      return style;
    },
    wrapperStyle() {
      let style = {};
      // style.transform = `translate3d(${this.transform.offsetX / 2}px, ${this.transform.offsetY / 2}px, 0)`;
      return style;
    },
    tooltipId() {
      return `dj-img-preview-${Math.floor(Math.random() * 10000)}`;
    }
  },
  watch: {
    showViewer: {
      handler() {
        // console.log(this.showViewer, 'this.showViewer');
        if (this.showViewer) {
          this.on(document, mousewheelEventName, this.scrollFun);
          this.on(document, 'keydown', this.keyDownHandler);
          // Safari???Chrome??????????????????
          window.onmousewheel = document.onmousewheel = this.scrollFun;
          prevOverflow = document.body.style.overflow;
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = prevOverflow;
        }
      },
      deep: true
    },
    initialIndex: {
      handler() {
        this.index = this.initialIndex;
      },
      deep: true
    }
  },
  mounted() {
    // this.deviceSupportInstall();
    if (this.appendToBody) {
      document.body.appendChild(this.$el);
    }
  },
  methods: {
    download() {
      // console.log(this.$listeners, '$listeners');
      if (this.$listeners?.download) {// this.customDownload
        this.$emit('download');
        return;
      }
      // console.log('??????????????????');
      // return;
      // eslint-disable-next-line no-unreachable
      this.downloadFun();
    },
    downloadFun() {
      let image = document.getElementById(this.tooltipId); // ????????????????????????
      let imgUrl = image.src; // ??????????????????
      let imgUrlArr = imgUrl?.split('/');
      let imgUrlName = imgUrlArr[imgUrlArr?.length - 1];
      var xhr = new XMLHttpRequest();
      xhr.open('get', imgUrl, true);
      // ????????????
      xhr.responseType = 'blob';
      xhr.onload = function() {
        if (this.status == 200) {
          // ????????????blob??????
          let blob = this.response;
          // ????????????
          let oFileReader = new FileReader();
          oFileReader.onloadend = function(e) {
            let base64 = e.target.result;
            let eleLink = document.createElement('a');
            eleLink.download = imgUrlName;
            eleLink.style.display = 'none';
            eleLink.href = base64;
            // ????????????
            document.body.appendChild(eleLink);
            eleLink.click();
            // ????????????
            document.body.removeChild(eleLink);
          };
          oFileReader.readAsDataURL(blob);
        }
      };
      xhr.send();
      /* let imgUrlSuffixArr = imgUrl?.split('.');
      let imgUrlSuffix = imgUrlSuffixArr[imgUrlSuffixArr?.length - 1];
      console.log(imgUrlName,'imgUrlName');
      image.setAttribute('crossOrigin', 'anonymous');
      this.funDownload(image, imgUrlName, imgUrlSuffix);*/
    },
    funDownload(domImg, filename, suffix) {
      let c = document.getElementById('myCanvas');
      let ctx = c.getContext('2d');
      setTimeout(() => {
        ctx.drawImage(domImg, 0, 0);
      }, 10);
      // console.log(domImg, 'domImg');
      // ??????????????????????????????
      var eleLink = document.createElement('a');
      eleLink.download = filename;
      eleLink.style.display = 'none';
      // ?????????base64??????
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      setTimeout(() => {
        var width = domImg.naturalWidth;
        var height = domImg.naturalHeight;
        canvas.width = width;
        canvas.height = height;
        // console.log(canvas, 'canvas');
        // console.log(context, 'context');
        context.drawImage(domImg, 0, 0);
        // ?????????PNG????????????canvas.toDataURL('image/png')
        // eleLink.href = canvas.toDataURL('image/' + suffix);
        eleLink.href = canvas.toDataURL('image/gif');
        // ????????????
        document.body.appendChild(eleLink);
        eleLink.click();
        // ????????????
        document.body.removeChild(eleLink);
      }, 10);
    },
    // ????????????
    keyDownHandler(e) {
      e.stopPropagation();
      const keyCode = e.keyCode;
      switch (keyCode) {
        // ESC
        case 27:
          this.close();
          break;
        // ?????????
        case 37:
          this.prev();
          break;
        // ?????????
        case 39:
          this.next();
          break;
      }
    },
    // ????????????
    handleMaskClick() {
      // console.log('handleMaskClick');
      if (this.maskClosable) {
        this.close();
      }
    },
    // ??????????????????
    scrollFun(e) {
      e = e || window.event;
      // console.log(e, 'eeeeee');
      if (e.wheelDelta) {// ???????????????IE?????????????????????
        if (e.wheelDelta > 0) {// ????????????????????????
          // console.log('?????? IE?????????');
          this.handleActions('zoomIn', { zoomRate: 0.015, enableTransition: false });
        }
        if (e.wheelDelta < 0) {// ????????????????????????
          // console.log('?????? IE?????????');
          this.handleActions('zoomOut', { zoomRate: 0.015, enableTransition: false });
        }
      } else if (e.detail) {// Firefox????????????
        if (e.detail > 0) {// ????????????????????????
          this.handleActions('zoomOut', { zoomRate: 0.015, enableTransition: false });
          // console.log('?????? Firefox');
        }
        if (e.detail < 0) {// ????????????????????????
          this.handleActions('zoomIn', { zoomRate: 0.015, enableTransition: false });
          // console.log('?????? Firefox');
        }
      }
    },
    // ??????
    handleActions(action, options) {
      let transform = this.transform;
      let { enableTransition, zoomRate, rotateDeg } = {
        zoomRate: 0.2,
        rotateDeg: 90,
        enableTransition: true,
        ...options
      };
      switch (action) {
        case 'zoomOut':
          if (transform.scale > 0.2) {
            transform.scale = parseFloat((transform.scale - zoomRate).toFixed(3));
          }
          break;
        case 'zoomIn':
          transform.scale = parseFloat((transform.scale + zoomRate).toFixed(3));
          break;
        case 'rotateRight':
          transform.deg += rotateDeg;
          break;
        case 'rotateLeft':
          transform.deg -= rotateDeg;
          break;
      }
      this.transform.enableTransition = enableTransition;
      if (action === 'rotateRight' || action === 'rotateLeft') {
        this.$emit('handleActions', action);
      }
    },
    handleMouseDown(e) {
      // ????????????????????????????????????
      if (e.button !== 0) {
        return;
      }
      if (document.getElementById(this.tooltipId)) {
        document.getElementById(this.tooltipId).style.cursor = 'grabbing';
      }
      let startX = e.pageX;
      let startY = e.pageY;
      // console.log(e, startX, startY, 'handleMouseDown');
      let { offsetX, offsetY } = this.transform;
      // let o = e.target;  // ???????????????????????????
      // let ox = parseInt(o.offsetLeft);  // ???????????????x?????????
      // let oy = parseInt(o.offsetTop);  // ???????????????y?????????
      // this.dragFun = rafThrottle(ev => {
      //   console.log(ev,'ev--------------');
      //   console.log(offsetX, ev.pageX, startX, 'dragFun xxx');
      //   console.log(offsetY, ev.pageY, startY, 'dragFun yyy');
      //   this.transform.offsetX = offsetX + ev.pageX - startX;
      //   this.transform.offsetY = offsetY + ev.pageY - startY;
      //   console.log(this.transform.offsetX, this.transform.offsetY, 'this.transform.offsetX');
      // });
      this.dragFun = (ev) => {
        // console.log(offsetX, ev.pageX, startX, 'dragFun xxx');
        // console.log(offsetY, ev.pageY, startY, 'dragFun yyy');
        this.transform.offsetX = offsetX + ev.pageX - startX;
        this.transform.offsetY = offsetY + ev.pageY - startY;
        // console.log(this.transform.offsetX, this.transform.offsetY, 'this.transform.offsetX');
      };
      this.on(document, 'mousemove', this.dragFun);
      this.on(document, 'mouseup', ev => {
        if (document.getElementById(this.tooltipId)) {
          document.getElementById(this.tooltipId).style.cursor = 'grab';
        }
        this.off(document, 'mousemove', this.dragFun);
      });
      e.preventDefault();
    },
    reset() {
      this.transform = {
        scale: 1,
        deg: 0,
        enableTransition: false,
        offsetX: 0,
        offsetY: 0
      };
    },
    prev() {
      this.index = (this.index - 1 + this.previewSrcList?.length) % this.previewSrcList?.length;
      this.reset();
    },
    next() {
      this.index = (this.index + 1) % this.previewSrcList?.length;
      this.reset();
    },
    close() {
      this.reset();
      this.off(document, mousewheelEventName, this.scrollFun);
      this.off(document, 'keydown', this.keyDownHandler);
      // this.scrollFun = null;
      window.onmousewheel = document.onmousewheel = null;
      this.$emit('onClose');
    },
    off(element, event, handler) {
      // console.log(element, event, 'off');
      if (document.removeEventListener) {
        if (element && event) {
          element.removeEventListener(event, handler, false);
        }
      } else if (document.detachEvent) {
        if (element && event) {
          element.detachEvent('on' + event, handler);
        }
      }
    },
    on(element, event, handler) {
      // console.log(element, event, handler, 'on');
      // console.log(document.addEventListener, 'on');
      if (document.addEventListener) {// firefox
        // console.log('111');
        if (element && event && handler) {
          element.addEventListener(event, handler, false);
        }
      } else if (document.attachEvent) {
        // console.log('222');
        if (element && event && handler) {
          element.attachEvent('on' + event, handler);
        }
      }
    }
  },
  destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};
</script>

<style scoped lang="less">
</style>
