import Component from './src/tab.vue';

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
};

export default Component;
