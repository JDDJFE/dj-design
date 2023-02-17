<template>
  <span class="dj-breadcrumb-item">
    <span
      :class="['dj-breadcrumb-link', to ? 'active' : '']"
      ref="link"
      role="link">
      <slot></slot>
    </span>
    <i v-if="separatorClass" class="iconfont dj-breadcrumb-separator" :class="separatorClass"></i>
    <span v-else-if="separator" class="dj-breadcrumb-separator">{{separator}}</span>
  </span>
</template>

<script>
export default {
  name: 'djBreadcrumbItem',
  props: {
    to: {},
    replace: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      separator: '',
      separatorClass: ''
    };
  },
  inject: ['djBreadcrumb'],
  mounted() {
    this.separator = this.djBreadcrumb.separator;
    this.separatorClass = this.djBreadcrumb.separatorClass;
    const link = this.$refs.link;
    link.setAttribute('role', 'link');
    link.addEventListener('click', () => {
      const {to, $router} = this;
      if (!to || !$router) return;
      this.replace ? $router.replace(to) : $router.push(to);
    });
  }
};
</script>

<style lang="less" scoped>
</style>
