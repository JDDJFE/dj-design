export default {
  title: 'colorPicker 颜色选择器',
  describe: '',
  templates: [
    {
      title: '基础用法',
      template: '<dj-color-picker v-model="color" placeholder="请输入或选择颜色"/>',
      data: {
        data() {
          return {
            color: ''
          };
        },
        methods: {
        }
      }
    },
    {
      title: '单纯色块',
      template: '<dj-color-picker v-model="color" placeholder="请输入或选择颜色" :showInput="false"/>',
      data: {
        data() {
          return {
            color: ''
          };
        },
        methods: {
        }
      }
    },
    {
      title: 'readonly',
      template: '<dj-color-picker v-model="color" readonly/><dj-color-picker v-model="color" readonly  class="error"/>',
      data: {
        data() {
          return {
            color: ''
          };
        },
        methods: {
        }
      }
    },
    {
      title: 'disabled',
      template: '<dj-color-picker v-model="color" disabled/>',
      data: {
        data() {
          return {
            color: ''
          };
        },
        methods: {
        }
      }
    },
    {
      title: '尺寸',
      template: `<dj-color-picker v-model="color" size="mini"/>
      <dj-color-picker v-model="color" size="tiny"/>
      <dj-color-picker v-model="color" size="small"/>
      <dj-color-picker v-model="color" size="large"/>`,
      data: {
        data() {
          return {
            color: ''
          };
        },
        methods: {
        }
      }
    }
  ]
};
