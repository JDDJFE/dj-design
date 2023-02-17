<template>
  <div class="dj-upload">
    <input type="file" :accept="accept" class="hide" @change="change($event)" :multiple="multiple" />
    <input v-model="uploadContent" type="hidden" :name="name" />
    <div v-if="type == 'file'" class="dj-upload-demo">
      <div v-if="!dragUpload">
        <span @click="upload($event)">
          <slot>
            <dj-button type="primary" :class="disabled ? 'is-disabled' : ''">{{
              autoUpload && autoupload ? '上传' : '选择文件'
            }}</dj-button>
          </slot>
        </span>
        <slot name="handupload" v-if="!(autoUpload && autoupload)">
          <dj-button type="success" @click="handUpload" :disabled="fileList.length == 0" style="margin-left: 20px">
            <dj-icon icon="upload"></dj-icon> 上传文件
          </dj-button>
        </slot>
      </div>
      <div
        v-else
        ref="dragUpload"
        class="dj-dragger"
        :class="disabled ? 'is-disabled' : ''"
        @drop.stop.prevent="drop"
        @dragleave.stop.prevent="dragover = false"
        @dragover.stop.prevent="onDragover"
        @click="upload($event)"
      >
        <slot>
          <dj-icon class="dj-icon-upload" icon="cloud-upload"></dj-icon>
          <div class="dj-upload__text">将文件拖到此处或者<a :class="disabled ? 'is-disabled' : ''">点击上传</a></div>
        </slot>
      </div>
      <ul v-if="showUploadList">
        <draggable v-model="fileList" :options="{ disabled: !draggable }" class="draggable" @sort="sort">
          <li
            v-for="(val, i) in fileList"
            :key="i"
            :class="[`dj-upload-item`, `line`, `dj-upload-item-${val.status}`, `dj-upload-draggable`]"
          >
            <dj-icon class="linkIcon" icon="enclosure" fontSize="14px"></dj-icon>
            <a class="dj-upload-file_name">{{ val.name }}</a>
            <dj-icon icon="check-solid" fontSize="14px" v-if="val.status == 'success'" class="success"></dj-icon>
            <dj-icon icon="garbage" fontSize="14px" v-if="val.status == 'error'" class="error"></dj-icon>
            <dj-icon
              icon="garbage"
              class="delete"
              v-if="!disabled"
              fontSize="14px"
              @click="handlePictureRemove(i)"
            ></dj-icon>
          </li>
        </draggable>
      </ul>
    </div>
    <div v-if="type == 'img'">
      <ul class="imglist">
        <draggable v-model="fileList" :options="{ disabled: !draggable }" class="draggable" @sort="sort">
          <li
            v-if="multiple"
            v-for="(val, i) in fileList"
            :key="i"
            class="dj-upload-imgs dj-upload-draggable"
            :style="imgStyle"
            :class="val.url ? 'noborder' : 'border'"
          >
            <dj-image
              :src="val.url"
              :fit="fit"
              :preview-src-list="[val.url]"
              style="height: 100%; width: 100%"
              :ref="'img' + i"
            >
              <slot name="imageMask" :ind="i" :file="val">
                <dj-image-mask>
                  <dj-icon
                    class="zoom-in"
                    @click="handlePicturePreview(i)"
                    font-color="#fff"
                    font-size="20px"
                    style="margin-right: 20px"
                  ></dj-icon>
                  <dj-icon
                    v-if="!disabled"
                    class="garbage"
                    @click="handlePictureRemove(i)"
                    font-size="20px"
                    font-color="#fff"
                  ></dj-icon>
                </dj-image-mask>
              </slot>
            </dj-image>
          </li>
          <!-- 添加图片按钮 -->
          <li
            @click="upload($event)"
            v-if="(multiple && (fileList.length < limit || !limit)) || !multiple"
            :style="imgStyle"
            class="dj-upload-img"
            :class="`${disabled ? 'is-disabled' : ''} ${
              multiple ? 'border' : !multiple && fileList.length > 0 && fileList[0].url ? 'noborder' : 'border'
            }`"
          >
            <dj-image
              style="height: 100%; width: 100%"
              :fit="fit"
              :preview-src-list="[fileList[0].url]"
              v-if="!multiple && fileList.length > 0 && fileList[0].url"
              :src="fileList[0].url"
              ref="img"
            >
              <slot name="imageMask" :ind="null" :file="value">
                <dj-image-mask>
                  <label @click.stop="handlePicturePreview(null)">
                    <dj-icon class="zoom-in" font-color="#fff" font-size="20px" style="margin-right: 20px"></dj-icon>
                  </label>
                  <label @click.stop="handlePictureRemove(null)" v-if="!disabled">
                    <dj-icon class="garbage" font-color="#fff" font-size="20px"></dj-icon>
                  </label>
                </dj-image-mask>
              </slot>
            </dj-image>
            <div
              style="line-height: normal; text-align: center"
              v-if="!(!multiple && fileList.length > 0 && fileList[0].url)"
            >
              <slot>
                <dj-icon class="add icon" style="position: inherit" font-size="20px"></dj-icon>
              </slot>
            </div>
          </li>
        </draggable>
      </ul>
    </div>
    <div v-if="type == 'list'">
      <div>
        <span @click="upload($event)">
          <slot>
            <dj-button type="primary" :class="disabled ? 'is-disabled' : ''">{{
              autoUpload && autoupload ? '上传' : '选择文件'
            }}</dj-button>
          </slot>
        </span>
        <slot name="handupload" v-if="!(autoUpload && autoupload)">
          <dj-button type="success" @click="handUpload" :disabled="fileList.length == 0" style="margin-left: 20px">
            <dj-icon icon="upload"></dj-icon> 上传文件
          </dj-button>
        </slot>
      </div>
      <slot name="tips">
        <div v-if="suffix && size" class="dj-upload-tips">
          <span>只能上传{{suffix.split(',').join('/')}}文件</span>
          <span>，且不超过{{size}}KB</span>
        </div>
        <div v-else-if="suffix" class="dj-upload-tips">
          <span>只能上传{{suffix.split(',').join('/')}}文件</span>
        </div>
        <div v-else-if="size" class="dj-upload-tips">
          <span>只能上传不超过{{size}}KB的文件</span>
        </div>
      </slot>
      <div class="dj-upload-list">
        <div v-for="(file, index) in fileList" :key="index" class="dj-upload-list-item">
          <dj-image
            class="dj-upload-list-img"
            :src="file.url"
            :fit="fit"
            :preview-src-list="file.imgStatus === false ? [] : file.url ? [file.url] : []"
            style="height: 48px; width: 48px;"
            :ref="'img' + index"
            @onError="onListImageError(index)"
          >
            <div slot="error"
              style="display: flex;justify-content: center;align-items: center;width: 100%;height: 100%;background: #f5f7fa;color: #909399;font-size: 14px;">
              <img :src="file.icon || fileIcon" alt="">
            </div>
          </dj-image>
          <!-- <img class="dj-upload-list-img" :src="file.url" width="48" height="48" alt=""> -->
          <div class="dj-upload-list-font" :title="file.name">
            <span class="dj-upload-list-font-name">{{file.name}}</span>
            <div class="dj-upload-list-slot">
              <slot name="after" :row="{file, index}">
                <dj-link v-if="showDownload" @click="onDownload(file, index)" :disabled="disabled" type="primary">
                  下载<dj-icon icon="download" fontSize="14px" style="verticalAlign: baseline;"></dj-icon>
                </dj-link>
              </slot>
            </div>
          </div>
          <div class="dj-upload-list-icon">
            <dj-icon v-if="showDelete && !disabled" icon="garbage" fontSize="12px" @click="handleListRemove(index)"></dj-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable';
import loading from '@/mixins/loading';
// import ajax from './ajax';
import message from '../../message/index';
import axios from './axios';
export default {
  name: 'djUpload',
  components: {
    draggable
  },
  props: {
    value: {
      type: [String, Array]
    },
    fit: {
      type: String,
      default: 'fill'
    },
    limit: [Number, String], // 限制个数
    type: {
      // 文件类型还是图片
      type: String,
      default: 'file'
    },
    action: {
      // 上传地址
      type: String,
      default: ''
    },
    fileName: {
      // 上传文件名参数
      type: String,
      default: 'file'
    },
    params: {
      // 上传参数
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
    multiple: {
      // 是否可以上传多个
      type: Boolean,
      default: false
    },
    disabled: {
      // 是否禁用
      type: Boolean,
      default: false
    },
    accept: {
      // 上传类型限制
      type: String,
      default: ''
    },
    suffix: {
      // 上传后缀限制
      type: String,
      default: 'jpg,png,gif,jpeg'
    },
    boxwidth: {
      type: Number
    },
    boxWidth: {
      type: Number
    },
    boxheight: {
      type: Number
    },
    boxHeight: {
      type: Number
    },
    autoupload: {
      // 是否自动上传
      type: Boolean,
      default: true
    },
    autoUpload: {
      // 是否自动上传
      type: Boolean,
      default: true
    },
    draggable: {
      // 是否可以左右拖拽移动
      type: Boolean,
      default: false
    },
    dragUpload: {
      // 是否开启拖拽上传
      type: Boolean,
      default: false
    },
    showUploadList: {
      // 文件上传后上传列表是否展示
      type: Boolean,
      default: true
    },
    name: {
      //
      type: String
    },
    separate: {
      // 是否支持前后分离
      type: Boolean,
      default: false
    },
    beforeUpload: {
      type: Function,
      default: () => true
    },
    // 手动上传，判断按钮是否disabled
    waiting: {
      type: Boolean,
      default: false
    },
    httpRequest: {
      type: Function
    },
    onSuccess: {
      type: Function
    },
    onError: {
      type: Function
    },
    withCredentials: {
      type: Boolean,
      default: false
    },
    headers: {
      type: Object
    },
    autoToast: {
      type: Boolean,
      default: true
    },
    showDownload: {
      type: Boolean,
      default: false
    },
    showDelete: {
      type: Boolean,
      default: true
    },
    onRemove: {
      type: Function
    }
  },
  data() {
    return {
      imgStyle: {
        width: this.boxWidth || this.boxwidth ? (this.boxWidth || this.boxwidth) + 'px' : '120px',
        height: this.boxHeight || this.boxheight ? (this.boxHeight || this.boxheight) + 'px' : '120px',
        lineHeight: this.boxHeight || this.boxheight ? (this.boxHeight || this.boxheight) + 'px' : '120px'
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
      file: null,
      ISEMITONUPLOAD: false,
      fileIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAYAAADAQbwGAAAAAXNSR0IArs4c6QAAAbRJREFUOE+llUsoRGEUx3+fGDMSM1KYQpHFbLwVEgtko2xZyEpiY6HEWjZWLJSws7Gz0Kwo8liMPEaRyWMaIo/GayaNEld3bmPmGsY196u7uOf+/7/vnO983SOkQwxcM4ZEJ1ntGaQUQcADN3PEXC4cvNAihniO1AlpmXEk+oPByk0w14LfCY6y2MBdwM8OVppFH48hsZCWuAcygoGKVbA0gG8btqr+BspOA/vk0iR68MoGGSh9OROMID/GPAWOAFcv3M5Hw+UMZaC8jBwEod3cqoEhW2oJVDuVt6MeuJqOBp4AnoiwCRcFNKmBlkYw5cPHG1jqlQyvZsDniAa+A27AF/EpjTM18D9N+eWEvwHXwVwHvj3YKo/dFE1AgxWSzJBoAduUUvLpMHgXNcPjb4qmDEOiZCvYZpUMz8fgcUVnhprt0UJ1yYWjkN0RVr0HYL8NAqeat/j52kTana3gtesApteEzUKAbqB8TZ7WlIaU2uFyUk+GG+AeUYAiAYoX4GIC7uMtOacLMlvDJX+8wvEAvN3FeYaabb8L1T9Y/cAH9QjQCxRMCNWQCo2C/4MfEMyRw+AndhCvdOjNuwoAAAAASUVORK5CYII='
    };
  },
  watch: {
    value: {
      handler() {
        this.fileList = this.isArray(this.value) ? this.value : this.value ? [{ url: this.value }] : [];
        if (!this.multiple) {
          this.fileList = this.fileList.slice(-1);
        }
        if (!this.action) {
          this.fileList.map((val, i) => {
            if (JSON.stringify(val) !== '{}') {
              this.$set(val, 'status', 'success');
            } else {
              this.fileList.splice(i, 1);
            }
          });
        }
      },
      deep: true
    },
    fileList: {
      handler(v) {
        // console.log(v, 'fileList');
        if (v.length) {
          this.$emit('update:waiting', true);
        } else {
          this.$emit('update:waiting', false);
        }
      },
      deep: true
    }
  },
  computed: {
    // name值校验
    uploadContent() {
      if (!(this.autoUpload && this.autoupload)) {
        return this.fileList.filter((val) => {
          return val.status == 'success';
        });
      }
      return this.fileList;
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 默认回显值
      this.fileList = this.isArray(this.value) ? this.value : this.value ? [{ url: this.value }] : [];
      this.fileList.map((val, i) => {
        if (JSON.stringify(val) !== '{}' && val) {
          this.$set(val, 'status', 'success');
        } else {
          this.value.splice(i, 1);
        }
      });
    });
  },
  methods: {
    onDragover() {
      if (!this.disabled) {
        this.dragover = true;
      }
    },
    drop(e) {
      if (this.disabled) return;
      if (!this.multiple) {
        this.$emit('input', []);
      }
      const dataFileList = e.dataTransfer.files; // 获取文件对象
      if (dataFileList.length < 1) {
        return; // 检测是否有文件拖拽到页面
      }
      const fileListLen = this.value?.length || 0;
      const targetFilesLen = dataFileList.length;
      // 如果 现有的文件数 + 选中的文件数 > limit限制数 触发
      if (this.limit && fileListLen + targetFilesLen > this.limit) {
        if (this.$listeners.onMessage) {
          this.$emit('onMessage', 'limitNum', this.fileList);
        } else {
          const warn = message.warning;
          warn(
            `当前限制选择 ${this.limit} 个文件，本次选择了 ${targetFilesLen} 个文件，共选择了 ${
              fileListLen + targetFilesLen
            } 个文件`
          );
        }
        return;
      }
      // if (this.limit && this.fileList.length==this.limit){
      //   if (this.$listeners.onMessage) {
      //     this.$emit('onMessage', 'limitNum', this.fileList);
      //   } else {
      //     message.error('最多允许上传'+this.limit+'个文件');
      //   }
      //   return;
      // }
      const data = new FormData();
      if (this.params) {
        Object.keys(this.params).forEach((key) => {
          data.append(key, this.params[key]);
        });
      }
      for (let i = 0; i < dataFileList.length; i++) {
        this.file = dataFileList[i];
        data.append(this.fileName, dataFileList[i]);
        this.onUpload(data, dataFileList[i], i);
      }
    },
    sort() {
      // 拖拽改变位置
      this.$emit('input', this.fileList);
    },
    /**
     * 点击上传（未确定仅打开弹窗）时触发，
     */
    upload(event) {
      let selectFile = () => {
        this.$el.children[0].value = ''; // 解决两次上传同样文件不触发change问题
        if (!this.disabled) {
          this.$el.children[0].click();
        }
      };
      if (this.$listeners.click) {
        this.$emit('click', event, selectFile);
      } else {
        selectFile();
      }
    },
    /**
     * 点击确认上传时触发
     */
    change(event) {
      if (this.$listeners.change) {
        this.$emit('change', event, this.changeFile);
      }
      this.changeFile(event);
    },
    changeFile(event) {
      if (this.autoupload && this.autoUpload) {
        if (this.fileList.length == 0 || this.fileList.filter((val) => val.status == 'success').length == 0) {
          this.fileList = [];
        }
      }
      if (!this.multiple && (!(this.autoUpload && this.autoupload) || this.type == 'img' || this.type == 'file')) {
        this.$emit('input', []);
      }
      const fileListLen = this.value?.length || 0;
      const targetFilesLen = event.target.files?.length;
      // 如果 现有的文件数 + 选中的文件数 > limit限制数 触发
      if (this.limit && fileListLen + targetFilesLen > this.limit) {
        if (this.$listeners.onMessage) {
          this.$emit('onMessage', 'limitNum', this.fileList);
        } else {
          // 兼容运营平台和商家中心的warn，UI库的是warning
          const warn = message.warning;
          warn(
            `当前限制选择 ${this.limit} 个文件，本次选择了 ${targetFilesLen} 个文件，共选择了 ${
              fileListLen + targetFilesLen
            } 个文件`
          );
        }
        return;
      }
      // 如果 现有的文件数 = limit限制数 触发
      // if (this.limit && fileListLen == this.limit) {
      //   if (this.$listeners.onMessage) {
      //     this.$emit('onMessage', 'limitNum', this.fileList);
      //   } else {
      //     message.error('最多允许上传'+this.limit+'个文件');
      //   }
      //   return;
      // }
      var data = new FormData();
      var file = event.target.files[0];
      var files = event.target.files;
      // 上传且校验成功两个以上文件，进入
      // let filesCopy = [];
      if (files.length > 1) {
        for (let i = 0; i < files.length; i++) {
          let data1 = new FormData();
          let r = new FileReader();
          r.readAsDataURL(files[i]);
          r.onload = (e) => {
            // 上传的为文件（非图片）
            if (this.type == 'file') {
              if (this.size && parseFloat(this.size) < (file.size / 1000).toFixed(2)) {
                if (this.$listeners.onMessage) {
                  this.$emit('onMessage', 'fileSize', file);
                } else {
                  message.error(`文件应小于等于${this.size}KB,现为：${(file.size / 1000).toFixed(2)}KB`);
                }
                return;
              }
              this.fileList = [...this.fileList, {name: files[i].name}];
              this.readyUploadArray.push({
                data: data1,
                file: files[i]
              });
              // console.log(this.readyUploadArray);
              if (this.autoupload && this.autoUpload) {
                this.$emit('onUpload', files[i], files);
                if (this.action) {
                  data1.append(this.fileName, files[i]);
                  this.onUpload(data1, files[i]);
                }
              }
            } else {
              let acceptTypeArray = this.suffix?.split(',');
              let fileType = files[i]?.type?.split('/')[1]?.toLowerCase();
              if (acceptTypeArray?.length > 0 && acceptTypeArray.indexOf(fileType) < 0) {
                if (this.$listeners.onMessage) {
                  this.$emit('onMessage', 'fileType', files[i]);
                } else {
                  message.error(`请上传类型为${this.suffix}的文件!`);
                }
                return;
              }
              // 上传图片
              var img = new Image();
              var base64Url = e.currentTarget.result;
              img.src = base64Url;
              const imgLoadFunc = (e) => {
                var _w = e.currentTarget.width;
                var _h = e.currentTarget.height;
                // 查看大图弹窗图片宽高比
                if (_w < _h) {
                  this.modalImgStyle = { width: 'auto', height: '100%' };
                } else {
                  this.modalImgStyle = { width: '100%', height: 'auto' };
                }
                // 判断宽高是否符合规定
                if (this.width && this.height && (_w != this.width || _h != this.height)) {
                  this.ISEMITONUPLOAD = true;
                  if (this.$listeners.onMessage) {
                    this.$emit('onMessage', 'width&height', files[i]);
                  } else {
                    message.error(`图片应为${this.width}px*${this.height}px,现为${_w}px*${_h}px`);
                  }
                  return;
                }
                // 判断宽度是否符合规定
                if (this.width && _w != this.width) {
                  this.ISEMITONUPLOAD = true;
                  if (this.$listeners.onMessage) {
                    this.$emit('onMessage', 'width', files[i]);
                  } else {
                    message.error(`图片宽度应为${this.width}px,现为${_w}px`);
                  }
                  return;
                }
                // 判断高度是否符合规定
                if (this.height && _h != this.height) {
                  this.ISEMITONUPLOAD = true;
                  if (this.$listeners.onMessage) {
                    this.$emit('onMessage', 'height', files[i]);
                  } else {
                    message.error(`图片高度应为${this.height}px,现为${_h}px`);
                  }
                  return;
                }
                // 判断文件大小是否符合规定
                if (this.size && parseFloat(this.size) < (files[i].size / 1024).toFixed(2)) {
                  this.ISEMITONUPLOAD = true;
                  if (this.$listeners.onMessage) {
                    this.$emit('onMessage', 'fileSize', files[i]);
                  } else {
                    message.error(`图片应小于${this.size}KB,现为：${(files[i].size / 1024).toFixed(2)}KB`);
                  }
                  return;
                }
                // filesCopy.push(files[i]);
                // this.fileList.push({name: files[i].name});
                if (this.autoupload && this.autoUpload) {
                  this.$emit('onUpload', files[i], files);
                  if (this.action) {
                    data1.append(this.fileName, files[i]);
                    this.onUpload(data1, files[i]);
                  }
                }
              };
              img.onload = (e) => {
                imgLoadFunc(e);
              };
              img.onerror = (e) => {
                imgLoadFunc(e);
              };
            }
          };
        }
        // this.$emit('input', this.fileList);
        return;
      }
      data.append(this.fileName, file);
      this.file = file;
      if (this.params) {
        Object.keys(this.params).forEach((key) => {
          data.append(key, this.params[key]);
        });
      }
      let r = new FileReader();
      r.readAsDataURL(file);
      r.onload = (e) => {
        // 上传的为文件（非图片）
        if (this.type == 'file') {
          // 判断文件大小是否符合规定
          if (this.size && parseFloat(this.size) < (file.size / 1000).toFixed(2)) {
            if (this.$listeners.onMessage) {
              this.$emit('onMessage', 'fileSize', file);
            } else {
              message.error(`文件应小于等于${this.size}KB,现为：${(file.size / 1000).toFixed(2)}KB`);
            }
            return;
          }
          if (this.autoUpload && this.autoupload) {
            // 自动上传的情况
            this.onUpload(data, file);
          } else if (this.multiple) {
            // 若是手动上传
            this.fileList.push({ name: file.name });
            this.readyUploadArray.push({
              data: data,
              file: file
            });
          } else {
            this.fileList = [{ name: file.name }];
            this.readyUploadArray = [
              {
                data: data,
                file: file
              }
            ];
          }
          // this.$emit('input', this.fileList);
        } else {
          let acceptTypeArray = this.suffix?.split(',');
          let fileType = file?.type?.split('/')[1]?.toLowerCase();
          // 判断文件类型是否符合规定
          if (acceptTypeArray?.length > 0 && acceptTypeArray.indexOf(fileType) < 0) {
            if (this.$listeners.onMessage) {
              this.$emit('onMessage', 'fileType', file);
            } else {
              message.error(`请上传类型为${this.suffix}的文件!`);
            }
            return;
          }
          // 上传图片
          var img = new Image();
          var base64Url = e.currentTarget.result;
          img.src = base64Url;
          // 图片加载的监听函数
          const imgLoadFunc = (e) => {
            var _w = e.currentTarget.width;
            var _h = e.currentTarget.height;
            // 查看大图弹窗图片宽高比
            if (_w < _h) {
              this.modalImgStyle = { width: 'auto', height: '100%' };
            } else {
              this.modalImgStyle = { width: '100%', height: 'auto' };
            }
            // 判断宽高是否符合规定
            if (this.width && this.height && (_w != this.width || _h != this.height)) {
              if (this.$listeners.onMessage) {
                this.$emit('onMessage', 'width&height', file);
              } else {
                message.error(`图片应为${this.width}px*${this.height}px,现为${_w}px*${_h}px`);
              }
              return;
            }
            // 判断宽度是否符合规定
            if (this.width && _w != this.width) {
              if (this.$listeners.onMessage) {
                this.$emit('onMessage', 'width', file);
              } else {
                message.error(`图片宽度应为${this.width}px,现为${_w}px`);
              }
              return;
            }
            // 判断高度是否符合规定
            if (this.height && _h != this.height) {
              if (this.$listeners.onMessage) {
                this.$emit('onMessage', 'height', file);
              } else {
                message.error(`图片高度应为${this.height}px,现为${_h}px`);
              }
              return;
            }
            // 判断文件大小是否符合规定
            if (this.size && parseFloat(this.size) < (file.size / 1024).toFixed(2)) {
              if (this.$listeners.onMessage) {
                this.$emit('onMessage', 'fileSize', file);
              } else {
                message.error(`图片应小于${this.size}KB,现为：${(file.size / 1024).toFixed(2)}KB`);
              }
              return;
            }
            this.onUpload(data, file);
          };
          img.onload = (e) => {
            imgLoadFunc(e);
          };
          img.onerror = (e) => {
            imgLoadFunc(e);
          };
        }
      };
    },
    onUpload(data, file, i) {
      let that = this;
      let el = this.$el;
      if (this.dragUpload) {
        el = this.$refs.dragUpload;
      }
      let upload = () => {
        let params = {};
        if (this.params) {
          Object.keys(this.params).forEach((key) => {
            params[key] = this.params[key];
          });
        }
        if (this.action) {
          this.$el.querySelector && loading.methods.showLoading({ el, white: true });
          // let httpRequest = this.httpRequest || ajax;
          // const isDj = window.location.host.endsWith('jddj.com');
          // if (isDj) {
          let httpRequest = this.httpRequest || axios.upload;
          // }
          httpRequest(this.action, this.separate ? params : data, this.separate ? file : null).then(
            (result) => {
              that.$el.querySelector && loading.methods.closeLoading({ el });
              if (result.code == 0) {
                message.success(result.msg);
                that.fileDetailArray.push(file);
                that.$emit('onSuccess', result, file, that.fileDetailArray);
                if (this.autoupload && this.autoUpload || this.dragUpload) {
                  this.$nextTick(() => {
                    this.fileList.map((item, i) => {
                      if (JSON.stringify(item) !== '{}' && item) {
                        this.$set(item, 'status', 'success');
                      }
                    });
                  });
                } else {
                  this.fileList = this.fileList.pop();
                  this.$nextTick(() => {
                    if (JSON.stringify(this.fileList[i]) !== '{}' && this.fileList[i]) {
                      this.$set(this.fileList[i], 'status', 'success');
                    }
                  });
                }
              } else {
                message.error(result.msg);
              }
            },
            (err) => {
              that.$el.querySelector && loading.methods.closeLoading({ el });
              this.fileList
                .filter((val) => val.status != 'success')
                .map((val) => {
                  this.$set(val, 'status', 'error');
                });
              that.$emit('onError', err, file, that.fileList);
            }
          );
          const options = {
            headers: this.headers,
            withCredentials: this.withCredentials,
            file: file,
            data: this.params,
            filename: this.fileName,
            action: this.action,
            onSuccess: (result) => {
              that.$el.querySelector && loading.methods.closeLoading({ el });
              if (this.onSuccess) {
                const sorf = this.onSuccess(result, file);
                if (sorf || sorf === void 0) {
                  this.afterSuccessFun(file);
                  return;
                }
                return;
              }

              // 兼容到家业务
              if (result.code == 0) {
                message.success(result.msg);
                that.$emit('onSuccess', result, file, that.fileDetailArray);
                this.afterSuccessFun(file);
              } else {
                message.error(result.msg);
              }
            },
            onError: (err) => {
              that.$el.querySelector && loading.methods.closeLoading({ el });
              this.fileList
                .filter((val) => val.status != 'success')
                .map((val) => {
                  this.$set(val, 'status', 'error');
                });
              this.$emit('input', this.fileList);
              if (this.onError) {
                this.onError(err, file);
                return;
              }
              that.$emit('onError', err, file, that.fileList);
            }
          };
          const req = httpRequest(options);
          if (req && req.then) {
            req.then(options.onSuccess, options.onError);
          }
        } else {
          this.$emit('onUpload', this.file);
        }
      };
      if (this.beforeUpload && typeof this.beforeUpload === 'function' && !this.beforeUpload(file, upload)) {
        return false;
      }
      upload();
    },
    afterSuccessFun(file) {
      this.fileDetailArray.push(file);
      if (this.autoupload && this.autoUpload || this.dragUpload) {
        this.$nextTick(() => {
          this.fileList.map((item) => {
            if (JSON.stringify(item) !== '{}' && item) {
              this.$set(item, 'status', 'success');
            }
          });
        });
      } else {
        this.fileList = this.fileList.pop();
        this.$nextTick(() => {
          if (JSON.stringify(this.fileList[i]) !== '{}' && this.fileList[i]) {
            this.$set(this.fileList[i], 'status', 'success');
          }
        });
      }
      this.$emit('input', this.fileList);
    },
    // 手动上传
    handUpload() {
      let readyUploadFileList = this.fileList.filter((item) => {
        return item.status != 'success';
      });
      for (let i = 0; i < readyUploadFileList.length; i++) {
        this.onUpload(
          this.readyUploadArray[i].data,
          this.readyUploadArray[i].file,
          this.fileList.indexOf(readyUploadFileList[i])
        );
      }
    },
    handlePictureRemove(i) {
      // 如果通过props传入了onRemove，执行此逻辑
      if (this.onRemove) {
        // onRemove函数中return false则取消删除操作
        const bool = this.onRemove(this.fileList[i], i);
        if (bool !== false) {
          this.fileList.splice(i, 1);
          this.fileDetailArray.splice(i, 1);
          if (Array.isArray(this.value)) {
            this.$emit('input', this.fileList);
          } else {
            this.$emit('input', '');
          }
        }
        // 没传props：onRemove，执行此逻辑
      } else {
        this.fileList.splice(i, 1);
        this.$emit('onRemove', this.fileDetailArray[i], this.fileList);
        this.fileDetailArray.splice(i, 1);
        if (Array.isArray(this.value)) {
          this.$emit('input', this.fileList);
        } else {
          this.$emit('input', '');
        }
      }
    },
    /**
     * @desc 列表形式删除回调
     * @param {Number} index 索引
     */
    handleListRemove(i) {
      const bool = this.onRemove(this.fileList[i], i);
      if (bool !== false) {
        this.fileList.splice(i, 1);
        this.fileDetailArray.splice(i, 1);
        if (Array.isArray(this.value)) {
          this.$emit('input', this.fileList);
        } else {
          this.$emit('input', '');
        }
      }
    },
    handlePicturePreview(i) {
      if (i !== null) {
        this.$refs['img' + i][0].imagePreviewFun();
      } else {
        this.$refs['img'].imagePreviewFun();
      }
    },
    isArray(o) {
      return Object.prototype.toString.call(o) == '[object Array]';
    },
    onDownload(file, index) {
      this.$emit('onDownload', file, index);
    },
    onListImageError(index) {
      this.$set(this.fileList[index], 'imgStatus', false);
    }
  }
};
</script>
<style scope lang="less"></style>
