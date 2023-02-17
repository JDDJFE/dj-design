<template>
  <li @click="handleChooseLi($event)"
    :class="{
      'is-disabled-option':isDisabled,
      'is-word-break':isWordBreak
    }"
  >
  <i class="iconfont" :class="icon" v-if="icon" :style="{fontSize: size}"></i>
  <slot></slot>
  <template v-if="!$slots.default">{{label}}</template>
  </li>
</template>

<script>
export default {
  name: 'djDropdownItem',
  data(){
    return {
    };
  },
  props: {
    value: {
      type: [String, Number]
    },
    size: {
      type: String,
      default: '16px'
    },
    icon: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isDisabled(){
      return this.disabled;
    },
    isWordBreak() {
      return this.$parent.$parent.wordBreak;
    }
  },
  watch: {

  },
  methods: {
    handleChooseLi(val) {
      if (this.isDisabled) return;
      this.$parent.$parent.$parent.$emit('handleOptionClick', this.$options.propsData.value, this.$options.propsData);
    }
  },
  created(){
  }
};
</script>
