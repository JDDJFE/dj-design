import Component from './src/upload.vue';

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
};

export default Component;
