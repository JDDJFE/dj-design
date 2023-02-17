export default {
  title: 'progress 进度条',
  describe: '',
  templates: [
    {
      title: '基础用法',
      template: `<dj-progress active :percentage="percentage"></dj-progress>
      <dj-progress status="success" :percentage="percentage"></dj-progress>
      <dj-progress status="warning" :percentage="percentage"></dj-progress>
      <dj-progress status="error" :percentage="percentage"></dj-progress>
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
      title: '自定义宽度',
      template: `<dj-progress :percentage="percentage"></dj-progress>
      <dj-progress :width="200" status="success" :percentage="percentage"></dj-progress>
      <dj-progress :width="400" status="warning" :percentage="percentage"></dj-progress>
      <dj-progress :width="600" status="error" :percentage="percentage"></dj-progress>
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
      title: '自定义高度',
      template: `<dj-progress :percentage="percentage"></dj-progress>
      <dj-progress :strokeWidth="16" status="success" :percentage="percentage"></dj-progress>
      <dj-progress :strokeWidth="30" status="warning" :percentage="percentage"></dj-progress>
      <dj-progress :strokeWidth="4" status="error" :percentage="percentage"></dj-progress>
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
      <dj-progress :showIcon="true" :strokeWidth="16" status="success" :percentage="percentage"></dj-progress>
      <dj-progress :showIcon="true" :strokeWidth="30" status="warning" :percentage="percentage"></dj-progress>
      <dj-progress :showIcon="true" :strokeWidth="4" status="error" :percentage="percentage"></dj-progress>
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
      <dj-progress textInside :strokeWidth="16" status="success" :percentage="percentage"></dj-progress>
      <dj-progress textInside :strokeWidth="30" status="warning" :percentage="percentage"></dj-progress>
      <dj-progress textInside :strokeWidth="20" status="error" :percentage="percentage"></dj-progress>
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
      template: `<dj-progress :color="['#108ee9', '#87d068']" :percentage="percentage"></dj-progress>
      <dj-progress :color="['#108ee9', '#87d068']" textInside :strokeWidth="16" status="success" :percentage="percentage"></dj-progress>
      <dj-progress :color="['#108ee9', '#87d068']" textInside :showIcon="true" :strokeWidth="30" status="warning" :percentage="percentage"></dj-progress>
      <dj-progress :color="['#108ee9', '#87d068']" :showIcon="true" :strokeWidth="4" status="error" :percentage="percentage"></dj-progress>
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
      <dj-progress active textInside :strokeWidth="16" status="success" :percentage="percentage"></dj-progress>
      <dj-progress active textInside :showIcon="true" :strokeWidth="30" status="warning" :percentage="percentage"></dj-progress>
      <dj-progress active :showIcon="true" :strokeWidth="4" status="error" :percentage="percentage"></dj-progress>
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
      <dj-progress type="circle" status="warning" :percentage="percentage"></dj-progress>
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
      template: `<dj-progress status="success" type="dashboard" :percentage="percentage">
        <template>
          <dj-icon icon="check-solid"/>
        </template>
      </dj-progress>
      <dj-progress type="dashboard" status="error" :percentage="percentage"></dj-progress>
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
      title: '插槽用法',
      template: `<dj-progress status="success" type="dashboard" :percentage="percentage">
        <template>
          <dj-icon icon="check-solid"/>
        </template>
      </dj-progress>
      <dj-progress status="success" type="circle" :percentage="percentage">
        <template>
          <dj-icon icon="check-solid"/>
        </template>
      </dj-progress>
      <dj-progress :percentage="percentage">
        <template>
          <dj-icon icon="check-solid"/>
        </template>
      </dj-progress>
      <dj-progress textInside :strokeWidth="16" status="success" :percentage="percentage">
        <template>
          <dj-icon icon="check-solid"/>
        </template>
      </dj-progress>
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
