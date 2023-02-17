import Component from './src/tab-pane.vue';

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
};

export default Component;
