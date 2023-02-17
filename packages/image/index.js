import Component from './src/image';

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
};

export default Component;
