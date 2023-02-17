<template>
  <div :class="classList" :style="style">
    <slot></slot>
  </div>
</template>

<script>
const prefix = 'dj-row';
export default {
  name: 'djRow',
  provide() {
    return {
      'rowContext': this
    };
  },
  props: {
    type: String,
    span: Number,
    gutter: {
      type: Number,
      default: 0
    }
  },
  data(){
    return {
    };
  },
  computed: {
    classList(){
      return [
        prefix
      ];
    },
    style(){
      return this.gutter && this.gutter > 0 ? {
        'margin-left': `-${this.gutter/2}px`,
        'margin-right': `-${this.gutter/2}px`
      } : {};
    }
  }
};
</script>

<style>

</style>
