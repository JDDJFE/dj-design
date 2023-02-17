<template>
  <ul class="dj-select-group__wrap"  v-show="visible">
    <li class="dj-select-option-group">{{label}}</li>
    <li>
      <ul>
        <slot></slot>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'djOptionGroup',
  data(){
    return {
      visible: true
    };
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    group: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    queryGroupChange(val) {
      this.visible = this.$children.some(option => option.visible);
    }
  }
};
</script>
