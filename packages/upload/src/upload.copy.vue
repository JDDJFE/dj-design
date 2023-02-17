<template>
	<div class="dj-upload">
     <input type="file" :accept="accept" class="hide" @change="change($event)" multiple>
    <input v-model="uploadContent" type="hidden" :name="name">
    <div v-if="type=='file'" class="dj-upload-demo">
      <div v-if="!dragUpload">
          <span @click="upload($event)"><slot><dj-button type="primary" :class="disabled?'is-disabled':''">上传</dj-button></slot></span>
          <slot name="handupload" v-if="!autoupload"><dj-button type="success" @click="handUpload" :disabled="fileList.length==0" style="margin-left:20px;">手动上传</dj-button></slot>
      </div>
      <div v-else class="dj-dragger" :class="disabled?'is-disabled':''"  @drop.stop.prevent="drop" @dragleave.stop.prevent="dragover = false"  @dragover.stop.prevent="ondragover" @click="upload($event)">
        <slot>
          <dj-icon class="dj-icon-upload" icon="upload"></dj-icon>
          <div class="dj-upload__text"> 将文件拖到此处或者<a>点击上传</a></div>
        </slot>
      </div>
      <ul v-if="showUploadList">
        <draggable v-model="fileList" :options="{disabled: !draggable}" class="draggable" @sort="sort">
          <li v-for="(val,i) in fileList" :key="i" class="dj-upload-item line">
            <dj-icon icon="enclosure" fontSize="16px"></dj-icon>
            <a>{{val.name}}</a>
            <dj-icon icon="check-filled" fontSize="16px" v-if="val.status=='success'" class="success" fontColor="#67c23a"></dj-icon>
             <dj-icon icon="info-filled" fontSize="16px" v-if="val.status=='error'" class="error" fontColor="#67c23a"></dj-icon>
            <dj-icon icon="close" class="delete" v-if="!disabled" fontSize="16px" @click="handlePictureRemove(i)" ></dj-icon>
          </li>
         </draggable>
      </ul>
    </div>
    <div v-if="type=='img'">
      <ul class="imglist">
          <draggable v-model="fileList" :options="{disabled: !draggable}" class="draggable" @sort="sort">
            <li v-for="(val,i) in fileList" :key="i" class="dj-upload-imgs" v-if="multiple" :style="imgStyle" :class="val.url?'noborder':'border'">
              <!-- <img v-if="val.url" :src="val.url"/>
              <span class="reviewIcon">
                <dj-icon class="view" @click="handlePicturePreview(val)"></dj-icon>
                <dj-icon v-if="!disabled" class="garbage" @click="handlePictureRemove(i)"></dj-icon>
              </span> -->
              <dj-image :src="val.url" :preview-src-list="[val.url]" style="height:100%" :ref="'img'+i">
                <slot name="imageMask" :ind="i">
                  <dj-image-mask>
                    <dj-icon class="view" @click="handlePicturePreview(i)"></dj-icon>
                    <dj-icon v-if="!disabled" class="garbage" @click="handlePictureRemove(i)"></dj-icon>
                  </dj-image-mask>
                </slot>
              </dj-image>
            </li>
          </draggable>
              <li @click="upload($event)" v-if='(multiple && ((fileList.length<limit) || !limit)) || !multiple' :style="imgStyle" class="dj-upload-img" :class="`${disabled?'is-disabled':''} ${multiple?'border':!multiple && fileList.length>0 && fileList[0].url?'noborder':'border'}`">
            <!-- <img v-if="!multiple && fileList.length>0" :src="fileList[0].url"/>
            <span class="reviewIcon" v-if="fileList.length>0 && !multiple">
              <label @click.stop="handlePicturePreview(fileList[0])">
                <dj-icon class="view"></dj-icon>
              </label>
              <label @click.stop="handlePictureRemove(0)">
                <dj-icon v-if="!disabled" class="garbage"></dj-icon>
              </label>
            </span> -->
            <dj-image style="height:100%" :preview-src-list="[fileList[0].url]" v-if="!multiple && fileList.length>0 && fileList[0].url" :src="fileList[0].url" ref="img">
                <slot name="imageMask" :ind="null">
                  <dj-image-mask>
                    <label @click.stop="handlePicturePreview(null)">
                      <dj-icon class="view"></dj-icon>
                    </label>
                      <label @click.stop="handlePictureRemove(null)">
                        <dj-icon v-if="!disabled" class="garbage"></dj-icon>
                      </label>
                  </dj-image-mask>
                </slot>
              </dj-image>
            <div style="line-height: normal; text-align: center" v-if="!(!multiple && fileList.length>0 && fileList[0].url)">
              <slot>
                <dj-icon class="add icon" style="position: inherit;"></dj-icon>
              </slot>
            </div>
          </li>
      </ul>
      <!-- <dj-modal ref="modal" title="查看图片" size="tiny" :showfooter="false">
        <div class="modal"><img :src="handlePictureUrl" alt="" :style="modalImgStyle"></div>
      </dj-modal> -->
    </div>
	</div>
</template>
<script>
import draggable from 'vuedraggable';
import loading from '@/mixins/loading';
export default {
  name: 'djUpload',
  components: {
    draggable
  },
  props: {
    value: {
      type: [String,Array]
    },
    limit: [Number ,String], // 限制个数
    type: { // 文件类型还是图片
      type: String,
      default: 'file'
    },
    action: { // 上传地址
      type: String,
      default: ''
    },
    fileName: { // 上传文件名参数
      type: String,
      default: 'file'
    },
    params: { // 上传参数
      type: Object
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    size: {
      type: Number
    },
    multiple: { // 是否可以上传多个
      type: Boolean,
      default: false
    },
    disabled: { // 是否禁用
      type: Boolean,
      default: false
    },
    accept: { // 上传类型限制
      type: String,
      default: ''
    },
    boxwidth: {
      type: Number
    },
    boxheight: {
      type: Number
    },
    autoupload: { // 是否自动上传
      type: Boolean,
      default: true
    },
    draggable: { // 是否可以左右拖拽移动
      type: Boolean,
      default: false
    },
    dragUpload: { // 是否开启拖拽上传
      type: Boolean,
      default: false
    },
    showUploadList: { // 文件上传后上传列表是否展示
      type: Boolean,
      default: true
    },
    name: { //
      type: String
    },
    separate: { // 是否支持前后分离
      type: Boolean,
      default: false
    },
    beforeUpload: {
      type: Function,
      default: () => true
    }
  },
  data(){
    return {
      imgStyle: {
        width: this.boxwidth?this.boxwidth+'px':'100px',
        height: this.boxheight?this.boxheight+'px':'100px',
        lineHeight: this.boxheight? this.boxheight+'px':'100px'
      },
      fileDetailArray: [],
      readyUploadArray: [],
      handlePictureUrl: '',
      fileList: Array.isArray(this.value) ? this.value : [this.value] || [],
      dragover: false,
      modalImgStyle: {
        width: '',
        height: ''
      },
      file: null
    };
  },
  watch: {
    value: {
      handler(){
        this.fileList=this.isArray(this.value)?this.value:this.value?[{url: this.value}]:[];
        if (!this.multiple){
          this.fileList=this.fileList.slice(-1);
        }
        if (!this.action){
          this.fileList.map((val,i)=>{
            if (JSON.stringify(val)!== '{}'){
              this.$set(val,'status','success');
            } else {
              this.fileList.splice(i,1);
            }
          });
        }
      },
      deep: true
    }
  },
  computed: { // name值校验
    uploadContent() {
      if (!this.autoupload){
        return this.fileList.filter((val)=>{
          return val.status=='success';
        });
      }
      return this.fileList;
    }
  },
  mounted(){
    this.$nextTick(()=>{ // 默认回显值
      this.fileList=this.isArray(this.value)?this.value:this.value?[{url: this.value}]:[];
      this.fileList.map((val,i)=>{
        if (JSON.stringify(val)!== '{}'){
          this.$set(val,'status','success');
        } else {
          this.value.splice(i,1);
        }
      });
    });
  },
  methods: {
    ondragover(){
      if (!this.disabled) {
        this.dragover = true;
      }
    },
    drop(e){
      if (this.disabled) return;
      if (!this.multiple){
        this.$emit('input',[]);
      }
      const dataFileList = e.dataTransfer.files; // 获取文件对象
      if (dataFileList.length < 1) {
        return; // 检测是否有文件拖拽到页面
      }
      if (this.limit && this.fileList.length==this.limit){
        this.$message.error('最多允许上传'+this.limit+'个文件');
        return;
      }
      const data = new FormData();
      if (this.params) {
        Object.keys(this.params).forEach(key => {
          data.append(key, this.params[key]);
        });
      }
      for (let i = 0; i < dataFileList.length; i++) {
        this.file=dataFileList[i];
        data.append(this.fileName, dataFileList[i]);
        this.onUpload(data,dataFileList[i],i);
      }
    },
    sort(){ // 拖拽改变位置
      this.$emit('input',this.fileList);
    },
    upload(event) {
      let selectFile = () => {
        this.$el.children[0].value=''; // 解决两次上传同样文件不触发change问题
        if (!this.disabled){
          this.$el.children[0].click();
        }
      };
      if (this.$listeners.click) {
        this.$emit('click', event, selectFile);
      } else {
        selectFile();
      }
    },
    change(event) {
      // console.log(event, '123123123');
      if (this.$listeners.change){
        this.$emit('change', event,this.changeFile);
      }
      this.changeFile(event);
    },
    changeFile(event) {
      if (this.fileList.length==0 || this.fileList.filter(val=>{
        return val.status=='success'
        ;
      }).length==0){
        this.fileList=[];
      }
      if (!this.multiple && (!this.autoupload || this.type=='img' || this.type=='file')){
        this.$emit('input',[]);
      }
      if (this.limit && this.fileList.length==this.limit){
        this.$message.error('最多允许上传'+this.limit+'个文件');
        return;
      }
      var data = new FormData();
      var file = event.target.files[0];
      data.append(this.fileName, file);
      this.file=file;
      if (this.params) {
        Object.keys(this.params).forEach(key => {
          data.append(key, this.params[key]);
        });
      }
      let r = new FileReader();
      r.readAsDataURL(file);
      r.onload = (e)=>{
        // 上传的为文件（非图片）
        if (this.type=='file'){
          if (this.size && parseFloat(this.size) < (file.size / 1000).toFixed(2)) {
            this.$message.error(`文件应小于等于${this.size}KB,现为：${(file.size / 1000).toFixed(2)}KB`);
            return;
          }
          if (this.autoupload){ // 自动上传的情况
            this.onUpload(data,file);
          } else if (this.multiple){ // 若是手动上传
            this.fileList.push({name: file.name});
            this.readyUploadArray.push({
              data: data,
              file: file
            });
          } else {
            this.fileList=[{name: file.name}];
            this.readyUploadArray=[{
              data: data,
              file: file
            }];
          }
        } else {
          const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
          if (!isJpgOrPng) {
            this.$message.error('请上传JPG/PNG文件!');
            return;
          }
          // 上传图片
          var img = new Image();
          var base64Url = e.currentTarget.result;
          img.src = base64Url;
          img.onload = (e)=>{
            var _w = e.currentTarget.width;
            var _h = e.currentTarget.height;
            // 查看大图弹窗图片宽高比
            if (_w<_h){
              this.modalImgStyle={width: 'auto',height: '100%'};
            } else {
              this.modalImgStyle={width: '100%',height: 'auto'};
            }
            if (this.width && this.height && (_w != this.width || _h != this.height)) {
              this.$message.error(`图片应为${this.width}*${this.height},现为${_w}*${_h}`);
              return;
            }
            if (this.width && _w != this.width) {
              this.$message.error(`图片宽度应为${this.width},现为${_w}`);
              return;
            }
            if (this.height && _h != this.height) {
              this.$message.error(`图片高度应为${this.height},现为${_h}`);
              return;
            }
            if (this.size && parseFloat(this.size) < (file.size / 1024).toFixed(2)) {
              this.$message.error(`图片应小于${this.size}KB,现为：${(file.size / 1024).toFixed(2)}KB`);
              return;
            }
            this.onUpload(data,file);
          };
        }
      };
    },
    onUpload(data,file,i){
      if (this.beforeUpload && typeof this.beforeUpload === 'function' && !this.beforeUpload(file)) {
        return false;
      }
      let that=this;
      let params = {};
      if (this.params) {
        Object.keys(this.params).forEach(key => {
          params[key] = this.params[key];
        });
      }
      if (this.action){
        this.$el.querySelector && loading.methods.showLoading({el: this.$el, white: true});
        this.$ajax.upload({
          url: this.action,
          data: this.separate?params:data,
          success: (result) => {
            that.$el.querySelector && loading.methods.closeLoading({el: that.$el});
            if (result.code==0){
              this.$message.success(result.msg);
              that.fileDetailArray.push(file);
              that.$emit('onSuccess',result,file,that.fileDetailArray);
              if (this.autoupload || this.dragUpload){
                this.$nextTick(()=>{
                  this.fileList.map((item,i)=>{
                    this.$set(item,'status','success');
                  });
                });
              } else {
                this.fileList=this.fileList.pop();
                this.$nextTick(()=>{
                  this.$set(this.fileList[i],'status','success');
                });
              }
            } else {
              this.$message.error(result.msg);
            }
          },
          error: (result) => {
            that.$el.querySelector && loading.methods.closeLoading({el: that.$el});
            this.fileList.filter(val=>val.status!='success').map((val)=>{
              this.$set(val,'status','error');
            });
            that.$emit('onError',result,file,that.fileList);
          }
        },this.separate?file:null);
      } else {
        this.$emit('onUpload',this.file);
      }
    },
    // 手动上传
    handUpload(){
      let readyUploadFileList=this.fileList.filter((item)=>{
        return item.status!='success';
      });
      for (let i=0;i<readyUploadFileList.length;i++){
        this.onUpload(this.readyUploadArray[i].data,this.readyUploadArray[i].file,this.fileList.indexOf(readyUploadFileList[i]));
      }
    },
    handlePictureRemove(i){
      this.fileList.splice(i,1);
      this.$emit('onRemove',this.fileDetailArray[i],this.fileList);
      this.fileDetailArray.splice(i,1);
      this.$emit('input', this.fileList);
    },
    // handlePicturePreview(val){
    //   this.handlePictureUrl=val.url;
    //   this.$refs.modal.show();
    // },
    handlePicturePreview(i){
      if (i!==null){
        this.$refs['img'+i][0].imagePreviewFun();
      } else {
        this.$refs['img'].imagePreviewFun();
      }
    },
    isArray(o){
      return Object.prototype.toString.call(o)== '[object Array]';
    }
  }
};
</script>
<style scope lang="less">
</style>

