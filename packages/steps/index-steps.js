import Component from './src/steps.vue';

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
};

export default Component;
