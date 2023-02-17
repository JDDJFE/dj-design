### 属性说明

| 属性     | 类型| 参数说明  | 枚举值   |  默认值  |
| -------- | -----:| -----:  |-----:  | :----:  |
| value/v-model   |  String |元素值 |  -  |   -   |
| name |  String  | 元素名称  |  - | - |
| placeholder |  String  | 规定帮助用户填写输入字段的提示  |  - | - |
| disabled |  Boolean  | 禁用此元素  |  true,false | false |
| readonly |  Boolean  | 规定输入字段为只读  |  true,false | false |
| autofocus |  Boolean  | 规定在页面加载后文本框自动获得焦点  |  - | - |
| showInput |  Boolean  | input是否隐藏  |  true 展示 / false 隐藏 | true |


### Events 说明

| 事件名称     | 事件说明  | 毁掉参数  |
| -------- | -----:| ----:  |
| focus     |  color获得焦点时触发   |  （value: val, elemnt: el）  |
| blur   |   color失去焦点时触发   |  （value: val, elemnt: el）  |
| change |  color发生改变并失去焦点时触发   |  （value: val, elemnt: el）  |
| input |  color值改变时触发   |  （value: val, elemnt: el）  |
| click |  点击color时触发   |  （value: val, elemnt: el）  |