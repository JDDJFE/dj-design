export default {
  title: 'Select 选择器',
  describe: '当选项过多时，使用下拉菜单展示并选择内容。',
  templates: [
    // {
    //   title: '远程搜索',
    //   template: `
    //     <dj-select @change="changes" v-model="value" name="lala" :loading="loading" searchable filterable :remoteMethod="remoteMethod">
    //       <dj-option v-for="(val,i) in options" :value="val.value" :label="val.label"></dj-option>
    //     </dj-select>{{value}}
    //      <dj-select @change="changes" v-model="value" multiple name="lala" searchable filterable :remoteMethod="remoteMethod">
    //       <dj-option v-for="(val,i) in options" :value="val.value" :label="val.label"></dj-option>
    //     </dj-select>{{value}}`,
    //   data: {
    //     data() {
    //       return {
    //         value: '0-Alabama',
    //         loading: false,
    //         options: [],
    //         states: ["Alabama", "Alaska", "Arizona",
    //           "Arkansas", "California", "Colorado",
    //           "Connecticut", "Delaware", "Florida",
    //           "Georgia", "Hawaii", "Idaho", "Illinois",
    //           "Indiana", "Iowa", "Kansas", "Kentucky",
    //           "Louisiana", "Maine", "Maryland",
    //           "Massachusetts", "Michigan", "Minnesota",
    //           "Mississippi", "Missouri", "Montana",
    //           "Nebraska", "Nevada", "New Hampshire",
    //           "New Jersey", "New Mexico", "New York",
    //           "North Carolina", "North Dakota", "Ohio",
    //           "Oklahoma", "Oregon", "Pennsylvania",
    //           "Rhode Island", "South Carolina",
    //           "South Dakota", "Tennessee", "Texas",
    //           "Utah", "Vermont", "Virginia",
    //           "Washington", "West Virginia", "Wisconsin",
    //           "Wyoming"],
    //         list: []
    //       };
    //     },
    //     mounted() {
    //       this.list = this.states.map((item, i) => {
    //         return { value: `${i}-${item}`, label: `${item}` };
    //       });
    //     },
    //     methods: {
    //       remoteMethod(query) {
    //         if (query !== '') {
    //           this.loading = true;
    //           setTimeout(() => {
    //             this.loading = false;
    //             this.options = this.list.filter(item => {
    //               return item.label.toLowerCase()
    //                 .indexOf(query.toLowerCase()) > -1;
    //             });
    //             console.log(this.options);
    //           }, 700);
    //         } else {
    //           this.options = [];
    //         }
    //       },
    //       changes(val, obj) {
    //         // console.log(val, obj);
    //       }
    //     }
    //   }
    // },
    // {
    //   title: '基础用法',
    //   template: `<dj-button @click="show()">弹窗</dj-button>
    //     <dj-select @change="changes" v-model="value" name="lala">
    //       <dj-option v-for="(val,i) in list" :value="val.id" :label="val.label"></dj-option>
    //     </dj-select>{{value}}
    //     <dj-select  v-model="value2" name="lala">
    //       <dj-option v-for="(val,i) in list2" :value="val.id" :label="val.label"></dj-option>
    //     </dj-select>{{value2}}`,
    //   data: {
    //     data() {
    //       return {
    //         value: '',
    //         value2: 3,
    //         list2: [],
    //         list: [
    //           {
    //             id: 0,
    //             label: '文字1',
    //             haha: 11
    //           },
    //           {
    //             id: 1,
    //             label: '文字1',
    //             haha: 11
    //           }
    //         ]
    //       };
    //     },
    //     created() {
    //       setTimeout(() => {
    //         this.list = [
    //           {
    //             id: 0,
    //             label: '文字1',
    //             haha: 11
    //           },
    //           {
    //             id: 1,
    //             label: '文字2',
    //             haha: 222
    //           }
    //         ];
    //       }, 2000);
    //     },
    //     methods: {
    //       changes(val, obj) {
    //         // this.value2=2;
    //         this.list2 = [
    //           {
    //             id: 2,
    //             label: '文字222',
    //             haha: 2
    //           },
    //           {
    //             id: 3,
    //             label: '文字333',
    //             haha: 3
    //           }
    //         ];
    //       }
    //     }
    //   }
    // },
    {
      title: '基础用法',
      template: `<dj-button @click="show()">弹窗</dj-button>
        <dj-select @change="changes" v-model="value" name="lala" clearable searchable>
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
      title: '有禁用选项',
      template: `<dj-select v-model="value">
          <dj-option value="1" label="黄金糕"></dj-option>
          <dj-option value="2" label="双皮奶" disabled></dj-option>
          <dj-option value="3" label="蚵仔煎" ></dj-option>
          <dj-option value="4" label="龙须面" disabled></dj-option>
          <dj-option value="5" label="北京烤鸭"></dj-option>
          <dj-option value="6" label="铜锣烧"></dj-option>
          <dj-option value="7" label="辣子鸡"></dj-option>
        </dj-select>{{value}}`,
      data: {
        data() {
          return {
            value: ''
          };
        }
      }
    },
    {
      title: '禁用状态',
      template: `<dj-select disabled>
          <dj-option value="11" label="按时打算"></dj-option>
          <dj-option value="22" label="2" disabled></dj-option>
          <dj-option value="33" label="3" ></dj-option>
          <dj-option value="44" label="4"></dj-option>
          <dj-option value="55" label="5"></dj-option>
          <dj-option value="66" label="6"></dj-option>
          <dj-option value="00" label="0"></dj-option>
        </dj-select>`
    },
    {
      title: '可搜索',
      template: `<dj-select v-model="value" searchable clearable>
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
            value: '1'
          };
        }
      }
    },
    {
      title: '可清空单选',
      template: `<dj-select v-model="value" clearable>
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
            value: '1'
          };
        }
      }
    },
    {
      title: '基础多选',
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
            value: []
          };
        },
        methods: {
        }
      }
    },
    {
      title: '多选全选',
      template: `<dj-select v-model="value" multipleAll searchable clearable>
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
            value: []
          };
        },
        methods: {
        }
      }
    },
    {
      title: '合并多选',
      template: `<dj-select v-model="value" multiple searchable collapse clearable>
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
            value: ['1', '2']
          };
        }
      }
    },
    {
      title: '数量限制',
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
            value: ['3', '1']
          };
        }
      }
    },
    {
      title: '自定义模版',
      template: `<dj-select v-model="value">
          <dj-option :value="1" label="北京">
            <span style="float:left">北京</span>
            <span style="float:right; color:#8492a6; font-size:13px">beijing</span>
          </dj-option>
          <dj-option :value="2" label="上海">
            <span style="float:left">上海</span>
            <span style="float:right; color:#8492a6; font-size:13px">shanghai</span>
          </dj-option>
          <dj-option :value="3" label="深圳" >
            <span style="float:left">深圳</span>
            <span style="float:right; color:#8492a6; font-size:13px">shanghai</span>
          </dj-option>
        </dj-select>{{value}}`,
      data: {
        data() {
          return {
            value: ''
          };
        }
      }
    },
    {
      title: '模块分组',
      template: `<dj-select v-model="value" placeholder="请选择">
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
            value: null
          };
        }
      }
    },
    {
      title: '无边框',
      template: `<dj-select v-model="value" noBordered>
          <dj-option value="1" label="黄金糕"></dj-option>
          <dj-option value="2" label="双皮奶"></dj-option>
          <dj-option value="3" label="蚵仔煎"></dj-option>
          <dj-option value="4" label="龙须面"></dj-option>
          <dj-option value="5" label="北京烤鸭"></dj-option>
          <dj-option value="6" label="铜锣烧"></dj-option>
          <dj-option value="7" label="辣子鸡"></dj-option>
        </dj-select>{{value}}`,
      data: {
        data() {
          return {
            value: '1'
          };
        }
      }
    },
    {
      title: '尺寸',
      template: `<dj-select v-model="value" size="large">
          <dj-option value="1" label="黄金糕"></dj-option>
          <dj-option value="2" label="双皮奶"></dj-option>
          <dj-option value="3" label="蚵仔煎"></dj-option>
          <dj-option value="4" label="龙须面"></dj-option>
        </dj-select>
        <dj-select v-model="value">
          <dj-option value="1" label="黄金糕"></dj-option>
          <dj-option value="2" label="双皮奶"></dj-option>
          <dj-option value="3" label="蚵仔煎"></dj-option>
          <dj-option value="4" label="龙须面"></dj-option>
        </dj-select>
        <dj-select v-model="value" size="small">
          <dj-option value="1" label="黄金糕"></dj-option>
          <dj-option value="2" label="双皮奶"></dj-option>
          <dj-option value="3" label="蚵仔煎"></dj-option>
          <dj-option value="4" label="龙须面"></dj-option>
        </dj-select>
        <dj-select v-model="value" size="mini">
          <dj-option value="1" label="黄金糕"></dj-option>
          <dj-option value="2" label="双皮奶"></dj-option>
          <dj-option value="3" label="蚵仔煎"></dj-option>
          <dj-option value="4" label="龙须面"></dj-option>
        </dj-select>`,
      data: {
        data() {
          return {
            value: '1'
          };
        }
      }
    }
  ]
};
