
### Props 参数说明

| 属性     | 类型| 参数说明  | 参数   |  默认值  |
| -------- | -----:| -----:  |-----:  | :----:  |
| v-model|string/number/boolean	 |绑定值| -	 | - |
| checked | Boolean	 |当前是否勾选| -	 | - |
| code| string/number/boolean |  选中状态的值（只有在checkbox-group或者绑定对象类型为array时有效） | -  |  -  |
| disabled|  Boolean |是否禁用| -  |  false  |
| indeterminate|  Boolean |设置 indeterminate 状态，只负责样式控制| -  |  false  |
| border|  Boolean |是否显示边框| -  |  false  |
| button|  Boolean |是否使用按钮单选| -  |  false  |
| buttonStyle|  String | RadioButton 的风格样式，目前有描边和填色两种风格| `outline` `solid` | solid |
| size |  String  |  设置尺寸，仅在 border/button 为真时有效 |  large(大) / small(小) / mini(迷你)	 | medium |


### Events 事件说明

| 属性     | 类型| 说明  | 回调参数   | 
| -------- | -----:| -----:  |-----:  | 
| change |  Events  | 当绑定值变化时触发的事件 | (更新后的值,更新后的属性) |



### Checkbox-Group 参数说明

| 属性     | 类型| 参数说明  | 参数   |  默认值  |
| -------- | -----:| -----:  |-----:  | :----:  |
| v-model|  Array |选项的值| -  |   -  |
| maxLimit |  Number  | 可被勾选的 checkbox 的最大数量  |  - | - |
| minLimit |  Number  | 可被勾选的 checkbox 的最小数量  |  - | - |
| disabled |  Boolean  | 是否禁用  |  - | false |
| border|  Boolean |是否显示边框| -  |  false  |
| button|  Boolean |是否使用按钮单选| -  |  false  |
| size |  String  |  设置尺寸，仅在 border/button 为真时有效 |  large(大) / small(小) / mini(迷你)	 | medium |
