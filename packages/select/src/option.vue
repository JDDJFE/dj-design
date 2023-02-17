<template>
  <li @click="handleChooseLi"
    :class="{
      'is-multiple':isMultiple,
      'is-select':isSelelct,
      'is-disabled-option':isDisabled || isLimit,
      'is-visible': visible
    }"
    v-show="visible"
  >
  <slot>{{label}}</slot>
  </li>
</template>

<script>
export default {
  name: 'djOption',
  inject: ['select'],
  data(){
    return {
      isSelelct: null,
      visible: true,
      empty: true
    };
  },
  props: {
    value: {
      default: ''
    },
    label: {
      default: ''
    },
    disabled: Boolean
  },
  computed: {
    isMultiple() {
      return this.$parent.multiple || this.$parent.$parent.multiple;
    },
    isLimit() {
      if (this.select.multiple && this.select.limit) {
        return !this.isSelelct && this.select.selected.length >= this.select.limit;
      }
      return false;
    },
    isDisabled(){
      return this.disabled || this.$parent.disabled;
    }
  },
  watch: {
    label: {
      handler: function(newVal,oldVal) {
        this.$parent.$parent?.slotUpdateHook?.();
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleChooseLi(){
      if (this.isDisabled || this.isLimit) return;
      let parent = this.$parent.$parent,
        parents = this.$parent.group ? parent.$parent : parent;
      parents.isFocus = parents.multiple || parents.multipleAll;
      parents.$emit('handleOptionClick', [...parents.checkArr, ...[this.$options.propsData]], this.$options.propsData);
    },
    handleOptionSelect(data){
      this.isSelelct = Array.isArray(data) ? data : [data].includes(this.value) ;
    },
    removeClassSelect(){
      this.isSelelct=null;
    },
    queryChange(query) {
      this.visible = query === null ? true : new RegExp(this.escapeRegexpString(query), 'i').test(this.label);
      if (!this.visible) {
        this.select.filterCount--;
      }
      this.$parent?.queryGroupChange?.();
    },
    escapeRegexpString(value = '') {
      return String(value).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
    }
  },
  created(){
    this.select.filterCount++;
    this.select.optionsCount++;
    this.$on('queryChange', this.queryChange);
    this.$on('chooseOption', this.handleOptionSelect);
    this.$on('removeClass', this.removeClassSelect);
  }
};
</script>
