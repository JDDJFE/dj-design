import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  base: 'old',
  routes: [
    {
      path: '/use',
      component: resolve => require(['./views/use.vue'], resolve)
    },
    // {
    //   path: '/edition',
    //   component: resolve => require(['./views/edition.vue'], resolve)
    // },
    // {
    //   path: '/grid',
    //   component: resolve => require(['../example/grid'], resolve)
    // },
    // {
    //   path: '/messageBox',
    //   component: resolve => require(['../example/messageBox/index.vue'], resolve)
    // },
    // {
    //   path: '/icon',
    //   component: resolve => require(['../example/icon'], resolve)
    // },
    // {
    //   path: '/button',
    //   component: resolve => require(['../example/button/index.vue'], resolve)
    // },
    // {
    //   path: '/radio',
    //   component: resolve => require(['../example/radio'], resolve)
    // },
    // {
    //   path: '/checkbox',
    //   component: resolve => require(['../example/checkbox/index.vue'], resolve)
    // },
    // {
    //   path: '/badge',
    //   component: resolve => require(['../example/badge'], resolve)
    // },
    // {
    //   path: '/switch',
    //   component: resolve => require(['../example/switch'], resolve)
    // },
    // {
    //   path: '/pagination',
    //   component: resolve => require(['../example/pagination'], resolve)
    // },
    // {
    //   path: '/select',
    //   component: resolve => require(['../example/select/index.vue'], resolve)
    // },
    // {
    //   path: '/tabs',
    //   component: resolve => require(['../example/tabs/index.vue'], resolve)
    // },
    // {
    //   path: '/breadcrumb',
    //   component: resolve => require(['../example/breadcrumb'], resolve)
    // },
    // {
    //   path: '/steps',
    //   component: resolve => require(['../example/steps'], resolve)
    // },
    // {
    //   path: '/tag',
    //   component: resolve => require(['../example/tag'], resolve)
    // },
    // {
    //   path: '/dropdown',
    //   component: resolve => require(['../example/dropdown/index.vue'], resolve)
    // },
    // {
    //   path: '/message',
    //   component: resolve => require(['../example/message/index.vue'], resolve)
    // },
    // {
    //   path: '/datePicker',
    //   component: resolve => require(['../example/datePicker/index.vue'], resolve)
    // },
    // {
    //   path: '/timePicker',
    //   component: resolve => require(['../example/timePicker/index.vue'], resolve)
    // },
    // {
    //   path: '/upload',
    //   component: resolve => require(['../example/upload'], resolve)
    // },
    // {
    //   path: '/link',
    //   component: resolve => require(['../example/link'], resolve)
    // },
    {
      path: '/components/:type',
      component: resolve => require(['../example'], resolve)
    },
    {
      path: '/test/:type',
      component: resolve => require(['../example'], resolve)
    }
  ]
});

router.beforeEach((to, from, next) => {
  next();
});

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
export default router;
