<template>
  <i :class="!load && icon" class="iconfont" @click="handClick" :style="{fontSize: fontSize,color:fontColor, verticalAlign: 'middle'}">
    <svg v-if="load" :style="{fill:loadColor}" :width="loadW" :height="loadH">
      <use :xlink:href='`#icon-${icon}`'></use>
    </svg>
  </i>
</template>

<script>
import './svg';
export default {
  name: 'djIcon',
  props: {
    loadColor: {
      type: String,
      default: ''
    },
    fontSize: {
      type: String,
      default: ''
    },
    fontColor: {
      type: String,
      default: ''
    },
    loadW: {
      type: String,
      default: '30px'
    },
    loadH: {
      type: String,
      default: '30px'
    },
    load: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    }
  },
  methods: {
    handClick() {
      this.$emit('click', this);
    }
  }
};
</script>
