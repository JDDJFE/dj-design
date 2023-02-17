export default {
  title: 'Dropdown 下拉菜单',
  describe: '将动作或菜单折叠到下拉菜单中。',
  templates: [
    {
      title: '基础用法',
      template: `<dj-dropdown>
      <dj-button type="text">下拉菜单<i class="iconfont arrow-bottom"></i></dj-button>
      <dj-dropdown-menu>
        <dj-dropdown-item value="1" label="黄金糕"></dj-dropdown-item>
        <dj-dropdown-item value="2" label="狮子头"></dj-dropdown-item>
        <dj-dropdown-item value="3" label="双皮奶"></dj-dropdown-item>
        <dj-dropdown-item value="4" label="蚵仔煎"></dj-dropdown-item>
      </dj-dropdown-menu>
    </dj-dropdown>`
    },
    {
      title: '禁用状态',
      template: `<dj-dropdown>
      <dj-button type="text">下拉菜单<i class="iconfont arrow-bottom"></i></dj-button>
      <dj-dropdown-menu>
        <dj-dropdown-item value="1" label="黄金糕"></dj-dropdown-item>
        <dj-dropdown-item value="2" label="狮子头"></dj-dropdown-item>
        <dj-dropdown-item value="3" label="双皮奶" disabled></dj-dropdown-item>
        <dj-dropdown-item value="4" label="蚵仔煎"></dj-dropdown-item>
      </dj-dropdown-menu>
    </dj-dropdown>`
    },
    {
      title: '添加icon',
      template: `<dj-dropdown>
      <dj-button type="text">下拉菜单<i class="iconfont arrow-bottom"></i></dj-button>
      <dj-dropdown-menu>
        <dj-dropdown-item value="1" label="黄金糕" icon="home"></dj-dropdown-item>
        <dj-dropdown-item value="2" label="狮子头" icon="user1"></dj-dropdown-item>
        <dj-dropdown-item value="3" label="双皮奶" icon="enclosure"></dj-dropdown-item>
        <dj-dropdown-item value="4" label="蚵仔煎" icon="screen"></dj-dropdown-item>
      </dj-dropdown-menu>
    </dj-dropdown>`
    },
    {
      title: '字段换行',
      template: `<dj-dropdown wordBreak>
      <dj-button type="text">下拉菜单<i class="iconfont arrow-bottom"></i></dj-button>
      <dj-dropdown-menu>
        <dj-dropdown-item value="1" label="黄金糕">我的内容太长了</dj-dropdown-item>
        <dj-dropdown-item value="2" label="狮子头"></dj-dropdown-item>
        <dj-dropdown-item value="3" label="双皮奶"></dj-dropdown-item>
        <dj-dropdown-item value="4" label="蚵仔煎"></dj-dropdown-item>
      </dj-dropdown-menu>
    </dj-dropdown>
    <dj-dropdown>
      <dj-button type="text">下拉菜单<i class="iconfont arrow-bottom"></i></dj-button>
      <dj-dropdown-menu>
        <dj-dropdown-item value="1" label="黄金糕">我的内容太长了</dj-dropdown-item>
        <dj-dropdown-item value="2" label="狮子头"></dj-dropdown-item>
        <dj-dropdown-item value="3" label="双皮奶"></dj-dropdown-item>
        <dj-dropdown-item value="4" label="蚵仔煎"></dj-dropdown-item>
      </dj-dropdown-menu>
    </dj-dropdown>`
    },
    {
      title: '触发方式click',
      template: `<dj-dropdown trigger="click">
      <dj-button type="text">下拉菜单<i class="iconfont arrow-bottom"></i></dj-button>
      <dj-dropdown-menu>
        <dj-dropdown-item value="1" label="黄金糕" icon="home"></dj-dropdown-item>
        <dj-dropdown-item value="2" label="狮子头" icon="user1"></dj-dropdown-item>
        <dj-dropdown-item value="3" label="双皮奶" icon="enclosure"></dj-dropdown-item>
        <dj-dropdown-item value="4" label="蚵仔煎" icon="screen"></dj-dropdown-item>
      </dj-dropdown-menu>
    </dj-dropdown>`
    },
    {
      title: '事件回调',
      template: `<dj-dropdown  @change="handleCommand">
      <dj-button type="text">下拉菜单<i class="iconfont arrow-bottom"></i></dj-button>
      <dj-dropdown-menu>
        <dj-dropdown-item value="1" label="黄金糕" icon="home"></dj-dropdown-item>
        <dj-dropdown-item value="2" label="狮子头" icon="user1"></dj-dropdown-item>
        <dj-dropdown-item value="3" label="双皮奶" icon="enclosure"></dj-dropdown-item>
        <dj-dropdown-item value="4" label="蚵仔煎" icon="screen"></dj-dropdown-item>
      </dj-dropdown-menu>
    </dj-dropdown>`,
      data: {
        data() {
          return {
            value: ''
          };
        },
        methods: {
          handleCommand(val) {
            alert(val);
          }
        }
      }
    },
    {
      title: '触发对象',
      template: `<dj-dropdown splitButton @splitChange="splitClick" >
      更多菜单
      <dj-dropdown-menu slot="dropdown">
        <dj-dropdown-item value="1" label="黄金糕"></dj-dropdown-item>
        <dj-dropdown-item value="2" label="狮子头"></dj-dropdown-item>
        <dj-dropdown-item value="3" label="双皮奶"></dj-dropdown-item>
        <dj-dropdown-item value="4" label="蚵仔煎"></dj-dropdown-item>
      </dj-dropdown-menu>
    </dj-dropdown>`,
      data: {
        methods: {
          splitClick(val) {
            alert('我是button');
          }
        }
      }
    }
  ]
};
