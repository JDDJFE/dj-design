import Component from './src/col.vue';

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
};

export default Component;
