import Vue from 'vue';

// 控制连点
const pointDoms = [];
Vue.directive('points', {
  inserted(el, binding) {
    pointDoms.push(el);
    el.addEventListener('click', () => {
      pointDoms.forEach(pointItem => {
        pointItem.style.pointerEvents = 'none';
      });
      setTimeout(() => {
        pointDoms.forEach(pointItem => {
          pointItem.style.pointerEvents = 'auto';
        });
      }, binding.value || 350);
    });
  }
});

Vue.directive('visible', (el, binding) => {
  el.style.visibility = !!binding.value ? 'visible' : 'hidden';
});
// Vue.directive('onlyNumber', {
//   bind: function(el, binding, vnode) {
//     if (el.tagName != 'INPUT') {
//       el = el.getElementsByTagName('input');
//       if (el.length > 0) {
//         el = el[0];
//       }
//     }
//     el.handler = () => {
//       let handler = () => {
//         if (!isNaN(el.value)) {
//           return true;
//         }
//         // 解决v-model 引起无效的问题
//         let expression;
//         // 判断是否支持负数true支持false不支持
//         let isNegative = false;
//         // 支持其它类型字符
//         let extra = '';
//         if (binding.value) {
//           expression = binding.value.expression;
//           isNegative = binding.value.isNegative || false;
//           extra = binding.value.extra ? ` || ${binding.value.extra}` : '';
//         }
//         if (isNegative && !isNaN(el.value.replace('-', '')) && el.value.indexOf('-') == 0) {
//           return true;
//         }
//         if (extra && !isNaN(el.value.replace(new RegExp(extra, 'g'), ''))) {
//           return true;
//         }
//         let regexp = new RegExp('[^\\d' + (isNegative ? ' || -' : '') + extra + ']', 'g');
//         el.value = el.value.replace(regexp, '').replace(/\s+/g, '');// regexp=   /[^\d || -]/g
//         if (el.value.indexOf('-') == 0 && isNegative) {
//           el.value = el.value.replace(/-/g, '');
//           el.value = '-' + el.value;
//         } else {
//           el.value = el.value.replace(/-/g, '');
//         }
//         if (vnode.componentInstance) {
//           vnode.componentInstance.$emit('input', el.value);
//         } else {
//           vnode.elm.dispatchEvent(new CustomEvent('input'));
//         }
//         // let event = new Event("input1");
//         // el.dispatchEvent(event);
//         if (expression) {
//           if (expression.indexOf('.') > -1 || expression.indexOf('[') > -1) {
//             let expressions = [];
//             expression.split('.').forEach(item => {
//               if (item.indexOf('[') > -1) {
//                 item.split('[').forEach(item1 => {
//                   expressions.push(item1.replace(']', ''));
//                 });
//               } else {
//                 expressions.push(item);
//               }
//             });
//             let context = vnode.context;
//             expressions.forEach(item => {
//               if (typeof context[item] != 'object') {
//                 context[item] = el.value;
//               }
//               context = context[item];
//             });
//           } else {
//             vnode.context[expression] = el.value;
//           }
//         }
//       };
//       handler();
//       // setTimeout(() => {
//       // 	handler();
//       // }, 0);
//     };
//     el.addEventListener('input', el.handler);
//   },
//   unbind: function(el) {
//     if (el.tagName != 'INPUT') {
//       el = el.getElementsByTagName('input');
//     }
//     el.removeEventListener('input', el.handler);
//   }
// });
// Vue.directive('min', {
//   bind: function(el, binding, vnode) {
//     el = el.nodeName == 'INPUT' ? el : el.children[0];
//     el.handler = () => {
//       let handler = () => {
//         let expression;
//         let min = 0;
//         if (binding.value) {
//           min = binding.value.value || 0;
//           expression = binding.value.expression;
//         }
//         el.value = el.value < min ? min : el.value;
//         // 解决v-model 引起无效的问题
//         if (expression) {
//           if (expression.indexOf('.') > -1 || expression.indexOf('[') > -1) {
//             let expressions = [];
//             expression.split('.').forEach(item => {
//               if (item.indexOf('[') > -1) {
//                 item.split('[').forEach(item1 => {
//                   expressions.push(item1.replace(']', ''));
//                 });
//               } else {
//                 expressions.push(item);
//               }
//             });
//             let context = vnode.context;
//             expressions.forEach(item => {
//               if (typeof context[item] != 'object') {
//                 context[item] = el.value;
//               }
//               context = context[item];
//             });
//           } else {
//             vnode.context[expression] = el.value;
//           }
//         }
//       };
//       handler();
//       setTimeout(() => {
//         handler();
//       }, 0);
//     };
//     el.addEventListener('input', el.handler);
//   },
//   unbind: function(el) {
//     if (el.tagName != 'INPUT') {
//       el = el.getElementsByTagName('input');
//     }
//     el.removeEventListener('input', el.handler);
//   }
// });
// Vue.directive('max', {
//   bind: function(el, binding, vnode) {
//     el = el.nodeName == 'INPUT' ? el : el.children[0];
//     el.handler = () => {
//       let handler = () => {
//         let expression;
//         let max = 0;
//         if (binding.value) {
//           max = binding.value.value || 0;
//           expression = binding.value.expression;
//         }
//         el.value = el.value > max ? max : el.value;
//         // 解决v-model 引起无效的问题
//         if (expression) {
//           if (expression.indexOf('.') > -1 || expression.indexOf('[') > -1) {
//             let expressions = [];
//             expression.split('.').forEach(item => {
//               if (item.indexOf('[') > -1) {
//                 item.split('[').forEach(item1 => {
//                   expressions.push(item1.replace(']', ''));
//                 });
//               } else {
//                 expressions.push(item);
//               }
//             });
//             let context = vnode.context;
//             expressions.forEach(item => {
//               if (typeof context[item] != 'object') {
//                 context[item] = el.value;
//               }
//               context = context[item];
//             });
//           } else {
//             vnode.context[expression] = el.value;
//           }
//         }
//       };
//       handler();
//       setTimeout(() => {
//         handler();
//       }, 0);
//     };
//     el.addEventListener('input', el.handler);
//   },
//   unbind: function(el) {
//     if (el.tagName != 'INPUT') {
//       el = el.getElementsByTagName('input');
//     }
//     el.removeEventListener('input', el.handler);
//   }
// });
// Vue.directive('fixed', {
//   bind: function(el, binding, vnode) {
//     if (el.tagName != 'INPUT') {
//       el = el.getElementsByTagName('input');
//       if (el.length > 0) {
//         el = el[0];
//       }
//     }
//     el.handler = () => {
//       let handler = () => {
//         let fixed = 0;
//         let expression;
//         if (binding.value) {
//           fixed = binding.value.fixed || 0;
//           expression = binding.value.expression;
//         }
//         el.value = el.value.replace(/[^\d || .]/g, '').replace(/\s+/g, '');
//         let list = el.value.split('.');
//         if (list.length > 2) {
//           el.value = list[0] + '.' + list[1];
//         }
//         if (list.length > 1) {
//           el.value = list[0] + '.' + list[1].toString().substring(0, fixed);
//         }
//         if (el.value == '.') {
//           el.value = '';
//         }
//         // 解决v-model 引起无效的问题
//         if (expression) {
//           if (expression.indexOf('.') > -1 || expression.indexOf('[') > -1) {
//             let expressions = [];
//             expression.split('.').forEach(item => {
//               if (item.indexOf('[') > -1) {
//                 item.split('[').forEach(item1 => {
//                   expressions.push(item1.replace(']', ''));
//                 });
//               } else {
//                 expressions.push(item);
//               }
//             });
//             let context = vnode.context;
//             expressions.forEach(item => {
//               // console.log(item, context);
//               if (typeof context[item] != 'object') {
//                 context[item] = el.value;
//               }
//               context = context[item];
//             });
//           } else {
//             vnode.context[expression] = el.value;
//           }
//         }
//       };
//       handler();
//       setTimeout(() => {
//         handler();
//       }, 0);
//     };
//     el.addEventListener('input', el.handler);
//     el.addEventListener('blur', () => {
//       if (el.value != '' && el.value.indexOf('.') == el.value.length - 1) {
//         el.value = el.value + '0';
//         el.handler();
//       }
//     });
//   }
// });

Vue.directive('byteLength', {
  bind: function(el, binding, vnode) {
    let typing = false;
    if (el.tagName != 'INPUT' && el.tagName != 'TEXTAREA') {
      return false;
    }
    let length;
    if (binding.value) {
      length = binding.value.length || 0;
      if (!length || length <= 0) {
        return false;
      }
      // expression = binding.value.expression;
    } else {
      return false;
    }
    el.handler = () => {
      // if(el.value.length )
      if (el.getAttribute('v-isFull') && el.value.length >= el.getAttribute('v-isFull').length) {
        el.value = el.getAttribute('v-isFull');
        // setTimeout(() => {
        el.dispatchEvent(new CustomEvent('input'));
        // }, 1000);
        return false;
      }
      el.setAttribute('v-isFull', '');
      let handler = () => {
        let elValueLength = 0;
        let elValue = '';
        for (var i = 0; i < el.value.length; i++) {
          // eslint-disable-next-line no-control-regex
          if (el.value[i].match(new RegExp('[^\x00-\xff]', 'ig'))) {
            elValueLength += 2;
          } else {
            elValueLength += 1;
          }
          if (elValueLength <= length) {
            elValue += el.value[i];
          } else {
            break;
          }
        }
        // console.log(el.tagName, elValue);
        el.value = elValue;
        if (elValueLength >= length) {
          el.setAttribute('v-isFull', el.value);
          if (vnode.componentInstance) {
            vnode.componentInstance.$emit('input', el.value);
          } else {
            vnode.elm.dispatchEvent(new CustomEvent('input'));
          }
        }
      };
      handler();
      // setTimeout(() => {
      //   handler();
      // }, 0);
    };
    el.addEventListener('input', (e) => {
      setTimeout(() => {
        if (typing)
          return;
        el.handler(e.data);
      }, 0);
    });
    el.addEventListener('compositionstart', () => {
      typing = true;
    });
    el.addEventListener('compositionend', () => {
      typing = false;
    });
  }
});
