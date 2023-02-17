
import input from '../src/input.vue';
import { shallowMount } from '@vue/test-utils'; // docs: https://v1.test-utils.vuejs.org/zh/api

describe('dj-input', () => {

  // 测试1：测试 input 组件是否生成的是预期的文本框
  test('input-text', () => {
    const wrapper = shallowMount(input);
    const inputRef = wrapper.findComponent({ ref: 'input' });
    expect(inputRef.html()).toContain('input autocomplete="on" type="text" class=""');
  });

  // 测试2：测试密码文本框
  test('input-password', () => {
    const wrapper = shallowMount(input, {
      propsData: {
        type: 'password'
      }
    });
    const inputRef = wrapper.findComponent({ ref: 'input' });
    expect(inputRef.html()).toContain('input autocomplete="on" type="password" class=""');
  });

  // 测试3：测试组件状态（value值）
  test('input-value', () => {
    const wrapper = shallowMount(input, {
      propsData: {
        type: 'password',
        value: 'admin'
      }
    });
    expect(wrapper.props('value')).toBe('admin');
  });

  // 测试4: 测试双向绑定
  test('input-model-value', async() => {
    const wrapper = shallowMount(input);
    const inputRef = wrapper.findComponent({ ref: 'input' });
    await inputRef.setValue('admin666');
    expect(inputRef.element.value).toBe('admin666');
  });

  // 测试4：快照对比
  // test('input-snapshot', () => {
  //   const wrapper = mount(input, {
  //     propsData: {
  //       type: 'password',
  //       value: 'admin'
  //     }
  //   });

  // 首次执行该测试，会在当前test.js所在目录创建 __snapshots__ 目录
  // 目录中存放的就是快照文件 input.test.js.snap
  // 当前测试用例存储的快照内容是组件实例的 DOM

  // 之后再执行该测试，就会用 expect 传入的值，对比快照文件中的内容
  // 如果一样，测试成功，如果不一样，测试失败
  // 可以修改 propsData 的参数查看对比结果
  // 重新生成快照： `yarn jest -u`
  //   expect(wrapper.vm.$el).toMatchSnapshot();
  // });

});

