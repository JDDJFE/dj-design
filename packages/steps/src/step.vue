<template>
  <div
    class="dj-step-item"
    :class="[
      `is-${$parent.direction}`,
      isSimple && 'is-simple',
      `is-${currentStatus}`,
      icon && 'dj-step-item-custom'
      // isLast && !space && !isCenter && 'is-flex',
      // isCenter && !isVertical && !isSimple && 'is-center'
     ]">
    <div class="dj-step-item-container">
      <div class="dj-step-item-tail"></div>
      <div class="dj-step-item-icon">
        <slot
          v-if="(currentStatus !== 'success' && currentStatus !== 'finish' && currentStatus !== 'error') || icon"
          name="icon">
          <i v-if="icon && !isSimple" class="iconfont" :class="[icon]"></i>
          <div class="dj-step-icon" v-if="!icon && !isSimple">{{ index + 1 }}</div>
        </slot>
        <i
          v-else-if="!isSimple"
          :class="[((currentStatus === 'success'||currentStatus === 'finish') ? 'check' : 'close')]"
          class="iconfont is-status"
        ></i>
        <span v-if="isSimple" class="dj-step-icon-dot"></span>
      </div>
      <div class="dj-step-item-content">
        <div class="dj-step-item-title">
          {{title}}
          <div v-if="subTitle" :title="subTitle" class="dj-step-item-subtitle">{{subTitle}}</div>
        </div>
        <div class="dj-step-item-des">{{description}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'djStep',
  props: {
    direction: {
      type: String,
      default: 'horizontal'
    },
    title: String,
    subTitle: String,
    description: String,
    status: String,
    icon: String
  },
  data() {
    return {
      index: -1,
      internalStatus: ''
    };
  },
  computed: {
    isSimple() {
      return this.$parent.simple;
    },
    currentStatus() {
      return this.status || this.internalStatus;
    },
    prevStatus() {
      const prevStep = this.$parent.steps[this.index - 1];
      return prevStep ? prevStep.currentStatus : 'wait';
    }
  },
  beforeCreate() {
    this.$parent.steps.push(this);
  },
  beforeDestroy() {
    const steps = this.$parent.steps;
    // console.log(steps,'steps');
    const index = steps.indexOf(this);
    if (index >= 0) {
      steps.splice(index, 1);
    }
  },
  mounted() {
    const unwatch = this.$watch('index', val => {
      this.$watch('$parent.active', this.updateStatus, {immediate: true});
      this.$watch('$parent.processStatus', () => {
        const activeIndex = this.$parent.active;
        this.updateStatus(activeIndex);
      }, {immediate: true});
      unwatch();
    });
  },
  methods: {
    updateStatus(val) {
      // const prevChild = this.$parent.$children[this.index - 1];
      if (val > this.index) {
        this.internalStatus = this.$parent.finishStatus;
      } else if (val === this.index && this.prevStatus !== 'error') {
        this.internalStatus = this.$parent.processStatus;
      } else {
        this.internalStatus = 'wait';
      }
      // console.log(this.internalStatus, this.index, this.currentStatus, 'updateStatus');
      // if (prevChild) prevChild.calcProgress(this.internalStatus);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
