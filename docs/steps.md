### djSteps 属性说明

| 属性 | 类型 | 参数说明 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| active | Number | 指定当前步骤，从 0 开始记数。在子 Step 元素中，可以通过 status 属性覆盖状态 | - | 0 |
| direction | String | 指定步骤条方向。目前支持水平（horizontal）和竖直（vertical）两种方向 | vertical / horizontal | horizontal |
| processStatus | String | 设置当前步骤的状态 | wait / process / finish / error | process |
| finishStatus | String | 设置结束步骤的状态 | wait / process / finish / error | finish |
| size | String | 指定大小，目前支持普通（default）和迷你（small） | default / small | default |
| simple | boolean | 是否应用简洁风格 | - | false |
### Events 属性说明
| change | 发生变化时触发 | - |

### Step 属性说明

| 属性 | 类型 | 参数说明 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| title | String | 标题 | - | - |
| subTitle | String | 子标题 | - | - |
| description | String | 步骤的详情描述 | - | - |
| status | String | 设置当前步骤的状态，不设置则根据 steps 确定状态 | wait / process / finish / error | - |
| icon | String | 图标 | 传入 icon 的 class 全名来自定义 icon | - |
