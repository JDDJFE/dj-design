export default {
  title: 'editor富文本编辑器',
  describe: '',
  templates: [
    { title: '基本用法',
      template: '<dj-button @click="alertFn"></dj-button><br><br><br><br><br><br><dj-editor ref="editor" :customMenu="customMenu" :height="600" v-model="desc"  uploadUrl="/imageUpload/uploadDescImage" fileName="request" :imgMaxWidth="750" :fileSize="2*1024 * 1024" @getHtml="getHtml" @getText="getText" @onBlur="onBlur" @onFocus="onFocus"  :insertImg="insertImg" :uploadParams="{a:1,b:1}" :focus="false" :showFullScreen="false" :uploadImgAccept="[\'png\']" :fileCount="3" :uploadImg="uploadImg"></dj-editor>',
      data: {
        data() {
          return {
            desc: '',
            customMenu: [
              {
                insertName: 'insertXCX',
                insertHtml: `<div class="w-e-menu">
                  <i class="iconfont applet" style="font-size: 20px;"></i>
                </div>`,
                insertCallback: (a, b) => {
                  this.callback(a, b);
                }
              },
              {
                insertName: 'insertBUg',
                insertHtml: `<div class="w-e-menu">
                  <i class="iconfont bug" style="font-size: 20px;"></i>
                </div>`,
                insertCallback: (a, b) => {
                  this.callback2(a, b);
                }
              }
            ]
          };
        },
        methods: {
          callback(a, b) {
            console.log(a, b);
            setTimeout(() => {
              this.$refs.editor.editor.cmd.do('insertHTML', '<a href="http://www.qq.com" data-miniprogram-appid="appid" data-miniprogram-path="pages/index/index">点击跳小程序</a>');
            }, 1000);
          },
          callback2(a, b) {
            console.log(a, b);
            this.$refs.editor.editor.cmd.do('insertHTML', '<a href="http://www.qq.com" data-miniprogram-appid="appid" data-miniprogram-path="pages/index/index">1111</a>');
          },
          alertFn() {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              type: 'warning',
              callback: action => {
                if (action) {
                  this.$message(`已成功删除${action}!`);
                } else {
                  this.$message(`已取消删除${action}!`);
                }
              }
            });
          },
          insertImg(result,insert){
            insert('http://img10.360buyimg.com/o2o/' + result.result.imgUrl);
            // insert(result.result.imgUrl);
          },
          getHtml(html){
            // this.$message.success(html+'------获取的html');
            console.log(html);
          },
          getText(text){
            // this.$message.success(text+'------获取的text');
            console.log(text);
          },
          onBlur(html){
            // this.$message.success(html+'---------失去焦点');
          },
          onFocus(html){
            // this.$message.success(html+'---------获取焦点');
          },
          // 自定义上传
          uploadImg(files, insert) {
            files.forEach(file => {
              // let r = new FileReader();
              // r.readAsDataURL(file);
              // r.onload = (re)=>{
              //   var img = new Image();
              //   var base64Url = re.currentTarget.result;
              //   img.src = base64Url;
              //   img.onload = (ie)=>{
              //     this.$loader.show();
              //     this.$ajax.post({
              //       url: '/imageUpload/uploadImageBase64',
              //       data: { fileImg: fileImg },
              //       success: (result) => {
              //         this.$loader.close();
              //         insert('http://img10.360buyimg.com/o2o/' + result.result.imgUrl);
              //       },
              //       error: () => {
              //         this.$loader.close();
              //       }
              //     });
              //   };
              // };
            });
          }
        }
      }
    }
  ]
};
