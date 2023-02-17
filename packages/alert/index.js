import Component from './src/alert.vue';

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
};

export default Component;
