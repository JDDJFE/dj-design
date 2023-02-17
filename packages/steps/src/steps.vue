<template>
  <div
    class="dj-steps"
    :class="[
       'dj-steps-' + direction,
       simple && 'dj-steps-simple',
       size==='small' && 'dj-steps-small',
       simple && direction === 'horizontal' ? 'dj-steps-label-vertical':''
     ]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'djSteps',
  props: {
    active: {
      type: Number,
      default: 0
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    simple: Boolean,
    finishStatus: {
      type: String,
      default: 'finish'
    },
    processStatus: {
      type: String,
      default: 'process'
    },
    size: {
      type: String,
      default: 'default'
    }
  },
  data() {
    return {
      steps: []
    };
  },
  watch: {
    active(newVal, oldVal) {
      this.$emit('change', newVal, oldVal);
    },
    steps(steps) {
      steps.forEach((child, index) => {
        child.index = index;
      });
      // console.log(steps,'steps');
    }
  },
  mounted() {
    // console.log(this.steps,'steps');
  }
};
</script>

<style lang="less" scoped>
</style>
