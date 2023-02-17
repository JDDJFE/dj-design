### 属性说明

| 属性 | 参数说明 | 类型 | 枚举值 | 默认值 |
| --- | --- | --- | --- | --- |
| v-model/value | 选中项绑定值 | - | - | - |
| options | 可选项数据源，键名可通过 config 属性配置 | Array | - | - |
| config | 配置选项，具体见下表 | - | - | - |
| placeholder | 输入框占位文本 | string | - | '请选择' |
| disabled | 是否禁用 | boolean | - | false |
| clearable | 是否支持清空选项 | boolean | - | false |
| width | 选择器框的宽度 | string | - | '400px' |
| searchable | 是否支持可搜索 | boolean | - | false |
| radio | 是否开启单选 | boolean | - | false |
| separator | 分隔符 | string | - | '/' |

### Events 说明

| 事件名称 | 事件说明 | 回调参数 |
| --- | --- | --- |
| change | 当选中节点变化时触发 | 选中节点的值 |


### config 说明

| 属性 | 类型 | 参数说明 | 枚举值 | 默认值 |
| --- | --- | --- | --- | --- |
| labelKey | string | 指定选项标签为选项对象的某个属性值 | - | 'label' |
| valueKey | string | 指定选项的值为选项对象的某个属性值 | - | 'value' |
| childrenKey | string | 指定选项的子选项为选项对象的某个属性值 | - | 'children' |
| lazy | boolean | 是否动态加载子节点，需与 lazyLoad 方法结合使用 | - | false |
| lazyLoad | function(node, resolve)，node为当前点击的节点，resolve为数据加载完成的回调(必须调用) | 加载动态数据的方法，仅在 lazy 为 true 时有效 | - | - |
| checkStrictly | boolean | 是否支持选择至任意一级 | - | false |
| delayTime | number | 搜索关键词输入的去抖延迟，毫秒 | --- | 500 |