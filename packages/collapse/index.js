import Component from './src/collapse.vue';

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
};

export default Component;
