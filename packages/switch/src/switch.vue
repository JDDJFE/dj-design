<template>
  <div
    class="dj-switch"
    :class="[
      size && `is-size-${size}`,
      {'dj-switch-on' : isChecked},
      {'is-disabled': disabled}
    ]"
    :style="{width: width && `${width + 2}px`}"
    :value="value"
    @click="toggle"
  >
    <span class="before"></span>
    <div v-if="direction.length > 0" class="dj-swich-content" :style="{fontSize: `${sizeftext}px`}">
      {{direction[isChecked ? 0 : 1]}}
    </div>
    <div v-if="iconDirection.length > 0" class="dj-swich-content-icon">
      <dj-icon :icon="iconDirection[isChecked ? 0 : 1]" :style="{fontSize: `${sizef}px`}"> </dj-icon>
    </div>
    <span class="after" :style="{transform: isChecked ? `translateX(${width ? width - 16 : sizew -2}px)` : `translateX(2px)` }"></span>
  </div>
</template>

<script>
export default {
  name: 'djSwitch',
  props: {
    value: {
      type: [Number, String, Boolean]
    },
    width: {
      type: Number
    },
    text: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String
    },
    onValue: {
      type: [Number, String, Boolean],
      default: true
    },
    offValue: {
      type: [Number, String, Boolean],
      default: false
    }
  },
  data() {
    return {
      isChecked: typeof this.value === 'boolean' ? this.value : this.value === this.onValue
    };
  },
  computed: {
    sizew() {
      let w ;
      if (this.size == 'large'){
        w = 32;
      } else if (this.size == 'mini'){
        w = 16;
      } else {
        w = 24;
      }
      return w;
    },
    sizeftext() {
      let f ;
      if (this.size == 'large'){
        f = 14;
      } else if (this.size == 'mini'){
        f = 10;
      } else {
        f = 12;
      }
      return f;
    },
    sizef() {
      let f ;
      if (this.size == 'large'){
        f = 18;
      } else if (this.size == 'mini'){
        f = 12;
      } else {
        f = 14;
      }
      return f;
    },
    direction() {
      if (this.text) {
        return this.text.split('|');
      }
      return [];
    },
    iconDirection() {
      if (this.icon) {
        return this.icon.split('|');
      }
      return [];
    }

  },
  watch: {
    value(val) {
      this.isChecked = typeof val === 'boolean' ? val : val === this.onValue;
    }
  },
  methods: {
    toggle(v) {
      if (!this.disabled) {
        this.isChecked = !this.isChecked;
      }
      if (v === true) {
        this.isChecked = true;
      }
      this.$emit('change', this.isChecked ? this.onValue : this.offValue);
      this.$emit('input', this.isChecked ? this.onValue : this.offValue);

      // this.$emit('change', this.isChecked);
      // this.$emit('input', this.isChecked);
    }

  }
};
</script>
