<template>
  <form
    :name="name"
    class="dj-form"
    :class="{ 'dj-form-inline': inline, 'dj-form-column': labelTop }"
    :style="formwidth && !inline && `width: ${formwidth};`"
  >
    <slot>
      <dj-form-item
        v-for="(field, index) in fields"
        :ref="`formItem${index}`"
        v-bind="field.props"
        :key="index"
        class="dj-from-item"
      >
        <template v-for="(content, key) in field.contents">
          <template v-if="content.type == 'input'">
            <dj-input
              v-model="data[field.props.field]"
              v-bind="content.props"
              @change="content.event.change"
              :key="key"
            />
          </template>
          <template v-else-if="content.type == 'select'">
            <dj-select
              v-model="data[field.props.field]"
              v-bind="content.props"
              @change="content.event.change"
              :key="key"
            >
              <dj-option
                v-for="(item, i) in content.items"
                :key="i"
                :value="item.value"
                :label="item.label"
              />
            </dj-select>
          </template>
          <template v-else-if="content.type == 'radio'">
            <dj-radio
              v-for="(item, i) in content.items"
              :key="key + '-' + i"
              v-bind="content.props"
              @change="content.event.change"
              v-model="data[field.props.field]"
              :code="item.value"
              >{{ item.label }}</dj-radio
            >
          </template>
          <template v-else-if="content.type == 'switch'">
            <dj-switch
              v-model="data[field.props.field]"
              v-bind="content.props"
              @change="content.event.change"
              :key="key"
            />
          </template>
          <template v-else-if="content.type == 'checkbox'">
            <dj-checkbox-group
              v-model="data[field.props.field]"
              :key="key"
              @change="content.event.change"
            >
              <dj-checkbox
                v-for="(item, i) in content.items"
                :key="i"
                v-bind="content.props"
                :code="item.value"
                >{{ item.label }}</dj-checkbox
              >
            </dj-checkbox-group>
          </template>
          <template v-else-if="content.type == 'color'">
            <dj-color-picker
              v-model="data[field.props.field]"
              v-bind="content.props"
              @change="content.event.change"
              :key="key"
            />
          </template>
          <template v-else-if="content.type == 'textarea'">
            <dj-textarea
              v-model="data[field.props.field]"
              @change="content.event.change"
              :key="key"
            />
          </template>
          <template v-else-if="content.type == 'button'">
            <dj-button
              v-bind="content.props"
              :key="key"
              @click="content.event.click()"
              >{{ content.text }}</dj-button
            >
          </template>
          <template v-else-if="content.type == 'upload'">
            <dj-upload
              v-model="data[field.props.field]"
              v-bind="content.props"
              :key="key"
              :type="content.uploadtype"
            ></dj-upload>
          </template>
          <template v-else-if="content.type == 'editor'">
            <dj-editor
              v-model="data[field.props.field]"
              v-bind="content.props"
              :key="key"
            ></dj-editor>
          </template>
          <template v-else-if="content.type == 'spacing'">
            <div class="spacing" :key="key"></div>
          </template>
          <template v-else-if="content.type == 'div'">
            <div v-bind="content.props" :key="key">
              {{ content.props.class }}
            </div>
          </template>
          <template v-else-if="content.type == 'text'">
            <span v-bind="content.props" :key="key">{{ content.text }}</span>
          </template>
        </template>
      </dj-form-item>
    </slot>
  </form>
</template>

<script>
export default {
  name: 'djForm',
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    name: String,
    type: {
      // edit、info
      type: String,
      default: 'edit'
    },
    fields: {
      type: Array,
      default: () => []
    },
    rules: {
      type: Object,
      default: () => {
        return {};
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    labelwidth: {
      type: String,
      default: '110px'
    },
    showErrorMsg: {
      type: Boolean,
      default: true
    },
    checkPopover: {
      type: Boolean,
      default: true
    },
    errorMsgPosition: {
      type: String,
      default: 'right'
    },
    labelTop: {
      type: Boolean,
      default: false
    },
    inline: {
      type: Boolean,
      default: false
    },
    formwidth: {
      type: String
    }
  },
  data() {
    return {
      // oldData: this.$copy(this.value),
      data: this.value,
      exportErrorMsg: []
    };
  },
  computed: {},
  watch: {
    value: {
      handler: function(n, o) {
        if (
          this.value != this.data &&
          JSON.stringify(this.data) != JSON.stringify(this.value)
        ) {
          this.data = this.value;
        }
      },
      deep: true
    },
    data: function(n, o) {
      this.$emit('input', this.data);
    },
    disabled: function() {
      this.$nextTick(() => {
        this.setDisabled();
      });
    }
  },
  created() {
    this.init();
  },
  mounted() {
    this.setDisabled();
  },
  methods: {
    init() {
      // let vNodes = [];
      // // 过滤非dj-form-item的节点
      // this.$slots.default && this.$slots.default.forEach((vNode, index) => {
      //   if (vNode.componentOptions && vNode.componentOptions.tag == 'dj-form-item') {
      //     vNodes.push(vNode);
      //   }
      // });
      // this._children = vNodes;
      // this.$slots.default = vNodes;
      this.fields.forEach((field, index) => {
        field.contents.forEach((content) => {
          content.event = content.event || {};
          const change = content.event.change;
          content.event.change = () => {
            this.$children[index].validate();
            change && change();
          };
        });
      });
    },
    reset() {
      // this.data = this.$copy(this.oldData);
      if (this.$children.length) {
        this.$children.forEach((item) => {
          item.reset();
        });
      } else {
        this.fields.forEach((field, index) => {
          this.$refs[`formItem${index}`][0].reset();
        });
      }
    },
    resetValidate() {
      if (this.$children.length) {
        this.$children.forEach((item) => {
          item.resetValidate();
        });
      } else {
        this.fields.forEach((field, index) => {
          this.$refs[`formItem${index}`][0].resetValidate();
        });
      }
    },
    validate() {
      let checked = true;
      this.exportErrorMsg = [];
      if (this.$children.length) {
        this.$children.forEach((item) => {
          if (!item.validate()) {
            this.exportErrorMsg.push(item.errorMsg);
            checked = false;
          }
        });
        // 自动定位最开始错误区域
        let doms = this.$children.find((item) => item.errorMsg);
        doms?.$el.scrollIntoView?.({
          behavior: 'smooth',
          block: 'center'
        });
      } else {
        this.fields.forEach((field, index) => {
          if (!this.$refs[`formItem${index}`][0].validate()) {
            checked = false;
          }
        });
      }
      return checked;
    },
    setDisabled() {
      if (this.$children.length) {
        this.$children.forEach((item) => {
          item.setDisabled(this.disabled);
        });
      } else {
        this.fields.forEach((field, index) => {
          this.$refs[`formItem${index}`][0].setDisabled(this.disabled);
        });
      }
    },
    getErrorMsg() {
      let msgList = [];
      let msg = '';
      if (this.$children.length) {
        this.$children.forEach((item) => {
          msg = item.getErrorMsg();
          if (msg) {
            msgList.push(msg);
          }
        });
      } else {
        this.fields.forEach((field, index) => {
          msg = this.$refs[`formItem${index}`][0].getErrorMsg();
          if (msg) {
            msgList.push(msg);
          }
        });
      }
      return msgList;
    }
  }
};
</script>

<style lang="less" scoped></style>
