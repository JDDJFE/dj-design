### Tag 属性说明
| 属性 | 类型 | 参数说明 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | string | 类型 | success / processing / error / warning / default | - |
| circular | boolean | 标签是否是圆角类型 | - | false |
| closable | boolean | 标签是否可以关闭 | - | false |
| color | string | 标签色 | - | - |
| icon | string | 设置图标 | - | - |
| size | string | 尺寸，可选 `medium` `small` `mini`，不传则为默认大小 | medium / small / mini | - |
| effect | string | 主题，可选 `dark` `plain`，不传则为默认主题 | dark / plain | - |
| disabled | boolean | 是否禁用 | - | false |
| checkable | boolean | 标签是否可以选择 | - | false |
| checked | boolean | 设置标签的选中状态	 | - | false |

### Events 属性说明
| 事件名称 | 说明 | 回调函数
| --- | --- | --- |
| close | 关闭 Tag 时触发的事件 | - |
| click | 点击标签时触发的回调 | - |
| change | 可选择标签点击时触发的的回调 | - |
>注意：当 `checkable` 为 `false` 时 `click` 生效；当 `checkable` 为 `true` 时 `change` 生效；
