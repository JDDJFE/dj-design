import Component from './src/badge.vue';

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
};

export default Component;
