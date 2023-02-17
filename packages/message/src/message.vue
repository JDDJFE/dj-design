<template>
    <transition name="fade">
      <div class="dj-message-in" :class="{[type]: type}">
        <div v-if="!vnode" class="dj-message-content">
          <p>{{ message }}</p>
        </div>
        <div v-else v-html="message" class="dj-message-content"></div>
      </div>
    </transition>
</template>

<script>

const typeEnum = {
  success: 'check-filled',
  warning: 'info-filled',
  info: 'info-filled',
  error: 'close-filled'
};
export default {
  data(){
    return {
      type: 'info',
      close: true,
      center: false,
      vnode: false
    };
  },
  computed: {
    isIcon() {
      return typeEnum[this.type];
    }
  },
  created(){
    window.addEventListener('popstate', this.popstate, false);
  },
  methods: {
    popstate() {
      let els=document.getElementsByClassName('dj-message');
      if (els){
        for (let i=0;i<els.length;i++){
          document.body.removeChild(els[i]);
        }
      }
    }
  }
};
</script>

<style scoped lang="less">

</style>
