### Props 参数说明

| 属性     | 类型| 参数说明  | 参数   |  默认值  |
| -------- | -----:| -----:  |-----:  | :----:  |
| value / v-model     |  String|绑定值，选中选项卡的 name|  -|   第一个选项卡的 name    |
| type     |  String|风格类型|square/border/card/fillet |    border   |
| label     |  String|	选项卡标题	| -|    -   |
| name     |  String|与选项卡绑定值 value 对应的标识符，表示选项卡别名|- |  该选项卡在选项卡列表中的顺序值  |
| icon     |  String|tab图标|-  |     -   |
| border     |  Boolean|是否使用边框|-  |     false |
| slot     |  String|tab-pane中自定义标签|-  |     'tab' |
| tabPosition     |  String|选项卡所在位置| top/right/bottom/left  |     'top' |
| lazy     |  Boolean|支持动态加载(v-if方式展示)|-  |     false |

### Events 事件说明

| 事件名称     | 参数说明  |  回调参数  |
| -------- |  -----:  |:----:  |
| tab-change |  tab 被选中时触发  | （value: val, label:label, element: el）|
