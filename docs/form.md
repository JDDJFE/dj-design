### 属性说明

| 属性     | 类型| 参数说明  | 枚举值   |  默认值  |
| -------- | -----:| -----:  |-----:  | :----:  |
| value/v-model   |  Object | formData |  -  |   -   |
| name |  String  | form元素的名称  |  - | - |
| type |  String  | 切换form编辑和详情模式  |  edit,info | edit |
| fields |  Array  | Json的方式配置form  |  - | - |
| rules |  Object  | 表单校验规则配置  |  - | - |
| labelwidth |  String  | 设置label宽度  |  - | 110px |
| inline |  Boolean  | 行内表单 |  true,false | false |
| showErrorMsg |  Boolean  | 自动聚焦  |  true,false | false |
| errorMsgPosition |  String  | 错误新奇气泡展示位置  |  left,right,top,bottom | right |
| autofocus |  Boolean  | 是否展示错误信息  |  true,false | false |
| disabled |  Boolean  | 规定禁用该表单（fields配置可用）  |  true,false | false |
| formwidth |  String  | 设置form宽度  |  - | 100% |
| checkPopover |  Boolean  | 是否以气泡形式展示校验提示  |  true,false | true |
| labelTop |  Boolean  | formItem的label是否展示在内容的上方  |  true,false | false |


### Methods 说明

| 事件名称     | 事件说明  | 回调参数  |
| -------- | -----:| ----:  |
| reset     |  清空表单   |  -  |
| validate   |   校验表单   | - |
| getErrorMsg     |  获取校验信息   |  -  |

### rules 说明

| 校验类型     | 校验说明  | 示例  |
| -------- | -----:| ----:  |
| empty     |  判断必填项是否为空（数组校验长度）   |  { type: 'empty' }  |
| type   |   判断类型 目前支持 （string、integer、boolean、array、object、float、date、phone、email、url） | { type: 'type', is: 'integer' } |
| min     |  根据类型判断 int 判断最小值 ，string 、array 判断最小长度   |  { type: 'min', min: 0 }  |
| max     |  根据类型判断 int 判断最大值 ，string 、array 判断最大长度   |  { type: 'max', max: 10 }  |
| range     |  根据类型判断 int 判断值范围 ，string 、array 判断长度范围   |  { type: 'range', min: 0, max: 10 }  |
| equal     |  根据类型判断 int 判断值相等 ，string 、array 判断长度相等   |  { type: 'equal', equal: 11 }  |
| regExp     |  根据正则表达式校验   |  { type: 'regExp', regExp: /^\-?\d+$/ }  |
| validator     |  自定义函数校验   |  { type: 'validator', validator: function(val, form){ if(val == 1) { return "XXX必须等于1" }; return true; } }  |
| transform     |  转换类型后校验 如日期 string 转 int 后在校验大小 目前支持（string、date、number）   |  { type: "transform", to: 'number', rule: { type: 'min', min: 0 } }  |
##### 格式：rules: { 字段名: [ { type: '校验类型', is: '校验参数' } ] }
##### 示例：rules: { phone: [ { type: 'empty' }, { type: 'type', is: 'phone' } ] }



### form-item 说明

| 属性     | 类型| 参数说明  | 枚举值   |  默认值  |
| -------- | -----:| -----:  |-----:  | :----:  |
| label   |  String | 标签文本 |  -  |   -   |
| field   |  String | 表单域字段 |  -  |   -   |
| fields   |  String | 表单域多字段（多个字段逗号分隔） |  -  |   -   |
| help   |  String | 说明文案 |  -  |   -   |
| helpWrap   |  Boolean | 说明文案是否换行 |  true,false  |   true  |
| helpColor   |  String | 设置说明文案颜色 |  -  |   -   |
| empty   |  Boolean | 是否必填 |  true,false  |   true   |
| colon   |  Boolean | 是否展示冒号 |  true,false  |   true   |
| form   |  Object | 指定formData（需要校验其他对象值时配置） |  -  |  默认form配置的formData |
| rule   |  Array | 校验规则 |  -  |   -   |
| view   |  Boolean | 是否允许展示详情（form切换type类型时） |  true,false  |   true   |
| inline |  Boolean  | 行内表单 |  true,false | false |
| showErrorMsg |  Boolean  | 自动聚焦  |  true,false | false |
| labelwidth |  String  | 设置label宽度  |  - | 120px |
| checkPopover |  Boolean  | 是否以气泡形式展示校验提示  |  true,false
| labelTop |  Boolean  | formItem的label是否展示在内容的上方  |  true,false 
| formItemWidth |  String  | 设置formItem宽度  |  - |  - |


### form-item Methods 说明

| 事件名称     | 事件说明  | 回调参数  |
| -------- | -----:| ----:  |
| reset     |  清空表单   |  -  |
| validate   |   校验表单   | - |
| resetValidate     |  清空校验   |  -  |
| getErrorMsg     |  获取校验信息   |  -  |


### form-item rules 说明

| name     | 参数说明  
| -------- | -----|
| default     |  表单项内容