<template>
  <div :class="['disInB', appendToBody ? '' : 'posR']" :id="tooltipIdParent">
    <div
      :id="tooltipId" ref="popper"
      :class="[
          'dj-popover',
          'dj-popover-placement-' + placementStr,
          appendToBody ? 'posF dj-popover-posF' : '',
          className
        ]"
      :style="{
        width: width + 'px',
        ...popStyle ,
        maxWidth:popWHStyle.maxWidth + 'px',
        maxHeight:popWHStyle.maxHeight + 'px',
        visibility: !disabled && showPopper? 'unset' : 'hidden',
        display: displayStatus,
        opacity: opacity,
        zIndex: zIndex,
        pointerEvents: opacity ? 'auto' : 'none'
      }"
    >
      <!--opacity: !disabled && showPopper ? 1 : 0-->
      <div class="dj-popover-content"
           :style="{
             maxWidth:popWHStyle.maxWidth + 'px',
             maxHeight:popWHStyle.maxHeight - 10 + 'px'
           }"
      >
        <div class="dj-popover-arrow" :style="{...arrowStyle}"><span class="dj-popover-arrow-content"></span></div>
        <div class="dj-popover-inner" role="tooltip"
             :style="{
               maxWidth:popWHStyle.maxWidth + 'px',
               maxHeight:popWHStyle.maxHeight - 10 + 'px'
             }"
        >
          <!--<div class="dj-popover-title">{{title}}</div>-->
          <div class="dj-popover-title" :id="tooltipId + '-title'" v-if="title" v-text="title"></div>
          <div class="dj-popover-inner-content">
            <div class="overY" :id="tooltipId + '-content'">
              <slot name="content">
                <div class="dj-popover-desc">{{content}}</div>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
    <slot name="default"></slot>
  </div>
</template>

<script>
function removePop(self) {
  // console.log(this, self,'this');
  // console.log(self.tooltipId, self.tooltipIdParent, 'handleDocumentClick');
  // console.log(document.getElementById(self.tooltipIdParent), 'handleDocumentClick');
  if (!document.getElementById(self.tooltipIdParent) && document.getElementById(self.tooltipId)) {
    document.body.removeChild(document.getElementById(self.tooltipId));
    // console.log('removeEventListener');
    // document.removeEventListener('click', removePop(self), false);
  }
}

export default {
  name: 'djPopover',
  props: {
    title: String,
    content: String,
    reference: {},
    popper: {},
    disabled: Boolean,
    width: {},
    className: {
      type: String,
      default: ''
    },
    zIndex: {
      type: Number,
      default: 79
    },
    placement: {
      type: String,
      default: 'top'
    },
    visible: {
      type: Boolean,
      default: false
    },
    trigger: {
      type: String,
      default: 'click',
      validator: value => ['click', 'focus', 'hover', 'manual'].indexOf(value) > -1 || value === ''
    },
    openDelay: {
      type: Number,
      default: 0
    },
    closeDelay: {
      type: Number,
      default: 200
    },
    // 是否插入到body
    appendToBody: {
      type: Boolean,
      default: false
    },
    tabindex: {
      type: Number,
      default: 0
    },
    notParentClass: {// 为了让自定义的父级有overflow auto时，让他不为父级元素
      type: String,
      default: ''
    }
    // contraryVertical: {
    //   type: Number,
    //   default: 100
    // },
    // contraryHorizontal: {
    //   type: Number,
    //   default: 250
    // }
  },
  data() {
    return {
      popStyle: {},
      popWHStyle: {},
      arrowStyle: {},
      showPopper: false,
      opacity: 0,
      displayStatus: 'none',
      contentMaxHeight: '',
      placementStr: '',
      tagName: '',
      target: null,
      contraryVertical: 100,
      contraryHorizontal: 250,
      popperInitialWidth: '',
      popperInitialHeight: ''
    };
  },
  components: {},
  computed: {
    tooltipId() {
      return `dj-popover-${Math.floor(Math.random() * 10000)}`;
    },
    tooltipIdParent() {
      return `dj-popover-${Math.floor(Math.random() * 10000)}-parent`;
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler(val) {
        // console.log(val, 'visible');
        if (this.disabled) {
          return;
        }
        this.showPopper = val;
      }
    },
    showPopper: {
      immediate: true,
      handler(val) {
        // console.log(val, 'showPopper');
        if (this.disabled) {
          return;
        }
        this.$emit('update:visible', val);
        if (this.appendToBody) {
          if (val) {
            this.creatDOM();
          } else {
            /* setTimeout(() => {
             this.removeDOM();
             }, 300);*/
          }
        }
        if (!this.disabled && val) {
          this.placementStr = this.placement;
          this.displayStatus = 'block';
          let reference;
          const popper = this.popper || this.$refs.popper;
          setTimeout(() => {
            reference = this.getReference();
            // console.log(reference,'reference这里啊');
            if (!this.popperInitialWidth && !this.popperInitialHeight) {
              this.popperInitialWidth = popper?.offsetWidth;
              this.popperInitialHeight = popper?.offsetHeight;
            }
            // console.log(this.popperInitialWidth, this.popperInitialHeight, 'popperInitialWidth');
            // console.log(popper.clientHeight);
          });
          // return;
          setTimeout(() => {
            this.placementStrFun(reference, popper);
          }, 2);
          if (this.appendToBody) {
            // this.opacity = 1;
            setTimeout(() => {
              this.popWidthHeightFun(reference, popper);
            }, 5);
          }
          setTimeout(() => {
            this.opacity = 1;
            this.positionFun(reference, popper);
          }, 10);
        } else {
          this.opacity = 0;
          /* setTimeout(() => {
           this.displayStatus = 'none';
           // console.log(val,'display:none');
           }, 300);*/
        }
      }
    }
  },
  created() {
    window.addEventListener('popstate', this.popstate, false);
  },
  mounted() {
    // console.log('mounted');
    const popper = this.popper || this.$refs.popper;
    let reference = this.getReference();
    let target = this.getScrollParent(reference);
    // console.log(reference, popper, '==== mounted');
    // console.log(target, target?.tagName, this.$slots, '==== mounted');
    this.tagName = target?.tagName || '';
    this.target = target || null;
    if (this.tagName === 'HTML') {
      target = window;
      // document.getElementById(this.tooltipId).classList.add("posA");
    }
    // console.log(target, this.target, '==== mounted22');
    // 可访问性
    if (reference) {
      // reference.setAttribute('tabindex', this.tabindex); // tab序列
      this.positionFun(reference, popper);
      if (this.trigger !== 'click') {
        // console.log(reference, '测试0000');
        this.on(reference, 'focusin', () => {
          // console.log('222222222');
          this.handleFocus();
          const instance = reference.__vue__;
          if (instance && typeof instance.focus === 'function') {
            instance.focus();
          }
        });
        this.on(popper, 'focusin', this.handleFocus);
        this.on(reference, 'focusout', this.handleBlur);
        this.on(popper, 'focusout', this.handleBlur);
        // console.log('测试1111');
      }
      this.on(reference, 'keydown', this.handleKeydown);
      this.on(reference, 'click', this.handleClick);
    }
    this.on(target, 'scroll', () => this.handleScroll(reference, popper));
    if (this.trigger === 'click') {
      // console.log('1111');
      this.on(reference, 'click', this.doToggle);
      // console.log(2222,document,this);
      this.on(document, 'click', this.handleDocumentClick);
      // document.addEventListener('click', removePop(this), false);
    } else if (this.trigger === 'hover') {
      this.on(reference, 'mouseenter', this.handleMouseEnter);
      this.on(popper, 'mouseenter', this.handleMouseEnter);
      this.on(reference, 'mouseleave', this.handleMouseLeave);
      this.on(popper, 'mouseleave', this.handleMouseLeave);
    } else if (this.trigger === 'focus') {
      if (reference.querySelector('input, textarea')) {
        this.on(reference, 'focusin', this.doShow);
        this.on(reference, 'focusout', this.doClose);
        // console.log('input, textarea');
        // console.log('111111');
      } else {
        this.on(reference, 'mousedown', this.doShow);
        this.on(reference, 'mouseup', this.doClose);
        // console.log('222222');
      }
    }
  },
  beforeDestroy() {
    this.cleanup();
    removePop(this);
    let reference = this.getReference();
    // console.log(reference,'reference');
    this.off(reference, 'click', this.doToggle);
    this.off(reference, 'mouseup', this.doClose);
    this.off(reference, 'mousedown', this.doShow);
    this.off(reference, 'focusin', this.doShow);
    this.off(reference, 'focusout', this.doClose);
    this.off(reference, 'mousedown', this.doShow);
    this.off(reference, 'mouseup', this.doClose);
    this.off(reference, 'mouseleave', this.handleMouseLeave);
    this.off(reference, 'mouseenter', this.handleMouseEnter);
    this.off(document, 'click', this.handleDocumentClick);
    // document.removeEventListener('click', removePop(this), false);
    this.off(window, 'scroll', this.handleScroll);
  },
  methods: {
    // 获取reference
    getReference() {
      let reference = this.reference || this.$refs.reference;
      if (!reference && this.$slots.default && this.$slots.default[0]) {
        // reference = this.$slots.default[0].elm;
        for (let i in this.$slots.default) {
          // console.log(this.$slots.default[i].elm instanceof Element, 'ssss',i);
          if (this.$slots.default[i].elm instanceof Element) {
            reference = this.$slots.default[i].elm;
            break;
          }
        }
      }
      return reference;
    },
    popstate() {
      // this.showPopper=false;
      let els = document.getElementsByClassName('dj-popover-posF');
      // console.log(els,'els');
      if (els) {
        for (let i = 0; i < els.length; i++) {
          // console.log(els[i].parentNode,'父级');
          if (els[i].parentNode.tagName === 'BODY') {
            // console.log('body父级');
            document.body.removeChild(els[i]);
          }
        }
      }
    },
    // 获取某元素以浏览器左上角为原点的坐标
    getPoint(el) {
      let offsetTop = 0;
      let offsetLeft = 0;
      while (el && el.tagName !== 'BODY') {
        offsetTop += el.offsetTop;
        offsetLeft += el.offsetLeft;
        el = el.offsetParent;
      }
      let offsetObj = {
        offsetTop: offsetTop,
        offsetLeft: offsetLeft
      };
      // console.log(offsetObj, 'getPoint');
      return offsetObj;
    },
    // 用于获取某个元素相对于parent的位置集合
    getOffsetRectRelativeToCustomParent(element, parent, fixed) {
      var elementRect = this.getBoundingClientRect2(element);
      var parentRect = this.getBoundingClientRect2(parent);

      if (fixed) {
        var scrollParent = this.getScrollParent(parent);
        parentRect.top += scrollParent.scrollTop;
        parentRect.bottom += scrollParent.scrollTop;
        parentRect.left += scrollParent.scrollLeft;
        parentRect.right += scrollParent.scrollLeft;
      }

      var rect = {
        top: elementRect.top - parentRect.top,
        left: elementRect.left - parentRect.left,
        bottom: elementRect.top - parentRect.top + elementRect.height,
        right: elementRect.left - parentRect.left + elementRect.width,
        width: elementRect.width,
        height: elementRect.height
      };
      // console.log(rect, elementRect, parentRect, 'getOffsetRectRelativeToCustomParent');
      return rect;
    },
    // 获取滚动父级
    getScrollParent(element) {
      var root = window;
      var parent = element?.parentNode;
      // console.log(element, parent, 'getScrollParent');

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
        // console.log( parent?.className,'parent className');
        // console.log( parent?.classList,'parent classList');
        let className = parent?.getAttribute('class');
        if (className?.indexOf('dj-table-panel') > -1 || className?.indexOf('dj-modal-content') > -1) {
          // console.log('=====');
          return this.getScrollParent(parent);
        }
        if (this.notParentClass && parent?.getAttribute('class') === this.notParentClass) {
          // console.log('=====');
          return this.getScrollParent(parent);
        }
        // console.log(parent, 'parent222');
        return parent;
      }
      return this.getScrollParent(element?.parentNode);
    },
    // 获取距离该子元素最近的进行过定位的父元素
    getOffsetParent(element) {
      // NOTE: 1 DOM access here
      var root = window;
      var offsetParent = element?.offsetParent;
      // console.log(element, offsetParent, offsetParent === root.document.body || !offsetParent ? root.document.documentElement : offsetParent, 'getOffsetParent');
      return offsetParent === root?.document?.body || !offsetParent ? root?.document?.documentElement : offsetParent;
    },
    // 获取元素最终样式，包括了内联样式、嵌入样式和外部样式
    getStyleComputedProperty(element, property) {
      // NOTE: 1 DOM access here
      var root = window;
      var css = root.getComputedStyle(element, null);
      return css[property];
    },
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
      // console.log(param, 'getBoundingClientRect2');
      // console.log(document.documentElement.clientWidth, document.documentElement.clientHeight, window.innerWidth, window.innerHeight, 'getBoundingClientRect');
      return param;
    },
    // 获取title宽高
    getTitleStyle() {
      let dom = document.getElementById(this.tooltipId + '-title');
      if (dom) {
        let divOffsetWidth = dom.offsetWidth; // 元素的宽度包含padding和border
        let divOffsetHeight = dom.offsetHeight; // 元素的宽度包含padding和border
        // console.log(divOffsetWidth, divOffsetHeight, 'getTitleStyle');
        return {
          width: divOffsetWidth,
          height: divOffsetHeight
        };
      }
    },
    // 获取pop最大最小宽度
    popWidthHeightFun(reference, popper) {
      // console.log('popWidthHeightFun');
      let offsetObj2 = this.getBoundingClientRect2(reference);
      if (this.tagName === 'HTML') {
        offsetObj2 = this.getBoundingClientRect2(reference);
      } else {
        // offsetObj2 = getOffsetRectRelativeToCustomParent(reference, getOffsetParent(popper), false);
        offsetObj2 = this.getOffsetRectRelativeToCustomParent(reference, this.target, false);
      }
      let maxWidth, maxHeight;
      if (this.placementStr === 'left' || this.placementStr === 'leftBottom' || this.placementStr === 'leftTop') {
        maxWidth = offsetObj2.left - 10;
        maxHeight = document.documentElement.clientHeight - 10;
      }
      if (this.placementStr === 'right' || this.placementStr === 'rightBottom' || this.placementStr === 'rightTop') {
        maxWidth = document.documentElement.clientWidth - offsetObj2.right - 10;
        maxHeight = document.documentElement.clientHeight - 10;
      }
      if (this.placementStr === 'top' || this.placementStr === 'topLeft' || this.placementStr === 'topRight') {
        maxWidth = document.documentElement.clientWidth - 10;
        maxHeight = offsetObj2.top - 15;
      }
      if (this.placementStr === 'bottom' || this.placementStr === 'bottomLeft' || this.placementStr === 'bottomRight') {
        maxWidth = document.documentElement.clientWidth - 10;
        maxHeight = document.documentElement.clientHeight - offsetObj2.bottom - 10;
      }
      this.popWHStyle = {
        maxWidth: maxWidth,
        maxHeight: maxHeight
      };
    },
    // 获取pop content应该减的值
    getContentCha() {
      // console.log(this.getStyleComputedProperty(document.getElementById(this.tooltipId + '-content').parentNode.parentNode,'border-bottom-width'),'---');
      let PT = this.getStyleComputedProperty(document.getElementById(this.tooltipId), 'padding-top')
        ?.split('px')[0] || 0;
      let PB = this.getStyleComputedProperty(document.getElementById(this.tooltipId), 'padding-bottom')
        ?.split('px')[0] || 0;
      let contentPT = this.getStyleComputedProperty(document.getElementById(this.tooltipId + '-content')?.parentNode, 'padding-top')
        ?.split('px')[0] || 0;
      let contentPB = this.getStyleComputedProperty(document.getElementById(this.tooltipId + '-content')?.parentNode, 'padding-bottom')
        ?.split('px')[0] || 0;
      let bbw = this.getStyleComputedProperty(document.getElementById(this.tooltipId + '-content')?.parentNode?.parentNode, 'border-bottom-width')
        ?.split('px')[0] || 0;
      let btw = this.getStyleComputedProperty(document.getElementById(this.tooltipId + '-content')?.parentNode?.parentNode, 'border-top-width')
        ?.split('px')[0] || 0;
      let contentCha = Number(PT) + Number(PB) + Number(contentPT) + Number(contentPB) + Number(bbw) + Number(btw);
      // console.log(PT,PB,contentCha, 'contentCha');
      return contentCha;
    },
    // 定位
    positionFun(reference, popper, scrollTop, scrollLeft) {
      if (!reference || !popper) {
        return false;
      }
      if (this.appendToBody && this.tagName !== 'HTML') {
        // console.log(document.getElementById(this.tooltipId), 'classList');
        document.getElementById(this.tooltipId)?.classList?.add('posA');
      }
      let offsetObj = this.getPoint(reference);
      let offsetObj3 = this.getBoundingClientRect2(reference);
      let offsetObj2;
      if (this.tagName === 'HTML') {
        offsetObj2 = this.getBoundingClientRect2(reference);
      } else {
        offsetObj2 = this.getOffsetRectRelativeToCustomParent(reference, this.getOffsetParent(popper), false);
      }
      // console.log(offsetObj3, 'offsetObj3');
      // console.log(offsetObj2, 'offsetObj2');
      let referenceOffsetLeft = this.appendToBody ? offsetObj2.left : reference.offsetLeft;
      let referenceOffsetTop = this.appendToBody ? offsetObj2.top : reference.offsetTop;
      // console.log(`\n reference: offsetLeft：offsetLeft：${reference.offsetLeft},${offsetObj.offsetLeft},  offsetObj2.left：${offsetObj2.left}`);
      // console.log(`\n reference: offsetTop：offsetTop：${reference.offsetTop},${offsetObj.offsetTop},  offsetObj2.top：${offsetObj2.top}`);
      // console.log(referenceOffsetTop, referenceOffsetLeft, '=====================');
      let left, top;
      // console.log(this.popWHStyle.maxHeight, this.popWHStyle.maxWidth, popper.offsetWidth, 'this.popWHStyle.maxHeight');
      let contentCha = this.getContentCha();
      let height1;
      if (this.title) {
        if (this.placementStr === 'leftTop' || this.placementStr === 'left' || this.placementStr === 'leftBottom' || this.placementStr === 'rightTop' || this.placementStr === 'right' || this.placementStr === 'rightBottom') {
          height1 = Number(this.getTitleStyle().height + 24);
        } else {
          height1 = Number(this.getTitleStyle().height + contentCha);
        }
        // document.getElementById(this.tooltipId + '-content').style.maxHeight = 'calc(100vh - ' + height1 + 'px';
      } else {
        height1 = contentCha;
      }
      // height1 = 15;
      if (document.getElementById(this.tooltipId + '-content')) {
        document.getElementById(this.tooltipId + '-content').style.maxHeight = this.popWHStyle.maxHeight - height1 < contentCha ? contentCha + 'px' : this.popWHStyle.maxHeight - height1 + 'px';
      }
      let popperRealityOffsetWidth = popper.offsetWidth;
      let popperRealityOffsetHeight = popper.offsetHeight;
      let widthDifference = Math.abs(reference.offsetWidth - popperRealityOffsetWidth);
      let heightDifference = Math.abs(reference.offsetHeight - popperRealityOffsetHeight);
      // console.log(`popper: offsetLeft：${popper.offsetLeft}  offsetTop：${popper.offsetTop}  offsetWidth：${popper.offsetWidth},popperRealityOffsetWidth: ${popperRealityOffsetWidth},  offsetHeight：${popper.offsetHeight}, popperRealityOffsetHeight:${popperRealityOffsetHeight}`);
      // console.log(`\n reference: offsetLeft：${referenceOffsetLeft}  offsetTop：${referenceOffsetTop}  offsetWidth：${reference.offsetWidth}  offsetHeight：${reference.offsetHeight}`);
      if (this.placementStr === 'top' || this.placementStr === 'topLeft' || this.placementStr === 'topRight') {
        top = referenceOffsetTop - popperRealityOffsetHeight;
      }
      if (this.placementStr === 'bottom' || this.placementStr === 'bottomLeft' || this.placementStr === 'bottomRight') {
        top = referenceOffsetTop + reference.offsetHeight;
      }
      if (this.placementStr === 'top' || this.placementStr === 'bottom') {
        left = referenceOffsetLeft - popperRealityOffsetWidth / 2 + reference.offsetWidth / 2;
      }
      if (this.placementStr === 'topLeft' || this.placementStr === 'bottomLeft') {
        left = referenceOffsetLeft;
      }
      if (this.placementStr === 'topRight' || this.placementStr === 'bottomRight') {
        if (popperRealityOffsetWidth > reference.offsetWidth) {
          left = referenceOffsetLeft - widthDifference;
        } else {
          left = referenceOffsetLeft + widthDifference;
        }
      }
      if (this.placementStr === 'rightTop' || this.placementStr === 'leftTop') {
        top = referenceOffsetTop;
      }
      if (this.placementStr === 'right' || this.placementStr === 'left') {
        top = referenceOffsetTop - popperRealityOffsetHeight / 2 + reference.offsetHeight / 2;
      }
      if (this.placementStr === 'rightBottom' || this.placementStr === 'leftBottom') {
        if (popperRealityOffsetHeight > reference.offsetHeight) {
          top = referenceOffsetTop - heightDifference;
        } else {
          top = referenceOffsetTop + heightDifference;
        }
      }
      if (this.placementStr === 'rightTop' || this.placementStr === 'right' || this.placementStr === 'rightBottom') {
        left = referenceOffsetLeft + reference.offsetWidth;
      }
      if (this.placementStr === 'leftTop' || this.placementStr === 'left' || this.placementStr === 'leftBottom') {
        left = referenceOffsetLeft - popperRealityOffsetWidth;
      }
      // 动态计算宽高时，宽/高的需要加上的差值
      let heightChaLR = 0;
      let leftChaLR = 0;
      let top1, left1;
      if (this.tagName !== 'HTML') {
        top1 = offsetObj3.top - popperRealityOffsetHeight / 2 + reference.offsetHeight / 2;
        // left1 = offsetObj3.left - popperRealityOffsetWidth / 2 + reference.offsetWidth / 2;
        left1 = left;
        if (this.placementStr === 'topLeft' || this.placementStr === 'bottomLeft') {
          left1 = left - 5;
        }
      } else {
        top1 = top;
        left1 = left;
      }
      let topPos = this.tagName === 'HTML' ? top : top1;
      let leftPos = this.tagName === 'HTML' ? left : left1;
      if (this.appendToBody) {
        if (topPos + popperRealityOffsetHeight >= document.documentElement.clientHeight - 4) {
          heightChaLR = document.documentElement.clientHeight - topPos - popperRealityOffsetHeight - 5;
          // console.log('heightChaLR 111');
        } else if (topPos <= 4) {
          heightChaLR = popperRealityOffsetHeight / 2 - reference.offsetHeight / 2 - offsetObj3.top + 5;
          // console.log('heightChaLR 222');
        } else {
          heightChaLR = 0;
          // console.log('heightChaLR 333');
        }
        if (leftPos + popperRealityOffsetWidth > document.documentElement.clientWidth) {
          leftChaLR = document.documentElement.clientWidth - leftPos - popperRealityOffsetWidth - 5;
          // console.log(leftChaLR,'leftChaLR 11')
        } else if (leftPos <= 0) {
          leftChaLR = popperRealityOffsetWidth / 2 - reference.offsetWidth / 2 - offsetObj3.left + 5;
          /*  if (this.placementStr === 'topLeft' || this.placementStr === 'bottomLeft') {
           // console.log('1111--')
           leftChaLR = - offsetObj3.left + 5 // 左侧pop被遮挡的距离+5
           }*/
          if (this.placementStr === 'topLeft' || this.placementStr === 'bottomLeft' || this.placementStr === 'topRight' || this.placementStr === 'bottomRight') {
            // console.log('1111--')
            leftChaLR = -leftPos + 5;// 左侧pop被遮挡的距离+5
          }
          // console.log(offsetObj3.left,leftPos,leftChaLR,'leftChaLR 22')
        } else {
          leftChaLR = 0;
          // console.log(leftChaLR,leftPos,'leftChaLR 33')
        }
      }
      // console.log(heightChaLR, leftChaLR, 'heightChaLR,leftChaLR');
      let overFlowHeight = offsetObj3.top >= 10 ? document.documentElement.clientHeight - offsetObj3.top : offsetObj3.bottom;
      let overFlowWidth = offsetObj3.left >= 10 ? document.documentElement.clientWidth - offsetObj3.left : offsetObj3.right;
      // console.log('document.documentElement.clientHeight', document.documentElement.clientHeight, 'offsetObj2.top：', offsetObj2.top, 'overFlowHeight：', overFlowHeight, 'overFlowWidth：', overFlowWidth, 'popperRealityOffsetHeight：', popperRealityOffsetHeight, 'popperRealityOffsetWidth：', popperRealityOffsetWidth, '000', overFlowHeight < reference.offsetHeight);
      // reference被遮盖的高度
      let hideHeight = offsetObj3.top >= 0 ? offsetObj3.bottom - document.documentElement.clientHeight : -offsetObj3.top;
      let hideWidth = offsetObj3.left >= 0 ? offsetObj3.right - document.documentElement.clientWidth : -offsetObj3.left;
      // console.log(hideHeight, hideWidth, 'hideHeight');
      // 文档顶部到reference底部的距离
      let scrollHeightUp = offsetObj.offsetTop + reference.offsetHeight;
      // 文档顶部到reference顶部-可视区域的高度
      let scrollHeightDown = offsetObj.offsetTop - document.documentElement.clientHeight;
      // 文档左侧到reference最右侧的距离
      let scrollWidthUp = offsetObj.offsetLeft + reference.offsetWidth;
      // 文档顶部到reference左侧-可视区域的宽度
      let scrollWidthDown = offsetObj.offsetLeft - document.documentElement.clientWidth;
      let scrollHeight, scrollWidth;
      if (offsetObj3.top < -reference.offsetHeight) {
        scrollHeight = scrollTop - scrollHeightUp || 0;
      } else {
        scrollHeight = scrollTop - scrollHeightDown || 0;
      }
      if (offsetObj3.left < -reference.offsetWidth + 20) {
        scrollWidth = scrollLeft - scrollWidthUp || 0;
      } else {
        scrollWidth = scrollLeft - scrollWidthDown || 0;
      }
      // console.log(left, left1, 'left,left1');
      // console.log(top, top1, document.documentElement.clientHeight,'top,top1');
      // console.log(scrollTop, scrollHeightUp, scrollHeightDown, scrollHeight, 'scrollTop,scrollHeight');
      // console.log(left + leftChaLR - scrollWidth, left + leftChaLR, leftChaLR, scrollWidth, left, '===00');
      let leftNum, topNum;
      if (this.appendToBody) {
        // console.log('placementStr',this.placementStr)
        if (this.placementStr === 'rightTop' || this.placementStr === 'right' || this.placementStr === 'rightBottom' || this.placementStr === 'leftTop' || this.placementStr === 'left' || this.placementStr === 'leftBottom') {
          leftNum = left;
          if (offsetObj3.top < -reference.offsetHeight || offsetObj3.top > document.documentElement.clientHeight) {
            if (this.tagName !== 'HTML') {
              topNum = top1 + heightChaLR - scrollHeight + 'px';
            } else {
              topNum = top + heightChaLR - scrollHeight + 'px';
            }
            // console.log('topNum111===', topNum)
          } else if (overFlowHeight < popperRealityOffsetHeight || this.appendToBody && top < 0 || this.appendToBody && top1 < 0 || top + popperRealityOffsetHeight > document.documentElement.clientHeight || top1 + popperRealityOffsetHeight > document.documentElement.clientHeight || offsetObj3.top <= 0 || offsetObj3.bottom >= document.documentElement.clientHeight) {
            // if (this.tagName !== 'HTML') {
            //   topNum = top1 + heightChaLR + 'px';
            // }else {
            topNum = top + heightChaLR + 'px';
            // }
            // console.log('topNum22', topNum)
          } else {
            topNum = top + 'px';
            // console.log('33')
          }
        } else if (this.placementStr === 'top' || this.placementStr === 'topLeft' || this.placementStr === 'topRight' || this.placementStr === 'bottom' || this.placementStr === 'bottomLeft' || this.placementStr === 'bottomRight') {
          topNum = top + 'px';
          // console.log(overFlowWidth,popperRealityOffsetWidth,left)
          // console.log(`overFlowWidth：${overFlowWidth}  popperRealityOffsetWidth：${popperRealityOffsetWidth}  left：${left},left1: ${left1},`);
          if (offsetObj3.left < -reference.offsetWidth + 20 || offsetObj3.left > document.documentElement.clientWidth - 13) {
            /* if (this.tagName !== 'HTML') {
             leftNum = left1 + leftChaLR - scrollWidth;
             } else {
             leftNum = left + leftChaLR - scrollWidth;
             }*/
            if (offsetObj3.left < -reference.offsetWidth + 20) {
              leftNum = left + leftChaLR - scrollWidth - 20;
            }
            if (offsetObj3.left > document.documentElement.clientWidth - 13) {
              leftNum = left + leftChaLR - scrollWidth + 13;
            }
            // console.log(left,leftChaLR,scrollWidth,'leftNum 111=============');
          } else if (overFlowWidth < popperRealityOffsetWidth || this.appendToBody && left < 0 || this.appendToBody && left1 < 0 || left + popperRealityOffsetWidth > document.documentElement.clientWidth || left1 + popperRealityOffsetWidth > document.documentElement.clientWidth || offsetObj3.left <= 0 || offsetObj3.right >= document.documentElement.clientWidth) {
            // console.log(left,leftChaLR,'leftNum 22=============')
            leftNum = left + leftChaLR;
            // console.log('22',leftNum)
          } else {
            // console.log('leftNum 33')
            leftNum = left;
          }
        }
        this.popStyle = {
          left: leftNum + 'px',
          top: topNum
        };
      } else {
        // console.log('ppppppp')
        this.popStyle = {
          left: left + 'px',
          top: top + 'px'
        };
      }
      // console.log('111',overFlowHeight,document.documentElement.clientHeight,offsetObj3.top <= 0,offsetObj3.bottom >= document.documentElement.clientHeight)
      if (this.appendToBody && (overFlowHeight < popperRealityOffsetHeight || overFlowWidth < popperRealityOffsetWidth || top1 < 0 || left1 < 0 || top1 + popperRealityOffsetHeight < document.documentElement.clientHeight || left1 + popperRealityOffsetWidth < document.documentElement.clientWidth || offsetObj3.top <= 0 || offsetObj3.left <= 0 || offsetObj3.bottom >= document.documentElement.clientHeight || offsetObj3.right >= document.documentElement.clientWidth)) {
        // console.log('111箭头')
        if (this.placementStr === 'leftTop' || this.placementStr === 'left' || this.placementStr === 'leftBottom' || this.placementStr === 'rightTop' || this.placementStr === 'right' || this.placementStr === 'rightBottom') {
          let arrowHeightLR;
          if (offsetObj3.top >= 0) {
            arrowHeightLR = hideHeight > 0 && reference.offsetHeight / 2 - hideHeight < 15 ? -(popperRealityOffsetHeight / 2 - 10) : heightChaLR;
          } else {
            arrowHeightLR = hideHeight > 0 && reference.offsetHeight / 2 - hideHeight < 15 ? popperRealityOffsetHeight / 2 - 10 : heightChaLR;
            // console.log('222',hideHeight,hideHeight > 0 && reference.offsetHeight / 2 - hideHeight < 15,heightChaLR)
          }
          // console.log(hideHeight > 20, overFlowHeight < reference.offsetHeight, arrowHeightLR, 'arrowHeightLR');
          if (this.placementStr === 'rightBottom' || this.placementStr === 'leftBottom') {
            this.arrowStyle = {
              bottom: overFlowHeight < reference.offsetHeight ? `calc(50% - ${arrowHeightLR}px)` : `calc(50% - ${heightChaLR}px)`
            };
          } else {
            this.arrowStyle = {
              top: overFlowHeight < reference.offsetHeight ? `calc(50% - ${arrowHeightLR}px)` : `calc(50% - ${heightChaLR}px)`
            };
          }
        } else {
          let arrowDisplacement;
          let leftUnchanged;
          if (offsetObj3.left >= 0) {
            arrowDisplacement = hideWidth > 0 && reference.offsetWidth / 2 - hideWidth < 15 ? -(popperRealityOffsetWidth / 2 - 10) : leftChaLR;
          } else {
            arrowDisplacement = hideWidth > 0 && reference.offsetWidth / 2 - hideWidth < 15 ? popperRealityOffsetWidth / 2 - 10 : leftChaLR;
            // console.log('222',hideWidth,hideWidth > 0 && reference.offsetWidth / 2 - hideWidth < 15,leftChaLR)
          }
          // console.log(`hideWidth: ${hideWidth} leftNum:${leftNum},overFlowWidth:${overFlowWidth},reference.offsetWidth:${reference.offsetWidth},leftChaLR:${leftChaLR}, arrowDisplacement:${arrowDisplacement}`, '====');
          let initialLeft = '50%';
          if (this.placementStr === 'topLeft' || this.placementStr === 'bottomLeft') {
            let initialLeft1 = 16;
            initialLeft = initialLeft1 + 'px';
            arrowDisplacement = hideWidth > 0 && leftNum < 15 ? initialLeft1 - 10 : leftChaLR;
            // console.log('222---', overFlowWidth < initialLeft1 + 1 + 5,hideWidth, hideWidth > 0 && leftNum < 15, leftChaLR);
            // 元素超过某可视范围区域箭头不移动
            if (overFlowWidth < initialLeft1 + 12 + 1 + 5) {
              leftUnchanged = initialLeft1;
            }
          }
          if (this.placementStr === 'topRight' || this.placementStr === 'bottomRight') {
            let initialLeft1 = popperRealityOffsetWidth - 16 - 12;
            initialLeft = initialLeft1 + 'px';
            arrowDisplacement = leftChaLR;
            // 元素右侧超过可视范围区域或左侧区域内宽度小于某值时 箭头不移动
            if (offsetObj3.right > document.documentElement.clientWidth || overFlowWidth < 5 + 16 + 12 + 10) {
              leftUnchanged = initialLeft1;
            }
          }
          // console.log('initialLeft', initialLeft, ' leftUnchanged:', leftUnchanged, ' arrowDisplacement:', arrowDisplacement, overFlowWidth < reference.offsetWidth, hideWidth > 0 && leftNum < 15);
          let arrowLeft = leftUnchanged ? leftUnchanged : overFlowWidth < reference.offsetWidth ? `calc(${initialLeft} - ${arrowDisplacement}px)` : `calc(${initialLeft} - ${leftChaLR}px)`;
          if (leftPos) {
            this.arrowStyle = {
              left: arrowLeft
            };
          }
        }
      }
    },
    // 动态判断placement该为什么值
    placementStrFun(reference, popper) {
      // console.log(popper, 'popper--');
      // let offsetObj2 = this.getBoundingClientRect2(reference);
      let offsetObj2;
      if (this.tagName === 'HTML') {
        offsetObj2 = this.getBoundingClientRect2(reference);
      } else {
        offsetObj2 = this.getOffsetRectRelativeToCustomParent(reference, this.getOffsetParent(popper), false);
      }
      let spaceTop = offsetObj2?.top;
      let spaceBottom = document.documentElement.clientHeight - offsetObj2?.bottom;
      let spaceLeft = offsetObj2?.left;
      let spaceRight = document.documentElement.clientWidth - offsetObj2?.right;
      // console.log(offsetObj2, document.documentElement.clientWidth, document.documentElement.clientHeight, 'offsetObj2');
      // console.log(' spaceTop:', spaceTop, ' spaceBottom:', spaceBottom, ' spaceLeft:', spaceLeft, ' spaceRight:', spaceRight, ' this.popperInitialWidth:', this.popperInitialWidth, ' this.popperInitialHeight:', this.popperInitialHeight, '-----');
      if (this.appendToBody) {
        if (this.placement === 'rightTop' || this.placement === 'right' || this.placement === 'rightBottom') {
          // this.placementStr = 'right';
          // if (document.documentElement.clientWidth - offsetObj2.right < this.contraryHorizontal) {
          //   this.placementStr = 'left';
          // }
          if (this.popperInitialWidth > spaceRight - 15) {
            if (this.popperInitialWidth <= spaceLeft + 15) {
              this.contraryHorizontal = spaceLeft;
              this.placementStr = 'left';
            } else if (spaceLeft > spaceRight) {
              this.contraryHorizontal = spaceLeft;
              this.placementStr = 'left';
            } else {
              this.contraryHorizontal = spaceRight;
              this.placementStr = 'right';
            }
          }
        } else if (this.placement === 'leftTop' || this.placement === 'left' || this.placement === 'leftBottom') {
          // this.placementStr = 'left';
          // if (offsetObj2.left < this.contraryHorizontal) {
          //   this.placementStr = 'right';
          // }
          if (this.popperInitialWidth > spaceLeft - 15) {
            if (this.popperInitialWidth <= spaceRight + 15) {
              this.contraryHorizontal = spaceRight;
              this.placementStr = 'right';
            } else if (spaceRight > spaceLeft) {
              this.contraryHorizontal = spaceRight;
              this.placementStr = 'right';
            } else {
              this.contraryHorizontal = spaceLeft;
              this.placementStr = 'left';
            }
          }
        } else if (this.placement === 'top' || this.placement === 'topLeft' || this.placement === 'topRight') {
          this.placementStr = 'top';
          if (this.placement === 'topLeft') {
            this.placementStr = 'topLeft';
          } else if (this.placement === 'topRight') {
            this.placementStr = 'topRight';
          }
          if (this.popperInitialHeight > spaceTop - 15) {
            if (this.popperInitialHeight <= spaceBottom + 15) {
              // console.log('111----------------=============')
              this.contraryVertical = spaceBottom;
              this.placementStr = 'bottom';
              if (this.placement === 'topLeft') {
                this.placementStr = 'bottomLeft';
              } else if (this.placement === 'topRight') {
                this.placementStr = 'bottomRight';
              }
            } else if (spaceBottom > spaceTop) {
              // console.log('222----------------=============')
              this.contraryVertical = spaceBottom;
              this.placementStr = 'bottom';
              if (this.placement === 'topLeft') {
                this.placementStr = 'bottomLeft';
              } else if (this.placement === 'topRight') {
                this.placementStr = 'bottomRight';
              }
            } else {
              // console.log('333----------------=============')
              this.contraryVertical = spaceTop;
              this.placementStr = 'top';
              if (this.placement === 'topLeft') {
                this.placementStr = 'topLeft';
              } else if (this.placement === 'topRight') {
                this.placementStr = 'topRight';
              }
            }
          }
        } else if (this.placement === 'bottom' || this.placement === 'bottomLeft' || this.placement === 'bottomRight') {
          this.placementStr = 'bottom';
          if (this.placement === 'bottomLeft') {
            this.placementStr = 'bottomLeft';
          } else if (this.placement === 'bottomRight') {
            this.placementStr = 'bottomRight';
          }
          if (this.popperInitialHeight > spaceBottom - 15) {
            if (this.popperInitialHeight <= spaceTop + 15) {
              this.contraryVertical = spaceTop;
              this.placementStr = 'top';
              if (this.placement === 'bottomLeft') {
                this.placementStr = 'topLeft';
              } else if (this.placement === 'bottomRight') {
                this.placementStr = 'topRight';
              }
            } else if (spaceBottom > spaceTop) {
              this.contraryVertical = spaceBottom;
              this.placementStr = 'bottom';
              if (this.placement === 'bottomLeft') {
                this.placementStr = 'bottomLeft';
              } else if (this.placement === 'bottomRight') {
                this.placementStr = 'bottomRight';
              }
            } else {
              this.contraryVertical = spaceTop;
              this.placementStr = 'top';
              if (this.placement === 'bottomLeft') {
                this.placementStr = 'topLeft';
              } else if (this.placement === 'bottomRight') {
                this.placementStr = 'topRight';
              }
            }
          }
        }
        // console.log(this.placementStr, 'this.placementStr');
        if (offsetObj2.right >= 0 && offsetObj2.left <= document.documentElement.clientWidth && offsetObj2.top <= document.documentElement.clientHeight && offsetObj2.bottom >= 0) {
          this.popWidthHeightFun(reference, popper);
        }
        // console.log(this.placementStr, 'placementStr');
      }
    },
    computePosition() {
      let reference = this.getReference();
      const popper = this.popper || this.$refs.popper;
      this.handleScroll(reference, popper);
    },
    // 浏览器滚动事件
    handleScroll(reference, popper) {
      // console.log('handleScroll',reference, popper);
      if (!this.disabled && this.showPopper) {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
        if (this.tagName === 'DIV') {
          // console.log(this.target.scrollTop,this.target.scrollLeft,'handleScroll');
          scrollTop = this.target.scrollTop;
          scrollLeft = this.target.scrollLeft;
        }
        // console.log('handleScroll',  scrollTop, scrollLeft);
        setTimeout(() => {
          this.placementStrFun(reference, popper);
        }, 0);
        setTimeout(() => {
          // console.log('handleScroll',document.getElementById(this.tooltipId));
          if (document.getElementById(this.tooltipId)) {
            this.positionFun(reference, popper, scrollTop, scrollLeft);
          }
        }, 5);
      }
    },
    doToggle() {
      // console.log('doToggle');
      this.showPopper = !this.showPopper;
    },
    creatDOM() {
      const aNode = document.getElementById(this.tooltipId);
      // 然后判断该元素节点是不是当前文档页面body节点的后代
      // console.log(aNode, aNode.parentNode.tagName, 'aNode');
      if (aNode.parentNode.tagName.toUpperCase() !== 'BODY') {
        const popper = this.popper || this.$refs.popper;
        document.body.appendChild(popper);
      }
    },
    removeDOM() {
      const popper = this.popper || this.$refs.popper;
      // console.log(popper, 'popper removeDOM');
      document.body.removeChild(popper);
    },
    doShow() {
      // console.log('doShow--------');
      this.showPopper = true;
    },
    doClose() {
      // console.log('doClose--------');
      this.showPopper = false;
    },
    handleFocus() {
      // console.log('handleFocus--------');
      if (this.trigger === 'click' || this.trigger === 'focus') this.showPopper = true;
    },
    handleClick() {
    },
    handleBlur() {
      // console.log('handleBlur--------');
      if (this.trigger === 'click' || this.trigger === 'focus') this.showPopper = false;
    },
    handleKeydown(ev) {
      if (ev.keyCode === 27 && this.trigger !== 'manual') { // esc
        this.doClose();
      }
    },
    handleMouseEnter() {
      // console.log('handleMouseEnter--------');
      clearTimeout(this._timer);
      if (this.openDelay) {
        this._timer = setTimeout(() => {
          this.showPopper = true;
        }, this.openDelay);
      } else {
        this.showPopper = true;
      }
    },
    handleMouseLeave() {
      // console.log('handleMouseLeave-------');
      clearTimeout(this._timer);
      if (this.closeDelay) {
        this._timer = setTimeout(() => {
          this.showPopper = false;
        }, this.closeDelay);
      } else {
        this.showPopper = false;
      }
    },
    handleDocumentClick(e) {
      // console.log('handleDocumentClick');
      let reference = this.getReference();
      const popper = this.popper || this.$refs.popper;
      if (!this.$el ||
        !reference ||
        this.$el.contains(e.target) ||
        reference.contains(e.target) ||
        !popper ||
        popper.contains(e.target)) return;
      this.showPopper = false;
    },
    cleanup() {
      if (this.openDelay || this.closeDelay) {
        clearTimeout(this._timer);
      }
    },
    off(element, event, handler) {
      // console.log(element,'off');
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    },
    on(element, event, handler) {
      // console.log(element, event, handler, 'on');
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    }
  }
};
</script>

<style lang="less" scoped>

</style>
