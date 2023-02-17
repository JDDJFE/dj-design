import Component from './src/checkbox.vue';

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
};

export default Component;
