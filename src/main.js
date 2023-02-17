import Vue from 'vue';
import App from './App.vue';
import router from './router';
import page from '../packages';
import 'highlight.js/styles/github.css';
import 'github-markdown-css';
import less from 'less';
Vue.use(less);
Vue.use(page);

Vue.config.productionTip = false;
Vue.prototype.$remove = function(from, todo) {
  if (!from || !Array.isArray(from)) {
    return from;
  }
  if (Array.isArray(todo)) {
    todo.forEach(item => {
      let index = from.findIndex(obj => obj === item);
      if (index == -1) {
        index = from.findIndex(obj => JSON.stringify(obj) == JSON.stringify(item));
      }
      if (index > -1) {
        from.splice(index, 1);
      }
    });
  } else {
    let index = from.findIndex(obj => obj === todo);
    if (index == -1) {
      index = from.findIndex(obj => JSON.stringify(obj) == JSON.stringify(todo));
    }
    if (index > -1) {
      from.splice(index, 1);
    }
  }
};
Vue.prototype.$copy = function(from) {
  if (Object.prototype.toString.call(from) == '[object Object]') {
    let todo = {};
    Object.keys(from).forEach(key => {
      todo[key] = this.$copy(from[key]);
    });
    return todo;
  } else if (Object.prototype.toString.call(from) == '[object Array]') {
    let todo = [];
    from.forEach(item => {
      todo.push(this.$copy(item));
    });
    return todo;
  }
  return from;
};

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

