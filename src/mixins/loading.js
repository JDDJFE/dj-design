import * as dom from '@/utils/dom';
import '../../packages/icon/src/svg';
const loadingTemplate = `
  <div class="loading">
    <div class="loader"><i class="iconfont load"></i>Loading</div>
  </div>`;

export default {
  methods: {
    showLoading(option = {}) {
      let el = option.el || this.$el && this.$el.querySelector && this.$el || window.document.body;
      let template = loadingTemplate;
      if (el === window.document.body) {
        template = template.replace('"loading"', '"loading" style="position: fixed;"');
      }
      if (option.white) {
        template = template.replace('loading', 'loading white');
      }
      if (el === window.document.body ? !el.querySelector('body > .loading') : !el.querySelector('.loading')) {
        dom.appendChild(el, template);
        dom.addClass(el, 'loaded');
      }
    },
    closeLoading(option = {}) {
      let el = option.el || this.$el && this.$el.querySelector && this.$el || window.document.body;
      dom.removeChild(el, el === window.document.body ? el.querySelector('body > .loading') : el.querySelector('.loading'));
      dom.removeClass(el, 'loaded');
    }
  }
};
