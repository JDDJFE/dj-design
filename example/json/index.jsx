export default {
  title: 'JSON 编辑器',
  templates: [
    {
      title: '基本用法',
      template: `
        主题
        <dj-select class="ml10 mb10" v-model="theme" name="lala" size="small">
          <dj-option v-for="(val,i) in list" :value="val" :label="val"></dj-option>
        </dj-select>
        <dj-select class="ml10 mb10" v-model="language" @change="languagechange">
          <dj-option v-for="item in mapArray" :value='item.modeId' :label="item.name"></dj-option>
        </dj-select>
        <div class="ml10 disInB" style="line-height: 36px">language: {{language}}</div>
        <dj-button class="ml10" size="small" @click="setJson">改数据</dj-button>
        <dj-button class="ml10" size="small" @click="getJson">获取数据</dj-button>
        <dj-button class="ml10" size="small" @click="readOnlyFun">只读</dj-button>只读{{readOnly}}
        <dj-json ref="json" v-model="jsonStr" :theme="theme" :language="language" @languageList="languageList"
                 height="300px" :configParams="{readOnly: readOnly}"/>`,
      data: {
        data() {
          return {
            readOnly: false,
            language: '',
            mapArray: [],
            theme: '',
            jsonStr: 'var SpringUtil = com.jd.o2o.rcc.service.util.spring.SpringUtil;\nvar ArrayList = java.util.ArrayList;\nvar Integer = java.lang.Integer;\nvar syncConfigManager = SpringUtil.getBean("scriptSyncConfig");\n\nfunction main() {\n\n  \n   var hitRuleCodeList = result.get("hitRuleCodeList");\n   // 默认无风险  riskValue 只有10  和 -10  两个值；  10 表示有风险  -10 表示无风险\n   result.put("riskValue", new java.lang.Integer(-10));\n\n   if(hitRuleCodeList.size() > 0) {\n      result.put("riskValue", new java.lang.Integer(10));\n\n      var hitRuleConfig = syncConfigManager.getRuleConfig(finalHitCode);\n      if (hitRuleConfig != null) {\n          var riskLevel = hitRuleConfig.getRiskLevel();\n          result.put("riskLevel", riskLevel * 100);\n      }\n      JsLog.writeErr(result, "用户发起活动命中返回结果：");\n   }\n\n  JsLog.writeWarn(result, "用户发起活动风险校验返完成，返回结果：");\n}\n\nmain();',
            list: [
              '3024-day',
              '3024-night',
              'abcdef',
              'ambiance',
              'ambiance-mobile',
              'ayu-dark',
              'ayu-mirage',
              'base16-dark',
              'base16-light',
              'bespin',
              'blackboard',
              'cobalt',
              'colorforth',
              'darcula',
              'dracula',
              'duotone-dark',
              'duotone-light',
              'eclipse',
              'elegant',
              'erlang-dark',
              'gruvbox-dark',
              'hopscotch',
              'icecoder',
              'idea',
              'isotope',
              'lesser-dark',
              'liquibyte',
              'lucario',
              'material',
              'material-darker',
              'material-palenight',
              'material-ocean',
              'material-palenight',
              'mbo',
              'mdn-like',
              'midnight',
              'monokai',
              'moxer',
              'neat',
              'neo',
              'night',
              'nord',
              'oceanic-next',
              'panda-syntax',
              'paraiso-dark',
              'paraiso-light',
              'pastel-on-dark',
              'railscasts',
              'rubyblue',
              'seti',
              'shadowfox',
              'solarized',
              'ssms',
              'the-matrix',
              'tomorrow-night-bright',
              'tomorrow-night-eighties',
              'ttcn',
              'twilight',
              'vibrant-ink',
              'xq-dark',
              'xq-light',
              'yeti',
              'yonce',
              'zenburn'
            ]
          };
        },
        methods: {
          readOnlyFun() {
            this.readOnly = !this.readOnly;
          },
          setJson() {
            this.jsonStr = 'aa';
          },
          getJson() {
            console.log(this.list.length, this.jsonStr);
          },
          languageList(val) {
            this.mapArray = val;
            // console.log(this.mapArray, 'languageList');
          },
          languagechange(val, obj) {
            console.log(val, obj, 'languagechange');
          }
        }
      }
    },
    {
      title: '行标记 & 行高亮',
      template: `
        <dj-json v-model="jsonStr" :configParams="configParams"/>`,
      data: {
        data() {
          return {
            configParams: {
              selectionLine: [
                {start: {line: 10, ch: 0}, end: {line: 11, ch: 0}}
              ],
              gutterMarker: [
                {line: 0, color: 'orange', innerHTML: '△'},
                {line: 3, color: '#4c72dc', innerHTML: '<i class="iconfont notification"></i>'},
                {line: 6, color: 'pink', innerHTML: '<i class="iconfont home"></i>'}
              ],
              markText: [
                {start: {line: 0, ch: 0}, end: {line: 2, ch: 0}, element: {className: 'errorHighlight'}},
                {start: {line: 3, ch: 0}, end: {line: 6, ch: 0}, element: {className: 'errorHighlight'}},
                {start: {line: 13, ch: 0}, end: {line: 16, ch: 0}, element: {className: 'errorHighlight'}}
              ]
            },
            jsonStr: 'var SpringUtil = com.jd.o2o.rcc.service.util.spring.SpringUtil;\nvar ArrayList = java.util.ArrayList;\nvar Integer = java.lang.Integer;\nvar syncConfigManager = SpringUtil.getBean("scriptSyncConfig");\n\nfunction main() {\n\n  \n   var hitRuleCodeList = result.get("hitRuleCodeList");\n   // 默认无风险  riskValue 只有10  和 -10  两个值；  10 表示有风险  -10 表示无风险\n   result.put("riskValue", new java.lang.Integer(-10));\n\n   if(hitRuleCodeList.size() > 0) {\n      result.put("riskValue", new java.lang.Integer(10));\n\n      var hitRuleConfig = syncConfigManager.getRuleConfig(finalHitCode);\n      if (hitRuleConfig != null) {\n          var riskLevel = hitRuleConfig.getRiskLevel();\n          result.put("riskLevel", riskLevel * 100);\n      }\n      JsLog.writeErr(result, "用户发起活动命中返回结果：");\n   }\n\n  JsLog.writeWarn(result, "用户发起活动风险校验返完成，返回结果：");\n}\n\nmain();'
          };
        },
        methods: {
          getJson() {
            console.log(this.list.length, this.jsonStr);
          }
        }
      }
    },
    /* {
      title: '视图到某行 & 焦点到某行',
      template: `
        <dj-json v-model="jsonStr"
                 :setCursorLine="setCursorLine"
                 :scrollIntoView="scrollIntoView"
        />`,
      data: {
        data() {
          return {
            scrollIntoView: {line: 23, ch: 0},
            setCursorLine: {line: 23, ch: 0},
            jsonStr: 'var SpringUtil = com.jd.o2o.rcc.service.util.spring.SpringUtil;\nvar ArrayList = java.util.ArrayList;\nvar Integer = java.lang.Integer;\nvar syncConfigManager = SpringUtil.getBean("scriptSyncConfig");\n\nfunction main() {\n\n  \n   var hitRuleCodeList = result.get("hitRuleCodeList");\n   // 默认无风险  riskValue 只有10  和 -10  两个值；  10 表示有风险  -10 表示无风险\n   result.put("riskValue", new java.lang.Integer(-10));\n\n   if(hitRuleCodeList.size() > 0) {\n      result.put("riskValue", new java.lang.Integer(10));\n\n      var hitRuleConfig = syncConfigManager.getRuleConfig(finalHitCode);\n      if (hitRuleConfig != null) {\n          var riskLevel = hitRuleConfig.getRiskLevel();\n          result.put("riskLevel", riskLevel * 100);\n      }\n      JsLog.writeErr(result, "用户发起活动命中返回结果：");\n   }\n\n  JsLog.writeWarn(result, "用户发起活动风险校验返完成，返回结果：");\n}\n\nmain();'
          };
        },
        methods: {
          getJson() {
            console.log(this.list.length, this.jsonStr);
          }
        }
      }
    },*/
    {
      title: '代码对比 & 左侧只读',
      template: `
        <dj-button class="mb10" size="small" @click="getJson">获取数据</dj-button>
        <dj-button class="mb10" size="small" @click="updateFun">更改数据1</dj-button>
        <dj-button class="mb10" size="small" @click="updateFun2">更改数据2</dj-button>
        <dj-button class="ml10" size="small" @click="readOnlyFun">只读</dj-button>只读{{readOnly}}
        <dj-json ref="json" v-model="jsonStr" :valueLeft="jsonStrLeft" diff height="200px" :language="language"
                 :configParams="configParams" :leftConfig="leftConfig" @codeChange="codeChange"/>`,
      data: {
        data() {
          return {
            readOnly: false,
            configParams: {
              readOnly: false,
              markText: [
                {start: {line: 3, ch: 0}, end: {line: 6, ch: 0}, element: {className: 'errorHighlight'}},
                {start: {line: 13, ch: 0}, end: {line: 16, ch: 0}, element: {className: 'errorHighlight'}}
              ],
              selectionLine: [
                {start: {line: 10, ch: 0}, end: {line: 11, ch: 0}}
              ],
              gutterMarker: [
                {line: 3, color: 'pink', innerHTML: '<i class="iconfont notification"></i>'},
                {line: 6, color: '#6a5fce', innerHTML: '<i class="iconfont home"></i>'}
              ]
            },
            leftConfig: {
              readOnly: false,
              markText: [
                {start: {line: 1, ch: 0}, end: {line: 2, ch: 0}, element: {className: 'errorHighlight'}}
              ],
              selectionLine: [
                {start: {line: 12, ch: 0}, end: {line: 13, ch: 0}}
              ],
              gutterMarker: [
                {line: 0, color: 'orange', innerHTML: '△'}
              ]
            },
            language: 'apl',
            jsonStrLeft: 'var SpringUtil = com.jd.o2o.rcc.service.util.spring.SpringUtil;\nvar ArrayList = java.util.ArrayList;\nvar Integer = java.lang.Integer;\nvar syncConfigManager = SpringUtil.getBean("scriptSyncConfig");\n\nfunction main() {\n  \n   var hitRuleCodeList = result.get("hitRuleCodeList");\n   // 默认无风险  riskValue 只有10  和 -10  两个值；  10 表示有风险  -10 表示无风险\n   result.put("riskValue", new java.lang.Integer(-10));\n\n   if(hitRuleCodeList.size() > 0) {\n      result.put("riskValue", new java.lang.Integer(10));\n      var finalHitCode = hitRuleCodeList.get(0);\n      var hitRuleConfig = syncConfigManager.getRuleConfig(finalHitCode);\n      if (hitRuleConfig != null) {\n          var riskLevel = hitRuleConfig.getRiskLevel();\n          if(riskLevel == 1) {\n             result.put("riskLevel", "100");\n          } else if(riskLevel == 2) {\n             result.put("riskLevel", "200");\n          } else if(riskLevel == 3) {\n             result.put("riskLevel", "300");\n          }\n      }\n      JsLog.writeErr(result, "用户发起活动命中返回结果：");\n   }\n\n  JsLog.writeWarn(result, "用户发起活动风险校验返完成，返回结果：");\n}\n\nmain();',
            jsonStr: 'var SpringUtil = com.jd.o2o.rcc.service.util.spring.SpringUtil;\nvar ArrayList = java.util.ArrayList;\nvar Integer = java.lang.Integer;\nvar syncConfigManager = SpringUtil.getBean("scriptSyncConfig");\n\nfunction main() {\n\n  \n   var hitRuleCodeList = result.get("hitRuleCodeList");\n   // 默认无风险  riskValue 只有10  和 -10  两个值；  10 表示有风险  -10 表示无风险\n   result.put("riskValue", new java.lang.Integer(-10));\n\n   if(hitRuleCodeList.size() > 0) {\n      result.put("riskValue", new java.lang.Integer(10));\n\n      var hitRuleConfig = syncConfigManager.getRuleConfig(finalHitCode);\n      if (hitRuleConfig != null) {\n          var riskLevel = hitRuleConfig.getRiskLevel();\n          result.put("riskLevel", riskLevel * 100);\n      }\n      JsLog.writeErr(result, "用户发起活动命中返回结果：");\n   }\n\n  JsLog.writeWarn(result, "用户发起活动风险校验返完成，返回结果：");\n}\n\nmain();'
          };
        },
        methods: {
          readOnlyFun() {
            this.readOnly = !this.readOnly;
            // this.leftConfig.readOnly=this.readOnly;
            this.leftConfig.readOnly = this.readOnly;
            console.log(this.leftConfig.readOnly, 'this.leftConfig.readOnly');
          },
          getJson() {
            console.log(this.jsonStrLeft);
            console.log(this.jsonStr);
          },
          updateFun() {
            this.jsonStr = 'a';
            this.jsonStrLeft = 'b';
          },
          updateFun2() {
            this.jsonStr = 'aaaa';
            this.jsonStrLeft = 'bbbb';
          },
          codeChange(valLeft, val, valRight) {
            // console.log(valLeft);
            // console.log(val);
            // console.log(valRight);
            this.jsonStr = val;
            this.jsonStrLeft = valLeft;
          }
        }
      }
    },
    {
      title: 'JSON格式化',
      template: `
        <dj-json ref="json" v-model="jsonStr" height="300px"/>
        <dj-textarea v-model="jsonStr" style="width: 100%; height: 100px;"/>`,
      data: {
        data() {
          return {
            jsonStr: '{"code":"0","msg":"成功","detail":null,"result":{"pageNo":1,"pageSize":10,"maxPageSize":100,"totalCount":1,"resultList":[{"primaryKey":"6088bdf8e4b0b008d13dca22","spuId":10453667,"name":"保灵康宝 脚气膏 20g/盒","operationType":2,"operationTypeInfo":"新建","operationDesc":5,"operationDescInfo":"预备库新增标准商品","before":null,"after":null,"opKeys":null,"createTime":1619574264874,"createPin":"xuedui@imdada.cn"}],"page":1,"totalPage":1},"success":true}'
          };
        },
        methods: {}
      }
    }
  ]
};
