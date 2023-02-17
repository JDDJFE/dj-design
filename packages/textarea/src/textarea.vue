<template>
  <div :class="['dj-textarea']">
    <textarea v-model="val" ref="textarea" :class="[{'disabled': disabled}]" :name="name" :rows="rows" :cols="cols" :readonly="readonly" :autofocus="autofocus" :disabled="disabled" :placeholder="placeholder" :maxlength="maxlength"
    @input="handEvent('input', $event)" @change="handEvent('change', $event)" @focus="handEvent('focus', $event)" @blur="handEvent('blur', $event)"></textarea>
    <span v-if="showmaxlength" class="textarea-length">
      <template v-if="bytelength">{{getLength(val)}}/{{bytelength}}</template>
      <template v-else-if="maxlength">{{val.length}}/{{maxlength}}</template>
    </span>
  </div>
</template>

<script>

export default {
  name: 'djTextarea',
  components: {},
  props: {
    value: String,
    name: String,
    rows: Number,
    cols: Number,
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
    maxlength: Number,
    bytelength: Number,
    showmaxlength: Boolean,
    funinput: Function
  },
  data() {
    return {
      val: this.value || ''
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
      this.$emit(this.val);
    }
  },
  mounted() {
  },
  methods: {
    focus() {
      this.$refs.textarea.focus();
    },
    blur() {
      this.$refs.textarea.blur();
    },
    select() {
      this.$refs.textarea.select();
    },
    handEvent(type, $event){
      if (type == 'input') {
        if (this.bytelength) {
          this.val = $event.target.value = this.getByteLength($event.target.value, this.bytelength);
        }
        if (this.funinput) {
          this.val = $event.target.value = this.funinput($event.target.value);
        }
      }
      if (type == 'input' || type == 'change') {
        this.$emit(type, this.val, $event);
      } else {
        this.$emit(type, $event);
      }
    },
    getByteLength(str, length) {
      let byteLength = 0;
      let byteStr = '';
      for (var i = 0; i < str.length; i++) {
        // eslint-disable-next-line no-control-regex
        if (str[i].match(new RegExp('[^\x00-\xff]', 'ig'))) {
          byteLength += 2;
        } else {
          byteLength += 1;
        }
        if (byteLength <= length) {
          byteStr += str[i];
        } else {
          break;
        }
      }
      return byteStr;
    },
    getLength(str) {
      let byteLength = 0;
      for (var i = 0; i < str.length; i++) {
        // eslint-disable-next-line no-control-regex
        if (str[i].match(new RegExp('[^\x00-\xff]', 'ig'))) {
          byteLength += 2;
        } else {
          byteLength += 1;
        }
      }
      return byteLength;
    }
  }
};
</script>

<style lang="less" scoped>
</style>
