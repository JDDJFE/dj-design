import Component from './src/json.vue';

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
};

export default Component;
