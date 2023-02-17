import Component from './src/editor.vue';

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
};

export default Component;
