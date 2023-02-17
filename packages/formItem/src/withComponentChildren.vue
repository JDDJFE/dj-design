<script>
export default {
  name: 'djWithComponentChildren',
  props: {
    item: Object,
    disabled: Boolean
  },
  render(h, cxt) {
    let item = this.item;
    let _this = this;
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
          // eslint-disable-next-line no-undefined
          if (item.componentOptions.propsData.disabled !== undefined) {
            $props = {};
          }
          item.componentOptions.children && (item.componentOptions.children[0].context = this._self);
          return h(WrappedComponent, {
            on: item.componentInstance && item.componentInstance.$listeners || null,
            props: Object.assign({}, item.componentInstance.$props, $props),
            // 透传 scopedSlots
            scopedSlots: item.componentInstance.$scopedSlots,
            attrs: item.componentInstance.$attrs,
            class: item.data.staticClass,
            style: item.data.staticStyle,
            slot: item.componentInstance.$slots
          }, item.componentOptions.children);
        }
      };
    };
    let withDom = function(dom) {
      return {
        render(h) {
          return h(item.tag, {
            on: item.data && item.data.on,
            class: item.data && item.data.staticClass,
            style: item.data && item.data.staticStyle
          }, item.children);
        }
      };
    };
    let djFromItemContent = item.componentOptions ? withComponent(item.componentOptions.Ctor.extendOptions) : withDom(item);
    return h(djFromItemContent, {});
  }
};
</script>
