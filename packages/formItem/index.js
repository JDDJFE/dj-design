import Component from './src/formItem.vue';

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
};

export default Component;
