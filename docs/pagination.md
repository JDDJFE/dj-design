
### Props 参数说明

| 属性     | 类型| 参数说明  | 参数   |  默认值  |
| -------- | -----:| -----:  |-----:  | :----:  |
| total|  Number|总条目数|   |   0  |
| pageSize|  Number	|分页数 在下方pageSizes配置的数组中找|   |   10  |
| currentPage|  Number|当前页数，支持 .sync 修饰符|   |   1  |
| pageSizes |  Array |每页显示个数选择器的选项设置，不使用时则不展示个数选择器  |   | [] |
| border |  Boolean  | 是否使用竖线分页样式  |   | false |

### Events 事件说明

| 属性     | 类型| 说明  | 回调参数   | 
| -------- | -----:| -----:  |-----:  | 
| current-change |  Events  | currentPage 改变时会触发 |  (当前页, 每页条数) |
| size-change |  Events | pageSize 改变时会触发 |  每页条数 |