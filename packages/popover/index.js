import Component from './src/popover.vue';

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
};

export default Component;
