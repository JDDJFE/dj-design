<template>
  <div
    v-if="lazyIf"
    :class="{'dj-tab-border': $parent.border, 'is-none': !$parent.visible && !active, 'is-hidden': $parent.visible && !active}">
    <!-- <RenderDom :vNode="$slots.default"/> -->
    <slot v-if="lazyIf"></slot>
  </div>
</template>

<script>
export default {
  name: 'djTabPane',
  componentName: 'djTabPane',
  props: {
    label: {
      type: String,
      required: false
    },
    name: {
      type: [String, Number],
      required: true
    },
    icon: {
      type: String
    }
  },
  components: {
    // RenderDom: {
    //   props: {
    //     vNode: [Array, String, Object, Number]
    //   },
    //   render(h) {
    //     let vNode = this.vNode?.[0];
    //     if (!vNode.text) {
    //       return '';
    //     }
    //     if (vNode.text == 'fdsafdsafdsafdsa' && this.$parent.value == 2) {
    //       return vNode;
    //     }
    //     if (typeof vNode === 'object') {
    //       return vNode;
    //     }
    //     return h('div', vNode);
    //   }
    // }
  },
  data() {
    return {
    };
  },
  computed: {
    active() {
      return this.$parent.value == this.name;
    },
    lazyIf() {
      if (!this.$parent.lazy) {
        return true;
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.node = {
        [this.name]: this.$slots.default
      };

      if (this.node[this.$parent.value]) {
        return true;
      }
      return false;
    }
  }
};
</script>
