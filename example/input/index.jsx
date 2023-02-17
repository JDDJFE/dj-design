export default {
  title: 'Input 输入框',
  templates: [
    { title: '基础用法',
      template: `<dj-input placeholder="请输入文本..." clearable/>` },
    { title: '可清空',
      template: `<dj-input placeholder="请输入文本..." :clearable="true"/>
      &ensp;<div style="height: 36px; width: 50px; display: inline-block; border: 1px solid #dddede; "></div>
      &ensp;<dj-button type="primary">保存</dj-button>
     &ensp;<div style="height: 36px; width: 50px; display: inline-block; border: 1px solid #dddede; "></div>`},
    { title: '密码框',
      template: '<dj-input placeholder="请输入文本..." type="password" :showpassword="true"/>' },
    { title: '长度限制',
      template: `<dj-input :maxlength="10" :showmaxlength="true"  placeholder="请输入文本..."/>&ensp;
      <dj-input disabled :maxlength="10" :showmaxlength="true"  placeholder="请输入文本..."/>&ensp;
      <dj-input class="error" :maxlength="10" :bytelength="10" :showmaxlength="true"  placeholder="请输入文本..."/>&ensp;
      <dj-input disabled class="error" :bytelength="10" :maxlength="10" :showmaxlength="true"  placeholder="请输入文本..."/>` },
    { title: '字节长度限制',
      template: `<dj-input :bytelength="10" :showmaxlength="true"  placeholder="请输入文本..."/>&ensp;
      <dj-input disabled :bytelength="10" :showmaxlength="true"  placeholder="请输入文本..."/>
      <dj-input class="error"  :bytelength="10" :showmaxlength="true"  placeholder="请输入文本..."/>
      <dj-input disabled class="error"  :bytelength="10" :showmaxlength="true"  placeholder="请输入文本..."/>` },
    { title: '带icon',
      template: `<dj-input placeholder="请输入文本..." icon="search2"/>&ensp;
      <dj-input disabled placeholder="请输入文本..." icon="search2" iconposition="left"/>&ensp;
      <dj-input class="error" placeholder="请输入文本..." icon="search2"/>&ensp;
      <dj-input disabled class="error" placeholder="请输入文本..." icon="search2"  iconposition="left"/>` },
    { title: '复合型输入框',
      template: `<dj-input placeholder="请输入文本..."  before="http://"/>&ensp;
      <dj-input placeholder="请输入文本..."  after="kg"/>&ensp;
      <dj-input placeholder="请输入..." before="http://"  after=".com"/>&ensp;
      <dj-input class="error" placeholder="请输入文本..."  after="kg"/>` },
    { title: '复合型输入框-插槽方式',
      template: `<dj-input placeholder="请输入文本...">
        <template slot="before">
          <span style="padding: 0px 10px;">http://</span>
        </template>
      </dj-input>&ensp;
      <dj-input placeholder="请输入文本...">
        <template slot="after">
          <span style="padding: 0px 10px;">kg</span>
        </template>
      </dj-input>` },
    { title: '搜索按钮',
      template: `<dj-input :showsearch="true" @query="onEnter" placeholder="请输入文本..."/>&ensp;
      <dj-input disabled :showsearch="true" @query="onEnter" placeholder="请输入文本..."/>`,
      data: {
        data() {
          return {
          };
        },
        methods: {
          onEnter(keyword) {
            alert(keyword);
          }
        }
      }
    },
    { title: '带输入建议',
      template: '<dj-input :funquery="query"/>',
      data: {
        data() {
          return {
          };
        },
        methods: {
          query(keyword, fn) {
            let list = [];
            let random = Math.floor(Math.random() * 10);
            for (let i = 0; i < random; i++) {
              let item1 = {};
              item1.value = (keyword || '测试数据') + i;
              list.push(item1);
            }
            fn && fn(list);
          }
        }
      }
    },
    { title: '带输入建议-插槽方式',
      template: `<dj-input :funquery="query">
        <template v-slot:option="item">
        <div>template-{{item.value}}</div>
        </template>
      </dj-input>`,
      data: {
        data() {
          return {
          };
        },
        methods: {
          query(keyword, fn) {
            let list = [];
            let random = Math.floor(Math.random() * 10);
            for (let i = 0; i < random; i++) {
              let item1 = {};
              item1.value = (keyword || '测试数据') + i;
              list.push(item1);
            }
            fn && fn(list);
          }
        }
      }
    },
    {
      title: '尺寸',
      template: `<dj-input placeholder="请输入文本..." size="mini"/>&ensp;
      <dj-input placeholder="请输入文本..." size="small"/>&ensp;
      <dj-input placeholder="请输入文本..." size="medium"/>&ensp;
      <dj-input placeholder="请输入文本..." size="large"/>` }
  ]
};
