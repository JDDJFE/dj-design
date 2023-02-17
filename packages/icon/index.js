import Component from './src/icon.vue';

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
};

export default Component;
