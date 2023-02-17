export default {
  title: 'Icon 图标',
  describe: '提供了一套常用的图标集合，可拓展图标。',
  templates: [
    {
      title: '使用方法',
      template: `<i class="iconfont more"></i>
      <dj-icon icon="signout" fontSize="20px"></dj-icon>
      <dj-button type="primary" icon="check">默认按钮</dj-button>`
    },
    {
      title: '动图用法',
      template: `<dj-icon icon="load"></dj-icon>
      <dj-icon icon="load1" load loadColor="red" loadW="50px" loadH="50px"></dj-icon>`
    },
    {
      title: '图标合集',
      codeShow: false,
      template: `
        <div class="iconList">
          <div class="lt" v-for="(item, index) in icons" :key="index">
            <dj-icon :icon="item"></dj-icon>
            <br><br>
            <span>{{item}}</span>
          </div>
        </div>`,
      data: {
        data() {
          return {
            icons: [
              'analysis', 'analysis_bar', 'applet', 'add-border', 'subtract-border', 'block_order', 'subsidy', 'risk_query', 'drag', 'warning', 'application', 'application2', 'bug', 'code', 'synchronization_manual', 'synchronization', 'synchronization_cloud', 'chart_up', 'chart_down', 'chart_columnar', 'chart_pie_hollow', 'chart_pie', 'chart_lineBar', 'save', 'swap-right', 'picture', 'multigraph', 'close-circle', 'trumpet-solid', 'trumpet', 'magic', 'add', 'add-solid', 'move', 'rotate-left', 'rotate-right', 'zoom-in', 'zoom-out', 'tuozhuai', 'signout', 'user1', 'home', 'sort1', 'sort2', 'sort-up', 'sort-down', 'left-circle', 'bottom-circle', 'right-circle', 'top-circle', 'forward', 'back1', 'back2', 'next-step', 'back-step', 'discount', 'statistics', 'enclosure', 'copy1', 'garbage', 'link1', 'screen', 'calendar', 'refresh1', 'pourin', 'export', 'check', 'double-bottom', 'double-right', 'double-left', 'double-top', 'more', 'abstract-check', 'frame-check', 'location', 'function', 'search1', 'add', 'close', 'subtract', 'view', 'view-off', 'message', 'message-unread', 'record', 'time', 'order', 'order-unread', 'cart-empty', 'cart', 'search2', 'edit', 'link2', 'share', 'setting', 'upload', 'download', 'play', 'play_solid', 'play_single', 'stop_solid', 'stop_single', 'region', 'notification', 'notification-off', 'phonecall', 'phonecall-off', 'lock', 'unlock', 'filter', 'calculator', 'image', 'email', 'copy2', 'user2', 'customer-service', 'sub-account', 'list', 'refresh2', 'close-filled', 'check-solid', 'close-solid', 'check-filled', 'forbidden', 'info-filled', 'info', 'help-filled', 'help', 'caution', 'caution-filled', 'like', 'like-filled', 'star', 'star-filled', 'arrow-top', 'arrow-left', 'arrow-bottom', 'arrow-right', 'arrow-right-big', 'solid-left', 'solid-bottom', 'solid-top', 'solid-right', 'turning-left', 'turning-right', 'turning-top', 'turning-bottom'
            ]
          };
        }
      }
    },
    {
      title: '图片合集',
      codeShow: false,
      template: `
        <div class="iconList">
          <div class="lt" v-for="(item, index) in image" :key="index">
            <dj-icon :icon="item"></dj-icon>
            <br><br>
            <span>{{item}}</span>
          </div>
        </div>`,
      data: {
        data() {
          return {
            image: [
              'wushuju', 'nodata'
            ]
          };
        }
      }
    },
    {
      title: 'CSS3动图合集',
      codeShow: false,
      template: `
      <div class="iconList">
        <div class="lt">
          <dj-icon icon="load"></dj-icon><br><br>
          <span>load</span>
        </div>
      </div>`
    },
    {
      title: 'SVG动图合集',
      codeShow: false,
      template: `
        <div class="iconList">
          <div class="lt" v-for="(item, index) in load" :key="index">
            <dj-icon :icon="item" load></dj-icon>
            <br><br>
            <span>{{item}}</span>
          </div>
        </div>`,
      data: {
        data() {
          return {
            load: [
              'load1', 'load2', 'load3', 'load4', 'load5', 'load6', 'load7'
            ]
          };
        }
      }
    }
  ]
};
