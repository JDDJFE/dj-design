### djBreadcrumb 属性说明

| 属性 | 类型 | 参数说明 | 可选值 | 默认值 |
| -------- | -----:| -----:  |-----:  | :----:  |
| separator | String | 分隔符 | - | 斜杠'/' |
| separatorClass | String | 图标分隔符 class | - | - |
>注意：当有 `separatorClass` 时 `separator` 不生效

### Breadcrumb Item 属性说明

| 属性 | 类型 | 参数说明 | 可选值 | 默认值 |
| -------- | -----:| -----:  |-----:  | :----:  |
| to | string/object | 路由跳转对象，同 vue-router 的 to | - | - |
| replace | boolean | 在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录 | - | false |
