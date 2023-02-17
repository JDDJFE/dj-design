<template>
  <div :class="['dj-editor',{'dj-editor-disabled': disabled}]">
    <input type="hidden" :name="name" :value="value"/>
    <div ref="editor"></div>
  </div>
</template>

<script>
import WEditor from 'wangeditor';
const { BtnMenu } = WEditor;

export default {
  name: 'djEditor',
  props: {
    value: {
      type: String,
      default: ''
    },
    name: { // 元素名称(校验)
      type: String ,
      default: ''
    },
    height: { // 编辑器的高度
      type: Number,
      default: 300
    },
    zIndex: { // 编辑器的层级
      type: Number,
      default: 10
    },
    placeholder: { // 自定义placeholder提示文字
      type: String,
      default: ''
    },
    focus: { // 是否自动获取焦点
      type: Boolean,
      default: false
    },
    menus: { // 配置菜单
      type: Array,
      default: ()=>{
        return [
          'head',
          'bold',
          'fontSize',
          'fontName',
          'italic',
          'underline',
          'strikeThrough',
          'indent',
          'lineHeight',
          'foreColor',
          'backColor',
          'link',
          'list',
          'todo',
          'justify',
          'quote',
          'emoticon',
          'image',
          'video',
          'table',
          'code',
          'splitLine',
          'undo',
          'redo'
        ];
      }
    },
    colors: {// 配置颜色(文字颜色、背景色)
      type: Array,
      default: () => {
        return [
          '#4d80bf','#c24f4a','#8baa4a','#7b5ba1','#46acc8','#f9963b','#ffffff'];
      }
    },
    lineHeights: { // 行高
      type: Array,
      default: () =>{
        return [
          '1', '1.15', '1.6', '2', '2.5', '3'
        ];
      }
    },
    fontNames: { // 字体
      type: Array,
      default: () => {
        return [
          '黑体',
          '仿宋',
          '楷体',
          '标楷体',
          '华文仿宋',
          '华文楷体',
          '宋体',
          '微软雅黑',
          'Arial',
          'Tahoma',
          'Verdana',
          'Times New Roman',
          'Courier New'
        ];
      }
    },
    showFullScreen: { // 全屏按钮是否展示
      type: Boolean,
      default: true
    },
    disabled: { // 禁用
      type: Boolean,
      default: false
    },
    // 图片类型限制
    uploadImgAccept: {
      type: Array,
      default: () => {
        return ['jpg', 'jpeg', 'png', 'gif', 'bmp'] ;// 若不希望限制类型，则设置成空数组
      }
    },
    uploadUrl: { // 上传url
      type: String
    },
    fileName: { // 上传文件名称
      type: String,
      default: 'file'
    },
    uploadParams: { // 上传补充参数
      type: Object
    },
    imgWidth: { // 限制上传图片宽度
      type: Number
    },
    imgHeight: { // 限制上传图片高度
      type: Number
    },
    fileSize: { // 限制单个文件大小 默认5MB
      type: Number,
      default: 5 * 1024 * 1024
    },
    imgMaxWidth: { // 限制上传图片最大宽
      type: Number
    },
    imgMinWidth: { // 限制上传图片最小宽
      type: Number
    },
    imgMaxHeight: { // 限制上传图片最大高
      type: Number
    },
    imgMinHeight: { // 限制上传图片最小高
      type: Number
    },
    fileCount: { // 限制最多上传文件个数
      type: Number,
      default: 20
    },
    uploadImg: { // 外部自定义上传函数
      type: Function
    },
    uploadImgAfter: { // 外部自定义上传函数,校验图片长宽后执行
      type: Function
    },
    insertImg: { // 内部上传函数后抛到外部获取结果插入回显
      type: Function
    },
    customMenu: {
      type: Array
    },
    separate: { // 是否前后端分离
      type: Boolean,
      default: true
    },
    imgSort: { // 是否支持图片排序，默认图片命名方式如：dj001_xxx.png
      type: Boolean,
      default: false
    },
    sortRule: { // 自定义排序方法，该方法需要返回排序之后的数组
      type: Function
    },
    uploadImgSort: { // 是否顺序上传图片
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      editor: null,
      timeout: null,
      timein: null,
      isFullScreen: false,
      val: ''
    };
  },
  watch: {
    value: {
      handler(){
        if (this.editor) {
          if (this.timeout) {
            clearTimeout(this.timeout);
          }
          let value1 = this.value;
          let value2 = this.editor.txt.html();
          this.timeout = setTimeout(() => {
            if (value1 != value2) {
              this.editor.txt.html(this.value.replace(/>\s+</g, '><'));
            }
            this.$emit('getHtml',this.editor.txt.html()); // 获取html
            this.$emit('getText',this.editor.txt.text()); // 获取text
          }, 500);
        }
      },
      deep: true
    },
    disabled: {
      handler(){
        if (this.disabled){
          this.editor.disable(); // 禁用
        } else {
          this.editor.enable(); // 解除禁用
        }
      },
      deep: true
    }
  },
  async mounted() {
    // const $elem = WEditor.$(
    //   `<div class="w-e-menu">
    //                     <button>小程序</button>
    //                 </div>`
    // );
    this.editor = new WEditor(this.$refs.editor);
    this.$nextTick(() => {
      if (this.value && this.editor && this.editor.txt && this.editor.txt.html() != this.value) {
        this.editor.txt.html(this.value);
      }
    });
    this.editor.config.onchange = (html) => {
      this.$emit('input', html.trim());
    };
    this.editor.config.onblur = (newHtml) => { // 失去焦点事件
      this.$emit('onBlur',newHtml); // 获取最新的 html 内容
    };
    this.editor.config.onfocus = (newHtml) => { // 获取焦点事件
      this.$emit('onFocus',newHtml); // 获取最新的 html 内容
    };

    // 插入网络图片或上传图片的回调 src:图片src ,alt:图片文字说明 ,href:跳转链接
    this.editor.config.linkImgCallback = (src,alt,href) => {
      this.$emit('linkImgCallback', src,alt,href);
    };
    this.editor.config.height=this.height; // 设置高度
    this.editor.config.zIndex = this.zIndex; // 设置index,编辑器的层级
    this.editor.config.placeholder = this.placeholder; // 自定义 placeholder 提示文字
    this.editor.config.focus=this.focus; // 默认进来是否获取焦点
    this.editor.config.menus=this.menus; // 配置菜单
    this.editor.config.colors=this.colors; // 配置颜色（文字颜色，背景颜色）
    this.editor.config.lineHeights=this.lineHeights; // 行高
    this.editor.config.fontNames=this.fontNames; // 设置字体
    this.editor.config.showFullScreen = this.showFullScreen;// 全屏
    this.editor.config.uploadImgAccept=this.uploadImgAccept; // 限制上传类型
    this.editor.config.uploadImgMaxSize = this.fileSize;
    this.editor.config.uploadImgMaxLength = this.fileCount;
    this.editor.config.customUploadImg = async(files, insert) => {
      if (this.uploadImg) {
        this.uploadImg(files, insert);
        return;
      }
      if (this.imgSort) {
        files = this[this.sortRule ? 'sortRule' : 'getSortFile'](files);
      }
      for (const file of files) {
        if (this.imgSort || this.uploadImgSort ) {
          await this.imgPromise(file, insert);
        } else {
          this.imgPromise(file, insert);
        }
      }
    };
    this.editor.config.customAlert = (info) => { // 自定义错误提示，不用原本的alert
      this.$message.error(info);
    };
    if (this.customMenu) {
      this.createCustimMenus();
    }


    this.editor.create();
    if (this.disabled) {
      this.editor.disable(); // 禁用
    } else {
      this.editor.enable(); // 解除禁用
    }
  },
  methods: {
    // 图片上传处理
    async imgPromise(file, insert) {
      return new Promise(async(resolve, reject) => {
        let r = new FileReader();
        r.readAsDataURL(file);
        r.onload = async(re) => {
          var img = new Image();
          var base64Url = re.currentTarget.result;
          img.src = base64Url;
          img.onload = async(ie) => {
            if (this.checkImg(ie)) {
              const result = await this.upload(file);
              if (result) {
                this.insertImg(result,insert);
              }
              resolve(true);
            } else {
              resolve(false);
            }
          };
        };
      });
    },
    // 图片尺寸校验
    checkImg(ie) {
      var imgWidth = ie.currentTarget.width;
      var imgHeight = ie.currentTarget.height;
      if (this.imgWidth && this.imgHeight && (imgWidth != this.imgWidth || imgHeight != this.imgHeight)) {
        this.$message.error(`图片应为${this.imgWidth}*${this.imgHeight},现为${imgWidth}*${imgHeight}`);
        return false;
      }
      if (this.imgWidth && imgWidth != this.imgWidth) {
        this.$message.error(`图片宽度应为${this.imgWidth}px,现为${imgWidth}px`);
        return false;
      }
      if (this.imgHeight && imgHeight != this.imgHeight) {
        this.$message.error(`图片高度应为${this.imgHeight}px,现为${imgHeight}px`);
        return false;
      }

      if (!this.imgWidth) {
        if (this.imgMinWidth && this.imgMaxWidth) {
          if (imgWidth < this.imgMinWidth || imgWidth > this.imgMaxWidth) {
            this.$message.error(`图片宽度限制${this.imgMinWidth}~${this.imgMaxWidth},现为${imgWidth}`);
            return;
          }
        } else if (this.imgMaxWidth) {
          if (imgWidth > this.imgMaxWidth) {
            this.$message.error(`图片宽度应小于${this.imgMaxWidth}px,现为${imgWidth}px`);
            return false;
          }
        } else if (this.imgMinWidth) {
          if (imgWidth < this.imgMinWidth) {
            this.$message.error(`图片宽度应大于${this.imgMinWidth}px,现为${imgWidth}px`);
            return false;
          }
        }
      }

      if (!this.imgHeight) {
        if ( this.imgMinHeight && this.imgMaxHeight) {
          if (imgHeight < this.imgMinHeight || imgHeight > this.imgMaxHeight) {
            this.$message.error(`图片高度限制${this.imgMinHeight}~${this.imgMaxHeight},现为${imgHeight}`);
            return;
          }
        } else if (this.imgMaxHeight) {
          if (imgHeight > this.imgMaxHeight) {
            this.$message.error(`图片高度应小于${this.imgMaxHeight}px,现为${imgHeight}px`);
            return false;
          }
        } else if (this.imgMinHeight) {
          if (imgHeight < this.imgMinHeight) {
            this.$message.error(`图片高度应大于${this.imgMinHeight}px,现为${imgHeight}px`);
            return false;
          }
        }
      }

      if (this.uploadImgAfter) {
        this.uploadImgAfter(files, insert);
        return false;
      }
      return true;
    },
    // 文件上传
    upload(file) {
      return new Promise((resolve, reject) => {
        this.$loader.show();
        if (this.$axios) {
          this.$axios.upload(
            this.uploadUrl,
            this.uploadParams || {},
            file
          ).then((result) => {
            this.$loader.hide();
            resolve(result);
          }).catch(() => {
            this.$loader.hide();
            resolve(false);
          });
        } else {
          this.$ajax.upload({
            url: this.uploadUrl,
            data: this.uploadParams || {},
            success: (result) => {
            	this.$loader.hide();
              resolve(result);
            },
            error: () => {
            	this.$loader.hide();
              resolve(false);
            }
          }, file);
        }
      });
    },
    // 默认排序方法
    getSortFile(files) {
      const newfiles = files.filter(v => {
        return this.getSortName(v.name);
      });
      newfiles.sort((a,b) => {
        const nameA = Number(this.getSortName(a.name));
        const nameB = Number(this.getSortName(b.name));
        return nameA - nameB;
      });
      return newfiles;
    },
    // 校验图片命名
    getSortName(name) {
      if (!name.startsWith('dj') || name.indexOf('_') < 0 || !Number(name.slice(2, name.lastIndexOf('_')))) {
        this.$message.error(`${name} 不符合命名规范！`);
        return false;
      }
      return name.slice(2, name.indexOf('_'));
    },
    createCustimMenus() {
      const self = this;
      this.customMenu.forEach((el,i) => {
        class InsertXCXMenu extends BtnMenu {
          constructor(editor) {
            const $elem = WEditor.$(
              el.insertHtml
            );
            super($elem, editor);
          }
          // 菜单点击事件
          clickHandler() {
            el.insertCallback(el,self);
          }
          // 菜单激活状态
          tryChangeActive() {
          }
        }
        // 注册菜单
        this.editor.menus.extend(el.insertName, InsertXCXMenu);

        // 重新配置 editor.config.menus
        this.editor.config.menus = this.editor.config.menus.concat(el.insertName);
      });
    }
  }
};
</script>
