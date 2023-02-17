import Component from './src/row.vue';

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
};

export default Component;
