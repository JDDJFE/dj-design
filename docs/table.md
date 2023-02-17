### 属性说明

| 属性     | 类型| 参数说明  | 枚举值   |  默认值  |
| -------- | -----:| -----:  |-----:  | :----:  |
| value/v-model   |  Array |table数据， |  -  |   -   |
| data |  Array  | table数据，value 存在以value为准  |  - | - |
| selection |  Boolean  | 是否支持多选  |  true,false | false |
| selectionDisabled |  Function  | 禁用  |  - | - |
| selectionAll |  Boolean  | 是否支持全选  |  true,false | true |
| selectionRow |  Boolean  | 是否支持点击行选择  |  true,false | false |
| loading |  Boolean  | 加载中  |  true,false | false |
| height |  Number  | 固定头  |  - | - |
| nowrap |  Boolean  | 是否允许换行  |  true,false | false |
| striped |  Boolean  | 是否支持斑马条纹  |  true,false | false |
| emptyHeight |  String  | 设置table为空时的高度  |  - | - |
| draggable |  Boolean  | 支持拖拽排序  |  - | false |
| draghandler |  Boolean  | 是否显示显示手柄排序列  |  - | false |
| page |  Object  | 分页参数  |  - | - |
| page.pageNo |  Number  | page属性，当前页码  |  - | 1 |
| page.pageSize |  Number  | page属性，分页大小  |  - | 10 |
| page.totalCount |  Number  | page属性，总条数  |  - | - |
| page.pageSizes |  Array  | page属性，可切换页码  |  - | - |
| tree |  Object  | 支持树形结构  |  icon组件  | - |
| expand-tree-all |  Boolean  | 是否默认展开所有行，当 Table 包含展开行或者为树形表格时有效，注意：绑定时需要使用sync修饰符  |  -  | false |
| tree.children |  String  | tree中属性，children字段名  | -  | - |
| tree.hasChildren |  Boolean  | tree中属性，是否存在子集 懒加载  |  - | false |
| border |  Boolean  | 是否展示边框，默认展示  |  - | true |



### Methods 说明

| 事件名称     | 事件说明  | 回调参数  |
| -------- | -----:| ----:  |
| getCheckList     |  获取勾选列表   |  -  |
| setCheckList   |   设置勾选列表   |  （checkList: [row]）  |
| clearCheckList     |  清除勾选列表   |  -  |
| init   |   初始化table   | - |
| initData   |   初始化tableData   | - |

### slots 说明

| name     | 参数说明  
| -------- | -----|
| expand     |  展开行
| empty     |  数据为空展示设置


### Events 说明

| 事件名称     | 事件说明  | 回调参数  |
| -------- | -----:| ----:  |
| checkChange     |  勾选checkbox触发   |  （selection）  |
| pageChange   |   点击分页页码触发   |  （page: {pageNumber, pageSize}）  |
| rowClick   |   点击行元素触发   |  （row, event）  |
| expandChange   |   扩展行展开或收起时触发   |  （expand, row, event）  |
| sortChange   |   点击排序按钮时触发   |  （sort: {field, order}）  |
| dragend |  拖拽排序后触发   |  （tableData）  |


### table-column 说明

| 属性     | 类型| 参数说明  | 枚举值   |  默认值  |
| -------- | -----:| -----:  |-----:  | :----:  |
| label   |  String |标题内容 |  -  |   -   |
| field   |  String |内容字段名 |  -  |   -   |
| width   |  Number |列宽 |  -  |   -   |
| fixed   |  Boolean |固定列 |  true,false  |   false   |
| wordBreak   |  Boolean | 是否支持换行 |  true,false  |   false   |
| sort   |  Boolean | 是否支持排序 |  true,false  |   false   |


### table-column slots 说明

| name     | 参数说明  
| -------- | -----|
| default     |  自定义列内容
| header     |  自定义表头