<template>
  <div :id="tooltipId"
       :class="[
        'dj-image',
        {'dj-image-border': border},
        {'dj-image-preview': preview && !showMask}
        ]">
    <slot v-if="loading" name="placeholder">
      <div class="dj-image-placeholder"></div>
    </slot>
    <slot v-else-if="error" name="error">
      <div class="dj-image-error">
        <!--<dj-icon icon="picture"/>-->
        <img
          src="data:image/png;base64,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"
          alt="">
      </div>
    </slot>
    <img v-else class="dj-image-img" :src="src" alt="" :style="'object-fit:'+fit"
         @click="showMask ? '' : imgClick()">
    <slot v-if="showMask">
      <dj-image-mask v-if="preview" @imagePreviewFun="imagePreviewFun" :maskPreview="maskPreview"></dj-image-mask>
    </slot>
    <template v-if="preview">
      <dj-image-preview ref="djImgPreview" :previewSrcList="previewSrcList" :showViewer="showViewer"
                        :initialIndex="imageIndex" :downloadStatus="downloadStatus"
                        @download="download" @onClose="closePreview" @handleActions="handleActions"/>
    </template>
  </div>
</template>

<script>
// 将NodeList转换成Array
function transformList(list) {
  var arr = [];
  for (var i = 0; i < list.length; i++) {
    arr.push(list[i]);
  }
  return arr;
}

// 查找一个父节点下指定类名的子节点
function getParentdElement(parentNode, childName) {
  // 如果父节点parentNode含有指定类名childName，这个节点就是目标节点
  if (parentNode.className.search(childName) !== -1) {
    // console.log('if------');
    // console.log(parentNode);
    return parentNode;
  }
  // 父节点不含有指定类名childName，递归查找它的子节点。
  var nodes = parentNode.childNodes;
  // 将子节点的list转换成标准数组并且过滤掉Text元素
  nodes = transformList(nodes).filter(function(item) {
    if (item.nodeType !== 3) {
      return item;
    }
  });
  // 如果子节点数组中有值，则递归查找
  if (nodes.length) {
    nodes.forEach(function(item) {
      getParentdElement(item, childName);
    });
  }
  // console.log('else------');
  // console.log(nodes, 'nodes');
  return nodes;
}

export default {
  name: 'djImage',
  props: {
    lazy: {
      type: Boolean,
      default: false
    },
    src: {
      type: String,
      default: ''
    },
    fit: {
      type: String,
      default: 'fill'
    },
    previewSrcList: {
      type: Array,
      default: () => []
    },
    // 是否显示下载
    downloadStatus: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: false
    },
    //  是否显示浮层
    showMask: {
      type: Boolean,
      default: true
    },
    //  是否点击遮罩层就可查看大图
    maskPreview: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    preview() {
      const {previewSrcList} = this;
      return Array.isArray(previewSrcList) && previewSrcList.length > 0;
    },
    tooltipId() {
      return `dj-image-${Math.floor(Math.random() * 10000)}`;
    },
    imageIndex() {
      let previewIndex = 0;
      const srcIndex = this.previewSrcList.indexOf(this.src);
      if (srcIndex >= 0) {
        previewIndex = srcIndex;
      }
      return previewIndex;
    }
  },
  watch: {
    src(val) {
      this.show && this.loadImage();
    },
    show(val) {
      val && this.loadImage();
    }
  },
  data() {
    return {
      loading: true,
      error: false,
      showViewer: false,
      scrollContainer: null,
      show: !this.lazy
    };
  },
  mounted() {
    // eslint-disable-next-line no-empty
    if (this.lazy) {
      this.lazyFun();
    } else {
      this.loadImage();
    }
  },
  methods: {
    handleActions(action) {
      this.$emit('handleActions', action);
    },
    download() {
      // console.log(this, 'this');
      // console.log(this.$listeners, '$listeners');
      // this.$emit('download');
      if (this.$listeners?.download) {// this.customDownload
        this.$emit('download');
        return;
      }
      // console.log('父级内置下载');
      // return;
      // eslint-disable-next-line no-unreachable
      this.$refs.djImgPreview.downloadFun();
    },
    // 获取元素最终样式，包括了内联样式、嵌入样式和外部样式
    getStyleComputedProperty(element, property) {
      // NOTE: 1 DOM access here
      var root = window;
      var css = root.getComputedStyle(element, null);
      return css[property];
    },
    // 获取滚动父级
    getScrollParent(element) {
      var root = window;
      var parent = element?.parentNode;
      // console.log(element,parent,'getScrollParent')

      if (!parent) {
        return element;
      }

      if (parent === root.document) {
        // Firefox puts the scrollTOp value on `documentElement` instead of `body`, we then check which of them is
        // greater than 0 and return the proper element
        if (root.document.body.scrollTop || root.document.body.scrollLeft) {
          return root.document.body;
        }
        return root.document.documentElement;
      }

      // Firefox want us to check `-x` and `-y` variations as well
      if (
        ['scroll', 'auto'].indexOf(this.getStyleComputedProperty(parent, 'overflow')) !== -1 ||
        ['scroll', 'auto'].indexOf(this.getStyleComputedProperty(parent, 'overflow-x')) !== -1 ||
        ['scroll', 'auto'].indexOf(this.getStyleComputedProperty(parent, 'overflow-y')) !== -1
      ) {
        // If the detected scrollParent is body, we perform an additional check on its parentNode
        // in this way we'll get body if the browser is Chrome-ish, or documentElement otherwise
        // fixes issue #65
        return parent;
      }
      return this.getScrollParent(element.parentNode);
    },// 用于获取某个元素相对于parent的位置集合
    // 用于获取某个元素相对于视窗的位置集合
    getBoundingClientRect2(element) {
      let rect = element?.getBoundingClientRect();
      // console.log(element, rect, 'rect');
      // whether the IE version is lower than 11
      let isIE = navigator.userAgent.indexOf('MSIE') != -1;

      // fix ie document bounding top always 0 bug
      let rectTop = isIE && element?.tagName === 'HTML' ? -element?.scrollTop : rect?.top;

      let param = {
        left: rect?.left,
        top: rectTop,
        right: rect?.right,
        bottom: rect?.bottom,
        width: rect?.right - rect?.left,
        height: rect?.bottom - rectTop
      };
      // console.log(param, 'getBoundingClientRect');
      // console.log(document.documentElement.clientWidth, document.documentElement.clientHeight, window.innerWidth, window.innerHeight, 'getBoundingClientRect');
      return param;
    },
    lazyFun() {
      // let containerRect=this.scrollContainer?.getBoundingClientRect();
      // // let elRect1=this.$el?.getBoundingClientRect();
      // let elRect=this.getBoundingClientRect2(this.$el);
      // // 可视区域高度
      // var h = this.scrollContainer.scrollHeight;
      // // 滚动区域高度
      // var s = this.scrollContainer.scrollTop;
      // console.log(containerRect,elRect,'rect');
      // console.log(h,s,this.$el.offsetTop,'lazyFun');
      this.scrollContainer = this.getScrollParent(this.$el);
      // console.log(this.scrollContainer, this.scrollContainer?.tagName, '==== mounted');
      this.on(this.scrollContainer, 'scroll', this.scrollFun);
      let ParentElement = getParentdElement(this.$el?.parentNode, 'dj-image') || [];
      // console.log(ParentElement, 'ParentElement');
      let idArr = ParentElement?.map(item => {
        return item?.id;
      }) || [];
      if (idArr.indexOf(this.tooltipId) === 0) {
        this.show = true;
      } else {
        this.handleLazyLoad();
      }
    },
    isInContainer(el, container) {
      if (!el || !container) return false;

      const elRect = el.getBoundingClientRect();
      let containerRect;

      // eslint-disable-next-line no-undefined
      if ([window, document, document.documentElement, null, undefined].includes(container)) {
        // console.log(111);
        containerRect = {
          top: 0,
          right: window.innerWidth,
          bottom: window.innerHeight,
          left: 0
        };
      } else {
        // console.log(222);
        containerRect = container.getBoundingClientRect();
      }
      let a = elRect.top < containerRect.bottom &&
        elRect.bottom > containerRect.top &&
        elRect.right > containerRect.left &&
        elRect.left < containerRect.right;
      // console.log(containerRect, elRect, a, this.$el, 'isInContainer');
      // console.log(elRect.top < containerRect.bottom, elRect.bottom > containerRect.top, elRect.right > containerRect.left, elRect.left < containerRect.right, 'isInContainer');
      // if (elRect.top === elRect.bottom || elRect.left === elRect.right) {
      //   return false;
      // }
      return a;
    },
    scrollFun() {
      // console.log('滚动了');
      // let containerRect=this.scrollContainer?.getBoundingClientRect();
      // let elRect=this.$el?.getBoundingClientRect();
      // console.log(containerRect,elRect,'rect');
      this.handleLazyLoad();
    },
    handleLazyLoad() {
      if (this.isInContainer(this.$el, this.scrollContainer)) {
        this.show = true;
        // this.loadImage();
        this.off(this.scrollContainer, 'scroll', this.scrollFun);
      }
    },
    loadImage() {
      // console.log('loadImage');
      // reset status
      this.loading = true;
      this.error = false;
      const img = new Image();
      img.onload = e => this.handleLoad(e, img);
      img.onerror = this.handleError.bind(this);
      img.src = this.src;
    },
    handleLoad() {
      // console.log('加载了');
      this.loading = false;
    },
    handleError(e) {
      this.loading = false;
      this.error = true;
      // console.log(e, '加载失败');
      this.$emit('onError', e);
    },
    imagePreviewFun() {
      this.imgClick();
    },
    imgClick() {
      if (this.preview) {
        this.showViewer = true;
      }
    },
    closePreview() {
      this.showViewer = false;
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
  beforeDestroy() {
    // console.log('beforeDestroy');
    this.lazy && this.off(this.scrollContainer, 'scroll', this.scrollFun);
  }
};
</script>

<style scoped lang="less">
</style>
