<template>
  <div class="dj-color-picker" :class="[size]" :style="!showInput && 'width: auto'">
    <dj-input ref="color" :showInput="showInput" size="" v-model="val" :name="name" :placeholder="placeholder" :maxlength="7" :disabled="disabled" :readonly="readonly" :funinput="funinput" :autofocus="autofocus" :class="{'error': isError}" @input="handEvent('input', $event)" @change="handEvent('change', $event)" @focus="handEvent('focus', $event)" @blur="handEvent('blur', $event)">>
      <template slot="after">
        <div class="color"><input v-model="val" type="color" @change="handEvent('change', $event)" :disabled="disabled"/></div>
      </template>
    </dj-input>
  </div>
</template>

<script>

export default {
  name: 'djColorPicker',
  components: {},
  props: {
    value: String,
    name: String,
    placeholder: String,
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'small'
    },
    showInput: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      val: this.value || '',
      isError: false
    };
  },
  computed: {
  },
  watch: {
    value: function(n, o) {
      if (this.value != this.val) {
        this.val = this.value;
      }
    },
    val: function(n, o) {
      this.$emit('input',this.val);
    }
  },
  mounted() {
    this.isError = this.$el.classList && this.$el.classList.contains('error');
    // 监听class的变化
    var Observer = new MutationObserver((mutations, instance) => {
      this.isError = mutations[0].target.classList.contains('error');
    });
    Observer.observe(this.$el, {
      attributes: true
    });
  },
  methods: {
    focus() {
      this.$refs.color.focus();
    },
    blur() {
      this.$refs.color.blur();
    },
    select() {
      this.$refs.color.select();
    },
    handEvent(type, $event){
      if (type == 'input' || type == 'change') {
        this.$emit(type, this.val, $event);
      } else {
        this.$emit(type, $event);
      }
    },
    funinput(val) {
      let color = '';
      if (val.indexOf('#') === 0) {
        color = '#';
      }
      val = val.replace(/[^\d || a-f || A-F]/g, '');
      color += val.substring(0, 6);
      return color;
    }
  }
};
</script>

<style lang="less" scoped>
</style>
