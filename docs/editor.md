### Editor 属性说明

| 属性   |    类型 |    参数说明 |   参数  | 默认值  |
| -------- | -----:| -----: |-----: | :----: |
| name  |  String |  元素名称 |      |        |
| height   | Number |  编辑器的高度  |       |  300  |
| zIndex|  Number |  编辑器的层级  |       |  100  |
| placeholder   |  String | 提示文字 |     |    |
|  focus  |  Boolean  |  默认进来是否获取焦点  |  true,false  | true |
|  menus  | Array  |  配置菜单  |  |  默认显示所有菜单（见注释说明） |
|  colors | Array  |  配置文字、背景 | |（见下面注释说明） |
| fontNames | Array | 配置字体 |  |  见下面注释说明） |
| lineHeights| Array  | 设置行高  | ['1', '1.15', '1.6', '2', '2.5', '3'] |
| showFullScreen | Boolean | 配置全屏 | true, false |  true  |
| disabled |  Boolean  |  是否禁用 |true,false | false |
| uploadImgAccept|Array|接收上传图片类型|  | ['jpg', 'jpeg', 'png', 'gif', 'bmp'] (若不希望限制类型，则设置成空数组)|
| uploadUrl | String | 图片上传 Url |  |  |
| fileName | String | 上传文件名| | file |
|uploadParams| Object | 上传补充参数 | {a:1,b:2}|  |
| imgWidth | Number | 限制上传图片宽度 |  |  |
| imgHeight | Number | 限制上传图片高度 | | |
| fileSize | Number |限制单个文件大小 | |(5MB)  5x1024x1024 |
|imgMaxWidth | Number |限制图片上传最大宽 | | |
|imgMaxHeight | Number |限制图片上传最大高 | | |
|fileCount | Number|限制最大上传文件个数| | 20 |
|insertImg | function | 内部上传，外部插入图片函数 | function(result,insert) |  |
|uploadImg | function | 外部自定义上传 | function(files, insert) | |
|customMenu | Array | 自定义菜单 | [{insertName: '菜单名称', insertHtml:'菜单html', insertCallback: '点击菜单回调'}] | |

>注释：<br>
> 默认菜单：['head','bold','fontSize','italic','underline','strikeThrough','indent''lineHeight''foreColor','backColor','link','list','todo','justify','quote','emoticon','image','video''table','code','splitLine','undo','redo']<br/>
> 默认颜色: ['#000000','#eeece0','#1c487f','#4d80bf','#c24f4a','#8baa4a','#7b5ba1','#46acc8','#f9963b','#ffffff']<br/>
> 默认字体: ['黑体','仿宋','楷体','标楷体','华文仿宋','华文楷体','微软雅黑','Arial','Tahoma','Verdana','Times NewRoman','Courier New']




### Events 事件说明

| 属性     | 参数| 说明 | 
| ------- | -------- | -------- |
| @getHtml(html)|  | 获取 html |
| @getText(text) |  |获取 text |
| @onBlur(html)|失去焦点获取的 html | 失去焦点事件 | 
| @onFocus(html)|获取焦点获取的 html | 获取焦点事件 |
                                            