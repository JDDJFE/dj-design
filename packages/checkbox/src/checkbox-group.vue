<template>
  <div class="dj-checkbox-group">
    <slot></slot>
  </div>
</template>
<script>

export default {
  name: 'djCheckboxGroup',
  componentName: 'djCheckboxGroup',
  props: {
    button: {
      type: Boolean,
      default: false
    },
    buttonStyle: {
      type: String,
      default: 'solid'
    },
    border: {
      type: Boolean,
      default: false
    },
    size: { // 窗口尺寸
      type: String
    },
    value: {},
    maxlimit: Number,
    maxLimit: Number,
    minlimit: Number,
    minLimit: Number,
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>


