import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import Form from '../src/form.vue';
import FormItem from '../../formItem/src/formItem.vue';
import Input from '../../input/src/input.vue';
import Checkbox from '../../checkbox/src/checkbox.vue';
import CheckboxGroup from '../../checkbox/src/checkbox-group.vue';
import Radio from '../../radio/src/radio.vue';
import RadioGroup from '../../radio/src/radio-group.vue';
import TabPane from '../../tabs/src/tab-pane.vue';
import Tab from '../../tabs/src/tab.vue';
import Button from '../../button/src/button.vue';
import Popover from '../../popover/src/popover.vue';
import Textarea from '../../textarea/src/textarea.vue';

const findStyle = (wrapper, selector) => {
  return wrapper.find(selector).element.style;
};

const findAllUtil = (wrapper, selector) => {
  return wrapper.findAll(selector);
};

const mountForm = (config) => {
  return mount({
    components: {
      [Form.name]: Form,
      [FormItem.name]: FormItem,
      [Input.name]: Input,
      [Checkbox.name]: Checkbox,
      [CheckboxGroup.name]: CheckboxGroup,
      [Radio.name]: Radio,
      [RadioGroup.name]: RadioGroup,
      [Tab.name]: Tab,
      [TabPane.name]: TabPane,
      [Button.name]: Button,
      [Popover.name]: Popover,
      [Textarea.name]: Textarea
    },
    ...config
  });
};


describe('dj-form', () => {
  it('props属性 - 测试labelWidth', () => {
    const wrapper = mount({
      components: {
        'dj-form': Form,
        'dj-form-item': FormItem,
        'dj-input': Input
      },
      template: `
        <dj-form ref="form" :model="form" labelwidth="80px">
          <dj-form-item label="Activity Name">
            <dj-input v-model="form.name"></dj-input>
          </dj-form-item>
        </dj-form>
      `,
      data() {
        return {
          form: {
            name: ''
          }
        };
      }
    });
    expect(findStyle(wrapper, '.dj-form-item_label').width).toBe('80px');
  });

  it('Methods方法 - 相关方法返回', async() => {
    const wrapper = mountForm({
      template: `
        <dj-form ref="formValidate" v-model="form" :rules="rules" :disabled="disabled" :checkPopover="false">
          <dj-form-item label="name" field="name">
            <dj-input v-model="form.name"></dj-input>
          </dj-form-item>
          <dj-form-item label="address" field="address">
            <dj-input v-model="form.address"></dj-input>
          </dj-form-item>
          <dj-form-item label="type" field="type">
            <dj-checkbox-group v-model="form.type">
              <dj-checkbox :code="1">桃子</dj-checkbox>
              <dj-checkbox :code="2">葡萄</dj-checkbox>
              <dj-checkbox :code="3">西瓜</dj-checkbox>
              <dj-checkbox :code="4">芒果</dj-checkbox>
            </dj-checkbox-group>
          </dj-form-item>
        </dj-form>
      `,
      data() {
        return {
          disabled: false,
          form: {
            name: '1',
            address: '',
            type: []
          },
          rules: {
            name: [
              { type: 'empty' }
            ],
            address: [
              { type: 'empty' }
            ],
            type: [
              { type: 'empty' }
            ]
          }
        };
      },
      methods: {
      }
    });
    const formVM = wrapper.findComponent({ ref: 'formValidate' }).vm;
    await formVM.validate((valid) => {
      if (!valid) {
        return false;
      }
    });
    await nextTick();
    expect(formVM.exportErrorMsg).toHaveLength(2);
    const formItemLabelWraps = findAllUtil(wrapper, formVM.checkPopover ? '.dj-form-item-info' : '.dj-form-item-infoB .error');
    expect(formItemLabelWraps).toHaveLength(2);
    expect(formVM.getErrorMsg()).toHaveLength(2);
    await nextTick();
    formVM.resetValidate();
    expect(formVM.getErrorMsg()).toHaveLength(0);
  });

  it('功能 - 测试表单重置 reset', async() => {
    const wrapper = mountForm({
      template: `
        <dj-form ref="formReset" v-model="form" :rules="rules"  :checkPopover="false">
          <dj-form-item label="name" field="name">
            <dj-input v-model="form.name"></dj-input>
          </dj-form-item>
          <dj-form-item label="address" field="address">
            <dj-input v-model="form.address"></dj-input>
          </dj-form-item>
          <dj-form-item label="type" field="type">
            <dj-checkbox-group v-model="form.type">
              <dj-checkbox :code="1">桃子</dj-checkbox>
              <dj-checkbox :code="2">葡萄</dj-checkbox>
              <dj-checkbox :code="3">西瓜</dj-checkbox>
              <dj-checkbox :code="4">芒果</dj-checkbox>
            </dj-checkbox-group>
          </dj-form-item>
        </dj-form>
      `,
      data() {
        return {
          form: {
            name: '',
            address: '',
            type: []
          },
          rules: {
            name: [
              { type: 'empty' }
            ],
            address: [
              { type: 'empty' }
            ],
            type: [
              { type: 'empty' }
            ]
          }
        };
      },
      methods: {
        setValue(){
          const _this = this;
          _this.form.name = 'haha';
          _this.form.address = 'aaaa';
          _this.form.type.push(1);
        }
      }
    });
    const vm = wrapper.vm;
    vm.setValue();
    expect(vm.form.name).toBe('haha');
    const formVM = wrapper.findComponent({ ref: 'formReset' }).vm;
    formVM.reset();
    await nextTick();
    expect(vm.form.name).toBe('');
    expect(vm.form.address).toBe('');
    expect(vm.form.type).toHaveLength(0);
  });


  it('功能 - 基础表单校验 validate', async() => {
    const wrapper = mountForm({
      template: `
        <dj-form ref="formValidate" v-model="form" :rules="rules" :disabled="disabled" :checkPopover="false">
          <dj-form-item label="name" field="name">
            <dj-input v-model="form.name"></dj-input>
          </dj-form-item>
          <dj-form-item label="address" field="address">
            <dj-input v-model="form.address"></dj-input>
          </dj-form-item>
          <dj-form-item label="type" field="type">
            <dj-checkbox-group v-model="form.type">
              <dj-checkbox :code="1">桃子</dj-checkbox>
              <dj-checkbox :code="2">葡萄</dj-checkbox>
              <dj-checkbox :code="3">西瓜</dj-checkbox>
              <dj-checkbox :code="4">芒果</dj-checkbox>
            </dj-checkbox-group>
          </dj-form-item>
        </dj-form>
      `,
      data() {
        return {
          disabled: false,
          form: {
            name: '',
            address: '',
            type: []
          },
          rules: {
            name: [
              { type: 'empty' }
            ],
            address: [
              { type: 'empty' }
            ],
            type: [
              { type: 'empty' }
            ]
          }
        };
      },
      mounted() {
        this.disabled = true;
      },
      methods: {
      }
    });
    const formVM = wrapper.findComponent({ ref: 'formValidate' }).vm;
    await formVM.validate((valid) => {
      if (!valid) {
        return false;
      }
    });
    await nextTick();
    const formItemLabelWraps = findAllUtil(wrapper,
      '.dj-form-item-infoB .error'
    );
    expect(formVM.exportErrorMsg).toHaveLength(3);
    expect(formItemLabelWraps).toHaveLength(3);
  });

  it('功能 - 表单自定义校验 validate', async() => {
    const wrapper = mountForm({
      template: `
        <dj-form ref="formValidate" v-model="form" :rules="rules" :disabled="disabled" :checkPopover="false">
          <dj-form-item label="name" field="name">
            <dj-input v-model="form.name"></dj-input>
          </dj-form-item>
          <dj-form-item label="activity" field="activity">
            <dj-input v-model="form.activity"></dj-input>
          </dj-form-item>
          <dj-form-item label="phone" field="phone">
            <dj-input v-model="form.phone"></dj-input>
          </dj-form-item>
          <dj-form-item label="old" field="old">
            <dj-input v-model="form.old"></dj-input>
          </dj-form-item>
          <dj-form-item label="address" field="address">
            <dj-input v-model="form.address"></dj-input>
          </dj-form-item>
          <dj-form-item label="type" field="type">
            <dj-checkbox-group v-model="form.type">
              <dj-checkbox :code="1">桃子</dj-checkbox>
              <dj-checkbox :code="2">葡萄</dj-checkbox>
              <dj-checkbox :code="3">西瓜</dj-checkbox>
              <dj-checkbox :code="4">芒果</dj-checkbox>
            </dj-checkbox-group>
          </dj-form-item>
        </dj-form>
      `,
      data() {
        return {
          disabled: false,
          form: {
            name: '',
            address: '',
            phone: '18301198373',
            old: '',
            type: []
          },
          rules: {
            name: [{
              type: 'validator',
              validator: (val) => {
                if (val) {
                  return true;
                }
                return '校验失败';
              }
            }],
            activity: [{ type: 'empty' }, { type: 'range', min: 5, max: 10 }],
            phone: [{ type: 'empty' }, { type: 'type', is: 'phone' }],
            old: [{ type: 'regExp', regExp: /^-?\d+$/ }],
            address: [{ type: 'empty' }],
            type: [{ type: 'empty' }]
          }
        };
      },
      mounted() {
        this.disabled = true;
      },
      methods: {
      }
    });
    const formVM = wrapper.findComponent({ ref: 'formValidate' }).vm;
    await formVM.validate((valid) => {
      if (!valid) {
        return false;
      }
    });
    await nextTick();
    const formItemLabelWraps = findAllUtil(wrapper,
      '.dj-form-item-infoB .error'
    );
    expect(formVM.exportErrorMsg).toHaveLength(4);
    expect(formItemLabelWraps).toHaveLength(4);
  });

  it('功能 - 表单自定义校验 type', async() => {
    const wrapper = mountForm({
      template: `
        <dj-form ref="formValidate" v-model="form" :rules="rules" :disabled="disabled" :checkPopover="false">
          <dj-form-item label="name" field="name">
            <dj-input v-model="form.name"></dj-input>
          </dj-form-item>
          <dj-form-item label="activity" field="activity">
            <dj-input v-model="form.activity"></dj-input>
          </dj-form-item>
          <dj-form-item label="phone" field="phone">
            <dj-input v-model="form.phone"></dj-input>
          </dj-form-item>
          <dj-form-item label="email" field="email">
            <dj-input v-model="form.email"></dj-input>
          </dj-form-item>
          <dj-form-item label="url" field="url">
            <dj-input v-model="form.url"></dj-input>
          </dj-form-item>
          <dj-form-item label="type" field="type">
            <dj-checkbox-group v-model="form.type">
              <dj-checkbox :code="1">桃子</dj-checkbox>
              <dj-checkbox :code="2">葡萄</dj-checkbox>
              <dj-checkbox :code="3">西瓜</dj-checkbox>
              <dj-checkbox :code="4">芒果</dj-checkbox>
            </dj-checkbox-group>
          </dj-form-item>
        </dj-form>
      `,
      data() {
        return {
          disabled: false,
          form: {
            name: '',
            url: '',
            phone: '18301198373',
            email: 'aaa',
            type: []
          },
          rules: {
            name: [{ type: 'empty' }],
            activity: [{ type: 'type', is: 'string' }],
            phone: [{ type: 'empty' },{ type: 'type', is: 'phone' }],
            email: [{ type: 'empty' },{ type: 'type', is: 'email' }],
            url: [{ type: 'type', is: 'url' }],
            type: [{ type: 'empty' }]
          }
        };
      },
      mounted() {
        this.disabled = true;
      },
      methods: {
      }
    });
    const formVM = wrapper.findComponent({ ref: 'formValidate' }).vm;
    await formVM.validate((valid) => {
      if (!valid) {
        return false;
      }
    });
    await nextTick();
    const formItemLabelWraps = findAllUtil(wrapper,
      '.dj-form-item-infoB .error'
    );
    expect(formVM.exportErrorMsg).toHaveLength(4);
    expect(formItemLabelWraps).toHaveLength(4);
  });

  test('功能 - 动态表单', done => {
    const wrapper = mountForm({
      template: `
        <dj-form ref="ruleFormRef" v-model="form" :rules="rules"  :checkPopover="false">
          <dj-form-item  label="活动描述" v-for="(item, index) in form.timeList" :form="item" :key="index" :rule="[{type: 'validator', validator: (val, form) => {return form.activityName !== ''}}]"  fields="activityName">
              <dj-input v-model="item.activityName"/>
          </dj-form-item>
          <dj-form-item label="活动描述1" :empty="false">
            <dj-tab v-model="activeTab">
              <dj-tab-pane v-for="tab in tabs" :label="tab.label" :name="tab.name" :key="tab.label">
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
            <dj-button type="primary"  @click="submit(ruleFormRef)">保存</dj-button>
            <div class="spacing"></div>
            <dj-button  @click="reset(ruleFormRef)">重置</dj-button>
            <div class="spacing"></div>
            <dj-button  @click="addTime()">addFormItem</dj-button>
            <div class="spacing"></div>
            <dj-button  @click="addTab()">addTab</dj-button>
          </dj-form-item>
        </dj-form>
      `,
      data() {
        return {
          form: {
            timeList: [
              {
                activityName: ''
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
      mounted() {
        this.addTab();
      },
      methods: {
        addTab() {
          const _this = this;
          const tab = 'tab' + (_this.tabs.length + 1);
          _this.tabs.push({ label: tab, name: tab, form: {id: '1', name: tab}});
        },
        addTime() {
          const _this = this;
          _this.form.timeList.push({ activityName: '' });
        }
      }
    });
    const vm = wrapper.vm;
    const formVM = wrapper.findComponent({ ref: 'ruleFormRef' }).vm;
    setTimeout(() => {
      vm.addTab();
      vm.addTime();
      expect(vm.tabs[1].label).toBe('tab2');
      expect(vm.form.timeList).toHaveLength(2);
      setTimeout(() => {
        formVM.validate();
        setTimeout(() => {
          const formItemLabelWraps = findAllUtil(wrapper,'.dj-form-item-infoB .error');
          expect(formVM.exportErrorMsg).toHaveLength(2);
          expect(vm.tabs).toHaveLength(2);
          expect(vm.form.timeList).toHaveLength(2);
          expect(formItemLabelWraps).toHaveLength(2);
          done();
        }, 0);
      }, 0);
    }, 0);
    expect(vm.tabs).toEqual([{ label: 'tab1', name: 'tab1', form: { id: '1', name: 'tab1' } }]);
  });

  it('DOM - 行内表单样式 inline', async() => {
    const wrapper = mountForm({
      template: `
        <dj-form ref="formInline" v-model="form" :rules="rules" inline  :checkPopover="false">
          <dj-form-item label="活动名称" field="activityName">
            <dj-input v-model="form.activityName" placeholder="请输入文本..."></dj-input>
          </dj-form-item>
          <dj-form-item label="活动编号" field="activityCode">
            <dj-input v-model="form.activityCode" placeholder="请输入文本..."/>
          </dj-form-item>
          <dj-form-item label="" :view="false">
            <dj-button type="primary" >保存</dj-button>
          </dj-form-item>
        </dj-form>
      `,
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
              validator: function(val) {
                if (val) {
                  return true;
                }
                return '校验失败';
              }
            }]
          }
        };
      }
    });
    const formInlineItme = findAllUtil(wrapper,
      '.dj-form.dj-form-inline .dj-form-item'
    );
    expect(formInlineItme).toHaveLength(3);
  });

  it('DOM - 混合行内表单样式 inline', () => {
    const wrapper = mountForm({
      template: `
        <dj-form ref="formInline" v-model="form" :checkPopover="false">
          <dj-form-item label="活动名称" field="activityName" inline>
            <dj-input v-model="form.activityName" placeholder="请输入文本..."></dj-input>
          </dj-form-item>
          <dj-form-item label="活动编号" field="activityCode" inline>
            <dj-input v-model="form.activityCode" placeholder="请输入文本..."/>
          </dj-form-item>
          <dj-form-item label="" :view="false">
            <dj-button type="primary" >保存</dj-button>
          </dj-form-item>
        </dj-form>
      `,
      data() {
        return {
          form: {
            activityName: 0,
            activityCode: ''
          }
        };
      }
    });
    const formInlineItme = findAllUtil(wrapper,
      '.dj-form .dj-form-item.dj-form-item-inline'
    );
    expect(formInlineItme).toHaveLength(2);
  });

  it('BUG场景 - formitem使用v-if切换时组件未展示', async done => {
    const wrapper = mountForm({
      template: `
        <dj-form ref="formInline" v-model="form">
          <dj-form-item label="类型" field="brand" inline>
            <dj-radio-group v-model="form.brand" class="cccc">
              <dj-radio :code="0">按UPC（苹果）</dj-radio>
              <dj-radio :code="1">按价格（非苹果）</dj-radio>
            </dj-radio-group>
          </dj-form-item>
          <dj-form-item v-if="form.brand === 0" label="" field="upc" class="upcDom">
            <dj-textarea v-model="form.upc" placeholder="请输入UPC..." />
          </dj-form-item>
          <dj-form-item v-if="form.brand === 1" label="" field="min"  class="inputDom">
            <dj-input v-model="form.min" type="number" after="元" placeholder="0" style="width: 100px;" />
            <dj-input v-model="form.max" type="number" after="元" placeholder="0" style="width: 100px;"/>
          </dj-form-item>
          <dj-form-item label="" :view="false">
            <dj-button type="primary" >保存</dj-button>
          </dj-form-item>
        </dj-form>
      `,
      data() {
        return {
          form: {
            brand: '',
            upc: '',
            min: '',
            max: '',
            activityName: 0,
            activityCode: ''
          }
        };
      },
      methods: {
        setValue(){
          const _this = this;
          _this.form.brand = 0;
          setTimeout(() => {
            _this.form.upc = 'haha';
            setTimeout(() => {
              _this.form.brand = 1;
            }, 200);
          }, 1000);
        }
      }
    })
    const vm = wrapper.vm;
    expect(vm.form.brand).toBe('');
    expect(wrapper.find('.dj-textarea').exists()).toBe(false);
    expect(wrapper.find('.dj-input').exists()).toBe(false);
    vm.setValue();
    await nextTick();
    expect(vm.form.brand).toBe(0);
    expect(wrapper.find('.dj-textarea').exists()).toBe(true);
    expect(wrapper.find('.dj-input').exists()).toBe(false);
    setTimeout(() => {
      expect(vm.form.upc).toBe('haha');
      setTimeout(() => {
        expect(vm.form.brand).toBe(1);
        expect(wrapper.find('.dj-textarea').exists()).toBe(false);
        expect(wrapper.find('.dj-input').exists()).toBe(true);
        done();
      }, 200);
    }, 1000);
  });
});
