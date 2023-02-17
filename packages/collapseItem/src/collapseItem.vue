<template>
  <div class="dj-collapse-item">
    <div @click="toggleContent" class="dj-collapse-title-outer">
      <dj-icon class="dj-collapse-title-icon" :class="{ active: showContent }" icon="arrow-right"> </dj-icon>
      <slot name="title">
        <span>{{ title }}</span>
      </slot>
    </div>
    <div class="dj-collapse-content" v-show="showContent" :class="{ active: showContent }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dj-collapse-item',
  components: {},
  inject: ['collapse'],
  props: {
    title: {
      type: String,
      default: '折叠面板'
    },
    code: {
      type: [String, Number]
    }
  },
  data() {
    return {
      showContent: false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    toggleContent() {
      this.showContent = !this.showContent;
      this.collapse.$emit('change', this.code, this.showContent);
      if (this.collapse.accordion) {
        this.collapse.toggleItemAccordion(this.showContent ? this.code : null);
        return;
      }
      if (this.showContent) {
        this.collapse.value.push(this.code);
      } else {
        this.collapse.$emit('input', this.collapse.value.filter(item => item !== this.code));
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
