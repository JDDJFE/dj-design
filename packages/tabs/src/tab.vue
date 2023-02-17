<template>
  <div class="dj-tab" :class="[`dj-tab-inner_${tabPosition}`]">
    <div class="dj-tab-content" v-if="tabPosition == 'bottom'">
      <slot :border="border" />
    </div>
    <div class="dj-tab-inner" ref="bar">
      <ul
        class="dj-tab-nav"
        :class="!isPosition && `dj-tab--${type}`"
      >
      <li class="active-bar" :style="barStyle" v-if="type == 'border' || isPosition"></li>
        <template v-for="item in $slots.default">
          <li
            v-if="item.componentOptions && item.componentOptions.tag == 'dj-tab-pane'"
            :key='item.componentOptions.propsData.name'
            :class="{ 'is-active':item.componentOptions.propsData.name === value }"
            @click="handClick($event,item.componentOptions.propsData.name,item.componentOptions.propsData.label)"
          >
            <dj-icon
              fontSize="16px"
              v-if="item.componentOptions.propsData.icon"
              :icon='item.componentOptions.propsData.icon'/>
            <template>{{item.componentOptions.propsData.label}}</template>
            <div v-if="item.componentOptions.children && item.componentOptions.children[0].data && item.componentOptions.children[0].data.slot === 'tab'">
              <RenderDom
                :vNode="item.componentOptions.children[0]">
              </RenderDom>
            </div>
          </li>
        </template>
      </ul>
    </div>
    <div class="dj-tab-content" v-if="tabPosition == 'top' || tabPosition == ''|| isPosition">
      <slot :border="border"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'djTab',
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    type: {
      type: [String],
      default: 'border'
    },
    border: {
      type: [Boolean],
      default: false
    },
    visible: {
      type: [Boolean],
      default: false
    },
    tabPosition: {
      type: [String],
      default: 'top'
    },
    lazy: {
      type: [Boolean],
      default: false
    }
  },
  data() {
    return {
      currentName: this.value,
      navList: [],
      self: null
    };
  },
  components: {
    RenderDom: {
      props: {
        vNode: [Array, String, Object, Number]
      },
      render(h) {
        if (typeof this.vNode === 'object') {
          return this.vNode;
        }
        return h('div', this.vNode);
      }
    }
  },
  computed: {
    barStyle(){
      if (this.self && this.isPosition) {
        let offset = this.self.target;
        return {
          'height': `${offset.offsetHeight}px`,
          'transform': `translateY(${offset.offsetTop}px)`
        };
      }
      if (this.self && this.type == 'border'){
        let offset = this.self.target;
        return {
          'width': `${offset.offsetWidth}px`,
          'transform': `translateX(${offset.offsetLeft}px)`
        };
      }
      return {};
    },
    isPosition() {
      return this.tabPosition == 'left' || this.tabPosition == 'right';
    }
  },
  mounted() {
    this.type == 'border' && this.offsetAnmt();
  },
  methods: {
    refresh() {
      this.$nextTick(() => {
        this.offsetAnmt();
      });
    },
    offsetAnmt() {
      let dom = this.$refs.bar.querySelector('.is-active');
      if (dom){
        this.self = {
          target: {
            offsetWidth: dom.offsetWidth,
            offsetLeft: dom.offsetLeft,
            offsetHeight: dom.offsetHeight,
            offsetTop: dom.offsetTop
          }
        };
      }
    },
    handClick(e, name, label) {
      let old = {
        value: this.value
      };
      if (e.target.localName == 'li') this.self = e;
      this.$emit('input', name);
      this.$emit('tab-change', name, label, e, old);
      this.currentName = name;
    }
  },
  watch: {
    value(val){
      this.currentName = val;
      if (this.type == 'border') {
        this.$nextTick(()=>{
          this.offsetAnmt();
        });
      }
    }
  }
};
</script>
