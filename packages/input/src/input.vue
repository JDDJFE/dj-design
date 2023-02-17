<template>
  <div class="dj-input" :class="[size, {'disabled': disabled, 'focus': isFocus, 'hover': isHover, 'before': before || $slots.before, 'after': after || $slots.after}]" @mouseenter=" disabled ? '' : isHover = true"
      @mouseleave="isHover = false" tabindex="-1">
    <div class="dj-input-panel">
      <div v-if="before || $slots.before" class="before-panel">
        <span :style="!$slots.before && 'padding: 0px 12px' || ''"><slot name="before">{{before}}</slot></span>
      </div>
      <div class="input" v-show="showInput" >
        <div class="input-panel" :class="{'icon': icon, 'icon-left': getIconLeft, 'after': getInputAfter}">
          <input :class="{'dj-disabled': disabled}" v-model="val" ref="input" :name="name" :type="type === 'password' && isPassword ? 'password' : 'text'"
          :autofocus="autofocus" :placeholder="placeholder" :disabled="disabled" :readonly="readonly" :maxlength="bytelength ? null : maxlength" @click="handEvent('click', $event)" @input="handEvent('input', $event)" @change="handEvent('change', $event)" @focus="handEvent('focus', $event)" @blur="handEvent('blur', $event)" @keyup.enter="handEvent('enter', $event)" @compositionstart="compositionstart($event)" @compositionend="compositionend($event)" :autocomplete="funquery ? 'off' : 'on'">
          <i v-if="icon" class="iconfont" :class="icon"></i>
          <div v-if="getInputAfter" class="input-after">
            <div class="input-after-center">
              <dj-button v-if="showsearch" :disabled="disabled" fontSize="14px" :colors="['#fff','#1b1c1d','#1b1c1d']" :style="{width: cacuSize,height: cacuSize}" circle @click="handEvent('query', $event)"><i class="iconfont search2" :style="[{color: '#fff',fontSize: '14px'}, {lineHeight: cacuSize}]"></i></dj-button>
              <template v-else-if="bytelength">{{getLength(val)}}/{{bytelength}}</template>
              <template v-else-if="maxlength">{{String(val).length}}/{{maxlength}}</template>
              <template v-else-if="(showclear || clearable) && val"><i class="iconfont close-solid" @click="clear"></i></template>
              <template v-else-if="showpassword"><i class="iconfont view" :class="{'view': !isPassword, 'view-off': isPassword}" @click="isPassword=!isPassword"></i></template>
            </div>
          </div>
        </div>
      </div>
      <div v-if="after || $slots.after" :class="showInput ? 'after-panel' : 'after-panel after-panel-iscolor'">
        <span :style="!$slots.after && 'padding: 0px 12px' || ''"><slot name="after">{{after}}</slot></span>
      </div>
      <transition v-if="funquery" name="fade">
        <dj-options ref="options" v-show="isActive" v-model="val"  @select="onSelect" :funquery="funquery" :search="false">
          <template v-slot:option="item"><!--  v-show="$slots.option" -->
            <slot name="option" v-bind="item"></slot>
          </template>
        </dj-options>
      </transition>
    </div>
  </div>
</template>

<script>
// v-maxlength：https://www.npmjs.com/package/vue_input_maxlength?activeTab=readme
// import '@/directive';
import djOptions from './options';
import { on } from '@/utils/dom';

export default {
  name: 'djInput',
  components: {djOptions},
  props: {
    showInput: {
      type: Boolean,
      default: true
    },
    value: [String, Number],
    name: String,
    type: {
      type: String,
      default: 'text'
    },
    placeholder: String,
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    maxlength: Number,
    bytelength: Number,
    fixed: Number,
    size: {
      type: String,
      default: 'medium'
    },
    min: Number,
    max: Number,
    step: Number,
    autofocus: Boolean,
    icon: String,
    iconposition: {
      type: String,
      default: 'right'
    },
    before: String,
    after: String,
    showmaxlength: Boolean,
    showsearch: Boolean,
    showclear: Boolean,
    clearable: Boolean,
    showpassword: Boolean,
    funinput: Function,
    funquery: Function
  },
  data() {
    return {
      val: this.value === void 0 || this.value === null ? '' : this.value,
      isFocus: false,
      isActive: false,
      isHover: false,
      isPassword: true,
      composition: false
    };
  },
  computed: {
    cacuSize() {
      let sizeMap = {
        mini: () => {
          return 20;
        },
        tiny: () => {
          return 22;
        },
        small: () => {
          return 22;
        },
        medium: () => {
          return 25;
        },
        large: () => {
          return 28;
        }
      };
      if (sizeMap[this.size]) {
        let relomSize = sizeMap[this.size]();
        return relomSize + 'px';
      }
      return '25px';
    },
    getDisabled() {
      // eslint-disable-next-line no-unneeded-ternary
      return this.disabled === true;
    },
    getInputAfter() {
      return (this.maxlength || this.bytelength) && this.showmaxlength || this.showsearch || this.showclear || this.showpassword || this.clearable;
    },
    getIconLeft() {
      return this.icon && (this.iconposition == 'left' || this.getInputAfter);
    }
  },
  watch: {
    value: function(o, n) {
      if (this.val !== this.value) {
        this.val = this.value;
      }
    }
    // val: function(o, n) {
    //   if (this.val !== this.value) {
    //     this.$emit('input', this.val);
    //   }
    // }
  },
  mounted() {
    if (this.funquery) {
      let handler = e => {
        if (this.$el.contains(e.target)) {
          return;
        }
        this.isActive = false;
      };
      on(document, 'click', handler);
    }
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    },
    blur() {
      this.$refs.input.blur();
    },
    select() {
      this.$refs.input.select();
    },
    clear() {
      this.val = this.$refs.input.value = '';
      if (this.funquery) {
        setTimeout(() => {
          this.$refs.options?.onQuery();
          this.focus();
        }, 0);
      } else {
        this.focus();
      }
      this.$emit('input', this.val);
      this.$emit('change', this.val);
    },
    compositionstart() {
      this.composition = true;
    },
    compositionend($event) {
      if (this.bytelength) {
        this.val = $event.target.value = this.getByteLength($event.target.value, this.bytelength);
      }
      this.composition = false;
    },
    handEvent(type, $event){
      if (type == 'focus') {
        this.isFocus = true;
        this.isActive = true;
        // this.$el.focus();
      }
      if (type == 'blur') {
        this.isFocus = false;
      }
      if (type == 'input') {
        if (this.type.toLocaleLowerCase() == 'number') {
          if (this.fixed && this.fixed > 0) {
            $event.target.value = $event.target.value.replace(/[^\d || .]/g, '');
            if ($event.target.value) {
              let list = $event.target.value.split('.');
              if (list.length == 2) {
                if (!list[0]) {
                  list[0] = '0';
                }
              } else if (!list[0]) {
                list.splice(0, 1);
              }
              let number = list[0];
              list.splice(0, 1);
              let fiexd = list.join('').substring(0, this.fixed);
              this.val = $event.target.value = number + (list.length ? '.' + fiexd : '');
            } else {
              this.val = $event.target.value ;
            }
          } else {
            this.val = $event.target.value = $event.target.value.replace(/\D/g, '');
          }
        }
        if (this.bytelength) {
          if (!this.composition) {
            this.val = $event.target.value = this.getByteLength($event.target.value, this.bytelength);
          }
        }
        if (this.funinput) {
          this.val = $event.target.value = this.funinput($event.target.value);
        }
      }
      if (type == 'input' || type == 'change' || type == 'query') {
        this.$emit(type, this.type.toLocaleLowerCase() == 'number' && this.val ? this.val * 1 : this.val, $event);
        this.$nextTick(() => {
          if (type == 'input' && this.funquery) {
            this.$refs.options?.onQuery();
          }
          if (this.value && (this.type.toLocaleLowerCase() == 'number' ? this.val * 1 !== this.value * 1 : this.val !== this.value)) {
            this.val = this.value;
          }
        });
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
    },
    onSelect(val, item) {
      this.val = val;
      this.isActive = false;
      this.isHover = false;
      this.$emit('select', val, item);
    },
    out() {
      this.isActive = false;
    }
  }
};
</script>
