<template>
  <span class="dj-tag"
        :class="[
          type && `dj-tag-theme`,
          type && `dj-tag-${type}`,
          size && `dj-tag-${size}`,
          effect && `dj-tag-${effect}`,
          color && `dj-tag-has-color`,
          checkable && `dj-tag-checkable`,
          checked && `dj-tag-checkable-checked`,
          circular && `dj-tag-circular`,
          disabled && `dj-tag-disabled`,
        ]"
        :style="
          color && effect==='dark'?
          `color:#fff; background-color:${color}; border-color:${color};`
          : color && effect==='plain'?
          `color:${color}; background-color:#fff; border-color:${color};`
          : color?
          `color:${color}; border:1px solid rgba(255,255,255,0);`
          :''
        "
        @click="handleClick"
  >
    <div v-if="color && !effect" class="dj-tag-color-bg" :style="`background-color:${color}`"></div>
    <div v-if="color && !effect" class="dj-tag-color-bg-border" :style="`border-color:${color}`"></div>
    <i v-if="icon" :class="['iconfont','dj-tag-icon',icon]"></i>
    <span class="disInB"><slot></slot></span>
    <!--    <slot></slot>-->
    <i v-if="closable" class="iconfont dj-tag-close close" @click="handleClose"></i>
  </span>
</template>

<script>
export default {
  name: 'djTag',
  props: {
    type: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    effect: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    closable: {
      type: Boolean,
      default: false
    },
    checkable: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    },
    circular: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClose(event) {
      event.stopPropagation();
      if (this.disabled) {
        return;
      }
      this.$emit('close', event);
    },
    handleClick(event) {
      event.stopPropagation();
      if (this.checkable) {
        if (this.disabled) {
          return;
        }
        this.$emit('change', !this.checked);
      } else {
        this.$emit('click');
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>
