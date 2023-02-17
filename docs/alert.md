### Props 参数说明
| 属性     | 类型| 参数说明  | 参数   |  默认值  |
| -------- | -----:| -----:  |-----:  | :----:  |
| type | String | 类型 | primary,success, info, warning, error | info |
| description | String | 辅助性文字。也可通过默认 slot 传入 | - | - |
| effect | String | 主题 | light, dark | light |
| colors | Array | [字体颜色,背景颜色,边框颜色] | - |   |
| border | Boolean | 是否有边框 | true,false | false |
| closable | Boolean | 是否可关闭警告框 | true,false | false |
| closeText | String | 关闭按钮自定义文本 | - | - |
| showIcon | Boolean | 带有icon的警示框 | true,false | false |
| center | Boolean | 文字是否居中 | true,false | false |
> 注释：<br>
> 当主体设置为effect时，字体颜色默认为白色，可去掉effect自定义字体颜色


### slot 
| Name     | Description| 
| -------- | -----:|
| message | 警告消息（标题） | 
| - | 描述 |

### Events
| 事件名称     | 说明 | 回调参数  | 
| -------- | -----:| -----:  |
| onClose | 关闭Alert时触发的事件 |  | 
| afterClose | 关闭Alert后触发的事件 |  | 
