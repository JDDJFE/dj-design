<template>
  <div :class="classList" :style="style">
    <slot></slot>
  </div>
</template>

<script>
const prefix = 'dj-col';
export default {
  name: 'djCol',
  inject: ['rowContext'],
  data(){
    return {
    };
  },
  props: {
    span: Number,
    offset: Number,
    push: Number,
    pull: Number,
    xs: Number,
    sm: Number,
    md: Number,
    order: Number
  },
  computed: {
    classList(){
      let sizeType = ['xs', 'sm', 'md', 'lg', 'span', 'offset', 'push', 'pull'];
      let typeClass = { [prefix]: true};
      sizeType.forEach((type) =>{
        let size = this[type];
        let temp = {};
        if (typeof size === 'number'){
          temp = {
            [`${prefix}-${type}-${size}`]: true
          };
        }
        typeClass = {...typeClass, ...temp};
      });
      return typeClass;
    },
    style(){
      let order = this.order;
      let gutter = this.rowContext.gutter;
      let baseStyle = {
        'order': `${order !== void 0 && order }`
      };
      let pdStyle = {};
      if (gutter > 0){
        pdStyle = {
          'padding-left': `${gutter/2}px`,
          'padding-right': `${gutter/2}px`
        };
      }
      return {...baseStyle, ...pdStyle};
    }
  }
};
</script>

<style>

</style>
