export default {
  title: 'Select 测试',
  templates: [
    {
      title: '基础用法',
      template: `<dj-button @click="show()">弹窗</dj-button>
        <dj-select @change="changes" v-model="value" name="lala" clearable searchable multipleAll>
          <dj-option v-for="(val,i) in list" :value="val.id" :label="val.label"></dj-option>         
        </dj-select>{{value}}`,
      data: {
        data() {
          return {
            value: 1,
            list: []
          };
        },
        created() {
          setTimeout(() => {
            this.list = [
              {
                id: 0,
                label: '文字1',
                haha: 11
              },
              {
                id: 1,
                label: '文字2',
                haha: 222
              }
            ];
          }, 2000);
        },
        methods: {
          changes(val, obj) {
            console.log(val, obj);
          }
        }
      }
    },
    {
      info: {
        scene: '模块全选',
        repairtime: '2020-10-25'
      },
      template: `<dj-select v-model="value" placeholder="请选择" multiple>
          <dj-option label="全部" value="quanbu"></dj-option>
          <dj-option-group key="热门城市" label="热门城市">
            <dj-option label="上海" value="Shanghai"></dj-option>
            <dj-option label="北京" value="Beijing"></dj-option>
          </dj-option-group>
          <dj-option-group key="城市名" label="城市名">
            <dj-option label="成都" value="Chengdu"></dj-option>
            <dj-option label="深圳" value="Shenzhen"></dj-option>
            <dj-option label="广州" value="guangzhou"></dj-option>
            <dj-option label="四川"   value="sichuan"></dj-option>
          </dj-option-group>
        </dj-select>{{value}}`,
      data: {
        data() {
          return {
            // value: null
            value: ["quanbu", "Shanghai", "Beijing", "Chengdu", "Shenzhen", "guangzhou", "sichuan"]
          };
        }
      }
    },
    {
      info: {
        scene: '基础全选',
        repairtime: '2020-01-02'
      },
      template: `<dj-select v-model="value" multiple searchable clearable>
          <dj-option value="1" label="黄金糕"></dj-option>
          <dj-option value="2" label="双皮奶"></dj-option>
          <dj-option value="3" label="蚵仔煎" ></dj-option>
          <dj-option value="4" label="龙须面"></dj-option>
          <dj-option value="5" label="北京烤鸭"></dj-option>
          <dj-option value="6" label="铜锣烧"></dj-option>
          <dj-option value="7" label="辣子鸡"></dj-option>
        </dj-select>{{value}}`,
      data: {
        data() {
          return {
            value: 0,
            list: []
          };
        },
        created() {
          setTimeout(() => {
            this.list = [
              {
                id: 0,
                label: '文字1',
                haha: 11
              },
              {
                id: 1,
                label: '文字2',
                haha: 222
              }
            ];
          }, 2000);
        },
        methods: {
          changes(val, obj) {
            console.log(val, obj);
          }
        }
      }
    },
    {
      info: {
        scene: '优化数据加载，创建千万条数据',
        repairtime: '2020-11-15'
      },
      template: `<dj-button @click="show()">更改lable</dj-button><dj-button @click="valuess()">更改value</dj-button>
        <dj-select @change="changes" v-model="value" name="lala" clearable searchable>
          <dj-option v-for="(val,i) in list" :value="val.id" :label="val.label"></dj-option>         
        </dj-select>{{value}}`,
      data: {
        data() {
          return {
            value: 1,
            list: [
              {
                id: 2232323, label: 'wangjunxia'
              }
            ]
          };
        },
        created() {
          // setTimeout(() => {
          // this.list = [];
          for (let i = 0; i < 3000; i++) {
            let item1 = { id: i, label: '文字' + i };
            this.list.push(item1);
          }
          // }, 2000);
        },
        methods: {
          changes(val, obj) {
            // console.log(val, obj);
          },
          valuess() {
            this.value = 3;
          },
          show() {
            this.list[1].label = '哈哈哈';
          }
        }
      }
    }
  ]
};
