/* eslint-disable new-cap */
const defaults = {
  visible: false,
  title: null,
  message: '',
  beforeClose: null,
  canceltext: '取消',
  oktext: '确定',
  cancelButtonShow: true,
  vnode: false,
  background: 'black',
  closable: false,
  showclose: true,
  size: 'mini',
  loading: false,
  disabled: false,
  type: null,
  className: ''
};

import Vue from 'vue';
import msgboxVue from './messageBox.vue';

const MessageBoxConstructor = Vue.extend(msgboxVue);

let instance;
let msgVms = []; // 实例组

// 监听数组变化
let watchProxy = new Proxy({}, {
  set(target, key, value) {
    // target[key] = value;
    MessageBoxConstructor.proxyBack(value);
    return true;
  }
});

const createMsg = () => {
  msgVms.splice(0, 1);
  setTimeout(() => {
    MessageBoxConstructor.vmProxyBack();
  });
};

const showNextMsg = (currentMsg) => {
  instance = new MessageBoxConstructor();
  instance.callback = () => {};
  instance.createMsg = createMsg;
  if (!instance.visible) {
    let options = currentMsg.options;
    for (let prop in options) {
      if (options.hasOwnProperty(prop)) {
        instance[prop] = options[prop];
      }
    }
    let vm = instance.$mount();
    msgVms.push(vm);
    watchProxy[msgVms.length - 1] = vm;
  }
};

const MessageBox = (options, callback) => {
  if (options.callback && !callback) {
    callback = options.callback;
  }
  let obj = {
    options: { ...defaults, ...options },
    callback: callback
  };
  if (document.querySelector('.dj-message-box')) {
    setTimeout(() => {
      showNextMsg(obj);
    }, 300);
  } else {
    showNextMsg(obj);
  }
};

MessageBox.alert = (message, title, callback) => {
  if (typeof title === 'object') {
    callback = title;
    title = '';
  } else if (title === void 0) {
    title = '';
  }
  return MessageBox({
    ...{
      title: title,
      message: message,
      $type: 'alert',
      cancelButtonShow: false
    }, ...callback
  });
};

MessageBox.confirm = (message, title, callback) => {
  if (typeof title === 'object') {
    callback = title;
    title = '';
  } else if (title === void 0) {
    title = '';
  }
  return MessageBox({
    ...{
      title: title,
      message: message,
      $type: 'confirm'
    }, ...callback
  });
};

MessageBox.close = () => {
  msgVms.forEach((vm) => {
    vm.doClose();
  });
};

MessageBoxConstructor.vmProxyBack = () => {
  if (!msgVms.length) return;
  if (!document.querySelector('body .dj-message-box.dj-modal-visible')) {
    let state = document.querySelector('body .dj-modal-background.dj-modal-visible');
    if (state) msgVms[0].background = '';
  }
  document.body.appendChild(msgVms[0].$el);
  Vue.nextTick(() => {
    msgVms[0].visible = true;
  });
};

MessageBoxConstructor.proxyBack = (n) => {
  let time = setTimeout(() => {
    // 拿到任务队列
    MessageBoxConstructor.vmProxyBack();
    clearTimeout(time);
  }, 0);
};
export default MessageBox;
export { MessageBox };

