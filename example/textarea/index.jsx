export default {
  title: 'textarea 文本域',
  describe: '',
  templates: [
    {
      title: '基础用法',
      template: '<dj-textarea v-model="desc" placeholder="请输入或选择颜色"/>',
      data: {
        data() {
          return {
            desc: ''
          };
        },
        methods: {
        }
      }
    },
    {
      title: 'readonly',
      template: '<dj-textarea v-model="desc" readonly/><dj-textarea v-model="desc" readonly  class="error dj-form"/>',
      data: {
        data() {
          return {
            desc: ''
          };
        },
        methods: {
        }
      }
    },
    {
      title: 'disabled',
      template: '<dj-textarea v-model="desc" disabled/>',
      data: {
        data() {
          return {
            desc: ''
          };
        },
        methods: {
        }
      }
    },
    {
      title: '长度限制',
      template: '<dj-textarea v-model="desc" :maxlength="10" :showmaxlength="true"/>',
      data: {
        data() {
          return {
            desc: ''
          };
        },
        methods: {
        }
      }
    },
    {
      title: '字节长度限制',
      template: '<dj-textarea v-model="desc" :bytelength="10" :showmaxlength="true"/>',
      data: {
        data() {
          return {
            desc: ''
          };
        },
        methods: {
        }
      }
    }
  ]
};
