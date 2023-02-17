
### Props 参数说明

| 属性     | 类型| 参数说明  | 参数   |  默认值  |
| -------- | -----:| -----:  |-----:  | :----:  |
| value/v-model|  Boolean/String/Number|绑定值|  - |   -  |
| placeholder|String |占位符|  - | 请选择 |
| disabled|  Boolean|是否禁用| -  |  false  |
| clearable |  Boolean |是否可以清空选项  | -  | false |
| searchable |  Boolean  | 是否可搜索  |  - | false |
| multiple|  Boolean	|是否多选|  - |   false  |
| multipleAll|  Boolean	|是否开启多选中的全选|  - |   false  |
| collapse |  Boolean	|	在multiple状态下，多选时是否将选中值合并展示|  - |   false  |
| limit |  Number	|	在multiple状态下，多选时用户最多可以选择的项目数，为 0 则不限制|  - |   0  |
| noBordered |  Boolean	|	是否有边框 |  - |   默认显示，false  |
| nodata |  String	|	选项为空时显示的文字 |  - |   未匹配到数据  |
| width |  String	|	样式宽度 |  - |   100%  |
| height |  String	|	样式高度 |  - |   100%  |
| size |  String  |  设置尺寸 | large(大) / small(小) / mini(迷你)	 | medium 
| zIndex |  Number  |  popover的zIndex | - | 79 

### Events 事件说明

| 属性     | 类型| 说明  | 回调参数   | 
| -------- | -----:| -----:  |-----:  | 
| change |  Events  | 选中值发生变化时触发 |  目前的选中值 |
| close |  Events  | 多选模式下移除tag时触发 |  (移除的tag值, 选中值) |
| clear |  Events  | 可清空的单选模式下用户点击清空按钮时触发 | - |
| focus |  Events  | 获得焦点时触发 | - |
| blur |  Events  | 失去焦点时触发 | - |


### Option 参数说明

| 属性     | 类型| 参数说明  | 参数   |  默认值  |
| -------- | -----:| -----:  |-----:  | :----:  |
| value|   String/Number|选项的值| -  |   -  |
| label|  String/Number	|选项的标签| -  |   - |
| disabled |  Boolean  | 是否禁用该选项  |  - | false |

### Option-Group 参数说明

| 属性     | 类型| 参数说明  | 参数   |  默认值  |
| -------- | -----:| -----:  |-----:  | :----:  |
| label|   String |分组的组名| -  |   -  |
| disabled|  Boolean	|是否将该分组下所有选项置为禁用|  - |  false  |
