export default {
  title: 'Tabs 标签页',
  describe: '分隔内容上有关联但属于不同类别的数据集合。',
  templates: [
    {
      title: '基础用法',
      template: `<dj-tab v-model="activeTab">
      <dj-tab-pane label="用户管理" name="1">
        <dj-tab v-model="ccc" tabPosition="left">
          <dj-tab-pane label="用户32323管理" name="1" icon='home'>
            <div style="width:100%;background:red;height:200px"></div>
          </dj-tab-pane>
          <dj-tab-pane label="配置管理" name="2">23232323
            <div style="width:90%;background:blue;height:200px"></div>
          </dj-tab-pane>
          <dj-tab-pane label="角色管理" name="3">rrrrrrrr</dj-tab-pane>
        </dj-tab>
      </dj-tab-pane>
      <dj-tab-pane label="配置管理" name="2">fdsafdsafdsafdsa</dj-tab-pane>
      <dj-tab-pane label="角色管理" name="3"></dj-tab-pane>
      </dj-tab>`,
      data: {
        data() {
          return {
            activeTab: '1',
            ccc: '1'
          };
        },
        created() {
          setTimeout(() => {
            this.activeTab = '1';
          }, 1000);
        },
        methods: {
        }
      }
    },
    {
      title: '位置',
      template: `<dj-tab v-model="activeTab" tabPosition="right">
      <dj-tab-pane label="用户管理" name="1" icon='home'>fdsafdsa</dj-tab-pane>
      <dj-tab-pane label="配置管理" name="2">23232323</dj-tab-pane>
      <dj-tab-pane label="角色管理" name="3">rrrrrrrr</dj-tab-pane>
      </dj-tab>`,
      data: {
        data() {
          return {
            activeTab: '1'
          };
        },
        created() {
          setTimeout(() => {
            this.activeTab = '2';
          }, 1000);
        },
        methods: {
        }
      }
    },
    {
      title: '选项卡样式',
      template: `<dj-tab v-model="activeTab" type="card">
  <dj-tab-pane label="用户管理" :name="1">
  <dj-table :data="tableData" :page="page">
  <dj-table-column label="姓名" field="name"/>
  <dj-table-column label="年龄" field="age"/>
</dj-table>
  </dj-tab-pane>
  <dj-tab-pane label="配置管理" :name="2">
  <dj-table :data="tableData" :page="page">
  <dj-table-column label="姓名" field="name"/>
  <dj-table-column label="年龄" field="age"/>
</dj-table>
  </dj-tab-pane>
</dj-tab>`,
      data: {
        data() {
          return {
            activeTab: 1,
            tableData: [{ name: '张三', age: 18 }, { name: '李四', age: 21 }],
            page: { pageSize: 10, pageNo: 1, totalCount: 11, pageSizes: [5, 10, 20, 30] }
          };
        }
      }


      
    },
    {
      title: '边框卡样式',
      template: `<dj-tab type="fillet" v-model="activeTab">
      <dj-tab-pane label="用户管理" name="1"></dj-tab-pane>
      <dj-tab-pane label="配置管理" name="2"></dj-tab-pane>
      <dj-tab-pane label="角色管理" name="3"></dj-tab-pane>
      </dj-tab>`,
      data: {
        data() {
          return {
            activeTab: '1'
          };
        }
      }
    },
    {
      title: '卡片化',
      template: `<dj-tab type="square" border v-model="activeTab">
      <dj-tab-pane label="用户管理" name="1">fdsafdsafdsa</dj-tab-pane>
      <dj-tab-pane label="配置管理" name="2">3232323232</dj-tab-pane>
      <dj-tab-pane label="角色管理" name="3">vfvvcgfgfg</dj-tab-pane>
      </dj-tab>`,
      data: {
        data() {
          return {
            activeTab: '1'
          };
        }
      }
    },
    
    {
      title: '自定义标签页中内容',
      template: `<dj-tab type="square" border v-model="activeTab1" visible  @tab-change="tabChange">
      <dj-tab-pane label="用户管理" name="1" icon='home'>用户管理内容</dj-tab-pane>
      <dj-tab-pane label="配置管理" name="2">配置管理内容</dj-tab-pane>
      <dj-tab-pane label="角色管理" name="3">角色管理内容</dj-tab-pane>
      </dj-tab>`,
      data: {
        data() {
          return {
            activeTab1: '1'
          };
        },
        methods: {
          tabChange(val) {
            this.activeTab1 = val;
          }
        }
      }
    },
    {
      title: '自定义标签',
      template: `<dj-tab v-model="activeTab" @tab-change="change">
      <dj-tab-pane label="" name="1">
        <div slot="tab">
          <dj-badge color="#F56C6C" :value="value">新的</dj-badge>
        </div>
        <div> 888888</div>
      </dj-tab-pane>
      <dj-tab-pane label="配置管理" name="2"></dj-tab-pane>
      <dj-tab-pane label="角色管理" name="3"></dj-tab-pane>
      </dj-tab>`,
      data: {
        data() {
          return {
            value: '2',
            activeTab: '1'
          };
        },
        created() {
          setTimeout(() => {
            this.activeTab = '2';
            this.value = 3;
          }, 1000);
        },
        methods: {
          change(a, b) {
            console.log(a, b);
          }
        }
      }
    }
  ]
};
