<template>
  <div class="slot-component">
    <div class="none"><slot/></div>
    <template v-if="!isLoad" v-for="(slot, index) in $slots.default">
      <withComponentChildren :key="index" :item="slot" :disabled="disabled" @change="onEvent"/>
    </template>
  </div>
</template>
<script>
// import withComponentChildren from './withComponentChildren';

const withComponentChildren = {
  name: 'djWithComponentChildren',
  props: {
    item: Object,
    disabled: Boolean
  },
  render(h, cxt) {
    let item = this.item;
    let _this = this;

    // 处理静态class 与动态class融合
    let staticClass = item.data && item.data.class || {};
    if (item.data && item.data.staticClass) {
      item.data.staticClass.split(' ').forEach(c => {
        if (!staticClass.hasOwnProperty(c)) {
          staticClass[c] = true;
        }
      });
    }

    let withComponent = function(WrappedComponent) {
      return {
        mounted() {
        },
        props: WrappedComponent.props,
        render(h) {
          let $props = Object.assign(_this.$props);
          Object.keys($props).forEach(key => {
            if (key != 'disabled') {
              delete $props[key];
            }
          });
          if (item.componentOptions.propsData.disabled !== void 0) {
            $props = {};
          }
          item.componentOptions?.children && item.componentOptions?.children[0] && (item.componentOptions.children[0].context = this._self);
          // console.log(item, item.componentOptions.children);
          return h(WrappedComponent, {
            on: Object.assign({}, item.componentInstance.$listeners, {change: function() {
              item.componentInstance && item.componentInstance.$listeners && item.componentInstance.$listeners.change && item.componentInstance.$listeners.change.apply(this, arguments);
              _this.$listeners.change.apply(this, arguments);
            }}),
            props: Object.assign({}, item.componentInstance.$props, $props),
            // 透传 scopedSlots
            scopedSlots: item.componentInstance.$scopedSlots,
            attrs: item.componentInstance.$attrs,
            class: staticClass,
            style: item.data.staticStyle,
            slot: item.componentInstance.$slots
          }, item.componentOptions.children);
        }
      };
    };
    // if (item.componentOptions && item.componentOptions.tag == 'dj-input')
    //   console.log(item);
    let withDom = function(dom) {
      return {
        render(h) {
          return h(item.tag, {
            on: item.data && item.data.on,
            class: staticClass,
            style: item.data && item.data.staticStyle
          }, item.children);
        }
      };
    };
    let djFromItemContent = item.componentOptions ? withComponent(item.componentOptions.Ctor.extendOptions) : withDom(item);
    return h(djFromItemContent, {});
  }
};

export default {
  name: 'djWithComponent',
  components: {withComponentChildren},
  props: {
    slotsDefault: Array,
    disabled: Boolean
  },
  data() {
    return {
      isLoad: true,
      updateCount: 0,
      oldSlotsDefault: []
    };
  },
  created() {
    this.$slots.default = this.slotsDefault;
    this.oldSlotsDefault = this.slotsDefault;
  },
  watch: {
    slotsDefault: function() {
      // 判断元素是否发生变化，发生变化则刷新
      let isRefrash = this.oldSlotsDefault && this.oldSlotsDefault.length != this.slotsDefault.length;
      if (!isRefrash) {
        this.slotsDefault.forEach((slot, index) => {
          if (!this.oldSlotsDefault || !this.oldSlotsDefault[index] || this.oldSlotsDefault[index].tag && this.oldSlotsDefault[index].tag.indexOf('vue-') == 0 && !this.oldSlotsDefault[index].componentInstance) {
            isRefrash = true;
            return;
          }
          // 判断元素_uid是否发生变化，发生变化则刷新
          if (slot.componentInstance && slot.componentInstance._uid != this.oldSlotsDefault[index].componentInstance._uid) {
            isRefrash = true;
          }
          // select item长度发生变化刷新
          if (slot.componentOptions && slot.componentOptions.tag == 'dj-select' && (slot.componentOptions.children && slot.componentOptions.children.length) != (this.oldSlotsDefault[index].componentOptions.children && this.oldSlotsDefault[index].componentOptions.children.length)) {
            isRefrash = true;
          }
        });
      }

      this.$slots.default = this.slotsDefault;
      this.oldSlotsDefault = this.slotsDefault;
      if (isRefrash) {
        this.isLoad = true;
        this.$nextTick(() => {
          this.isLoad = false;
        });
      }
    }
  },
  beforeUpdate() {
    this.$slots.default = this.slotsDefault;
    this.oldSlotsDefault = this.slotsDefault;
  },
  updated() {
    if (this.$el.querySelector('.none')) {
      this.$el.removeChild(this.$el.querySelector('.none'));
    }
  },
  mounted() {
    this.isLoad = false;
    this.refrash();
  },
  methods: {
    onEvent(val, event) {
      this.$emit('change', val, event);
    },
    refrash() {
      this.isLoad = true;
      this.$parent.refrash();
      this.$nextTick(() => {
        this.isLoad = false;
      });
    }
  }
};
</script>

<style lang="less" scoped>
  .slot-component {
    display: inline;
    font-size: 0px;
  }
</style>
