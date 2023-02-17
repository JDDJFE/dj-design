### 属性说明
| 属性 | 类型 | 参数说明 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| v-model | Array,String | 若为单个图片(img类型）可传字符串也可传数组，若为多个图片或文件类型为数组[{name:"",url:""}] | " ",[],[{name:"文件名",url:"文件地址"}] |  | 
| action | string | 上传地址 | 若传了action，则走组件内部上传，否则走外部自定义上传 |  |
| params | Object | 上传参数 |  |  |
| fileName | String | 上传文件的参数名 |  |  |
| type | String | 上传类型 | file(文件),img(图片) |  
| limit | Number,String | 上传数量 |  |   |
| width | Number | 上传图片的宽 |  |  |
| height | Number | 上传图片的高 |  |  |
| size | string | 设置上传文件大小 |  |  |
| multiple | Boolean | 是否可以上传多个 | true,false | false |
| accept | String | | | |
| suffix | String | 上传的图片类型（逗号分割） | jpg,png,gif... | jpg,png,gif,jpeg |
| boxWidth | Number | 放图片的外层盒子宽度  |  |
| boxHeight | Number | 放图片的外层盒子高度  |  |
| dragUpload | Boolean | 是否开启拖拽上传  | true,false | false |
| draggable  | Boolean | 是否可以拖拽移动 | true,false | false |
| disabled  | Boolean | 禁用（禁止上传） | true,false | false |
| autoUpload  | Boolean | 是否自动上传（仅限上传文件） | true(自动上传),false（手动上传） | true |
| showUploadList | Boolean | 文件上传后上传列表是否展示 | true,false | true |
| name | String | name属性，用作表单校验
| separate | Boolean | 是否支持后分离 | true,false | false
| beforeUpload| Function | 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。| function(file) {}| -
| fit | string | 同image  | fill / contain / cover / none / scale-down | fill |



### Events 事件说明
| 属性 | 类型 | 参数说明 | 可选值 |
| --- | --- | --- | --- | --- |
| onUpload | Function(file) | 上传后的文件 |  若不传action文件路径，可自定义外边上传方法| 
| onSuccess | Function(response,file,fileList) | 上传成功后的回调函数(成功的返回值，上传的文件信息，文件列表) |
| onError | Function(response,file,fileList) | 上传失败后的回调函数（失败的返回值，上传的文件信息，文件列表） |   |
| onRemove | Function(file,fileList) | 删除文件（图片）后的回调函数（删除的文件，文件列表） |
| change | Function(event,changeFile) | 选择文件后调回调（选择的文件信息，选择文件后的上传函数） |
| click | Function(event,selectFile) | 点击后的回调（选择的文件信息，点击后的选择文件上传函数）|
| onMessage | Function(type,file) | 自定义错误提示消息的回调（若不传则按默认提示） | type：<br />'limitNum'（超出文件最大上传个数）<br />'fileSize'（超出最大上传文件大小）<br />'fileType'（违反规定文件上传类型）<br />'width&height'（违反规定图片宽度和高度）<br />'width'（违反规定图片宽度）<br />'height'（违反规定图片高度） |