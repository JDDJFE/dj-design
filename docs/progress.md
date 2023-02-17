### 属性说明

各类型共用的属性。
| 属性 | 类型| 参数说明 | 枚举值 | 默认值 |
| -------- | -----: | -----: | -----: | :----: |
| type | String | 进度条类型 | `line` `circle` `dashboard` | line |
| status | String | 进度条状态（颜色） | `success` `warning` `error` `primary` | primary |
| percentage | Number | 百分比 | `1 ～ 100` | 0 |
| strokeWidth | Number | 进度条的高/厚度 | - | 6（单位：px） |

#### type="line"
| 属性 | 类型| 参数说明 | 枚举值 | 默认值 |
| -------- | -----: | -----: | -----: | :----: |
| color | `String` `Array` | 进度条颜色 | - | - |
| showIcon | Boolean | 是否显示icon | `true` `false` | true |
| textInside | Boolean | 百分比是否在进度条内部显示 | `true` `false` | false |
| active | Boolean | 设置进度条是否有滑动的动效 | `true` `false` | false |

#### type="line"
| 属性 | 类型| 参数说明 | 枚举值 | 默认值 |
| -------- | -----: | -----: | -----: | :----: |
| width | `Number` | 进度条宽度 | - | 300 |

#### type="circle / dashboard"
| 属性 | 类型| 参数说明 | 枚举值 | 默认值 |
| -------- | -----: | -----: | -----: | :----: |
| width | `Number` | 进度条直径 | - | 120 |
