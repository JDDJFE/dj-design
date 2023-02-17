### Image 属性说明
| 属性 | 类型 | 参数说明 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| src | string | 图片路径 | - | - |
| fit | string | 确定图片如何适应容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)  | fill / contain / cover / none / scale-down | - |
| lazy | boolean | 是否开启懒加载 | - | false |
| previewSrcList | Array | 预览的大图数组，若有则开启图片预览功能，若为空则不开启预览功能 | - | - |
| downloadStatus | boolean | 是否显示下载 | - | true |
| showMask | boolean | 是否显示浮层，默认显示；当`previewSrcList`有值时，默认显示查看大图的浮层，否则无默认浮层显示，需传入自定义浮层 | - | true |
>注意：
>
>1.当 `lazy` 为 `true` 时：竖向时建议定义图片为`display:block`，并设置`min-height`；横向时建议设置`min-width`；
>
>2.当传入自定义浮层时，如需查看大图，调用`this.$refs.img.imagePreviewFun();`

### Events 属性说明
| 参数 | 参数 | 说明 |
| --- | --- | --- |
| onError | --- | 图片加载失败触发 |
| download | --- | 预览大图的图片下载；若使用该方法则不走内置下载 |
| handleActions | action | `rotateRight`向右旋转；`rotateLeft`向左旋转； |

### slot 属性说明
| 参数 | 说明 |
| --- | --- |
| placeholder | 图片未加载的占位内容 |
| error | 加载失败的内容 |
| default | 加载浮层；可不传 |

### ImageMask 属性说明
| 属性 | 类型 | 参数说明 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| maskPreview | boolean | 是否点击遮罩层就可查看大图 | - | false |

### ImageMask Events 属性说明
| 参数 | 参数 | 说明 |
| --- | --- | --- |
| click | --- | 蒙层点击事件 |
| handleActions | action | `rotateRight`向右旋转；`rotateLeft`向左旋转； |
