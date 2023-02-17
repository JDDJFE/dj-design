### popover 属性说明
| 属性 | 类型 | 参数说明 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| trigger | String | 触发方式 | click / focus / hover | click |
| title | String | 标题 | - | - |
| content | String | 显示的内容，也可以通过 `slot` 传入 DOM | - | - |
| width | String, Number | 宽度 | - | - |
| zIndex | Number | zIndex | - | 79 |
| placement | String | 气泡框位置 | top / left / right / bottom / topLeft / topRight / bottomLeft / bottomRight / leftTop / leftBottom / rightTop / rightBottom | top |
| disabled | Boolean | Popover 是否禁用 | - | false |
| visible | Boolean | 用于手动控制浮层显隐 | - | false |
| openDelay | Number | 触发方式为 hover 时的显示延迟，单位为毫秒 | - | - |
| closeDelay | Number | 触发方式为 hover 时的隐藏延迟，单位为毫秒 | - | - |
| appendToBody | Boolean | 是否需要插入到body | - | false |
| className | String | popover元素的class | - | - |

### slot 属性说明
| 参数 | 说明 |
| --- | --- |
| content | Popover 内嵌 HTML 文本 |
| - | 触发 Popover 显示的 HTML 元素 |
