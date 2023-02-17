import Component from './src/imagePreview';

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
};

export default Component;
