<template>
  <div :class="['dj-image-mask', {'dj-image-mask-cursorP': maskPreview}]" @click="maskClick">
    <slot>
      <div class="dj-image-mask-operation" @click="imagePreviewFun">
        <i class="iconfont zoom-in"></i>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'djImageMask',
  props: {
    maskPreview: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    imagePreviewFun(e) {
      e = e || window.event;
      if (e.stopPropagation) { // W3C阻止冒泡方法
        e.stopPropagation();
      } else {
        e.cancelBubble = true; // IE阻止冒泡方法
      }
      this.$emit('imagePreviewFun');
    },
    maskClick() {
      if (this.maskPreview) {
        this.imagePreviewFun();
      }
      this.$emit('click');
    }
  }
};
</script>

<style scoped lang="less">

</style>
