export default {
  title: 'modal 模态窗口',
  describe: '',
  templates: [
    {
      title: '基础用法',
      template: `<dj-button @click="show()">弹窗</dj-button>
      <dj-modal ref="modal" :visible.sync="showModal" :ok="ok" :cancel="cancel">这是一个模态窗口</dj-modal>`,
      data: {
        data() {
          return {
            showModal: false
          };
        },
        methods: {
          show() {
            this.showModal = true;
            // this.$refs.modal.show();
          },
          ok(done) {
            this.$message.success('保存成功');
          },
          cancel(done) {
            this.$alert(1);
            return false;
          }
        }
      }
    },
    {
      title: '嵌套表格',
      template: `<dj-button @click="show('modal')">查看详情</dj-button>
      <dj-modal ref="modal" title="查看详情" :showfooter="false" size="small">
        <dj-table :data="tableData">
          <dj-table-column label="姓名" field="name"/>
          <dj-table-column label="年龄" field="age"/>
        </dj-table>
      </dj-modal>`,
      data: {
        data() {
          return {
            showModal: false,
            tableData: [{ name: '张三', age: 18 }, { name: '李四', age: 21 }]
          };
        },
        methods: {
          show(type) {
            this.$refs[type].show();
          }
        }
      }
    },
    {
      title: '嵌套表单',
      template: `<dj-button @click="show('modal')">新增</dj-button>
      <dj-modal ref="modal" title="新增活动" size="tiny" oktext="保存" canceltext="关闭" :ok="ok">
        <dj-form ref="form" v-model="form" :type="fromType" :rules="rules" :disabled="disabled">
          <dj-form-item label="活动名称" field="activityName" help="最多输入10个汉字">
            <dj-input v-model="form.activityName" placeholder="请输入文本..."></dj-input>
          </dj-form-item>
          <dj-form-item label="活动编号" field="activityCode">
            <dj-input v-model="form.activityCode" placeholder="请输入文本..."/>
          </dj-form-item>
        </dj-form>
      </dj-modal>`,
      data: {
        data() {
          return {
            showModal: false,
            tableData: [{ name: '张三', age: 18 }, { name: '李四', age: 21 }],
            form: {
              activityName: 0,
              activityCode: ''
            },
            rules: {
              activityName: [{ type: 'empty' }],
              activityCode: [{ type: 'empty' }]
            }
          };
        },
        methods: {
          show(type) {
            this.$refs[type].show();
          },
          ok() {
            if (!this.$refs.form.validate()) {
              this.$alert('323232323');
              console.log(this.$refs.form.getErrorMsg()); // 获取表单所有校验失败信息
              return false;
            }
            return false;
          }
        }
      }
    },
    {
      title: '嵌套弹窗',
      template: `<dj-button @click="show('modal')">新增</dj-button>
      <dj-modal ref="modal" title="新增活动" size="tiny" height="500px">
        <dj-button @click="show('modal1')">新增</dj-button>
      </dj-modal>
      <dj-modal ref="modal1" title="选择城市" size="mini">
        城市
      </dj-modal>`,
      data: {
        data() {
          return {
            showModal: false,
            tableData: [{ name: '张三', age: 18 }, { name: '李四', age: 21 }]
          };
        },
        methods: {
          show(type) {
            this.$refs[type].show();
          }
        }
      }
    },
    {
      title: '带loading',
      template: `<dj-button @click="show('modal')">查看</dj-button>
      <dj-modal ref="modal">这是一个模态窗口</dj-modal>`,
      data: {
        data() {
          return {
            showModal: false
          };
        },
        methods: {
          show(type) {
            this.$refs[type].show();
            this.$refs[type].showLoading();
            setTimeout(() => {
              this.$refs[type].closeLoading();
            }, 3000);
          },
          hide(type) {
            this.$refs[type].hide();
          }
        }
      }
    },
    {
      title: '自定义页头',
      template: `<dj-button @click="show('modal')">查看</dj-button>
      <dj-modal ref="modal" :showclose="false" border>
        这是一个模态窗口
        <template slot="header">
          选择城市
          <div style="float: right; margin-top: -5px;">
            <dj-input placeholder="请输入城市编号" style="width: 250px; height: 30px" icon="search2">
              <template slot="before" style="padding: 0px">
                <dj-select noBordered style="width: 100px; height: 30px;">
                  <dj-option value="1" label="城市编号"></dj-option>
                  <dj-option value="2" label="城市名称"></dj-option>
                </dj-select>
              </template>
            </dj-input>
          </div>
        </template>
      </dj-modal>`,
      data: {
        data() {
          return {
            showModal: false
          };
        },
        methods: {
          show(type) {
            this.$refs[type].show();
          },
          hide(type) {
            this.$refs[type].hide();
          }
        }
      }
    },
    {
      title: '自定义页脚',
      template: `<dj-button @click="show('modal')">show</dj-button>
      <dj-modal ref="modal">
        这是一个模态窗口
        <template slot="footer">
          <dj-button>上一步</dj-button>
          <dj-button disabled>下一步</dj-button>
        </template>
      </dj-modal>`,
      data: {
        data() {
          return {
            showModal: false
          };
        },
        methods: {
          show(type) {
            this.$refs[type].show();
          },
          hide(type) {
            this.$refs[type].hide();
          }
        }
      }
    },
    {
      title: '点击遮罩层关闭',
      template: `<dj-button @click="show()">弹窗</dj-button>
      <dj-modal ref="modal" :visible.sync="showModal" closable>这是一个模态窗口</dj-modal>`,
      data: {
        data() {
          return {
            showModal: false
          };
        },
        methods: {
          show() {
            this.showModal = true;
          }
        }
      }
    },
    {
      title: '尺寸',
      template: `<dj-button @click="show('mini')">mini</dj-button>
      <dj-button @click="show('tiny')">tiny</dj-button>
      <dj-button @click="show('small')">small</dj-button>
      <dj-button @click="show('large')">large</dj-button>
      <dj-button @click="show('full')">full</dj-button>
      <dj-modal ref="mini" size='mini'>这是一个模态窗口</dj-modal>
      <dj-modal ref="tiny" size='tiny'>这是一个模态窗口</dj-modal>
      <dj-modal ref="small" size='small'>这是一个模态窗口</dj-modal>
      <dj-modal ref="large" size='large'>这是一个模态窗口</dj-modal>
      <dj-modal ref="full" size='full'>这是一个模态窗口</dj-modal>`,
      data: {
        data() {
          return {
            showModal: false
          };
        },
        methods: {
          show(type) {
            this.$refs[type].show();
          }
        }
      }
    }
  ]
};
