<template>
  <div v-if="showModal" class="dj-modal-background" :class="(showModal && 'dj-modal-visible ' || '') + (firstModal && 'dj-modal-show ' || '') + getBackground" @click="(closable !== false && close($event))">
    <transition>
      <div class="dj-modal" :class="(border !== false && 'dj-modal-border ' || '') + (basic !== false && 'dj-modal-basic ' || '') + getSize" :style="(width && `width: ${width};` || '') + (height && `height: ${height};` || '') + (maxheight && `max-height: ${maxheight};` || '')">
        <div class="dj-modal-header" :class="showclose && 'dj-modal-close' || ''">
          <slot name="header">{{title}}</slot>
          <div v-if="showclose" class="dj-modal-close" @click="close()"><dj-icon icon="close"></dj-icon></div>
        </div>
        <div class="dj-modal-content" :style="(width && `width: ${width};` || '') + (height && `height: calc(${height} - 105px);`) + (maxheight && `max-height: calc(${maxheight} - 105px);` || '')">
          <slot></slot>
        </div>
        <div v-if="showfooter" class="dj-modal-footer">
          <slot name="footer">
            <dj-button v-if="showcancel" @click="onCancel">{{canceltext}}</dj-button>
            <span v-if="showcancel && showok" class="spacing"></span>
            <dj-button v-if="showok" type="primary" @click="onOk">{{oktext}}</dj-button>
          </slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import * as dom from '@/utils/dom';
import loading from '@/mixins/loading';

export default {
  name: 'djModal',
  components: {
  },
  props: {
    title: {
      type: String,
      default: '标题'
    },
    visible: {
      type: Boolean,
      default: false
    },
    size: { // 窗口尺寸
      type: String,
      default: 'mini' // mini tiny small large full
    },
    width: String,
    height: String,
    maxheight: String,
    showfooter: {
      type: Boolean,
      default: true
    },
    showok: {
      type: Boolean,
      default: true
    },
    ok: Function,
    oktext: {
      type: String,
      default: '确定'
    },
    showcancel: {
      type: Boolean,
      default: true
    },
    cancel: Function,
    canceltext: {
      type: String,
      default: '取消'
    },
    showclose: {
      type: Boolean,
      default: true
    },
    beforeClose: Function,
    closable: { // 点击遮罩层关闭
      type: Boolean,
      default: false
    },
    basic: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean
    },
    background: {
      type: String,
      default: 'black' // black white
    }
  },
  data() {
    return {
      showModal: this.visible,
      firstModal: true
    };
  },
  computed: {
    getBackground() {
      return `dj-modal-background-${this.background}`;
    },
    getSize() {
      return `dj-modal-${this.size}`;
    }
  },
  watch: {
    visible: function(n, o) {
      if (this.visible) {
        this.show();
      } else {
        this.hide();
      }
    },
    loading: function(n, o) {
      this.initLoading();
    }
  },
  created(){
    window.addEventListener('popstate', this.popstate, false);
  },
  mounted() {
    this.initModal();
  },
  methods: {
    popstate() {
      let els=document.getElementsByClassName('dj-modal-background');
      if (els){
        for (let i=0;i<els.length;i++){
          document.body.removeChild(els[i]);
        }
      }
    },
    initModal() {
      if (this.showModal) {
        const body = document.querySelector('body');
        body.querySelectorAll(`.dj-modal-background.${this.getBackground}.dj-modal-visible`).forEach(el => {
          if (this.$el != el) {
            dom.removeClass(el, this.getBackground);
            dom.removeClass(el, 'dj-modal-show');
          }
        });
        body.append(this.$el);
      }
    },
    show(callback) {
      setTimeout(() => {
        this.firstModal = !document.querySelector('body .dj-modal-background.dj-modal-visible');
        this.showModal = true;
        this.$emit('update:visible', true);
        this.initModal();
        if (this.loading) {
          this.showLoading();
        }
        callback && callback();
      }, 0);
    },
    close($event) {
      // console.log('close');
      if ($event && $event.target != this.$el) {
        return false;
      }
      if (!this.showModal) {
        return false;
      }
      if (this.beforeClose && this.beforeClose(this.close) === false) {
        return false;
      }
      this.$emit('close');
      const body = document.querySelector('body');
      let modal = this.$el.querySelector('.dj-modal');
      dom.addClass(modal, 'dj-modal-hide');
      if (body.querySelectorAll('.dj-modal-background.dj-modal-visible').length <= 1) {
        dom.addClass(this.$el, 'dj-modal-hide');
      }

      setTimeout(() => {
        this.$emit('closed');
        this.showModal = false;
        this.$emit('update:visible', false);
        this.$nextTick(() => {
          let lastModal = body.querySelectorAll('.dj-modal-background.dj-modal-visible');
          if (lastModal.length) {
            dom.addClass(lastModal[lastModal.length - 1], this.getBackground);
          }
          // dom.removeChild(document.querySelector('body'), this.$el);
        });
      }, 300);
    },
    hide() {
      this.close();
    },
    onOk() {
      if (this.ok && this.ok(this.close) === false) {
        return false;
      }
      this.close();
    },
    onCancel() {
      if (this.cancel && this.cancel(this.close) === false) {
        return false;
      }
      this.close();
    },
    initLoading() {
      if (this.loading) {
        this.showLoading();
      } else {
        this.closeLoading();
      }
    },
    showLoading() {
      this.$emit('update:loading', true);
      setTimeout(() => {
        this.$el.querySelector && loading.methods.showLoading({el: this.$el.querySelector('.dj-modal'), white: true});
      }, 10);
    },
    closeLoading() {
      this.$emit('update:loading', false);
      setTimeout(() => {
        this.$el.querySelector && loading.methods.closeLoading({el: this.$el.querySelector('.dj-modal')});
      }, 10);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
