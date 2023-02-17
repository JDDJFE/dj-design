import Component from './src/textarea.vue';

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
};

export default Component;
