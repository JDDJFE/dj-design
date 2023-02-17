<template>
  <label
    role="radio"
    class="dj-radio"
    :style="styles"
    :class="[
      radioSize && `is-size-${radioSize}`,
      {'is-checked': model === code},
      {'is-disabled': isDisabled},
      {'is-bordered': isBorder},
      {'is-button': isButton},
      isButton && `is-button-${buttonStyleStr}`
      ]">
    <span class="dj-radio-icon" v-if="!isButton"></span>
    <input
      type="radio"
      ref="radio"
      v-model="model"
      class="dj-radio-original"
      :value="code"
      @change="handleChange"
      :disabled='isDisabled'>
    <span class="dj-radio-label" v-if="$slots.default">
      <slot></slot>
    </span>
  </label>
</template>
<script>
import Emitter from '@/mixins/emitter';
export default {
  name: 'djRadio',
  mixins: [Emitter],
  props: {
    styles: String,
    code: {
      type: [Number, String, Boolean]
    },
    value: {},
    border: {
      type: Boolean,
      default: false
    },
    button: {
      type: Boolean,
      default: false
    },
    buttonStyle: {
      type: String,
      default: 'solid'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String
    }
  },
  computed: {
    radioSize(){
      return this.isGroup ? this.$parent.size || this.size: this.size;
    },
    isBorder(){
      return this.isGroup ? this.$parent.border || this.border : this.border;
    },
    isButton() {
      return this.isGroup ? this.$parent.button || this.button : this.button;
    },
    buttonStyleStr() {
      return this.isGroup ? this.$parent.buttonStyle || this.buttonStyle : this.buttonStyle;
    },
    isDisabled() {
      return this.isGroup ? this.$parent.disabled || this.disabled : this.disabled;
    },
    isGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== 'djRadioGroup') {
          parent = parent.$parent;
        } else {
          return parent;
        }
      }
      return false;
    },
    model: {
      get() {
        let tc = typeof this.code;
        return this.isGroup ?
          typeof this.isGroup.value === tc ? this.isGroup.value : void 0 :
          typeof this.value === tc ? this.value : void 0 ;
      },
      set(val) {
        if (this.isGroup) {
          this.dispatch('djRadioGroup', 'input', [val]);
        } else {
          this.$emit('input', val);
        }
      }
    }
  },
  methods: {
    handleChange() {
      this.$nextTick(() => {
        let text = this.$slots.default[0].text;
        this.$emit('change', this.model, text);
        this.isGroup && this.dispatch('djRadioGroup', 'change', [this.model, text]);
      });
    }
  },
  watch: {
  }
};
</script>
