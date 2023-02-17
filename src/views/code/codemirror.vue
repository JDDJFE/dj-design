<template>
  <codemirror v-model="code" :options="options"></codemirror>
</template>

<script>
import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/darcula.css';
import 'codemirror/theme/cobalt.css';
import 'codemirror/theme/base16-dark.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/markdown/markdown.js';
import 'codemirror/mode/vue/vue.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/xml/xml.js';

export default {
  name: 'djCodemirror',
  components: {codemirror},
  props: {
    value: String,
    options: {
      type: Object,
      default: () => {
        return {
          tabSize: 2,
          mode: 'text/html',
          theme: 'base16-dark',
          lineNumbers: true,
          line: true
        };
      }
    }
  },
  data() {
    return {
      code: this.value
    };
  },
  watch: {
    value: function(o, n) {
      if (this.value != this.code) {
        this.code = this.value;
      }
    },
    code: function(n, o) {
      this.$emit('input', this.code);
    }
  },
  mounted() {
  },
  methods: {
  }
};
</script>

<style lang="less">
  .CodeMirror {
    height: auto;
  }
  .CodeMirror-gutters {
    z-index: -1;
  }
  .CodeMirror-gutter-wrapper,.CodeMirror pre.CodeMirror-line, .CodeMirror pre.CodeMirror-line-like,div[role='presentation'] > div {
    z-index: 0 !important;
  }
</style>
