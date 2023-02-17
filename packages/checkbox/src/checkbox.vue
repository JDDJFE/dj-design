<template>
  <label
    class="dj-checkbox"
    :class="[
      radioSize && `is-size-${radioSize}`,
      { 'is-indeterminate': indeterminate },
      { 'is-disabled': isDisabled },
      { 'is-bordered': isBorder },
      { 'is-checked': isChecked },
      { 'is-button': isButton },
      isButton && `is-button-${buttonStyleStr}`
    ]">
    <span class="dj-checkbox-icon" v-if="!isButton"></span>
    <input
      class="dj-checkbox-original"
      type="checkbox"
      :disabled="isDisabled"
      :value="code"
      :name='name'
      v-model="model"
      @change="handleChange">
      {{$parent.length}}
    <span class="dj-checkbox-label" v-if="$slots.default">
      <slot></slot>
    </span>
  </label>
</template>
<script>
import Emitter from '@/mixins/emitter';
export default {
  name: 'djCheckbox',
  componentName: 'djCheckbox',
  props: {
    button: {
      type: Boolean,
      default: false
    },
    buttonStyle: {
      type: String,
      default: 'solid'
    },
    value: {},
    code: {},
    indeterminate: Boolean,
    disabled: Boolean,
    checked: [Boolean],
    name: String,
    border: {
      type: Boolean,
      default: false
    },
    size: {
      type: String
    }
  },
  mixins: [Emitter],
  data() {
    return {
      selfModel: false,
      codes: []
    };
  },
  computed: {
    radioSize(){
      return this.$parent.size || this.size;
    },
    model: {
      get() {
        return this.isGroup ?
          this.isGroup.value : this.value !== void 0 ?
            this.value : this.selfModel;
      },
      set(val) {
        if (this.isGroup) {
          this.dispatch('djCheckboxGroup', 'input', [val]);
          this.codes = this.isGroup.$children.reduce((r, e, i) => {
            if (val.includes(e.code) && e.$slots.default){
              r.push(e.$slots.default[0].text);
            }
            return r;
          }, []);
        } else {
          this.$emit('input', val);
          this.selfModel = val;
        }
      }
    },
    isChecked() {
      if ({}.toString.call(this.model) === '[object Boolean]') {
        return this.model;
      } else if (Array.isArray(this.model)) {
        return this.model.indexOf(this.code) > -1;
      }
      return false;
    },
    isBorder() {
      if (this.isGroup) {
        return this.$parent.border || this.border;
      }
      return this.border;
    },
    isButton() {
      return this.$parent.button || this.button;
    },
    buttonStyleStr() {
      return this.isGroup ? this.$parent.buttonStyle || this.buttonStyle : this.buttonStyle;
    },
    isGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== 'djCheckboxGroup') {
          parent = parent.$parent;
        } else {
          return parent;
        }
      }
      return false;
    },
    isLimitDisabled() {
      const { maxlimit, maxLimit } = this.$parent;
      const limit = maxLimit || maxlimit;
      return !!limit &&(this.model.length >= limit && !this.isChecked);
    },
    isMinLimit() {
      const { minlimit, minLimit } = this.$parent;
      const limit = minLimit || minlimit;
      return !!limit && (this.model.length <= limit && this.isChecked);
    },
    isDisabled() {
      return this.disabled || this.isLimitDisabled || this.$parent.disabled;
    }
  },
  created() {
  },
  methods: {
    handleChange(ev) {
      let value = ev.target.checked;
      let ls = this.$slots.default && this.$slots.default[0].text;
      this.$emit('change', value, ls);
      this.$nextTick(() => {
        if (this.isGroup) {
          this.dispatch('djCheckboxGroup', 'change', [this.isGroup.value, this.codes]);
        }
      });
    }
  },
  watch: {
    checked: {
      handler: function(n, o) {
        if (n || o !== void 0 && n !== o) {
          this.model = n;
        }
      },
      immediate: true
    }
  }
};
</script>
