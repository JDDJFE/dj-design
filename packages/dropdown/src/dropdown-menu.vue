<template>
<!--  <transition name="dj-zoom-in-top"  scope="props">-->
<!--    <div class="dj-select-down-box" ref="dropdown" :class="{'is-focus':$parent.isFocus}" v-show="$parent.isFocus">-->
<!--      <div class="jiao"></div>-->
  <dj-popover
    className="dj-down-popover"
    v-if="triggerElm"
    :trigger="trigger"
    ref="popoverItem"
    :reference="triggerElm"
    :visible.sync="visible"
    append-to-body
    :placement="placement">
              <!-- <div class="dj-select-down-box"> -->
    <div class="dj-dropdown-menu" slot="content">
      <ul class="dj-select-down-ul">
        <slot></slot>
      </ul>
    </div>
    <!-- </div> -->
  </dj-popover>
<!--    </div>-->
<!--  </transition>-->
</template>

<script>
export default {
  name: 'djDropdownMenu',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    placement: {
      type: [String],
      default: 'bottom'
    }
  },
  inject: ['djDropdown'],
  data() {
    return {
      triggerElm: null,
      trigger: '',
      visible: false
    };
  },
  methods: {
  },
  mounted() {
    this.$nextTick(() => {
      this.triggerElm = this.djDropdown?.triggerElm;
      this.trigger = this.djDropdown?.trigger;
    });
  }
};
</script>

<style lang="less">
</style>
