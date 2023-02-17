export default {
  title: 'Image 图片',
  templates: [
    {
      title: '基本用法',
      template: `
        <div>
        <div class="disInB" v-for="fit in fits" :key="fit"
             style="padding: 10px 0px 20px;text-align: center;border-right: 1px solid #eff2f6;width: 20%;">
          <div class="mb10">{{fit}}</div>
          <dj-image style="width: 100px; height: 100px" :src="src" :fit="fit"></dj-image>
        </div>
        </div>`,
      data: {
        data() {
          return {
            fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
            src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          };
        }
      }
    },
    {
      title: '占位内容',
      template: `
        <div class="demo-image__placeholder">
        <div class="disInB"
             style="padding: 10px 0px 20px;text-align: center;border-right: 1px solid #eff2f6;width: 49%;">
          <div class="mb10">默认</div>
          <dj-image :src="src" style="width: 300px; height: 200px;"></dj-image>
        </div>
        <div class="disInB" style="padding: 10px 0px 20px;text-align: center;width: 49%;">
          <div class="mb10">自定义</div>
          <dj-image :src="src" style="width: 300px; height: 200px;">
            <div slot="placeholder"
                 style="display: flex;justify-content: center;align-items: center;width: 100%;height: 100%;background: #f5f7fa;color: #909399;font-size: 14px;">
              加载中...
            </div>
          </dj-image>
        </div>
        </div>`,
      data: {
        data() {
          return {
            src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          };
        }
      }
    },
    {
      title: '加载失败',
      template: `
        <div class="demo-image__placeholder">
        <div class="disInB"
             style="padding: 10px 0px 20px;text-align: center;border-right: 1px solid #eff2f6;width: 49%;">
          <div class="mb10">默认</div>
          <dj-image :src="src" style="width: 300px; height: 200px;" @onError="errorFun"></dj-image>
          <dj-image :src="src" style="width: 20px; height: 20px;"></dj-image>
        </div>
        <div class="disInB" style="padding: 10px 0px 20px;text-align: center;width: 49%;">
          <div class="mb10">自定义</div>
          <dj-image :src="src" style="width: 300px; height: 200px;">
            <div slot="error"
                 style="display: flex;justify-content: center;align-items: center;width: 100%;height: 100%;background: #f5f7fa;color: #909399;font-size: 14px;">
              <dj-icon icon="image"/>
            </div>
          </dj-image>
        </div>
        </div>`,
      data: {
        data() {
          return {
            src: ''
          };
        },
        methods: {
          errorFun(e) {
            console.log('加载失败');
          }
        }
      }
    },
    {
      title: '懒加载',
      template: `
        <div class="par" style="height: 400px;overflow-y: auto">
        <dj-image v-for="url in urls" :key="url" :src="url" lazy style="display:block;min-height: 200px "></dj-image>
        </div>`,
      data: {
        data() {
          return {
            urls: [
              'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
              'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
              'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
              'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
              'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
              'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
              'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
            ]
          };
        }
      }
    },
    {
      title: '边框',
      template: `
        <dj-image v-for="src in srcList" :src="src" style="width: 300px; height: 200px;margin-right: 10px"
                  :downloadStatus="false" :key="src" border></dj-image>`,
      data: {
        data() {
          return {
            srcList: [
              'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
              'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
            ]
          };
        }
      }
    },
    {
      title: '多图预览',
      template: `
        <dj-image v-for="src in srcList" :src="src" style="width: 300px; height: 200px;margin-right: 10px"
                  @download="download" :preview-src-list="srcList" :key="src" maskPreview></dj-image>`,
      data: {
        data() {
          return {
            srcArr: [
              {
                src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                srcList: [
                  'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                  'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
                  // 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
                ]
              },
              {
                src: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
                srcList: [
                  'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                  'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
                  // 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
                ]
              }
            ],
            srcList: [
              'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
              'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
            ]
          };
        },
        methods: {
          download() {
            console.log('download');
          }
        }
      }
    },
    {
      title: '单张多图预览 & 自定义浮层',
      template: `
        <div class="demo-image__placeholder">
        <div class="disInB"
             style="padding: 10px 0px 20px;text-align: center;border-right: 1px solid #eff2f6;width: 32%;">
          <div class="mb10">默认浮层点击</div>
          <dj-image :src="src" style="width: 300px; height: 200px" ref="img1" :preview-src-list="[src]">
            <dj-image-mask ref="imgMask" maskPreview @imagePreviewFun="imagePreviewFun('img1')">
              <div></div>
            </dj-image-mask>
          </dj-image>
        </div>
        <div class="disInB"
             style="padding: 10px 0px 20px;text-align: center;border-right: 1px solid #eff2f6;width: 32%;">
          <div class="mb10">自定义浮层 & 蒙层点击</div>
          <dj-image :src="src" style="width: 300px; height: 200px" ref="img2" :preview-src-list="[src]">
            <dj-image-mask ref="imgMask" @click="maskClick">
              <div style="color: #fff;cursor: pointer" @click="deleteFun">删除</div>
            </dj-image-mask>
          </dj-image>
        </div>
        <div class="disInB"
             style="padding: 10px 0px 20px;text-align: center;border-right: 1px solid #eff2f6;width: 32%;">
          <div class="mb10">自定义浮层</div>
          <dj-image :src="src" style="width: 300px; height: 200px;" @download="download" :preview-src-list="srcList"
                    ref="img3">
            <dj-image-mask ref="imgMask" style="height: 50px;bottom: 0;top: unset;">
              <div style="color: #fff;cursor: pointer" @click="imagePreviewFun('img3')">查看大图</div>
            </dj-image-mask>
          </dj-image>
        </div>
        <div class="disInB" style="padding: 10px 0px 20px;text-align: center;width: 32%;">
          <div class="mb10">无浮层</div>
          <dj-image :src="src" style="width: 300px; height: 200px;" :preview-src-list="srcList" ref="img4"
                    :showMask="false"></dj-image>
        </div>
        </div>
      `,
      data: {
        data() {
          return {
            src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            srcList: [
              'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
              'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
              'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
              'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
              'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              'https://img11.360buyimg.com/promotiongame/jfs/t1/158014/39/15934/76868/6061741eE79d678e7/b431e9041abca23a.gif'
            ]
          };
        },
        methods: {
          download() {
            console.log('download');
          },
          deleteFun(e) {
            e = e || window.event;
            if (e.stopPropagation) {
              e.stopPropagation();
            } else {
              e.cancelBubble = true;
            }
            console.log('deleteFun');
          },
          maskClick() {
            console.log('maskClick');
          },
          imagePreviewFun(refKey) {
            this.$refs[refKey].imagePreviewFun();
          }
        }
      }
    },
    {
      title: '仅查看大图',
      template: `
        <dj-button @click="show">查看大图</dj-button>
        <dj-image-preview :previewSrcList="srcList" :showViewer="showViewer" @onClose="closePreview"
                          @handleActions='handleActions'/>
      `,
      data: {
        data() {
          return {
            showViewer: false,
            srcList: [
              'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
              'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
              'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
              'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
              'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              'https://img11.360buyimg.com/promotiongame/jfs/t1/158014/39/15934/76868/6061741eE79d678e7/b431e9041abca23a.gif'
            ]
          };
        },
        methods: {
          handleActions(action) {
            console.log('action', action);
          },
          download() {
            console.log('download');
          },
          show() {
            this.showViewer = true;
          },
          closePreview() {
            this.showViewer = false;
          }
        }
      }
    }
  ]
};
