### Props 参数说明

| 属性     | 类型| 参数说明  | 枚举值   |  默认值  |
| -------- | -----:| -----:  |-----:  | :----:  |
| value/v-model   |  Array | 组件数据 |  -  |   -   |
| draggable |  Boolean  | 是否允许拖拽排序  |  true,false | false |
| draglevel |  Boolean  | 是否允许跨级拖拽排序  |  true,false | false |
| dragDisable |  Array  | 指定不允许拖拽的节点ID  |  [ 101 ] | [] |
| expandeds |  Array  | 指定需要展开的节点  |  [{id: 1, label: '节点1'}] | [] |
| checkeds |  Array  | 制定选中项，支持sync双向绑定  |  [{id: 1, label: '节点1'}] | [] |
| checkMaxCount |  Number  | 制定最多选择项，默认无限制  |  - | - |


### Slots 说明

| name     | 参数说明  
| -------- | -----|
| default     |  默认插槽
| right   |   自定义右侧区域


### Events 说明

| 事件名称     | 事件说明  | 毁掉参数  |
| -------- | -----:| ----:  |
| expandChange     |  展开或收起节点触发   |  （expand, node, level)  |
| checkChange   |   选择节点触发   |  （checked, node, level）  |
| dragend |  拖拽排序后触发,响应排序后的数组   |  （nodes, level）  |
