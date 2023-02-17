<template>
  <div
    class="dj-dropdown-group" :class="{'dj-dropdown-split': splitButton}">
    <dj-button :type="splitType" v-if="splitButton" :size="splitSize" @click="splitClick"><slot /></dj-button>
    <div class="dj-dropdown-inner">
      <template v-if="splitButton">
        <dj-button :type="splitType" v-if="splitButton" :size="splitSize" class="dj-dropdown-split_button" icon="arrow-bottom" ></dj-button>
        <slot name="dropdown"/>
      </template>
      <template v-else>
        <slot />
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'djDropdown',
  data(){
    return {
      times: null
    };
  },
  provide() {
    return {
      djDropdown: this
    };
  },
  props: {
    splitType: {
      type: String,
      default: 'primary'
    },
    trigger: {
      default: 'hover'
    },
    wordBreak: {
      type: Boolean,
      default: false
    },
    splitButton: {
      type: Boolean,
      default: false
    },
    splitSize: {
      type: [String],
      default: ''
    }
  },
  computed: {
    dropDownText() {
      return this.$slots?.default?.[0]?.text;
    }
  },
  beforeMount() {
  },
  mounted() {
    this.triggerElm = this.splitButton ? this.$el.querySelector('.dj-dropdown-split_button') : this.$slots?.default[0]?.elm;
    this.$on('handleOptionClick', this.handleOptionSelect);
  },
  methods: {
    handleOptionSelect(val, obj){
      this.$emit('change', val, obj);
      if (this.splitButton) {
        this.$slots.dropdown[0].child.visible = false;
      } else {
        this.$slots.default[1].child.visible = false;
      }
    },
    splitClick(){
      this.$emit('splitChange');
    }
  },
  watch: {
  }
};
</script>

<style lang="less">
</style>
