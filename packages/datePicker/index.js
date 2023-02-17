import Component from './src/picker.vue';

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
};

export default Component;
