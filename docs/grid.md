### Row Attributes

| 属性     | 类型| 参数说明  | 枚举值   |  默认值  |
| -------- | -----:| -----:  |-----:  | :----:  |
| gutter   |  Number |栅格间隔 |  -  |   -   |
| type |  String  | 布局模式，可选 flex  |  - | - |
| justify |  String  | flex 布局下的水平排列方式  | center/flex-start/flex-end/space-between/space-around | - |
| align |  String  | flex 布局下的垂直排列方式  |  center/flex-start/flex-end | - |


### Col Attributes

| 属性     | 类型| 参数说明  | 枚举值   |  默认值  |
| -------- | -----:| -----:  |-----:  | :----:  |
| span   |  Number |栅格占位格数，为 0 时相当于 display: none |  -  |   24  |
| order |  Number  | 栅格顺序 |  - | 0 |
| offset |  Number  | 栅格左侧的间隔格数 |  - | - |
| push |  Number  | 栅格向右移动格数  | - | - |
| pull |  Number  | 栅格向左移动格数  | - | - |
| xs |  Number  | 屏幕 < 576px 响应式栅格，可为栅格数或一个包含其他属性的对象  | - | - |
| sm |  Number  | 屏幕 ≥ 576px 响应式栅格，可为栅格数或一个包含其他属性的对象  | - | - |
| md |  Number  | 屏幕 ≥ 768px 响应式栅格，可为栅格数或一个包含其他属性的对象  | - | - |
| lg |  Number  | 屏幕 ≥ 992px 响应式栅格，可为栅格数或一个包含其他属性的对象  | - | - |