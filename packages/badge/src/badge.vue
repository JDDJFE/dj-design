<template>
  <div
    :class="['f12', 'dj-badge', border && 'dj-badge-border', $slots.default ? 'dj-badge-default' : 'dot']"
    :style="[ { 'background': $slots.default ? '' : color }, getType=='dot' && !$slots.default ? getwhStyle : {} ]"
    @click="handleClick(value)">
    <slot></slot>
    <span
      v-if="$slots.default"
      :class="'f12 dj-badge-' + getType"
      :style="[ { 'background': color }, getPositionStyle, getwhStyle, { lineHeight: this.getLineHeight } ]">
      <span :style="{'fontSize': fontSize + 'px'}" v-if="value && max">{{Number(value) > Number(max) ? max + "+" : value}}</span>
      <span :style="{'fontSize': fontSize + 'px'}" v-else>{{value}}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'djBadge',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    border: Boolean,
    max: {
      type: [String, Number],
      default: ''
    },
    fontSize: {
      type: Number,
      default: 14
    },
    whStyle: {
      type: Object
    },
    positionStyle: {
      type: Object
    }
  },
  computed: {
    getType() {
      return this.value ? 'yuan' : 'dot';
    },
    getPositionStyle() {
      // let shortBandge = /^\d{1}$/.test(this.value) || /^[a-zA-Z]$/.test(this.value);
      let right = '';
      if (this.whStyle?.width) {
        right = `${parseInt(this.whStyle.width) / 2}px`;
      }
      let obj = this.getType == 'yuan' ? {
        right: this.border ? '10px' : '10px',
        top: ''
      } : {
        right: right || '4px',
        top: ''
      };
      return this.positionStyle || obj;
    },
    getwhStyle() {
      // let shortBandge = /^\d{1}$/.test(this.value) || /^[a-zA-Z]$/.test(this.value);
      let shortBandge = /^.{1}$/.test(this.value);
      let obj = this.getType == 'yuan' ? {
        width: shortBandge ? '21px' : '',
        height: '20px'
      } : {
        width: '8px',
        height: '8px'
      };
      // console.log('111',this.whStyle.height);
      return this.whStyle || obj;
    },
    getLineHeight() {
      if (this.getwhStyle.height) {
        let height = parseInt(this.getwhStyle.height) - 2;
        return height + 'px';
      }
      return '';
    }
  },
  methods: {
    handleClick(evt) {
      this.$emit('click', evt);
    }
  }
};
</script>
<style lang="less" scoped>


</style>
