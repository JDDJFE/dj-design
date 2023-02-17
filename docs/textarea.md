### 属性说明

| 属性     | 类型| 参数说明  | 枚举值   |  默认值  |
| -------- | -----:| -----:  |-----:  | :----:  |
| value/v-model   |  String |文本区的值 |  -  |   -   |
| name |  String  | 规定文本区的名称  |  - | - |
| rows |  String  | 规定文本区内的可见行数  |  - | - |
| cols |  String  | 规定文本区内的可见宽度  |  - | - |
| autofocus |  Boolean  | 规定在页面加载后文本区域自动获得焦点  |  - | - |
| placeholder |  String  | 规定描述文本区域预期值的简短提示  |  - | - |
| disabled |  Boolean  | 规定禁用该文本区  |  true,false | false |
| readonly |  Boolean  | 规定文本区为只读  |  true,false | false |


### Events 说明

| 事件名称     | 事件说明  | 毁掉参数  |
| -------- | -----:| ----:  |
| focus     |  文本区获得焦点时触发   |  （value: val, elemnt: el）  |
| blur   |   文本区失去焦点时触发   |  （value: val, elemnt: el）  |
| change |  文本区发生改变并失去焦点时触发   |  （value: val, elemnt: el）  |
| input |  文本区值改变时触发   |  （value: val, elemnt: el）  |
| click |  点击文本区时触发   |  （value: val, elemnt: el）  |