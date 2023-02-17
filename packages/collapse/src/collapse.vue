<template>
  <div class="dj-collapse">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'dj-collapse',
  components: {},
  provide() {
    return {
      'collapse': this
    };
  },
  props: {
    value: {
      type: [String, Array]
    },
    accordion: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {
    value: {
      handler(val) {
        this.toggleEachItem(val);
      },
      immediate: true,
      deep: true
    }
  },
  created() {},
  mounted() {
    this.toggleEachItem(this.value);
  },
  methods: {
    toggleEachItem(value) {
      const len = this.$children.length;
      for (let i = 0; i < len; i++) {
        const item = this.$children[i];
        if (value && typeof value === 'string' && value === item.code) {
          item.showContent = true;
        } else if (value && Array.isArray(value) && value.includes(item.code)) {
          item.showContent = true;
        } else {
          item.showContent = false;
        }
      }
    },
    toggleItemAccordion(code) {
      this.$emit('input', code);
    }
  }
};
</script>
<style lang="less" scoped></style>
