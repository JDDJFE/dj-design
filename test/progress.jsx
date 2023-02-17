export default {
  title: 'progress 进度条',
  describe: '',
  templates: [
    {
      info: {
        scene: '啥啥啥不好使',
        repairtime: '2021-10-09'
      },
      title: '基础用法',
      template: `<dj-table :data="tableData">
        <dj-table-column field="name" :width="100"></dj-table-column>
        <dj-table-column field="age" :width="60"></dj-table-column>
        <dj-table-column>
          <template slot-scope="scope">
            <div>
              测试：
              <dj-progress style="display: inline-block; vertical-align: center" :strokeWidth="12" textInside :percentage="percentage"></dj-progress>
            </div>
          </template>
        </dj-table-column>
      </dj-table>
      `,
      data: {
        data() {
          return {
            percentage: 0,
            tableData: [{name: 'wendy', age: 23}, {name: 'lucy', age: 19}]
          };
        },
        methods: {
          add() {
            this.percentage += 10;
            this.percentage = this.percentage < 0 ? 0 : this.percentage > 100 ? 100 : this.percentage;
          },
          minus() {
            this.percentage -= 10;
            this.percentage = this.percentage < 0 ? 0 : this.percentage > 100 ? 100 : this.percentage;
          }
        }
      }
    },
    {
      title: '自定义宽度',
      template: `<dj-progress :percentage="percentage"></dj-progress>
      <dj-progress :strokeWidth="16" status="success" :percentage="percentage" size="large"></dj-progress>
      <dj-progress :strokeWidth="30" status="exception" :percentage="percentage"></dj-progress>
      <dj-progress :strokeWidth="4" status="warning" :percentage="percentage" size="mini"></dj-progress>
      <dj-button @click="minus">-</dj-button>
      <dj-button @click="add">+</dj-button>`,
      data: {
        data() {
          return {
            percentage: 90
          };
        },
        methods: {
          add() {
            this.percentage += 10;
            this.percentage = this.percentage < 0 ? 0 : this.percentage > 100 ? 100 : this.percentage;
          },
          minus() {
            this.percentage -= 10;
            this.percentage = this.percentage < 0 ? 0 : this.percentage > 100 ? 100 : this.percentage;
          }
        }
      }
    },
    {
      title: '是否显示icon',
      template: `<dj-progress :percentage="percentage"></dj-progress>
      <dj-progress :showIcon="true" :strokeWidth="16" status="success" :percentage="percentage" size="large"></dj-progress>
      <dj-progress :showIcon="true" :strokeWidth="30" status="exception" :percentage="percentage"></dj-progress>
      <dj-progress :showIcon="true" :strokeWidth="4" status="warning" :percentage="percentage" size="mini"></dj-progress>
      <dj-button @click="minus">-</dj-button>
      <dj-button @click="add">+</dj-button>`,
      data: {
        data() {
          return {
            percentage: 90
          };
        },
        methods: {
          add() {
            this.percentage += 10;
            this.percentage = this.percentage < 0 ? 0 : this.percentage > 100 ? 100 : this.percentage;
          },
          minus() {
            this.percentage -= 10;
            this.percentage = this.percentage < 0 ? 0 : this.percentage > 100 ? 100 : this.percentage;
          }
        }
      }
    },
    {
      title: '百分比内显',
      template: `<dj-progress :percentage="percentage"></dj-progress>
      <dj-progress textInside :strokeWidth="16" status="success" :percentage="percentage" size="large"></dj-progress>
      <dj-progress textInside :strokeWidth="30" status="exception" :percentage="percentage"></dj-progress>
      <dj-progress textInside :strokeWidth="20" status="warning" :percentage="percentage" size="mini"></dj-progress>
      <dj-button @click="minus">-</dj-button>
      <dj-button @click="add">+</dj-button>`,
      data: {
        data() {
          return {
            percentage: 90
          };
        },
        methods: {
          add() {
            this.percentage += 10;
            this.percentage = this.percentage < 0 ? 0 : this.percentage > 100 ? 100 : this.percentage;
          },
          minus() {
            this.percentage -= 10;
            this.percentage = this.percentage < 0 ? 0 : this.percentage > 100 ? 100 : this.percentage;
          }
        }
      }
    },
    {
      title: '自定义背景色',
      template: `<dj-progress :color="['#fff', '#000']" :percentage="percentage"></dj-progress>
      <dj-progress :color="['#fff', '#000']" textInside :strokeWidth="16" status="success" :percentage="percentage" size="large"></dj-progress>
      <dj-progress :color="['#fff', '#000']" textInside :showIcon="true" :strokeWidth="30" status="exception" :percentage="percentage"></dj-progress>
      <dj-progress :color="['#fff', '#000']" :showIcon="true" :strokeWidth="4" status="warning" :percentage="percentage" size="mini"></dj-progress>
      <dj-button @click="minus">-</dj-button>
      <dj-button @click="add">+</dj-button>`,
      data: {
        data() {
          return {
            percentage: 90
          };
        },
        methods: {
          add() {
            this.percentage += 10;
            this.percentage = this.percentage < 0 ? 0 : this.percentage > 100 ? 100 : this.percentage;
          },
          minus() {
            this.percentage -= 10;
            this.percentage = this.percentage < 0 ? 0 : this.percentage > 100 ? 100 : this.percentage;
          }
        }
      }
    },
    {
      title: '加载动效',
      template: `<dj-progress active :percentage="percentage"></dj-progress>
      <dj-progress active textInside :strokeWidth="16" status="success" :percentage="percentage" size="large"></dj-progress>
      <dj-progress active textInside :showIcon="true" :strokeWidth="30" status="exception" :percentage="percentage"></dj-progress>
      <dj-progress active :showIcon="true" :strokeWidth="4" status="warning" :percentage="percentage" size="mini"></dj-progress>
      <dj-button @click="minus">-</dj-button>
      <dj-button @click="add">+</dj-button>`,
      data: {
        data() {
          return {
            percentage: 90
          };
        },
        methods: {
          add() {
            this.percentage += 10;
            this.percentage = this.percentage < 0 ? 0 : this.percentage > 100 ? 100 : this.percentage;
          },
          minus() {
            this.percentage -= 10;
            this.percentage = this.percentage < 0 ? 0 : this.percentage > 100 ? 100 : this.percentage;
          }
        }
      }
    },
    {
      title: '环形进度条',
      template: `<dj-progress type="circle" :percentage="percentage"></dj-progress>
      <dj-progress type="circle" status="exception" :percentage="percentage"></dj-progress>
      <dj-button @click="minus">-</dj-button>
      <dj-button @click="add">+</dj-button>`,
      data: {
        data() {
          return {
            percentage: 90
          };
        },
        methods: {
          add() {
            this.percentage += 10;
            this.percentage = this.percentage < 0 ? 0 : this.percentage > 100 ? 100 : this.percentage;
          },
          minus() {
            this.percentage -= 10;
            this.percentage = this.percentage < 0 ? 0 : this.percentage > 100 ? 100 : this.percentage;
          }
        }
      }
    },
    {
      title: '仪表盘进度条',
      template: `<dj-progress status="success" type="dashboard" :percentage="percentage"></dj-progress>
      <dj-progress type="dashboard" status="warning" :percentage="percentage"></dj-progress>
      <dj-button @click="minus">-</dj-button>
      <dj-button @click="add">+</dj-button>`,
      data: {
        data() {
          return {
            percentage: 90
          };
        },
        methods: {
          add() {
            this.percentage += 10;
            this.percentage = this.percentage < 0 ? 0 : this.percentage > 100 ? 100 : this.percentage;
          },
          minus() {
            this.percentage -= 10;
            this.percentage = this.percentage < 0 ? 0 : this.percentage > 100 ? 100 : this.percentage;
          }
        }
      }
    }
  ]
};
