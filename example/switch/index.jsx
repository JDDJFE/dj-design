export default {
  title: 'Switch 开关',
  describe: '表示两种相互对立的状态间的切换，多用于触发「开/关」。',
  templates: [
    {
      title: '基础用法',
      template: `
      <dj-button @click='isEdit = !isEdit'>编辑</dj-button>
      <dj-switch v-model="open" :disabled='!isEdit'></dj-switch>
      `,
      data: {
        data() {
          return {
            open: false,
            isEdit: false
          };
        }
      }
    },
    {
      title: '定义文案',
      template: '<dj-switch v-model="open" text="开|关" @change="switchChange"></dj-switch>',
      data: {
        data() {
          return {
            open: false
          };
        },
        methods: {
          switchChange(val) {
            this.open = val;
          }
        }
      }
    },
    {
      title: '定义图标',
      template: '<dj-switch v-model="open" icon="check|close" @change="switchChange"></dj-switch>',
      data: {
        data() {
          return {
            open: false
          };
        },
        methods: {
          switchChange(val) {
            this.open = val;
          }
        }
      }
    },
    {
      title: '定义宽度',
      template: '<dj-switch v-model="open" :width=100 @change="switchChange"></dj-switch>',
      data: {
        data() {
          return {
            open: false
          };
        },
        methods: {
          switchChange(val) {
            this.open = val;
          }
        }
      }
    },
    {
      title: '禁用状态',
      template: `<dj-switch v-model="open"></dj-switch>&nbsp;&nbsp;&nbsp;
        <dj-switch :disabled="true"></dj-switch>&nbsp;&nbsp;&nbsp;   
        <dj-switch :value="false" :disabled="true"></dj-switch>`,
      data: {
        data() {
          return {
            open: false
          };
        },
        methods: {
        }
      }
    },
    {
      title: '尺寸',
      template: `<dj-switch v-model="open" size="large"></dj-switch>
        &nbsp;&nbsp;&nbsp;
        <dj-switch v-model="open" ></dj-switch>
        &nbsp;&nbsp;&nbsp;
        <dj-switch v-model="open" size="mini"></dj-switch>`,
      data: {
        data() {
          return {
            open: false
          };
        },
        methods: {
        }
      }
    }
  ]
};
