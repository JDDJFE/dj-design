import Component from './src/collapseItem.vue';

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
};

export default Component;
