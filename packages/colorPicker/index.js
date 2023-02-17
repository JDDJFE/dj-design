import Component from './src/colorPicker.vue';

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
};

export default Component;
