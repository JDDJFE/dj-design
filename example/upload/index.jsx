export default {
  title: 'Upload 上传',
  describe: '通过点击或者拖拽上传文件',
  templates: [
    {
      title: '点击上传（插槽自定义）',
      template: `
      <dj-upload
      v-model='fileList'
      type="file"
      @onSuccess="onSuccess"
      action="https://jsonplaceholder.typicode.com/posts/"
      ></dj-upload>
      <dj-upload
      v-model='fileList'
      type="file"
      @onSuccess="onSuccess"
      action="https://jsonplaceholder.typicode.com/posts/"
      >
      <dj-button type="success">选择文件</dj-button>
      </dj-upload>
    `,
      data: {
        data() {
          return {
            fileList: [
              {name: '1.jpg'},{name: '2.png'}
            ]
          };
        },
        methods: {
          onSuccess(res,file,fileList) {
            this.fileList.push({name: file.name,url: res.result.loadUrl});
          }
        }
      }
    },
    { title: '用户头像上传(单张）& 可自定义操作--可传字符串和数组',
      template: `
      <dj-upload
        v-model='fileList'
        type="img"
        :onSuccess="onSuccess"
        :onError="onError"
        :onRemove="onRemove"
        fileName="imgFiles"
        :params="{type:0,id:1}"
        action="https://jsonplaceholder.typicode.com/posts/"
      ></dj-upload>
      <div class="spacing"></div>
      <dj-upload
      ref="upload2"
      v-model='imgUrl'
      type="img"
      @onSuccess="onSuccess2"
      @onError="onError2"
      @onRemove="onRemove2"
      fileName="imgFiles"
      :params="{type:0,id:1}"
      action="https://jsonplaceholder.typicode.com/posts/"
    >
     <dj-image-mask slot="imageMask" style="height: 50px;bottom: 0;top: unset;color: #fff;font-size: 20px" slot-scope="props">
        <label @click.stop="handlePicturePreview(props.ind)"><dj-icon class="zoom-in" style="margin-right: 20px"></dj-icon></label>
        <label @click.stop="handleRemove"><dj-icon class="garbage"></dj-icon></label>
      </dj-image-mask>
    </dj-upload>
    `,
      data: {
        data() {
          return {
            fileList: [{url: 'https://img11.360buyimg.com/promotiongame/jfs/t1/164369/23/8236/35135/603ba020Ef1179777/aa17ed1cb8695243.jpg'}],
            imgUrl: 'https://img11.360buyimg.com/promotiongame/jfs/t1/164369/23/8236/35135/603ba020Ef1179777/aa17ed1cb8695243.jpg'
          };
        },
        methods: {
          onSuccess(res,file,fileList){
            this.fileList.push({name: file.name,url: res.result.loadUrl});
          },
          onError(res,file,fileList){},
          onRemove(file,fileList){},
          onSuccess2(res,file,fileList){
            this.imgUrl=res.result.loadUrl;
          },
          onError2(res,file,fileList){},
          onRemove2(file, fileList) { },
          handlePicturePreview(i) {
            this.$refs.upload2.handlePicturePreview(i);
          },
          handleRemove(i) {
            this.$refs.upload2.handlePictureRemove(i);
          }
        }
      }
    },
    {
      title: '用户头像上传-插槽',
      template: `
      <dj-upload
        v-model='fileList'
        type="img"
        :onSuccess="onSuccess"
        :onError="onError"
        :onRemove="onRemove"
        fileName="imgFiles"
        :params="{type:0,id:1}"
        action="https://jsonplaceholder.typicode.com/posts/"
      >
  <template>
	<dj-icon class="add icon" style="position: inherit;"></dj-icon>
	<div style="font-size: 12px;">本地上传</div>
  </template>
  </dj-upload>
    `,
      data: {
        data() {
          return {
            fileList: []
          };
        },
        methods: {
          onSuccess(res, file, fileList) {
            this.fileList.push({ name: file.name, url: res.result.loadUrl });
          },
          onError(res, file, fileList) { },
          onRemove(file, fileList) { }
        }
      }
    },
    {
      title: '用户头像上传-自定义click事件',
      template: `
      <dj-upload
        v-model='fileList'
        type="img"
        :onSuccess="onSuccess"
        :onError="onError"
        :onRemove="onRemove"
        fileName="imgFiles"
        :params="{type:0,id:1}"
        action="https://jsonplaceholder.typicode.com/posts/"
        @click="selectFile"
      >
  <template>
	<dj-icon class="add icon" style="position: inherit;"></dj-icon>
	<div style="font-size: 12px;">本地上传</div>
  </template>
  </dj-upload>
    `,
      data: {
        data() {
          return {
            fileList: []
          };
        },
        methods: {
          onSuccess(res, file, fileList) {
            this.fileList.push({ name: file.name, url: res.result.loadUrl });
          },
          onError(res, file, fileList) { },
          onRemove(file, fileList) { },
          selectFile(event, selectFile) {
            console.log('自定义click', event, selectFile);
            selectFile();
          },
          change(event, changeFile) {
            console.log('自定义changa', event, changeFile);
            changeFile(event);
          }
        }
      }
    },
    {
      title: '用户头像上传-自定义change事件',
      template: `
      <dj-upload
        v-model='fileList'
        type="img"
        :onSuccess="onSuccess"
        :onError="onError"
        :onRemove="onRemove"
        fileName="imgFiles"
        :params="{type:0,id:1}"
        action="https://jsonplaceholder.typicode.com/posts/"
        @change="change"
      >
  <template>
	<dj-icon class="add icon" style="position: inherit;"></dj-icon>
	<div style="font-size: 12px;">本地上传</div>
  </template>
  </dj-upload>
    `,
      data: {
        data() {
          return {
            fileList: []
          };
        },
        methods: {
          onSuccess(res, file, fileList) {
            this.fileList.push({ name: file.name, url: res.result.loadUrl });
          },
          onError(res, file, fileList) { },
          onRemove(file, fileList) { },
          change(event, changeFile) {
            console.log('自定义changa', event, changeFile);
            changeFile(event);
          }
        }
      }
    },
    {
      title: '用户头像上传(单张）--插槽',
      template: `
      <dj-upload
        v-model='fileList'
        type="img"
        :onSuccess="onSuccess"
        :onError="onError"
        :onRemove="onRemove"
        fileName="imgFiles"
        :params="{type:0,id:1}"
        action="https://jsonplaceholder.typicode.com/posts/"
      >
  <template>
	<dj-icon class="add icon" style="position: inherit;"></dj-icon>
	<div style="font-size: 12px;">本地上传</div>
  </template>
  </dj-upload>
    `,
      data: {
        data() {
          return {
            fileList: []
          };
        },
        methods: {
          onSuccess(res, file, fileList) {
            this.fileList.push({ name: file.name, url: res.result.loadUrl });
          },
          onError(res, file, fileList) { },
          onRemove(file, fileList) { }
        }
      }
    },
    { title: '照片墙(多张），可移动',
      template: `
      {{fileList}}
      <dj-upload
        v-model='fileList'
        type="img"
        @onSuccess="onSuccess"
        @onError="onError"
        @onEemove="onRemove"
        multiple
        suffix="png,jpg"
        :size="100"
        @onUpload="onUpload"
        draggable
        :limit="6"
      ></dj-upload>
    `,
      data: {
        data() {
          return {
            fileList: [{url: 'https://img11.360buyimg.com/promotiongame/jfs/t1/164369/23/8236/35135/603ba020Ef1179777/aa17ed1cb8695243.jpg'},{url: 'http://img30.360buyimg.com/mobilecms/jfs/t1/140853/14/10684/18564/5f86ba83E4a35db12/187038b74849ec17.jpg'}]
          };
        },
        methods: {
          onSuccess(res,file,fileList){
            this.fileList.push({name: file.name,url: res.result.loadUrl});
          },
          onUpload(file) {
            console.log('onUpload', file);
          },
          onError(res,file,fileList){},
          onRemove(file,fileList){}
        }
      }
    },
    { title: '照片墙(多张），自定义操作',
      template: `
      <dj-upload
        v-model='fileList'
        ref="djupload"
        type="img"
        @onSuccess="onSuccess"
        @onError="onError"
        @onEemove="onRemove"
        multiple
        draggable
        :limit="20"
        action="https://jsonplaceholder.typicode.com/posts/"
      >
       <dj-image-mask slot="imageMask" style="height: 50px;bottom: 0;top: unset;color: #fff;font-size: 20px" slot-scope="props">
        <dj-icon class="zoom-in" @click="handlePicturePreview(props.ind)" style="margin-right: 20px"></dj-icon>
        <dj-icon class="garbage" @click="handleRemove(props.ind)"></dj-icon>
       </dj-image-mask>
      </dj-upload>
    `,
      data: {
        data() {
          return {
            fileList: [{url: 'https://img11.360buyimg.com/promotiongame/jfs/t1/164369/23/8236/35135/603ba020Ef1179777/aa17ed1cb8695243.jpg'},{url: 'http://img30.360buyimg.com/mobilecms/jfs/t1/140853/14/10684/18564/5f86ba83E4a35db12/187038b74849ec17.jpg'}]
            // fileList: [{url: 'https://img11.360buyimg.com/promotiongame/jfs/t1/164369/23/8236/35135/603ba020Ef1179777/aa17ed1cb8695243.jpg'},{url: 'http://img30.360buyimg.com/mobilecms/jfs/t1/140853/14/10684/18564/5f86ba83E4a35db12/187038b74849ec17.jpg'},{url: 'https://img11.360buyimg.com/promotiongame/jfs/t1/164369/23/8236/35135/603ba020Ef1179777/aa17ed1cb8695243.jpg'},{url: 'http://img30.360buyimg.com/mobilecms/jfs/t1/140853/14/10684/18564/5f86ba83E4a35db12/187038b74849ec17.jpg'},{url: 'https://img11.360buyimg.com/promotiongame/jfs/t1/164369/23/8236/35135/603ba020Ef1179777/aa17ed1cb8695243.jpg'},{url: 'http://img30.360buyimg.com/mobilecms/jfs/t1/140853/14/10684/18564/5f86ba83E4a35db12/187038b74849ec17.jpg'},{url: 'https://img11.360buyimg.com/promotiongame/jfs/t1/164369/23/8236/35135/603ba020Ef1179777/aa17ed1cb8695243.jpg'},{url: 'http://img30.360buyimg.com/mobilecms/jfs/t1/140853/14/10684/18564/5f86ba83E4a35db12/187038b74849ec17.jpg'},{url: 'https://img11.360buyimg.com/promotiongame/jfs/t1/164369/23/8236/35135/603ba020Ef1179777/aa17ed1cb8695243.jpg'},{url: 'http://img30.360buyimg.com/mobilecms/jfs/t1/140853/14/10684/18564/5f86ba83E4a35db12/187038b74849ec17.jpg'}]
            // fileList: [{url: 'https://img11.360buyimg.com/promotiongame/jfs/t1/164369/23/8236/35135/603ba020Ef1179777/aa17ed1cb8695243.jpg'},{url: 'http://img30.360buyimg.com/mobilecms/jfs/t1/140853/14/10684/18564/5f86ba83E4a35db12/187038b74849ec17.jpg'},{url: 'https://img11.360buyimg.com/promotiongame/jfs/t1/164369/23/8236/35135/603ba020Ef1179777/aa17ed1cb8695243.jpg'},{url: 'http://img30.360buyimg.com/mobilecms/jfs/t1/140853/14/10684/18564/5f86ba83E4a35db12/187038b74849ec17.jpg'},{url: 'https://img11.360buyimg.com/promotiongame/jfs/t1/164369/23/8236/35135/603ba020Ef1179777/aa17ed1cb8695243.jpg'},{url: 'http://img30.360buyimg.com/mobilecms/jfs/t1/140853/14/10684/18564/5f86ba83E4a35db12/187038b74849ec17.jpg'},{url: 'https://img11.360buyimg.com/promotiongame/jfs/t1/164369/23/8236/35135/603ba020Ef1179777/aa17ed1cb8695243.jpg'},{url: 'http://img30.360buyimg.com/mobilecms/jfs/t1/140853/14/10684/18564/5f86ba83E4a35db12/187038b74849ec17.jpg'},{url: 'http://img30.360buyimg.com/mobilecms/jfs/t1/140853/14/10684/18564/5f86ba83E4a35db12/187038b74849ec17.jpg'},{url: 'http://img30.360buyimg.com/mobilecms/jfs/t1/140853/14/10684/18564/5f86ba83E4a35db12/187038b74849ec17.jpg'},{url: 'https://img11.360buyimg.com/promotiongame/jfs/t1/164369/23/8236/35135/603ba020Ef1179777/aa17ed1cb8695243.jpg'},{url: 'http://img30.360buyimg.com/mobilecms/jfs/t1/140853/14/10684/18564/5f86ba83E4a35db12/187038b74849ec17.jpg'},{url: 'https://img11.360buyimg.com/promotiongame/jfs/t1/164369/23/8236/35135/603ba020Ef1179777/aa17ed1cb8695243.jpg'},{url: 'http://img30.360buyimg.com/mobilecms/jfs/t1/140853/14/10684/18564/5f86ba83E4a35db12/187038b74849ec17.jpg'},{url: 'https://img11.360buyimg.com/promotiongame/jfs/t1/164369/23/8236/35135/603ba020Ef1179777/aa17ed1cb8695243.jpg'},{url: 'http://img30.360buyimg.com/mobilecms/jfs/t1/140853/14/10684/18564/5f86ba83E4a35db12/187038b74849ec17.jpg'},{url: 'https://img11.360buyimg.com/promotiongame/jfs/t1/164369/23/8236/35135/603ba020Ef1179777/aa17ed1cb8695243.jpg'},{url: 'http://img30.360buyimg.com/mobilecms/jfs/t1/140853/14/10684/18564/5f86ba83E4a35db12/187038b74849ec17.jpg'}]
          };
        },
        methods: {
          onSuccess(res,file,fileList){
            this.fileList.push({name: file.name,url: res.result.loadUrl});
          },
          onError(res,file,fileList){},
          onRemove(file, fileList) { },
          handlePicturePreview(i) {
            this.$refs.djupload.handlePicturePreview(i);
          },
          handleRemove(i) {
            this.$refs.djupload.handlePictureRemove(i);
          }
        }
      }
    },
    { title: '自定义图片展示大小，限制头像上传大小，上传宽高',
      template: `
      <dj-upload
        v-model='fileList'
        type="img"
        @onSuccess="onSuccess"
        @onError="onError"
        @onRemove="onRemove"
        :boxwidth="200"
        :boxheight="200"
        :size="50"
        :width="200"
        :height="300"
        action="https://jsonplaceholder.typicode.com/posts/"
      ></dj-upload>
    `,
      data: {
        data() {
          return {
            fileList: []
          };
        },
        methods: {
          onSuccess(res,file,fileList){
            this.fileList.push({name: file.name,url: res.result.loadUrl});
          },
          onError(res,file,fileList){},
          onRemove(file,fileList){}
        }
      }
    },
    { title: '拖拽上传（插槽自定义）',
      template: `
      <dj-upload
        v-model='fileList'
        @onSuccess="onSuccess"
        @onError="onError"
        @onRemove="onRemove"
        dragUpload
        :autoupload="true"
        fileName="importExcel"
        action="/store/delivery/processStoreConfigs"
      ></dj-upload>
      <span class="spacing"></span>
      <dj-upload
      v-model='fileList'
      @onSuccess="onSuccess"
      @onError="onError"
      @onRemove="onRemove"
      dragUpload
      :autoupload="true"
      fileName="importExcel"
      action="/store/delivery/processStoreConfigs"
    >
    <template><span style="color:red">拖到此次或点击上传</span></template>
    </dj-upload>
    `,
      data: {
        data() {
          return {
            fileList: []
          };
        },
        methods: {
          onSuccess(res,file,fileList){
            this.fileList.push({name: file.name,url: res.result.loadUrl});
          },
          onError(res,file,fileList){},
          onRemove(file,fileList){}
        }
      }
    },
    { title: '手动上传（插槽自定义）',
      template: `
      <dj-upload
        v-model='fileList'
        @onSuccess="onSuccess"
        @onError="onError"
        @onRemove="onRemove"
        :autoupload="false"
        action="https://jsonplaceholder.typicode.com/posts/"
      >
       </dj-upload>
       <span class="spacing"></span>
       <dj-upload
       ref="upload"
       v-model='fileList'
       @onSuccess="onSuccess"
       @onError="onError"
       @onRemove="onRemove"
       :autoupload="false"
       action="https://jsonplaceholder.typicode.com/posts/"
       :waiting.sync="waiting"
     >
     <dj-button>选择</dj-button>
     <dj-button slot="handupload" @click="handUpload" type="success" :disabled="!waiting">上传到服务器</dj-button>
      </dj-upload>
    `,
      data: {
        data() {
          return {
            fileList: [],
            waiting: false
          };
        },
        methods: {
          onSuccess(res,file,fileList){
            this.fileList.push({name: file.name,url: res.result.loadUrl});
          },
          onError(res,file,fileList){},
          onRemove(file,fileList){},
          handUpload(){
            this.$refs.upload.handUpload();
          }
        }
      }
    },
    { title: '自定义上传事件',
      template: `
    <dj-upload
    v-model='imgUrl'
    type="img"
    ref="upload"
    fileName="imgFiles"
    :params="{type:0,id:1}"
    @onUpload="onUpload"
  ></dj-upload>
  `,
      data: {
        data() {
          return {
            imgUrl: ''
          };
        },
        methods: {
          onUpload(){
            let file=this.$refs.upload.file;
            console.log(file,'file');
            this.$loader.show();
            this.$ajax.upload({
              url: 'promo/upload/image',
              fileName: 'file',
              data: {imgType: 1},
              success: (result) => {
                this.imgUrl=result.result.url;
                this.$loader.hide();
              },
              error: () => {
                this.$loader.hide();
              }
            },file);
          }
        }
      }
    },
    {
      title: '自定义错误消息提示',
      template: `
      {{fileList}}
      <dj-upload
        v-model='fileList'
        type="img"
        @onSuccess="onSuccess"
        @onError="onError"
        @onEemove="onRemove"
        multiple
        suffix="png,jpg"
        :size="size"
        @onUpload="onUpload"
        draggable
        :limit="limit"
        @onMessage="onMessage"
      ></dj-upload>
    `,
      data: {
        data() {
          return {
            limit: 6,
            size: 100,
            fileList: [{url: 'https://img11.360buyimg.com/promotiongame/jfs/t1/164369/23/8236/35135/603ba020Ef1179777/aa17ed1cb8695243.jpg'},{url: 'http://img30.360buyimg.com/mobilecms/jfs/t1/140853/14/10684/18564/5f86ba83E4a35db12/187038b74849ec17.jpg'}]
          };
        },
        methods: {
          onSuccess(res,file,fileList){
            this.fileList.push({name: file.name,url: res.result.loadUrl});
          },
          onUpload(file) {
            console.log('onUpload', file);
          },
          onError(res,file,fileList){},
          onRemove(file,fileList){},
          onMessage(type, file) {
            if (type == 'limitNum') {
              this.$message.error(`限制文件上传个数为${this.limit}个`);
            } else if (type == 'fileSize') {
              this.$message.error(`文件大小应不超过${this.size}KB`);
            }
            console.log(file);
          }
        }
      }
    },
    {
      title: '列表形式',
      template: `
      {{fileList}}
      <dj-upload
        v-model='fileList'
        type="list"
        @onSuccess="onSuccess"
        @onError="onError"
        @onEemove="onRemove"
        multiple
        suffix="png,jpg"
        :size="size"
        :limit="limit"
        @onMessage="onMessage"
        action="111"
        :params="{data: 1}"
        :showDelete="false"
      >
      </dj-upload>
    `,
      data: {
        data() {
          return {
            limit: 6,
            size: 1000,
            fileList: [{url: 'https://www.baidu.com', name: '京东到家.pdf'}, {url: 'https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/c2bc561ac67e44789659216b9ced3b52_mergeImage.png', name: '酱香豆腐皮~ 无论菜酒还是老鸡,无论再远还是广西 饭是爱过就都姥爷宰鸡.png'}]
          };
        },
        methods: {
          onSuccess(res,file,fileList) {
            this.fileList.push({name: file.name,url: res.result.loadUrl});
          },
          // onUpload(file) {
          //   console.log('onUpload', file);
          // },
          onError(res,file,fileList){},
          onRemove(file,fileList){},
          onMessage(type, file) {
            if (type == 'limitNum') {
              this.$message.error(`限制文件上传个数为${this.limit}个`);
            } else if (type == 'fileSize') {
              this.$message.error(`文件大小应不超过${this.size}KB`);
            }
            console.log(file);
          }
        }
      }
    },
    {
      title: '列表插槽',
      template: `
      {{fileList}}
      <dj-upload
        v-model='fileList'
        type="list"
        @onSuccess="onSuccess"
        @onError="onError"
        @onEemove="onRemove"
        multiple
        suffix="png,jpg"
        :size="size"
        :limit="limit"
        @onMessage="onMessage"
        action="111"
        :params="{data: 1}"
      >
        <template #after="{ row }">
          <dj-link @click="onClick(row)" type="primary">查看</dj-link>
        </template>
      </dj-upload>
    `,
      data: {
        data() {
          return {
            limit: 6,
            size: 1000,
            fileList: [{url: 'https://www.baidu.com', name: '京东到家.pdf'}, {url: 'https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/c2bc561ac67e44789659216b9ced3b52_mergeImage.png', name: '酱香豆腐皮~ 无论菜酒还是老鸡,无论再远还是广西 饭是爱过就都姥爷宰鸡.png'}]
          };
        },
        methods: {
          onSuccess(res,file,fileList) {
            this.fileList.push({name: file.name,url: res.result.loadUrl});
          },
          // onUpload(file) {
          //   console.log('onUpload', file);
          // },
          onError(res,file,fileList){},
          onRemove(file,fileList){},
          onMessage(type, file) {
            if (type == 'limitNum') {
              this.$message.error(`限制文件上传个数为${this.limit}个`);
            } else if (type == 'fileSize') {
              this.$message.error(`文件大小应不超过${this.size}KB`);
            }
            console.log(file);
          },
          onClick(row) {
            console.log(row);
          }
        }
      }
    },
    {
      title: '列表形式tips插槽',
      template: `
      {{fileList}}
      <dj-upload
        v-model='fileList'
        type="list"
        @onSuccess="onSuccess"
        @onError="onError"
        @onEemove="onRemove"
        multiple
        suffix="png,jpg"
        :size="size"
        :limit="limit"
        @onMessage="onMessage"
        action="111"
        :params="{data: 1}"
      >
        <div class="dj-upload-tips" slot="tips">这是一条自定义的tips</div>
      </dj-upload>
    `,
      data: {
        data() {
          return {
            limit: 6,
            size: 1000,
            fileList: [{url: 'https://www.baidu.com', name: '京东到家.pdf'}, {url: 'https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/c2bc561ac67e44789659216b9ced3b52_mergeImage.png', name: '酱香豆腐皮~ 无论菜酒还是老鸡,无论再远还是广西 饭是爱过就都姥爷宰鸡.png'}]
          };
        },
        methods: {
          onSuccess(res,file,fileList) {
            this.fileList.push({name: file.name,url: res.result.loadUrl});
          },
          // onUpload(file) {
          //   console.log('onUpload', file);
          // },
          onError(res,file,fileList){},
          onRemove(file,fileList){},
          onMessage(type, file) {
            if (type == 'limitNum') {
              this.$message.error(`限制文件上传个数为${this.limit}个`);
            } else if (type == 'fileSize') {
              this.$message.error(`文件大小应不超过${this.size}KB`);
            }
            console.log(file);
          }
        }
      }
    }
  ]
};
