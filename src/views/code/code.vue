<template>
  <div class="dj-code">
    <h2 v-if="type == 'example'">{{title}}</h2>
    <div class="temp-test" v-if="type == 'test' && info">
      <p><span>bug描述：</span>{{info.scene}}</p>
      <p><span>更改时间：</span>{{info.repairtime}}</p>
    </div>
    <div :id="`block-code${index}`" class="case-code"></div>
    <div class="temp-code" v-if="codeShow">
      <dj-button v-show="!showCode" icon="turning-bottom" type="text" style="width: 100%; padding: 10px;" @click="showCode = true"></dj-button>
      <transition name="fade">
<!--        <codemirror v-if="showCode" v-model="code" :options="options"></codemirror>-->
        <dj-json v-if="showCode" v-model="code" theme="base16-dark" language="vue"/>
      </transition>
      <div v-show="showCode" class="up">
        <dj-button icon="turning-top" type="text" style="width: 100%; padding: 10px;" @click="showCode = false"></dj-button>
        <dj-button type="text" icon="turning-right" style="position: absolute; right: 0; padding: 10px;" @click="insert()">运行</dj-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
// import codemirror from './codemirror';
// import toHTML from 'vdom-to-html';

export default {
  name: 'djCode',
  // components: {codemirror},
  props: {
    type: String,
    info: Object,
    value: String,
    title: String,
    codeShow: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object,
      default: () => {
        return {};
      }
    },
    options: Object,
    index: Number
  },
  data() {
    return {
      code: this.setCode(),
      showCode: false
    };
  },
  watch: {
    value: function(o, n) {
      // this.code = this.value.replace(/ {4}/g, '');
      // this.code = this.htmlFormat(this.value);
      this.setCode();
    }
  },
  mounted() {
    this.insert();
  },
  methods: {
    setCode() {
      let scope1 = '<script>';
      // </ script>这样写是为解决eslint 报错
      let scope2 = '</ script>'.replace(' ', '');
      if (this.data.data || this.data.methods) {
        this.code = `${this.value}
          ${scope1}
          export default ${this.objToString(this.data)}
          ${scope2}`;
      } else {
        this.code = `${this.value}
          ${scope1}
          export default {
            data() {
              return {
              };
            },
            methods: {
            }
          }
          ${scope2}`;
      }
      this.code = this.htmlFormat(this.code);
      return this.code;
    },
    insert() {
      if (!this.code) {
        return;
      }
      let temp = this.code.split('<script>');
      let code = temp[0].replace(/\n/g, '').replace(/>( {1,})</g, '><');
      let data = {};
      let script = temp[1];
      if (script && script.indexOf('export default ') > -1) {
        script = script.substring(script.indexOf('{'), script.length);
        script = script.replace('export default ', '').replace('</ script>'.replace(' ', ''), '');
        // eslint-disable-next-line no-new-func
        data = new Function(`return ${script}`)();
      }
      Vue.component(`block-code${this.index}`, {
        template: `<div id="block-code${this.index}" class="case-code">` + code + '</div>',
        ...data
      });
      const BlockCode = Vue.component(`block-code${this.index}`); // 只能查找到全局注册到组件
      const instance = new BlockCode();
      instance.$mount(`#block-code${this.index}`);
    },
    objToString(data) {
      return `{
        ` + Object.keys(data).map(key => {
        if (typeof data[key] == 'function') {
          return data[key].toString().replace('function ', '');
        }
        return key + ': ' + this.objToString(data[key]);
      }).join(',\n') + `
      }`;
    },
    htmlFormat(html) { // 格式化html代码
      // html.replace(/}/g, '}\n');
      if (!html) {
        return;
      }
      let list = html.split('\n');
      let count = 0;
      list = list.map(row => {
        if (!row) {
          return '';
        }
        let str = this.trim(row);
        str = this.tabSize(str, count);
        if (str.indexOf('<') > -1 && str.indexOf('<') != str.indexOf('</') || str.indexOf('{') > -1) {
          count++;
        }
        if (str.indexOf('</') > -1 || str.indexOf('/>') > -1 || str.indexOf('}') > -1) {
          count--;
        }
        return str;
      });
      return list.join('\n');
    },
    trim(str) { // 去头尾空格
      return this.trimLeft(this.trimRight(str));
    },
    trimLeft(str) { // 去头部空格
      if (!str) {
        return '';
      }
      if (str.indexOf(' ') == 0) {
        return this.trimLeft(str.substring(1, str.length));
      }
      return str;
    },
    trimRight(str) { // 去末尾空格
      if (!str) {
        return '';
      }
      if (str.lastIndexOf(' ') == str.length - 1) {
        return this.trimRight(str.substring(0, str.length - 1));
      }
      return str;
    },
    tabSize(str, size) { // 增加退格符
      let count = size;
      if (str.indexOf('</') == 0 || str.indexOf('/>') == 0 || str.indexOf('}') == 0) {
        count--;
      }
      if (count <= 0) {
        return str;
      }
      let tabStr = '';
      for (let i = 0; i < count; i++) {
        tabStr += '  ';
      }
      return tabStr + str;
    }
  }
};
</script>

<style lang="less">
</style>
