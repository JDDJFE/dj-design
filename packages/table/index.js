import Component from './src/table.vue';

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
};

export default Component;
