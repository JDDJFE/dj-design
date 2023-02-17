import Vue from 'vue';
import main from './loader.vue';

const Constructor = Vue.extend(main);

const Loading = function(type, params) {
  let newMessage = new Constructor();
  let vm = newMessage.$mount();
  vm[type](params);
};

['show', 'hide', 'close'].forEach(type => {
  Loading[type] = params => {
    return new Loading(type, params);
  };
});

export default Loading;
