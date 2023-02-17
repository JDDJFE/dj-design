import Component from './src/modal.vue';

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
};

export default Component;
