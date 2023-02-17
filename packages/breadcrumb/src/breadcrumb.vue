<template>
  <div class="dj-breadcrumb">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'djBreadcrumb',
  props: {
    separator: {
      type: String,
      default: '/'
    },
    separatorClass: {
      type: String,
      default: ''
    }
  },
  provide() {
    return {
      djBreadcrumb: this
    };
  },
  mounted() {
  }
};
</script>

<style lang="less" scoped>
</style>
