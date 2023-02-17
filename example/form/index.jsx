export default {
  title: 'form 表单',
  describe: '',
  templates: [
    {
      title: '基础用法',
      template: `
      <dj-form ref="form" v-model="form" :type="fromType" :rules="rules" :disabled="disabled">
        <dj-form-item></dj-form-item>
        <dj-form-item label="活动名称" field="activityName" help="最多输入10个汉字">
          <dj-input v-model="form.activityName" placeholder="请输入文本..."></dj-input>
        </dj-form-item>
         <dj-form-item label="输入建议" field="advise">
           <dj-input :funquery="query" v-model='form.advise'/>
        </dj-form-item>
        <dj-form-item label="活动编号" field="activityCode">
          <dj-input v-model="form.activityCode" placeholder="请输入文本..."/>
        </dj-form-item>
        <dj-form-item label="手机号" field="mobile">
          <dj-input v-model="form.mobile" type="number" placeholder="请输入文本..."/>
        </dj-form-item>
        <dj-form-item label="活动类型" field="activityType">
          <dj-select v-model="form.activityType" searchable>
            <dj-option v-for="type in activityTypeList" :key="type.value" :value="type.value" :label="type.text"></dj-option>
          </dj-select>
          <template v-slot:info="fromData">
            {{fromData.activityType | activityType}}
          </template>
        </dj-form-item>
        <dj-form-item label="有效天数" field="day">
          <dj-input v-model="form.day" type="number" placeholder="请输入文本...">
            <template slot="after">
              <span style="padding: 0px 10px;">天</span>
            </template>
          </dj-input>
          <template v-slot:info="fromData">
            {{fromData.day ? fromData.day + '天' : ''}}
          </template>
        </dj-form-item>
        <dj-form-item label="是否展示" field="isShow">
          <dj-radio v-model="form.isShow" :code="true">展示</dj-radio><dj-radio v-model="form.isShow" :code="false">不展示</dj-radio>
          <template v-slot:info="fromData">
            {{fromData.isShow ? '展示' : '不展示'}}
          </template>
        </dj-form-item>
        <dj-form-item label="启用活动" field="isTest">
          <dj-switch v-model="form.isTest"/>
          <template v-slot:info="fromData">
            {{fromData.isTest ? '启用' : '关闭'}}
          </template>
        </dj-form-item>
        <dj-form-item label="展示平台" field="platform" :empty="false">
          <dj-checkbox-group v-model="form.platform">
            <dj-checkbox :code="1">H5</dj-checkbox>
            <dj-checkbox :code="2">小程序</dj-checkbox>
            <dj-checkbox :code="3">IOS</dj-checkbox>
            <dj-checkbox :code="4">Android</dj-checkbox>
          </dj-checkbox-group>
          <template v-slot:info="fromData">
            {{fromData.platform}}
          </template>
        </dj-form-item>
        <dj-form-item label="活动背景色" field="bgColor" :empty="false">
          <dj-color-picker v-model="form.bgColor" placeholder="请输入或选择颜色"/>
        </dj-form-item>
        <dj-form-item label="活动描述" field="desc" :empty="false">
          <dj-textarea v-model="form.desc" placeholder="请输入文本..."/>
        </dj-form-item>
        <dj-form-item label="文件" field="fileList">
          <dj-upload v-model="form.fileList"></dj-upload>
        </dj-form-item>
        <dj-form-item label="文件2" field="fileList2">
          <dj-upload
            v-model='form.fileList2'
            :onsuccess="onsuccess"
            dragUpload
            :autoupload="true"
            fileName="importExcel"
            action="/store/delivery/processStoreConfigs"
          ></dj-upload>
        </dj-form-item>
        <dj-form-item label="文件4" field="img">
          <dj-upload
            v-model='form.img'
            dragUpload
            type="img"
            @onUpload="upload4"
            ref="upload4"
            :autoupload="true"
            fileName="importExcel"
            multiple
           
          ></dj-upload>
      </dj-form-item>
      <dj-form-item label="文件" field="fileList">
        <dj-upload v-model="form.fileList4" :autoupload="false"></dj-upload>
      </dj-form-item>
      <dj-form-item label="描述" field="productDesc">
        <dj-editor v-model="form.productDesc"></dj-editor>
      </dj-form-item>
      <dj-form-item label="分类" field="category">
        <dj-cascader v-model="form.category" :options="options" clearable></dj-cascader>
      </dj-form-item>
      
        <dj-form-item label="" :view="false">
          <dj-button type="primary"  @click="submit()">保存</dj-button>
          <div class="spacing"></div>
          <dj-button  @click="loadInfo()">获取</dj-button>
          <div class="spacing"></div>
          <dj-button  @click="info()">详情</dj-button>
          <div class="spacing"></div>
          <dj-button  @click="reset()">清空</dj-button>
          <div class="spacing"></div>
          <dj-button  @click="setDisabled()" :disabled="false">禁用</dj-button>
        </dj-form-item>
      </dj-form>`,
      data: {
        data() {
          return {
            form: {
              activityName: 0,
              mobile: '',
              activityCode: '',
              activityType: '',
              day: '',
              isShow: null,
              isTest: false,
              platform: [],
              bgColor: '',
              desc: '',
              fileList: [{name: '1.jpg'}],
              fileList2: [],
              // img: 'http://img30.360buyimg.com/mobilecms/jfs/t1/140853/14/10684/18564/5f86ba83E4a35db12/187038b74849ec17.jpg',
              img: [{
                url: 'http://img30.360buyimg.com/mobilecms/jfs/t1/140853/14/10684/18564/5f86ba83E4a35db12/187038b74849ec17.jpg'
              }],
              fileList4: [],
              productDesc: '',
              advise: ''
            },
            activeTab: '2',
            fromType: 'edit',
            disabled: false,
            rules: {
              activityName: [{ type: 'empty' }, { type: 'range', min: 5, max: 10 }],
              mobile: [{ type: 'regExp', regExp: /^1\d{10}$/ }],
              activityCode: [{
                type: 'validator',
                validator: function(val, from) {
                  if (val) {
                    return true;
                  }
                  return '校验失败';
                }
              }],
              activityType: [{type: 'empty'}],
              day: [{ type: 'empty' }, { type: 'range', min: 1, max: 30 }],
              isShow: [{ type: 'empty' }],
              isTest: [{ type: 'empty' }],
              fileList: [{ type: 'empty' }],
              fileList2: [{ type: 'empty' }],
              img: [{ type: 'empty' }],
              fileList4: [{ type: 'empty' }],
              productDesc: [{ type: 'empty' }],
              advise: [{ type: 'empty' }],
              category: [{ type: 'empty' }]
            },
            activityTypeList: [],
            options: [
              {
                value: 'zhinan',
                label: '指南',
                children: [
                  {
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [
                      {
                        value: 'yizhi',
                        label: '一致'
                      },
                      {
                        value: 'fankui',
                        label: '反馈'
                      },
                      {
                        value: 'xiaolv',
                        label: '效率'
                      },
                      {
                        value: 'kekong',
                        label: '可控'
                      }
                    ]
                  },
                  {
                    value: 'daohang',
                    label: '导航',
                    children: [
                      {
                        value: 'cexiangdaohang',
                        label: '侧向导航'
                      },
                      {
                        value: 'dingbudaohang',
                        label: '顶部导航'
                      }
                    ]
                  }
                ]
              },
              {
                value: 'zujian',
                label: '组件',
                children: [
                  {
                    value: 'basic',
                    label: 'Basic',
                    children: [
                      {
                        value: 'layout',
                        label: 'Layout 布局'
                      },
                      {
                        value: 'color',
                        label: 'Color 色彩'
                      },
                      {
                        value: 'typography',
                        label: 'Typography 字体'
                      },
                      {
                        value: 'icon',
                        label: 'Icon 图标'
                      },
                      {
                        value: 'button',
                        label: 'Button 按钮'
                      }
                    ]
                  },
                  {
                    value: 'form',
                    label: 'Form',
                    children: [
                      {
                        value: 'radio',
                        label: 'Radio 单选框'
                      },
                      {
                        value: 'checkbox',
                        label: 'Checkbox 多选框'
                      },
                      {
                        value: 'input',
                        label: 'Input 输入框'
                      },
                      {
                        value: 'input-number',
                        label: 'InputNumber 计数器'
                      },
                      {
                        value: 'select',
                        label: 'Select 选择器'
                      },
                      {
                        value: 'cascader',
                        label: 'Cascader 级联选择器'
                      },
                      {
                        value: 'switch',
                        label: 'Switch 开关'
                      },
                      {
                        value: 'slider',
                        label: 'Slider 滑块'
                      },
                      {
                        value: 'time-picker',
                        label: 'TimePicker 时间选择器'
                      },
                      {
                        value: 'date-picker',
                        label: 'DatePicker 日期选择器'
                      },
                      {
                        value: 'datetime-picker',
                        label: 'DateTimePicker 日期时间选择器'
                      },
                      {
                        value: 'upload',
                        label: 'Upload 上传'
                      },
                      {
                        value: 'rate',
                        label: 'Rate 评分'
                      },
                      {
                        value: 'form',
                        label: 'Form 表单'
                      }
                    ]
                  },
                  {
                    value: 'data',
                    label: 'Data',
                    children: [
                      {
                        value: 'table',
                        label: 'Table 表格'
                      },
                      {
                        value: 'tag',
                        label: 'Tag 标签'
                      },
                      {
                        value: 'progress',
                        label: 'Progress 进度条'
                      },
                      {
                        value: 'tree',
                        label: 'Tree 树形控件'
                      },
                      {
                        value: 'pagination',
                        label: 'Pagination 分页'
                      },
                      {
                        value: 'badge',
                        label: 'Badge 标记'
                      }
                    ]
                  },
                  {
                    value: 'notice',
                    label: 'Notice',
                    children: [
                      {
                        value: 'alert',
                        label: 'Alert 警告'
                      },
                      {
                        value: 'loading',
                        label: 'Loading 加载'
                      },
                      {
                        value: 'message',
                        label: 'Message 消息提示'
                      },
                      {
                        value: 'message-box',
                        label: 'MessageBox 弹框'
                      },
                      {
                        value: 'notification',
                        label: 'Notification 通知'
                      }
                    ]
                  },
                  {
                    value: 'navigation',
                    label: 'Navigation',
                    children: [
                      {
                        value: 'menu',
                        label: 'NavMenu 导航菜单'
                      },
                      {
                        value: 'tabs',
                        label: 'Tabs 标签页'
                      },
                      {
                        value: 'breadcrumb',
                        label: 'Breadcrumb 面包屑'
                      },
                      {
                        value: 'dropdown',
                        label: 'Dropdown 下拉菜单'
                      },
                      {
                        value: 'steps',
                        label: 'Steps 步骤条'
                      }
                    ]
                  },
                  {
                    value: 'others',
                    label: 'Others',
                    children: [
                      {
                        value: 'dialog',
                        label: 'Dialog 对话框'
                      },
                      {
                        value: 'tooltip',
                        label: 'Tooltip 文字提示'
                      },
                      {
                        value: 'popover',
                        label: 'Popover 弹出框'
                      },
                      {
                        value: 'card',
                        label: 'Card 卡片'
                      },
                      {
                        value: 'carousel',
                        label: 'Carousel 走马灯'
                      },
                      {
                        value: 'collapse',
                        label: 'Collapse 折叠面板'
                      }
                    ]
                  }
                ]
              },
              {
                value: 'ziyuan',
                label: '资源',
                children: [
                  {
                    value: 'axure',
                    label: 'Axure Components'
                  },
                  {
                    value: 'sketch',
                    label: 'Sketch Templates'
                  },
                  {
                    value: 'jiaohu',
                    label: '组件交互文档'
                  }
                ]
              }
            ]
          };
        },
        filters: {
          activityType: function(value) {
            if (value == '1') {
              return '普通活动';
            } else if (value == '2') {
              return '满减活动';
            } else if (value == '3') {
              return '地推活动';
            } else if (value == '4') {
              return '兑换活动';
            } else if (value == '5') {
              return '定向推送';
            } else if (value == '6') {
              return '红包活动';
            } else if (value == '7') {
              return '随机券活动';
            }
            return '';
          }
        },
        mounted() {
          setTimeout(() => {
            this.activityTypeList = [
              { value: 0, text: 'int0' },
              { value: '1', text: '普通活动' },
              { value: '2', text: '满减活动' },
              { value: '3', text: '地推活动' },
              { value: '4', text: '兑换活动' },
              { value: '5', text: '定向推送' },
              { value: '6', text: '红包活动' },
              { value: '7', text: '随机券活动' }
            ];
          }, 1000);
        },
        methods: {
          query(keyword, fn) {
            let list = [];
            let random = Math.floor(Math.random() * 10);
            for (let i = 0; i < random; i++) {
              let item1 = {};
              item1.value = (keyword || '测试数据') + i;
              list.push(item1);
            }
            fn && fn(list);
          },
          upload4(file){
            console.log(this.$refs.upload4,'yh',file);
          },
          submit() {
            if (!this.$refs.form.validate()) {
              console.log(this.$refs.form.getErrorMsg()); // 获取表单所有校验失败信息
              return false;
            }
            this.$message.success('成功');
          },
          loadInfo() {
            this.form = {
              activityName: 'test',
              // mobile: '',
              activityCode: '1011023',
              activityType: '1',
              day: '30',
              isShow: true,
              isTest: true,
              platform: [1, 2],
              bgColor: '#e147c0',
              desc: '测试活动',
              fileList: []
            };
          },
          info() {
            this.fromType = this.fromType == 'edit' ? 'info' : 'edit';
          },
          reset() {
            this.$refs.form.reset();
          },
          setDisabled() {
            this.disabled = !this.disabled;
          },
          onsuccess(){
            this.form.fileList2.push({});
          }
        }
      }
    },
    {
      title: 'noform',
      template: `<dj-form ref="form" v-model="form" :fields="fields" :type="fromType" :rules="rules" :disabled="disabled">
      </dj-form>`,
      data: {
        data() {
          return {
            form: {
              activityName: '',
              activityCode: '',
              activityType: '',
              day: '',
              isShow: null,
              isTest: false,
              platform: [],
              bgColor: '',
              desc: '',
              fileList: [{url: 'http://img30.360buyimg.com/mobilecms/jfs/t1/140853/14/10684/18564/5f86ba83E4a35db12/187038b74849ec17.jpg'}]
            },
            fromType: 'edit',
            disabled: false,
            fields: [
              { props: { label: '活动名称', field: 'activityName' }, contents: [{ type: 'input', props: {placeholder: '请输入活动名称...' }}] },
              { props: { label: '活动编号', field: 'activityCode' }, contents: [{ type: 'input', props: {placeholder: '请输入活动编号...'} }]},
              { props: {label: '活动类型', field: 'activityType'}, contents: [{ type: 'select', items: [
                { value: '1', label: '普通活动' },
                { value: '2', label: '满减活动' },
                { value: '3', label: '地推活动' },
                { value: '4', label: '兑换活动' },
                { value: '5', label: '定向推送' },
                { value: '6', label: '红包活动' },
                { value: '7', label: '随机券活动' }] }]
              },
              { props: { label: '有效天数', field: 'day' }, contents: [{ type: 'input', props: {type: 'number', after: '天', placeholder: '请输入有效天数...'} }] },
              { props: {label: '是否展示', field: 'isShow'}, contents: [{ type: 'radio', items: [
                { value: true, label: '展示'},
                { value: false, label: '不展示' }] }]
              },
              { props: {label: '启用活动', field: 'isTest'}, contents: [{ type: 'switch' }] },
              { props: {label: '展示平台', field: 'platform', empty: false}, contents: [{ type: 'checkbox', items: [
                { value: 1, label: 'H5' },
                { value: 2, label: '小程序' },
                { value: 3, label: 'IOS' },
                { value: 4, label: 'Android' }] }]
              },
              { props: {label: '上传图片', field: 'fileList', empty: false}, contents: [{ type: 'upload', uploadtype: 'imgs', items: [
              ] }]
              },
              { props: { label: '活动背景色', field: 'bgColor', empty: false }, contents: [{ type: 'color', props: {placeholder: '请输入或选择颜色'} }] },
              { label: '活动描述', props: {field: 'desc', empty: false}, contents: [{ type: 'textarea', props: {placeholder: '请输入文本...'} }] },
              { props: {label: '', view: false}, contents: [
                { type: 'button', text: '保存', props: { type: 'primary' }, event: { click: this.submit } },
                { type: 'spacing' },
                { type: 'button', text: '获取', event: { click: this.loadInfo } },
                { type: 'spacing' },
                { type: 'button', text: '详情', event: { click: this.info } },
                { type: 'spacing' },
                { type: 'button', text: '清空', event: { click: this.reset } },
                { type: 'spacing' },
                { type: 'button', text: '禁用', props: { disabled: false }, event: { click: this.setDisabled } }
              ] }
            ],
            rules: {
              activityName: [{ type: 'empty' }, { type: 'range', min: 5, max: 10 }],
              activityCode: [{ type: 'empty' }],
              activityType: [{ type: 'empty' }],
              day: [{ type: 'empty' }, { type: 'range', min: 1, max: 30 }],
              isShow: [{ type: 'empty' }],
              isTest: [{ type: 'empty' }],
              fileList: [{ type: 'empty' }]
            }
          };
        },
        filters: {
          activityType: function(value) {
            if (value == '1') {
              return '普通活动';
            } else if (value == '2') {
              return '满减活动';
            } else if (value == '3') {
              return '地推活动';
            } else if (value == '4') {
              return '兑换活动';
            } else if (value == '5') {
              return '定向推送';
            } else if (value == '6') {
              return '红包活动';
            } else if (value == '7') {
              return '随机券活动';
            }
            return '';
          }
        },
        methods: {
          submit() {
            if (!this.$refs.form.validate()) {
              return false;
            }
            this.$message.success('成功');
          },
          loadInfo() {
            this.form = {
              activityName: 'test',
              activityCode: '1011023',
              activityType: '1',
              day: '30',
              isShow: true,
              isTest: true,
              platform: [1, 2],
              bgColor: '#e147c0',
              desc: '测试活动',
              fileList: []
            };
          },
          info() {
            this.fromType = this.fromType == 'edit' ? 'info' : 'edit';
          },
          reset() {
            this.$refs.form.reset();
          },
          setDisabled() {
            this.disabled = !this.disabled;
          }
        }
      }
    },
    {
      title: '表单校验',
      template: '',
      data: {
        data() {
          return {
            desc: ''
          };
        },
        methods: {
        }
      }
    },
    {
      title: '动态表单',
      template: `<dj-form ref="form" v-model="form" :type="fromType" :rules="rules" :disabled="disabled">
        <dj-form-item v-for="(time, index) in form.timeList" label="时间段" :form="time" :rule="[{type: 'validator', validator: (val, form) => {return !(form.beginTime == '' || form.endTime == '')}}]" fields="beginTime,endTime,times">
          <dj-date-picker type="daterange" v-model="time.times" @change="(value, timeStr) => {timeChange(time, value, timeStr)}"></dj-date-picker>
          <span>{{time}}</span>
        </dj-form-item>
        <dj-form-item label="活动描述1" :empty="false">
          <dj-tab v-model="activeTab">
            <dj-tab-pane v-for="tab in tabs" :label="tab.label" :name="tab.name">
              <dj-form ref="form" v-model="tab.form">
                <dj-form-item label="Id" field="id">
                  <dj-input v-model="tab.form.id" placeholder="请输入文本..."></dj-input>
                </dj-form-item>
                <dj-form-item label="name" field="name">
                  <dj-input v-model="tab.form.name" placeholder="请输入文本..."></dj-input>
                </dj-form-item>
              </dj-form>
            </dj-tab-pane>
          </dj-tab>
        </dj-form-item>
        <dj-form-item label="" :view="false">
          <dj-button type="primary"  @click="submit()">保存</dj-button>
          <div class="spacing"></div>
          <dj-button  @click="loadInfo()">获取</dj-button>
          <div class="spacing"></div>
          <dj-button  @click="info()">详情</dj-button>
          <div class="spacing"></div>
          <dj-button  @click="reset()">清空</dj-button>
          <div class="spacing"></div>
          <dj-button  @click="setDisabled()" :disabled="false">禁用</dj-button>
          <div class="spacing"></div>
          <dj-button  @click="addTime()" :disabled="false">addTime</dj-button>
          <div class="spacing"></div>
          <dj-button  @click="addTab()" :disabled="false">addTab</dj-button>
        </dj-form-item>
      </dj-form>`,
      data: {
        data() {
          return {
            form: {
              timeList: [
                {
                  beginTime: '',
                  endTime: '',
                  times: []
                }
              ]
            },
            timeList: [],
            activeTab: 'tab1',
            fromType: 'edit',
            disabled: false,
            rules: {
            },
            activityTypeList: [],
            tabs: []
          };
        },
        created() {
          this.addTab();
        },
        mounted() {
        },
        methods: {
          timeChange(time, value, timeStr) {
            time.beginTime = timeStr[0];
            time.endTime = timeStr[1];
            console.log('aaaa----', value, timeStr);
          },
          submit() {
            if (!this.$refs.form.validate()) {
              return false;
            }
            this.$message.success('成功');
          },
          loadInfo() {
            this.form = {
            };
          },
          info() {
            this.fromType = this.fromType == 'edit' ? 'info' : 'edit';
          },
          reset() {
            this.$refs.form.reset();
          },
          setDisabled() {
            this.disabled = !this.disabled;
          },
          addTab() {
            let tab = 'tab' + (this.tabs.length + 1);
            this.tabs.push({ label: tab, name: tab, form: {id: '1', name: ''}});
          },
          addTime() {
            this.form.timeList.push({ beginTime: '', endTime: '', times: [] });
          }
        }
      }
    },
    {
      title: '弹窗表单',
      template: `<dj-modal ref="modal" title="提交表单" :ok="submit" size="tiny">
        <dj-form ref="form" v-model="form" :type="fromType" :rules="rules" :disabled="disabled">
          <dj-form-item label="活动名称" field="activityName">
            <dj-input v-model="form.activityName" placeholder="请输入文本..."></dj-input>
          </dj-form-item>
          <dj-form-item label="活动类型" field="activityType">
            <span>{{form.activityType}}</span>
            <dj-select v-model="form.activityType" multiple searchable>
              <dj-option v-for="type in activityTypeList" :key="type.value" :value="type.value" :label="type.text"></dj-option>
            </dj-select>
            <template v-slot:info="fromData">
              {{fromData.activityType | activityType}}
            </template>
          </dj-form-item>
          <dj-form-item label="" :view="false">
            <dj-button type="primary"  @click="submit()">保存</dj-button>
            <div class="spacing"></div>
            <dj-button  @click="loadInfo()">获取</dj-button>
            <div class="spacing"></div>
            <dj-button  @click="info()">详情</dj-button>
            <div class="spacing"></div>
            <dj-button  @click="reset()">清空</dj-button>
            <div class="spacing"></div>
            <dj-button  @click="setDisabled()" :disabled="false">禁用</dj-button>
          </dj-form-item>
        </dj-form>
      </dj-modal>
      <dj-button  @click="show()">show</dj-button>
      `,
      data: {
        data() {
          return {
            form: {
              activityName: '',
              activityCode: '',
              activityType: [],
              day: '',
              isShow: null,
              isTest: false,
              platform: [],
              bgColor: '',
              desc: ''
            },
            fromType: 'edit',
            disabled: false,
            rules: {
              activityName: [{ type: 'empty' }, { type: 'range', min: 5, max: 10 }],
              activityCode: [{ type: 'empty' }],
              activityType: [{ type: 'empty' }],
              day: [{ type: 'empty' }, { type: 'range', min: 1, max: 30 }],
              isShow: [{ type: 'empty' }],
              isTest: [{ type: 'empty' }]
            },
            activityTypeList: [
              { value: 0, text: 'int0' },
              { value: '1', text: '普通活动' },
              { value: '2', text: '满减活动' },
              { value: '3', text: '地推活动' },
              { value: '4', text: '兑换活动' },
              { value: '5', text: '定向推送' },
              { value: '6', text: '红包活动' },
              { value: '7', text: '随机券活动' }
            ]
          };
        },
        filters: {
          activityType: function(value) {
            if (value == '1') {
              return '普通活动';
            } else if (value == '2') {
              return '满减活动';
            } else if (value == '3') {
              return '地推活动';
            } else if (value == '4') {
              return '兑换活动';
            } else if (value == '5') {
              return '定向推送';
            } else if (value == '6') {
              return '红包活动';
            } else if (value == '7') {
              return '随机券活动';
            }
            return '';
          }
        },
        methods: {
          show() {
            this.$refs.modal.show();
          },
          submit() {
            if (!this.$refs.form.validate()) {
              return false;
            }
            this.$message.success('成功');
          },
          loadInfo() {
            this.form = {
              activityName: 'test',
              activityCode: '1011023',
              activityType: ['1', '2'],
              day: '30',
              isShow: true,
              isTest: true,
              platform: [1, 2],
              bgColor: '#e147c0',
              desc: '测试活动'
            };
          },
          info() {
            this.fromType = this.fromType == 'edit' ? 'info' : 'edit';
          },
          reset() {
            this.$refs.form.reset();
          },
          setDisabled() {
            this.disabled = !this.disabled;
          }
        }
      }
    },
    {
      title: '动态判断v-if',
      template: `<dj-form ref="form" class="aaa aaa" :class="{'aaa': test}" v-model="form" :type="fromType" :rules="rules" :disabled="disabled">
        <dj-form-item label="关联规则" field="brand">
          <dj-radio-group v-model="form.brand">
            <dj-radio :code="0">按UPC（苹果）</dj-radio>
            <dj-radio :code="1">按价格（非苹果）</dj-radio>
          </dj-radio-group>
        </dj-form-item>
        <dj-form-item v-if="form.brand === 0" label="" field="upc">
          <dj-textarea v-model="form.upc" placeholder="请输入UPC..." />
        </dj-form-item>
        <dj-form-item v-if="form.brand === 1" label="" field="min">
          <dj-input v-model="form.min" type="number" after="元" placeholder="0" style="width: 100px;" />
          <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
          <dj-input v-model="form.max" type="number" after="元" placeholder="0" style="width: 100px;" class="aaa ddd" :class="{'bbb': true, 'ccc': test}" :style="test ? 'height: 29px;' : 'height: 20px;'"/>
        </dj-form-item>
        <dj-form-item label="活动类型" field="activityType" v-if="form.brand === 0">
          <dj-select v-model="form.activityType" searchable>
            <dj-option v-for="type in activityTypeList" :key="type.value" :value="type.value" :label="type.text"></dj-option>
          </dj-select>
          <template v-slot:info="fromData">
            {{fromData.activityType | activityType}}
          </template>
        </dj-form-item>
        <dj-form-item label="活动编号" field="activityCode" v-if="form.brand === 1">
          <dj-input v-model="form.activityCode" placeholder="请输入文本..."/>
        </dj-form-item>
      </dj-form>
      <dj-button  @click="submit()">submit</dj-button>
      <dj-button  @click="setTest()">setTest</dj-button>
      <dj-button  @click="resetSelect()">清空下拉框值</dj-button>
      `,
      data: {
        data() {
          return {
            height: 30,
            test: true,
            form: {
              brand: '',
              upc: '',
              min: '',
              max: '',
              activityType: '',
              activityCode: ''
            },
            fromType: 'edit',
            disabled: false,
            rules: {
              brand: [{ type: 'empty' }],
              upc: [{ type: 'empty' }],
              min: [{ type: 'empty' }],
              max: [{ type: 'empty' }]
            },
            activityTypeList: []
          };
        },
        methods: {
          submit() {
            if (!this.$refs.form.validate()) {
              return false;
            }
            this.$message.success('成功');
          },
          loadInfo() {
            this.form = {
              activityName: 'test',
              activityCode: '1011023',
              activityType: '1',
              day: '30',
              isShow: true,
              isTest: true,
              platform: [1, 2],
              bgColor: '#e147c0',
              desc: '测试活动'
            };
          },
          info() {
            this.fromType = this.fromType == 'edit' ? 'info' : 'edit';
          },
          reset() {
            this.$refs.form.reset();
          },
          resetSelect() {
            if (this.activityTypeList.length && this.activityTypeList[0].value != 10) {
              this.activityTypeList = [
                { value: 10, text: 'int011' },
                { value: '13', text: '普通活动111' },
                { value: '2', text: '满减活动' },
                { value: '3', text: '地推活动' },
                { value: '4', text: '兑换活动' },
                { value: '5', text: '定向推送' },
                { value: '6', text: '红包活动' },
                { value: '7', text: '随机券活动' }
              ];
            } else {
              this.activityTypeList = [
                { value: 0, text: 'int0' },
                { value: '1', text: '普通活动' },
                { value: '2', text: '满减活动' },
                { value: '3', text: '地推活动' },
                { value: '4', text: '兑换活动' },
                { value: '5', text: '定向推送' },
                { value: '6', text: '红包活动' },
                { value: '7', text: '随机券活动' }
              ];
            }
          },
          setTest() {
            this.test = !this.test;
          },
          setDisabled() {
            this.disabled = !this.disabled;
          }
        }
      }
    },
    {
      title: '行内表单',
      template: `<dj-form ref="form" v-model="form" :rules="rules" inline>
        <dj-form-item label="活动名称" field="activityName">
          <dj-input v-model="form.activityName" placeholder="请输入文本..."></dj-input>
        </dj-form-item>
        <dj-form-item label="活动编号" field="activityCode">
          <dj-input v-model="form.activityCode" placeholder="请输入文本..."/>
        </dj-form-item>
        <dj-form-item label="" :view="false">
          <dj-button type="primary"  @click="submit()">保存</dj-button>
        </dj-form-item>
      </dj-form>`,
      data: {
        data() {
          return {
            form: {
              activityName: 0,
              activityCode: ''
            },
            rules: {
              activityName: [{ type: 'empty' }, { type: 'range', min: 5, max: 10 }],
              activityCode: [{
                type: 'validator',
                validator: function(val, from) {
                  if (val) {
                    return true;
                  }
                  return '校验失败';
                }
              }]
            }
          };
        },
        mounted() {
        },
        methods: {
          submit() {
            if (!this.$refs.form.validate()) {
              return false;
            }
            this.$message.success('成功');
          }
        }
      }
    },
    {
      title: '混合部分行内表单',
      template: `<dj-form ref="form" v-model="form" :rules="rules">
        <dj-form-item label="活动名称" field="activityName" inline>
          <dj-input v-model="form.activityName" placeholder="请输入文本..."></dj-input>
        </dj-form-item>
        <dj-form-item label="活动编号" field="activityCode" inline>
          <dj-input v-model="form.activityCode" placeholder="请输入文本..."/>
        </dj-form-item>
        <dj-form-item label="" :view="false">
          <dj-button type="primary"  @click="submit()">保存</dj-button>
        </dj-form-item>
      </dj-form>`,
      data: {
        data() {
          return {
            form: {
              activityName: 0,
              activityCode: ''
            },
            rules: {
              activityName: [{ type: 'empty' }, { type: 'range', min: 5, max: 10 }],
              activityCode: [{
                type: 'validator',
                validator: function(val, from) {
                  if (val) {
                    return true;
                  }
                  return '校验失败';
                }
              }]
            }
          };
        },
        mounted() {
        },
        methods: {
          submit() {
            if (!this.$refs.form.validate()) {
              return false;
            }
            this.$message.success('成功');
          }
        }
      }
    }
  ]
};
