### 属性说明

| 属性     | 类型| 参数说明  | 枚举值   |  默认值  |
| -------- | -----:| -----:  |-----:  | :----:  |
| title   |  String | 标题 |  -  |   标题   |
| visible |  Boolean  | 是否显示模态窗口  |  - | - |
| size |  String  | 窗口大小  |  mini,tiny,small,large,full | mini |
| width |  String  | 自定义宽度  |  - | 30vw |
| height |  String  | 窗口高度  |  - | auto |
| maxheight |  String  | 窗口最大高度  |  - | auto |
| showfooter |  Boolean  | 展示操作按钮  |  - | true |
| showok |  Boolean  | 展示确定按钮  |  - | true |
| oktext |  String  | 设置确定按钮文本  |  - | 确定 |
| ok |  Function  | ok事件函数  |  - | - |
| showcancel |  Boolean  | 展示取消按钮  |  - | true |
| canceltext |  String  | 设置取消按钮文本  |  - | 取消 |
| cancel |  Function  | cancel事件函数  |  - | - |
| showclose |  Boolean  | 是否展示关闭按钮  |  - | true |
| beforeClose |  Function  | 关闭前函数，可阻止关闭  |  - | - |
| closable |  Boolean  | 点击遮罩层关闭窗口  |  - | false |
| basic |  Boolean  | 无背景无边框  |  - | true |
| border |  Boolean  | 带边框模态窗口  |  - | true |
| loading |  Boolean  | 是否展示loading层  |  - | false |
| background |  String  | 遮罩层背景色  |  black,white | black |


### slots 说明

| name     | 参数说明  
| -------- | -----|
| header     |  自定义弹窗头
| footer     |  自定义弹窗脚


### Events 说明

| 事件名称     | 事件说明  | 毁掉参数  |
| -------- | -----:| ----:  |
|   close   |  关闭回调   |  -  |
|   closed   |  关闭动画结束后回调   |  -  |
