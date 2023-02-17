<template>
  <div class="dj-radio-group">
    <slot></slot>
  </div>
</template>
<script>

export default {
  name: 'djRadioGroup',
  componentName: 'djRadioGroup',
  props: {
    value: {},
    border: {
      type: Boolean,
      default: false
    },
    button: {
      type: Boolean,
      default: false
    },
    buttonStyle: {
      type: String,
      default: 'solid'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String
    }
  }
};
</script>


