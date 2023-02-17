### 属性说明

| 属性     | 类型| 参数说明  | 枚举值   |  默认值  |
| -------- | -----:| -----:  |-----:  | :----:  |
| title   |  String | 标题 |  -  |   -   |
| message |  String / VNode  | 消息正文内容  |  - | - |
| vnode |  Boolean  | 是否将 message 属性作为 HTML 片段处理 |  -   |  false   |
| visible |  Boolean  | 是否显示模态窗口  |  - | - |
| oktext |  String  | 设置确定按钮文本  |  - | 确定 |
| canceltext |  String  | 设置取消按钮文本  |  - | 确定 |
| cancelButtonShow |  Boolean  | 是否展示取消按钮  |  - | true |
| showclose |  Boolean  | 是否展示右上关闭按钮  |  - | true |
| closable |  Boolean  | 点击遮罩层关闭窗口  |  - | false |
| background |  String  | 遮罩层背景色  |  black,white | black |
| loading |  Boolean  | 是否展示loading  |  - | false |
| type |  String  | 消息类型，用于显示图标  | success / help / warning / error | - |
| size |  String  | 窗口大小  |  mini,tiny,small,lagre,full | mini |




### Events 说明

| 事件名称     | 事件说明  | 回调参数  |
| -------- | -----:| ----:  |
|   callback / Promise  | MessageBox 关闭后的回调，回调参数action 的值为true/false/null, instance 为 MessageBox 实例，可以通过它访问实例上的属性和方法，Promise同理   |  (action, instance) |
|   beforeClose | MessageBox 关闭前的回调，会暂停实例的关闭，回调多增加 done 用于手动关闭 MessageBox 实例 | (action,instance,done)  |
