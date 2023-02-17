import Component from './src/imageMask';

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
};

export default Component;
