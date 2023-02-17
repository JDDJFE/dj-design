
### Props 参数说明

| 属性     | 类型| 参数说明  | 参数   |  默认值  |
| -------- | -----:| -----:  |-----:  | :----:  |
| value/v-model|  String/Array|绑定值|  - |   -  |
| type|  String |	显示类型| year/month/week/date/datetime/datetimerange/ daterange  |  date  |
| placeholder|String/Array |占位符，range双拼类为数组[start-placeholder, end-placeholde]|  - | 默认 |
| disabled|  Boolean|是否禁用| -  |  false  |
| clearable |  Boolean |是否可以清空选项  | -  | false |
| format |  string  | 展示的日期格式  | 具体查看'日期格式' | yyyy-MM-dd、yyyy-MM-dd HH:mm:ss |
| size |  String  |  设置尺寸 | large(大) / small(小) / mini(迷你)	 | medium 
| name |  String	|	原生属性|  - |   -  |
| separator |  String	|	两个日期间的分隔符|  - |   -  |
| defaultTime |  String/ Array[string,string]	|	选中日期所使用的当日内具体时刻 |  - |  00:00:00  |
| defaultValue |  Date	|	选择器打开时默认显示的时间 |  - |   未开发！！！  | 
| sectionTime |  Array/String	|	最大时间最小时间范围|  - |   未开发！！！  |
| multiple|  Boolean	|是否多选|  - |   未开发！！！  |

### PickerOptions
| 参数     | 说明| 类型  |
| -------- | -----:| -----:  |
| shortcuts |  设置快捷选项，需要传入 { text, onClick, value } | [] |
| disabledDate |  设置禁用状态，参数为当前日期，要求返回 Boolean  | Function |
| cellClass |  设置日期的 class  | Function(Date) |

### Events 事件说明

| 属性     | 类型| 说明  | 回调参数   | 
| -------- | -----:| -----:  |-----:  | 
| change |  Events  | 选中值发生变化时触发 |  目前的选中值 |
| clear |  Events  | 可清空的单选模式下用户点击清空按钮时触发 | event |
| focus |  Events  | 获得焦点时触发 | event |
| blur |  Events  | 失去焦点时触发 | event |
| fromChange |  Events  | 用于range双拼类的操作回调 | 中国标准时间格式, 时间字符串 |
| toChange |  Events  | 用于range双拼类的操作回调 | 中国标准时间格式, 时间字符串 |



### Date 日期格式

| 格式     | 含义| 备注  | 举例   |
| -------- | -----:| -----:  |-----:  |
|yyyy	|年	|	|2017
|M	|月	|不补0	|1
|MM	|月		| |01
|W	|周	|仅周选择器的 format 可用；不补0	|1
|WW	|周	|仅周选择器的 format 可用	|01
|d	|日	|不补0	|2
|dd	|日	|	|02
|H	|小时	|24小时制；不补0|	3
|HH	|小时	|24小时制	|03
|h	|小时	|12小时制，须和 A 或 a 使用；不补0	|3
|hh	|小时	|12小时制，须和 A 或 a 使用	|03
|m	|分钟	|不补0|	4
|mm	|分钟	|	|04
|s	|秒	|不补0	|5
|ss	|秒	|	|05