### 属性说明

| 属性     | 类型| 参数说明  | 枚举值   |  默认值  |
| -------- | -----:| -----:  |-----:  | :----:  |
|  message  | String /Vnode | 消息文字 | -  | - |
| type     |  String|主题|primary(主要）, success(成功）, warning(警告) ,  error(失败)) , info(默认) | info  |
| vnode |  Boolean  | 是否将 message 属性作为 HTML 片段处理 |  -   |  false   |
| duration|  Number  | 显示时间, 毫秒。设为 0(number类型) 则不会自动关闭  |  | 3000 |
| close |  Boolean  | 是否显示关闭按钮  |  - | ture |
