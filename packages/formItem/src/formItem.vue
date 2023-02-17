<template>
  <div class="dj-form-item" :class="{'error': errorMsg, 'dj-form-item-inline': inline, 'dj-form-item-column': labelTop, 'dj-form-item-empty': !($slots.default || label)}" :style="formItemWidth ? `width: ${formItemWidth}` : (!getShowErrorMsg || !getCheckPopover || _form.formwidth) && !getInline && `width: 100%;`">
    <label v-if="($slots.default || label)" :style="getLabelWidth && `width: ${getLabelWidth};` || ''" class="dj-form-item_label" :class="{'empty': label && empty, 'colon': label && colon, 'noright': !label}">{{label}}</label>
    <div v-if="_form.type == 'info' && view && ($slots.default || label)"  class="dj-form-item-content" :style="`width: calc(100% - ${getLabelWidth});`">
      <slot name="info" v-bind="form || _form.data">
        {{form ? form : _form.data[field]}}
      </slot>
    </div>
    <div v-else-if="($slots.default || label)" :style="`width: ${getLabelTop ? '100%' : 'calc(100% - ' + getLabelWidth + ')'};`">
        <div class="dj-form-item-content" :style="`width: 100%;`">
            <!-- <withComponent v-if="isFormEl" :slotsDefault="$slots.default" :disabled="disabled" @change="validate(true)"/> -->
            <slot/>
            <div v-if="getShowErrorMsg && errorMsg && getCheckPopover" class="dj-form-item-info">
                <dj-popover :placement="_form.errorMsgPosition" :visible.sync="errorVisible" trigger="hover"><div class="error" slot="content">{{errorMsg}}</div><dj-icon icon="help"></dj-icon></dj-popover>
            </div>
            <div v-if="help && !helpWrap" :style="helpColor && `color: ${helpColor};`" class="dj-form-item-help">{{help}}</div>
        </div>
        <div v-if="help && helpWrap" :style="helpColor && `color: ${helpColor};`" class="dj-form-item-help dj-form-item-helpB">{{help}}</div>
        <div v-if="getShowErrorMsg && errorMsg && !getCheckPopover" class="dj-form-item-infoB">
            <div class="error" slot="content">{{errorMsg}}</div>
        </div>
    </div>
  </div>
</template>

<script>
// import withComponent from './withComponent';
import validate from './validate';

export default {
  name: 'djFormItem',
  // components: {withComponent},
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    empty: {
      type: Boolean,
      default: true
    },
    colon: {
      type: Boolean,
      default: true
    },
    form: {
      type: Object
    },
    rule: {
      type: Array
    },
    view: {
      type: Boolean,
      default: true
    },
    label: String,
    field: String,
    fields: String,
    labelTop: {
      type: Boolean,
      default: null
    },
    inline: {
      type: Boolean,
      default: null
    },
    showErrorMsg: {
      type: Boolean,
      default: null
    },
    checkPopover: {
      type: Boolean,
      default: null
    },
    labelwidth: {
      type: String
    },
    help: {
      type: String
    },
    helpWrap: {
      type: Boolean,
      default: true
    },
    helpColor: {
      type: String
    },
    formItemWidth: {
      type: String
    }
  },
  data() {
    return {
      disabled: false,
      errorMsg: '',
      errorVisible: false
    };
  },
  computed: {
    getLabelWidth() {
      return this.labelwidth || this._form.labelwidth;
    },
    getShowErrorMsg() {
      if (this.showErrorMsg == true || this.showErrorMsg === false) {
        return this.showErrorMsg;
      }
      return this._form.showErrorMsg;
    },
    getCheckPopover() {
      if (this.checkPopover === true || this.checkPopover === false) {
        return this.checkPopover;
      }
      return this._form.checkPopover;
    },
    getInline() {
      if (this.inline === true || this.inline === false) {
        return this.inline;
      }
      return this._form.inline;
    },
    getLabelTop() {
      if (this.labelTop === true || this.labelTop === false) {
        return this.labelTop;
      }
      return this._form.labelTop;
    },
    _form() {
      let parent = this.$parent;
      let componentTag = parent.$options._componentTag;
      while (componentTag !== 'dj-form') {
        parent = parent.$parent;
        componentTag = parent.$options._componentTag;
      }
      return parent;
    },
    isFormEl() {
      return !!this.$slots.default.find(item => !!['dj-input', 'dj-select', 'dj-radio', 'dj-checkbox', 'dj-checkbox-group', 'dj-switch', 'dj-color-picker', 'dj-switch', 'dj-button', 'dj-upload', 'dj-textarea'].find(tag => tag == item.componentOptions?.tag));
    }
  },
  watch: {
  },
  created() {
    if (!this.$slots.default) {
      // console.log(this.$slots.default);
    }
  },
  mounted() {
  },
  methods: {
    getFileds() {
      return this.field ? [this.field] : this.fields && this.fields.split(',') || [];
    },
    validate(isChange) {
      this.errorMsg = '';
      let checked = true;
      let fields = this.getFileds();
      if (fields) {
        for (let j = 0; j < fields.length; j++) {
          let field = fields[j];
          let rules = this.rule || this._form.rules[field];
          if (rules) {
            for (let i = 0; i < rules.length; i++) {
              let rule = rules[i];
              if (validate.rules[rule.type] && (isChange ? rule.changeTrigger : true)) {
                this.errorVisible = false;
                let value = this.form ? this.form[field] : this._form.data[field];
                checked = validate.rules[rule.type].call(this.form || this._form.data, value, rule);
                if (typeof checked == 'string' ? checked : !checked) {
                  let name = this.label;
                  let msg = validate.templates[rule.type];
                  if (rule.transform == 'string' || rule.transform == 'array' || typeof value === 'string' || Array.isArray(value)) {
                    msg = validate.templates[rule.type + 'string'] || validate.templates[rule.type];
                  }
                  if (rule.type === 'type') {
                    let typeName = validate.typeName[rule.is];
                    msg = msg + typeName;
                  }
                  this.errorVisible = true;
                  this.errorMsg = ((typeof checked == 'string' ? checked : '') || rule.msg || msg || `${name}校验不通过`)
                    .replace(/\$\{name\}/g, this.label)
                    .replace(/\$\{type\}/g, rule.type)
                    .replace(/\$\{min\}/g, rule.min)
                    .replace(/\$\{max\}/g, rule.max)
                    .replace(/\$\{equal\}/g, rule.equal);
                  break;
                }
              }
            }
          }
          if (!(typeof checked == 'string' ? false : checked))
            return false;
        }
      }
      return true;
    },
    reset() {
      let form = this.form || this._form.data;
      this.getFileds().forEach((field) => {
        if (Array.isArray(form[field])) {
          form[field] = [];
        } else if (typeof form[field] == 'string') {
          form[field] = '';
        } else if (typeof form[field] == 'boolean') {
          form[field] = false;
        } else {
          form[field] = null;
        }
      });
      this.resetValidate();
    },
    resetValidate() {
      this.errorMsg = '';
    },
    setDisabled(disabled) {
      this.disabled = disabled;
    },
    getErrorMsg() {
      return this.errorMsg;
    },
    refrash() {
      let form = this.form || this._form.data;
      this.getFileds().forEach(field => {
        let old = form[field];
        if (Array.isArray(form[field])) {
          form[field] = [];
        } else if (typeof form[field] == 'string') {
          form[field] = form[field] == '' ? ' ' : '';
        } else if (typeof form[field] == 'boolean') {
          form[field] = form[field] !== true;
        } else {
          form[field] = form[field] === null ? void 0 : null;
        }
        this.$nextTick(() => {
          form[field] = old;
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>
