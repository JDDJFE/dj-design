import Component from './src/tag.vue';

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
};

export default Component;
