### 属性说明

| 属性     | 类型| 参数说明  | 枚举值   |  默认值  |
| -------- | -----:| -----:  |-----:  | :----:  |
| type     |  String|input类型|text, number，password   |   text     |
| value/v-model   |  String/Number |元素值 |  -  |   -   |
| name |  String  | 元素名称  |  - | - |
| placeholder |  String  | 规定帮助用户填写输入字段的提示  |  - | - |
| disabled |  Boolean  | 禁用此元素  |  true,false | false |
| readonly |  Boolean  | 规定输入字段为只读  |  true,false | false |
| autofocus |  Boolean  | 规定在页面加载后文本框自动获得焦点  |  - | - |
| maxlength |  Number  | 规定输入字段中的字符的最大长度，如配置bytelength优先bytelength  |  - | - |
| bytelength |  Number  | 规定输入字段中的字节的最大长度  |  - | - |
| fixed |  Number  | 小数位数，type为number时才有效  |  - | - |
| icon |  String  | 输入框图标  |  icon组件  | - |
| iconposition |  String  | icon位置  |  left、right  | right |
| before |  String  | 输入框前置内容  |  - | - |
| after |  String  | 输入框后置内容  |  -  | - |
| showmaxlength |  Boolean  | 是否展示已输入长度和最大输入长度，设置maxlength或bytelength后方可  |  -  | - |
| showsearch |  Boolean  | 是否展示搜索按钮  |  -  | - |
| clearable |  Boolean  | 是否展示清除按钮  |  -  | - |
| showpassword |  Boolean  | 是否展示清除按钮，type为password方可  |  -  | - |
| inputfun |  Boolean  | input回调函数，限制输入内容  |  -  | - |
| funquery |  Boolean  | 建议内容回调函数，传入建议项列表  |  -  | - |


### Slots 说明

| name     | 参数说明  
| -------- | -----|
| before     |  输入框前置内容
| after   |   输入框后置内容
| option   |   建议选项自定义内容格式


### Events 说明

| 事件名称     | 事件说明  | 毁掉参数  |
| -------- | -----:| ----:  |
| focus     |  input获得焦点时触发   |  （value: val, elemnt: el）  |
| blur   |   input失去焦点时触发   |  （value: val, elemnt: el）  |
| change |  发生改变失去焦点或回车时触发   |  （value: val, elemnt: el）  |
| input |  input值改变时触发   |  （value: val, elemnt: el）  |
| click |  点击input时触发   |  （value: val, elemnt: el）  |
| enter |  点击回车时触发   |  （value: val, elemnt: el）  |
| query |  点击search时触发   |  （value: val, elemnt: el）  |
| select |  选择输入建议或远程搜索时触发   |  （item: item）  |
