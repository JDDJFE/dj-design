import Vue from 'vue';

const isServer = Vue.prototype.$isServer;

const trim = function(string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};
const fragment = function(html) {
  var nodes, divTemp = document.createElement('div'),
    fragment = document.createDocumentFragment();
  divTemp.innerHTML = html;
  // 此时div.childNodes就是我们需要的节点了
  nodes = divTemp.childNodes;
  for (var i = 0, length = nodes.length; i < length; i += 1) {
    // 容器fragment加载克隆的节点 - 克隆的作用是保证nodes的完整
    fragment.appendChild(nodes[i].cloneNode(true));
  }
  // 据说下面这样子世界会更清净
  nodes = null;
  divTemp = null;
  return fragment;
};

export const on = (function() {
  if (!isServer && document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  }
  return function(element, event, handler) {
    if (element && event && handler) {
      element.attachEvent('on' + event, handler);
    }
  };

})();

export const off = (function() {
  if (!isServer && document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  }
  return function(element, event, handler) {
    if (element && event) {
      element.detachEvent('on' + event, handler);
    }
  };

})();

export const once = function(el, event, fn) {
  var listener = function() {
    if (fn) {
      fn.apply(this, arguments);
    }
    off(el, event, listener);
  };
  on(el, event, listener);
};

export function appendChild(el, childs) {
  if (!el || !childs) return false;
  if (typeof childs === 'string') {
    var fragments = fragment(childs);
    el.appendChild(fragments);
    fragments = null;
  } else if (Array.isArray(childs)) {
    childs.forEach(child => {
      el.appendChild(child);
    });
  } else {
    el.appendChild(childs);
  }
}

export function removeChild(el, childs) {
  if (!el || !childs) return false;
  if (Array.isArray(childs) || Object.prototype.toString.call(childs) == '[object NodeList]') {
    childs.forEach(child => {
      el.removeChild(child);
    });
  } else {
    el.removeChild(childs);
  }
}

export function hasClass(el, cls) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  }
  return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;

}

export function addClass(el, cls) {
  if (!el) return;
  var curClass = el.className;
  var classes = (cls || '').split(' ');

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

export function removeClass(el, cls) {
  if (!el || !cls) return;
  var classes = cls.split(' ');
  var curClass = ' ' + el.className + ' ';

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ');
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
}
