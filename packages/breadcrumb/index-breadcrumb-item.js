import Component from './src/breadcrumbItem';

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
};

export default Component;
