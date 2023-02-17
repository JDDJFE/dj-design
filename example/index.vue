<template>
    <div id="input">
        <p class=" f30 mb20">{{title}}</p>
        <p class="mb10">{{describe}}</p>
        <dj-code v-for="(temp, index) in templates" :key="index" :data="temp.data || {}" :index="index" v-model="temp.template" :title="temp.title" :codeShow="temp.codeShow" :info="temp.info" :type="isTest ? 'test' : 'example'"></dj-code>
        <div  class="markdown-body">
          <!-- <MarkdownItVue :content="content" :options="options"></MarkdownItVue> -->
          <doc v-if="isShow"></doc>
        </div>
    </div>
</template>

<script >
import djCode from '@/views/code/code.vue';
// import MarkdownItVue from 'markdown-it-vue';
import Vue from 'vue';

export default {
  components: {
    djCode
    // eslint-disable-next-line vue/no-unused-components
    // doc: () => import('../docs/' + this.$route.params.type + '.md')
  },
  data(){
    return {
      // options: {
      //   html: true,
      //   linkify: true,
      //   typographer: true,
      //   markdownIt: {
      //     linkify: true
      //   },
      //   linkAttributes: {
      //     attrs: {
      //       target: '_blank',
      //       rel: 'noopener'
      //     }
      //   }
      // },
      isTest: false,
      isShow: false,
      title: '',
      templates: [],
      describe: ''
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    $route: {
      handler: function(val){
        this.isTest = val.path.includes('/test');
        this.init();
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    init() {
      this.isShow = false;
      this.title = '';
      this.templates = [];
      let type = this.$route.params.type;
      let imports = this.isTest ? import('../test/' + type + '.jsx') : import('./' + type + '/index.jsx');
      imports.then(
        (component)=>{
          if (typeof component.default == 'string') {
            component.default = component.default.replace('export default ', '');
            // eslint-disable-next-line no-new-func
            component.default = new Function(`return ${component.default}`)();
          }
          this.title = component.default.title;
          this.describe = component.default.describe;
          this.templates = component.default.templates;
        }
      );
      if (!this.isTest) {
        import('../docs/'+type+'.md').then(
          (doc)=>{
            Vue.component('doc', doc.default);
            this.isShow = true;
            // const Doc = Vue.component(`doc`); // 只能查找到全局注册到组件
            // const instance = new Doc();
            // instance.$mount('.markdown-body');
          }
        );
      }
    }
  }
};
</script>
<style>
  .errorHighlight{
    background: pink;
  }
</style>
