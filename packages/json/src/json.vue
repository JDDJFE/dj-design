<template>
  <div class="dj-json-in-coder-panel" :id="tooltipId">
    <div v-if="diff" id="dj-json-view"></div>
    <textarea v-else ref="textarea"></textarea>

    <!--<div v-if="disabled" class="maskBox"></div>-->
    <!--    <dj-button class="ml10" size="small" @click="getJson">获取数据</dj-button>-->
  </div>

</template>

<script type="text/ecmascript-6">
// 引入全局实例
import _CodeMirror from 'codemirror';
// import './diff_match_patch'
// import {codemirror} from 'vue-codemirror'
import 'codemirror/addon/search/search';
// import 'codemirror/addon/search/annotatescrollbar'
import 'codemirror/addon/search/matchesonscrollbar';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/match-highlighter';
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror/addon/merge/merge.js';
import 'codemirror/addon/merge/merge.css';
// // 折叠
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/xml-fold.js';
import 'codemirror/addon/fold/indent-fold.js';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/markdown-fold.js';
import 'codemirror/addon/fold/comment-fold.js';
// // import 'codemirror/addon/selection/active-line';
// import 'codemirror/addon/edit/closebrackets';
// import 'codemirror/addon/edit/matchbrackets';

// 核心样式
import 'codemirror/lib/codemirror.css';
// 需要引入具体的语法高亮库才会有对应的语法高亮效果
// codemirror 官方其实支持通过 /addon/mode/loadmode.js 和 /mode/meta.js 来实现动态加载对应语法高亮库
// 但 vue 貌似没有无法在实例初始化后再动态加载对应 JS ，所以此处才把对应的 JS 提前引入
import 'codemirror/mode/meta.js';
// import 'codemirror/mode/javascript/javascript'
// import 'codemirror/mode/clike/clike'
// import 'codemirror/mode/go/go'
// import 'codemirror/mode/htmlmixed/htmlmixed'
// import 'codemirror/mode/http/http'
// import 'codemirror/mode/php/php'
// import 'codemirror/mode/python/python'
// import 'codemirror/mode/http/http'
// import 'codemirror/mode/sql/sql'
// import 'codemirror/mode/vue/vue'
// import 'codemirror/mode/xml/xml'
// import 'codemirror/mode/css/css.js';
// import 'codemirror/mode/markdown/markdown.js';
// import 'codemirror/mode/r/r.js';
// import 'codemirror/mode/shell/shell.js';
// import 'codemirror/mode/swift/swift.js';
// 引入主题后还需要在 options 中指定主题才会生效
// import 'codemirror/theme/cobalt.css';
// import "codemirror/theme/ambiance.css";  // 这里引入的是主题样式，根据设置的theme的主题引入，一定要引入！！
// import 'codemirror/theme/eclipse.css';
// import 'codemirror/theme/monokai.css'
// import 'codemirror/theme/blackboard.css';

import 'codemirror/addon/display/fullscreen.css'; // 全屏显示编辑器
import 'codemirror/addon/display/fullscreen.js'; // 全屏显示编辑器

// 引入代码自动提示插件
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/sql-hint';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/display/panel';
// 尝试获取全局实例
const CodeMirror = window.CodeMirror || _CodeMirror;
import DiffMatchPatch from 'diff-match-patch';
// import './codeMirrorModal/revised-search'
import './search';

// eslint-disable-next-line camelcase
window.diff_match_patch = DiffMatchPatch;
window.DIFF_DELETE = -1;
window.DIFF_INSERT = 1;
window.DIFF_EQUAL = 0;
export default {
  name: 'djJson',
  props: {
    width: {
      type: String || Number,
      default: ''
    },
    height: {
      type: String || Number,
      default: ''
    },
    // 外部传入的内容，用于实现双向绑定
    value: String,
    valueLeft: {
      type: String,
      default: null
    },
    valueRight: {
      type: String,
      default: null
    },
    jsonFormat: {
      type: Boolean,
      default: true
    },
    // 语言
    language: {
      type: String,
      default: 'javascript'
    },
    // 主题
    theme: {
      type: String,
      default: 'eclipse'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // changeStatus: {
    //   type: Boolean,
    //   default: false
    // },
    // 代码对比
    diff: {
      type: Boolean,
      default: false
    },
    // 左侧配置
    leftConfig: {
      type: Object,
      default() {
        return {};
      }
    },
    // 左侧配置
    configParams: {
      type: Object,
      default() {
        return {};
      }
    },
    // 右侧配置
    rightConfig: {
      type: Object,
      default() {
        return {};
      }
    },
    // 行高亮
    markText: {
      type: Array,
      default() {
        return [];
      }
    },
    // 选中
    selectionLine: {
      type: Array,
      default() {
        return [];
      }
    },
    // 行标记
    gutterMarker: {
      type: Array,
      default() {
        return [];
      }
    },
    // 视图跳转到某行
    scrollIntoView: {
      type: Object,
      default() {
        return {};
      }
    },
    // 焦点到某行
    setCursorLine: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      changeStatus: 0,
      mapArray: [],
      // 内部真实的内容
      code: '',
      // 编辑器实例
      coder: null,
      // 默认配置
      options: {
        // 缩进格式
        // tabSize: 2,
        // 显示行号
        lineNumbers: true,
        line: true,
        tabSize: 4,
        /* extraKeys: { // 触发按键
           'Ctrl': 'autocomplete'
         },*/
        // mode: {name: 'javascript', json: true},
        // theme: "eclipse",
        styleActiveLine: true,
        foldgutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers', 'breakpoints', 'note-gutter'],
        lineWrapping: true,// 代码折叠
        foldGutter: true,
        matchBrackets: true,// 括号匹配
        autoCloseBrackets: true,
        textWrapping: true
        // highlightSelectionMatches: {showToken: true, annotateScrollbar: false}
        // highlightSelectionMatches: {
        //   minChars: 2,
        //   showToken:/\b(java)\b/,
        //   style:'matchhighlight',
        //   annotateScrollbar: true
        // }
      },
      origLeft: null,
      origRight: null
    };
  },
  computed: {
    tooltipId() {
      return `dj-json-${Math.floor(Math.random() * 10000)}`;
    },
    jsonValue() {
      return this.getJsonValue(this.value);
    },
    jsonValueLeft() {
      return this.getJsonValue(this.valueLeft);
    },
    jsonValueRight() {
      return this.getJsonValue(this.valueRight);
    }
  },
  mounted() {
    // console.log(this.value, 'mounted code编辑器')
    // 初始化
    // console.log(window.CodeMirror,CodeMirror,CodeMirror?.modeInfo,'1111111');
    for (let i = 0; i < CodeMirror?.modeInfo?.length; i++) {
      let modeInfo = CodeMirror.modeInfo[i];
      this.mapArray.push({name: modeInfo.name, modeId: modeInfo.mode});
    }
    // console.log(this.mapArray, 'mapArray');
    if (this.diff) {
      this.origLeft = this.jsonValueLeft;
      this.code = this.jsonValue;
      this.origRight = this.jsonValueRight;
      this.initDiff(this.jsonValueLeft, this.jsonValue, this.jsonValueRight);
    } else {
      this.init();
    }
    this.themeChange();
    this.modeChange();
    this.sizeChange();
  },
  watch: {
    'configParams.readOnly': {
      handler(val, oldVal) {
        // console.log(val, oldVal,'configParams11');
        this.watchConfigFun(val, oldVal, 'configParams', 'readOnly');
      },
      deep: true
    },
    'leftConfig.readOnly': {
      handler(val, oldVal) {
        // console.log(val, oldVal,'leftConfig');
        this.watchConfigFun(val, oldVal, 'leftConfig', 'readOnly');
      },
      deep: true
    },
    'rightConfig.readOnly': {
      handler(val, oldVal) {
        // console.log(val, oldVal,'rightConfig');
        this.watchConfigFun(val, oldVal, 'rightConfig', 'rightConfig');
      },
      deep: true
    },
    value(val) {
      /* console.log(this.valueLeft, val, 'value=====');
      if (this.diff) {
        if (this.coder?.edit) {
          this.changeStatusFun(this.coder?.edit, true, this.value);
        }
      } else {
        this.changeStatusFun(this.coder, true, this.value);
      }*/
      if (this.value != this.code) {
        this.updated();
      }
    },
    /* code(val) {
     // console.log(val, 'code=====');
    },*/
    valueLeft(val) {
      if (this.valueLeft != this.origLeft) {
        this.updated();
      }
      /* console.log(val, 'valueLeft=====');
      this.origLeft = val;
      this.changeStatusFun(this.coder?.left?.orig, true, this.valueLeft);
      // console.log(val, this.valueLeft, 'valueLeft');
      // if (this.diff) {
      //   this.initDiff(this.origLeft, this.value, this.origRight)
      // }*/
    },
    valueRight(val) {
      if (this.valueRight != this.origRight) {
        this.updated();
      }
      /* this.origRight = val;
      // if (this.diff) {
      //   this.initDiff(this.origLeft, this.value, this.origRight)
      // }
      if (this.coder?.right?.orig) {
        this.changeStatusFun(this.coder?.right?.orig, true, this.valueRight);
      }*/
    },
    theme() {
      this.themeChange();
    },
    language(val) {
      // console.log(this.language, 'language');
      this.modeChange();
    },
    changeStatus(val) {
      // console.log(val,'changeStatus');
      if (this.diff) {
        if (this.coder?.left?.orig) {
          this.changeStatusFun(this.coder?.left?.orig, val, this.jsonValueLeft);
        }
        if (this.coder?.edit) {
          this.changeStatusFun(this.coder?.edit, val, this.jsonValue);
        }
        if (this.coder?.right?.orig) {
          this.changeStatusFun(this.coder?.right?.orig, val, this.jsonValueRight);
        }
      } else {
        /* if (val === false) {
          this.coder.setValue('');
        } else {
          this.coder.setValue(this.value || '');
        }*/
        this.changeStatusFun(this.coder, val, this.jsonValue);
      }
      // console.log(val, this.value, 'changeStatus=====');
    }
  },
  methods: {
    watchConfigFun(val, oldVal, position, key) {
      // console.log(val, oldVal);
      let coder = this.getCoder(position);
      if (val !== oldVal) {
        this.readOnlyFun(coder, this[position][key]);
      }
    },
    getCoder(key) {
      let coder;
      if (this.diff) {
        if (key === 'leftConfig') {
          coder = this.coder?.left?.orig;
        } else if (key === 'rightConfig') {
          coder = this.coder?.right?.orig;
        } else {
          coder = this.coder?.edit;
        }
      } else {
        coder = this.coder;
      }
      return coder;
    },
    getJsonValue(val) {
      if (this.jsonFormat) {
        if (val && typeof val === 'string') {
          try {
            var obj = JSON.parse(val);
            if (typeof obj === 'object' && obj) {
              return JSON.stringify(obj, null, '\t');
            }
            return val;
          } catch (e) {
            return val;
          }
        }
        return val;
      }
      return val;
    },
    updated() {
      this.changeStatus++;
    },
    changeStatusFun(coder, changeStatus, val) {
      coder.setValue(val || '');
      /* if (changeStatus === false) {
        coder.setValue('');
      } else {
        coder.setValue(val || '');
      }*/
    },
    getJson() {
      // console.log(this.origLeft, '\n', this.code, '\n', this.origRight, 'getJson');
    },
    initDiff(origLeft, value, origRight) {
      if (value === null) {
        return;
      }
      let target = document.getElementById('dj-json-view');
      target.innerHTML = '';
      // eslint-disable-next-line new-cap
      this.coder = CodeMirror.MergeView(target, {
        value: value,
        origLeft: origLeft !== null ? origLeft : null,
        orig: origRight !== null ? origRight : null,
        cursorHeight: 1, // 光标高度
        lineNumbers: true,
        allowEditingOriginals: true,
        matchBrackets: true,// 匹配括号
        // revertButtons: true, // 是否显示还原按钮
        // searchbox: true
        ...this.options
        // highlightDifferences: "highlight",//有差异的地方是否高亮
        // connect: null,
        // revertButtons: false,//revert按钮设置为true可以回滚
        // styleActiveLine: true,//光标所在的位置代码高亮
        // smartIndent: true, // 智能缩进
        // matchBrackets: true, // 括号匹配
        // textWrapping: true,
        // foldGutter:true,//代码折叠
        // lineWrapping:true,//代码折叠
        // gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
      });
      // console.log(this.coder, 'this.coder');
      this.themeChange();
      if (origLeft !== null) {
        this.readOnlyFun(this.coder.left.orig, this.leftConfig?.readOnly);
        this.markTextFun(this.coder.left.orig, this.leftConfig?.markText);
        this.gutterMarkerFun(this.coder.left.orig, this.leftConfig?.gutterMarker);
        this.setSelectionFun(this.coder.left.orig, this.leftConfig?.selectionLine);
        this.codeChange(this.coder.left.orig, 'origLeft');

      }
      if (value !== null) {
        this.readOnlyFun(this.coder.edit, this.configParams?.readOnly);
        this.markTextFun(this.coder.edit, this.configParams?.markText);
        this.gutterMarkerFun(this.coder.edit, this.configParams?.gutterMarker);
        this.setSelectionFun(this.coder.edit, this.configParams?.selectionLine);
        this.codeChange(this.coder.edit, 'code');
      }
      if (origRight !== null) {
        this.readOnlyFun(this.coder.right.orig, this.rightConfig?.readOnly);
        this.markTextFun(this.coder.right.orig, this.rightConfig?.markText);
        this.gutterMarkerFun(this.coder.right.orig, this.rightConfig?.gutterMarker);
        this.setSelectionFun(this.coder.right.orig, this.rightConfig?.selectionLine);
        this.codeChange(this.coder.right.orig, 'origRight');
      }
      // this.coder.edit.scrollIntoView({line:100, ch: 11});
    },
    codeChange(coder, key) {
      coder.on('change', (coder) => {
        this[key] = coder.getValue();
        if (this.$emit) {
          this.$emit('codeChange', this.origLeft, this.code, this.origRight);
        }
      });
    },
    // 主题
    themeChange() {
      // console.log(this.theme, 'this.theme');
      let theme = this.theme || 'eclipse';
      if (theme) {
        require('codemirror/theme/' + theme + '.css');
        if (this.diff) {
          this.coder?.edit?.setOption('theme', theme);
          this.coder?.left?.orig?.setOption('theme', theme);
          this.coder?.right?.orig?.setOption('theme', theme);
        } else {
          this.coder?.setOption('theme', theme);
        }
      }
    },
    // 语言
    modeChange() {
      // console.log(this.language, 'this.language');
      let mode = this.language || 'javascript';
      if (mode) {
        require('codemirror/mode/' + mode + '/' + mode);
        if (this.diff) {
          this.coder?.edit?.setOption('mode', mode);
          this.coder?.left?.orig?.setOption('mode', mode);
          this.coder?.right?.orig?.setOption('mode', mode);
        } else {
          this.coder?.setOption('mode', mode);
        }
      }
    },
    // 行高亮
    readOnlyFun(coder, readOnly) {
      coder.setOption('readOnly', readOnly);
    },
    // 大小
    sizeChange() {
      // let sia=this.height;
      if (this.diff) {
        this.coder?.edit?.setSize(this.width, this.height);
        this.coder?.left?.orig?.setSize(this.width, this.height);
        this.coder?.right?.orig?.setSize(this.width, this.height);
        let mergeDom = document?.getElementById(this.tooltipId)?.querySelector('.CodeMirror-merge');
        // console.log(mergeDom, 'mergeDom');
        if (mergeDom && this.height) {
          mergeDom.style.height = this.height;
        }
        /* if (this.width) {
          mergeDom.style.width = this.width;
        }*/
      } else {
        this.coder.setSize(this.width, this.height);
      }
    },
    // 行高亮
    markTextFun(coder, markTextArr) {
      for (let i in markTextArr) {
        coder.markText(markTextArr[i].start, markTextArr[i].end, markTextArr[i].element);
      }
    },
    // 标记
    makeMarker(color, innerHTML) {
      var marker = document.createElement('div');
      marker.style.color = color;
      marker.innerHTML = innerHTML;
      // marker.appendChild(innerHTML);
      // console.log(color, innerHTML, marker, 'makeMarker');
      return marker;
    },
    // 行标记
    gutterMarkerFun(coder, gutterMarkerArr) {
      for (let j in gutterMarkerArr) {
        coder.setGutterMarker(gutterMarkerArr[j].line, 'note-gutter', this.makeMarker(gutterMarkerArr[j].color, gutterMarkerArr[j].innerHTML));
      }
      /* console.log(coder,gutterMarkerArr);
      if (!gutterMarkerArr) {
        let mergeDom = document?.getElementById(this.tooltipId)?.querySelector('.note-gutter');
        mergeDom.classList.add('width0');
        /!* let noteDom = document?.querySelectorAll('#'+this.tooltipId+' .note-gutter');
        console.log(document?.getElementById(this.tooltipId),noteDom, 'noteDom');
        // noteDom.add('width0');
        for (let i in noteDom) {
          if (noteDom[i] && noteDom[i].style) {
            console.log(noteDom[i] , 'noteDom[i] ');
            // noteDom[i].style.width = '0';
            noteDom[i].classList.add('width0');
          }
        }*!/
        // coder.refresh();
      }*/
    },
    // 选中行
    setSelectionFun(coder, setSelectionArr) {
      for (let i in setSelectionArr) {
        coder.setSelection(setSelectionArr[i].start, setSelectionArr[i].end);
      }
    },
    // 焦点到某行
    setCursorFun(coder, setCursorLine) {
      if (setCursorLine) {
        coder.setCursor(setCursorLine.line, setCursorLine.ch);
        coder.focus();
      }
      // this.coder.setCursor(100,5);
      // this.coder.focus();
    },
    // 焦点到某行
    scrollIntoViewFun(coder, scrollIntoView) {
      if (scrollIntoView) {
        coder.scrollIntoView(scrollIntoView);
      }
    },
    // 初始化
    init() {
      // console.log('init');
      // 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
      this.coder = CodeMirror.fromTextArea(this.$refs.textarea, this.options);
      // 编辑器赋值
      this.coder.setValue(this.jsonValue || this.code);
      // console.log(this.value, this.code, '111111111')
      // 支持双向绑定
      this.coder.on('change', (coder) => {
        this.code = coder.getValue();
        if (this.$emit) {
          this.$emit('input', this.code);
        }
      });
      // console.log(this.coder, 'this.coder000')
      this.$emit('languageList', this.mapArray);
      /* let self=this;
      this.coder.on('gutterClick', function (cm, n) {
        var info = self.coder.lineInfo(n);
       // console.log(self.coder, n, '11')
        self.coder.setGutterMarker(n, " breakpoints", info.gutterMarkers ? null : self.makeMarker('orange', '<i class="iconfont home"></i>'))
      });*/

      this.readOnlyFun(this.coder, this.configParams?.readOnly);
      this.markTextFun(this.coder, this.configParams?.markText);
      this.gutterMarkerFun(this.coder, this.configParams?.gutterMarker);
      this.setSelectionFun(this.coder, this.configParams?.selectionLine);
      // this.setCursorFun(this.coder, this.setCursorLine);
      // this.scrollIntoViewFun(this.coder,this.scrollIntoView);
      // this.coder.scrollIntoView({line:20, ch: 11});

      /* this.coder.setGutterMarker(4, "note-gutter", this.makeMarker('orange', '<i class="iconfont home"></i>'));
      this.coder.setGutterMarker(5, "note-gutter", this.makeMarker('pink', '<i class="iconfont notification"></i>'));*/
      /* this.coder.markText({line: 0, ch: 0}, {line: 2, ch: 0}, {className: "errorHighlight"});
      this.coder.markText({line: 3, ch: 0}, {line: 6, ch: 0}, {className: "errorHighlight"});
      this.coder.markText({line: 13, ch: 0}, {line: 16, ch: 0}, {className: "errorHighlight2"});
      this.coder.markText({line: 100, ch: 0}, {line: 101, ch: 0}, {className: "errorHighlight2"});*/
      // this.coder.scrollIntoView({line:100, ch: 11});
      // this.coder.setCursor(100,5);
      // this.coder.focus();
      // this.coder.options.highlightSelectionMatches = {showToken: true, annotateScrollbar: true};

      // console.log(this.value, this.code, '222222222')
      // 尝试从父容器获取语法类型
      /* if (this.language) {
        // 获取具体的语法类型对象
        let modeObj = this._getLanguage(this.language);
        // 判断父容器传入的语法是否被支持
        if (modeObj) {
          this.mode = modeObj.label;
        }
      }*/
    },
    // 获取当前语法类型
    _getLanguage(language) {
      // 在支持的语法类型列表中寻找传入的语法类型
      return this.modes.find((mode) => {
        // 所有的值都忽略大小写，方便比较
        let currentLanguage = language.toLowerCase();
        let currentLabel = mode.label.toLowerCase();
        let currentValue = mode.value.toLowerCase();
        // console.log(mode, language, '_getLanguage');
        // 由于真实值可能不规范，例如 java 的真实值是 x-java ，所以讲 value 和 label 同时和传入语法进行比较
        return currentLabel === currentLanguage || currentValue === currentLanguage;
      });
    }
  }
};
</script>

<style lang="less">
</style>
