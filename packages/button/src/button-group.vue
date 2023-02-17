<template>
<div class="dj-button-group">
  <slot></slot>
</div>
</template>

<script>
export default {
  name: 'djButtonGroup',
  componentName: 'djButtonGroup',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String
    }
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
  }
};
</script>
