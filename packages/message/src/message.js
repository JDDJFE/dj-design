import Vue from 'vue';
import main from './message.vue';

const Constructor = Vue.extend(main);
const timer = 3000;
let newMessage;
let maxH = 0;
let bigInfo = {
  info: [],
  warning: [],
  success: [],
  error: []
};

const iBase = {
  id: (name) => {
    return document.getElementById(name);
  }
};

const calculationTop = () => {
  maxH = 0;
  let mArr = [];
  Array.prototype.slice.call(document.getElementsByClassName('dj-message')).forEach(ele => {
    if (!RegExp(/dj-hide-msg/).test(ele.className)) {
      mArr.push(ele);
    }
  });
  mArr.forEach((r, e) => {
    maxH += r.offsetHeight;
    let h = 30;
    for (let i = 0; i <= e; i++) {
      if (mArr[i - 1])
        h += mArr[i - 1].offsetHeight + 10;
      iBase.id(r.getAttribute('id')).style.cssText = `top: ${h}px`;
    }
  });
};


const creatDOM = (vm, obj) => {
  let idDom = iBase.id(`dj-message-${obj.type}`);
  if (idDom && !RegExp(/dj-hide-msg/).test(idDom.className)) {
    idDom.appendChild(vm.$el);
  } else {
    let dom = document.createElement('div');
    dom.style.cssText = `top: ${maxH}px`;
    dom.setAttribute('id', `dj-message-${obj.type}`);
    dom.setAttribute('class', 'dj-message');
    dom.appendChild(vm.$el);
    document.body.appendChild(dom);
    dom.addEventListener('mouseenter', () => {
      Constructor.stopTIME(obj);
    }, false);
    dom.addEventListener('mouseleave', () => {
      Constructor.openTIME(obj);
    }, false);
    if (obj.close) {
      let icon = document.createElement('i');
      icon.setAttribute('class', 'dj-message-close');
      dom.appendChild(icon);
      dom.querySelector('.dj-message-close').addEventListener('click', () => {
        Constructor.close(obj);
      }, false);
    }
  }
  calculationTop();
};

const removeDOM = (el, obj, index) => {
  let dom = iBase.id(`dj-message-${obj.type}`);
  if (!dom) return;
  let qs = dom.querySelectorAll('.dj-message-in');
  if (qs && qs.length == 1 || index == -1) {
    bigInfo[obj.type] = [];
    dom.className += ' dj-hide-msg';
    dom.id ='';
    let timer = null;
    timer = setTimeout(() => {
      document.body.removeChild(dom);
      clearTimeout(timer);
      timer = null;
    }, 300);
  } else {
    bigInfo[obj.type].splice(index, 1);
    dom.removeChild(el);
  }
  calculationTop();
};


const Message = function(val) {
  let obj = {};
  if (typeof val === 'string') {
    obj = {
      message: val,
      duration: timer
    };
  } else {
    obj = { ...obj, ...val};
    if (/^0(0+)|[^\d]+/g.test(obj.duration))
      obj.duration = timer;
  }
  newMessage = new Constructor({
    data: obj
  });
  let vm = newMessage.$mount();
  let el = vm.$el;
  creatDOM(vm, obj);
  let time = null;
  if (!!obj.duration) {
    time = setTimeout(() => {
      removeDOM(el, obj);
      newMessage.$destroy();
      vm = null;
    }, obj.duration);
  }
  bigInfo[obj.type].push({
    time, el, vm, newMessage, obj, ...{ timestamp: new Date().getTime()}
  });
};


['success', 'warning', 'info', 'error'].forEach(type => {
  Message[type] = value => {
    return new Message({
      message: value,
      type: type
    });
  };
});

Constructor.close = (obj) => {
  removeDOM(iBase.id(`dj-message-${obj.type}`), obj, -1);
};

Constructor.stopTIME = (obj) => {
  bigInfo[obj.type].forEach(el => {
    clearTimeout(el.time);
  });
};

Constructor.openTIME = (obj) => {
  let self = bigInfo[obj.type];
  self.forEach((ele, i) => {
    if (!!ele.obj.duration) {
      let time = setTimeout(() => {
        removeDOM(ele.el, ele.obj, i);
      }, ele.obj.duration);
      ele.time = time;
    }
  });
};
export default Message;
