### Json 属性说明
| 属性 | 类型 | 参数说明 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| value | string | json编辑器值 / 2个代码对比时右侧值/  3个代码对比时中间值 | - | - |
| valueLeft | string | 代码对比时左侧值 | - | - |
| valueRight | string | 代码对比时右侧值 | - | - |
| height | string/number | 编辑器高度 | - | - |
| language | string | 语言 | 具体详见基础用法 语言选中后ID值 | javascript |
| theme | string | 主题 | 具体详见基础用法 | eclipse |
| diff | boolean | 代码对比 | - | false |
| configParams | object | 配置参数 / 2个代码对比时右侧配置参数/  3个代码对比时中间配置参数 | configParams | - |
| leftConfig | object | 左侧编辑器配置参数 | configParams | - |
| rightConfig | object | 右侧编辑器配置参数 | configParams | - |
| jsonFormat | boolean | json格式是否格式化 | - | true |

### configParams 属性说明
| 属性 | 类型 | 参数说明 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| markText | array | 行高亮 | markText | - |
| selectionLine | array | 选中区域 | selectionLine | - |
| gutterMarker | array | 行标记 | gutterMarker | - |
| readOnly | Boolean | 只读 | `false` `true` `nocursor` | false |

### markText 属性说明
| 属性 | 类型 | 参数说明 | 参数 | 默认值 |
| --- | --- | --- | --- | --- |
| start | number | 起始行数 | `line`:行数, `ch`:字符数 | - |
| end | number | 截止行数 | `line`:行数, `ch`:字符数 | - |
| element | string | 具体配置 | `className`:为标记的文本片段分配CSS类，标记后需要写css样式；其余参数详见官方文档 | - |

### selectionLine 属性说明
| 属性 | 类型 | 参数说明 | 参数 | 默认值 |
| --- | --- | --- | --- | --- |
| start | number | 起始行数 | `line`:行数, `ch`:字符数 | - |
| end | number | 截止行数 | `line`:行数, `ch`:字符数 | - |

### gutterMarker 属性说明
| 属性 | 类型 | 参数说明 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| line | number | 行数 | - | - |
| color | string | 颜色 | - | - |
| innerHTML | string | 标记的元素 | - | - |

### Events 属性说明
| 事件名称 | 说明 | 参数
| --- | --- | --- |
| languageList | 获取编辑器所有语言 | languageList |
| codeChange | 编辑器change（仅`diff`为`true`时提供） | jsonStrLeft, jsonStr, jsonStrRight |
| sizeChange | 更新编辑器宽高定位，针对v-show未更新定位问题 | - |

