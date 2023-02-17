import Component from './src/switch.vue';

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
};

export default Component;
