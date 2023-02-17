<template>
    <button
      @mouseout="hoverItem(false)"
      @mouseenter="hoverItem(true)"
      @focus="hoverItem(true)"
      :style="colorBox"
      :type="nativeType"
      class="dj-button"
      :class="[
        `dj-button--${type ? type : 'default'}`,
        getSize ? `dj-button--${getSize}` : '',
        {
          'is-disabled': getDisabled || loading,
          'is-round':round,
          'is-plain':plain,
          'is-fill':fill,
          'is-circle': circle,
          'is-square': square,
          'is-dashed': dashed,
          'is-error': error,
          'hover': hover
        }
      ]"
      :disabled="getDisabled || loading"
      @click="handleClick"
    >
      <div v-if="type !== 'text'" class="dj-button-hoverBack"></div>
      <div v-if="type !== 'text'" class="dj-button-focusBack"></div>
      <div v-if="type !== 'text'" class="dj-button-disabledBack"></div>
      <dj-icon icon="load" v-if="loading" :style="$slots.default ? {marginRight:'7px'} : {}"></dj-icon>
      <i class="iconfont" :style="$slots.default ? {fontSize:fontSize,marginRight:'7px'} : {fontSize:fontSize}"
         :class="icon" v-if="icon && !right && !loading"></i>
      <span v-if="$slots.default" class="dj-button-content"><slot></slot></span>
      <i class="iconfont" :style="$slots.default ? {fontSize:fontSize,marginLeft:'7px'} : {fontSize:fontSize}"
         :class="icon" v-if="icon && right && !loading"></i>
    </button>
</template>

<script>
export default {
  name: 'djButton',
  props: {
    size: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    loading: {
      type: Boolean,
      default: false
    },
    colors: {
      type: Array,
      default: ()=>{
        return [];
      }
    },
    fontSize: {
      type: String
    },
    hovers: {
      type: Array,
      default: ()=>{
        return [];
      }
    },
    icon: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    dashed: {
      type: Boolean,
      default: false
    },
    plain: {
      type: Boolean,
      default: false
    },
    fill: {
      type: Boolean,
      default: false
    },
    square: {
      type: Boolean,
      default: false
    },
    text: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hover: false,
      model: this.colors
    };
  },
  computed: {
    colorBox(){
      return {
        'color': this.model[0],
        'background': this.model[1],
        'borderColor': this.model[2]
      };
    },
    getSize() {
      return this.isGroup ? this.$parent.size || this.size: this.size;
    },
    getDisabled() {
      return this.isGroup ? this.$parent.disabled || this.disabled: this.disabled;
    },
    isGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== 'djButtonGroup') {
          parent = parent.$parent;
        } else {
          return parent;
        }
      }
      return false;
    }
  },
  methods: {
    handleClick(evt) {
      this.$emit('click', evt);
    },
    hoverItem(val) {
      if (this.error)
        return;
      let cl = this.colors;
      if (cl.length && this.plain)
        this.model = cl;
      if (this.hovers.length)
        this.model = val ? this.hovers : cl;
      this.hover = !this.plain && val;
    }
  }
};
</script>
