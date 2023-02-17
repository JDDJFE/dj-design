import Component from './src/cascader.vue';

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
};

export default Component;
