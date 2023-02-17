<template>
  <div class="dj-modal-background dj-message-box" :class="(visible && 'dj-modal-visible ' || '') + typeBackground + ' ' + className" v-show="visible" @click="(closable && handleAction(false))">
    <transition>
      <div class="dj-modal" :class="'dj-modal-' + size" @click.stop>
        <div class="dj-modal-header">
          <slot>
            <span v-if="!vnode">{{ title }}</span>
            <span v-else v-html="title"></span>
          </slot>
          <i class="iconfont close dj-modal-close"  @click.stop="handleAction(null)"  v-if="showclose"></i>
        </div>
        <div class="dj-modal-content">
          <dj-icon :icon="typeIcon" class="dj-message-type" v-if="type"></dj-icon>
          <slot>
            <div class="dj-message-inin">
              <span v-if="!vnode">{{ message }}</span>
              <span v-else v-html="message"></span>
            </div>
          </slot>
        </div>
        <div class="dj-modal-footer">
          <dj-button @click.stop="handleAction(false)" v-if="cancelButtonShow">{{canceltext}}</dj-button>
          <span class="spacing"></span>
          <dj-button type="primary" :loading="loading" :disabled="disabled" @click.stop="handleAction(true)">{{oktext}}</dj-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import * as dom from '@/utils/dom';
export default {
  data() {
    return {
      visible: false,
      title: null,
      message: '',
      beforeClose: null,
      canceltext: '取消',
      oktext: '确定',
      cancelButtonShow: true,
      vnode: false,
      background: 'black',
      closable: false,
      showclose: true,
      size: 'mini',
      loading: false,
      disabled: false,
      type: null,
      className: ''
    };
  },
  computed: {
    typeBackground() {
      let name = 'dj-modal-background-';
      return this.background === 'white' ? `${name}white` : `${name}black`;
    },
    typeIcon() {
      const { type } = this;
      return type === 'success' && 'check-filled' ||
      type === 'error' && 'close-filled' ||
      type === 'warning' && 'caution-filled' ||
      type === 'help' && 'help-filled';
    }
  },
  created(){
    window.addEventListener('popstate', this.popstate, false);
  },
  mounted(){
  },
  methods: {
    doClose() {
      this.createMsg();
      this.visible = false;
      this.popstate();
    },
    handleAction(action) {
      const body = document.querySelector('body');
      let modal = this.$el.querySelector('.dj-modal');

      this.action = action;
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(action, this, ()=>{
          if (action){
            this.ok && this.ok();
          } else {
            this.close && this.close();
          }
          dom.addClass(modal, 'dj-modal-hide');
          if (body.querySelectorAll('.dj-modal-background.dj-modal-visible').length <= 1) {
            dom.addClass(this.$el, 'dj-modal-hide');
          }
          // this.before = null;
          // this.loading = false;
          this.timerFn();
        });
      } else {
        if (action){
          this.ok && this.ok();
        } else {
          this.close && this.close();
        }
        dom.addClass(modal, 'dj-modal-hide');
        if (body.querySelectorAll('.dj-modal-background.dj-modal-visible').length <= 1) {
          dom.addClass(this.$el, 'dj-modal-hide');
        }
        this.callback(action, this);
        this.timerFn();
      }
    },
    timerFn(){
      setTimeout(() => {
        this.createMsg();
        this.visible = false;
        let timer = null;
        timer = setTimeout(() => {
          this.$el.parentNode !== null && document.body.removeChild(this.$el);
          clearTimeout(timer);
          timer = null;
        }, 1);
      }, 300);
    },
    popstate() {
      let els=document.getElementsByClassName('dj-modal-background');
      if (els){
        for (let i=0;i<els.length;i++){
          document.body.removeChild(els[i]);
        }
      }
    }
  }
};
</script>

<style scoped lang="less"></style>
